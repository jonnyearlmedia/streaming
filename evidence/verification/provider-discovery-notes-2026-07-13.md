# Provider discovery verification — 2026-07-13

- Authenticated AIOMetadata instance: public ElfHosted 2.8.0; personalized
  location redacted.
- Configuration region: United States.
- Provider sort: Popularity, Descending.
- Visible provider pairs: Netflix, Hulu, Max, Disney+, Prime Video, Apple TV+,
  Peacock, Paramount+. Stremio appends Movie/Series to the short saved names.
- Every provider endpoint returned HTTP 200 with 20 items.
- Search catalogs preserved: Movies Search, Series Search, TVDB Collections,
  Anime Series Search, Anime Movies Search, and two People Search resources.
- OpenPosterDB custom artwork pattern remained configured; actual Home captures
  show rating-badge posters on movie and television service rows.
- First reinstall warning: `Max descriptor size reached`.
- Remediation: removed 81 unused hidden/duplicate catalog cards from the 106
  configured cards. Final builder count: 25.
- Final manifest: HTTP 200; 33 catalog declarations; 25 Home; seven search;
  one Calendar special.
- Second clean reinstall completed without the warning.
- No stream, TorBox, AIOStreams, subtitle, Trakt, or sorting configuration was
  changed.

## Where-to-watch capability

AIOMetadata's standard TMDB movie/series metadata builders do not expose the
fetched watch-provider data in Stremio detail metadata. Provider data is used
for discovery/catalog filtering. The exact official compatibility option is
WatchHub 1.15.0 (`org.stremio.watchhub`,
`https://watchhub.strem.io/manifest.json`), which declares the `stream`
resource for legal service offers. It was identified but not installed because
this pass was restricted to discovery.
