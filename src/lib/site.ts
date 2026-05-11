import {
	getHumanVisibleResumeProjections,
	getMachineVisibleResumeProjections
} from '$lib/content/resume-projections';

export const canonicalOrigin = 'https://nicko.obrienai.com';

export const sitemapRoutes = [
	'/',
	'/highlights',
	'/resume',
	'/canonical.json',
	'/highlights/ai-governance',
	'/highlights/website-publication',
	'/highlights/endpoint-remediation',
	'/highlights/package-redesign',
	...getHumanVisibleResumeProjections().map((projection) => projection.htmlPath)
] as const;

export const sitemapArtifactRoutes = getMachineVisibleResumeProjections().map(
	(projection) => projection.pdfPath
);

export function toCanonicalUrl(pathname: string): string {
	const normalizedPath =
		pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`;

	return new URL(normalizedPath, canonicalOrigin).toString();
}
