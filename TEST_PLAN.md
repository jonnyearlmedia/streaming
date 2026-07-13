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
- AIOMetadata: HTTP 200, version 2.8.0; catalog, meta, subtitles; 76 recorded
  catalog/search variants.

## Catalog validation

1. Confirm expected leading catalog order from the manifest.
2. Request representative catalog endpoints.
3. Require HTTP 200 and a non-empty `metas` array.
4. Confirm visible home rows after Stremio refresh.

The pre-cleanup 76-entry order is preserved in
`evidence/config/catalog-order-2026-07-13.md`. After authentication and
cleanup, the final manifest still exposes all 76 discovery/search definitions
but only ten retain a home flag, including the non-row Calendar resource. Nine
AIOMetadata discovery rows are visible on Home. The final Stremio row order is
recorded in `evidence/config/final-catalog-layout-2026-07-13.md`.

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
