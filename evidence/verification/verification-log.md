# Verification log

All times are on 2026-07-12 in America/Los_Angeles unless stated otherwise.

## Initial installed-add-on audit

Observed before migration cleanup:

- Cinemeta 3.0.14
- OpenSubtitles v3 1.0.0
- OpenSubtitles 0.24.0
- Local Files 1.10.0
- Torrentio RD 0.0.15
- Streaming Catalogs 1.1.1
- M3U/EPG TV Addon 1.2.0
- MediaFusion | ElfHosted RD 5.5.2

The previous status document recorded YouTube and Public Domain Movies as
already removed. Comet had previously been aborted and was not separately
installed.

## AIOStreams manifest and stream test

- Manifest HTTP status: 200.
- Name/version: AIOStreams 2.30.6.
- Resources: stream, catalog, meta, subtitles.
- Declared catalogs: one library catalog.
- Public-domain test: `stream/movie/tt0063350.json`.
- Stream endpoint status: 200.
- Returned streams: 15.
- Unique compound keys: 15.
- Duplicate keys: 0.
- Cached/instant markers: 11.
- Recorded provider markers: Meteor 3, STorz 7, Knaben 1, Sootio 1, TorBox 3.
- Several descriptions showed small-caps English markers (`ᴇɴ`) and TorBox
  service markers (`[TB]`).

## AIOMetadata configuration and manifest test

- Imported Tamtaro anime-inclusive configuration JSON.
- Imported configuration originated with AIOMetadata 1.24.2; the running hosted
  instance reported 2.8.0, so relevant fields were checked after import.
- Key validation UI reported: `All 4 key(s) are valid! Successfully validated 4 keys.`
- Verified keys: TMDB, TVDB, MDBList, Fanart.tv.
- AI search remained disabled because no Gemini key was requested.
- English Art Only enabled.
- Timezone restored to America/Los_Angeles/Pacific.
- Manifest HTTP status: 200.
- Manifest version: 2.8.0.
- Resources: catalog, meta, subtitles.
- Recorded manifest catalog/search variants: 76.

## Artwork test

- Provider: OpenPosterDB RPDB-compatible endpoint.
- Test IMDb ID: `tt0063350`.
- HTTP chain: 302 then 200.
- Content type: image/jpeg.
- Content length: 139,989 bytes.
- Decoded dimensions: 580 × 870.
- Visual inspection: poster loaded with four ratings badges.

## Cleanup verification

Removed after TorBox/AIOStreams verification and explicit user confirmation:

- OpenSubtitles 0.24.0
- Torrentio RD 0.0.15
- Streaming Catalogs 1.1.1
- M3U/EPG TV Addon 1.2.0
- MediaFusion | ElfHosted RD 5.5.2

Final Installed view recorded:

- Cinemeta 3.0.14
- OpenSubtitles v3 1.0.0
- Local Files 1.10.0
- AIOStreams 2.30.6 / Tamtaro Complete SEL 2.6.1
- AIOMetadata | ElfHosted 2.8.0

## Security event

An unexpected macOS administrator-access prompt for a script named “Jonny
Rise” appeared while UI evidence was being captured. `Don't Allow` was selected.
No password was entered and no elevated access was granted.

## Evidence limitations

- The representative movie stream screenshot predates cleanup and visibly
  shows the then-installed Torrentio RD results. It is retained as historical
  evidence, not as the final stream source.
- The television screenshot is a paused playback state and not a stream-results
  screenshot.
- No successful Trakt scrobbling OAuth confirmation was collected.
- No complete exact 76-entry catalog-order export was preserved.

These limitations describe the 2026-07-12 checkpoint only. The 2026-07-13
completion below closes the Trakt, catalog-order, television-result, and final
home-layout gaps.

## 2026-07-13 follow-up verification

- Trakt OAuth completed against the existing `brownjonnybravo` profile.
- Stremio Settings showed `Trakt Scrobbling` with `Log out` after restart.
- Installed-list audit again showed only Cinemeta, OpenSubtitles v3, Local
  Files, AIOStreams, and AIOMetadata.
- AIOMetadata manifest returned HTTP 200, version 2.8.0, resources catalog,
  meta, and subtitles, with 76 entries. The complete order is now preserved in
  `evidence/config/catalog-order-2026-07-13.md`.
- The preserved pre-cleanup manifest had 67 home-eligible entries.
- Three movie and three series poster requests returned HTTP 200 JPEG; the
  proxied source host was `openposterdb.com` for all six.
- OpenSubtitles v3 manifest returned HTTP 200. Big Buck Bunny returned two
  subtitle records including English; The Lucy Show S01E01 returned seven
  records including English and Spanish.
- The saved AIOMetadata configuration was subsequently authenticated and
  loaded. Repetitive Home rows were disabled while all 76 catalog/search
  definitions remained available. The final manifest had ten home-flagged
  definitions including Calendar, and nine visible AIOMetadata discovery rows.
- AIOMetadata was uninstalled and reinstalled from the same personalized
  manifest location to clear Stremio's stale manifest cache. Final Installed
  view again showed exactly the expected five add-ons.
- Final visible Home order was verified: Continue Watching; Cinemeta Popular
  and Featured movie/series; Trakt Trending series/movie; Latest Airing;
  Latest Digital Release; MAL Airing Now; AniList Trending; Must-See Mindfuck;
  Top Documentaries movie/series.
- Movie result-list check: 14 TorBox-backed results for *Night of the Living
  Dead*, with cached/instant choices prioritized.
- Television result-list check: *The Lucy Show* S01E01 retained both an
  individual episode and a season pack as distinct choices.
- Anime/foreign-language result-list check: six Japanese TorBox-backed results
  for *Momotaro, Sacred Sailors*, including internal Comet, Knaben, and STorz
  sources. Original-language content was not hidden.
- No playback was started for any 2026-07-13 stream verification.
- Installed-manifest audit completed: Cinemeta 3.0.14 (HTTP 200;
  catalog/meta/addon_catalog), OpenSubtitles v3 1.0.0 (HTTP 200; subtitles),
  Local Files 1.10.0 (HTTP 200; meta/stream), AIOStreams 2.30.6 (HTTP 200;
  stream/catalog/meta/subtitles), and AIOMetadata 2.8.0 (HTTP 200;
  catalog/meta/subtitles).

## 2026-07-13 provider-discovery correction

- Loaded the authenticated AIOMetadata 2.8.0 configuration; existing TMDB,
  TVDB, MDBList, Fanart.tv, OpenPosterDB, metadata, and search settings were
  preserved.
- Streaming Providers was filtered to United States. The selected services are
  Netflix, HBO Max, Disney+, Prime Video, Apple TV+, Paramount+, Peacock
  Premium, and Hulu. No obscure provider was enabled.
- Provider catalog sorting was checked in the UI and remains Popularity,
  Descending.
- Family-facing labels were changed to plain English. Backend brands such as
  Trakt, MDBList, MAL, and AniList do not appear in the final shelf names.
- Final AIOMetadata Home order: Trending — Movie/Series; New Releases — Movie;
  New Episodes — Series; movie/series pairs for Netflix, Hulu, Max, Disney+,
  Prime Video, Apple TV+, Peacock, and Paramount+; Mind-Bending — Movie;
  Documentaries — Movie/Series; Anime Picks; New Anime Episodes.
- Anime was moved below the specialty rows at the very bottom.
- First clean reinstall exposed Stremio's `Max descriptor size reached`
  warning. The authenticated catalog builder contained 106 cards, including
  unused hidden duplicates and legacy catalogs. Eighty-one unused cards were
  deleted, leaving exactly the intended 25.
- Final manifest returned HTTP 200, version 2.8.0, resources catalog/meta/
  subtitles, with 33 declarations: 25 Home catalogs, seven search catalogs,
  and Calendar.
- All 16 provider movie/show endpoints returned HTTP 200 and 20 items.
- Second clean uninstall/reinstall completed without the descriptor-size
  warning. Installed view again showed the same five add-ons.
- A final label-only clean reinstall also completed without the warning and
  produced compact Stremio titles such as `Netflix - Movie` and
  `Netflix - Series`.
- Actual Stremio Home screenshots show non-empty provider rows and
  OpenPosterDB-style rating artwork on movie and television posters.
- AIOMetadata's source was inspected: standard TMDB movie/series metadata
  builders do not emit watch-provider availability on detail pages. The exact
  official compatible add-on is WatchHub 1.15.0 (`org.stremio.watchhub`),
  manifest `https://watchhub.strem.io/manifest.json`. It was not installed
  because it adds a `stream` resource and the authorized scope was discovery
  only.
