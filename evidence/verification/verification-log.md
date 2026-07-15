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

## 2026-07-13 living-room English-audio correction

- Authenticated AIOStreams nightly UI reported build
  `2026.07.13.2314-nightly`, AIOStreams 2.30.6, and Tamtaro 2.6.1.
- Required language groups remained English, Dual Audio, Dubbed, Multi,
  Original, and Unknown. Preferred order was changed to English, Dual Audio,
  Multi, Dubbed, Original, Unknown.
- Language was moved to the first position in both Global Cached and Global
  Uncached. The saved page was reloaded; the Active Sort Configuration showed
  Language first for Movies, Series, and Anime in both groups.
- The global Cached/Uncached split was retained to preserve instant playback.
- No-playback result inspection used only public-domain titles. *Night of the
  Living Dead* had one explicitly English-audio entry among the first three;
  the other two had no visible audio marker. *The Lucy Show* S01E01 returned
  two results without visible audio markers. *Momotaro, Sacred Sailors* kept
  six original-language choices; the first two explicitly declared Japanese.
- Subtitle labels were not counted as audio evidence. Source files without
  declared audio language remain the unavoidable limit; excluding Unknown or
  Original would remove valid English files and foreign originals.
- No purchase, referral link, playback, TorBox change, discovery change,
  Trakt change, or subtitle change was performed.

## 2026-07-13 playback-stability correction

- Diagnosed the user's already-running *Obsession* (2025) session; no test
  playback was started. The selected file was a 55.5 GB UHD Blu-ray remux with
  an estimated average bitrate of 68.5 Mbps.
- The Mac had ample compute headroom. Its active Wi-Fi link was 2.4 GHz,
  channel 11, 20 MHz, and Stremio ingress sampled at roughly 47–81 Mbps. The
  short pauses matched insufficient throughput margin, not an uncached-title
  delay or CPU saturation.
- Loaded the authenticated AIOStreams nightly configuration and set maximum
  estimated bitrates to Movies 40 Mbps, Series 30 Mbps, and Anime Series
  20 Mbps.
- Applied the same ceilings to Global, every named resolution, and Unknown.
  Verified all 33 maximum fields contained only 40,000,000, 30,000,000, or
  20,000,000 bits per second according to content type, then saved the hosted
  configuration.
- Existing playback was not interrupted. The updated filter takes effect on
  the next stream-list request. No TorBox, catalog, Trakt, subtitle, referral,
  or purchase setting was changed.

## 2026-07-14 Sports Streams audit

- The user installed Sports Streams and had already started a basketball
  session before the audit. Playback was not started, stopped, or changed.
- The active player identified the installed public manifest host as
  `sportsfree-us2.highfly.dev`.
- Public manifest returned HTTP 200: ID `community.sports.fly`, name Sports
  Streams, version 1.2.0, custom type `sport`, and catalog/meta/stream
  resources.
- All 17 declared catalogs use `notForHome: true`. Endpoint checks returned
  HTTP 200 for all 17; 14 were non-empty and three were empty at sampling time.
- The base manifest is the unfiltered free state: all sports and scheduled
  events. Free configuration offers sport selection and Live Only. Advertised
  paid timezone, language, quality, CDN, and recap options were not purchased,
  opened, or enabled.
- Sports Streams is independent of AIOStreams and TorBox; existing movie and
  series bitrate/language/deduplication rules do not apply to it.

## 2026-07-14 Supporters household profile setup

- Confirmed Stremio Supporters was active after restarting the desktop app.
- Created Jonny, Nene, Moncada, and Armada through the native profile manager.
- Final ownership is Jonny (Admin), Nene, Moncada, and Armada. The user
  explicitly accepted keeping the small pre-profile shared history on the
  Jonny master profile.
- All three secondary profiles were created with `Clone addons` enabled and
  `Allow profile to manage addons` disabled.
- Jonny's Installed view showed Cinemeta 3.0.14, OpenSubtitles v3 1.0.0, Local
  Files 1.10.0, AIOStreams 2.30.6, AIOMetadata 2.8.0, and Sports Streams 1.2.0.
- Nene, Moncada, and Armada each loaded a non-empty Netflix movie shelf with
  OpenPosterDB rating badges, proving the personalized discovery/artwork layer
  was cloned into each profile.
- Nene's *Night of the Living Dead* result list returned non-empty
  AIOStreams/TorBox choices. Cached/instant markers were visible and English
  markers appeared where source metadata declared them. No playback was
  started.
- Jonny Settings showed `Log out` for Trakt Scrobbling. The clean secondary
  now named Nene and the Armada profile showed `Authenticate`; household
  playback therefore does not share Jonny's Trakt history.
- Secondary profile settings showed English interface, default subtitles, and
  default audio, with Auto-Play Next Episode enabled.
- The desktop app was left at the four-profile `Who's watching?` chooser.

## 2026-07-15 Sports Streams Premium rollout

- The user purchased monthly Sports Streams Premium directly; the agent did
  not initiate or confirm the financial transaction.
- The access token verified as active through 2026-08-18. Token and encoded
  manifest configuration are excluded from the repository.
- Three Premium manifest samples per region returned HTTP 200. Observed averages
  from this Mac were US-1 388 ms, US-2 414 ms, and Main 429 ms. US-1 was saved.
- Saved timezone is US Pacific. All sports remain included and Live Only remains
  disabled, preserving scheduled events.
- Stream labels were simplified to a `Live Sports` heading plus channel name;
  descriptions expose height, audio, approximate required Mbps, Premium-feed
  status, and delay.
- The live Premium form did not expose the advertised language or quality-
  preference controls. No such filter is claimed.
- Personalized manifest returned HTTP 200, version 1.2.0, custom `sport` type,
  catalog/meta/stream resources, and 18 catalogs including Recaps.
- Every Premium catalog endpoint returned HTTP 200; 15 were non-empty and three
  were empty when sampled. No playback was started for verification.
- Premium was installed with `Apply this change to all profiles` enabled.
- The former `sportsfree-us2.highfly.dev` entry was removed from Jonny, Nene,
  Moncada, and Armada. Each retained entry was individually checked through
  Stremio's Share view and resolved to the Premium US-1 host.
- Nene, Moncada, and Armada were temporarily allowed to manage add-ons solely
  for removal of the free duplicate, then all three permissions were disabled
  again and visually verified.

## 2026-07-15 User-requested live sports playback

- At the user's explicit request, opened the live *England vs Argentina*
  listing from the personalized Premium US-1 Sports Streams catalog.
- The result list was supplied by the single installed Premium Sports Streams
  add-on. It exposed multiple broadcaster/source feeds rather than a separate
  free-versus-Premium choice.
- Selected the UK ITV 1 feed because it declared 1920x1080, stereo audio, an
  estimated 5.6 Mbps requirement, and a small delay. This was a safer
  English-broadcast choice than the substantially heavier 4K feeds.
- The Stremio player opened successfully and its elapsed-time display advanced
  from 00:00:03 to 00:00:19. The working feed was left open for the user.
- The Premium configurator exposes no verified control for suppressing the
  duplicate-looking internal source group, so no unsafe source removal was
  attempted.

## 2026-07-15 AIOMetadata newest-provider ordering

- Loaded the exact authenticated AIOMetadata configuration already installed
  on the Stremio account. No replacement configuration or manifest URL was
  generated.
- Preserved the existing 25 Home shelves, seven search catalogs, Calendar,
  United States provider region, metadata credentials, OpenPosterDB pattern,
  English artwork setting, and family-facing labels.
- Changed each of the 16 provider movie/show shelves from Popularity,
  Descending to Release Date, Descending and saved the configuration.
- Reopened every provider settings dialog after save. All 16 displayed Release
  Date and Descending; watched-item handling remained Use Global Setting.
- The personalized manifest returned HTTP 200, version 2.8.0, resources
  catalog/meta/subtitles, and the unchanged 33 catalog declarations.
- All 16 Netflix, Hulu, Max, Disney+, Prime Video, Apple TV+, Peacock, and
  Paramount+ movie/show endpoints returned HTTP 200 and non-empty first pages.
  Counts ranged from 16 to 20 and leading items were recent releases.
- No playback was started. No AIOStreams, TorBox, Sports Streams, Trakt,
  subtitle, profile, history, or stream-ranking setting was changed.
- Limitation: AIOMetadata sorts these shelves by title release date. It does not
  expose each provider's private date-added chronology in these shelves, so
  they cannot exactly mirror the official service Home pages. Its separate
  daily Top 10 feature reflects popularity rather than newest arrivals and was
  not added as another set of Home rows.

## 2026-07-15 official YouTube add-on rollout

- Installed the official Stremio YouTube add-on 1.30.7 on Jonny. The official
  listing states that it provides ad-free YouTube channel viewing.
- The official manifest returned HTTP 200 with ID
  `com.linvo.stremiochannels`, version 1.30.7, catalog/meta resources, the
  separate `channel` type, and two catalog declarations.
- The public top-channel endpoint returned HTTP 200 with 96 items. Stremio's
  Discover type menu visibly added Channel, and the Channel view loaded
  non-empty results including T-Series, MrBeast, and Cocomelon.
- The official installer did not expose an `Apply to all profiles` control.
  The Admin profile manager was used to add the same public official manifest
  to Nene, Moncada, and Armada. Each profile panel visibly listed YouTube after
  saving.
- Secondary profiles remain unable to manage add-ons. No playback was started,
  no YouTube login was authorized, and no movie/series catalog, AIOStreams,
  TorBox, Sports Streams, Trakt, subtitle, profile-history, or stream-ranking
  setting was changed.
