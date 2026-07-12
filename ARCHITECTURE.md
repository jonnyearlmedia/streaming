# Current architecture

Last audited: 2026-07-12, America/Los_Angeles.

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

Configuration location:

- hosted AIOMetadata configuration at `https://aiometadata.elfhosted.com/`;
- personalized configuration identifier and password are stored outside this
  repository in the user's credential note;
- imported source JSON:
  `https://raw.githubusercontent.com/Tam-Taro/SEL-Filtering-and-Sorting/refs/heads/main/AIOMetadata%20Configs/Tamtaro-aiometadata-config-with-anime.json`.

### Stream aggregation and management

`AIOStreams 2.30.6` is installed from Yeb's nightly instance and was configured
with the official Tamtaro Complete SEL Setup 2.6.1. Standard SEL and English as
the first preferred language were selected.

Configuration location:

- hosted AIOStreams configuration at
  `https://aiostreams-nightly.fortheweak.cloud/`;
- personalized UUID, password, and manifest URL are stored outside this
  repository in the user's credential note;
- official template repository:
  `https://github.com/Tam-Taro/SEL-Filtering-and-Sorting`.

The Tamtaro debrid source set recorded at import time was SeaDex, Library,
Meteor, Comet, STorz, Torrentio, MediaFusion, Knaben, AnimeTosho, Sootio, and
TorBox Search/NZB support for TorBox Pro. These are internal AIOStreams sources,
not separately installed Stremio add-ons.

### Delivery

TorBox Pro is the configured debrid delivery service inside AIOStreams. The
personalized TorBox API credential is stored only in the hosted AIOStreams
configuration and the user's credential store. It is not committed here.

### Subtitles

OpenSubtitles v3 1.0.0 remains installed. The legacy OpenSubtitles 0.24.0 entry
was removed.

### Compatibility

Cinemeta 3.0.14 and Local Files 1.10.0 remain installed. No claim is made that
Cinemeta resources have been suppressed or reordered through Cinebye.

## Data and trust boundaries

- Stremio account state contains the installed manifest URLs.
- Hosted AIOStreams and AIOMetadata configurations contain personalized secret
  values.
- TorBox holds the user's paid Pro account and delivery API credential.
- This GitHub repository contains only redacted evidence and architecture
  documentation.
- Community hosted instances and templates can change independently; manifests
  and version claims must be revalidated before future changes.

