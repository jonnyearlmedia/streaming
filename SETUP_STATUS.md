# Stremio setup status

Last audited: 2026-07-29 (America/Los_Angeles)

The premium setup is complete and has been re-audited after a clean
AIOMetadata manifest refresh.

## Supporters household profiles

Stremio Supporters is active on the existing account. Four profiles are
configured and visible in the desktop profile chooser:

1. Jonny — master/Admin profile and the only profile authenticated to the
   existing `brownjonnybravo` Trakt account.
2. Nene — separate family profile.
3. Moncada — separate family profile.
4. Armada — separate family profile.

The three secondary profiles were created with Stremio's `Clone addons`
option enabled. Add-on management is disabled for the secondary profiles so a
nontechnical user cannot accidentally alter the shared stack. Jonny retains
the master account's existing history and add-on management controls. Nene,
Moncada, and Armada start with separate Stremio history, library, Continue
Watching, and recommendations; their Settings pages show `Authenticate` for
Trakt rather than sharing Jonny's scrobbling connection.

No secondary user needs to create or authenticate a Trakt account. Selecting
their Stremio profile is the complete user flow; Stremio maintains their
separate Continue Watching and history natively.

The profile chooser remains available from the desktop app. The profile list
syncs to other devices signed into the same Stremio account.

## Custom add-on development artifact

A local `brownjonnybravo` YouTube-channel add-on has been built at
`addons/brownjonnybravo`. Version 0.1.0 declares only the `channel` type and
provides Latest Videos and Playlists catalogs backed by the public
`youtube.com/@brownjonnybravo` channel. Its loopback manifest, catalogs,
metadata, and stream responses have been verified, and its manifest passes the
official Stremio add-on linter.

This artifact is **not installed** on Jonny or any secondary profile, is not
publicly hosted, and was not used to start playback. It does not change the six
installed add-ons listed below. Its complete feature boundary and local run
instructions are in `addons/brownjonnybravo/FEATURES.md` and
`addons/brownjonnybravo/README.md`.

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
6. Sports Streams 1.2.0 — separately installed Premium live/scheduled sports
   catalogs and direct live streams. It uses Premium US-1, Pacific Time, all
   sports, scheduled events, and family-readable stream labels. The former
   free manifest was removed from all four profiles.

The structured inventory is in
`evidence/inventory/installed-addons.json`.

## Removed add-ons

- Torrentio RD 0.0.15
- MediaFusion | ElfHosted RD 5.5.2
- Streaming Catalogs 1.1.1
- M3U/EPG TV Addon 1.2.0
- OpenSubtitles 0.24.0
- YouTube, version not recorded
- YouTube 1.30.7 — evaluated and then removed from Jonny, Nene, Moncada, and
  Armada on 2026-07-15 because its global Top channel catalog was not useful
  for the household.
- Public Domain Movies, version not recorded

Comet had previously been aborted as a separate add-on. Comet is now an
internal source in the official Tamtaro AIOStreams configuration.

## Configuration state

### AIOStreams

- Instance: Yeb nightly at `https://aiostreams-nightly.fortheweak.cloud/`.
- Reported nightly build at setup: `2026.07.10.1236-nightly`; the live
  configuration UI reported `2026.07.13.2314-nightly` during the language
  audit.
- Imported template: official Tamtaro Complete SEL Setup 2.6.1.
- Partial template: not used.
- SEL: Standard.
- Required language groups: English, Dual Audio, Dubbed, Multi, Original, and
  Unknown. Streams explicitly identified as only another language are filtered
  from ordinary results.
- Preferred order: English, Dual Audio, Multi, Dubbed, Original, Unknown.
- Cached and uncached groups both sort by Language before SeaDex, resolution,
  quality, library, expression score, subtitle, codec, age, bitrate, or seeders.
- Playback-safety bitrate ceilings are enforced globally and for every
  resolution-specific path, including Unknown: movies 40 Mbps, series 30 Mbps,
  and anime series 20 Mbps. This keeps efficient 4K choices available while
  excluding unusually large remuxes that exceed the living-room network's
  reliable throughput.
- Cache remains the global primary split so a verified instant result is not
  displaced by a non-instant fallback. Within each split, confirmed English or
  English-inclusive audio wins.
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
- Provider region: United States.
- Provider sorting: Release Date, Descending (newest titles first) for the
  existing 16 provider movie/show shelves and the AMC+ series shelf.
- Final manifest declarations: 35 (27 Home shelves, seven search catalogs,
  and one Calendar special resource).
- The AIOMetadata Home section starts with `The Walking Dead Universe`, an
  exact seven-show main-universe collection, followed by `AMC+`, a newest-first
  United States series shelf. The remaining rows include trending, releases,
  Netflix, Hulu, Max, Disney+, Prime Video, Apple TV+, Peacock, Paramount+,
  three specialty shelves, and two anime shelves at the bottom.
- AIOMetadata Popular rows remain absent because Cinemeta supplies the familiar
  Popular/Featured fallback rows. Movie, show, anime, people, and TVDB
  collection search remain enabled.
- The same personalized manifest was saved and reapplied to all four profiles.
  AIOMetadata remains ahead of Sports Streams in the installed add-on order.
  No profile history, playback, stream ranking, or subscription setting changed.

Personalized hosted configuration paths, passwords, UUIDs, API keys, and debrid
tokens are stored outside the repository in the user's credential note. The
redacted locations are in
`evidence/inventory/manifest-locations.redacted.json`.

### Sports Streams

Corrected 2026-09-20. Evidence:
`evidence/verification/sports-streams-host-migration-2026-09-20.md` and
`evidence/config/sports-streams-2026-09-20.md`.

- Instance host: `https://premium.highfly.to/`; token and personalized
  manifest path are redacted. The provider moved from the `.dev` TLD.
- The former `premium-us1.highfly.dev` host now serves a certificate issued
  for a different name, so Stremio fails it at the TLS handshake and reports
  `Env: Failed to fetch: Load failed`. Do not reinstate that hostname.
- Add-on ID as reported by the live manifest:
  `community.sports.streamed.premium` 1.2.0. The July inventory recorded
  `community.sports.fly`; unresolved, see UD-002.
- Resources: catalog, meta, and stream for the custom `sport` type.
- Subscription: user-purchased monthly Premium access. July recorded it active
  through 2026-08-18. The user reported live playback on 2026-09-20; no
  billing surface was inspected.
- Timezone: PT. Clock format: 12h.
- The configuration now restricts sports to basketball, football,
  american-football, fight, baseball, and golf, with leagues listing nfl and
  premier-league. July recorded no restriction.
- Nine catalog definitions, down from eighteen. All nine declare the `search`
  extra, which is what lets `stremio:///search?search={query}` reach the
  add-on. Catalogs remain out of the family Home layout.
- Live event ids carry an upstream event number that does not exist before the
  event is listed, so a per-game deep link cannot be written in advance.
  Catalog lookahead was about one week when sampled.
- The add-on returns `access-control-allow-origin: *`, so browser-side callers
  may query it directly.
- Stream names use `Live Sports · {channel}`. Descriptions show height, audio,
  approximate required Mbps, Premium-feed status, and delay.
- Although the Premium comparison advertises language and quality preferences,
  the verified live configurator exposed no language or quality-filter control.
  No unsupported filter is claimed.
- The user removed the stale `.dev` entry and installed the `.to` one on
  2026-09-20. Whether Nene, Moncada, and Armada were updated in the same pass
  is not confirmed; add-on management is disabled on those three, so they must
  be updated from the Admin profile.
- This add-on bypasses AIOStreams and TorBox. AIOStreams movie/series bitrate,
  language, ranking, and deduplication rules do not filter its live streams.

### Launcher pages

`tools/` is published to GitHub Pages by `.github/workflows/pages.yml` on push
to `main`. Pages source must remain `GitHub Actions`; the workflow cannot
enable it, because `actions/configure-pages` fails with
`Resource not accessible by integration` when the workflow token lacks admin.

- `https://jonnyearlmedia.github.io/streaming/open.html` resolves a live event
  through the add-on's search catalogs and redirects into Stremio. `?q=`
  selects the team, so one page serves every team.
- `https://jonnyearlmedia.github.io/streaming/niners-quick-links.html` is the
  2026 49ers schedule in Pacific time.
- The add-on URL is entered once per device and held in `localStorage`. It is
  never in the link and never in this repository.
- iOS cannot route an https link to a home screen web app, so the phone always
  lands in Safari. This is an Apple limitation, not a configuration gap.

See `tools/README.md` for the parameters and the deep link formats.

## Verification evidence

- Cinemeta manifest: HTTP 200, version 3.0.14,
  catalog/meta/addon_catalog.
- OpenSubtitles v3 manifest: HTTP 200, version 1.0.0, subtitles.
- Local Files manifest: HTTP 200, version 1.10.0, meta/stream.
- AIOStreams manifest: HTTP 200, version 2.30.6, stream/catalog/meta/subtitles.
- AIOMetadata manifest: HTTP 200, version 2.8.0,
  catalog/meta/subtitles.
- AIOMetadata custom-row audit: 35 manifest declarations; the Walking Dead
  collection endpoint returned the seven intended main-universe shows, and the
  AMC+ endpoint returned a non-empty 20-item first page. Jonny and Nene both
  visibly rendered the two rows in Stremio Home.
- AIOMetadata provider-sort audit: all 16 authenticated provider settings read
  Release Date, Descending after save; all 16 catalog endpoints returned HTTP
  200 with non-empty first pages (16-20 items at sampling time).
- Sports Streams Premium manifest: HTTP 200, version 1.2.0, custom `sport` type
  with catalog/meta/stream resources and 18 catalog definitions. All 18
  catalog endpoints returned HTTP 200; 15 were non-empty at sampling time.
- Historical YouTube evaluation: the official 1.30.7 manifest and its
  96-item global Top channel catalog returned HTTP 200. It was subsequently
  removed from all four profiles; Jonny's Installed view and the Admin profile
  manager now omit it.
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
- The persisted AIOStreams UI was reloaded after saving and showed Language as
  the first rule for movie, series, and anime in both Global Cached and Global
  Uncached groups.
- A user-initiated playback diagnosis found that a 55.5 GB, estimated
  68.5 Mbps UHD remux was competing with a 2.4 GHz, 20 MHz Wi-Fi link whose
  observed Stremio ingress varied from roughly 47 to 81 Mbps. Mac CPU headroom
  remained ample. The saved bitrate ceilings remove that class of first-choice
  result on future stream requests.
- Prior final Installed-view evidence shows the original five add-ons. The
  sixth Sports Streams installation is proven by its active manifest URL in
  the user-initiated player session and the manifest verification above; a new
  Installed-view screenshot was subsequently captured from the Jonny Admin
  profile on 2026-07-14.
- The Supporters chooser visibly shows Jonny (Admin), Nene, Moncada, and
  Armada.
- Nene, Moncada, and Armada each loaded the cloned Netflix provider shelf with
  OpenPosterDB rating artwork. This verifies that the personalized
  AIOMetadata manifest was cloned to all three secondary profiles.
- Nene returned a non-empty AIOStreams result list for the public-domain
  *Night of the Living Dead* test. Visible results were TorBox-backed,
  cached/instant, and showed English markers where declared.
- Jonny Settings showed `Log out` for Trakt Scrobbling after the profile-name
  swap. The secondary profile now named Nene and the Armada profile showed
  `Authenticate`, confirming they did not inherit Jonny's Trakt connection.
- Secondary-profile playback defaults showed English for interface,
  subtitles, and audio; Auto-Play Next Episode remained enabled.

See `evidence/verification/verification-log.md` for the detailed record and
`evidence/screenshots/` for visual evidence.

## 2026-07-13 completion update

- Trakt scrobbling OAuth is authenticated to the existing
  `brownjonnybravo` Trakt profile. Stremio Settings now shows `Log out`, not
  `Authenticate`.
- The installed-add-on list was re-audited and still contains exactly the five
  entries recorded above.
- The AIOMetadata configuration was authenticated, reduced, saved, and then
  cleanly reinstalled in Stremio. The provider-restoration pass subsequently
  reduced 106 configured catalogs to 25 intended Home catalogs. The final
  manifest returned HTTP 200, version 2.8.0, with 33 declarations.
- The finished Stremio Home layout contains Continue Watching, four compact
  Cinemeta compatibility rows (Popular and Featured for movie and series),
  then 25 AIOMetadata rows optimized for familiar remote-first browsing.
- OpenPosterDB was re-verified across three movie and three series posters;
  every request returned HTTP 200 JPEG through the AIOMetadata proxy, with the
  nested source host resolving to `openposterdb.com`.
- OpenSubtitles v3 returned English subtitles for a public-domain movie and
  television episode.
- All 16 Netflix/Hulu/Max/Disney+/Prime Video/Apple TV+/Peacock/Paramount+
  movie/show endpoints returned HTTP 200 with 20 items each.
- The clean reinstall initially exposed Stremio's `Max descriptor size
  reached` warning. After deleting 81 unused catalog definitions, the next
  reinstall completed without that warning.

## 2026-07-15 newest-provider update

- The existing global Trending, Popular/Featured, New Releases, New Episodes,
  specialty, anime, search, artwork, and metadata behavior was preserved.
- All 16 US provider movie/show shelves were changed from Popularity,
  Descending to Release Date, Descending. No extra Home rows were added.
- The authenticated configuration was saved without generating a replacement
  manifest URL. A post-save UI audit checked each of the 16 provider settings.
- The live personalized manifest returned HTTP 200, version 2.8.0, with the
  same 33 declarations: 25 Home shelves, seven search catalogs, and Calendar.
- Every provider endpoint returned HTTP 200 and a non-empty first page. Result
  counts ranged from 16 to 20, and the leading titles were recent releases.
- This sorts by each title's release date. AIOMetadata does not provide a true
  provider-specific “date added” value in these shelves, so it cannot exactly
  mirror the private Home page of Netflix, Disney+, or another service. A
  separate daily Top 10 catalog feature exists, but it reflects popularity,
  not newest arrivals, and was not added as another set of Home rows.

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
- Torrent filenames do not always declare audio tracks. For *Night of the
  Living Dead*, one of the first three results explicitly declared English
  audio while two were classified from title/original-language context without
  a visible audio marker. *The Lucy Show* returned only two results and neither
  exposed an audio marker. The configuration therefore provides the safest
  practical ordering but cannot mathematically guarantee audio language when
  the source supplies no media-language metadata.
- The Onn 4K Pro player-side audio preference cannot be changed from this Mac.
  Its Stremio settings should have audio auto-selection enabled and English as
  the default audio track.
- AIOMetadata does not expose official provider availability on standard title
  detail pages. WatchHub 1.15.0 is the exact compatible official add-on, but it
  was intentionally not installed because it adds a stream resource and this
  pass was limited to discovery.

## Ongoing scope restrictions

- Do not research IPTV providers.
- Do not self-host components.
- Do not purchase, renew, upgrade, subscribe, or use referral links without
  explicit user consent at transaction time.
