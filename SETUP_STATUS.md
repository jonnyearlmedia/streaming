# Stremio setup status

Last checked: 2026-07-12 (America/Los_Angeles)

> This file records the previous architecture. The completed replacement stack,
> removals, and verification evidence are documented in `FINAL_STACK.md`.

## Completed

- Installed Stremio 5.1.25 for Apple Silicon at `/Applications/Stremio.app`.
- Launched Stremio successfully.
- Confirmed the local streaming server is running at `http://127.0.0.1:11470`.
- Confirmed the remaining core add-ons include Cinemeta, OpenSubtitles v3,
  OpenSubtitles, and Local Files.
- Installed Torrentio RD 0.0.15 with Real-Debrid, quality-then-size sorting,
  ten results per quality, and CAM/Screener/480p/unknown results excluded.
- Installed Streaming Catalogs 1.1.1 for the United States with provider rows
  including Netflix, Peacock, and Hulu.
- Installed M3U/EPG TV Addon 1.2.0 using the Harleythetech/IPHTV Philippine
  playlist. EPG is disabled because no XMLTV guide URL was supplied.
- Installed the personalized MediaFusion ElfHosted Real-Debrid configuration
  with only Live Sport Events enabled. Removed the Basketball and Fighting
  archive catalogs after they exposed polluted/misclassified listings.
- Removed the YouTube and Public Domain Movies add-ons as requested.
- Confirmed the provider catalog rows populate on the Stremio home screen.
- Aborted Comet and confirmed it is not installed.

## Verification notes

MediaFusion's configuration UI was retried successfully. Its first generated
URL returned `Invalid user data`; a replacement configuration was generated
through MediaFusion's own configuration endpoint and its manifest was checked
before installation. Stremio now has exactly one personalized entry:
`MediaFusion | ElfHosted RD` 5.5.2.

The final MediaFusion manifest contains only the `Live Sport Events` catalog.
Its nudity filter blocks `Severe` and `Unknown`, and its certification filter
blocks `Adults+` and `Unknown`. The old MediaFusion DEV entry and its
Basketball/Fighting rows were removed. Live Sport Events may remain blank when
MediaFusion has no current event available.

CyberFlix is deprecated and its hosted instance has been retired, so Streaming
Catalogs is installed as the catalog replacement.

The initially exposed Real-Debrid private token was refreshed and revoked.
Torrentio was reinstalled with the replacement token, and the obsolete add-on
entry was removed. Exactly one Torrentio RD entry remains installed.

Stremio's Default Audio Track is already set to English. Torrentio Lite 0.0.15
does not currently expose the requested "Exclude all non-English audio" control,
so Torrentio was not replaced with a less-capable Lite configuration.

Only configure sources for content you are legally entitled to access.

1. Install Stremio on the Onn 4K Pro and sign in with the same Stremio account;
   the account add-ons should then synchronize.
2. Review each third-party add-on's privacy policy and current configuration
   page before giving it any credential.
3. Install only the add-ons you actually need, then test with known licensed or
   public-domain content.

## Verified links

- Stremio downloads: <https://www.stremio.com/downloads>
- Real-Debrid API documentation: <https://api.real-debrid.com/>
- Real-Debrid support: <https://real-debrid.com/support>

The third-party URLs in the supplied PDF were not treated as trusted merely
because they appeared in the document. Their operators, privacy practices, and
availability can change independently of Stremio and Real-Debrid.
