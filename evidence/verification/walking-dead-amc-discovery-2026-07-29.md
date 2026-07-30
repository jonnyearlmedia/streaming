# Walking Dead universe and AMC+ discovery verification

Date: 2026-07-29

Timezone: America/Los_Angeles

## Authorized change

Add two family-facing AIOMetadata Home rows:

1. `The Walking Dead Universe`
2. `AMC+`

The Walking Dead row is intended to make the main television universe easy to
browse. The AMC+ row is a discovery shelf, not a live channel or subscription
integration.

## Saved configuration

- Reused the exact authenticated AIOMetadata configuration already installed.
- Added public TMDB list 8650238 as `The Walking Dead Universe`.
- Added the direct United States AMC+ provider as a series catalog.
- Sorted AMC+ by first air date, descending.
- Ordered the new rows first and second in the AIOMetadata Home section.
- Saved without recording any personalized manifest URL, identifier, password,
  token, or API key in this repository.

## Endpoint verification

- AIOMetadata manifest: HTTP 200, version 2.8.0.
- Manifest resources: catalog, meta, subtitles.
- Manifest catalog declarations: 35 total.
- Home catalogs: 27.
- Search catalogs: 7.
- Special catalogs: Calendar.
- Walking Dead endpoint: HTTP 200, 7 items.
- AMC+ endpoint: HTTP 200, 20 items on the sampled first page.

The Walking Dead endpoint returned:

1. The Walking Dead
2. Fear the Walking Dead
3. The Walking Dead: World Beyond
4. Tales of the Walking Dead
5. The Walking Dead: Dead City
6. The Walking Dead: Daryl Dixon
7. The Walking Dead: The Ones Who Live

## Stremio verification

- Reapplied the saved AIOMetadata manifest with `Apply this change to all
  profiles` enabled.
- Restored the intended installed order so AIOMetadata remains before Sports
  Streams.
- Jonny Home visibly rendered both rows.
- Nene Home visibly rendered both rows as a representative secondary-profile
  check.
- The Walking Dead row appeared first in the AIOMetadata section, followed by
  AMC+, then the existing Trending rows.

## Safety boundary

- No playback was started.
- No purchase or subscription was made.
- No personalized credential or manifest path is recorded here.
- No AIOStreams, TorBox, Sports Streams, Trakt, subtitle, profile-history,
  stream-ranking, or sports setting changed.
