# Current architecture

Last audited: 2026-07-15, America/Los_Angeles.

## Runtime

- Stremio desktop shell: 5.1.25.
- Stremio app UI reported 6.0.1-beta.06.
- Local streaming server: 4.21.0 at `http://127.0.0.1:11470`.
- Stremio is signed into the user's existing account.

## Household profile model

Stremio Supporters supplies the household identity layer. The existing master
profile is named Jonny and retains Admin rights. Nene, Moncada, and Armada are
secondary profiles with independent Stremio history, libraries, Continue
Watching, and recommendations. All three were created with the official
`Clone addons` flow, so they received the same personalized AIOStreams,
AIOMetadata, subtitles, compatibility, and Sports Streams stack without
manually rebuilding hosted configurations.

Only Jonny can manage profiles and add-ons. Add-on management is disabled on
the three secondary profiles. The clone is a point-in-time copy rather than a
permanent synchronization relationship; future add-on changes must use
Stremio's `Apply to all profiles` option when available.

The existing Trakt scrobbling authorization remains on Jonny. Secondary
profiles intentionally use Stremio's native profile history and are not linked
to Jonny's Trakt account, preventing household playback from contaminating the
owner's Trakt history. AIOMetadata discovery shelves derived from Trakt remain
available because those catalogs are separate from playback scrobbling.

## Layer model

### Discovery and metadata

`AIOMetadata | ElfHosted 2.8.0` is the configured metadata and catalog layer.
Its configuration imported Tamtaro's current anime-inclusive AIOMetadata JSON.
It uses TMDB, TVDB, MDBList, and Fanart.tv credentials and OpenPosterDB artwork.
Its Home surface contains 25 plain-English shelves: four core trending/new
rows, movie and show shelves for eight familiar US services, three specialty
rows, and two deprioritized anime rows. The provider shelves use AIOMetadata's
built-in Streaming Providers integration with United States selected and
Release Date/Descending sorting. Seven search catalogs remain enabled.

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

### Live sports

`Sports Streams 1.2.0` (`community.sports.fly`) is a separately installed
Premium community add-on. Its personalized manifest uses the
`premium-us1.highfly.dev` host; the token and configuration path are secret and
redacted. It declares the custom `sport` type with catalog, meta, and stream
resources. Its 18 catalogs cover Live Now, Today, sport categories, and Premium
recaps; every catalog declares `notForHome: true`, keeping sports out of the
family Home layout.

The current configuration keeps all sports and scheduled events, uses US
Pacific match times, and formats choices with a plain `Live Sports` heading
plus resolution height, audio label, approximate required Mbps, Premium-feed
status, and delay. US-1 was selected after three HTTP manifest samples per
region returned the lowest observed average from this Mac. This is a control-
plane latency check, not a guarantee of live-stream throughput.

The live Premium configurator did not expose the advertised language or
quality-preference controls, so the configuration does not claim either.
Sports Streams remains outside the AIOStreams/TorBox boundary; AIOStreams
filters and bitrate ceilings do not transform its direct live-stream results.
The former `sportsfree-us2.highfly.dev` manifest was removed from all four
profiles, leaving one Premium Sports Streams entry per profile.

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
- Each Supporters profile has its own Stremio history and add-on collection;
  the secondary collections were cloned from Jonny during creation.
- Hosted AIOStreams and AIOMetadata configurations contain personalized secret
  values.
- TorBox holds the user's paid Pro account and delivery API credential.
- This GitHub repository contains only redacted evidence and architecture
  documentation.
- Community hosted instances and templates can change independently; manifests
  and version claims must be revalidated before future changes.
- Sports Streams is an additional community trust boundary. Its live source
  availability and quality can change independently of TorBox/AIOStreams.
