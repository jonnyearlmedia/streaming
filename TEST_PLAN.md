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

- AIOStreams: HTTP 200, version 2.30.6; stream, catalog, meta, subtitles;
  one library catalog declared.
- AIOMetadata: HTTP 200, version 2.8.0; catalog, meta, subtitles; 76 recorded
  catalog/search variants.

## Catalog validation

1. Confirm expected leading catalog order from the manifest.
2. Request representative catalog endpoints.
3. Require HTTP 200 and a non-empty `metas` array.
4. Confirm visible home rows after Stremio refresh.

Recorded leading order: Seasonal; Trakt Trending Series; Trakt Trending Movie;
Latest Airing; Latest Digital Release; TMDB Popular. The full exact live order
was not preserved and remains an explicit evidence gap.

## Artwork validation

1. Resolve an OpenPosterDB URL for a known IMDb identifier.
2. Follow redirects.
3. Require an image content type and a decodable image.
4. Inspect the image for expected rating badges.

Current result: HTTP 302 then HTTP 200, JPEG, 580 × 870, 139,989 bytes, with
four visible rating badges for `tt0063350`.

## Stream, delivery, deduplication, and language validation

Test identifier: `tt0063350`, *Night of the Living Dead* (1968).

1. Request the AIOStreams movie stream endpoint.
2. Require HTTP 200 and non-empty results.
3. Build a deduplication key from `infoHash`, `fileIdx`, and `url`.
4. Compare total results with unique keys.
5. Inspect formatted descriptions for TorBox, cached/instant, and language
   markers.

Current result:

- 15 streams returned.
- 15 unique stream keys; zero duplicates remained.
- 11 results visibly marked cached/instant.
- TorBox markers were present.
- English markers were shown where media information was available.
- Sources visible in this test included Meteor, STorz, Knaben, Sootio, and
  TorBox-related results. Absence of a provider marker in this one title is not
  evidence that the configured provider is disabled.

## Installed-add-on audit

Compare the Stremio Installed view against
`evidence/inventory/installed-addons.json` and capture dated screenshots.

## Open evidence gaps

- complete live AIOMetadata catalog-order export;
- television episode stream-results screenshot;
- successful Stremio Trakt scrobbling OAuth proof;
- canonical Brainrot Formatter source and import proof;
- proof of Cinemeta suppression/reordering if later selected.

