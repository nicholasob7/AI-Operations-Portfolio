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
	endpointRemediation: {
		path: '/highlights/endpoint-remediation',
		mode: 'portrait',
		image: '/images/spring-snow.jpg',
		canonicalUrl: '/highlights/endpoint-remediation'
	},
	packageRedesign: {
		path: '/highlights/package-redesign',
		mode: 'portrait',
		image: '/images/sun-snow-mountain.jpg',
		canonicalUrl: '/highlights/package-redesign'
	},
	aiGovernance: {
		path: '/highlights/ai-governance',
		mode: 'portrait',
		image: '/images/mountain-square.jpg',
		canonicalUrl: '/highlights/ai-governance'
	},
	websitePublication: {
		path: '/highlights/website-publication',
		mode: 'portrait',
		image: '/images/StClair-Sunrise.jpg',
		canonicalUrl: '/highlights/website-publication'
	}
} as const satisfies Record<string, PathSurface>;

export type EntrySurfaceKey = keyof typeof entrySurfaces;
export type EntrySurface = (typeof entrySurfaces)[EntrySurfaceKey];

export const resolveEntrySurface = <T extends EntrySurfaceKey>(key: T) => entrySurfaces[key];

export const isPortraitEntry = (surface: EntrySurface) => surface.mode === 'portrait' && !!surface.image;

export const getEntryImage = (surface: EntrySurface) =>
	'image' in surface ? surface.image ?? null : null;

export const getCanonicalUrl = (surface: EntrySurface) => surface.canonicalUrl;
