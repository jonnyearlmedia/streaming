import http from 'node:http';
import { pathToFileURL } from 'node:url';
import { createAddon } from './addon.js';
import { loadConfig, loadSeed } from './config.js';
import { createContentStore } from './youtube.js';

function sendJson(response, statusCode, body, cacheSeconds = 0) {
  const payload = JSON.stringify(body);
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
    'Cache-Control': cacheSeconds > 0 ? `public, max-age=${cacheSeconds}` : 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  });
  response.end(payload);
}

function sendHtml(response, html) {
  response.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(html)
  });
  response.end(html);
}

function parseExtra(segment = '') {
  return Object.fromEntries(new URLSearchParams(segment));
}

function isLocalRequest(request) {
  const address = request.socket.remoteAddress || '';
  return address === '127.0.0.1' || address === '::1' || address.endsWith('127.0.0.1');
}

function landingPage(config, store, request) {
  const host = request.headers.host || `${config.runtime.host}:${config.runtime.port}`;
  const manifestUrl = `http://${host}/manifest.json`;
  const installUrl = manifestUrl.replace(/^http:/, 'stremio:');
  const status = store.getStatus();

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>brownjonnybravo Stremio add-on</title>
  <style>
    :root { color-scheme: dark; font-family: ui-sans-serif, system-ui, sans-serif; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0d0c12; color: #f6f3ff; }
    main { width: min(42rem, calc(100% - 2rem)); padding: 2rem; border: 1px solid #332d45; border-radius: 1.25rem; background: #17131f; }
    h1 { margin: 0 0 .4rem; font-size: clamp(2rem, 7vw, 4rem); letter-spacing: -.06em; }
    p { color: #c7bfd7; line-height: 1.55; }
    code { overflow-wrap: anywhere; color: #d6c1ff; }
    a, button { display: inline-block; margin-top: .75rem; padding: .85rem 1rem; border: 0; border-radius: .75rem; background: #8b5cf6; color: white; font-weight: 700; text-decoration: none; cursor: pointer; }
    button { margin-left: .5rem; background: #332d45; }
    dl { display: grid; grid-template-columns: auto 1fr; gap: .5rem 1rem; margin-top: 1.5rem; }
    dt { color: #8f86a2; } dd { margin: 0; }
  </style>
</head>
<body>
  <main>
    <h1>brownjonnybravo</h1>
    <p>Latest videos and public playlists from <code>youtube.com/@brownjonnybravo</code>, packaged as a Stremio channel add-on.</p>
    <a href="${installUrl}">Install in Stremio</a>
    <button type="button" onclick="fetch('/refresh', {method:'POST'}).then(() => location.reload())">Refresh YouTube data</button>
    <dl>
      <dt>Manifest</dt><dd><code>${manifestUrl}</code></dd>
      <dt>Data source</dt><dd>${status.source}</dd>
      <dt>Latest videos</dt><dd>${status.counts.latest}</dd>
      <dt>Playlists</dt><dd>${status.counts.playlists}</dd>
      <dt>Last refresh</dt><dd>${status.refreshedAt}</dd>
    </dl>
  </main>
</body>
</html>`;
}

export function createHttpServer(config, store) {
  const addon = createAddon(config, store);

  return http.createServer(async (request, response) => {
    if (request.method === 'OPTIONS') {
      response.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS'
      });
      response.end();
      return;
    }

    const requestUrl = new URL(request.url || '/', `http://${request.headers.host || '127.0.0.1'}`);
    const pathname = requestUrl.pathname;

    if (request.method === 'GET' && pathname === '/') {
      sendHtml(response, landingPage(config, store, request));
      return;
    }

    if (request.method === 'GET' && pathname === '/health') {
      sendJson(response, 200, { ok: true, addon: config.addon.name, ...store.getStatus() });
      return;
    }

    if (request.method === 'POST' && pathname === '/refresh') {
      if (!isLocalRequest(request)) {
        sendJson(response, 403, { error: 'Manual refresh is local-only.' });
        return;
      }
      const content = await store.refreshNow();
      sendJson(response, 200, { ok: true, refreshedAt: content.refreshedAt, ...store.getStatus() });
      return;
    }

    if (request.method === 'GET' && pathname === '/manifest.json') {
      sendJson(response, 200, addon.manifest, 300);
      return;
    }

    if (request.method !== 'GET') {
      sendJson(response, 405, { error: 'Method not allowed.' });
      return;
    }

    const protocolPath = pathname.endsWith('.json') ? pathname.slice(0, -5) : null;
    if (!protocolPath) {
      sendJson(response, 404, { error: 'Not found.' });
      return;
    }

    const parts = protocolPath.split('/').filter(Boolean).map(decodeURIComponent);
    let result = null;

    if (parts[0] === 'catalog' && parts[1] === 'channel' && parts[2]) {
      result = addon.catalog(parts[2], parseExtra(parts[3]));
    } else if (parts[0] === 'meta' && parts[1] === 'channel' && parts[2]) {
      result = addon.meta(parts[2]);
    } else if (parts[0] === 'stream' && parts[1] === 'channel' && parts[2]) {
      result = addon.stream(parts[2]);
    }

    if (!result) {
      sendJson(response, 404, { error: 'Unknown Stremio resource.' });
      return;
    }

    sendJson(response, 200, result, config.runtime.cacheTtlSeconds);
  });
}

export async function startServer() {
  const [config, seed] = await Promise.all([loadConfig(), loadSeed()]);
  const store = createContentStore(config, seed);
  const server = createHttpServer(config, store);

  server.listen(config.runtime.port, config.runtime.host, () => {
    const manifestUrl = `http://${config.runtime.host}:${config.runtime.port}/manifest.json`;
    process.stdout.write(`brownjonnybravo Stremio add-on\n${manifestUrl}\n`);
    if (!config.runtime.refreshDisabled) void store.refreshNow();
  });

  return { server, store, config };
}

const launchedDirectly = process.argv[1]
  && import.meta.url === pathToFileURL(process.argv[1]).href;

if (launchedDirectly) {
  startServer().catch((error) => {
    process.stderr.write(`${error.stack || error}\n`);
    process.exitCode = 1;
  });
}
