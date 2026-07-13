# Final home catalog layout — 2026-07-13

The authenticated AIOMetadata configuration was saved and cleanly reinstalled
after the home-visibility cleanup. Personalized URLs and identifiers are
omitted.

## Visible Stremio home order

1. Continue Watching
2. Popular — Movie (Cinemeta compatibility)
3. Popular — Series (Cinemeta compatibility)
4. Featured — Movie (Cinemeta compatibility)
5. Featured — Series (Cinemeta compatibility)
6. Trakt Trending — Series
7. Trakt Trending — Movie
8. Latest Airing — Series
9. Latest Digital Release — Movie
10. MAL Airing Now — Anime
11. AniList Trending — Anime
12. Must-See Mindfuck — Movie
13. Top Documentaries — Movie
14. Top Documentaries — Series

AIOMetadata's TMDB Popular movie and series rows are disabled on Home because
the Cinemeta Popular rows already serve that purpose. Search resources remain
enabled for movies, series, anime movies, anime series, and people. The TVDB
collection and Calendar special resources remain available without adding
repetitive home rows.

## Final manifest evidence

- HTTP status: 200.
- Version: 2.8.0.
- Resources: catalog, meta, subtitles.
- Total catalog/search definitions: 76.
- Definitions retaining a home flag: 10, including the Calendar special
  resource.
- Visible AIOMetadata discovery rows: 9.
