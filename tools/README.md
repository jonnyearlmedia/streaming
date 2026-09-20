# Tools

Small, self-contained helpers for the documented Stremio stack. Nothing here
stores a personalized manifest URL, token, or key.

`.github/workflows/pages.yml` publishes this directory to GitHub Pages on every
push to `main`, so the site root is `tools/`:

- `https://jonnyearlmedia.github.io/streaming/open.html`
- `https://jonnyearlmedia.github.io/streaming/niners-quick-links.html`

## `open.html`

One https link that lands in the right place on either device, so it can be
pasted into a text message where a custom scheme would arrive as dead text.

- macOS, Windows, Android: fires `stremio:///search?search=49ers`, which the
  installed Stremio app handles. A visible fallback appears if nothing answers.
- iOS and iPadOS: redirects to `https://web.stremio.com/#/search?search=49ers`,
  because the full Stremio app is not distributed through the US App Store.

Query parameters:

| Param | Effect |
| --- | --- |
| `?q=49ers` | Search term. Defaults to `49ers`. |
| `?id=streamed:...` | Opens that event's detail page instead of a search. |
| `?app=1` | Forces the app scheme, including on iOS. |
| `?web=1` | Forces Stremio Web everywhere. |

## `niners-quick-links.html`

The 2026 49ers schedule with Pacific kickoff times and a link per game.

## Why the links are searches, not per-game links

Stremio deep links are documented in the add-on SDK as:

```
stremio:///detail/{type}/{id}/{videoId}?autoPlay={autoPlay}
stremio:///discover/{catalogAddonUrl}/{type}/{id}?genre={genre}
stremio:///search?search={query}
```

The web equivalent is the same path after `https://web.stremio.com/#`.

Movies and series carry stable IMDb ids, so a `detail` link works forever.
Sports Streams generates an event item only while that event is listed, and the
id carries an upstream event number that does not exist ahead of time. Verified
2026-09-20 against the installed add-on:

```
meta/sport/streamed:san-francisco-49ers-vs-miami-dolphins         → 404
meta/sport/streamed:san-francisco-49ers-vs-miami-dolphins-2475403 → 200
```

Every Sports Streams catalog declares the `search` extra, so
`stremio:///search?search=49ers` reaches the add-on and returns the current
Niners event. That form needs nothing personalized in the URL, which is why the
tools use it.

`?autoPlay=true` only applies to a `detail` link with a real id, so no link here
can open a stream directly. Stream choice and external-player handoff remain
client-side Stremio behavior.
