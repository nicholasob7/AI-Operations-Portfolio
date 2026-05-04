export type EntryMode = 'portrait' | 'none';

type PathSurface = {
	path: string;
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
	remediationProject: {
		path: '/projects/remediation-script-development',
		mode: 'portrait',
		image: '/images/spring-snow.jpg',
		canonicalUrl: '/projects/remediation-script-development'
	},
	migrationProject: {
		path: '/projects/migration-stabilization-framework',
		mode: 'portrait',
		image: '/images/sun-snow-mountain.jpg',
		canonicalUrl: '/projects/migration-stabilization-framework'
	},
	elioraProject: {
		path: '/projects/eliora',
		mode: 'portrait',
		image: '/images/mountain-square.jpg',
		canonicalUrl: '/projects/eliora'
	},
	websiteBuildNotesProject: {
		path: '/projects/website-build-notes',
		mode: 'portrait',
		image: '/images/StClair-Sunrise.jpg',
		canonicalUrl: '/projects/website-build-notes'
	}
} as const satisfies Record<string, PathSurface>;

export type EntrySurfaceKey = keyof typeof entrySurfaces;
export type EntrySurface = (typeof entrySurfaces)[EntrySurfaceKey];

export const resolveEntrySurface = <T extends EntrySurfaceKey>(key: T) => entrySurfaces[key];

export const isPortraitEntry = (surface: EntrySurface) => surface.mode === 'portrait' && !!surface.image;

export const getEntryImage = (surface: EntrySurface) =>
	'image' in surface ? surface.image ?? null : null;

export const getCanonicalUrl = (surface: EntrySurface) => surface.canonicalUrl;
