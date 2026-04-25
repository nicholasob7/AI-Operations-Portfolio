export type EntryMode = 'portrait' | 'none';

type PathSurface = {
	path: string;
	mode: EntryMode;
	image?: string;
	canonicalUrl: string;
};

type ChildSurface = {
	parentPath: string;
	mode: EntryMode;
	image?: string;
	canonicalUrl: string;
};

export const entrySurfaces = {
	home: {
		path: '/',
		mode: 'portrait',
		image: '/images/homepage-portrait.jpg',
		canonicalUrl: '/'
	},
	resume: {
		path: '/resume',
		mode: 'portrait',
		image: '/images/resume-portrait.jpg',
		canonicalUrl: '/resume'
	},
	quality: {
		parentPath: '/',
		mode: 'none',
		canonicalUrl: '/'
	},
	aiGovernance: {
		parentPath: '/',
		mode: 'none',
		canonicalUrl: '/'
	},
	remediationProject: {
		path: '/projects/remediation-script-development',
		mode: 'none',
		canonicalUrl: '/projects/remediation-script-development'
	},
	migrationProject: {
		path: '/projects/migration-stabilization-framework',
		mode: 'none',
		canonicalUrl: '/projects/migration-stabilization-framework'
	}
} as const satisfies Record<string, PathSurface | ChildSurface>;

export type EntrySurfaceKey = keyof typeof entrySurfaces;
export type EntrySurface = (typeof entrySurfaces)[EntrySurfaceKey];

export const resolveEntrySurface = <T extends EntrySurfaceKey>(key: T) => entrySurfaces[key];

const hasPath = (surface: EntrySurface): surface is EntrySurface & PathSurface => 'path' in surface;
const hasParentPath = (surface: EntrySurface): surface is EntrySurface & ChildSurface =>
	'parentPath' in surface;

export const isPortraitEntry = (surface: EntrySurface) => surface.mode === 'portrait' && !!surface.image;

export const getEntryImage = (surface: EntrySurface) => surface.image ?? null;

export const getCanonicalUrl = (surface: EntrySurface) => surface.canonicalUrl;

export const shouldCollapseOnReload = (surface: EntrySurface) => hasParentPath(surface);

export const getSurfaceRoutePath = (surface: EntrySurface) => {
	if (hasPath(surface)) return surface.path;
	if (hasParentPath(surface)) return surface.parentPath;
	return surface.canonicalUrl;
};
