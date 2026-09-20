# Sports Streams configuration evidence — 2026-09-20

Supersedes `sports-streams-premium-2026-07-15.md` for host and configuration.
That file is retained as the July record.

## Installed state

- Name/version: Sports Streams 1.2.0.
- Add-on ID as reported by the live manifest:
  `community.sports.streamed.premium`. The July inventory recorded
  `community.sports.fly`; see UD-002.
- Host: `premium.highfly.to`. The former `premium-us1.highfly.dev` host fails
  TLS certificate validation and must not be reinstated.
- Token and encoded configuration segment: redacted, held by the user.
- Resources: catalog, meta, stream for the custom `sport` type.

## Configuration decoded from the manifest path

The configuration segment is base64 and carries no secret, so its decoded
contents are recorded here:

```json
{
  "includeSports": ["basketball", "football", "american-football",
                    "fight", "baseball", "golf"],
  "includeLeagues": ["nfl", "premier-league"],
  "timezone": "PT",
  "clockFormat": "12h"
}
```

This is a change from July, which recorded no sport restriction and eighteen
catalogs. The current manifest declares nine `sport` catalogs:

```
sports_live  sports_today  sports_basketball  sports_football
sports_american_football  sports_baseball  sports_fight  sports_golf
sports_recaps
```

All nine declare the `search` extra. The league filter does not appear to be
exclusive in practice: `sports_basketball` returned WNBA and Australian NBL
fixtures while `includeLeagues` lists only NFL and Premier League.

## Subscription

July recorded Premium access active through 2026-08-18. The user reported
playing a live stream on 2026-09-20, which indicates active access, but no
billing surface was inspected by this session.
