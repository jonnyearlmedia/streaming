import assert from 'node:assert/strict';
import { after, before, describe, test } from 'node:test';
import { createAddon } from '../src/addon.js';
import { loadConfig, loadSeed } from '../src/config.js';
import { createHttpServer } from '../src/server.js';
import { createContentStore } from '../src/youtube.js';
import { parseYouTubeFeed } from '../src/xml.js';

let config;
let seed;
let store;
let addon;
let server;
let baseUrl;

before(async () => {
  [config, seed] = await Promise.all([loadConfig(), loadSeed()]);
  config.runtime.refreshDisabled = true;
  store = createContentStore(config, seed);
  addon = createAddon(config, store);
  server = createHttpServer(config, store);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (server) await new Promise((resolve) => server.close(resolve));
});

describe('manifest', () => {
  test('uses exact lowercase branding and channel-only resources', () => {
    assert.equal(addon.manifest.name, 'brownjonnybravo');
    assert.equal(addon.manifest.id, 'com.brownjonnybravo.channel');
    assert.deepEqual(addon.manifest.types, ['channel']);
    assert.deepEqual(addon.manifest.catalogs.map((catalog) => catalog.id), ['latest', 'playlists']);
    assert.ok(addon.manifest.catalogs.every((catalog) => catalog.name.includes('brownjonnybravo')));
    assert.equal(/[A-Z]/.test(addon.manifest.name), false);
  });
});

describe('catalogs and metadata', () => {
  test('returns landscape latest-video cards without shorts by default', () => {
    const result = addon.catalog('latest');
    assert.equal(result.metas.length, 4);
    assert.ok(result.metas.every((meta) => meta.type === 'channel'));
    assert.ok(result.metas.every((meta) => meta.posterShape === 'landscape'));
    assert.ok(result.metas.every((meta) => meta.trailerStreams[0]?.ytId));
    assert.equal(result.metas.some((meta) => meta.id.includes('8wGEyzBpO2E')), false);
  });

  test('returns playlist cards and complete playlist metadata', () => {
    const catalog = addon.catalog('playlists');
    assert.equal(catalog.metas.length, 3);
    const playlist = addon.meta('bjb:playlist:PLlvcdeFENruWLfWBscSbyb9LJpsNXMcba');
    assert.equal(playlist.meta.name, 'cooking videos');
    assert.equal(playlist.meta.videos.length, 2);
    assert.ok(playlist.meta.videos.every((video) => video.streams.some((stream) => stream.ytId)));
  });

  test('supports search and pagination', () => {
    assert.deepEqual(
      addon.catalog('latest', { search: 'adobo' }).metas.map((meta) => meta.name),
      ['the ONLY chicken adobo recipe you need (kinda)']
    );
    assert.equal(addon.catalog('latest', { skip: '1' }).metas.length, 3);
    assert.deepEqual(
      addon.catalog('playlists', { search: 'vlog' }).metas.map((meta) => meta.name),
      ['vlogs']
    );
  });

  test('returns only the in-Stremio playback choice', () => {
    const result = addon.stream('bjb:video:irqwAp0tmPA');
    assert.equal(result.streams.length, 1);
    assert.equal(result.streams[0].ytId, 'irqwAp0tmPA');
    assert.equal(result.streams.some((stream) => stream.externalUrl), false);
  });
});

describe('HTTP protocol', () => {
  test('serves manifest, catalog, meta, stream, health, and CORS', async () => {
    const manifestResponse = await fetch(`${baseUrl}/manifest.json`);
    assert.equal(manifestResponse.status, 200);
    assert.equal(manifestResponse.headers.get('access-control-allow-origin'), '*');
    assert.equal((await manifestResponse.json()).name, 'brownjonnybravo');

    const catalogResponse = await fetch(`${baseUrl}/catalog/channel/latest.json`);
    assert.equal(catalogResponse.status, 200);
    assert.equal((await catalogResponse.json()).metas.length, 4);

    const searchResponse = await fetch(`${baseUrl}/catalog/channel/latest/search=adobo.json`);
    assert.equal(searchResponse.status, 200);
    assert.equal((await searchResponse.json()).metas.length, 1);

    const metaResponse = await fetch(`${baseUrl}/meta/channel/bjb%3Avideo%3AirqwAp0tmPA.json`);
    assert.equal(metaResponse.status, 200);
    assert.equal((await metaResponse.json()).meta.name, 'the ONLY chicken adobo recipe you need (kinda)');

    const streamResponse = await fetch(`${baseUrl}/stream/channel/bjb%3Avideo%3AirqwAp0tmPA.json`);
    assert.equal(streamResponse.status, 200);
    assert.equal((await streamResponse.json()).streams[0].ytId, 'irqwAp0tmPA');

    const healthResponse = await fetch(`${baseUrl}/health`);
    assert.equal(healthResponse.status, 200);
    assert.equal((await healthResponse.json()).counts.playlists, 3);
  });
});

test('YouTube feed parser retains public metadata and detects Shorts', () => {
  const feed = parseYouTubeFeed(`<?xml version="1.0"?>
    <feed xmlns:yt="x" xmlns:media="y">
      <title>jonny</title>
      <entry>
        <yt:videoId>abc123</yt:videoId>
        <title>test &amp; learn</title>
        <link rel="alternate" href="https://www.youtube.com/shorts/abc123"/>
        <published>2026-01-01T00:00:00Z</published>
        <media:group>
          <media:description>hello &amp; goodbye</media:description>
          <media:thumbnail url="https://example.com/thumb.jpg"/>
          <media:community>
            <media:starRating count="7" average="5.00"/>
            <media:statistics views="42"/>
          </media:community>
        </media:group>
      </entry>
    </feed>`);

  assert.equal(feed.title, 'jonny');
  assert.deepEqual(feed.entries[0], {
    id: 'abc123',
    title: 'test & learn',
    url: 'https://www.youtube.com/shorts/abc123',
    published: '2026-01-01T00:00:00Z',
    updated: null,
    description: 'hello & goodbye',
    thumbnail: 'https://i.ytimg.com/vi/abc123/maxresdefault.jpg',
    feedThumbnail: 'https://example.com/thumb.jpg',
    duration: null,
    views: 42,
    likes: 7,
    isShort: true
  });
});
