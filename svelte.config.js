import adapter from '@sveltejs/adapter-static';
import { relative, sep } from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// defaults to rune mode for the project, execept for `node_modules`. Can be removed in svelte 6.
		runes: ({ filename }) => {
			const relativePath = relative(import.meta.dirname, filename);
			const pathSegments = relativePath.toLowerCase().split(sep);
			const isExternalLibrary = pathSegments.includes('node_modules');

			return isExternalLibrary ? undefined : true;
		}
	},
	kit: {
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'base-uri': ['self'],
				'object-src': ['none'],
				'script-src': ['self', 'https://static.cloudflareinsights.com'],
				'script-src-attr': ['none'],
				// Known CSP warning: SvelteKit generates #svelte-announcer with an inline
				// style attribute at runtime. The site also hides #svelte-announcer in
				// src/routes/+layout.svelte, so the blocked generated style does not break
				// page rendering or navigation announcements. Do not add
				// style-src-attr 'unsafe-inline' unless future requirements deliberately
				// accept inline style attributes across the site.
				'style-src': ['self'],
				'font-src': ['self', 'data:'],
				'img-src': ['self', 'data:', 'blob:'],
				'connect-src': ['self'],
				'form-action': ['self'],
				'upgrade-insecure-requests': true
			}
		}
	}
};

export default config;
