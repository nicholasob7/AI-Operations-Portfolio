<script module lang="ts">
	export type PortraitIntroState = {
		visible: boolean;
		fading: boolean;
		interactionReady: boolean;
		settled: boolean;
		booting: boolean;
	};
</script>

<script lang="ts">
	import { onMount, tick } from 'svelte';
	import {
		consumePortraitIntroHandoff,
		portraitIntroEase,
		portraitIntroFadeDuration,
		portraitIntroFadeMs,
		portraitIntroHoldMs,
		registerAutomaticPortraitIntroMount,
		subscribePortraitIntroReplay,
		type PortraitIntroHandoff
	} from '$lib/portrait-intro';

	type Props = {
		src: string | null;
		alt?: string;
		enabled?: boolean;
		pathname?: string | null;
		onStateChange?: (state: PortraitIntroState) => void;
	};

	let { src, alt = '', enabled = true, pathname = null, onStateChange }: Props = $props();

	let activeSrc = $state<string | null>(null);
	let activeAlt = $state('');
	let visible = $state(false);
	let fading = $state(false);
	let interactionReady = $state(true);
	let settled = $state(true);
	let booting = $state(false);
	let introImage = $state<HTMLImageElement | null>(null);
	let overlayInstance = $state(0);
	let holdTimer: ReturnType<typeof setTimeout> | null = null;
	let dismissTimer: ReturnType<typeof setTimeout> | null = null;
	let introRunId = 0;

	const currentState = (): PortraitIntroState => ({
		visible,
		fading,
		interactionReady,
		settled,
		booting
	});

	const emitState = () => {
		onStateChange?.(currentState());
	};

	const syncBodyState = () => {
		if (typeof document === 'undefined') return;
		document.body.classList.toggle('portrait-intro-active', visible);
		document.body.classList.toggle(
			'portrait-intro-interaction-ready',
			visible && interactionReady
		);
	};

	const clearTimers = () => {
		if (holdTimer) clearTimeout(holdTimer);
		if (dismissTimer) clearTimeout(dismissTimer);
		holdTimer = null;
		dismissTimer = null;
	};

	const completeIntro = () => {
		visible = false;
		fading = false;
		interactionReady = true;
		settled = true;
		booting = false;
		syncBodyState();
		emitState();
	};

	const waitForImage = async () => {
		const image = introImage;
		if (!image) return;
		if (image.complete) {
			try {
				await image.decode?.();
			} catch {
				// Decode failures should not block the reveal lifecycle.
			}
			return;
		}

		await new Promise<void>((resolve) => {
			const handleReady = () => {
				image.removeEventListener('load', handleReady);
				image.removeEventListener('error', handleReady);
				resolve();
			};

			image.addEventListener('load', handleReady, { once: true });
			image.addEventListener('error', handleReady, { once: true });
		});
	};

	const afterLayoutSettles = async () => {
		await tick();
		await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
		await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
	};

	const startFade = () => {
		interactionReady = true;
		booting = false;
		fading = true;
		syncBodyState();
		emitState();

		dismissTimer = setTimeout(() => {
			dismissTimer = null;
			completeIntro();
		}, portraitIntroFadeMs);
	};

	const runIntro = (handoff: PortraitIntroHandoff | null = null, automaticShouldRun = enabled) => {
		const nextSrc = handoff?.src ?? src;
		const nextAlt = handoff?.alt ?? alt;
		const shouldRun = Boolean(handoff?.src || (automaticShouldRun && nextSrc));
		const runId = ++introRunId;

		clearTimers();
		if (shouldRun) {
			overlayInstance += 1;
		}
		activeSrc = nextSrc;
		activeAlt = nextAlt;
		visible = shouldRun;
		fading = false;
		interactionReady = !shouldRun;
		settled = !shouldRun;
		booting = shouldRun;
		syncBodyState();
		emitState();

		if (!shouldRun) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		void afterLayoutSettles().then(async () => {
			if (!visible || runId !== introRunId) return;

			await waitForImage();
			if (!visible || runId !== introRunId) return;

			if (prefersReducedMotion) {
				dismissTimer = setTimeout(() => {
					if (runId !== introRunId) return;
					dismissTimer = null;
					completeIntro();
				}, portraitIntroHoldMs);
				return;
			}

			holdTimer = setTimeout(() => {
				if (runId !== introRunId) return;
				holdTimer = null;
				startFade();
			}, portraitIntroHoldMs);
		});
	};

	onMount(() => {
		const handoff = consumePortraitIntroHandoff();
		const unsubscribeReplay = subscribePortraitIntroReplay((replayHandoff) => {
			runIntro(replayHandoff);
		});
		const automaticShouldRun = handoff?.src
			? true
			: enabled && registerAutomaticPortraitIntroMount(pathname);
		runIntro(handoff, automaticShouldRun);

		return () => {
			unsubscribeReplay();
			clearTimers();
			if (typeof document !== 'undefined') {
				document.body.classList.remove('portrait-intro-active');
				document.body.classList.remove('portrait-intro-interaction-ready');
			}
		};
	});
</script>

{#if visible && activeSrc}
	{#key overlayInstance}
		<div
			class:portrait-intro-overlay-fading={fading}
			class="portrait-intro-overlay"
			style:--portrait-intro-ease={portraitIntroEase}
			style:--portrait-intro-fade-duration={portraitIntroFadeDuration}
			aria-hidden="true"
		>
			<img
				bind:this={introImage}
				class="portrait-intro-overlay-image"
				src={activeSrc}
				alt={activeAlt}
				width="1254"
				height="1254"
				decoding="async"
				fetchpriority="high"
			/>
		</div>
	{/key}
{/if}

<style>
	:global(body.portrait-intro-active) {
		overflow-x: hidden;
		overflow-y: scroll;
	}

	:global(body.portrait-intro-active.portrait-intro-interaction-ready) {
		overflow-x: hidden;
		overflow-y: scroll;
	}

	.portrait-intro-overlay {
		position: fixed;
		inset: 0;
		z-index: 200;
		overflow: hidden;
		display: grid;
		place-items: center;
		pointer-events: none;
		opacity: 1;
		transform: translateY(0) scale(1);
		transition:
			opacity var(--portrait-intro-fade-duration) var(--portrait-intro-ease),
			transform var(--portrait-intro-fade-duration) var(--portrait-intro-ease);
		background:
			radial-gradient(circle at 50% 18%, rgba(56, 93, 156, 0.36) 0%, rgba(8, 13, 24, 0) 44%),
			linear-gradient(180deg, #050912 0%, #0b1326 100%);
	}

	.portrait-intro-overlay::after {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(180deg, rgba(8, 12, 22, 0.04) 0%, rgba(8, 12, 22, 0.22) 100%),
			linear-gradient(
				90deg,
				rgba(8, 12, 22, 0.32) 0%,
				rgba(8, 12, 22, 0.08) 18%,
				rgba(8, 12, 22, 0.08) 82%,
				rgba(8, 12, 22, 0.32) 100%
			);
	}

	.portrait-intro-overlay-fading {
		opacity: 0;
		transform: scale(1.006);
	}

	.portrait-intro-overlay-image {
		position: relative;
		z-index: 1;
		display: block;
		width: min(100vw, 100vh);
		height: min(100vw, 100vh);
		max-width: 100vw;
		max-height: 100vh;
		object-fit: contain;
		object-position: center center;
	}

	@media (prefers-reduced-motion: reduce) {
		.portrait-intro-overlay {
			transition: none;
		}

		.portrait-intro-overlay-fading {
			transform: none;
		}
	}
</style>
