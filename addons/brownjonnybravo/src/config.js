import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function readJson(relativePath) {
  const contents = await readFile(path.join(projectRoot, relativePath), 'utf8');
  return JSON.parse(contents);
}

export async function loadConfig() {
  const config = await readJson('config/channel.json');
  const ttlOverride = Number.parseInt(process.env.BJB_CACHE_TTL_SECONDS ?? '', 10);

  return {
    ...config,
    runtime: {
      host: process.env.HOST || '127.0.0.1',
      port: Number.parseInt(process.env.PORT || '7000', 10),
      cacheTtlSeconds: Number.isFinite(ttlOverride) && ttlOverride > 0 ? ttlOverride : 900,
      ytDlpPath: process.env.YTDLP_PATH || 'yt-dlp',
      refreshDisabled: process.env.BJB_DISABLE_REFRESH === '1'
    }
  };
}

export async function loadSeed() {
  return readJson('data/seed.json');
}

export { projectRoot };
