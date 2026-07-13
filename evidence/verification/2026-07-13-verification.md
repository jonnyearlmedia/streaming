# Verification evidence — 2026-07-13

All personalized URLs, UUIDs, passwords, API keys, and debrid tokens are
redacted. No playback was started for these tests.

## Trakt scrobbling

- The Trakt web profile resolved to the existing `brownjonnybravo` profile.
- After the OAuth callback and a Stremio restart, Settings displayed
  `Trakt Scrobbling` with `Log out`; the previous `Authenticate` label was no
  longer present.
- Redacted text evidence: `trakt-authenticated-2026-07-13.txt`.

## Installed add-ons

The Stremio Installed view contained exactly:

1. Cinemeta 3.0.14
2. OpenSubtitles v3 1.0.0
3. Local Files (without catalog support) 1.10.0
4. AIOStreams 2.30.6, Tamtaro Complete SEL Setup 2.6.1
5. AIOMetadata | ElfHosted 2.8.0

Final screenshots:

- `../screenshots/2026-07-13-final-installed-addons-1.png`
- `../screenshots/2026-07-13-final-installed-addons-2.png`

No standalone Torrentio, Comet, or MediaFusion add-on was present.

## Every installed manifest

- Cinemeta: HTTP 200, version 3.0.14; catalog, meta, addon_catalog.
- OpenSubtitles v3: HTTP 200, version 1.0.0; subtitles.
- Local Files: HTTP 200, version 1.10.0; meta and stream.
- AIOStreams: HTTP 200, version 2.30.6; stream, catalog, meta, subtitles.
- AIOMetadata: HTTP 200, version 2.8.0; catalog, meta, subtitles.

Personalized manifest locations are redacted; public and loopback locations
are recorded in `../inventory/manifest-locations.redacted.json`.

## AIOMetadata manifest and catalogs

- Manifest HTTP status: 200.
- Version: 2.8.0.
- Resources: catalog, meta, subtitles.
- Manifest entries: 76 total. After cleanup, ten retain a home flag including
  the non-row Calendar special resource; nine AIOMetadata discovery rows are
  visible on Home.
- Representative Trakt Trending and TMDB Popular movie/series endpoints all
  returned HTTP 200 with non-empty metadata arrays.
- The complete live order is recorded in
  `../config/catalog-order-2026-07-13.md`.

The saved configuration was authenticated, loaded, reduced, saved, and then
cleanly reinstalled after Stremio retained a stale cached manifest. The final
visible order is recorded in
`../config/final-catalog-layout-2026-07-13.md`.

Final visual evidence:

- `../screenshots/2026-07-13-final-home-top.png`
- `../screenshots/2026-07-13-final-home-discovery-artwork.png`

## OpenPosterDB artwork

AIOMetadata catalog and metadata responses proxy rating posters through
`aiometadata.elfhosted.com`. The nested poster source host was
`openposterdb.com`.

Six representative posters returned HTTP 200 and `image/jpeg`:

- Movies: Enola Holmes 3; Voicemails for Isabelle; Citizen Vigilante.
- Series: House of the Dragon; Silo; FROM.

No personalized poster URL or key is recorded here.

The final discovery screenshot visibly shows OpenPosterDB rating badges across
movie and television posters.

## OpenSubtitles v3

- Manifest: HTTP 200, version 1.0.0, subtitles resource for movie and series.
- Public-domain movie test: Big Buck Bunny (`tt1254207`) returned HTTP 200,
  two subtitle records, including English.
- Public-domain television test: The Lucy Show S01E01
  (`tt0055686:1:1`) returned HTTP 200, seven subtitle records, including
  English and Spanish.

## AIOStreams visible-result tests

- Movie: *Night of the Living Dead* displayed 14 TorBox-backed AIOStreams
  choices with cached/instant results first and readable Tamtaro formatting.
  Screenshot: `../screenshots/2026-07-13-movie-stream-results.png`.
- Television: *The Lucy Show* S01E01 displayed a cached individual episode and
  an uncached season pack as distinct results. Screenshot:
  `../screenshots/2026-07-13-tv-stream-results.png`.
- Anime/foreign-language: *Momotaro, Sacred Sailors* displayed six Japanese
  TorBox-backed results from Comet, Knaben, and STorz. No cached result was
  available, and original-language results remained visible. Screenshot:
  `../screenshots/2026-07-13-anime-foreign-stream-results.png`.
- No playback was started.

## Current upstream comparison

- Tamtaro's official repository still reports Complete and Partial template
  version 2.6.1; Complete is the installed choice.
- The official README recommends a nightly AIOStreams instance and identifies
  AIOMetadata as a separate add-on.
- No canonical component named Brainrot Formatter appears in the official
  Tamtaro or AIOStreams repositories. Tamtaro's clean formatter remains the
  verified formatter.
- The Tamtaro 2.4.0–2.6.1 changelog says TorBox Search was replaced by
  Meteor-based TorBox search, NekoBT replaced AnimeTosho, SearchNZB remains for
  TorBox Pro, and MediaFusion defaults disabled. These upstream changes require
  a live authenticated AIOStreams configuration audit before older
  import-time source notes are treated as current.

## Final Stremio state

- Trakt evidence: `trakt-authenticated-2026-07-13.txt`.
- Installed add-ons: exactly five, as listed above.
- Post-refresh inventory evidence:
  `../screenshots/2026-07-13-final-installed-addons-post-refresh.png`.
- Cinemeta is retained as a narrow compatibility fallback; its four
  Popular/Featured rows replace the suppressed AIOMetadata Popular rows.
- Brainrot Formatter remains intentionally skipped because no canonical source
  exists in the official repositories.
