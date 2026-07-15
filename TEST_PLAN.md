# Test plan

## Safety prerequisites

- Use a public-domain or otherwise authorized title.
- Do not start playback merely to validate a manifest or result list.
- Redact personalized URLs, UUIDs, tokens, and API keys from captured output.
- Do not purchase, upgrade, or follow referral links.

## Manifest validation

For each personalized installed manifest:

1. Request `manifest.json`.
2. Require HTTP 200.
3. Record name, version, resource declarations, types, and catalog count.
4. Never write the personalized URL to logs.

Current evidence:

- Cinemeta: HTTP 200, version 3.0.14; catalog, meta, addon_catalog.
- OpenSubtitles v3: HTTP 200, version 1.0.0; subtitles.
- Local Files: HTTP 200, version 1.10.0; meta and stream.
- AIOStreams: HTTP 200, version 2.30.6; stream, catalog, meta, subtitles;
  one library catalog declared.
- AIOMetadata: HTTP 200, version 2.8.0; catalog, meta, subtitles; 33 final
  catalog declarations.

## Catalog validation

1. Confirm expected leading catalog order from the manifest.
2. Request representative catalog endpoints.
3. Require HTTP 200 and a non-empty `metas` array.
4. Confirm visible home rows after Stremio refresh.

The pre-cleanup 76-entry order remains preserved in
`evidence/config/catalog-order-2026-07-13.md` as historical evidence. The
provider-restoration pass reduced 106 configured catalog cards to the 25
intended Home catalogs. The final manifest has 33 declarations: 25 Home
shelves, seven search catalogs, and Calendar. All 16 provider movie/show
endpoints returned HTTP 200 and 20 items. The final Stremio order is recorded
in `evidence/config/final-catalog-layout-2026-07-13.md`.

Provider validation procedure:

1. Require the authenticated provider manager to show United States.
2. Require Netflix, Hulu, Max, Disney+, Prime Video, Apple TV+, Peacock, and
   Paramount+ movie/show shelves in the manifest and Home UI.
3. Request every provider catalog endpoint without starting playback.
4. Require HTTP 200 and non-empty results.
5. Confirm anime shelves occur after the specialty shelves.

Current result: all 16 endpoints returned HTTP 200 with 20 items each. The
final clean reinstall completed without the prior descriptor-size warning.

## Artwork validation

1. Resolve an OpenPosterDB URL for a known IMDb identifier.
2. Follow redirects.
3. Require an image content type and a decodable image.
4. Inspect the image for expected rating badges.

Current results include the original HTTP 200 JPEG test for `tt0063350` plus a
2026-07-13 six-title proxy test. Three movie and three series posters returned
HTTP 200 JPEG, and each nested poster source host was `openposterdb.com`.

## Stream, delivery, deduplication, and language validation

Test identifier: `tt0063350`, *Night of the Living Dead* (1968).

1. Request the AIOStreams movie stream endpoint.
2. Require HTTP 200 and non-empty results.
3. Build a deduplication key from `infoHash`, `fileIdx`, and `url`.
4. Compare total results with unique keys.
5. Inspect formatted descriptions for TorBox, cached/instant, and language
   markers.

Endpoint result:

- 15 streams returned.
- 15 unique stream keys; zero duplicates remained.
- 11 results visibly marked cached/instant.
- TorBox markers were present.
- English markers were shown where media information was available.
- Sources visible in this test included Meteor, STorz, Knaben, Sootio, and
  TorBox-related results. Absence of a provider marker in this one title is not
  evidence that the configured provider is disabled.

Visible result-list checks, without starting playback:

- *Night of the Living Dead* (movie): 14 AIOStreams results; TorBox markers;
  cached/instant results before uncached; readable Tamtaro formatting.
- *The Lucy Show* S01E01: two results; cached individual episode first and
  uncached season pack second; both retained as distinct choices.
- *Momotaro, Sacred Sailors* (anime/foreign-language): six TorBox-backed
  Japanese results from Comet, Knaben, and STorz; original-language results
  were not hidden. No cached result was available for this title.

Living-room language audit, 2026-07-13:

- Reloaded the saved AIOStreams configuration and confirmed preferred order
  English, Dual Audio, Multi, Dubbed, Original, Unknown.
- Confirmed Language is first in Global Cached and Global Uncached for movies,
  series, and anime. Cache remains the outer instant/fallback split.
- *Night of the Living Dead*: first three visible results were an
  original/inferred-English release with no explicit marker, a confirmed
  English-audio release with English subtitles, and another release with no
  explicit audio marker. This proves the source-metadata limitation; subtitles
  were not counted as audio.
- *The Lucy Show* S01E01: only two results were available. The cached individual
  episode remained above the uncached season pack. Neither filename declared an
  audio track, so their language could not be independently confirmed from the
  result list.
- *Momotaro, Sacred Sailors*: first two results explicitly declared Japanese
  audio; the remaining four did not expose a language marker. No English dub
  was available in this legal/public-domain test set, so dub-before-original
  could not be directly demonstrated. Original-language results correctly
  remained available.
- No playback was started. The Onn 4K Pro player-side audio auto-selection and
  default-English settings require confirmation on the device.

User-initiated playback stability audit, 2026-07-13:

- The already-playing movie was a 55.5 GB UHD Blu-ray remux estimated at
  68.5 Mbps, with HEVC, Dolby Vision, and lossless Atmos audio.
- The Mac was not compute-bound; system monitoring showed substantial idle CPU
  time while the pause behavior occurred.
- The active Wi-Fi link was 2.4 GHz, channel 11, 20 MHz. Five Stremio traffic
  samples produced roughly 47–81 Mbps of incoming throughput, leaving too
  little stable margin for a 68.5 Mbps average-bitrate file.
- The authenticated AIOStreams UI was changed and saved with maximum estimated
  bitrates of 40 Mbps for movies, 30 Mbps for series, and 20 Mbps for anime.
  All 33 maximum fields (Global plus every resolution-specific and Unknown
  movie/series/anime path) were checked and contained only those three values.
- No additional playback was started for verification. The new rule applies on
  the next stream-list request; it cannot replace a file already playing.

## Installed-add-on audit

Compare the Stremio Installed view against
`evidence/inventory/installed-addons.json` and capture dated screenshots.

## Supporters profile validation

1. Require the profile chooser to show exactly Jonny, Nene, Moncada, and
   Armada.
2. Require Jonny to carry the Admin label.
3. Confirm each secondary profile loads a personalized AIOMetadata provider
   shelf with OpenPosterDB rating artwork.
4. On one secondary profile, inspect a legal/public-domain title and require a
   non-empty AIOStreams/TorBox result list without starting playback.
5. Confirm Jonny Settings shows `Log out` for Trakt Scrobbling and secondary
   profiles show `Authenticate`.
6. Confirm secondary-profile defaults are English for interface, subtitles,
   and audio, with Auto-Play Next Episode enabled.

Current result, 2026-07-14:

- The chooser showed Jonny (Admin), Nene, Moncada, and Armada.
- Nene, Moncada, and Armada each displayed a non-empty Netflix movie shelf
  with OpenPosterDB rating badges.
- Nene returned cached/instant TorBox-backed AIOStreams choices for *Night of
  the Living Dead*. Several visible choices declared English. Playback was not
  started.
- Jonny retained the existing Trakt authorization. Nene and Armada showed
  `Authenticate`, so the owner connection was not cloned into those profiles.
- English interface/subtitle/audio defaults and Auto-Play Next Episode were
  observed on secondary-profile settings.

## Sports Streams validation

1. Request the public manifest without starting playback.
2. Require HTTP 200 and record its ID, version, custom type, resources, and
   catalogs.
3. Request every declared catalog endpoint and record HTTP status and result
   count without selecting an event.
4. Confirm configuration capability separately from paid-only features; do not
   purchase, subscribe, start a trial, or follow upgrade/referral links.

Current result, 2026-07-14: manifest HTTP 200, version 1.2.0, ID
`community.sports.fly`, custom `sport` type, catalog/meta/stream resources, and
17 `notForHome` catalogs. All 17 catalog endpoints returned HTTP 200; 14 were
non-empty and three were empty at the moment sampled. The user's already-running
basketball session proved the installed manifest could return a live stream;
no playback was started or stopped for this audit.

## OpenSubtitles v3 validation

1. Request the public OpenSubtitles v3 manifest and require HTTP 200.
2. Request a public-domain movie subtitle endpoint and require English output.
3. Request a public-domain television episode subtitle endpoint and require
   English output.

Current result: manifest HTTP 200, v1.0.0; Big Buck Bunny returned two subtitle
records including English; The Lucy Show S01E01 returned seven subtitle
records including English and Spanish.

## Remaining limitations

- No canonical Brainrot Formatter source exists in the official projects; the
  Tamtaro formatter is intentionally retained.
- The anime test used a public-domain feature film instead of a current episode
  to comply with the repository's legal/public-domain test rule.
- Cinemeta was not suppressed through Cinebye. Its narrow fallback role and
  non-duplicative row treatment are documented and visually verified.
- Official "where to watch" detail-page availability is not emitted by
  AIOMetadata's standard movie/series metadata. WatchHub was identified as the
  exact compatible official add-on but intentionally not installed in this
  discovery-only change.
- Audio-language detection is only as reliable as the torrent/media metadata.
  Unknown and Original cannot be safely excluded globally without removing
  valid English and foreign-original files.
- Bitrate values are estimates derived from file size and duration and do not
  represent momentary peaks. Wi-Fi congestion can still affect any stream;
  Ethernet or a strong 5 GHz connection remains preferable on the Onn device.
- Sports Streams is independent of AIOStreams. Its source ordering, language,
  quality, and reliability are not governed by the TorBox movie/series rules.
  The free configurator only exposes sport selection and Live Only.
