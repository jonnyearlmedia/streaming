# brownjonnybravo Stremio add-on

This is a private-first Stremio channel add-on for
[`youtube.com/@brownjonnybravo`](https://www.youtube.com/@brownjonnybravo).

Current version: `0.1.0`.

It currently provides two Stremio catalogs, in this order:

1. `brownjonnybravo — latest videos`
2. `brownjonnybravo — playlists`

The latest-videos row contains individual landscape video cards. The playlists
row contains one landscape card per public playlist; opening a playlist shows
its playable videos as a flat channel-style list.

## Current implementation

- Exact lowercase `brownjonnybravo` branding throughout.
- Automatic public upload refresh from YouTube's channel feed.
- Automatic public playlist discovery through the existing `yt-dlp` binary.
- Automatic playlist-content refresh from public YouTube feeds.
- Deleted and private playlist entries are filtered out.
- Shorts are detected and kept out of Latest Videos by default.
- Search and pagination on both installed catalogs.
- Landscape YouTube artwork, descriptions, publication dates, runtime, views,
  likes, channel avatar, and channel banner where the public source supplies
  them.
- Detail-page artwork and metadata.
- Stremio `trailerStreams` preview action for clients that expose it.
- In-app playback through Stremio's built-in YouTube player, with no external
  YouTube playback choice.
- A Stremio Trailer action backed by each video's YouTube stream.
- Public-data snapshot fallback if YouTube or `yt-dlp` is temporarily
  unavailable.
- Background refresh with a 15-minute default cache.
- Local status page, health endpoint, and local-only manual refresh button.
- No npm dependencies, API keys, OAuth tokens, passwords, or debrid secrets.

See [FEATURES.md](FEATURES.md) for the complete customization matrix and the
hard limits imposed by Stremio and YouTube.

## Run locally

Requirements already present on this Mac:

- Node.js 20 or newer;
- `yt-dlp` for public playlist discovery and metadata enrichment.

No `npm install` is required. Start the add-on with:

```sh
cd "/Users/shmackbook/Documents/streaming/addons/brownjonnybravo"
npm start
```

Then open:

```text
http://127.0.0.1:7000/
```

The local landing page provides the Stremio installation button. The manifest
URL is:

```text
http://127.0.0.1:7000/manifest.json
```

The service intentionally binds only to `127.0.0.1`. Installing it in Stremio
has not been performed by the build or verification process.

## Validate

Run the deterministic checks:

```sh
npm run check
```

With the server running, inspect live state without starting playback:

```sh
curl -fsSL http://127.0.0.1:7000/health | jq .
curl -fsSL http://127.0.0.1:7000/manifest.json | jq .
curl -fsSL http://127.0.0.1:7000/catalog/channel/latest.json | jq .
curl -fsSL http://127.0.0.1:7000/catalog/channel/playlists.json | jq .
```

## Customize

The main settings live in [`config/channel.json`](config/channel.json).

You can change:

- add-on description and version;
- channel avatar and banner;
- row names;
- row enablement and order in the manifest;
- number of Latest Videos or Shorts;
- whether Shorts are mixed into Latest Videos;
- whether the standalone Shorts row is enabled;
- landscape/square/poster card shape;
- the full-video preview action;
- views, likes, runtime, and publication-date labels;
- in-app Stremio playback;
- fallback playlist IDs.

Restart the service after changing the JSON.

Runtime overrides are documented in [`.env.example`](.env.example). They are
ordinary environment variables; this project does not automatically load an
`.env` file.

## Network boundary

`127.0.0.1` works only on this Mac. For Stremio running on another television,
phone, or computer, the add-on must be reachable from that device over HTTPS.
Remote hosting is intentionally deferred: it changes the security and uptime
model and should be selected explicitly after the local Stremio experience is
approved.

## View-count caveat

In-app playback uses the SDK-supported YouTube ID transport. YouTube can
count legitimate user-initiated embedded playback, but it does not count
autoplayed embeds and it applies its own validation. The add-on therefore does
not promise that every Stremio playback increments the public YouTube counter.
