# Sports Streams configuration evidence — 2026-07-14

## Installed state

- Name/version: Sports Streams 1.2.0.
- Add-on ID: `community.sports.fly`.
- Public host: `https://sportsfree-us2.highfly.dev/`.
- Type: custom `sport`.
- Resources: catalog, meta, stream.
- Current configuration: base free manifest, no selected-sport restriction,
  Live Only disabled. This means all sports and scheduled events are visible.

## Catalog behavior

The manifest declares Live Now, Today, Basketball, Football, American
Football, Hockey, Baseball, Motor Sports, Fight, Tennis, Rugby, Golf,
Billiards, AFL, Darts, Cricket, and Other. Every catalog declares
`notForHome: true`, so these catalogs do not add shelves to Stremio Home.

## Available filtering

The free configurator can:

- show live matches only; and
- restrict results to selected sports.

The provider advertises local timezone posters, language filtering, quality
preference, CDN backups, and recaps as paid-tier features. No purchase, trial,
subscription, token, or referral action was taken.

Sports Streams returns direct live sources and is not routed through
AIOStreams or TorBox. AIOStreams language, bitrate, cache, sorting, and
deduplication settings therefore cannot filter it.

No sports filter was saved because the user's desired sports have not been
confirmed. The live configuration remains exactly as the user installed it.
