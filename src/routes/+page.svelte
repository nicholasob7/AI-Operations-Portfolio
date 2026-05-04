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
	import PortraitIntro, { type PortraitIntroState } from '$lib/components/PortraitIntro.svelte';
	import { requestPortraitIntroReplay } from '$lib/portrait-intro';
	import { onMount, tick } from 'svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import ProjectsSection from '$lib/components/home/ProjectsSection.svelte';
	import ProfileTail from '$lib/components/home/ProfileTail.svelte';
	import SelfDirectedSection from '$lib/components/home/SelfDirectedSection.svelte';
	import './home.css';

	const githubUrl = 'https://github.com/nicholasob7';
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
		requestPortraitIntroReplay({ src: homeEntryImage });
		window.scrollTo({ top: 0, behavior: 'auto' });
		normalizeHomepageUrl();
		await focusAndScrollToHash('hero-head');
	};

	const handleHomepagePortraitState = (state: PortraitIntroState) => {
		showHomepagePortraitOverlay = state.visible;
		fadeHomepagePortraitOverlay = state.fading;
		homepageInteractionReady = state.interactionReady;
		homepageEntrySettled = state.settled;
	};

	onMount(() => {
		previousScrollRestoration = window.history.scrollRestoration;
		window.history.scrollRestoration = 'manual';
		if (hasLegacyHomepageUrlState()) {
			normalizeHomepageUrl();
		}
		window.scrollTo({ top: 0, behavior: 'auto' });

				return () => {
					if (previousScrollRestoration) {
						window.history.scrollRestoration = previousScrollRestoration;
					}
				};
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

<PortraitIntro
	src={homeEntryImage}
	enabled={homeUsesPortraitEntry}
	onStateChange={handleHomepagePortraitState}
/>

	<main
		class:page-intro-content-crossfading={fadeHomepagePortraitOverlay}
		class:page-intro-content-hidden={showHomepagePortraitOverlay && !fadeHomepagePortraitOverlay}
		class="page"
	>
	<section class="machine-profile-notice" aria-label="Machine-readable profile pointer">
		<a href="/canonical.json" rel="alternate" type="application/json">Machine-readable profile: /canonical.json</a>
	</section>

	<HeroSection
		{githubUrl}
	/>

	<ProjectsSection
		navigationReady={homepageInteractionReady}
	/>
	<div class="section-divider" aria-hidden="true"></div>

	<SelfDirectedSection
		navigationReady={homepageInteractionReady}
	/>

	<ProfileTail entrySettled={homepageEntrySettled} {returnToTop} />
	<div class="page-end-spacer" aria-hidden="true"></div>
</main>
