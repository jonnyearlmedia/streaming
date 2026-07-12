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

