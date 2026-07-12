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

