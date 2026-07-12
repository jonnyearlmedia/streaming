# Stremio setup status

Last audited: 2026-07-12 (America/Los_Angeles)

This is an architecture-review checkpoint. No Stremio changes should be made
from this point without reviewing `DECISIONS.md` and the evidence gaps in
`TEST_PLAN.md`.

## Runtime

- Stremio shell 5.1.25 is installed in `/Applications/Stremio.app`.
- Stremio UI reported app version 6.0.1-beta.06.
- Local Stremio server 4.21.0 was reachable at `http://127.0.0.1:11470`.
- The account is signed in and the desktop Installed view was audited.

## Installed add-ons

1. Cinemeta 3.0.14 — built-in catalog/metadata compatibility fallback.
2. OpenSubtitles v3 1.0.0 — subtitle provider.
3. Local Files 1.10.0 — local-file compatibility.
4. AIOStreams 2.30.6 — stream aggregation and management, configured with
   Tamtaro Complete SEL Setup 2.6.1, Standard SEL, English first, and TorBox Pro.
5. AIOMetadata | ElfHosted 2.8.0 — catalogs, metadata, Trakt/MDBList discovery,
   and OpenPosterDB artwork.

The structured inventory is in
`evidence/inventory/installed-addons.json`.

## Removed add-ons

- Torrentio RD 0.0.15
- MediaFusion | ElfHosted RD 5.5.2
- Streaming Catalogs 1.1.1
- M3U/EPG TV Addon 1.2.0
- OpenSubtitles 0.24.0
- YouTube, version not recorded
- Public Domain Movies, version not recorded

Comet had previously been aborted as a separate add-on. Comet is now an
internal source in the official Tamtaro AIOStreams configuration.

## Configuration state

### AIOStreams

- Instance: Yeb nightly at `https://aiostreams-nightly.fortheweak.cloud/`.
- Reported nightly build at setup: `2026.07.10.1236-nightly`.
- Imported template: official Tamtaro Complete SEL Setup 2.6.1.
- Partial template: not used.
- SEL: Standard.
- Preferred language: English first.
- Debrid delivery: existing TorBox Pro account.
- Formatter: current Tamtaro default from the Complete template.
- Internal source set recorded at import: SeaDex, Library, Meteor, Comet,
  STorz, Torrentio, MediaFusion, Knaben, AnimeTosho, Sootio, and TorBox Search
  with NZB support for TorBox Pro.

### AIOMetadata

- Instance: `https://aiometadata.elfhosted.com/`.
- Version: 2.8.0.
- Imported configuration: Tamtaro anime-inclusive community JSON.
- Validated services: TMDB, TVDB, MDBList, Fanart.tv.
- English Art Only: enabled.
- OpenPosterDB: enabled through the RPDB-compatible custom poster pattern.
- AI search: disabled; no Gemini credential was requested.
- Recorded catalog/search variants: 76.

Personalized hosted configuration paths, passwords, UUIDs, API keys, and debrid
tokens are stored outside the repository in the user's credential note. The
redacted locations are in
`evidence/inventory/manifest-locations.redacted.json`.

## Verification evidence

- AIOStreams manifest: HTTP 200, version 2.30.6, stream/catalog/meta/subtitles.
- AIOMetadata manifest: HTTP 200, version 2.8.0,
  catalog/meta/subtitles.
- AIOMetadata UI: all four supplied keys reported valid.
- OpenPosterDB: HTTP 200 JPEG after redirect, 580 × 870, four visible badges.
- Public-domain stream test: 15 results, 15 unique keys, zero duplicate keys.
- Cached/instant markers: 11 of 15 test results.
- English markers and TorBox service markers were visible where media metadata
  was available.
- Final Installed view: five add-ons matching the list above.

See `evidence/verification/verification-log.md` for the detailed record and
`evidence/screenshots/` for visual evidence.

## Unresolved decisions and evidence gaps

- No canonical Brainrot Formatter source has been selected; Tamtaro default
  remains active.
- Stremio Settings still showed `Authenticate` for Trakt scrobbling. Trakt
  discovery catalogs are present through AIOMetadata, but scrobbling is not
  claimed complete.
- Cinemeta remains installed; no successful Cinebye suppression/reordering is
  claimed.
- Only the leading catalog order was recorded; the complete exact 76-entry
  live order was not preserved.
- A representative television stream-results screenshot was not captured. A
  paused television playback screenshot is retained and labeled as such.

## Scope freeze for this checkpoint

- Do not continue installation from this checkpoint.
- Do not change or remove Real-Debrid state from this checkpoint.
- Do not research IPTV providers.
- Do not self-host components.
- Do not purchase, renew, upgrade, subscribe, or use referral links without
  explicit user consent at transaction time.
