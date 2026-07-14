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

## Installed-add-on audit

Compare the Stremio Installed view against
`evidence/inventory/installed-addons.json` and capture dated screenshots.

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
