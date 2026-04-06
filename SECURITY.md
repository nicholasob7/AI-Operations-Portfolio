# Security Policy

## Scope

This repository is a public portfolio site. Please report security issues that could expose visitors, deployment credentials, private assets, or the integrity of the site.

## How To Report

Please do not open a public issue for a suspected vulnerability.

Report by contacting the repository owner privately through GitHub.

Include:

- a short description of the issue
- affected path or feature
- reproduction steps
- impact
- any suggested fix

## What To Expect

- acknowledgement as soon as practical
- confirmation after the report is reproduced
- a fix or mitigation when the issue is valid

## Deployment Notes

This repository is intentionally host-neutral. Production-only controls that depend on HTTP response headers or CDN settings should be applied at the hosting layer for the chosen platform.

The current repo-level baseline is:

- SvelteKit-managed CSP for prerendered static output
- pinned `cookie` dependency override in `package.json`
- static public assets only

## Later Cloudflare Requirements

When this site is deployed to Cloudflare Pages, apply the following at the Cloudflare layer:

- serve the production site on a custom domain over HTTPS
- enable Always Use HTTPS
- enable HSTS only after the final domain setup is stable and all intended subdomains are HTTPS-safe
- add security headers through Cloudflare Pages custom headers (`_headers`) or the equivalent Pages header configuration

Recommended host-applied headers:

- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`

Recommended host-applied indexing rules:

- apply `X-Robots-Tag: noindex, noarchive` to preview domains and any non-canonical deployment URLs

## CSP Boundary

The site currently manages its main CSP in SvelteKit so that script hashes are generated automatically during build.

Do not add a second host-managed `Content-Security-Policy` later unless that policy is being intentionally coordinated with or replacing the SvelteKit-managed policy. Two separate CSP sources increase drift risk and can produce unexpectedly stricter combined behavior.

If a later deployment requires header-only protections that a prerendered meta CSP cannot enforce, prefer applying those as dedicated host headers first, especially:

- `X-Frame-Options: DENY`
- HSTS

If a future deployment chooses to move CSP fully to the host layer, remove or redesign the repo-managed CSP at the same time rather than running two independent policies in parallel.
