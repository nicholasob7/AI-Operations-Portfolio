<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onDestroy, tick } from 'svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import AboutSection from '$lib/components/home/AboutSection.svelte';
	import ProjectsSection from '$lib/components/home/ProjectsSection.svelte';
	import ProfileTail from '$lib/components/home/ProfileTail.svelte';
	import './home.css';

	const contactEmail = 'nicko.obrien.ai@gmail.com';
	const linkedInProfilePath = 'linkedin.com/in/nicholasfobrien/';
	const githubUrl = 'https://github.com/nicholasob7';
	const twitterProfilePath = 'x.com/nicho0101';
	let copiedTarget = $state<'email' | 'linkedin' | 'twitter' | null>(null);
	let copyResetTimer: ReturnType<typeof setTimeout> | null = null;
	const openPanel = $derived(browser ? (page.url.searchParams.get('open') ?? '') : '');
	const showResumeOptions = $derived(openPanel === 'resume');
	const showEmailOptions = $derived(openPanel === 'email');
	const showSocialOptions = $derived(openPanel === 'social');
	const openSocialOption = $derived(browser ? (page.url.searchParams.get('social') ?? '') : '');
	const showLinkedInSocialDetails = $derived(showSocialOptions && openSocialOption === 'linkedin');
	const showTwitterSocialDetails = $derived(showSocialOptions && openSocialOption === 'twitter');
	const showOverview = $derived(openPanel === 'overview');
	const showPrecision = $derived(openPanel === 'precision');
	const showCase1 = $derived(openPanel === 'case-1');
	const showCase2 = $derived(openPanel === 'case-2');

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

	const openOverview = () => {
		navigateHome('overview-head', 'overview');
	};

	const closeOverview = () => {
		navigateHome('eliora-head');
	};

	const openPrecision = () => {
		navigateHome('precision-head', 'precision');
	};

	const closePrecision = () => {
		navigateHome('selected-work-head');
	};

	const openCase1 = () => {
		navigateHome('remediation-head', 'case-1');
	};

	const closeCase1 = () => {
		navigateHome('deployment-head');
	};

	const openCase2 = () => {
		navigateHome('deployment-head', 'case-2');
	};

	const closeCase2 = () => {
		navigateHome('tail-head');
	};

	onDestroy(() => {
		resetCopiedTarget();
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
</svelte:head>

<main class="page">
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
		{showOverview}
		{showCase1}
		{showCase2}
		{openOverview}
		{closeOverview}
		{openCase1}
		{closeCase1}
		{openCase2}
		{closeCase2}
	/>

	<ProfileTail />
	<div class="page-end-spacer" aria-hidden="true"></div>
</main>
