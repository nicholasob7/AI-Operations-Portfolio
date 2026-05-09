import {
	getHumanVisibleResumeProjections,
	getMachineVisibleResumeProjections
} from '$lib/content/resume-projections';

export const canonicalOrigin = 'https://nicko.obrienai.com';

export const sitemapRoutes = [
	'/',
	'/resume',
	'/canonical.json',
	'/projects/eliora',
	'/projects/website-build-notes',
	'/projects/remediation-script-development',
	'/projects/migration-stabilization-framework',
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
