# Complete feature and customization matrix

This document separates four different things that can otherwise sound like
one feature:

- **Implemented**: present in `0.1.0`.
- **Available next**: supported by the protocol and realistic to add.
- **Client-dependent**: the add-on can provide the data, but each Stremio app
  decides how or whether to display it.
- **Not controllable**: outside the Stremio add-on protocol or controlled by
  YouTube.

## Add-on listing and installation surface

| Feature | Status | Customization |
|---|---|---|
| Add-on name | Implemented | Exact lowercase `brownjonnybravo` |
| Add-on ID and version | Implemented | `com.brownjonnybravo.channel`, semantic versioning |
| Add-on description | Implemented | Fully editable text |
| Add-on logo | Implemented | Current public channel avatar; may be replaced with custom artwork |
| Add-on background | Implemented | Current public channel banner; may be replaced |
| Adult/P2P declarations | Implemented | Both correctly set to false |
| Report/contact email | Available next | Can be added if a public support address is wanted |
| Configure button/page | Available next | Could expose row toggles, limits, artwork, and playback choices in a web form |
| Public Community Add-ons publication | Available next | Requires stable public HTTPS hosting and a deliberate publication decision |
| Per-user secret configuration | Available next | Supported, but unnecessary for this public YouTube channel |

## Home and Discover rows

| Feature | Status | Customization |
|---|---|---|
| Latest Videos row | Implemented | Name, enablement, limit, Shorts inclusion, poster shape |
| Playlists row | Implemented | Name, enablement, poster shape, playlist discovery |
| Shorts row | Implemented but disabled | One JSON switch enables it |
| Featured/Best Of row | Available next | Manual video IDs or a selected YouTube playlist |
| Vlogs/Cooking/Mukbang rows | Available next | Any playlist can become its own independent row |
| Popular Videos row | Available next | Requires a ranking rule and preferably YouTube Data API statistics |
| Live/Premieres row | Available next | Public scheduled/live videos can be represented separately |
| Search | Implemented | Searches titles and descriptions within each catalog |
| Pagination | Implemented | `skip` support and configurable limits |
| Genre/category filters | Available next | Predefined options can be surfaced in Discover |
| Row order inside this add-on | Fully controllable | Determined by manifest catalog order |
| Position relative to other add-ons | Stremio/account-controlled | Determined by installed add-on/catalog ordering, not by this server |
| Hide a row from Home but keep Discover | Client/protocol-version dependent | Must be verified against the target client before promising it |
| Card title | Implemented | YouTube title or custom override |
| Card artwork | Implemented | YouTube landscape thumbnail or custom URL |
| Card aspect ratio | Implemented | `landscape`, `square`, or `poster` |
| Card ordering | Implemented | Latest videos newest-first; playlists in YouTube discovery order |
| Arbitrary badges on cards | Not native | Can only be baked into artwork or included in text |
| Custom card CSS, fonts, animation, spacing | Not controllable | Owned by the Stremio client |

## Large focused preview and hover/focus behavior

| Feature | Status | Customization |
|---|---|---|
| Large static focused artwork | Implemented metadata | Current Stremio Discover uses the selected card art; detail uses `background` |
| Title or channel logo | Implemented metadata | Text fallback or custom transparent logo |
| Runtime | Implemented | Can be hidden or formatted differently |
| Release year/date | Implemented | Can be hidden or moved into description |
| Description | Implemented | YouTube description plus optional statistics |
| Category/deep links | Implemented | Watch on YouTube and open the channel |
| Trailer/preview action | Implemented | Full video is supplied as `trailerStreams` when enabled |
| Autoplay preview merely by scrolling/focusing | Not forceable | Current Stremio Home renders rows only; current Discover exposes a Trailer button rather than an add-on-controlled autoplay switch |
| Muted looping hover preview | Not defined by protocol | Would require a future Stremio client feature |
| Preview start/end timestamps | Not defined by the documented add-on fields | A separate preview clip could be published as its own stream, but the client still decides playback UX |
| Different preview per device | Available next | Server could choose metadata by configured manifest, but client behavior still varies |

## Video and playlist detail pages

| Feature | Status | Customization |
|---|---|---|
| Detail-page background | Implemented | YouTube thumbnail or custom wide artwork |
| Channel avatar/logo | Implemented | Replaceable |
| Full video description | Implemented | Public YouTube description |
| View count | Implemented display | Refreshed public count, subject to caching |
| Like count | Implemented display | Public count when the feed supplies it |
| Published date | Implemented | ISO source date and human-readable label |
| Runtime | Implemented | Enriched with `yt-dlp` when available |
| Website/watch link | Implemented | Official YouTube video or playlist URL |
| Playlist video list | Implemented | Thumbnail, title, overview, date, playback choices |
| Default/featured video | Implemented | First or selected video through behavior hints |
| Custom playlist descriptions | Available next | Per-playlist overrides in configuration |
| Chapters | Client/YouTube-dependent | Description chapters are retained; Stremio does not expose an add-on chapter-object field here |
| Add to Library | Stremio-controlled | Metadata supports a normal channel item; button/state belongs to Stremio |
| Watched/progress state | Stremio-controlled | Stable IDs allow Stremio to associate progress; exact cross-client behavior requires visible verification |
| New-upload notifications | Client-dependent | Stremio historically supports followed web channels, but this custom add-on must be installed and visibly tested before claiming notifications work |
| User comments | Not native | Link out to YouTube |
| Like/dislike/subscribe buttons | Not native | Link out to YouTube |
| Arbitrary custom buttons | Not native | Only supported actions and external/meta links are available |

## Playback

| Feature | Status | Customization |
|---|---|---|
| Play inside Stremio | Implemented | Uses the official `ytId` stream field |
| Open official YouTube page/app | Disabled by design | Playback now stays inside Stremio |
| Choice labels/descriptions | Implemented | Fully editable |
| Stream thumbnail | Implemented metadata | YouTube thumbnail |
| Video subtitles/captions | YouTube/player-controlled | Could add separate subtitle URLs later, but YouTube captions are not currently imported |
| Binge/automatic next video | Available next/client-dependent | Can use ordered videos and `bingeGroup`; must be visibly tested |
| Cast/external player | Stremio/client-controlled | Availability depends on client and chosen YouTube transport |
| Video quality selection | YouTube/Stremio-controlled | Add-on cannot force 1080p/4K for `ytId` playback |
| Playback speed | Stremio/player-controlled | Not set by the add-on |
| Captions, audio tracks, ads | YouTube/player-controlled | Not set by catalog metadata |
| Guaranteed YouTube public view | Not guaranteeable | Deliberate embedded playback may count; autoplay does not, and YouTube validates views |
| Guaranteed monetized view/ad impression | Not guaranteeable | Controlled entirely by YouTube eligibility, player, viewer, and policy |
| Watch-time analytics | YouTube-controlled | May appear as embedded/external playback if YouTube accepts the session |

## YouTube data and refresh behavior

| Feature | Status | Customization |
|---|---|---|
| No-login public channel sync | Implemented | Public channel and playlist feeds |
| New uploads | Implemented | Background refresh every 15 minutes by default |
| New public playlists | Implemented | Discovered through `yt-dlp` |
| Deleted/private videos | Implemented | ID-only tombstones filtered out |
| Offline fallback | Implemented | Bundled public snapshot |
| Manual refresh | Implemented | Local-only button and `POST /refresh` |
| Refresh interval | Implemented | `BJB_CACHE_TTL_SECONDS` |
| Full historical uploads | Available next | Increase limits or add YouTube Data API paging |
| Private/unlisted playlists | Available next with authorization | Would require OAuth and a private server-side token store |
| Subscriber count | Available next | YouTube Data API or another public metadata source |
| Precise live/premiere state | Available next | YouTube Data API/live metadata adapter |
| Comments | Available next as read-only text only | Would require API quota and a custom representation; Stremio has no comment UI |
| Analytics dashboard | Available next | Separate private web page; not a Stremio-native surface |

## Configuration already exposed in `config/channel.json`

- Exact manifest ID, name, version, and description.
- Channel ID, handle, and public URLs.
- Avatar, banner, display name, tagline, and location.
- Latest Videos, Playlists, and Shorts row names.
- Row enablement.
- Row limits.
- Whether Shorts mix into Latest Videos.
- Card aspect ratio per row.
- Whether the full video is supplied as a preview/trailer action.
- Whether Stremio playback is offered.
- Whether an external YouTube playback choice is offered; currently disabled.
- Whether views, likes, runtime, and published date are displayed.
- Fallback playlist IDs and labels.
- Bind host, port, cache duration, `yt-dlp` path, and offline-refresh mode.

## Recommended next increments

1. Install the local manifest on the Jonny profile only and visibly evaluate
   row placement, landscape artwork, focused preview, playlist navigation,
   library behavior, in-app playback, and the Trailer action.
2. Adjust artwork and text based on that real client rendering.
3. Decide whether Shorts deserve a separate row.
4. Add per-playlist rows only if the single Playlists row feels too nested.
5. Add a local configuration page if editing JSON becomes inconvenient.
6. Choose an HTTPS/always-on hosting model only after the local experience is
   approved.

No install, playback, Stremio profile change, or public publication is part of
version `0.1.0` verification.

## Primary references

- [Stremio content types](https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/content.types.md)
- [Stremio manifest and catalog fields](https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/manifest.md)
- [Stremio meta, video, artwork, preview, and behavior fields](https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/meta.md)
- [Stremio stream fields, including `ytId` and `externalUrl`](https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/stream.md)
- [Current Stremio Home row implementation](https://github.com/Stremio/stremio-web/blob/development/src/routes/Board/Board.js)
- [Current Stremio focused preview implementation](https://github.com/Stremio/stremio-web/blob/development/src/components/MetaPreview/MetaPreview.js)
- [YouTube embedded-player view-count rule](https://developers.google.com/youtube/iframe_api_reference)
