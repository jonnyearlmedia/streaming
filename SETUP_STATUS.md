# Stremio setup status

Last audited: 2026-07-13 (America/Los_Angeles)

The premium setup is complete and has been re-audited after a clean
AIOMetadata manifest refresh.

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
- Template-resolved TorBox Pro source set for Tamtaro Complete 2.6.1: SeaDex,
  Library, nekoBT, STorz, Meteor, Knaben, Torrentio, Comet, Sootio, and
  SearchNZB. MediaFusion remains defined inside AIOStreams but is disabled by
  the current template default; TorBox torrent/library search is handled by
  Meteor, while SearchNZB is retained for the Pro tier.

### AIOMetadata

- Instance: `https://aiometadata.elfhosted.com/`.
- Version: 2.8.0.
- Imported configuration: Tamtaro anime-inclusive community JSON.
- Validated services: TMDB, TVDB, MDBList, Fanart.tv.
- English Art Only: enabled.
- OpenPosterDB: enabled through the RPDB-compatible custom poster pattern.
- AI search: disabled; no Gemini credential was requested.
- Recorded catalog/search variants: 76.
- Visible AIOMetadata home rows: Trakt Trending (series and movie), Latest
  Airing, Latest Digital Release, MAL Airing Now, AniList Trending, Must-See
  Mindfuck, and Top Documentaries (movie and series).
- AIOMetadata Popular rows were suppressed because Cinemeta already supplies
  the equivalent movie and series rows. Search resources remain available.

Personalized hosted configuration paths, passwords, UUIDs, API keys, and debrid
tokens are stored outside the repository in the user's credential note. The
redacted locations are in
`evidence/inventory/manifest-locations.redacted.json`.

## Verification evidence

- Cinemeta manifest: HTTP 200, version 3.0.14,
  catalog/meta/addon_catalog.
- OpenSubtitles v3 manifest: HTTP 200, version 1.0.0, subtitles.
- Local Files manifest: HTTP 200, version 1.10.0, meta/stream.
- AIOStreams manifest: HTTP 200, version 2.30.6, stream/catalog/meta/subtitles.
- AIOMetadata manifest: HTTP 200, version 2.8.0,
  catalog/meta/subtitles.
- AIOMetadata UI: all four supplied keys reported valid.
- OpenPosterDB: HTTP 200 JPEG after redirect, 580 × 870, four visible badges.
- Public-domain endpoint test: 15 results, 15 unique keys, zero duplicate keys.
- Cached/instant markers: 11 of 15 endpoint-test results.
- Visible movie test: 14 TorBox-backed AIOStreams results, with cached results
  ahead of uncached results.
- Visible television test: two TorBox-backed results; an individual episode
  and a season pack were both retained and not incorrectly deduplicated.
- Visible anime/foreign-language test: six TorBox-backed Japanese results;
  original-language results were preserved.
- English markers and TorBox service markers were visible where media metadata
  was available.
- Final Installed view: five add-ons matching the list above.

See `evidence/verification/verification-log.md` for the detailed record and
`evidence/screenshots/` for visual evidence.

## 2026-07-13 completion update

- Trakt scrobbling OAuth is authenticated to the existing
  `brownjonnybravo` Trakt profile. Stremio Settings now shows `Log out`, not
  `Authenticate`.
- The installed-add-on list was re-audited and still contains exactly the five
  entries recorded above.
- The AIOMetadata configuration was authenticated, reduced, saved, and then
  cleanly reinstalled in Stremio. The final manifest returned HTTP 200,
  version 2.8.0, with 76 total entries. Ten entries retain a home flag,
  including the non-row Calendar resource; nine AIOMetadata discovery rows are
  visible on the home surface.
- The finished Stremio home layout contains Continue Watching, four compact
  Cinemeta compatibility rows (Popular and Featured for movie and series),
  followed by the nine AIOMetadata discovery rows listed above.
- OpenPosterDB was re-verified across three movie and three series posters;
  every request returned HTTP 200 JPEG through the AIOMetadata proxy, with the
  nested source host resolving to `openposterdb.com`.
- OpenSubtitles v3 returned English subtitles for a public-domain movie and
  television episode.

## Remaining limitations

- No canonical Brainrot Formatter exists in the official AIOStreams or
  Tamtaro repositories, so the verified Tamtaro formatter remains active.
- Cinemeta remains installed deliberately as Stremio's compatibility and
  metadata fallback. Its Popular/Featured rows are retained; duplicate
  AIOMetadata Popular rows are suppressed without transmitting Stremio
  credentials to Cinebye.
- The anime/foreign-language verification used the public-domain feature
  *Momotaro, Sacred Sailors* rather than a current anime episode because the
  repository safety rules require legal or public-domain test media.

## Ongoing scope restrictions

- Do not research IPTV providers.
- Do not self-host components.
- Do not purchase, renew, upgrade, subscribe, or use referral links without
  explicit user consent at transaction time.
