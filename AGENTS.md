# Repository operating instructions

This repository is an evidence and architecture-review checkpoint for the
current Stremio installation on the user's Mac.

## Required working rules

- Read `SETUP_STATUS.md`, `ARCHITECTURE.md`, `DECISIONS.md`, and
  `evidence/verification/verification-log.md` before proposing changes.
- Treat all personalized add-on URLs, UUIDs, passwords, API keys, and debrid
  tokens as secrets. Never commit them. Store only redacted locations or host
  names.
- Do not purchase, renew, upgrade, subscribe, or use referral links without the
  user's explicit consent at the time of the transaction.
- Do not research IPTV providers or self-host components unless the user later
  expands scope.
- Do not remove, reinstall, reorder, or reconfigure add-ons merely to complete
  documentation. Record uncertainty as an unresolved decision.
- Verify manifests with HTTP status and resource declarations. Use legal or
  public-domain media for stream tests and do not start playback solely for a
  verification test.
- Preserve raw evidence. Add new dated evidence rather than overwriting prior
  screenshots or logs.
- Never claim that Trakt scrobbling, Brainrot Formatter, catalog ordering, or
  Cinemeta suppression is complete unless current evidence proves it.

## Repository layout

- `PRODUCT_VISION.md`: confirmed goal and explicit non-goals.
- `ARCHITECTURE.md`: implemented layers and configuration boundaries.
- `DECISIONS.md`: confirmed decisions and unresolved decisions.
- `TEST_PLAN.md`: repeatable validation plan and current results.
- `SETUP_STATUS.md`: current implementation status.
- `FINAL_STACK.md`: prior completion summary from the implementation session.
- `evidence/`: redacted inventories, configuration exports, verification notes,
  and screenshots.

