# Tools

Small, self-contained helpers for the documented Stremio stack. Nothing here
stores a personalized manifest URL, token, or key. Anything personalized is
entered by the user at runtime and kept in that browser's local storage only.

## `niners-quick-links.html`

An offline single-file page holding the San Francisco 49ers 2026 schedule with
Pacific kickoff times, plus one Stremio deep link per game.

### Why the links point at a catalog, not a game

Stremio deep links are documented in the add-on SDK as:

```
stremio:///detail/{type}/{id}/{videoId}?autoPlay={autoPlay}
stremio:///discover/{catalogAddonUrl}/{type}/{id}?genre={genre}
stremio:///search?search={query}
```

The web equivalent is the same path after `https://web.stremio.com/#`.

Movies and series carry stable IMDb ids, so a `detail` link keeps working
forever. Sports Streams (`community.sports.fly`, custom `sport` type) generates
an event item only while that event is listed in its catalogs, so a per-game
`detail` id is not stable and cannot be built ahead of a game. The page
therefore links to the `sports_american_football` catalog, and switches to
`sports_recaps` for the day after a game. Catalog ids are recorded in
`evidence/verification/sports-streams-premium-catalog-results-2026-07-15.json`.

`?autoPlay=true` is only meaningful on a `detail` link with a real id, so no
link here can open a stream directly. Stream choice and any external-player
handoff remain client-side Stremio behavior.

### Add-on URL

The page needs the installed Sports Streams transport URL to build a
`discover` link. It accepts either the `…/manifest.json` URL or a pasted
`https://web.stremio.com/#/discover/…` URL and extracts the transport from it.
It is saved with `localStorage` on that device only. Without it, the buttons
fall back to `stremio:///search?search=49ers`.

### Link target

`Auto` sends desktop and Android to `stremio://` and iOS to
`https://web.stremio.com/#`, because there is no full-featured Stremio app in
the iOS App Store. `App` and `Web` force either form.

### Schedule source

Week, date, opponent, kickoff, and network come from the NFL's published 2026
schedule, cross-checked against the 49ers' schedule-release coverage. Times are
converted to America/Los_Angeles. Week 18 is scheduled after Week 17, and late
season Sunday kickoffs can still move under flexible scheduling.
