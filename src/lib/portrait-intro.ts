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
