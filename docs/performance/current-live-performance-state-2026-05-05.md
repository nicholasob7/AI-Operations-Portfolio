# Current Live Performance State — 2026-05-05

## Scope

This document records the current live performance state of:

- https://nicko.obrienai.com

It supersedes the earlier same-day baseline as the primary readable performance receipt.

Current production state includes:

- PR #74 — Serve Spectral fonts as WOFF2.
- PR #75 — Extend cache lifetime for stable static assets.
- PR #76 — Record live performance baseline.
- PR #77 — Prioritize homepage portrait preload.

Repository state after PR #77:

- `main`, `origin/main`, `dev/main`, and `origin/dev/main` aligned.
- HEAD: `e9eaa2e` — Merge pull request #77 from `nicholasob7/dev/main`.

## Current Delivery State

### Fonts

Spectral is served as WOFF2 only.

Approximate font payload change:

- Former TTF total: 678,428 bytes.
- Current WOFF2 total: 242,172 bytes.
- Reduction: 436,256 bytes.
- Approximate reduction: 64%.

### Stable Static Asset Cache

Stable static assets use:

    Cache-Control: public, max-age=5184000, stale-while-revalidate=604800

Meaning:

- 60 days fresh.
- 7 days stale-while-revalidate.

Confirmed asset groups:

- `/fonts/*`
- `/images/*`
- `/aurora/*`
- `/resumes/*`
- `/favicon-n-purple-green.svg`

Generated/current-state routes remain conservative:

- `/`
- `/resume`
- `/highlights/ai-governance`
- `/canonical.json`
- `/sitemap.xml`

Those remain on:

    Cache-Control: public, max-age=0, must-revalidate

### Homepage Portrait Priority

The homepage portrait preload carries `fetchpriority="high"`.

The portrait intro image itself also carries `fetchpriority="high"`.

Lighthouse LCP discovery confirms:

- `fetchpriority=high applied`
- LCP resource discoverable in the initial document.
- LCP resource is not lazy-loaded.

## Current Lighthouse State

### Desktop Lighthouse

Live homepage:

- URL: `https://nicko.obrienai.com/`

Result:

- Performance: 100
- Accessibility: 100
- Best Practices: 92
- SEO: 100
- First Contentful Paint: 0.4 s
- Largest Contentful Paint: 0.5 s
- Speed Index: 1.0 s
- Total Blocking Time: 0 ms
- Cumulative Layout Shift: 0

### Observed Mobile Lighthouse

Live homepage, mobile form factor, no simulated throttling:

- URL: `https://nicko.obrienai.com/`

Result:

- Performance: 100
- First Contentful Paint: 0.2 s
- Largest Contentful Paint: 0.3 s
- Speed Index: 1.5 s
- Total Blocking Time: 0 ms
- Cumulative Layout Shift: 0
- LCP discovery: `fetchpriority=high applied`

LCP breakdown:

- Time to first byte: 112.788 ms
- Resource load delay: 7.170 ms
- Resource load duration: 114.844 ms
- Element render delay: 50.116 ms

### Simulated Mobile Lighthouse Caveat

Earlier throttled/simulated mobile Lighthouse runs showed lower scores and unstable LCP readings after PR #77, including repeated LCP values around 5.4 s.

Those readings are treated as a synthetic-lab caveat, not the primary current-state finding, because:

- Observed mobile Lighthouse scored 100.
- Real-device inspection showed healthy mobile behavior.
- Total Blocking Time remained 0 ms.
- Cumulative Layout Shift remained 0.
- The LCP discovery diagnostic was resolved.
- No user-facing instability was observed.

## Current Judgment

The live site is production-healthy.

- Desktop Lighthouse is effectively maxed.
- Observed mobile Lighthouse is effectively maxed.
- TBT is 0 ms.
- CLS is 0.
- Static asset delivery is fast.
- Stable assets are now cached appropriately for recruiter revisit behavior.
- Fonts are served in the appropriate compressed web format.
- The homepage LCP portrait is discoverable and priority-hinted.
- No image recompression is justified.
- No image quality reduction is justified.
- No performance-driven visual redesign is justified.

## Preservation Rule

Future performance work should compare against this current-state receipt before changing visual assets.

Do not reduce image quality unless a later measured regression proves the need and a uniform image-system policy is adopted.
