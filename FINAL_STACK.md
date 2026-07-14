# Final Stremio stack

Last verified: 2026-07-13 (America/Los_Angeles)

## Finished architecture

### Discovery and metadata

- **AIOMetadata | ElfHosted 2.8.0** is installed as the discovery, catalog,
  metadata, artwork, Trakt-list, and MDBList layer.
- Imported Tamtaro's current `Tamtaro-aiometadata-config-with-anime.json`.
- TMDB, TVDB, MDBList, and Fanart.tv credentials validated successfully in
  AIOMetadata. Secrets and personalized manifest URLs are intentionally omitted
  from this document.
- Preferred language is English and English-only artwork is enabled.
- OpenPosterDB is enabled through AIOMetadata's RPDB-compatible custom artwork
  pattern. Poster proxying and custom artwork are enabled.
- United States is the selected Streaming Providers region. Provider shelves
  use Popularity, Descending sorting.
- The configuration contains 25 Home catalogs and seven search catalogs. The
  full manifest has 33 catalog declarations after including Calendar.
- Eight familiar services are visible as separate movie and show shelves:
  Netflix, Hulu, Max, Disney+, Prime Video, Apple TV+, Peacock, and Paramount+.
- Eighty-one unused hidden/duplicate definitions were removed so the manifest
  syncs without Stremio's `Max descriptor size reached` warning.

Final visible home order:

1. Continue Watching.
2. Cinemeta compatibility rows: Popular Movie, Popular Series, Featured
   Movie, Featured Series.
3. Trending — Movie/Series; New Releases — Movie; New Episodes — Series.
4. Netflix, Hulu, Max, Disney+, Prime Video, Apple TV+, Peacock, and Paramount+
   — each with one Movie row and one Series row.
5. Mind-Bending — Movie; Documentaries — Movie/Series.
6. Anime Picks — Anime; New Anime Episodes — Anime.

Implementation brands such as Trakt, MDBList, MAL, and AniList are not exposed
in family-facing shelf labels. Names are intentionally short because Stremio
appends the content type itself (for example, `Netflix - Movie`). The underlying
sources remain unchanged.
AIOMetadata's TMDB Popular home rows are absent because Cinemeta already
provides familiar Popular/Featured rows. Movie, series, anime, people, and TVDB
collection search resources remain enabled.

### Streams and management

- **AIOStreams 2.30.6** is installed from Yeb's community-recommended nightly
  instance (`2026.07.10.1236-nightly` at setup time).
- Imported the official **Tamtaro Complete SEL Setup 2.6.1** through the
  AIOStreams template wizard. The Partial template was not used.
- **Standard SEL** is active. Preferred audio order is English, Dual Audio,
  Multi, Dubbed, Original, then Unknown. Language is first inside both cached
  and uncached sort groups.
- **TorBox Pro** is the only configured debrid delivery service.
- AIOStreams contains the current Tamtaro TorBox Pro source set: SeaDex,
  Library, nekoBT, STorz, Meteor, Knaben, Torrentio, Comet, Sootio, and
  SearchNZB. MediaFusion remains an internal AIOStreams definition but is
  disabled by the current 2.6.1 template default. Meteor handles TorBox
  torrent/library search, and SearchNZB remains for TorBox Pro.
- The installed formatter is Tamtaro's current default formatter from the
  Complete template. No community formatter was manually reconstructed.

### Delivery and subtitles

- **TorBox Pro** is verified through the AIOStreams stream endpoint.
- **OpenSubtitles v3 1.0.0** is installed.
- Real-Debrid stream add-ons and the legacy OpenSubtitles add-on were removed
  only after TorBox/AIOStreams passed verification.

### Retained system add-ons

- **Cinemeta 3.0.14** remains as Stremio's built-in compatibility/metadata
  fallback and supplies the four compact Popular/Featured rows above.
- **Local Files 1.10.0** remains as the local-file compatibility add-on.

## Installed add-ons — final inventory

1. Cinemeta 3.0.14.
2. OpenSubtitles v3 1.0.0.
3. Local Files (without catalog support) 1.10.0.
4. AIOStreams 2.30.6 / Tamtaro Complete SEL Setup 2.6.1.
5. AIOMetadata | ElfHosted 2.8.0.

There are no standalone Torrentio, Comet, or MediaFusion add-ons. Torrentio
and Comet operate only as internal AIOStreams sources.

## Removed add-ons

- Torrentio RD 0.0.15
- MediaFusion | ElfHosted RD 5.5.2
- Streaming Catalogs 1.1.1
- M3U/EPG TV Addon 1.2.0
- OpenSubtitles 0.24.0
- YouTube, version not recorded
- Public Domain Movies, version not recorded

Comet installation as a standalone add-on was previously aborted and is not a
removed installed component. Real-Debrid-specific add-ons were already removed
after TorBox verification; no purchase, cancellation, or account change was
performed during this completion pass.

No IPTV provider research or self-hosting was performed.

## Verification results

| Check | Result |
|---|---|
| Cinemeta manifest | HTTP 200; version 3.0.14; catalog, meta, and addon_catalog resources |
| OpenSubtitles v3 manifest | HTTP 200; version 1.0.0; subtitles resource |
| Local Files manifest | HTTP 200; version 1.10.0; meta and stream resources |
| AIOStreams manifest | HTTP 200; version 2.30.6; stream, catalog, meta, and subtitles resources |
| AIOMetadata manifest | HTTP 200; version 2.8.0; catalog, meta, and subtitles resources |
| Catalog configuration | 33 manifest declarations; 25 AIOMetadata Home shelves and seven search catalogs after clean reinstall |
| Provider catalogs | All 16 US service movie/show endpoints returned HTTP 200 with 20 items each |
| API credentials | All four AIOMetadata keys reported valid |
| Artwork | Six movie/series requests returned HTTP 200 JPEG; final Home screenshots visibly show OpenPosterDB rating badges |
| TorBox delivery | Public-domain test title returned 15 AIOStreams results |
| Deduplication | 15 results produced 15 unique stream keys; zero duplicate keys remained |
| English-first | Language is first within cached and uncached groups; preferred order is English, Dual Audio, Multi, Dubbed, Original, Unknown; explicitly non-English-only streams are filtered |
| Cached delivery | 11 of 15 test results were visibly marked cached/instant |
| Installed-list audit | Desktop list contains only Cinemeta, OpenSubtitles v3, Local Files, AIOStreams, and AIOMetadata |
| Trakt scrobbling | Existing `brownjonnybravo` profile authenticated; Stremio Settings shows `Log out` |
| OpenSubtitles v3 | Public-domain movie and television endpoints returned HTTP 200 with English subtitles |
| Television stream handling | Individual episode and season pack both retained as distinct results |
| Anime/foreign-language | Six Japanese TorBox results returned; original-language content was not hidden |

The checks used *Night of the Living Dead* (movie), *The Lucy Show* S01E01
(television), and *Momotaro, Sacred Sailors* (anime/foreign-language). These
titles satisfy the repository's legal/public-domain rule. No stream was started
as part of verification.

## Comparison with current recommendations

The final AIOStreams configuration matches Tamtaro's current Complete TorBox
Pro recommendation rather than installing Torrentio, Comet, or MediaFusion as
standalone Stremio add-ons. The additional SeaDex, Library, nekoBT, STorz,
Meteor, Knaben, Sootio, and SearchNZB sources are deliberate template defaults.
Tamtaro currently recommends a nightly AIOStreams instance. MediaFusion is the
one requested internal source that is not active: it remains defined but its
current community default is disabled, which is a deliberate upstream
difference rather than an installation failure.

Differences and caveats:

- The requested **Brainrot Formatter** was not substituted for the official
  Tamtaro formatter. Current AIOStreams/Tamtaro documentation provides no
  canonical Brainrot template or signed source, and available community posts
  use the name for multiple different JSON snippets. Installing one without an
  exact source would violate the instruction not to manually recreate a
  community template.
- Stremio-wide Trakt scrobbling is authenticated to the existing
  `brownjonnybravo` profile. This remains separate from AIOMetadata's Trakt and
  MDBList discovery catalogs.
- Cinemeta remains installed as a compatibility fallback. Its Popular and
  Featured rows are retained; duplicate AIOMetadata Popular rows are disabled
  on Home. Cinebye was not used and received no Stremio credential or auth key.
- The current Tamtaro template keeps MediaFusion defined but disabled because
  that is the upstream default. It is the only requested source not active.
- The legal/public-domain safety rule prevented using a current mainstream
  release or current anime episode. The feature-level behavior requested was
  still tested without playback using the titles listed above.
- AIOMetadata's TMDB watch-provider data supports provider discovery but does
  not surface official availability in normal movie/series detail metadata.
  WatchHub 1.15.0 (`org.stremio.watchhub`) is the exact official compatible
  add-on for legal availability offers. It was not installed because it adds a
  stream resource and this pass was explicitly limited to discovery.

## Current authoritative references

- AIOStreams documentation: <https://docs.aiostreams.viren070.me/>
- AIOStreams source: <https://github.com/Viren070/AIOStreams>
- Tamtaro templates and AIOMetadata JSON: <https://github.com/Tam-Taro/SEL-Filtering-and-Sorting>
- AIOMetadata source: <https://github.com/cedya77/aiometadata>
- Stremio official add-ons (including WatchHub):
  <https://github.com/Stremio/stremio-official-addons>
- OpenPosterDB: <https://openposterdb.com/>

## Security notes

- No purchase, upgrade, referral, or signup action was performed.
- No referral code is present in this configuration.
- Personalized manifest URLs, passwords, UUIDs, and API keys are not written to
  this repository.
- The unexpected macOS administrator-access prompt encountered during the
  earlier checkpoint was denied; no password was entered and no elevated
  access was granted.

## Final stream sorting and filtering behavior

- Cached/instant TorBox choices sort ahead of uncached choices when available.
- Inside both cached and uncached groups, Language is the first rule for movie,
  series, and anime. The preferred sequence is English, Dual Audio, Multi,
  Dubbed, Original, then Unknown.
- Streams explicitly identified as only a different language are excluded from
  the ordinary required-language set. English subtitle labels are not treated
  as proof of English audio.
- Standard SEL limits and ranks by the template's quality/resolution and
  expression rules rather than flooding the UI with every source hit.
- Original and Unknown remain as lower fallbacks because many valid English
  files omit audio metadata, and foreign/anime originals must remain available.
- Exact duplicate stream keys are removed, while episode files and season
  packs remain distinct.
- Tamtaro's formatter shows resolution, cache state, size/bitrate, debrid
  service, internal source, and language markers where available.

## Remaining limitations

- Brainrot Formatter is intentionally not installed because no canonical
  official/community source could be established. Tamtaro's verified formatter
  remains active.
- MediaFusion remains disabled by the current Tamtaro recommendation.
- Official detail-page "where to watch" availability is not supplied by the
  installed AIOMetadata configuration. WatchHub is identified but not
  installed.
- IPTV research and self-hosting remain outside scope.
- A source that omits audio-language metadata cannot be guaranteed by any
  sorting rule. The final configuration is the safest practical first-result
  policy without deleting valid English or original-language choices.
- The Onn 4K Pro still needs its local Stremio audio auto-selection enabled and
  English chosen as the default audio track; that device setting is not synced
  from this Mac.
