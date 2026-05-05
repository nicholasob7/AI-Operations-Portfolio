# Live Performance Baseline — 2026-05-05

## Scope

Live site inspected after the following merged changes:

- PR #74: Serve Spectral fonts as WOFF2.
- PR #75: Extend cache lifetime for stable static assets.

Live site:

- https://nicko.obrienai.com

Repository state at inspection:

- main/dev alignment confirmed after PR #75.
- HEAD: a9c1426 — Merge pull request #75 from nicholasob7/dev/main.

## Delivery Changes Confirmed

### Font delivery

Spectral font delivery now uses WOFF2 assets only:

- `/fonts/spectral/spectral-400.woff2`
- `/fonts/spectral/spectral-500.woff2`
- `/fonts/spectral/spectral-600.woff2`
- `/fonts/spectral/spectral-700.woff2`

TTF delivery was removed.

Approximate font payload change:

- Prior TTF total: 678,428 bytes.
- Current WOFF2 total: 242,172 bytes.
- Reduction: 436,256 bytes.
- Approximate reduction: 64%.

### Static asset cache policy

Stable static assets now use:

```http
Cache-Control: public, max-age=5184000, stale-while-revalidate=604800
