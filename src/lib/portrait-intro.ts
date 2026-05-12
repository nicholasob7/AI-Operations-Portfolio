export const portraitIntroHoldMs = 900;
export const portraitIntroFadeMs = 2400;
export const portraitIntroEase = 'cubic-bezier(0.42, 0, 0.22, 1)';
export const portraitIntroFadeDuration = `${portraitIntroFadeMs}ms`;

export type PortraitIntroHandoff = {
	src: string | null;
	alt?: string;
};

let pendingPortraitIntroHandoff: PortraitIntroHandoff | null = null;
const portraitIntroReplayListeners = new Set<(handoff: PortraitIntroHandoff | null) => void>();
let currentPortraitRouteArea: 'resume' | 'other' | null = null;

const normalizePathname = (pathname: string) => {
	if (!pathname) return '/';
	const normalized = pathname.replace(/\/+$/g, '');
	return normalized === '' ? '/' : normalized;
};

export const isResumeAreaPath = (pathname: string): boolean => {
	const normalized = normalizePathname(pathname);
	return (
		normalized === '/resumes' ||
		normalized === '/resumes/it-support' ||
		normalized === '/resumes/technical-operations' ||
		normalized === '/resumes/ai-process'
	);
};

const getPortraitRouteArea = (pathname: string | null | undefined) => {
	if (!pathname) return null;
	return isResumeAreaPath(pathname) ? 'resume' : 'other';
};

export const willAutoRunPortraitIntro = (pathname: string | null | undefined) => {
	const nextArea = getPortraitRouteArea(pathname);
	if (nextArea === 'resume') {
		return currentPortraitRouteArea !== 'resume';
	}

	return true;
};

export const registerAutomaticPortraitIntroMount = (pathname: string | null | undefined) => {
	const nextArea = getPortraitRouteArea(pathname);
	const shouldRun = nextArea === 'resume' ? currentPortraitRouteArea !== 'resume' : true;

	if (nextArea) {
		currentPortraitRouteArea = nextArea;
	}

	return shouldRun;
};

export const setPortraitIntroHandoff = (handoff: PortraitIntroHandoff) => {
	pendingPortraitIntroHandoff = handoff.src ? handoff : null;
};

export const consumePortraitIntroHandoff = () => {
	const handoff = pendingPortraitIntroHandoff;
	pendingPortraitIntroHandoff = null;
	return handoff;
};

export const requestPortraitIntroReplay = (handoff: PortraitIntroHandoff | null = null) => {
	for (const listener of portraitIntroReplayListeners) {
		listener(handoff);
	}
};

export const subscribePortraitIntroReplay = (
	listener: (handoff: PortraitIntroHandoff | null) => void
) => {
	portraitIntroReplayListeners.add(listener);
	return () => {
		portraitIntroReplayListeners.delete(listener);
	};
};
