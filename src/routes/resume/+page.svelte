<script lang="ts">
	import DestinationActions, { type DestinationAction } from '$lib/components/DestinationActions.svelte';
	import PortraitIntro, { type PortraitIntroState } from '$lib/components/PortraitIntro.svelte';
	import { browser } from '$app/environment';
	import {
		resumeContactItems,
		resumeCurrentEmploymentLocationPeriodLine,
		resumeCurrentEmploymentRoleLine
	} from '$lib/content/resume';
	import { getHumanVisibleResumeProjections } from '$lib/content/resume-projections';
	import { getEntryImage, isPortraitEntry, resolveEntrySurface } from '$lib/entry-surfaces';
	import { willAutoRunPortraitIntro } from '$lib/portrait-intro';
	import { canonicalOrigin } from '$lib/site';
	import { onMount } from 'svelte';

	const resumeTitle = "Nicholas Francis O'Brien | Role-Specific Resumes";
	const resumeDescription =
		"Role-specific resumes for Nicholas Francis O'Brien across IT Support, Technical Operations, and AI / Process Improvement.";
	const resumeEntrySurface = resolveEntrySurface('resume');
	const resumeEntryImage = getEntryImage(resumeEntrySurface);
	const resumeSocialImage = resumeEntryImage ? `${canonicalOrigin}${resumeEntryImage}` : null;
	const resumeUsesPortraitEntry = isPortraitEntry(resumeEntrySurface);
	const resumeProjections = getHumanVisibleResumeProjections();
	const resumeAutomaticIntroShouldRun = browser
		? willAutoRunPortraitIntro(resumeEntrySurface.path)
		: resumeUsesPortraitEntry;

	let showResumePortraitOverlay = $state(resumeUsesPortraitEntry && resumeAutomaticIntroShouldRun);
	let fadeResumePortraitOverlay = $state(false);
	let resumeIntroBooting = $state(resumeUsesPortraitEntry && resumeAutomaticIntroShouldRun);
	const resumeActions: DestinationAction[] = [
		{
			id: 'home',
			label: 'Home',
			type: 'link',
			href: '/',
			preload: true
		},
		{
			id: 'top',
			label: 'Top',
			type: 'link',
			href: '#resume-top'
		}
	];

	const contactHrefById: Record<(typeof resumeContactItems)[number]['id'], string> = {
		email: 'mailto:nicko.obrien.ai@gmail.com',
		website: 'https://nicko.obrienai.com',
		linkedin: 'https://linkedin.com/in/nicholasfobrien/',
		github: 'https://github.com/nicholasob7',
		twitter: 'https://x.com/francis_o39763'
	};

	const handleResumePortraitState = (state: PortraitIntroState) => {
		showResumePortraitOverlay = state.visible;
		fadeResumePortraitOverlay = state.fading;
		resumeIntroBooting = state.booting;
	};

	onMount(() => {
		const url = new URL(window.location.href);
		if (url.searchParams.has('emphasis')) {
			url.searchParams.delete('emphasis');
			window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
		}

		window.scrollTo({ top: 0, behavior: 'auto' });
	});
</script>

<svelte:head>
	<title>{resumeTitle}</title>
	<meta name="description" content={resumeDescription} />
	<meta property="og:type" content="profile" />
	<meta property="og:title" content={resumeTitle} />
	<meta property="og:description" content={resumeDescription} />
	<meta property="og:site_name" content="Nicko O'Brien" />
	{#if resumeSocialImage}
		<meta property="og:image" content={resumeSocialImage} />
		<meta property="og:image:alt" content="Portrait image for Nicholas Francis O'Brien's resume page." />
	{/if}
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={resumeTitle} />
	<meta name="twitter:description" content={resumeDescription} />
	{#if resumeSocialImage}
		<meta name="twitter:image" content={resumeSocialImage} />
		<meta name="twitter:image:alt" content="Portrait image for Nicholas Francis O'Brien's resume page." />
	{/if}
	{#if resumeEntryImage}
		<link rel="preload" as="image" href={resumeEntryImage} />
	{/if}
</svelte:head>

<PortraitIntro
	src={resumeEntryImage}
	enabled={resumeUsesPortraitEntry}
	pathname={resumeEntrySurface.path}
	onStateChange={handleResumePortraitState}
/>

<main
	id="resume-top"
	class:resume-intro-content-boot={resumeIntroBooting}
	class:resume-intro-content-hidden={showResumePortraitOverlay && !fadeResumePortraitOverlay}
	class:resume-intro-content-crossfading={fadeResumePortraitOverlay}
	class="resume-page"
>
	<DestinationActions
		actions={resumeActions}
		panelId="resume-destination-actions"
		portraitHandoff={{ src: resumeEntryImage }}
	/>

	<header class="panel hero-panel">
		<div class="hero-panel-content">
			<div class="hero-copy">
				<h1>Nicholas Francis O'Brien</h1>
				<p class="focus-line">Resume Projections</p>
					<p class="hero-note">
						Choose the resume version closest to the role. Each version can be read on-site or opened as the
						reviewed one-page PDF artifact, with the same substantive resume content preserved across formats.
					</p>
				<div class="hero-context" aria-label="Current role context">
					<p class="hero-context-label">Current Role</p>
					<p class="role-line">{resumeCurrentEmploymentRoleLine}</p>
					<p class="role-meta">{resumeCurrentEmploymentLocationPeriodLine}</p>
				</div>
			</div>
		</div>
	</header>

	<section class="panel projections-panel" aria-labelledby="role-specific-resumes-heading">
		<div class="section-head">
			<div class="section-head-copy">
				<h2 id="role-specific-resumes-heading">Role-Specific Resumes</h2>
				<p class="section-note">
					The active public resume surface is projection-based. These are the only published resume artifacts in
					active use.
				</p>
			</div>
		</div>

		<div class="projection-grid">
			{#each resumeProjections as projection}
				<article class="projection-card">
					<div class="projection-card-copy">
						<p class="projection-label">{projection.label}</p>
						<h3>{projection.roleFamily}</h3>
						<p class="projection-summary">{projection.summary}</p>
					</div>

					<div class="projection-card-targets">
						<p class="hero-context-label">Role Targets</p>
						<ul class="target-list">
							{#each projection.roleTargets as roleTarget}
								<li>{roleTarget}</li>
							{/each}
						</ul>
					</div>

					<div class="projection-card-actions">
						<a
							class="projection-action projection-action-primary"
							href={projection.htmlPath}
						>
							View Resume
						</a>
						<a
							class="projection-action"
							href={projection.pdfPath}
							rel="noopener noreferrer"
							target="_blank"
						>
							Open PDF
						</a>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="panel support-panel" aria-labelledby="public-links-heading">
		<div class="section-head-copy">
			<h2 id="public-links-heading">Public Links</h2>
			<p class="section-note">Use these channels for portfolio context and contact.</p>
		</div>
		<ul class="contact-list">
			{#each resumeContactItems as item (item.id)}
				<li>
					<span class="contact-label">{item.label}</span>
					<a
						class="contact-link"
						href={contactHrefById[item.id]}
						rel="noopener noreferrer"
						target={item.id === 'email' ? undefined : '_blank'}
					>
						{item.displayValue}
					</a>
				</li>
			{/each}
		</ul>
	</section>
</main>

<style>
	:global(html) {
		scrollbar-gutter: stable;
	}

	:global(body) {
		color: #e7edf8;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		background:
			radial-gradient(circle at 10% 0%, rgba(39, 102, 171, 0.24), transparent 32%),
			radial-gradient(circle at 90% 10%, rgba(29, 131, 113, 0.22), transparent 28%),
			linear-gradient(165deg, #070d18 0%, #111b2f 55%, #0c1629 100%);
	}

	.resume-page {
		max-width: 1320px;
		margin: 0 auto;
		padding: 1.2rem 1rem calc(6.5rem + env(safe-area-inset-bottom));
		display: grid;
		gap: 0.9rem;
		opacity: 1;
		transition: opacity 0ms cubic-bezier(0.12, 0.72, 0.16, 1);
	}

	.resume-page.resume-intro-content-hidden {
		opacity: 0;
	}

	.resume-page.resume-intro-content-boot {
		opacity: 0;
	}

	.resume-page.resume-intro-content-crossfading {
		opacity: 1;
	}

	.panel {
		display: grid;
		gap: 0.78rem;
		min-width: 0;
		padding: 1rem 1.05rem;
		border: 1px solid transparent;
		border-radius: 0.95rem;
		background:
			linear-gradient(rgba(15, 24, 40, 0.9), rgba(15, 24, 40, 0.9)) padding-box,
			linear-gradient(120deg, rgba(93, 173, 255, 0.6), rgba(61, 177, 153, 0.62)) border-box;
		box-shadow: 0 12px 26px rgba(3, 8, 20, 0.5);
	}

	.hero-panel-content,
	.hero-copy,
	.section-head-copy,
	.projection-card,
	.projection-card-copy,
	.projection-card-targets,
	.support-panel {
		display: grid;
		gap: 0.5rem;
	}

	h1,
	h2,
	h3,
	p {
		margin: 0;
	}

	h1 {
		font-size: clamp(1.95rem, 4.8vw, 2.85rem);
		line-height: 0.98;
		color: #dce6f3;
	}

	h2 {
		font-size: 1.08rem;
		line-height: 1.2;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #96dcff;
	}

	h3,
	.focus-line,
	.projection-label {
		color: transparent;
		background: linear-gradient(90deg, #96dcff 0%, #a98cff 52%, #6fd8b6 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	h3 {
		font-size: 1.08rem;
		line-height: 1.3;
	}

	.focus-line {
		font-size: 1.08rem;
		font-weight: 600;
		letter-spacing: 0.02em;
	}

	.hero-note,
	.section-note,
	.role-line,
	.role-meta,
	.projection-summary,
	.target-list li,
	.contact-list li {
		font-size: 0.92rem;
		line-height: 1.48;
		color: #d3def1;
	}

	.hero-context {
		display: grid;
		gap: 0.2rem;
		padding-top: 0.2rem;
	}

	.hero-context-label,
	.contact-label {
		font-size: 0.72rem;
		line-height: 1.1;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(127, 168, 214, 0.74);
	}

	.role-line {
		font-weight: 600;
		color: #f3f7ff;
	}

	.role-meta {
		color: #cfe6ff;
	}

	.projection-grid {
		display: grid;
		gap: 0.8rem;
	}

	.projection-card {
		padding: 0.95rem;
		border-radius: 0.84rem;
		border: 1px solid rgba(150, 205, 255, 0.2);
		background:
			linear-gradient(rgba(18, 31, 56, 0.76), rgba(18, 31, 56, 0.76)) padding-box,
			linear-gradient(135deg, rgba(94, 189, 255, 0.36), rgba(77, 221, 183, 0.24)) border-box;
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.04) inset,
			0 10px 24px rgba(5, 11, 26, 0.24);
	}

	.projection-label {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.target-list,
	.contact-list {
		margin: 0;
		padding-left: 1.05rem;
		display: grid;
		gap: 0.38rem;
		list-style: disc;
	}

	.target-list li::marker,
	.contact-list li::marker {
		color: #92dbff;
	}

	.projection-card-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		padding-top: 0.2rem;
	}

	.projection-action,
	.contact-link {
		color: #d7e8ff;
		text-decoration: none;
	}

	.projection-action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.4rem;
		padding: 0.48rem 0.84rem;
		border: 1px solid rgba(143, 205, 255, 0.28);
		border-radius: 999px;
		background: rgba(13, 24, 43, 0.72);
		font-size: 0.84rem;
		font-weight: 700;
	}

	.projection-action-primary {
		border-color: rgba(154, 214, 255, 0.54);
		background: rgba(25, 48, 84, 0.9);
		color: #f3f7ff;
	}

	.projection-action:hover,
	.contact-link:hover {
		color: #ffffff;
	}

	.projection-action:focus-visible,
	.contact-link:focus-visible {
		outline: 2px solid rgba(141, 214, 255, 0.9);
		outline-offset: 2px;
	}

	.contact-link {
		text-decoration: underline;
		text-decoration-color: rgba(154, 214, 255, 0.44);
		text-underline-offset: 0.18rem;
	}

	@media (min-width: 960px) {
		.resume-page {
			padding: 2rem 1.25rem calc(6.75rem + env(safe-area-inset-bottom));
			gap: 1.1rem;
		}

		.panel {
			padding: 1.2rem 1.25rem;
			border-radius: 1rem;
		}

		h1 {
			font-size: clamp(2.35rem, 4.8vw, 3.2rem);
		}

		h2 {
			font-size: 1.16rem;
		}

		h3 {
			font-size: 1.26rem;
		}

		.focus-line {
			font-size: 1.5rem;
			line-height: 1.4;
		}

		.hero-note,
		.section-note,
		.role-line,
		.role-meta,
		.projection-summary,
		.target-list li,
		.contact-list li {
			font-size: 1.05rem;
			line-height: 1.58;
		}

		.hero-context-label,
		.contact-label {
			font-size: 0.86rem;
		}

		.projection-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			align-items: start;
		}
	}

	@media (max-width: 760px) {
		.resume-page {
			padding: 1rem 0.85rem calc(6.5rem + env(safe-area-inset-bottom));
		}
	}

	@media (max-width: 520px) {
		h1 {
			font-size: clamp(1.75rem, 9vw, 2.4rem);
		}

		.focus-line {
			font-size: 0.92rem;
		}
	}

	@media print {
		.resume-page {
			opacity: 1 !important;
			transition: none !important;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.resume-page {
			transition: none;
		}
	}
</style>
