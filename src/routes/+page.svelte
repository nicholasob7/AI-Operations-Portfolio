<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import {
		getCanonicalUrl,
		getEntryImage,
		isPortraitEntry,
		resolveEntrySurface,
		shouldCollapseOnReload
	} from '$lib/entry-surfaces';
	import { onDestroy, onMount, tick } from 'svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import AboutSection from '$lib/components/home/AboutSection.svelte';
	import ProjectsSection from '$lib/components/home/ProjectsSection.svelte';
	import ProfileTail from '$lib/components/home/ProfileTail.svelte';
	import './home.css';

	const contactEmail = 'nicko.obrien.ai@gmail.com';
	const linkedInProfilePath = 'linkedin.com/in/nicholasfobrien/';
	const githubUrl = 'https://github.com/nicholasob7';
	const twitterProfilePath = 'x.com/nicho0101';
	const homepagePortraitHoldMs = 500;
	const homepagePortraitFadeMs = 5400;
	const homeEntrySurface = resolveEntrySurface('home');
	const qualityEntrySurface = resolveEntrySurface('quality');
	const aiGovernanceEntrySurface = resolveEntrySurface('aiGovernance');
	const homeEntryImage = getEntryImage(homeEntrySurface);
	const homeUsesPortraitEntry = isPortraitEntry(homeEntrySurface);
	const legacyHomepageHashes = new Set([
		'#hero-head',
		'#about-head',
		'#eliora-head',
		'#overview-head'
	]);
	let copiedTarget = $state<'email' | 'linkedin' | 'twitter' | null>(null);
	let showHomepagePortraitOverlay = $state(homeUsesPortraitEntry);
	let fadeHomepagePortraitOverlay = $state(false);
	let homepageInteractionReady = $state(!homeUsesPortraitEntry);
	let homepageEntrySettled = $state(!homeUsesPortraitEntry);
	let showPersonal = $state(false);
	let showPrecision = $state(false);
	let copyResetTimer: ReturnType<typeof setTimeout> | null = null;
	let homepagePortraitFadeTimer: ReturnType<typeof setTimeout> | null = null;
	let homepagePortraitDismissTimer: ReturnType<typeof setTimeout> | null = null;
	let previousScrollRestoration: History['scrollRestoration'] | null = null;
	const openPanel = $derived(browser ? (page.url.searchParams.get('open') ?? '') : '');
	const showResumeOptions = $derived(openPanel === 'resume');
	const showEmailOptions = $derived(openPanel === 'email');
	const showSocialOptions = $derived(openPanel === 'social');
	const openSocialOption = $derived(browser ? (page.url.searchParams.get('social') ?? '') : '');
	const showLinkedInSocialDetails = $derived(showSocialOptions && openSocialOption === 'linkedin');
	const showTwitterSocialDetails = $derived(showSocialOptions && openSocialOption === 'twitter');
	const showComplete = $derived(openPanel === 'case-1');
	const showActive = $derived(openPanel === 'case-2');

	const homepageHref = (hash: string, open?: string, social?: string) => {
		const url = new URL(page.url);
		url.pathname = '/';
		url.search = '';
		if (open) {
			url.searchParams.set('open', open);
			if (social) {
				url.searchParams.set('social', social);
			}
		}
		url.hash = `#${hash}`;
		return `${url.pathname}${url.search}${url.hash}`;
	};

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
		const open = url.searchParams.get('open');
		return open === 'precision' || open === 'overview' || legacyHomepageHashes.has(url.hash);
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

	const navigateHome = (hash: string, open?: string, social?: string) => {
		void goto(homepageHref(hash, open, social), {
			keepFocus: true,
			noScroll: true
		}).then(() => focusAndScrollToHash(hash));
	};

	const returnToTop = async () => {
		if (!browser) return;
		window.scrollTo({ top: 0, behavior: 'auto' });
		normalizeHomepageUrl();
		await focusAndScrollToHash('hero-head');
	};

	const resetCopiedTarget = () => {
		copiedTarget = null;
		if (copyResetTimer) clearTimeout(copyResetTimer);
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

	const copyText = async (value: string, target: 'email' | 'linkedin' | 'twitter') => {
		try {
			await navigator.clipboard.writeText(value);
			copiedTarget = target;
			if (copyResetTimer) clearTimeout(copyResetTimer);
			copyResetTimer = setTimeout(() => {
				copiedTarget = null;
			}, 1800);
		} catch {
			copiedTarget = null;
		}
	};

	const copyEmail = async () => {
		await copyText(contactEmail, 'email');
	};

	const copyLinkedInProfilePath = async () => {
		await copyText(linkedInProfilePath, 'linkedin');
	};

	const copyTwitterProfilePath = async () => {
		await copyText(twitterProfilePath, 'twitter');
	};

	const toggleEmailOptions = () => {
		if (!homepageEntrySettled) return;
		resetCopiedTarget();
		navigateHome('hero-head', showEmailOptions ? undefined : 'email');
	};

	const toggleResumeOptions = () => {
		if (!homepageEntrySettled) return;
		navigateHome('hero-head', showResumeOptions ? undefined : 'resume');
	};

	const toggleSocialOptions = () => {
		if (!homepageEntrySettled) return;
		resetCopiedTarget();
		navigateHome('hero-head', showSocialOptions ? undefined : 'social');
	};

	const toggleLinkedInSocialDetails = () => {
		if (!homepageEntrySettled) return;
		resetCopiedTarget();
		navigateHome('hero-head', 'social', showLinkedInSocialDetails ? undefined : 'linkedin');
	};

	const toggleTwitterSocialDetails = () => {
		if (!homepageEntrySettled) return;
		resetCopiedTarget();
		navigateHome('hero-head', 'social', showTwitterSocialDetails ? undefined : 'twitter');
	};

	const openPersonal = () => {
		if (!homepageEntrySettled) return;
		showPersonal = true;
		void focusAndScrollToHash('overview-head');
	};

	const closePersonal = () => {
		if (!homepageEntrySettled) return;
		showPersonal = false;
		window.history.replaceState(window.history.state, '', getCanonicalUrl(aiGovernanceEntrySurface));
		void focusAndScrollToHash('eliora-head');
	};

	const openPrecision = () => {
		if (!homepageEntrySettled) return;
		showPrecision = true;
		void focusAndScrollToHash('about-head');
	};

	const closePrecision = () => {
		if (!homepageEntrySettled) return;
		showPrecision = false;
		window.history.replaceState(window.history.state, '', getCanonicalUrl(qualityEntrySurface));
		void focusAndScrollToHash('about-head');
	};

	const openComplete = () => {
		if (!homepageEntrySettled) return;
		navigateHome('remediation-head', 'case-1');
	};

	const closeComplete = () => {
		if (!homepageEntrySettled) return;
		navigateHome('deployment-head');
	};

	const openActive = () => {
		if (!homepageEntrySettled) return;
		navigateHome('deployment-head', 'case-2');
	};

	const closeActive = () => {
		if (!homepageEntrySettled) return;
		navigateHome('tail-head');
	};

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			if (shouldCollapseOnReload(aiGovernanceEntrySurface)) showPersonal = false;
			if (shouldCollapseOnReload(qualityEntrySurface)) showPrecision = false;
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

		void afterLayoutSettles().then(() => {
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
			resetCopiedTarget();
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
	<title>Nicko O'Brien | AI-Forward IT Operations and Automation</title>
	<meta
		name="description"
		content="Personal website of Nicko O'Brien, an AI-forward IT professional focused on high-precision technical communication, deterministic AI outcomes, automation, and delivery."
	/>
	<meta name="robots" content="index,follow" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Nicko O'Brien | Personal Website" />
	<meta
		property="og:description"
		content="AI-forward IT professional focused on high-precision technical communication, deterministic AI outcomes, automation, and delivery."
	/>
	<meta property="og:site_name" content="Nicko O'Brien" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Nicko O'Brien | Personal Website" />
	<meta
		name="twitter:description"
		content="AI-forward IT professional focused on high-precision technical communication, deterministic AI outcomes, automation, and delivery."
	/>
	{#if homeEntryImage}
		<link rel="preload" as="image" href={homeEntryImage} />
	{/if}
</svelte:head>

	{#if showHomepagePortraitOverlay && homeEntryImage}
		<div
			class:page-intro-overlay-fading={fadeHomepagePortraitOverlay}
			class="page-intro-overlay"
			aria-hidden="true"
			style:pointer-events="none"
		>
		<img
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
		style:pointer-events={homepageInteractionReady ? 'auto' : 'none'}
	>
	<HeroSection
		{githubUrl}
		{linkedInProfilePath}
		{twitterProfilePath}
		{contactEmail}
		navigationReady={homepageInteractionReady}
		entrySettled={homepageEntrySettled}
		{showResumeOptions}
		{showEmailOptions}
		{showSocialOptions}
		{showLinkedInSocialDetails}
		{showTwitterSocialDetails}
		{copiedTarget}
		{toggleResumeOptions}
		{toggleEmailOptions}
		{toggleSocialOptions}
		{toggleLinkedInSocialDetails}
		{toggleTwitterSocialDetails}
		{copyEmail}
		{copyLinkedInProfilePath}
		{copyTwitterProfilePath}
	/>

	<AboutSection entrySettled={homepageEntrySettled} {showPrecision} {openPrecision} {closePrecision} />

	<div class="section-divider" aria-hidden="true"></div>

	<ProjectsSection
		navigationReady={homepageInteractionReady}
		entrySettled={homepageEntrySettled}
		{showPersonal}
		{showComplete}
		{showActive}
		{openPersonal}
		{closePersonal}
		{openComplete}
		{closeComplete}
		{openActive}
		{closeActive}
	/>

		<ProfileTail entrySettled={homepageEntrySettled} {returnToTop} />
		<div class="page-end-spacer" aria-hidden="true"></div>
	</main>
