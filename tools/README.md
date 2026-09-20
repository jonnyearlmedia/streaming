# Tools

Small, self-contained helpers for the documented Stremio stack. Nothing here
stores a personalized manifest URL, token, or key.

`.github/workflows/pages.yml` publishes this directory to GitHub Pages on every
push to `main`, so the site root is `tools/`:

- `https://jonnyearlmedia.github.io/streaming/open.html`
- `https://jonnyearlmedia.github.io/streaming/niners-quick-links.html`

## `open.html`

One https link that lands on the actual game page, not a search result.

On open it reads the add-on's manifest, collects every `sport` catalog that
declares the `search` extra, and queries them in turn until one returns a
match. `sports_today` and `sports_live` go first because a game in progress
lands there whatever the sport. It then redirects to
`stremio:///detail/sport/{event id}`, the game's page with its feed list, and
falls back to a plain Stremio search when nothing is listed yet.

Because the catalog list comes from the add-on, any sport works without a
code change. One page, one link per team:

```
open.html?q=49ers
open.html?q=golden%20state
```

- macOS, Windows, Android: hands off to the installed Stremio app.
- iOS and iPadOS: redirects to `web.stremio.com`, because the full Stremio app
  is not distributed through the US App Store.

The add-on URL is entered once per device and kept in that browser's
`localStorage`. It is never part of the link and never committed here, so the
link itself can be texted or bookmarked safely. The add-on sends
`access-control-allow-origin: *`, so the lookup works from a browser page.

Query parameters:

| Param | Effect |
| --- | --- |
| `?q=49ers` | What to look for. Defaults to `49ers`. |
| `?cat=sports_basketball` | Checks that catalog first. Optional, only saves a request or two. |
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
