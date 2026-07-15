# Sports Streams Premium configuration evidence — 2026-07-15

## Installed state

- Name/version: Sports Streams 1.2.0.
- Add-on ID: `community.sports.fly`.
- Personalized host: `premium-us1.highfly.dev`.
- Token and encoded manifest configuration: redacted.
- Resources: catalog, meta, stream for the custom `sport` type.
- Subscription: user-purchased monthly access, active through 2026-08-18 when
  configured.

## Configuration

- Server: US-1.
- Timezone: US Pacific.
- Sports: none selected as a restriction, meaning all sports remain available.
- Live Only: disabled so scheduled events remain visible.
- Stream name template: `Live Sports · {stream.channelName|Game Feed}`.
- Stream description template: height, audio label, approximate required Mbps,
  Premium-feed status, and delay.

The verified Premium form did not expose language or quality-preference
controls despite those features appearing in the provider's comparison copy.
No language or quality filter is therefore claimed. The readable description
helps the user identify resolution and bandwidth requirements but does not
change source ordering.

## Verification

- Three manifest samples per region all returned HTTP 200. Observed averages:
  US-1 388 ms, US-2 414 ms, Main 429 ms.
- Personalized manifest returned HTTP 200, ID `community.sports.fly`, version
  1.2.0, and 18 catalogs.
- All 18 catalog endpoints returned HTTP 200; 15 were non-empty and three were
  empty at the sampling moment.
- The extra Premium catalog is Recaps.
- No playback was started for this verification.
- Jonny, Nene, Moncada, and Armada each retained exactly one Sports Streams
  entry, verified on the Premium US-1 host.
- The free `sportsfree-us2.highfly.dev` manifest was removed from every
  profile.
- Add-on management was re-disabled for Nene, Moncada, and Armada.

Premium provides a dedicated server, priority prewarming, and CDN backup
sources, but it cannot guarantee that every upstream live feed will be healthy.
