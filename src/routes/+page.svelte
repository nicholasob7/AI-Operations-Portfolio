<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onDestroy } from 'svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import AboutSection from '$lib/components/home/AboutSection.svelte';
	import ProjectsSection from '$lib/components/home/ProjectsSection.svelte';
	import ProfileTail from '$lib/components/home/ProfileTail.svelte';
	import './home.css';

	const contactEmail = 'nicko.obrien.ai@gmail.com';
	const linkedInUrl = 'https://www.linkedin.com/in/nicholasfobrien';
	const githubUrl = 'https://github.com/nicholasob7';
	const twitterUrl = 'https://x.com/nicho0101';
	let copied = $state(false);
	let copyResetTimer: ReturnType<typeof setTimeout> | null = null;
	const openPanel = $derived(browser ? (page.url.searchParams.get('open') ?? '') : '');
	const showResumeOptions = $derived(openPanel === 'resume');
	const showEmailOptions = $derived(openPanel === 'email');
	const showSocialOptions = $derived(openPanel === 'social');
	const showOverview = $derived(openPanel === 'overview');
	const showPrecision = $derived(openPanel === 'precision');
	const showCase1 = $derived(openPanel === 'case-1');
	const showCase2 = $derived(openPanel === 'case-2');

	const homepageHref = (hash: string, open?: string) => {
		const url = new URL(page.url);
		url.pathname = '/';
		url.search = '';
		if (open) {
			url.searchParams.set('open', open);
		}
		url.hash = `#${hash}`;
		return `${url.pathname}${url.search}${url.hash}`;
	};

	const navigateHome = (hash: string, open?: string) => {
		void goto(homepageHref(hash, open), {
			keepFocus: true
		});
	};

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(contactEmail);
			copied = true;
			if (copyResetTimer) clearTimeout(copyResetTimer);
			copyResetTimer = setTimeout(() => {
				copied = false;
			}, 1800);
		} catch {
			copied = false;
		}
	};

	const toggleEmailOptions = () => {
		copied = false;
		if (copyResetTimer) clearTimeout(copyResetTimer);
		navigateHome('hero-head', showEmailOptions ? undefined : 'email');
	};

	const toggleResumeOptions = () => {
		navigateHome('hero-head', showResumeOptions ? undefined : 'resume');
	};

	const toggleSocialOptions = () => {
		navigateHome('hero-head', showSocialOptions ? undefined : 'social');
	};

	const openOverview = () => {
		navigateHome('overview-head', 'overview');
	};

	const closeOverview = () => {
		navigateHome('remediation-head');
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
		if (copyResetTimer) clearTimeout(copyResetTimer);
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
		{linkedInUrl}
		{twitterUrl}
		{contactEmail}
		{showResumeOptions}
		{showEmailOptions}
		{showSocialOptions}
		{copied}
		{toggleResumeOptions}
		{toggleEmailOptions}
		{toggleSocialOptions}
		{copyEmail}
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
