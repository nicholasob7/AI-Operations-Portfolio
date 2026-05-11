# AI Operations Portfolio

Static SvelteKit public career-data, publication, and rendering surface for Nicko O'Brien, focused on AI-forward IT operations, technical communication, automation, resume projections, and selected project work.

The website is a simple publication and rendering machine: it serves structured canonical data, human-readable routes, and document artifacts. It is built as a fully prerendered static site with `@sveltejs/adapter-static`.

## Project Purpose

This repository is the deployed public website and publication surface for structured professional material. It renders first-class consumer artifacts from structured source data and approved publication assets.

The site presents canonical career data, stated skills, employment history, professional confidence areas, evidence/project nodes, reviewed resume projections, static resume PDFs, project artifacts, and discovery files for human and machine consumers.

Future job-description-to-resume generation belongs to the private repo/API engine. This public website remains the user-owned publication and rendering surface for approved career-data and resume artifacts.

## Canonical Surface

The canonical JSON surface is the structured public representation of the user's stated professional claims, evidence framing, and publication choices.

It describes stated skills, experiences, professional confidence areas, projects, evidence nodes, resume projections, publication artifacts, routes, and discovery metadata. It gives machine consumers a stable structured entry point into the same public professional material that the human routes and document artifacts present.

## First-Class Consumer Surfaces

The site is organized around three first-class consumer surfaces: machine/AI, human reader, and PDF/document.

### Machine / AI

Machine-readable surfaces are built for machine ingestion and machine interaction. This broad consumer class includes AI assistants, parsing systems, generation systems, recruiter systems, ATS systems, search systems, and future machine consumers.

Primary machine/discovery surfaces:

- `/canonical.json`
- `/llms.txt`
- `/sitemap.xml`
- `/robots.txt`

### Human Reader

Human-readable routes are built for human ingestion. This broad consumer class includes the site owner, recruiters, hiring managers, collaborators, students, reviewers, and other readers.

Primary human surfaces:

- `/`
- `/resume`
- `/resume/it-support`
- `/resume/technical-operations`
- `/resume/ai-process`
- project/evidence routes

### PDF / Document

PDF and document artifacts are formal publication surfaces. This broad consumer class covers recruiter workflows, application workflows, compliance/reference workflows, offline review, archival use, and other document-consumer contexts.

Primary document artifacts:

- resume PDFs in `static/resumes/`
- project PDFs in `static/appprojects/`

## Current Public Surfaces

Machine/discovery routes:

- `/canonical.json`
- `/llms.txt`
- `/sitemap.xml`
- `/robots.txt`

Resume routes:

- `/resume`
- `/resume/it-support`
- `/resume/technical-operations`
- `/resume/ai-process`

Resume publication artifacts:

- `static/resumes/Nicholas_OBrien_Resume_IT_Support.pdf`
- `static/resumes/Nicholas_OBrien_Resume_Technical_Operations.pdf`
- `static/resumes/Nicholas_OBrien_Resume_AI_Process.pdf`

Project/evidence routes:

- `/highlights/eliora`
- `/highlights/website-build-notes`
- `/highlights/remediation-script-development`
- `/highlights/migration-stabilization-framework`

## Stack

- SvelteKit 2
- Svelte 5
- Vite 7
- TypeScript
- `@sveltejs/adapter-static`

## Project Structure

Machine/discovery surface:

- `src/lib/canonical/build-canonical.ts`
  Builds the structured canonical JSON payload from public content modules.
- `src/routes/canonical.json/+server.ts`
  Serves the canonical JSON route.
- `src/lib/site.ts`
  Defines canonical origin, sitemap route inputs, and URL helpers.
- `src/routes/sitemap.xml/+server.ts`
  Serves the sitemap from route and artifact metadata.
- `static/llms.txt`
  Gives machine consumers the preferred discovery entry point.
- `static/robots.txt`
  Publishes crawl and sitemap discovery hints.

Human reader surface:

- `src/routes/+page.svelte`
  Landing page assembly for the interactive homepage.
- `src/routes/resume/+page.svelte`
  Resume projection index and artifact access route.
- `src/routes/resume/[projection]/+page.ts`
  Loads reviewed resume projection documents for static projection routes.
- `src/routes/resume/[projection]/+page.svelte`
  Renders individual resume projection routes.
- `src/lib/components/resume/ResumeDocumentView.svelte`
  Renders structured resume projection content for the public HTML surface.
- `src/routes/projects/*/+page.svelte`
  Human-readable project and evidence routes.

Structured public content:

- `src/lib/content/person-profile.ts`
  Public profile and link model assembled from approved public content.
- `src/lib/content/resume.ts`
  Public resume/profile content used by resume routes and reviewed projection documents.
- `src/lib/content/resume-projections.ts`
  Active resume projection registry and publication artifact paths.
- `src/lib/content/resume-documents.ts`
  Reviewed resume projection document structures consumed by the public renderer.
- `src/lib/content/evidence-nodes.ts`
  Public evidence nodes and disclosure framing.
- `src/lib/content/practice-areas.ts`
  Public practice/confidence area model.
- `src/lib/content/project-details.ts`
  Shared project detail content for project routes and project PDF artifacts.

PDF/document surface:

- `static/resumes/`
  Reviewed resume PDF publication artifacts.
- `static/appprojects/`
  Project PDF publication artifacts.
- `scripts/generate-project-pdfs.sh`
  Project PDF artifact workflow.
- `scripts/render-pdf-html.mjs`
  Project PDF HTML renderer.
- `scripts/pdf-render-lib.sh`
  Shared Chrome resolution and PDF writing helpers for project PDF artifacts.

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

## Publication Artifacts

Resume PDFs are reviewed static publication artifacts in `static/resumes/`:

- `static/resumes/Nicholas_OBrien_Resume_IT_Support.pdf`
- `static/resumes/Nicholas_OBrien_Resume_Technical_Operations.pdf`
- `static/resumes/Nicholas_OBrien_Resume_AI_Process.pdf`

Public resume routes render reviewed projection content and link to those document artifacts.

Project PDFs are separate publication artifacts in `static/appprojects/`. The project PDF workflow remains available for project document artifacts:

```bash
npm run generate:project-pdfs
```

The website renders first-class consumer artifacts from structured source data and approved publication assets.

## Validation Workflow

For changes affecting public surfaces:

1. Run `npm run check`.
2. Run `npm run build`.
3. Run `npm run preview`.
4. Preview human routes, including resume and project/evidence routes.
5. Verify machine/discovery surfaces: `/canonical.json`, `/llms.txt`, `/sitemap.xml`, and `/robots.txt`.
6. Verify publication artifact links for resume PDFs and project PDFs.
7. Verify hashes where artifact integrity matters.

## Node Version

The repository currently declares:

- `.nvmrc`: `22`
- `package.json` engines: `node >=22.12.0`

This is the repository-declared Node requirement.

Local validation was also completed successfully on Node `24.14.1` on April 15, 2026:

- `npm ci`
- `npm run check`
- `npm run build`

Use Node 22 for local development that matches the repository-declared requirement. The Node 24 result above is a historical validation note rather than a standing compatibility guarantee.

## Deployment

The repository is configured for static deployment with these build settings:

- Build command: `npm run build`
- Build output directory: `build`

The app uses `@sveltejs/adapter-static` and `prerender = true`, so deployment is based on generated static files rather than a Node server runtime.

## Notes

- The site uses explicit CSP settings in `svelte.config.js`.
- Styling is primarily hand-authored CSS rather than utility-first Tailwind markup. Tailwind remains in the toolchain through `src/routes/layout.css` for its imported base behavior.
- UX changes should preserve the reader-first navigation patterns already in place and document the reason for any replacement.
