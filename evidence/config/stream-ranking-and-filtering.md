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

## Current debrid sort order

Global primary split: Cached/instant, then Uncached/fallback.

Inside Global Cached: Language → SeaDex → Resolution → Quality → Library →
Stream Expression Matched → Stream Expression Score → Subtitle → Visual Tag →
Audio Tag → Encode → Age → Bitrate → Seeders.

Inside Global Uncached: Language → SeaDex → Resolution → Quality → Library →
Stream Expression Matched → Stream Expression Score → Seeders → Subtitle →
Visual Tag → Audio Tag → Encode → Age → Bitrate.

Preferred language order: English → Dual Audio → Multi → Dubbed → Original →
Unknown. The required-language set contains those six groups; streams explicitly
classified as only a different language are excluded.

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

## Living-room English-audio audit — 2026-07-13

- Loaded the authenticated AIOStreams nightly configuration and saved the
  language policy above. Reload verification showed the values persisted.
- Active Sort Configuration showed Language first for Movies, Series, and
  Anime in both Global Cached and Global Uncached.
- *Night of the Living Dead* top three: Original/inferred English with no
  explicit audio marker; confirmed English audio plus English subtitles;
  no explicit audio marker.
- *The Lucy Show* S01E01 returned only two choices: cached individual episode,
  then uncached season pack. Neither exposed an audio marker.
- *Momotaro, Sacred Sailors* top two explicitly declared Japanese audio; the
  remaining four exposed no marker. No English dub was present in the safe test
  set, so the original-language fallback was preserved.
- English subtitle markers were recorded separately and were not treated as
  proof of English audio. No playback was started.
