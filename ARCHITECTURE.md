# Current architecture

Last audited: 2026-07-13, America/Los_Angeles.

## Runtime

- Stremio desktop shell: 5.1.25.
- Stremio app UI reported 6.0.1-beta.06.
- Local streaming server: 4.21.0 at `http://127.0.0.1:11470`.
- Stremio is signed into the user's existing account.

## Layer model

### Discovery and metadata

`AIOMetadata | ElfHosted 2.8.0` is the configured metadata and catalog layer.
Its configuration imported Tamtaro's current anime-inclusive AIOMetadata JSON.
It uses TMDB, TVDB, MDBList, and Fanart.tv credentials and OpenPosterDB artwork.
Its Home surface contains 25 plain-English shelves: four core trending/new
rows, movie and show shelves for eight familiar US services, three specialty
rows, and two deprioritized anime rows. The provider shelves use AIOMetadata's
built-in Streaming Providers integration with United States selected and
Popularity/Descending sorting. Seven search catalogs remain enabled.

The configuration was pruned from 106 catalog definitions to the 25 intended
Home catalogs. This removed disabled legacy/duplicate definitions and reduced
the final manifest to 33 catalog declarations: 25 Home shelves, seven search
catalogs, and one Calendar special resource. The smaller descriptor installs
and syncs without Stremio's prior `Max descriptor size reached` warning.

Configuration location:

- hosted AIOMetadata configuration at `https://aiometadata.elfhosted.com/`;
- personalized configuration identifier and password are stored outside this
  repository in the user's credential note;
- imported source JSON:
  `https://raw.githubusercontent.com/Tam-Taro/SEL-Filtering-and-Sorting/refs/heads/main/AIOMetadata%20Configs/Tamtaro-aiometadata-config-with-anime.json`.

### Stream aggregation and management

`AIOStreams 2.30.6` is installed from Yeb's nightly instance and was configured
with the official Tamtaro Complete SEL Setup 2.6.1. Standard SEL and English as
the first preferred language were selected. The living-room language policy
keeps cache as the global instant/fallback split, then applies Language as the
first sort rule inside both cached and uncached groups. The preferred sequence
is English, Dual Audio, Multi, Dubbed, Original, then Unknown; streams
explicitly identified as only another language are excluded from ordinary
results.

Configuration location:

- hosted AIOStreams configuration at
  `https://aiostreams-nightly.fortheweak.cloud/`;
- personalized UUID, password, and manifest URL are stored outside this
  repository in the user's credential note;
- official template repository:
  `https://github.com/Tam-Taro/SEL-Filtering-and-Sorting`.

The current Tamtaro Complete 2.6.1 TorBox Pro source set is SeaDex, Library,
nekoBT, STorz, Meteor, Knaben, Torrentio, Comet, Sootio, and SearchNZB.
MediaFusion remains an internal definition but is disabled by the current
template default. TorBox torrent/library search is handled by Meteor, and
SearchNZB remains for the Pro tier. These are internal AIOStreams sources,
not separately installed Stremio add-ons.

### Delivery

TorBox Pro is the configured debrid delivery service inside AIOStreams. The
personalized TorBox API credential is stored only in the hosted AIOStreams
configuration and the user's credential store. It is not committed here.

### Subtitles

OpenSubtitles v3 1.0.0 remains installed. The legacy OpenSubtitles 0.24.0 entry
was removed.

### Compatibility

Cinemeta 3.0.14 and Local Files 1.10.0 remain installed. Cinemeta is the narrow
compatibility/metadata fallback and supplies Popular/Featured movie and series
rows. The duplicate AIOMetadata Popular rows are suppressed on Home. Cinebye
was not needed and received no Stremio credential or auth key.

AIOMetadata uses TMDB watch-provider data to build/filter provider catalogs,
but its normal movie/series metadata response does not surface official
"where to watch" availability on title detail pages. The exact compatible
official add-on is WatchHub (`org.stremio.watchhub`, manifest
`https://watchhub.strem.io/manifest.json`). It was identified but not installed
because this change was restricted to discovery and must not add another
stream-resource provider.

## Data and trust boundaries

- Stremio account state contains the installed manifest URLs.
- Hosted AIOStreams and AIOMetadata configurations contain personalized secret
  values.
- TorBox holds the user's paid Pro account and delivery API credential.
- This GitHub repository contains only redacted evidence and architecture
  documentation.
- Community hosted instances and templates can change independently; manifests
  and version claims must be revalidated before future changes.
