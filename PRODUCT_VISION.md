# Product vision

## Confirmed goal

Maintain a premium 2026 Stremio power-user setup centered on:

- discovery and metadata through AIOMetadata, OpenPosterDB, Trakt-derived
  catalogs, and MDBList;
- stream aggregation and management through AIOStreams using the official
  Tamtaro Complete SEL Setup;
- Torrentio, Comet, and MediaFusion coverage inside AIOStreams, plus additional
  sources supplied by the official Tamtaro template;
- TorBox Pro delivery;
- English-first filtering;
- OpenSubtitles v3;
- evidence-backed manifest, catalog, artwork, stream-deduplication, and language
  validation.

## Confirmed operating constraints

- Do not preserve an existing architecture merely because it exists.
- Use official import flows and templates instead of manually recreating them.
- Use Tamtaro Complete, not Partial, and Standard SEL unless evidence supports
  Extended SEL.
- Use a current community-recommended nightly AIOStreams instance when it is
  materially ahead of stable.
- Do not buy, renew, upgrade, subscribe, or use referral links without explicit
  consent.
- Do not research IPTV providers yet.
- Do not self-host anything yet.
- Keep secrets out of repository artifacts.

## Explicitly unresolved

The user has not confirmed:

- a canonical source or exact JSON for a formatter called “Brainrot
  Formatter”;
- whether Cinemeta should be removed, suppressed through Cinebye, or retained
  permanently as a compatibility fallback;
- whether Stremio-wide Trakt scrobbling should be authorized in addition to the
  Trakt-derived discovery catalogs already provided by AIOMetadata;
- whether AIOStreams Standard SEL defaults should later be customized;
- the desired long-term GitHub workflow beyond this architecture checkpoint.

