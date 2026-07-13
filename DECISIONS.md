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

Status: implemented and verified 2026-07-13.

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
