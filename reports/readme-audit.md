# README Audit

- README source path: `README.md`
- Overall status: `needs update`

## stale factual claims

### Homepage action design
- Exact current README wording:
  `The homepage exposes resume, email, and social actions as controlled reveals rather than dumping every option on screen at once.`
- Why it appears outdated or mismatched:
  The current homepage uses a direct `Resume` link in `src/lib/components/home/HeroSection.svelte`. Only `Email` and `Social` are controlled reveals.
- Suggested action type:
  `revise`

### Homepage action design
- Exact current README wording:
  `Resume and project cards use paired actions:`
  ``View First` for reading in-browser, and `Download Print-Friendly (B&W PDF)` for offline use.`
- Why it appears outdated or mismatched:
  The current homepage project cards in `src/lib/components/home/ProjectsSection.svelte` each expose a single CTA (`Complete`, `Active`, or `Personal`). The homepage does not show paired view/download actions.
- Suggested action type:
  `revise`

### Download and print behavior
- Exact current README wording:
  `The resume and both project pages each include their own B&W download action at page level, not just from the homepage reveal state.`
- Why it appears outdated or mismatched:
  The page-level B&W download actions still exist, but the current homepage does not expose a matching download reveal state for these pages. The comparison target described in this sentence no longer matches the current homepage behavior.
- Suggested action type:
  `revise`

## outdated wording

- None identified.

## outdated file/path references

- None identified.

## outdated workflow/process descriptions

### Node Version
- Exact current README wording:
  `Local validation was also completed successfully on Node `24.14.1` on April 15, 2026:`
  ``npm ci``
  ``npm run check``
  ``npm run build``
  `If you want local development to match Cloudflare as closely as possible, use Node 22. If you want a newer machine-wide default, Node 24 LTS also works with the current codebase based on the checks above.`
- Why it appears outdated or mismatched:
  This is a dated validation claim tied to a specific past check run. The repository has changed since that date, so the statement that Node 24 LTS works with the current codebase is no longer current without rerunning and re-recording the checks.
- Suggested action type:
  `verify`

## outdated website description

- None identified.

## possible ambiguity / uncertain items

### Top-level description
- Exact current README wording:
  `The site is deployed on Cloudflare Pages and built as a fully prerendered static site.`
- Why it appears outdated or mismatched:
  The fully prerendered static-site part is supported by `@sveltejs/adapter-static` and `src/routes/+layout.ts`, but the active hosting platform is not directly verifiable from repository files alone.
- Suggested action type:
  `verify`

### Node Version
- Exact current README wording:
  `This aligns with the current Cloudflare Pages build target for the deployed site.`
- Why it appears outdated or mismatched:
  The repo shows `.nvmrc` and `package.json` engine constraints, but it does not contain direct evidence of the current Cloudflare Pages runtime target.
- Suggested action type:
  `verify`

### Deployment
- Exact current README wording:
  `This project is deployed via Cloudflare Pages with these current settings:`
  `Production branch: `main``
  `Build command: `npm run build``
  `Build output directory: `build``
  `Root directory: `/``
  `Build system version: `3``
- Why it appears outdated or mismatched:
  `npm run build`, `build`, and the static adapter are consistent with the repo, but the claim that these are the current deployed Cloudflare Pages settings is not directly verifiable from repository files alone.
- Suggested action type:
  `verify`
