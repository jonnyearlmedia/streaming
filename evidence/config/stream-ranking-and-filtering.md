# Stream ranking and filtering evidence

Source of truth at import: Tamtaro Complete SEL Setup 2.6.1, imported through
the official AIOStreams wizard.

## Confirmed selections

- Standard SEL, described by the template as retaining approximately the top
  three streams per quality/resolution and approximately 20 total results.
- English selected first in preferred stream languages.
- Recommended defaults retained unless explicitly recorded otherwise.
- TorBox Pro selected as the debrid service.
- Tamtaro default formatter selected by the Complete template.
- Synced excluded, included, and preferred stream-expression URLs supplied by
  the template.
- Vidhin release regex integration supplied by the template.

## Recorded Tamtaro debrid sort order

SeaDex → Resolution → Quality → Library → Stream Expression → Stream
Expression Score → Language → Encode → Bitrate → Seeders.

The template can apply additional conditional paths and passthrough rules. This
file intentionally does not reconstruct the full generated JSON. The hosted
AIOStreams configuration remains the live source of truth.

## Deduplication evidence

For `tt0063350`, 15 returned results produced 15 unique compound keys using
`infoHash`, `fileIdx`, and `url`; zero duplicate keys remained.

## Final visible-result evidence — 2026-07-13

- Movie: 14 TorBox-backed AIOStreams choices were visible for *Night of the
  Living Dead*. Cached/instant choices were placed before uncached choices.
- Television: *The Lucy Show* S01E01 retained both a cached individual episode
  and an uncached season pack. These were correctly treated as distinct.
- Anime/foreign language: *Momotaro, Sacred Sailors* returned six Japanese
  choices from internal Comet, Knaben, and STorz sources. English remained the
  preference, but original-language content was not hidden when appropriate.
- Formatter: result names and descriptions used the readable Tamtaro Complete
  format with resolution, cache state, size/bitrate, TorBox service, source,
  and language markers where available.
- No playback was started for these verification checks.
