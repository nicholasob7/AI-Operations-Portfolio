import { sitemapRoutes, toCanonicalUrl } from '$lib/site';

export const prerender = true;

export function GET() {
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes
		.map((route) => `  <url>\n    <loc>${toCanonicalUrl(route)}</loc>\n  </url>`)
		.join('\n')}\n</urlset>\n`;

	return new Response(body, {
		headers: {
			'content-type': 'application/xml; charset=utf-8'
		}
	});
}
