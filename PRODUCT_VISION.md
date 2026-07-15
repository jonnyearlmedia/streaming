# Product vision

## Confirmed goal

Maintain a premium 2026 Stremio power-user setup centered on:

- discovery and metadata through AIOMetadata, OpenPosterDB, Trakt-derived
  catalogs, and MDBList;
- stream aggregation and management through AIOStreams using the official
  Tamtaro Complete SEL Setup;
- Torrentio and Comet coverage inside AIOStreams, plus the additional sources
  supplied by the official Tamtaro template. MediaFusion remains defined but
  disabled while that is the current upstream recommendation;
- TorBox Pro delivery;
- English-first filtering;
- OpenSubtitles v3;
- Stremio-wide Trakt scrobbling in addition to Trakt-derived discovery;
- optional live sports through the user-installed Sports Streams add-on,
  isolated from the AIOStreams/TorBox movie and television path;
- evidence-backed manifest, catalog, artwork, stream-deduplication, and language
  validation.

The same account is used daily on a shared living-room television. Discovery
must therefore feel like a familiar streaming service rather than an add-on
dashboard: Continue Watching first, plain-English shelf names, major US
services visibly represented, and anime/specialty shelves deprioritized.

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
- Auditing and filtering the already-installed Sports Streams add-on is in
  scope; broader IPTV-provider research remains out of scope.
- Do not self-host anything yet.
- Keep secrets out of repository artifacts.
- Keep user-facing catalog names free of implementation brands such as Trakt,
  MDBList, MAL, and AniList when a plain-English label communicates the same
  purpose.

## Explicitly unresolved

The following future choices remain unresolved:

- a canonical source or exact JSON for a formatter called “Brainrot
  Formatter”;
- whether AIOStreams Standard SEL defaults should later be customized;
- which sports should remain visible in Sports Streams and whether scheduled
  events should be hidden with Live Only;
- the desired long-term GitHub workflow beyond this architecture checkpoint.

For the finished setup, Cinemeta is retained as a narrow
compatibility/metadata fallback and its Popular/Featured rows replace the
duplicate AIOMetadata Popular rows. This records the implemented architecture,
not a claim that the user can never revisit it.
