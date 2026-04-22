export const canonicalOrigin = 'https://nicko.obrienai.com';

export const sitemapRoutes = [
	'/',
	'/resume',
	'/projects/remediation-script-development',
	'/projects/migration-stabilization-framework'
] as const;

export function toCanonicalUrl(pathname: string): string {
	const normalizedPath =
		pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`;

	return new URL(normalizedPath, canonicalOrigin).toString();
}
