		<script lang="ts">
		import DestinationActions, { type DestinationAction } from '$lib/components/DestinationActions.svelte';
		import PortraitIntro, { type PortraitIntroState } from '$lib/components/PortraitIntro.svelte';
		import {
			activeProjectActive,
			activeProjectCompleted,
			delegatedScope,
			progressionStages,
			qualifications,
			resumeContactChannelItems,
			resumeContactItems,
			resumeCurrentEmploymentLocationPeriodLine,
			resumeCurrentEmploymentRoleLine,
			resumeInitiativeMetadata,
			resumeLocation,
			resumePublicDetailItems,
			technicalSkills,
			type ResumeContactTarget as ContactTarget
		} from '$lib/content/resume';
		import {
			defaultResumeProjectionId,
			getProjectedProgressionStages,
			getProjectedScopeEvidence,
			getProjectedSkillGroups,
			isResumeProjectionId,
			resumeProjections,
			type ResumeProjectionId
		} from '$lib/content/resume-projections';
		import { getEntryImage, isPortraitEntry, resolveEntrySurface } from '$lib/entry-surfaces';
		import { canonicalOrigin } from '$lib/site';
		import { onMount, tick } from 'svelte';

	const resumeTitle = "Nicholas Francis O'Brien | Resume";
	const resumeDescription =
		"Resume of Nicholas Francis O'Brien, focused on enterprise IT operations, process improvement, and AI-forward delivery.";
	const resumeEntrySurface = resolveEntrySurface('resume');
	const resumeEntryImage = getEntryImage(resumeEntrySurface);
	const resumeSocialImage = resumeEntryImage ? `${canonicalOrigin}${resumeEntryImage}` : null;
	const resumeUsesPortraitEntry = isPortraitEntry(resumeEntrySurface);

		let openSkillIndices = $state<number[]>([]);
		let showSkillsCollapseAction = $state(false);

	let showResumePortraitOverlay = $state(resumeUsesPortraitEntry);
	let fadeResumePortraitOverlay = $state(false);
		let resumeIntroBooting = $state(resumeUsesPortraitEntry);
		let resumeInteractionReady = $state(!resumeUsesPortraitEntry);
		let activeProjectionId = $state<ResumeProjectionId>(defaultResumeProjectionId);
		let copiedContactTarget = $state<ContactTarget | null>(null);
		let contactCopyMenuOpen = $state(false);
		let topSkillsToggle = $state<HTMLButtonElement | null>(null);
		let bottomSkillsCollapse = $state<HTMLButtonElement | null>(null);
		let contactCopyMenuTrigger = $state<HTMLButtonElement | null>(null);
		let contactCopyMenuElement = $state<HTMLDivElement | null>(null);
	let contactCopyResetTimer: ReturnType<typeof setTimeout> | null = null;

	const activeProjection = $derived(
		resumeProjections.find((projection) => projection.id === activeProjectionId) ?? resumeProjections[0]
	);
	const projectedTechnicalSkills = $derived(getProjectedSkillGroups(activeProjection));
	const projectedProgressionStages = $derived(getProjectedProgressionStages(activeProjection));
	const projectedScopeEvidence = $derived(getProjectedScopeEvidence(activeProjection));
	const allSkillIndices = $derived(projectedTechnicalSkills.map((_, index) => index));

	const allSkillsOpen = $derived(
		projectedTechnicalSkills.length > 0 && openSkillIndices.length === projectedTechnicalSkills.length
	);
	const anySkillsOpen = $derived(openSkillIndices.length > 0);
	const copiedContactMessage = $derived(
		copiedContactTarget
			? (resumeContactItems.find((item) => item.id === copiedContactTarget)?.copiedMessage ?? '')
			: ''
	);

	const toggleSkill = (index: number) => {
		if (allSkillsOpen) {
			openSkillIndices = [index];
			return;
		}

		openSkillIndices = openSkillIndices.includes(index) ? [] : [index];
	};

	const toggleAllSkills = () => {
		openSkillIndices = allSkillsOpen ? [] : [...allSkillIndices];
	};

	const collapseSkills = () => {
		openSkillIndices = [];
	};

	const topSkillsToggleScrolledOut = () => {
		if (!topSkillsToggle) return false;

		const rect = topSkillsToggle.getBoundingClientRect();
		return rect.bottom < 24;
	};

	const bottomSkillsCollapseVisible = () => {
		if (!bottomSkillsCollapse) return false;

		const rect = bottomSkillsCollapse.getBoundingClientRect();
		return rect.top < window.innerHeight - 24 && rect.bottom > 24;
	};

	const updateActionAvailability = () => {
		showSkillsCollapseAction =
			anySkillsOpen && topSkillsToggleScrolledOut() && !bottomSkillsCollapseVisible();
	};

	const resumeActions = $derived(
		[
			...(showSkillsCollapseAction
				? [
						{
							id: 'collapse',
							label: 'Collapse',
							type: 'button',
							onclick: collapseSkills
						} satisfies DestinationAction
					]
				: []),
			{
				id: 'print',
				label: 'Print',
				type: 'link',
				href: activeProjection.pdf.href,
				download: activeProjection.pdf.filename
			},
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
		] satisfies DestinationAction[]
	);

	const handleResumePortraitState = (state: PortraitIntroState) => {
		showResumePortraitOverlay = state.visible;
		fadeResumePortraitOverlay = state.fading;
		resumeIntroBooting = state.booting;
		resumeInteractionReady = state.interactionReady;
	};

	const selectProjection = (projectionId: ResumeProjectionId) => {
		activeProjectionId = projectionId;
		openSkillIndices = [];

		if (typeof window === 'undefined') return;

		const url = new URL(window.location.href);
		if (projectionId === defaultResumeProjectionId) {
			url.searchParams.delete('emphasis');
		} else {
			url.searchParams.set('emphasis', projectionId);
		}
		window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
	};

	const copyContactValue = async (value: string, target: ContactTarget) => {
		try {
			await navigator.clipboard.writeText(value);
			copiedContactTarget = target;
			if (contactCopyResetTimer) clearTimeout(contactCopyResetTimer);
			contactCopyResetTimer = setTimeout(() => {
				copiedContactTarget = null;
			}, 1800);
		} catch {
			copiedContactTarget = null;
		}
	};

	onMount(() => {
		const requestedProjection = new URLSearchParams(window.location.search).get('emphasis');
		if (isResumeProjectionId(requestedProjection)) {
			activeProjectionId = requestedProjection;
		}

		const handleScroll = () => {
			updateActionAvailability();
		};

		window.scrollTo({ top: 0, behavior: 'auto' });
		updateActionAvailability();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll);

		return () => {
			if (contactCopyResetTimer) clearTimeout(contactCopyResetTimer);
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	});

	$effect(() => {
		activeProjectionId;
		openSkillIndices = [];
	});

	$effect(() => {
		openSkillIndices.length;
		if (typeof window === 'undefined') return;
		void tick().then(() => {
			updateActionAvailability();
		});
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
				<p class="focus-line">{activeProjection.headline}</p>
				<div class="hero-context" aria-label="Professional summary">
					<p class="hero-context-label">Professional Summary</p>
					<ul class="hero-context-list">
						{#each activeProjection.summary as point}
							<li>{point}</li>
						{/each}
					</ul>
				</div>
				<div class="projection-control" aria-label="Resume emphasis">
					<div class="projection-control-copy">
						<p class="hero-context-label">Resume emphasis</p>
						<p class="projection-note">
							Select the version closest to the role you are hiring for. Each view uses the same factual record and changes only ordering and emphasis.
						</p>
					</div>
					<div class="projection-options" role="group" aria-label="Resume emphasis options">
						{#each resumeProjections as projection}
							<button
								class:projection-option-active={activeProjection.id === projection.id}
								class="projection-option"
								type="button"
								aria-pressed={activeProjection.id === projection.id}
								onclick={() => selectProjection(projection.id)}
							>
								{projection.label}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</header>

	{#each activeProjection.sectionOrder as sectionId}
		{#if sectionId === 'experience'}
			<section class="panel experience-panel">
				<div class="employment-heading">
					<h2 class="employment-title">{resumeCurrentEmploymentRoleLine}</h2>
					<p class="employment-meta">{resumeCurrentEmploymentLocationPeriodLine}</p>
				</div>

				<section class="scope-card emphasis-highlights">
					<h3>Role Emphasis Highlights</h3>
					<div class="progression-map">
						{#each projectedScopeEvidence as scope}
							<section class="progression-stage">
								<h4>{scope.label}</h4>
								{#if scope.meta}
									<p class="stage-period">{scope.meta}</p>
								{/if}
								<ul class="content-list">
									{#each scope.items as point}
										<li>{point}</li>
									{/each}
								</ul>
							</section>
						{/each}
					</div>
				</section>

				{#each activeProjection.experienceBlockOrder as blockId}
					{#if blockId === 'initiative'}
						<section class="scope-card">
							<h3>Initiative in Scope</h3>

							<section class="scope-card scope-card-nested">
								<h4>Active Project</h4>

								<section class="scope-card scope-card-deep">
									<h5>Completed</h5>
									<p class="scope-meta">
										{resumeInitiativeMetadata.completed.label} | {resumeInitiativeMetadata.completed.period.display}
									</p>
									<ul class="content-list">
										{#each activeProjectCompleted as point}
											<li>{point}</li>
										{/each}
									</ul>
								</section>

								<section class="scope-card scope-card-deep">
									<h5>Active</h5>
									<p class="scope-meta">
										{resumeInitiativeMetadata.active.label} | {resumeInitiativeMetadata.active.period.display}
									</p>
									<ul class="content-list">
										{#each activeProjectActive as point}
											<li>{point}</li>
										{/each}
									</ul>
								</section>
							</section>
						</section>
					{:else if blockId === 'delegated_scope'}
						<section class="scope-card">
							<h3>Delegated Scope</h3>
							<ul class="content-list">
								{#each delegatedScope as point}
									<li>{point}</li>
								{/each}
							</ul>
						</section>
					{:else if blockId === 'role_progression'}
						<section class="scope-card">
							<h3>Role Progression Map</h3>
							<p class="core-role-start">From service desk baseline to AI-forward operational delivery.</p>
							<div class="progression-map">
								{#each projectedProgressionStages as stage}
									<section class="progression-stage">
										<h4>{stage.title}</h4>
										{#if stage.period}
											<p class="stage-period">{stage.period.display}</p>
										{/if}
										<ul class="content-list">
											{#each stage.items as point}
												<li>{point}</li>
											{/each}
										</ul>
									</section>
								{/each}
							</div>
						</section>
					{/if}
				{/each}
			</section>
		{:else if sectionId === 'technical_skills'}
			<section class="panel">
				<div class="section-head">
					<div class="section-head-copy">
						<h2>Technical Skills</h2>
						<p class="section-note">
							{allSkillsOpen ? 'Close to one skill Click -' : 'Open one skill Click +'}
						</p>
					</div>
					<button bind:this={topSkillsToggle} class="section-reset-button" type="button" onclick={toggleAllSkills}>
						{allSkillsOpen ? 'Collapse' : 'View all'}
					</button>
				</div>

				<div class="skills-grid">
					{#each projectedTechnicalSkills as group, index}
						{@const isOpen = openSkillIndices.includes(index)}
						<section class:skill-card-open={isOpen} class="skill-card">
							<h3 class="skill-card-title">
								<button
									class="skill-card-button"
									type="button"
									id={`skill-trigger-${index}`}
									aria-expanded={isOpen}
									aria-controls={`skill-panel-${index}`}
									onclick={() => toggleSkill(index)}
								>
									<span>{group.title}</span>
									<span class="skill-card-icon" aria-hidden="true">{isOpen ? '-' : '+'}</span>
								</button>
							</h3>
							{#if isOpen}
								<div
									class="skill-panel"
									id={`skill-panel-${index}`}
									role="region"
									aria-labelledby={`skill-trigger-${index}`}
								>
									<ul class="content-list skill-detail-list">
										{#each group.items as item}
											<li>{item}</li>
										{/each}
									</ul>
								</div>
							{/if}
						</section>
					{/each}
				</div>

				{#if anySkillsOpen}
					<div class="skills-footer-actions">
						<button bind:this={bottomSkillsCollapse} class="section-reset-button" type="button" onclick={collapseSkills}>
							Collapse
						</button>
					</div>
				{/if}
			</section>
		{:else if sectionId === 'qualifications'}
			<section class="panel">
				<h2 class="qualifications-heading">Qualifications</h2>
				<ul class="content-list">
					{#each qualifications as item}
						<li>{item}</li>
					{/each}
				</ul>
			</section>
		{:else if sectionId === 'public_details'}
			<section class="panel" aria-label="Public details and contact channels">
				<h2 class="qualifications-heading">Public Details</h2>
				<ul class="content-list">
					<li>Location: {resumeLocation}</li>
					{#each resumePublicDetailItems as item (item.id)}
						<li>
							{item.label}:
							<button
								class="contact-copy-inline"
								class:contact-copy-inline-copied={copiedContactTarget === item.id}
								disabled={!resumeInteractionReady}
								type="button"
								aria-label={`Copy ${item.label}: ${item.copyValue}`}
								onclick={() => copyContactValue(item.copyValue, item.id)}
							>
								<span class="contact-copy-value">{item.displayValue}</span>
								<span class="contact-copy-inline-state" aria-hidden="true">
									{copiedContactTarget === item.id ? 'Copied' : 'Copy'}
								</span>
							</button>
						</li>
					{/each}
				</ul>

				<h2 class="qualifications-heading">Contact Channels</h2>
				<ul class="content-list">
					{#each resumeContactChannelItems as item (item.id)}
						<li>
							{item.label}:
							<button
								class="contact-copy-inline"
								class:contact-copy-inline-copied={copiedContactTarget === item.id}
								disabled={!resumeInteractionReady}
								type="button"
								aria-label={`Copy ${item.label}: ${item.copyValue}`}
								onclick={() => copyContactValue(item.copyValue, item.id)}
							>
								<span class="contact-copy-value">{item.displayValue}</span>
								<span class="contact-copy-inline-state" aria-hidden="true">
									{copiedContactTarget === item.id ? 'Copied' : 'Copy'}
								</span>
							</button>
						</li>
					{/each}
				</ul>

				<p class="sr-only" aria-live="polite">{copiedContactMessage}</p>
			</section>
		{/if}
	{/each}

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

	.hero-panel {
		gap: 0.5rem;
	}

	.hero-panel-content {
		display: grid;
		gap: 0.9rem;
	}

	.hero-copy {
		display: grid;
		gap: 0.5rem;
		min-width: 0;
		max-width: 68rem;
	}

	h1 {
		margin: 0;
		font-size: clamp(1.95rem, 4.8vw, 2.85rem);
		line-height: 0.98;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		color: #dce6f3;
	}

	h2,
	h3,
	h4,
	h5,
	p {
		margin: 0;
	}

	h2 {
		font-size: 1.08rem;
		line-height: 1.2;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #96dcff;
	}

	.focus-line,
	.experience-panel h3,
	.experience-panel h4,
	.experience-panel h5 {
		margin: 0;
		display: inline-block;
		width: fit-content;
		color: transparent;
		background: linear-gradient(90deg, #96dcff 0%, #a98cff 52%, #6fd8b6 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	h3 {
		font-size: 1rem;
		line-height: 1.25;
		color: #f3f7ff;
	}

	h4 {
		font-size: 0.94rem;
		line-height: 1.25;
		color: #bbdefb;
	}

	h5 {
		font-size: 0.83rem;
		line-height: 1.3;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #8ed4ff;
	}

	.hero-context {
		display: grid;
		gap: 0.42rem;
		max-width: 62rem;
		padding-top: 0.35rem;
	}

	.hero-context-label {
		font-size: 0.7rem;
		line-height: 1.1;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(127, 168, 214, 0.74);
	}

	.hero-context-list {
		display: grid;
		gap: 0.38rem;
		margin: 0;
		padding-left: 1.05rem;
		list-style: disc;
	}

	.hero-context-list li {
		font-size: 0.92rem;
		line-height: 1.48;
		color: #d3def1;
	}

	.hero-context-list li::marker {
		color: #92dbff;
	}

	.projection-control {
		display: grid;
		gap: 0.55rem;
		max-width: 62rem;
		padding-top: 0.2rem;
	}

	.projection-control-copy {
		display: grid;
		gap: 0.3rem;
	}

	.projection-note {
		font-size: 0.9rem;
		font-weight: 600;
		line-height: 1.45;
		color: #cfe6ff;
	}

	.projection-options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.44rem;
	}

	.projection-option {
		min-height: 2.25rem;
		padding: 0.42rem 0.72rem;
		border: 1px solid rgba(143, 205, 255, 0.26);
		border-radius: 999px;
		background: rgba(13, 24, 43, 0.72);
		color: #d7e8ff;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		font-size: 0.84rem;
		font-weight: 700;
		cursor: pointer;
	}

	.projection-option:hover,
	.projection-option-active {
		border-color: rgba(154, 214, 255, 0.54);
		background: rgba(25, 48, 84, 0.9);
		color: #f3f7ff;
	}

	.projection-option:focus-visible {
		outline: 2px solid rgba(141, 214, 255, 0.9);
		outline-offset: 2px;
	}
	.contact-copy-inline {
		display: inline-flex;
		align-items: baseline;
		gap: 0.45rem;
		min-height: 1.45em;
		margin: 0;
		padding: 0.08rem 0.18rem;
		border: 0;
		border-radius: 0.35rem;
		background: transparent;
		color: inherit;
		font: inherit;
		text-align: left;
		vertical-align: baseline;
		cursor: pointer;
	}

	.contact-copy-inline:disabled {
		cursor: default;
		opacity: 0.72;
	}

	.contact-copy-inline:focus-visible {
		outline: 2px solid rgba(141, 214, 255, 0.56);
		outline-offset: 0.16rem;
	}

	.contact-copy-inline:not(:disabled):hover {
		background: rgba(37, 67, 108, 0.28);
	}

	.contact-copy-value {
		color: transparent;
		background: linear-gradient(90deg, #96dcff 0%, #a98cff 52%, #6fd8b6 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.contact-copy-inline-state {
		color: #9fdcff;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		opacity: 0;
		transform: translateY(-0.02rem);
		transition:
			opacity 160ms ease,
			transform 160ms ease;
	}

	.contact-copy-inline:not(:disabled):hover .contact-copy-inline-state,
	.contact-copy-inline:focus-visible .contact-copy-inline-state,
	.contact-copy-inline-copied .contact-copy-inline-state {
		opacity: 1;
		transform: translateY(0);
	}

	.focus-line {
		font-size: 1.08rem;
		font-weight: 600;
		letter-spacing: 0.02em;
	}

		.experience-panel {
			gap: 0.9rem;
		}

	.employment-heading {
		display: grid;
		gap: 0.22rem;
	}

	.employment-title {
		font-size: 1.12rem;
		line-height: 1.25;
		letter-spacing: 0;
		text-transform: none;
		color: #f3f7ff;
	}

	.employment-meta,
	.scope-meta,
	.stage-period {
		font-size: 0.9rem;
		font-weight: 600;
		line-height: 1.42;
		color: #cfe6ff;
	}

	.scope-meta,
	.stage-period {
		color: #9fc7ee;
	}

	.experience-panel .core-role-start {
		color: transparent;
		background: linear-gradient(90deg, #96dcff 0%, #a98cff 52%, #6fd8b6 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.experience-panel h3,
	.experience-panel h4,
	.experience-panel h5 {
		font-size: 0.92rem;
		line-height: 1.48;
		font-weight: 700;
		letter-spacing: 0.01em;
	}

	.experience-panel h5 {
		text-transform: none;
	}

	.scope-card {
		display: grid;
		gap: 0.62rem;
		min-width: 0;
		padding: 0.88rem 0.92rem;
		border-radius: 0.84rem;
		border: 1px solid transparent;
		background:
			linear-gradient(rgba(18, 31, 57, 0.68), rgba(18, 31, 57, 0.68)) padding-box,
			linear-gradient(
					130deg,
					rgba(47, 209, 255, 0.24),
					rgba(110, 63, 177, 0.35),
					rgba(30, 141, 106, 0.32)
				)
				border-box;
		box-shadow:
			0 0 0 1px rgba(223, 239, 255, 0.03) inset,
			0 12px 26px rgba(6, 12, 28, 0.18);
	}

	.scope-card-nested,
	.scope-card-deep {
		background:
			linear-gradient(rgba(16, 26, 47, 0.74), rgba(16, 26, 47, 0.74)) padding-box,
			linear-gradient(135deg, rgba(91, 166, 255, 0.2), rgba(77, 221, 183, 0.18)) border-box;
	}

	.content-list {
		margin: 0;
		padding-left: 1.05rem;
		display: grid;
		gap: 0.38rem;
		list-style: disc;
	}

	.content-list li {
		font-size: 0.92rem;
		line-height: 1.48;
		color: #d3def1;
	}

	.content-list li::marker {
		color: #92dbff;
	}

	.core-role-start {
		font-size: 0.9rem;
		font-weight: 600;
		line-height: 1.48;
	}

	.progression-map {
		display: grid;
		gap: 0.72rem;
	}

	.progression-stage {
		display: grid;
		gap: 0.48rem;
		padding-left: 0.84rem;
		border-left: 1px solid rgba(128, 191, 241, 0.34);
	}

	.section-head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.5rem 0.75rem;
	}

	.section-head-copy {
		display: grid;
		gap: 0.24rem;
	}

	.section-note {
		font-size: 0.92rem;
		line-height: 1.48;
		font-weight: 600;
		color: #cfe6ff;
	}

	.qualifications-heading {
		font-size: 0.92rem;
		line-height: 1.48;
	}

	.section-reset-button {
		padding: 0.42rem 0.72rem;
		border: 1px solid rgba(143, 205, 255, 0.28);
		border-radius: 999px;
		background: rgba(13, 24, 43, 0.72);
		color: #d7e8ff;
			font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		font-size: 0.84rem;
		font-weight: 600;
		cursor: pointer;
	}

	.section-reset-button:hover {
		border-color: rgba(154, 214, 255, 0.42);
		background: rgba(18, 32, 56, 0.82);
	}

	.section-reset-button:focus-visible {
		outline: 2px solid rgba(141, 214, 255, 0.9);
		outline-offset: 2px;
	}

	.skills-grid {
		display: grid;
		gap: 0.6rem;
	}

	.skills-footer-actions {
		display: flex;
		justify-content: flex-end;
	}

	.skill-card {
		overflow: hidden;
		border: 1px solid rgba(150, 205, 255, 0.18);
		border-radius: 0.84rem;
		background: rgba(14, 24, 42, 0.44);
	}

	.skill-card-open {
		border-color: rgba(146, 219, 255, 0.4);
		background:
			linear-gradient(rgba(18, 31, 56, 0.76), rgba(18, 31, 56, 0.76)) padding-box,
			linear-gradient(135deg, rgba(94, 189, 255, 0.36), rgba(77, 221, 183, 0.24)) border-box;
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.04) inset,
			0 10px 24px rgba(5, 11, 26, 0.24);
	}

	.skill-card-title {
		margin: 0;
	}

	.skill-card-button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		gap: 0.75rem;
		padding: 0.82rem 0.92rem;
		cursor: pointer;
		border: 0;
		background: transparent;
		text-align: left;
			font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		font-size: 0.94rem;
		font-weight: 600;
		line-height: 1.35;
		color: #eff6ff;
	}

	.skill-card-button > span:first-child {
		color: transparent;
		background: linear-gradient(90deg, #96dcff 0%, #a98cff 52%, #6fd8b6 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		font-weight: 700;
		letter-spacing: 0.01em;
		line-height: 1.4;
	}

	.skill-card-button:focus-visible {
		outline: 2px solid rgba(141, 214, 255, 0.9);
		outline-offset: -2px;
	}

	.skill-card-icon {
		flex: 0 0 auto;
		font-size: 0.92rem;
		font-weight: 700;
		color: #9ad6ff;
	}

	.skill-panel {
		padding-bottom: 0.14rem;
	}

	.skill-detail-list {
		padding: 0 0.92rem 0.9rem 1.9rem;
	}

	.skill-detail-list li {
		font-size: 0.92rem;
		line-height: 1.52;
		color: #e2ecff;
	}

	.skill-detail-list li::marker {
		color: #8fe3ff;
	}

		@media (min-width: 960px) {
			.resume-page {
				max-width: 1320px;
				padding: 2rem 1.25rem calc(6.75rem + env(safe-area-inset-bottom));
				gap: 1.1rem;
			}

		.panel {
			padding: 1.2rem 1.25rem;
			border-radius: 1rem;
		}

		.hero-panel-content {
			grid-template-columns: 1fr;
			align-items: start;
			gap: 1rem;
		}

		h1 {
			font-size: clamp(2.35rem, 4.8vw, 3.2rem);
		}

		h2 {
			font-size: 1.16rem;
		}

		h3 {
			font-size: 1.08rem;
		}

		h4 {
			font-size: 1rem;
		}

		.focus-line {
			font-size: 1.5rem;
			line-height: 1.58;
		}

		.hero-context-list li {
			font-size: 1.5rem;
			line-height: 1.58;
		}

		.hero-context-label {
			font-size: 1rem;
			line-height: 1.25;
			color: #a7c8ef;
		}

		.projection-note {
			font-size: 1.18rem;
			line-height: 1.45;
		}

		.projection-option {
			font-size: 1rem;
			min-height: 2.5rem;
		}
		.contact-copy-inline-state {
			font-size: 0.92rem;
		}

		.resume-page p,
		.content-list li,
		.core-role-start,
		.section-note {
			font-size: 1.5rem;
			line-height: 1.58;
		}

		.employment-title {
			font-size: 1.7rem;
			line-height: 1.28;
		}

		.employment-meta {
			font-size: 1.28rem;
			line-height: 1.42;
		}

		.scope-meta,
		.stage-period {
			font-size: 1.2rem;
			line-height: 1.42;
		}

		.experience-panel h3,
		.experience-panel h4,
		.experience-panel h5 {
			font-size: 1.5rem;
			line-height: 1.58;
		}

		.skill-card-button {
			font-size: 1rem;
		}

		.skill-card-icon {
			font-size: 1.5rem;
		}

		.skill-detail-list li {
			font-size: 1.5rem;
			line-height: 1.58;
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
		.contact-copy-inline {
			gap: 0.38rem;
		}

		.contact-copy-inline-state {
			opacity: 0.72;
		}

		.panel,
		.scope-card {
			padding-inline: 0.9rem;
		}

		.skill-card-button {
			padding: 0.78rem 0.82rem;
			font-size: 0.9rem;
		}

		.skill-detail-list {
			padding-left: 1.65rem;
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
