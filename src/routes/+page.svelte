<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
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
	let copiedTarget = $state<'email' | 'linkedin' | 'twitter' | null>(null);
	let homepagePortraitImage: HTMLImageElement | null = $state(null);
	let showHomepagePortraitOverlay = $state(false);
	let fadeHomepagePortraitOverlay = $state(false);
	let copyResetTimer: ReturnType<typeof setTimeout> | null = null;
	let homepagePortraitFadeTimer: ReturnType<typeof setTimeout> | null = null;
	let homepagePortraitDismissTimer: ReturnType<typeof setTimeout> | null = null;
	let removeHomepageDismissListeners: (() => void) | null = null;
	const openPanel = $derived(browser ? (page.url.searchParams.get('open') ?? '') : '');
	const showResumeOptions = $derived(openPanel === 'resume');
	const showEmailOptions = $derived(openPanel === 'email');
	const showSocialOptions = $derived(openPanel === 'social');
	const openSocialOption = $derived(browser ? (page.url.searchParams.get('social') ?? '') : '');
	const showLinkedInSocialDetails = $derived(showSocialOptions && openSocialOption === 'linkedin');
	const showTwitterSocialDetails = $derived(showSocialOptions && openSocialOption === 'twitter');
	const showPersonal = $derived(openPanel === 'overview');
	const showPrecision = $derived(openPanel === 'precision');
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

	const resetCopiedTarget = () => {
		copiedTarget = null;
		if (copyResetTimer) clearTimeout(copyResetTimer);
	};

	const clearHomepagePendingState = () => {
		if (!browser) return;
		document.documentElement.classList.remove('home-intro-pending');
	};

	const syncHomepageOverlayBodyState = () => {
		if (!browser) return;
		document.body.classList.toggle('home-intro-active', showHomepagePortraitOverlay);
	};

	const clearHomepageDismissListeners = () => {
		if (!removeHomepageDismissListeners) return;
		removeHomepageDismissListeners();
		removeHomepageDismissListeners = null;
	};

	const clearHomepagePortraitTimers = () => {
		if (homepagePortraitFadeTimer) clearTimeout(homepagePortraitFadeTimer);
		if (homepagePortraitDismissTimer) clearTimeout(homepagePortraitDismissTimer);
		homepagePortraitFadeTimer = null;
		homepagePortraitDismissTimer = null;
	};

	const waitForHomepagePortraitReady = async () => {
		const image = homepagePortraitImage;
		if (!image) return;

		if (typeof image.decode === 'function') {
			try {
				await image.decode();
				return;
			} catch {
				// Fall through to load/error completion handling.
			}
		}

		if (image.complete) return;

		await new Promise<void>((resolve) => {
			const finalize = () => resolve();
			image.addEventListener('load', finalize, { once: true });
			image.addEventListener('error', finalize, { once: true });
		});
	};

	const dismissHomepagePortraitOverlay = (immediate = false) => {
		if (!showHomepagePortraitOverlay) return;

		clearHomepagePortraitTimers();

		if (immediate) {
			fadeHomepagePortraitOverlay = false;
			showHomepagePortraitOverlay = false;
			clearHomepageDismissListeners();
			syncHomepageOverlayBodyState();
			return;
		}

		fadeHomepagePortraitOverlay = true;
		homepagePortraitDismissTimer = setTimeout(() => {
			showHomepagePortraitOverlay = false;
			fadeHomepagePortraitOverlay = false;
			homepagePortraitDismissTimer = null;
			clearHomepageDismissListeners();
			syncHomepageOverlayBodyState();
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
		resetCopiedTarget();
		navigateHome('hero-head', showEmailOptions ? undefined : 'email');
	};

	const toggleResumeOptions = () => {
		navigateHome('hero-head', showResumeOptions ? undefined : 'resume');
	};

	const toggleSocialOptions = () => {
		resetCopiedTarget();
		navigateHome('hero-head', showSocialOptions ? undefined : 'social');
	};

	const toggleLinkedInSocialDetails = () => {
		resetCopiedTarget();
		navigateHome('hero-head', 'social', showLinkedInSocialDetails ? undefined : 'linkedin');
	};

	const toggleTwitterSocialDetails = () => {
		resetCopiedTarget();
		navigateHome('hero-head', 'social', showTwitterSocialDetails ? undefined : 'twitter');
	};

	const openPersonal = () => {
		navigateHome('overview-head', 'overview');
	};

	const closePersonal = () => {
		navigateHome('eliora-head');
	};

	const openPrecision = () => {
		navigateHome('about-head', 'precision');
	};

	const closePrecision = () => {
		navigateHome('about-head');
	};

	const openComplete = () => {
		navigateHome('remediation-head', 'case-1');
	};

	const closeComplete = () => {
		navigateHome('deployment-head');
	};

	const openActive = () => {
		navigateHome('deployment-head', 'case-2');
	};

	const closeActive = () => {
		navigateHome('tail-head');
	};

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const dismissOnMouseMove = (event: MouseEvent) => {
			if (event.movementX === 0 && event.movementY === 0) return;
			dismissHomepagePortraitOverlay(true);
		};
		const dismissOnInteraction = () => {
			dismissHomepagePortraitOverlay(true);
		};
		const attachHomepageDismissListeners = (includeNoisyListeners: boolean) => {
			clearHomepageDismissListeners();

			window.addEventListener('pointerdown', dismissOnInteraction, { passive: true });
			window.addEventListener('keydown', dismissOnInteraction);

			if (includeNoisyListeners) {
				window.addEventListener('wheel', dismissOnInteraction, { passive: true });
				window.addEventListener('scroll', dismissOnInteraction, { passive: true });
				window.addEventListener('mousemove', dismissOnMouseMove, { passive: true });
			}

			removeHomepageDismissListeners = () => {
				window.removeEventListener('pointerdown', dismissOnInteraction);
				window.removeEventListener('keydown', dismissOnInteraction);
				window.removeEventListener('wheel', dismissOnInteraction);
				window.removeEventListener('scroll', dismissOnInteraction);
				window.removeEventListener('mousemove', dismissOnMouseMove);
			};
		};

		showHomepagePortraitOverlay = true;
		fadeHomepagePortraitOverlay = false;
		syncHomepageOverlayBodyState();
		attachHomepageDismissListeners(false);

		void tick().then(() => {
			clearHomepagePendingState();
		});

		void afterLayoutSettles().then(async () => {
			if (!showHomepagePortraitOverlay) return;
			await waitForHomepagePortraitReady();
			if (!showHomepagePortraitOverlay) return;

			attachHomepageDismissListeners(true);

			if (prefersReducedMotion) {
				homepagePortraitDismissTimer = setTimeout(() => {
					showHomepagePortraitOverlay = false;
					homepagePortraitDismissTimer = null;
					clearHomepageDismissListeners();
					syncHomepageOverlayBodyState();
				}, homepagePortraitHoldMs);
				return;
			}

			homepagePortraitFadeTimer = setTimeout(() => {
				homepagePortraitFadeTimer = null;
				dismissHomepagePortraitOverlay();
			}, homepagePortraitHoldMs);
		});

		return () => {
			clearHomepagePortraitTimers();
			clearHomepageDismissListeners();
			clearHomepagePendingState();
			document.body.classList.remove('home-intro-active');
		};
	});

	onDestroy(() => {
		resetCopiedTarget();
		clearHomepagePortraitTimers();
		clearHomepageDismissListeners();
		if (browser) {
			clearHomepagePendingState();
			document.body.classList.remove('home-intro-active');
		}
	});

	$effect(() => {
		if (!browser || !page.url.hash) return;
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
	<link rel="preload" as="image" href="/images/homepage-portrait.jpg" />
	<script>
		document.documentElement.classList.add('home-intro-pending');
	</script>
</svelte:head>

<div
	class:page-intro-overlay-active={showHomepagePortraitOverlay}
	class:page-intro-overlay-fading={fadeHomepagePortraitOverlay}
	class="page-intro-overlay"
	aria-hidden="true"
>
	<img
		bind:this={homepagePortraitImage}
		class="page-intro-overlay-image"
		src="/images/homepage-portrait.jpg"
		alt=""
		width="1254"
		height="1254"
		decoding="async"
		fetchpriority="high"
	/>
</div>

<main
	class:page-intro-content-crossfading={fadeHomepagePortraitOverlay}
	class:page-intro-content-hidden={showHomepagePortraitOverlay && !fadeHomepagePortraitOverlay}
	class="page"
>
	<HeroSection
		{githubUrl}
		{linkedInProfilePath}
		{twitterProfilePath}
		{contactEmail}
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

	<AboutSection {showPrecision} {openPrecision} {closePrecision} />

	<div class="section-divider" aria-hidden="true"></div>

	<ProjectsSection
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

	<ProfileTail />
	<div class="page-end-spacer" aria-hidden="true"></div>
</main>
