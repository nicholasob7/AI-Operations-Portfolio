<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import AboutSection from '$lib/components/home/AboutSection.svelte';
	import ProjectsSection from '$lib/components/home/ProjectsSection.svelte';
	import ProfileTail from '$lib/components/home/ProfileTail.svelte';
	import './home.css';

	const contactEmail = 'nicko.obrien.ai@gmail.com';
	const linkedInUrl = 'https://www.linkedin.com/in/nicholasfobrien';
	const githubUrl = 'https://github.com/nicholasob7';
	const twitterUrl = 'https://x.com/nicho0101';
	let showResumeOptions = $state(false);
	let showEmailOptions = $state(false);
	let showSocialOptions = $state(false);
	let showElioraDetail = $state(false);
	let showSemanticDetail = $state(false);
	let showRemediationOptions = $state(false);
	let showMigrationOptions = $state(false);
	let showRemediationDownloadOptions = $state(false);
	let showMigrationDownloadOptions = $state(false);
	let copied = $state(false);
	let showEmailText = $state(false);
	let copyResetTimer: ReturnType<typeof setTimeout> | null = null;

	const focusPanel = async (id: string) => {
		await tick();
		const panel = document.getElementById(id);
		if (panel) panel.focus();
	};

	const closeAllTopPanels = () => {
		showResumeOptions = false;
		showEmailOptions = false;
		showSocialOptions = false;
		showElioraDetail = false;
		showSemanticDetail = false;
		showRemediationOptions = false;
		showMigrationOptions = false;
		showRemediationDownloadOptions = false;
		showMigrationDownloadOptions = false;
		showEmailText = false;
		copied = false;
		if (copyResetTimer) clearTimeout(copyResetTimer);
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

	const toggleShowEmailText = () => {
		showEmailText = !showEmailText;
	};

	const toggleEmailOptions = () => {
		if (showEmailOptions) {
			showEmailOptions = false;
			showEmailText = false;
			copied = false;
			if (copyResetTimer) clearTimeout(copyResetTimer);
			return;
		}
		closeAllTopPanels();
		showEmailOptions = true;
		void focusPanel('email-subactions');
	};

	const toggleResumeOptions = () => {
		if (showResumeOptions) {
			showResumeOptions = false;
			return;
		}
		closeAllTopPanels();
		showResumeOptions = true;
		void focusPanel('resume-subactions');
	};

	const toggleSocialOptions = () => {
		if (showSocialOptions) {
			showSocialOptions = false;
			return;
		}
		closeAllTopPanels();
		showSocialOptions = true;
		void focusPanel('social-subactions');
	};

	const toggleElioraDetail = () => {
		if (showElioraDetail) {
			showElioraDetail = false;
			return;
		}
		closeAllTopPanels();
		showElioraDetail = true;
		void focusPanel('eliora-detail');
	};

	const toggleSemanticDetail = () => {
		if (showSemanticDetail) {
			showSemanticDetail = false;
			return;
		}
		closeAllTopPanels();
		showSemanticDetail = true;
		void focusPanel('semantic-language-detail');
	};

	const toggleRemediationOptions = () => {
		if (showRemediationOptions) {
			showRemediationOptions = false;
			showRemediationDownloadOptions = false;
			return;
		}
		closeAllTopPanels();
		showRemediationOptions = true;
		void focusPanel('remediation-subactions');
	};

	const toggleMigrationOptions = () => {
		if (showMigrationOptions) {
			showMigrationOptions = false;
			showMigrationDownloadOptions = false;
			return;
		}
		closeAllTopPanels();
		showMigrationOptions = true;
		void focusPanel('migration-subactions');
	};

	const toggleRemediationDownloadOptions = () => {
		showRemediationDownloadOptions = !showRemediationDownloadOptions;
	};

	const toggleMigrationDownloadOptions = () => {
		showMigrationDownloadOptions = !showMigrationDownloadOptions;
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
		{showEmailText}
		{copied}
		{toggleResumeOptions}
		{toggleEmailOptions}
		{toggleSocialOptions}
		{toggleShowEmailText}
		{copyEmail}
	/>

	<AboutSection {showSemanticDetail} {toggleSemanticDetail} />

	<div class="section-divider" aria-hidden="true"></div>

	<ProjectsSection
		{showElioraDetail}
		{showRemediationOptions}
		{showMigrationOptions}
		{showRemediationDownloadOptions}
		{showMigrationDownloadOptions}
		{toggleElioraDetail}
		{toggleRemediationOptions}
		{toggleMigrationOptions}
		{toggleRemediationDownloadOptions}
		{toggleMigrationDownloadOptions}
	/>

	<ProfileTail />
</main>
