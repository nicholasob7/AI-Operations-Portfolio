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
	resumeItSupport: {
		path: '/resume/it-support',
		mode: 'portrait',
		image: '/images/resume-portrait.jpg',
		canonicalUrl: '/resume/it-support'
	},
	resumeTechnicalOperations: {
		path: '/resume/technical-operations',
		mode: 'portrait',
		image: '/images/resume-portrait.jpg',
		canonicalUrl: '/resume/technical-operations'
	},
	resumeAiProcess: {
		path: '/resume/ai-process',
		mode: 'portrait',
		image: '/images/resume-portrait.jpg',
		canonicalUrl: '/resume/ai-process'
	},
	remediationProject: {
		path: '/highlights/endpoint-remediation',
		mode: 'portrait',
		image: '/images/spring-snow.jpg',
		canonicalUrl: '/highlights/endpoint-remediation'
	},
	migrationProject: {
		path: '/highlights/package-redesign',
		mode: 'portrait',
		image: '/images/sun-snow-mountain.jpg',
		canonicalUrl: '/highlights/package-redesign'
	},
	elioraProject: {
		path: '/highlights/eliora',
		mode: 'portrait',
		image: '/images/mountain-square.jpg',
		canonicalUrl: '/highlights/eliora'
	},
	websiteBuildNotesProject: {
		path: '/highlights/website-build-notes',
		mode: 'portrait',
		image: '/images/StClair-Sunrise.jpg',
		canonicalUrl: '/highlights/website-build-notes'
	}
} as const satisfies Record<string, PathSurface>;

export type EntrySurfaceKey = keyof typeof entrySurfaces;
export type EntrySurface = (typeof entrySurfaces)[EntrySurfaceKey];

export const resolveEntrySurface = <T extends EntrySurfaceKey>(key: T) => entrySurfaces[key];

export const isPortraitEntry = (surface: EntrySurface) => surface.mode === 'portrait' && !!surface.image;

export const getEntryImage = (surface: EntrySurface) =>
	'image' in surface ? surface.image ?? null : null;

export const getCanonicalUrl = (surface: EntrySurface) => surface.canonicalUrl;
