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

### AD-006 — Retain built-in compatibility add-ons for the checkpoint

Status: current state, not a declared permanent preference.

Cinemeta and Local Files remain installed. This checkpoint does not infer that
the user wants them permanently.

## Unresolved decisions

### UD-001 — Brainrot Formatter source

No canonical Brainrot template was found in the official AIOStreams or Tamtaro
repositories. Community posts use the name for multiple snippets. Tamtaro's
official default formatter remains active pending an exact source selected by
the user.

### UD-002 — Trakt scrobbling OAuth

AIOMetadata exposes Trakt-derived discovery catalogs, but Stremio Settings still
showed `Authenticate` for playback scrobbling. No successful OAuth grant was
recorded.

### UD-003 — Cinemeta suppression or removal

AIOMetadata is installed but the checkpoint does not prove a Cinebye resource
override or add-on reordering. The desired permanent treatment of Cinemeta
requires explicit confirmation.

### UD-004 — Full live catalog order export

The AIOMetadata manifest was previously verified with 76 catalog/search
variants. Only the leading order was recorded in notes. A complete live export
would require reopening the personalized hosted configuration or retrieving the
personalized manifest URL; this checkpoint does not expose those secrets.

### UD-005 — Representative television stream-results screenshot

No verified screenshot of a television episode's stream-selection list was
captured. The repository preserves a paused television playback-state image but
labels it accurately as not being stream-results evidence.

