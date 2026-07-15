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
6. Trending — Movie
7. Trending — Series
8. New Releases — Movie
9. New Episodes — Series
10. Netflix — Movie
11. Netflix — Series
12. Hulu — Movie
13. Hulu — Series
14. Max — Movie
15. Max — Series
16. Disney+ — Movie
17. Disney+ — Series
18. Prime Video — Movie
19. Prime Video — Series
20. Apple TV+ — Movie
21. Apple TV+ — Series
22. Peacock — Movie
23. Peacock — Series
24. Paramount+ — Movie
25. Paramount+ — Series
26. Mind-Bending — Movie
27. Documentaries — Movie
28. Documentaries — Series
29. Anime Picks — Anime
30. New Anime Episodes — Anime

Rows 6-30 are AIOMetadata. United States is selected in Streaming Providers,
and provider sorting is Release Date, Descending as of 2026-07-15. The saved
labels are short because Stremio appends the type itself. They avoid
backend/source names that are meaningless to a living-room user.

The sort uses each title's release date, not provider-specific date-added data.
The global Trending, Popular/Featured, New Releases, and New Episodes shelves
remain the complementary popularity and freshness views. No extra provider
rows were added.

Search remains enabled for movies, series, anime movies, anime series, people,
and TVDB collections. Calendar remains a special required-extra catalog and
does not add a normal Home shelf.

## Final manifest evidence

- HTTP status: 200.
- Version: 2.8.0.
- Resources: catalog, meta, subtitles.
- Total manifest catalog declarations: 33.
- Visible AIOMetadata Home shelves: 25.
- Search catalogs: 7.
- Calendar special catalogs: 1.
- Provider endpoint checks: 16 of 16 returned HTTP 200 with non-empty first
  pages (16-20 items in the 2026-07-15 audit).
- Stremio clean reinstall: completed without the earlier descriptor-size
  warning after 81 unused definitions were deleted.
