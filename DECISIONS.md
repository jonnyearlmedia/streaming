# Architecture decisions

## Confirmed decisions

### AD-001 — Use AIOStreams as the stream-management boundary

Status: implemented.

The configuration uses AIOStreams instead of keeping separately installed
Torrentio and MediaFusion Real-Debrid manifests. This centralizes filtering,
sorting, and deduplication.

### AD-002 — Import Tamtaro Complete through the official wizard

Status: implemented.

Tamtaro Complete SEL Setup 2.6.1 was imported through AIOStreams. Partial was
not used. Standard SEL was selected. The configuration was not manually
reconstructed.

### AD-003 — Use Yeb nightly AIOStreams

Status: implemented.

The selected nightly reported AIOStreams 2.30.6 and nightly build
`2026.07.10.1236-nightly` during setup. Tamtaro's documentation recommended a
current nightly with working Torrentio support.

### AD-004 — Use TorBox Pro as delivery

Status: implemented and tested.

No purchase or upgrade was performed. The pre-existing TorBox Pro account was
configured. Real-Debrid-specific Stremio add-ons were subsequently removed
after a TorBox-backed AIOStreams endpoint returned results.

### AD-005 — Use AIOMetadata and OpenPosterDB for discovery/artwork

Status: implemented and tested.

The anime-inclusive Tamtaro AIOMetadata JSON was imported. English-only artwork
and the OpenPosterDB RPDB-compatible pattern were configured.

### AD-006 — Retain built-in compatibility add-ons

Status: implemented and verified.

Cinemeta and Local Files remain installed. Cinemeta supplies Stremio's
compatibility/metadata fallback and four compact Popular/Featured rows. The
equivalent AIOMetadata Popular rows are disabled on Home to avoid duplicates.
Local Files remains for local-media compatibility.

## Unresolved decisions

### UD-001 — Brainrot Formatter source

No canonical Brainrot template was found in the official AIOStreams or Tamtaro
repositories. Community posts use the name for multiple snippets. Tamtaro's
official default formatter remains active pending an exact source selected by
the user.

### AD-007 — Authenticate Stremio playback scrobbling to Trakt

Status: implemented and verified 2026-07-13.

The existing Trakt profile resolved to `brownjonnybravo`. After OAuth and a
Stremio restart, Settings showed `Trakt Scrobbling` with `Log out`; this is
separate from the Trakt-derived discovery catalogs supplied by AIOMetadata.

### AD-009 — Follow the current Tamtaro source defaults

Status: implemented by the imported Complete 2.6.1 template.

The current TorBox Pro preset keeps Torrentio and Comet enabled inside
AIOStreams. It uses SeaDex, Library, nekoBT, STorz, Meteor, Knaben, Sootio, and
SearchNZB as additional internal sources. MediaFusion remains configured but
disabled because Tamtaro 2.5.1 changed its default while its hosted service was
unreliable. No standalone source add-ons were reinstalled.

### AD-008 — Preserve the pre-cleanup AIOMetadata inventory

Status: implemented 2026-07-13.

The personalized manifest returned 76 entries and the complete redacted
pre-cleanup order is stored in
`evidence/config/catalog-order-2026-07-13.md`. This historical inventory was
preserved before changing Home visibility.

### AD-010 — Keep Cinemeta as a narrow fallback without Cinebye

Cinemeta remains installed. Cinebye was not used because the final duplicate
cleanup could be completed inside authenticated AIOMetadata without sending
Stremio credentials or an auth key to another service. Cinemeta Popular and
Featured rows remain; AIOMetadata supplies the premium curated discovery rows.

### AD-011 — Apply the reduced AIOMetadata home layout

Status: superseded by AD-013 on 2026-07-13.

The saved configuration was authenticated and reduced to nine visible
AIOMetadata discovery rows: Trakt Trending (series/movie), Latest Airing,
Latest Digital Release, MAL Airing Now, AniList Trending, Must-See Mindfuck,
and Top Documentaries (movie/series). Search resources remain enabled. The
final manifest was reinstalled after removing the stale cached copy.

### AD-012 — Preserve episode files and season packs as distinct results

Status: verified 2026-07-13.

The Lucy Show S01E01 returned an individual episode and a season pack as two
distinct AIOStreams choices. This confirms the active deduplication path does
not collapse these different playback options.

### AD-013 — Restore a living-room provider discovery layout

Status: implemented and verified 2026-07-13.

The nine-row layout removed a browsing feature the user valued. AIOMetadata's
authenticated Streaming Providers manager was therefore set to United States
and configured for Netflix, Hulu, HBO Max, Disney+, Prime Video, Apple TV+,
Peacock Premium, and Paramount+. Each service has one movie shelf and one show
shelf. On 2026-07-15, provider sorting was changed from Popularity, Descending
to Release Date, Descending so newly released titles surface without adding a
second set of provider rows.

Visible labels are family-facing rather than implementation-facing: Trending,
New Releases, New Episodes, the service name, Mind-Bending, Documentaries,
Anime Picks, and New Anime Episodes. Stremio appends `Movie`, `Series`, or
`Anime`, so the saved labels avoid repeating the type. Anime is last. Continue
Watching and Cinemeta's familiar Popular/Featured fallback rows remain ahead
of AIOMetadata because add-on order is outside this AIOMetadata-only change.

Eighty-one disabled, duplicate, obscure, or otherwise unused catalog
definitions were removed after Stremio reported `Max descriptor size reached`
on the first reinstall. The final personalized manifest contains 33 catalog
declarations: 25 Home shelves, seven search catalogs, and the Calendar special.
The second clean reinstall completed without the warning.

### AD-014 — Do not add WatchHub during the discovery-only fix

Status: decided 2026-07-13.

AIOMetadata's watch-provider support powers discovery catalogs but does not add
official availability to normal movie/series detail metadata. WatchHub 1.15.0
is the exact official compatible Stremio add-on for legal "where to watch"
offers. It was not installed because it declares the `stream` resource and
would add another result provider alongside AIOStreams, which is beyond the
authorized discovery-only scope.

### AD-015 — Prioritize English audio without breaking instant playback

Status: implemented and verified 2026-07-13.

The shared living-room user normally selects the first result. AIOStreams now
orders preferred language groups as English, Dual Audio, Multi, Dubbed,
Original, then Unknown. Language is the first sort rule inside both Global
Cached and Global Uncached for movie, series, and anime. Streams explicitly
identified as only another language are not in the required-language set.

Cache remains the global primary split. This preserves the system's central
instant-play behavior while making confirmed English audio the strongest rule
within each delivery group. Removing Original or Unknown globally was rejected:
it would hide valid English releases with incomplete filenames and remove the
original audio required for anime and intentionally foreign-language titles.
Filename-only results may still lack reliable audio metadata, so the policy is
the safest practical ordering rather than an absolute guarantee.

### AD-016 — Cap bitrate for reliable living-room playback

Status: implemented 2026-07-13.

A user-initiated movie session selected a 55.5 GB UHD Blu-ray remux estimated
at 68.5 Mbps. The Mac had ample CPU headroom, but its active 2.4 GHz, 20 MHz
Wi-Fi connection delivered Stremio traffic in a variable range of roughly
47–81 Mbps. The repeated short pauses were therefore a throughput-margin
problem, not evidence that the Mac was too slow or that TorBox lacked the
title.

AIOStreams now applies maximum estimated bitrates of 40 Mbps for movies,
30 Mbps for series, and 20 Mbps for anime series. The same limits were applied
to Global and every resolution-specific category, including Unknown, because
resolution-specific values take precedence in the current nightly UI. This
preserves efficient high-quality 4K releases while removing giant remuxes from
future result lists. "Cached" continues to mean available without torrent
download waiting; it does not mean locally stored or immune to last-mile
bandwidth limits.

### AD-017 — Inventory Sports Streams without inventing filters

Status: historical free-tier audit from 2026-07-14; superseded by AD-020.

Sports Streams 1.2.0 is retained as a separate live-sports add-on. It does not
participate in AIOStreams, TorBox, movie/series ranking, or the AIOMetadata Home
layout. Its catalogs are already marked `notForHome`, which preserves the
simple living-room Home screen.

The current free configuration is the base manifest: all sports are selected
implicitly and scheduled events remain visible. Free controls can restrict
the returned sports and enable Live Only, but the user has not yet confirmed
which sports or whether scheduled events should be hidden. The configuration
therefore remained unchanged. Paid timezone, language, quality, CDN, and recap
features had not yet been selected, purchased, or tested at that audit point.

### AD-018 — Use four Supporters profiles with Jonny as Admin

Status: implemented and verified 2026-07-14.

The active Supporters account now contains Jonny, Nene, Moncada, and Armada.
The existing master profile was renamed Jonny so the account owner retains the
Admin role. The user explicitly accepted moving the small pre-profile shared
history with the master profile. The clean secondary that had initially been
named Jonny was renamed Nene. Moncada and Armada were unchanged.

All secondary profiles were created through the official `Clone addons` flow.
Add-on management is disabled for Nene, Moncada, and Armada, reducing the risk
of accidental household configuration changes. Future add-on changes are not
assumed to sync automatically and should use Stremio's `Apply to all profiles`
control.

### AD-019 — Keep Trakt scrobbling owner-specific

Status: implemented and verified 2026-07-14.

The existing `brownjonnybravo` Trakt authorization remains on Jonny; Settings
shows `Log out`. The secondary profile now named Nene and the Armada profile
showed `Authenticate`. Secondary profiles therefore use Stremio's independent
profile history without writing their playback to Jonny's Trakt account.
Trakt-derived AIOMetadata discovery catalogs remain available to every profile
because discovery catalogs are not playback scrobbling.

### AD-020 — Replace free Sports Streams with Premium on every profile

Status: implemented and verified 2026-07-15.

The user purchased monthly Sports Streams Premium access. The personalized
Premium manifest uses US-1, US Pacific time, all sports, scheduled events, and
family-readable stream labels. US-1 had the lowest observed manifest response
average among the three tested Premium regions from this Mac. This measurement
selected the control-plane endpoint; it does not guarantee an upstream live
feed or eliminate congestion.

The free `sportsfree-us2.highfly.dev` entry was removed from Jonny, Nene,
Moncada, and Armada. Each profile was verified to retain exactly one Sports
Streams entry on the Premium US-1 host. Secondary add-on management was
temporarily enabled only for cleanup and disabled again afterward.

No sport filter or Live Only restriction was added because the user does not
want to limit available events. The live Premium configurator advertised
language and quality preferences but exposed neither control after token
verification. The saved configuration therefore improves labels and Premium
delivery without claiming a nonexistent quality or language filter.

### AD-021 — Use one newest-first shelf per provider

Status: implemented and verified 2026-07-15.

The family relies on Home to discover both familiar and newly released titles,
but duplicating every provider into Popular and Latest variants would add 16
more remote-navigation rows. The global Trending, Popular/Featured, New
Releases, and New Episodes shelves already cover broad popularity. Therefore,
the existing 16 Netflix, Hulu, Max, Disney+, Prime Video, Apple TV+, Peacock,
and Paramount+ movie/show shelves now use Release Date, Descending.

The authenticated UI was saved and then every provider settings dialog was
rechecked. All 16 showed Release Date and Descending. All 16 live catalog
endpoints returned HTTP 200 with non-empty first pages. No catalog, profile,
playback, history, sports, subtitle, TorBox, AIOStreams, or artwork setting was
otherwise changed.

This is title-release ordering, not a provider's private date-added or
editorial ranking. AIOMetadata also offers separate daily Top 10 catalogs, but
those express popularity rather than new arrivals and would add more rows. The
chosen compromise gives the living-room user fresh provider shelves while
keeping the Home screen manageable.

### AD-022 — Add the official YouTube channel add-on to every profile

Status: reversed and removed 2026-07-15.

The official Stremio YouTube 1.30.7 add-on was selected because the official
listing explicitly describes its viewing experience as ad-free. Its manifest
declares catalog and meta resources only for the separate `channel` type, so it
cannot insert choices into AIOStreams-managed movie or television result lists.

The add-on was installed on Jonny and then added through the Admin profile
manager to Nene, Moncada, and Armada. Secondary add-on-management permission
remains disabled. The public manifest and top-channel catalog returned HTTP
200, and Stremio visibly loaded the Channel discovery view with non-empty
results. No playback test, purchase, YouTube-account authorization, or change
to discovery shelves, streams, TorBox, Trakt, subtitles, or history occurred.

After reviewing the actual experience, the user rejected the non-personalized
global Top channel catalog. YouTube 1.30.7 was removed from Jonny and from all
three secondary profiles. The rest of the Stremio stack was left unchanged.

### AD-023: Put the Walking Dead universe and AMC+ at the front of discovery

Status: implemented and verified 2026-07-29.

The household wanted a simple way to browse every main Walking Dead series
without relying on a live AMC channel. AIOMetadata now starts with a
`The Walking Dead Universe` row built from TMDB list 8650238. It contains the
seven main narrative series: *The Walking Dead*, *Fear the Walking Dead*,
*The Walking Dead: World Beyond*, *Tales of the Walking Dead*, *The Walking
Dead: Dead City*, *The Walking Dead: Daryl Dixon*, and *The Walking Dead: The
Ones Who Live*. Recap programs, webisodes, and unrelated extras are excluded.

The next row is `AMC+`, a United States series catalog filtered to the direct
AMC+ provider and sorted by first air date, newest first. It is a discovery
row, not a live-channel or subscription integration. Existing AIOStreams
results remain responsible for playback choices.

The saved manifest now has 35 declarations: 27 Home catalogs, seven search
catalogs, and Calendar. The same personalized manifest was reapplied to all
four profiles. AIOMetadata was restored ahead of Sports Streams in the
installed order. Jonny and Nene both visibly rendered the new rows, and no
playback, subscription, profile history, stream ranking, or sports setting
changed.

### AD-021 — Move Sports Streams to the `.to` host

Status: implemented by the user 2026-09-20, verified read-only by this session.

Sports failed in Stremio with `Env: Failed to fetch: Load failed` while every
other add-on worked. The installed entry pointed at `premium-us1.highfly.dev`,
which resolves but serves a certificate issued for another name, so the TLS
handshake is rejected before any data moves. The provider moved to
`premium.highfly.to` with the same token and configuration path.

The user removed the stale entry and installed the `.to` one, then reported
playback. Whether Nene, Moncada, and Armada were updated in the same pass is
not confirmed; add-on management is disabled on those three, so they must be
updated from the Admin profile with `apply to all profiles`.

The old hostname must not be reinstated. Evidence:
`evidence/verification/sports-streams-host-migration-2026-09-20.md`.

### AD-022 — Link into a live game through the `search` extra

Status: implemented 2026-09-20 in `tools/open.html`.

A permanent per-game deep link is not possible. Live event ids carry an
upstream event number that does not exist before the event is listed, proven
by the slug alone returning 404 while the full id returns 200, and catalog
lookahead was about one week when sampled.

Every `sport` catalog declares the `search` extra, so a query reaches the
add-on and returns the current event. `tools/open.html` runs that query at
click time, takes the first match, and redirects to
`stremio:///detail/sport/{event id}`, which is the game page with its feeds. It
reads the catalog list from the manifest so any sport resolves, not only the
one it was written for.

The add-on URL is entered once per device and held in `localStorage`, so the
link itself carries no token and stays safe to text or bookmark. The add-on
returns `access-control-allow-origin: *`, which is what permits the
browser-side lookup.

Rejected alternatives: hardcoding per-game `detail` links, which cannot be
written in advance; and putting the add-on URL in the link, which would place
the token in message history.

### UD-002 — Sports Streams add-on ID discrepancy

The live manifest reports `community.sports.streamed.premium`. The July 2026
inventory recorded `community.sports.fly`. Both were observed at version 1.2.0.
Whether the ID changed alongside the domain move or the original inventory was
wrong is not established, and nothing in the current setup depends on the
answer. Recorded rather than guessed.

### UD-003 — Basketball resolution unverified

`tools/open.html` is expected to resolve a Warriors game from `?q=golden state`
once the NBA season starts. On 2026-09-20 every catalog returned zero metas for
both `warriors` and `golden state`, because the season had not begun;
`sports_basketball` held WNBA and Australian NBL fixtures. The catalog walk is
verified, the basketball match is not. Confirm at the first Warriors game and
adjust the query if the add-on names the team differently.
