# Sports Streams host migration and launcher findings — 2026-09-20

Triggered by the user reporting `Env: Failed to fetch: Load failed` when
opening Sports in Stremio while movies and series loaded normally.

## Diagnosis

The installed Sports Streams entry still pointed at `premium-us1.highfly.dev`.
That hostname resolves, but the server presents a certificate issued for a
different name, so the TLS handshake is rejected before any data moves:

```
$ curl https://premium-us1.highfly.dev/manifest.json
curl: (60) SSL: no alternative certificate subject name matches
      target host name 'premium-us1.highfly.dev'
      subject: CN=premium.highfly.dev
      issuer: C=US; O=Let's Encrypt
```

`Load failed` is WebKit's wording for a fetch that dies at the network layer,
which matches a rejected certificate and explains why the error appears
instantly rather than as an empty catalog. Only Sports Streams lives on that
host, which is why every other add-on kept working.

The provider moved to the `.to` TLD. The user supplied the correct base. The
current host is `premium.highfly.to`, with the same personalized token and
configuration path. `premium-us2.highfly.dev` still verifies, and
`premium.highfly.dev` serves the certificate named above, but neither is the
documented location now.

## Current host verification

Token and configuration segments redacted throughout.

```
https://premium.highfly.to/[REDACTED]/[REDACTED]/manifest.json     200  0.15s
catalog/sport/sports_live.json                                     200  0.43s
catalog/sport/sports_american_football.json                        200  0.41s
catalog/sport/sports_american_football/skip=0.json                 200  0.18s
catalog/sport/sports_today/skip=100.json                           200  0.16s

access-control-allow-origin: *
access-control-expose-headers: *
```

CORS is open, so browser-side callers such as Stremio Web and a static page
may query the add-on directly.

## Add-on identity

The live manifest reports `community.sports.streamed.premium`, not
`community.sports.fly` as recorded in July. Version is still 1.2.0. Whether
this is a rebrand alongside the domain move or an error in the original
inventory is not established.

## Event id lifetime

Live events carry an upstream event number that does not exist before the
event is listed, so no per-game deep link can be written in advance:

```
meta/sport/streamed:san-francisco-49ers-vs-miami-dolphins         → 404 "Match not found"
meta/sport/streamed:san-francisco-49ers-vs-miami-dolphins-2475403 → 200
```

Catalog lookahead was roughly one week at the time sampled. The furthest entry
in `sports_american_football` was a 27 Sep placeholder.

## Search extra

Every `sport` catalog declares the `search` extra, and a search reaches the
add-on through Stremio's own search route. Sampled with `search=49ers`:

```
sports_american_football  200  1 meta
sports_today              200  1 meta
sports_live               200  1 meta
streamed:san-francisco-49ers-vs-miami-dolphins-2475403
```

This is what makes a permanent, token-free link possible: the query is stable
across the season even though the event id is not.

## Basketball not yet verifiable

`search=warriors` and `search=golden state` returned zero metas across every
catalog because the NBA season has not started. `sports_basketball` currently
holds WNBA and Australian NBL fixtures. Warriors resolution is therefore
unverified until the season begins.

## Method

Read-only HTTP against the add-on's own endpoints. No add-on was installed,
removed, reordered, or reconfigured by this session, and no playback was
started for verification. The user separately removed the stale `.dev` entry
and installed the `.to` one in Stremio, and reported that a stream then played.
