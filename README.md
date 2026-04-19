# AI Operations Portfolio

Static SvelteKit portfolio site for Nicko O'Brien, focused on AI-forward IT operations, technical communication, automation, and selected project work.

The site is deployed on Cloudflare Pages and built as a fully prerendered static site.

## Stack

- SvelteKit 2
- Svelte 5
- Vite 7
- TypeScript
- `@sveltejs/adapter-static`
- Cloudflare Pages

## Project Structure

- `src/routes/+page.svelte`
  Main landing page with interactive panels for resume, email, social links, and project detail reveals.
- `src/routes/resume/+page.svelte`
  Web resume page.
- `src/routes/projects/remediation-script-development/+page.svelte`
  Case study page for remediation script development.
- `src/routes/projects/migration-stabilization-framework/+page.svelte`
  Case study page for the migration stabilization framework.
- `src/lib/components/home/`
  Home page sections split into focused Svelte components.
- `static/`
  Static assets including PDFs, text exports, `robots.txt`, and `sitemap.xml`.
- `scripts/`
  Helper HTML/CSS files used for resume and portfolio document generation.

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

Regenerate the printable B&W PDFs for the project pages:

```bash
npm run generate:project-pdfs
```

Regenerate the printable resume PDFs:

```bash
npm run generate:resume-pdfs
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

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
- PDFs in `static/` are downloadable public assets and should be kept in sync with any content changes made to the corresponding pages.
