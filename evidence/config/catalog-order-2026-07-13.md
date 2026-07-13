# AIOMetadata pre-cleanup manifest order — 2026-07-13

The personalized manifest returned HTTP 200 with 76 entries. Personalized
locations and credentials are omitted. `Home` means `showInHome` was not
reported as `false`; Stremio may still treat search-type entries specially.

| # | Home | Type | Catalog |
|---:|:---:|---|---|
| 1 | yes | movie | Seasonal |
| 2 | yes | series | Trakt Trending |
| 3 | yes | movie | Trakt Trending |
| 4 | yes | series | Latest Airing |
| 5 | yes | movie | Latest Digital Release |
| 6 | yes | series | TMDB Popular |
| 7 | yes | movie | TMDB Popular |
| 8 | no | movie | TMDB By Year |
| 9 | no | series | TMDB By Year |
| 10 | no | movie | TMDB By Language |
| 11 | no | series | TMDB By Language |
| 12 | no | movie | TVDB Genres |
| 13 | no | series | TVDB Genres |
| 14 | no | collection | TVDB Collections |
| 15 | yes | series | Trending Kids |
| 16 | yes | movie | Trending Kids |
| 17 | yes | anime | MAL Airing Now |
| 18 | yes | anime | AniList Trending |
| 19 | yes | anime | AniDB Latest Ended |
| 20 | yes | anime | MAL Top Series |
| 21 | yes | anime | MAL Top Movies |
| 22 | no | anime | MAL Top All Time |
| 23 | yes | anime | MAL Top 2020s |
| 24 | yes | anime | MAL Top 2010s |
| 25 | yes | anime | MAL Top 2000s |
| 26 | yes | anime | MAL Top 1990s |
| 27 | yes | anime | MAL Top 1980s |
| 28 | no | anime | MAL Genres |
| 29 | yes | series | Crunchyroll Latest |
| 30 | yes | movie | Crunchyroll Latest |
| 31 | yes | series | Netflix Latest |
| 32 | yes | movie | Netflix Latest |
| 33 | yes | series | Amazon Prime Latest |
| 34 | yes | movie | Amazon Prime Latest |
| 35 | yes | series | Apple+ Latest |
| 36 | yes | movie | Apple+ Latest |
| 37 | yes | series | Disney+ Latest |
| 38 | yes | movie | Disney+ Latest |
| 39 | yes | series | Paramount+ Latest |
| 40 | yes | movie | Paramount+ Latest |
| 41 | yes | series | HBO Max Latest |
| 42 | yes | movie | HBO Max Latest |
| 43 | yes | series | Hulu Latest |
| 44 | yes | movie | Hulu Latest |
| 45 | yes | series | Action |
| 46 | yes | movie | Action |
| 47 | yes | series | Animated |
| 48 | yes | movie | Animated |
| 49 | yes | series | Comedy |
| 50 | yes | movie | Comedy |
| 51 | yes | series | Crime |
| 52 | yes | movie | Crime |
| 53 | yes | series | Drama |
| 54 | yes | movie | Drama |
| 55 | yes | movie | History & War |
| 56 | yes | series | Horror |
| 57 | yes | movie | Horror |
| 58 | yes | movie | Must-See Modern Horror |
| 59 | yes | movie | Must-See Mindfuck |
| 60 | yes | series | Sci-Fi |
| 61 | yes | movie | Sci-Fi |
| 62 | yes | series | Thriller |
| 63 | yes | movie | Thriller |
| 64 | yes | movie | Top Documentaries |
| 65 | yes | series | Top Documentaries |
| 66 | yes | series | Top Nature |
| 67 | yes | series | Top Reality TV |
| 68 | yes | movie | Top Standup Comedy |
| 69 | yes | movie | Movies Search |
| 70 | yes | series | Series Search |
| 71 | yes | collection | TVDB Collections |
| 72 | yes | anime.series | Anime Series Search |
| 73 | yes | anime.movie | Anime Movies Search |
| 74 | yes | movie | People Search |
| 75 | yes | series | People Search |
| 76 | yes | series | Calendar videos |

This inventory is the preserved pre-cleanup state. It proved that cleanup was
material: 67 entries were home-eligible, including repetitive service, genre,
decade, and search rows. The authenticated configuration was subsequently
reduced; see `final-catalog-layout-2026-07-13.md` for the finished surface.
