# Final Stremio stack

Last verified: 2026-07-12 (America/Los_Angeles)

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
- The imported configuration exposes 76 manifest catalogs/search variants,
  including Seasonal, Trakt Trending, Latest Airing, Latest Digital Release,
  TMDB Popular, provider catalogs, anime, and collections.

### Streams and management

- **AIOStreams 2.30.6** is installed from Yeb's community-recommended nightly
  instance (`2026.07.10.1236-nightly` at setup time).
- Imported the official **Tamtaro Complete SEL Setup 2.6.1** through the
  AIOStreams template wizard. The Partial template was not used.
- **Standard SEL** is active, with English selected first and the template's
  recommended defaults retained.
- **TorBox Pro** is the only configured debrid delivery service.
- AIOStreams contains the current Tamtaro debrid source set: SeaDex, Library,
  Meteor, Comet, STorz, Torrentio, MediaFusion, Knaben, AnimeTosho, Sootio, and
  TorBox Search/NZB support for TorBox Pro.
- The installed formatter is Tamtaro's current default formatter from the
  Complete template. No community formatter was manually reconstructed.

### Delivery and subtitles

- **TorBox Pro** is verified through the AIOStreams stream endpoint.
- **OpenSubtitles v3 1.0.0** is installed.
- Real-Debrid stream add-ons and the legacy OpenSubtitles add-on were removed
  only after TorBox/AIOStreams passed verification.

### Retained system add-ons

- **Cinemeta 3.0.14** remains as Stremio's built-in compatibility fallback.
- **Local Files 1.10.0** remains as the local-file compatibility add-on.

## Removed add-ons

- Torrentio RD 0.0.15
- MediaFusion | ElfHosted RD 5.5.2
- Streaming Catalogs 1.1.1
- M3U/EPG TV Addon 1.2.0
- OpenSubtitles 0.24.0

No IPTV provider research or self-hosting was performed.

## Verification results

| Check | Result |
|---|---|
| AIOStreams manifest | HTTP 200; version 2.30.6; stream, catalog, meta, and subtitles resources |
| AIOMetadata manifest | HTTP 200; version 2.8.0; catalog, meta, and subtitles resources |
| Catalog configuration | 76 catalog/search variants present in the AIOMetadata manifest |
| API credentials | All four AIOMetadata keys reported valid |
| Artwork | OpenPosterDB request returned HTTP 200 JPEG, 580 x 870, with four rating badges |
| TorBox delivery | Public-domain test title returned 15 AIOStreams results |
| Deduplication | 15 results produced 15 unique stream keys; zero duplicate keys remained |
| English-first | English selected first in the Complete wizard; returned results show English markers where media data is available |
| Cached delivery | 11 of 15 test results were visibly marked cached/instant |
| Installed-list audit | Desktop list contains only Cinemeta, OpenSubtitles v3, Local Files, AIOStreams, and AIOMetadata |

The stream test used *Night of the Living Dead* (1968), a public-domain title.
No stream was started as part of verification.

## Comparison with current recommendations

The final AIOStreams configuration matches Tamtaro's current Complete Debrid
recommendation rather than limiting the internals to only Torrentio, Comet,
and MediaFusion. The additional SeaDex, Library, Meteor, STorz, Knaben,
AnimeTosho, Sootio, and TorBox Search sources are deliberate template defaults,
not separately installed Stremio add-ons. Tamtaro currently recommends a
nightly AIOStreams instance and lists that same debrid source set.

Differences and caveats:

- The requested **Brainrot Formatter** was not substituted for the official
  Tamtaro formatter. Current AIOStreams/Tamtaro documentation provides no
  canonical Brainrot template or signed source, and available community posts
  use the name for multiple different JSON snippets. Installing one without an
  exact source would violate the instruction not to manually recreate a
  community template.
- Stremio's Trakt scrobbling control still displays **Authenticate**. Trakt and
  MDBList discovery catalogs are active through AIOMetadata, but Stremio-wide
  playback scrobbling is not claimed as authenticated.
- Cinemeta remains installed as a compatibility fallback; AIOMetadata supplies
  the premium discovery/catalog layer. Disabling Cinemeta resources through a
  third-party sync tool was not required to validate AIOMetadata and was not
  performed silently.

## Current authoritative references

- AIOStreams documentation: <https://docs.aiostreams.viren070.me/>
- AIOStreams source: <https://github.com/Viren070/AIOStreams>
- Tamtaro templates and AIOMetadata JSON: <https://github.com/Tam-Taro/SEL-Filtering-and-Sorting>
- OpenPosterDB: <https://openposterdb.com/>

## Security notes

- No purchase, upgrade, referral, or signup action was performed.
- No referral code is present in this configuration.
- Personalized manifest URLs, passwords, UUIDs, and API keys are not written to
  this repository.
- The unexpected macOS administrator-access prompt encountered during UI
  cleanup was denied; no password was entered and no elevated access was
  granted.
