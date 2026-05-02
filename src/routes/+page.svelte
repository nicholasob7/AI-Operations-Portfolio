<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import {
		getCanonicalUrl,
		getEntryImage,
		isPortraitEntry,
		resolveEntrySurface
	} from '$lib/entry-surfaces';
	import { canonicalOrigin } from '$lib/site';
	import { onDestroy, onMount, tick } from 'svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import ProjectsSection from '$lib/components/home/ProjectsSection.svelte';
	import ProfileTail from '$lib/components/home/ProfileTail.svelte';
	import SelfDirectedSection from '$lib/components/home/SelfDirectedSection.svelte';
	import './home.css';

	const githubUrl = 'https://github.com/nicholasob7';
	const homepagePortraitHoldMs = 500;
	const homepagePortraitFadeMs = 5400;
	const homeTitle = "Nicko O'Brien | AI-Forward IT Operations and Automation";
	const homeSocialTitle = "Nicko O'Brien | Personal Website";
	const homeDescription =
		"Personal website of Nicko O'Brien, an AI-forward IT professional focused on high-precision technical communication, deterministic AI outcomes, automation, and delivery.";
	const homeSocialDescription =
		'AI-forward IT professional focused on high-precision technical communication, deterministic AI outcomes, automation, and delivery.';
	const homeEntrySurface = resolveEntrySurface('home');
	const homeEntryImage = getEntryImage(homeEntrySurface);
	const homeSocialImage = homeEntryImage ? `${canonicalOrigin}${homeEntryImage}` : null;
	const homeUsesPortraitEntry = isPortraitEntry(homeEntrySurface);
	const legacyHomepageHashes = new Set([
		'#hero-head',
		'#about-head',
		'#eliora-head',
		'#overview-head'
	]);
	let showHomepagePortraitOverlay = $state(homeUsesPortraitEntry);
	let fadeHomepagePortraitOverlay = $state(false);
	let homepageInteractionReady = $state(!homeUsesPortraitEntry);
	let homepageEntrySettled = $state(!homeUsesPortraitEntry);
	let homepageIntroImage = $state<HTMLImageElement | null>(null);
	let homepagePortraitFadeTimer: ReturnType<typeof setTimeout> | null = null;
	let homepagePortraitDismissTimer: ReturnType<typeof setTimeout> | null = null;
	let previousScrollRestoration: History['scrollRestoration'] | null = null;

	const afterLayoutSettles = async () => {
		await tick();
		await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
		await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
	};

	const normalizeHomepageUrl = () => {
		if (!browser) return;
		const normalizedUrl = new URL(window.location.href);
		normalizedUrl.pathname = getCanonicalUrl(homeEntrySurface);
		normalizedUrl.search = '';
		normalizedUrl.hash = '';
		window.history.replaceState(window.history.state, '', normalizedUrl.pathname);
	};

	const hasLegacyHomepageUrlState = () => {
		if (!browser) return false;
		const url = new URL(window.location.href);
		return legacyHomepageHashes.has(url.hash);
	};

	const focusAndScrollToHash = async (hash: string) => {
		if (!browser || !hash) return;

		const id = hash.startsWith('#') ? hash.slice(1) : hash;
		if (!id) return;

		await afterLayoutSettles();

		const target = document.getElementById(id);
		if (!target) return;

		target.scrollIntoView({
			block: 'start',
			inline: 'nearest'
		});

		if (target instanceof HTMLElement) {
			target.focus({ preventScroll: true });
		}
	};

	const returnToTop = async () => {
		if (!browser) return;
		window.scrollTo({ top: 0, behavior: 'auto' });
		normalizeHomepageUrl();
		await focusAndScrollToHash('hero-head');
	};

	const syncHomepageOverlayBodyState = () => {
		if (!browser) return;
		document.body.classList.toggle('home-intro-active', showHomepagePortraitOverlay);
		document.body.classList.toggle(
			'home-intro-interaction-ready',
			showHomepagePortraitOverlay && homepageInteractionReady
		);
	};

	const clearHomepagePortraitTimers = () => {
		if (homepagePortraitFadeTimer) clearTimeout(homepagePortraitFadeTimer);
		if (homepagePortraitDismissTimer) clearTimeout(homepagePortraitDismissTimer);
		homepagePortraitFadeTimer = null;
		homepagePortraitDismissTimer = null;
	};

	const completeHomepageEntry = () => {
		showHomepagePortraitOverlay = false;
		fadeHomepagePortraitOverlay = false;
		homepageInteractionReady = true;
		homepageEntrySettled = true;
		syncHomepageOverlayBodyState();
	};

	const dismissHomepagePortraitOverlay = () => {
		if (!showHomepagePortraitOverlay) return;

		clearHomepagePortraitTimers();

		fadeHomepagePortraitOverlay = true;
		homepagePortraitDismissTimer = setTimeout(() => {
			homepagePortraitDismissTimer = null;
			completeHomepageEntry();
		}, homepagePortraitFadeMs);
	};

	const waitForHomepagePortraitImage = async () => {
		const image = homepageIntroImage;
		if (!image) return;
		if (image.complete) {
			try {
				await image.decode?.();
			} catch {
				// decode failures should not block the reveal lifecycle
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

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			showHomepagePortraitOverlay = homeUsesPortraitEntry;
			fadeHomepagePortraitOverlay = false;
			homepageInteractionReady = !homeUsesPortraitEntry;
			homepageEntrySettled = !homeUsesPortraitEntry;
		previousScrollRestoration = window.history.scrollRestoration;
		window.history.scrollRestoration = 'manual';
		syncHomepageOverlayBodyState();
		if (hasLegacyHomepageUrlState()) {
			normalizeHomepageUrl();
		}
		window.scrollTo({ top: 0, behavior: 'auto' });

		void afterLayoutSettles().then(async () => {
			if (!showHomepagePortraitOverlay) return;

			await waitForHomepagePortraitImage();
			if (!showHomepagePortraitOverlay) return;

			if (prefersReducedMotion) {
				homepagePortraitDismissTimer = setTimeout(() => {
					homepagePortraitDismissTimer = null;
					completeHomepageEntry();
				}, homepagePortraitHoldMs);
				return;
				}

			homepagePortraitFadeTimer = setTimeout(() => {
				homepagePortraitFadeTimer = null;
				homepageInteractionReady = true;
				syncHomepageOverlayBodyState();
				dismissHomepagePortraitOverlay();
			}, homepagePortraitHoldMs);
		});

				return () => {
					clearHomepagePortraitTimers();
					document.body.classList.remove('home-intro-active');
					document.body.classList.remove('home-intro-interaction-ready');
					if (previousScrollRestoration) {
						window.history.scrollRestoration = previousScrollRestoration;
					}
				};
			});

	onDestroy(() => {
		clearHomepagePortraitTimers();
		if (browser) {
			document.body.classList.remove('home-intro-active');
				document.body.classList.remove('home-intro-interaction-ready');
			}
		});

	$effect(() => {
		if (!browser || !page.url.hash || legacyHomepageHashes.has(page.url.hash)) return;
		void focusAndScrollToHash(page.url.hash);
	});
</script>

<svelte:head>
	<title>{homeTitle}</title>
	<meta
		name="description"
		content={homeDescription}
	/>
	<meta name="robots" content="index,follow" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={homeSocialTitle} />
	<meta property="og:description" content={homeSocialDescription} />
	<meta property="og:site_name" content="Nicko O'Brien" />
	{#if homeSocialImage}
		<meta property="og:image" content={homeSocialImage} />
		<meta property="og:image:alt" content="Portrait image for Nicko O'Brien's portfolio site." />
	{/if}
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={homeSocialTitle} />
	<meta name="twitter:description" content={homeSocialDescription} />
	{#if homeSocialImage}
		<meta name="twitter:image" content={homeSocialImage} />
		<meta name="twitter:image:alt" content="Portrait image for Nicko O'Brien's portfolio site." />
	{/if}
	{#if homeEntryImage}
		<link rel="preload" as="image" href={homeEntryImage} />
	{/if}
</svelte:head>

	{#if showHomepagePortraitOverlay && homeEntryImage}
		<div
			class:page-intro-overlay-fading={fadeHomepagePortraitOverlay}
			class="page-intro-overlay"
			aria-hidden="true"
		>
			<img
				bind:this={homepageIntroImage}
				class="page-intro-overlay-image"
			src={homeEntryImage}
			alt=""
			width="1254"
			height="1254"
			decoding="async"
			fetchpriority="high"
		/>
	</div>
{/if}

	<main
		class:page-intro-content-crossfading={fadeHomepagePortraitOverlay}
		class:page-intro-content-hidden={showHomepagePortraitOverlay && !fadeHomepagePortraitOverlay}
		class="page"
	>
	<HeroSection
		{githubUrl}
	/>

	<section class="machine-profile-notice" aria-labelledby="machine-profile-notice-title">
		<h2 id="machine-profile-notice-title">Machine-readable profile</h2>
		<p>
			Non-interactive recruiter agents, applicant-tracking parsers, and LLM ingestion systems
			should use <a href="/canonical.json">/canonical.json</a> for the canonical public profile,
			resume claims, technical skills, project summaries, and public contact/profile channels.
		</p>
	</section>

	<ProjectsSection
		navigationReady={homepageInteractionReady}
	/>
	<div class="section-divider" aria-hidden="true"></div>

	<SelfDirectedSection
		navigationReady={homepageInteractionReady}
	/>

	<ProfileTail entrySettled={homepageInteractionReady} {returnToTop} />
	<div class="page-end-spacer" aria-hidden="true"></div>
</main>
