const VIDEO_PREFIX = 'bjb:video:';
const PLAYLIST_PREFIX = 'bjb:playlist:';

function compactNumber(value) {
  if (!Number.isFinite(value)) return null;
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

function formatDuration(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return null;
  const seconds = Math.round(totalSeconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${remainder}s`;
  return `${remainder}s`;
}

function formatPublished(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function videoId(id) {
  return `${VIDEO_PREFIX}${id}`;
}

function playlistId(id) {
  return `${PLAYLIST_PREFIX}${id}`;
}

function rawVideoId(id) {
  return id.startsWith(VIDEO_PREFIX) ? id.slice(VIDEO_PREFIX.length) : null;
}

function rawPlaylistId(id) {
  return id.startsWith(PLAYLIST_PREFIX) ? id.slice(PLAYLIST_PREFIX.length) : null;
}

function statsLine(video, config) {
  const stats = [];
  if (config.metadata.showViews && Number.isFinite(video.views)) {
    stats.push(`${compactNumber(video.views)} views`);
  }
  if (config.metadata.showLikes && Number.isFinite(video.likes)) {
    stats.push(`${compactNumber(video.likes)} likes`);
  }
  if (config.metadata.showPublishedDate) {
    const published = formatPublished(video.published);
    if (published) stats.push(published);
  }
  return stats.join(' · ');
}

function descriptionFor(video, config) {
  return [statsLine(video, config), video.description].filter(Boolean).join('\n\n');
}

function releaseInfo(video) {
  if (!video.published) return null;
  const date = new Date(video.published);
  return Number.isNaN(date.getTime()) ? null : String(date.getUTCFullYear());
}

function youtubeLinks(config, targetUrl) {
  return [
    {
      name: 'watch on YouTube',
      category: 'youtube',
      url: targetUrl
    },
    {
      name: config.youtube.handle,
      category: 'channel',
      url: config.youtube.channelUrl
    }
  ];
}

function streamChoices(video, config) {
  const streams = [];
  if (config.playback.playInStremio) {
    streams.push({
      name: 'brownjonnybravo',
      description: 'Play in Stremio with the built-in YouTube player',
      ytId: video.id,
      thumbnail: video.thumbnail
    });
  }
  if (config.playback.openOnYouTube) {
    streams.push({
      name: 'YouTube',
      description: 'Open the official video on YouTube',
      externalUrl: video.url || `https://www.youtube.com/watch?v=${video.id}`,
      thumbnail: video.thumbnail
    });
  }
  return streams;
}

function videoPreview(video, config, posterShape) {
  return {
    id: videoId(video.id),
    type: 'channel',
    name: video.title,
    poster: video.thumbnail,
    posterShape,
    background: video.thumbnail,
    logo: config.branding.avatar,
    description: descriptionFor(video, config),
    releaseInfo: releaseInfo(video),
    runtime: config.metadata.showRuntime ? formatDuration(video.duration) : null,
    released: video.published,
    links: youtubeLinks(config, video.url),
    trailerStreams: config.catalogs.latest.enableFullVideoPreviewAction
      ? [{ ytId: video.id, name: 'brownjonnybravo preview', thumbnail: video.thumbnail }]
      : []
  };
}

function fullVideoMeta(video, config) {
  return {
    ...videoPreview(video, config, config.catalogs.latest.posterShape),
    description: descriptionFor(video, config),
    website: video.url,
    behaviorHints: {
      defaultVideoId: videoId(video.id),
      featuredVideoId: videoId(video.id)
    }
  };
}

function playlistPreview(playlist, config) {
  const countLabel = `${playlist.videos.length} video${playlist.videos.length === 1 ? '' : 's'}`;
  return {
    id: playlistId(playlist.id),
    type: 'channel',
    name: playlist.title,
    poster: playlist.thumbnail || config.branding.banner,
    posterShape: config.catalogs.playlists.posterShape,
    background: playlist.thumbnail || config.branding.banner,
    logo: config.branding.avatar,
    description: `${countLabel} from ${config.branding.displayName}`,
    runtime: countLabel,
    links: youtubeLinks(config, playlist.url)
  };
}

function playlistMeta(playlist, config) {
  const videos = playlist.videos.map((video) => ({
    id: videoId(video.id),
    title: video.title,
    released: video.published,
    thumbnail: video.thumbnail,
    overview: descriptionFor(video, config),
    streams: streamChoices(video, config),
    trailerStreams: config.catalogs.latest.enableFullVideoPreviewAction
      ? [{ ytId: video.id, name: 'brownjonnybravo preview', thumbnail: video.thumbnail }]
      : []
  }));

  return {
    ...playlistPreview(playlist, config),
    description: `${playlist.videos.length} videos in the ${playlist.title} playlist from ${config.branding.displayName}.`,
    releaseInfo: 'YouTube playlist',
    videos,
    behaviorHints: {
      defaultVideoId: videos[0]?.id || null,
      featuredVideoId: videos[0]?.id || null
    }
  };
}

function normalizeSearch(value) {
  return (value || '').trim().toLocaleLowerCase('en-US');
}

function matchesSearch(item, search) {
  if (!search) return true;
  return [item.title, item.description]
    .filter(Boolean)
    .some((value) => value.toLocaleLowerCase('en-US').includes(search));
}

function paginate(items, extra, defaultLimit) {
  const skip = Math.max(0, Number.parseInt(extra.skip || '0', 10) || 0);
  const limit = Math.max(1, defaultLimit || 100);
  return items.slice(skip, skip + limit);
}

function findVideo(content, id) {
  const direct = [...content.latest, ...content.shorts].find((video) => video.id === id);
  if (direct) return direct;
  for (const playlist of content.playlists) {
    const match = playlist.videos.find((video) => video.id === id);
    if (match) return match;
  }
  return null;
}

export function createAddon(config, store) {
  const catalogs = [];
  if (config.catalogs.latest.enabled) {
    catalogs.push({
      type: 'channel',
      id: 'latest',
      name: config.catalogs.latest.name,
      extra: [
        { name: 'search', isRequired: false },
        { name: 'skip', isRequired: false }
      ]
    });
  }
  if (config.catalogs.playlists.enabled) {
    catalogs.push({
      type: 'channel',
      id: 'playlists',
      name: config.catalogs.playlists.name,
      extra: [
        { name: 'search', isRequired: false },
        { name: 'skip', isRequired: false }
      ]
    });
  }
  if (config.catalogs.shorts.enabled) {
    catalogs.push({
      type: 'channel',
      id: 'shorts',
      name: config.catalogs.shorts.name,
      extra: [
        { name: 'search', isRequired: false },
        { name: 'skip', isRequired: false }
      ]
    });
  }

  const manifest = {
    id: config.addon.id,
    version: config.addon.version,
    name: config.addon.name,
    description: config.addon.description,
    logo: config.branding.avatar,
    background: config.branding.banner,
    resources: [
      { name: 'catalog', types: ['channel'] },
      { name: 'meta', types: ['channel'], idPrefixes: ['bjb:'] },
      { name: 'stream', types: ['channel'], idPrefixes: [VIDEO_PREFIX] }
    ],
    types: ['channel'],
    idPrefixes: ['bjb:'],
    catalogs,
    behaviorHints: {
      adult: false,
      p2p: false
    }
  };

  return {
    manifest,
    catalog(id, extra = {}) {
      const content = store.getContent();
      const search = normalizeSearch(extra.search);

      if (id === 'latest' && config.catalogs.latest.enabled) {
        const source = config.catalogs.latest.includeShorts
          ? [...content.latest, ...content.shorts]
          : content.latest;
        const metas = paginate(
          source.filter((video) => matchesSearch(video, search)),
          extra,
          config.catalogs.latest.limit
        ).map((video) => videoPreview(video, config, config.catalogs.latest.posterShape));
        return { metas };
      }

      if (id === 'playlists' && config.catalogs.playlists.enabled) {
        const metas = paginate(
          content.playlists.filter((playlist) => matchesSearch(playlist, search)),
          extra,
          100
        ).map((playlist) => playlistPreview(playlist, config));
        return { metas };
      }

      if (id === 'shorts' && config.catalogs.shorts.enabled) {
        const metas = paginate(
          content.shorts.filter((video) => matchesSearch(video, search)),
          extra,
          config.catalogs.shorts.limit
        ).map((video) => videoPreview(video, config, config.catalogs.shorts.posterShape));
        return { metas };
      }

      return null;
    },
    meta(id) {
      const content = store.getContent();
      const rawVideo = rawVideoId(id);
      if (rawVideo) {
        const video = findVideo(content, rawVideo);
        return video ? { meta: fullVideoMeta(video, config) } : null;
      }

      const rawPlaylist = rawPlaylistId(id);
      if (rawPlaylist) {
        const playlist = content.playlists.find((item) => item.id === rawPlaylist);
        return playlist ? { meta: playlistMeta(playlist, config) } : null;
      }

      return null;
    },
    stream(id) {
      const rawVideo = rawVideoId(id);
      if (!rawVideo) return null;
      const video = findVideo(store.getContent(), rawVideo);
      return video ? { streams: streamChoices(video, config) } : null;
    }
  };
}

export { VIDEO_PREFIX, PLAYLIST_PREFIX, formatDuration };
