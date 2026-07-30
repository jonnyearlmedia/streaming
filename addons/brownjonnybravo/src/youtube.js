import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { parseYouTubeFeed } from './xml.js';

const execFileAsync = promisify(execFile);

async function fetchText(url, timeoutMs = 12_000) {
  const response = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
  if (!response.ok) {
    throw new Error(`YouTube feed returned HTTP ${response.status}: ${url}`);
  }
  return response.text();
}

async function runYtDlp(config, url, extraArgs = []) {
  const { stdout } = await execFileAsync(config.runtime.ytDlpPath, [
    '--flat-playlist',
    '--dump-single-json',
    '--no-warnings',
    ...extraArgs,
    url
  ], {
    timeout: 30_000,
    maxBuffer: 10 * 1024 * 1024
  });

  return JSON.parse(stdout);
}

function safeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function flatEntry(entry) {
  // YouTube may leave deleted/private playlist entries as ID-only tombstones.
  // They cannot play and should never become visible Stremio cards.
  if (!entry?.id || !entry.title) return null;
  const url = entry.url?.startsWith('http')
    ? entry.url
    : `https://www.youtube.com/watch?v=${entry.id}`;

  return {
    id: entry.id,
    title: entry.title || 'Untitled video',
    url,
    published: entry.timestamp ? new Date(entry.timestamp * 1000).toISOString() : null,
    description: entry.description || '',
    thumbnail: `https://i.ytimg.com/vi/${entry.id}/maxresdefault.jpg`,
    duration: safeNumber(entry.duration),
    views: safeNumber(entry.view_count),
    likes: safeNumber(entry.like_count),
    isShort: url.includes('/shorts/')
  };
}

function mergeVideos(primary, secondary) {
  const byId = new Map();

  for (const video of [...primary, ...secondary]) {
    if (!video?.id) continue;
    const current = byId.get(video.id) || {};
    byId.set(video.id, {
      ...video,
      ...current,
      id: video.id,
      title: current.title || video.title || 'Untitled video',
      url: current.url || video.url || `https://www.youtube.com/watch?v=${video.id}`,
      published: current.published || video.published || null,
      description: current.description || video.description || '',
      thumbnail: current.thumbnail || video.thumbnail || `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
      duration: current.duration ?? video.duration ?? null,
      views: current.views ?? video.views ?? null,
      likes: current.likes ?? video.likes ?? null,
      isShort: Boolean(current.isShort || video.isShort)
    });
  }

  return [...byId.values()];
}

async function loadFlatVideos(config, url, limit = 100) {
  try {
    const data = await runYtDlp(config, url, ['--playlist-end', String(limit)]);
    return (data.entries || []).map(flatEntry).filter(Boolean);
  } catch {
    return [];
  }
}

async function loadPlaylistIndex(config) {
  try {
    const data = await runYtDlp(config, config.youtube.playlistsUrl);
    return (data.entries || [])
      .filter((entry) => entry?.id)
      .map((entry) => ({
        id: entry.id,
        title: entry.title || 'Untitled playlist',
        url: entry.url?.startsWith('http')
          ? entry.url
          : `https://www.youtube.com/playlist?list=${entry.id}`,
        thumbnail: entry.thumbnails?.at(-1)?.url || null
      }));
  } catch {
    return config.knownPlaylists.map((playlist) => ({
      ...playlist,
      url: `https://www.youtube.com/playlist?list=${playlist.id}`,
      thumbnail: null
    }));
  }
}

async function loadPlaylist(config, playlist, fallback) {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlist.id}`;
  const [feedResult, flatVideos] = await Promise.all([
    fetchText(feedUrl).then(parseYouTubeFeed).catch(() => ({ entries: [] })),
    loadFlatVideos(config, playlist.url)
  ]);
  const videos = mergeVideos(feedResult.entries, flatVideos);
  const fallbackVideos = fallback?.videos || [];
  const merged = videos.length > 0 ? mergeVideos(videos, fallbackVideos) : fallbackVideos;
  const thumbnail = playlist.thumbnail
    || merged[0]?.thumbnail
    || fallback?.thumbnail
    || config.branding.banner;

  return {
    id: playlist.id,
    title: playlist.title || feedResult.title || fallback?.title || 'Untitled playlist',
    url: playlist.url,
    thumbnail,
    videos: merged
  };
}

export async function refreshYouTubeContent(config, seed) {
  const channelFeedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${config.youtube.channelId}`;
  const [channelFeedXml, flatVideos, flatShorts, playlistIndex] = await Promise.all([
    fetchText(channelFeedUrl),
    loadFlatVideos(config, config.youtube.videosUrl, config.catalogs.latest.limit),
    loadFlatVideos(config, config.youtube.shortsUrl, config.catalogs.shorts.limit),
    loadPlaylistIndex(config)
  ]);

  const channelFeed = parseYouTubeFeed(channelFeedXml);
  const feedLongVideos = channelFeed.entries.filter((video) => !video.isShort);
  const feedShorts = channelFeed.entries.filter((video) => video.isShort);
  const latest = mergeVideos(feedLongVideos, flatVideos).slice(0, config.catalogs.latest.limit);
  const shorts = mergeVideos(feedShorts, flatShorts).slice(0, config.catalogs.shorts.limit);

  const fallbackById = new Map(seed.playlists.map((playlist) => [playlist.id, playlist]));
  const playlists = await Promise.all(playlistIndex.map((playlist) => (
    loadPlaylist(config, playlist, fallbackById.get(playlist.id))
  )));

  return {
    source: 'youtube-public-live',
    refreshedAt: new Date().toISOString(),
    latest: latest.length > 0 ? latest : seed.latest,
    shorts: shorts.length > 0 ? shorts : seed.shorts,
    playlists: playlists.length > 0 ? playlists : seed.playlists
  };
}

export function createContentStore(config, seed, refresh = refreshYouTubeContent) {
  let content = structuredClone(seed);
  let refreshPromise = null;
  let lastError = null;

  async function refreshNow() {
    if (config.runtime.refreshDisabled) return content;
    if (refreshPromise) return refreshPromise;

    refreshPromise = refresh(config, seed)
      .then((next) => {
        content = next;
        lastError = null;
        return content;
      })
      .catch((error) => {
        lastError = error instanceof Error ? error.message : String(error);
        return content;
      })
      .finally(() => {
        refreshPromise = null;
      });

    return refreshPromise;
  }

  function maybeRefresh() {
    if (config.runtime.refreshDisabled || refreshPromise) return;
    const refreshedAt = new Date(content.refreshedAt).getTime();
    const ageMs = Date.now() - refreshedAt;
    if (!Number.isFinite(refreshedAt) || ageMs >= config.runtime.cacheTtlSeconds * 1000) {
      void refreshNow();
    }
  }

  return {
    getContent() {
      maybeRefresh();
      return content;
    },
    refreshNow,
    getStatus() {
      return {
        source: content.source,
        refreshedAt: content.refreshedAt,
        refreshing: Boolean(refreshPromise),
        lastError,
        counts: {
          latest: content.latest.length,
          shorts: content.shorts.length,
          playlists: content.playlists.length,
          playlistVideos: content.playlists.reduce((sum, playlist) => sum + playlist.videos.length, 0)
        }
      };
    }
  };
}
