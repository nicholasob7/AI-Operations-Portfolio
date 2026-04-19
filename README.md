# AI Operations Portfolio

Static SvelteKit portfolio site for Nicko O'Brien, focused on AI-forward IT operations, technical communication, automation, and selected project work.

The site is deployed on Cloudflare Pages and built as a fully prerendered static site.

## Purpose

This repository is not just a portfolio shell. It is built to present resume and case-study material in a way that reduces reader effort.

The current UX direction favors:

- clear primary actions over dense navigation
- "view first" reading flows before download decisions
- reduced scroll friction on long-form pages
- printable assets that match the live page content
- interaction patterns that keep the reader oriented instead of forcing repeated returns to the homepage

## Reader-Focused UX Patterns

### Homepage action design

- The homepage exposes resume, email, and social actions as controlled reveals rather than dumping every option on screen at once.
- Resume and project cards use paired actions:
  `View First` for reading in-browser, and `Download Print-Friendly (B&W PDF)` for offline use.
- Copy-to-clipboard actions for email and social links reduce manual selection and copying.

### Long-page navigation convenience

- The resume page and both project detail pages include floating action bars that appear after the reader scrolls away from the opening section.
- Those floating actions provide direct access to download and return navigation without requiring the reader to scroll all the way back.
- Floating controls are hidden when the bottom static action row is already visible, preventing duplicate controls from competing on screen.

### Resume interaction behavior

- The technical skills section uses a controlled one-open-at-a-time accordion by default to reduce vertical sprawl.
- `View all` and `Collapse all` controls are available for readers who want either a quick scan or a fully expanded review.
- A second collapse control appears at the bottom of the section so the reader does not need to scroll back up just to close content.

### Download and print behavior

- The resume and both project pages each include their own B&W download action at page level, not just from the homepage reveal state.
- Printable PDFs are generated with Chrome headless using `--no-pdf-header-footer` so browser-added date, file path, and title metadata are removed.
- The downloadable assets are intended to stay aligned with the reader-facing web copy.

## Stack

- SvelteKit 2
- Svelte 5
- Vite 7
- TypeScript
- `@sveltejs/adapter-static`
- Cloudflare Pages

## Project Structure

- `src/routes/+page.svelte`
  Landing page assembly for the interactive homepage.
- `src/routes/resume/+page.svelte`
  Web resume page with floating actions, controlled skills accordion, and download links.
- `src/routes/projects/remediation-script-development/+page.svelte`
  Case study page for the remediation script project.
- `src/routes/projects/migration-stabilization-framework/+page.svelte`
  Case study page for the migration stabilization framework.
- `src/lib/components/home/`
  Homepage sections for hero actions, selected work, and about content.
- `scripts/resume-bw.html`
  Print source for the B&W resume PDF.
- `scripts/resume-color.html`
  Print source for the color resume PDF.
- `scripts/remediation-bw.html`
  Print source for the remediation project PDF.
- `scripts/portfolio-description-bw.html`
  Print source for the migration project PDF.
- `scripts/generate-resume-pdfs.sh`
  Regenerates `static/resume-bw.pdf` and `static/resume-color.pdf`.
- `scripts/generate-project-pdfs.sh`
  Regenerates the project B&W PDFs in `static/appprojects/`.
- `static/`
  Public assets including generated PDFs, text exports, `robots.txt`, and `sitemap.xml`.

## Local Development

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Run Svelte and TypeScript checks:

```bash
npm run check
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## PDF Generation

Regenerate the printable resume PDFs:

```bash
npm run generate:resume-pdfs
```

Regenerate the printable project PDFs:

```bash
npm run generate:project-pdfs
```

Important:

- The downloadable PDFs are static assets in `static/`.
- They do not update automatically when the Svelte route copy changes.
- If resume or project wording changes, update the corresponding print HTML in `scripts/` and regenerate the PDFs.

## Suggested Validation Workflow

For UI or content changes affecting reader experience:

1. Run `npm run build`.
2. Run `npm run preview`.
3. Verify the served preview, not just source files.
4. If any printable content changed, regenerate the PDFs and verify the downloads.
5. Check that floating action bars do not overlap with bottom page actions.
6. Check that homepage reveal flows still open and close cleanly.

## Node Version

The repository currently declares:

- `.nvmrc`: `22`
- `package.json` engines: `node >=22.12.0`

This aligns with the current Cloudflare Pages build target for the deployed site.

Local validation was also completed successfully on Node `24.14.1` on April 15, 2026:

- `npm ci`
- `npm run check`
- `npm run build`

If you want local development to match Cloudflare as closely as possible, use Node 22. If you want a newer machine-wide default, Node 24 LTS also works with the current codebase based on the checks above.

## Deployment

This project is deployed via Cloudflare Pages with these current settings:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `build`
- Root directory: `/`
- Build system version: `3`

The app uses `@sveltejs/adapter-static` and `prerender = true`, so deployment is based on generated static files rather than a Node server runtime.

## Notes

- The site uses explicit CSP settings in `svelte.config.js`.
- Styling is primarily hand-authored CSS rather than utility-first Tailwind markup, even though Tailwind is present in the toolchain.
- UX changes should preserve the reader-first navigation patterns already in place unless there is a clear reason to replace them.
