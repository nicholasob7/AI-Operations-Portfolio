		<script lang="ts">
		import { browser } from '$app/environment';
		import DestinationActions, { type DestinationAction } from '$lib/components/DestinationActions.svelte';
		import {
			activeProjectActive,
			activeProjectCompleted,
			contextPoints,
			delegatedScope,
			progressionStages,
			qualifications,
			resumeContactChannelItems,
			resumeContactItems,
			resumeLocation,
			resumePublicDetailItems,
			technicalSkills,
			type ResumeContactTarget as ContactTarget
		} from '$lib/content/resume';
		import { getEntryImage, isPortraitEntry, resolveEntrySurface } from '$lib/entry-surfaces';
		import { canonicalOrigin } from '$lib/site';
		import { onMount, tick } from 'svelte';

	const resumePortraitHoldMs = 800;
	const resumePortraitFadeMs = 7200;
	const resumeTitle = "Nicholas Francis O'Brien | Resume";
	const resumeDescription =
		"Resume of Nicholas Francis O'Brien, focused on enterprise IT operations, process improvement, and AI-forward delivery.";
	const resumeIntroPendingClass = 'resume-intro-pending';
	const resumeEntrySurface = resolveEntrySurface('resume');
	const resumeEntryImage = getEntryImage(resumeEntrySurface);
	const resumeSocialImage = resumeEntryImage ? `${canonicalOrigin}${resumeEntryImage}` : null;
	const resumeUsesPortraitEntry = isPortraitEntry(resumeEntrySurface);

		let openSkillIndices = $state<number[]>([]);
		let showSkillsCollapseAction = $state(false);
	if (browser && resumeUsesPortraitEntry) {
		document.documentElement.classList.add(resumeIntroPendingClass);
	}

	let showResumePortraitOverlay = $state(browser && resumeUsesPortraitEntry);
	let fadeResumePortraitOverlay = $state(false);
		let resumeIntroBooting = $state(true);
		let resumeInteractionReady = $state(!resumeUsesPortraitEntry);
		let copiedContactTarget = $state<ContactTarget | null>(null);
		let contactCopyMenuOpen = $state(false);
		let topSkillsToggle = $state<HTMLButtonElement | null>(null);
		let bottomSkillsCollapse = $state<HTMLButtonElement | null>(null);
		let contactCopyMenuTrigger = $state<HTMLButtonElement | null>(null);
		let contactCopyMenuElement = $state<HTMLDivElement | null>(null);
	let resumeIntroImage = $state<HTMLImageElement | null>(null);
	let resumePortraitFadeTimer: ReturnType<typeof setTimeout> | null = null;
	let resumePortraitDismissTimer: ReturnType<typeof setTimeout> | null = null;
	let contactCopyResetTimer: ReturnType<typeof setTimeout> | null = null;

	const allSkillIndices = technicalSkills.map((_, index) => index);

	const allSkillsOpen = $derived(openSkillIndices.length === technicalSkills.length);
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
				href: '/resume-bw.pdf',
				download: 'Nicholas_Francis_OBrien_Resume_BW.pdf'
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

	const afterLayoutSettles = async () => {
		await tick();
		await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
		await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
	};

	const syncResumeIntroBodyState = () => {
		if (typeof document === 'undefined') return;
		document.body.classList.toggle('resume-intro-active', showResumePortraitOverlay);
	};

	const clearResumePortraitTimers = () => {
		if (resumePortraitFadeTimer) clearTimeout(resumePortraitFadeTimer);
		if (resumePortraitDismissTimer) clearTimeout(resumePortraitDismissTimer);
		resumePortraitFadeTimer = null;
		resumePortraitDismissTimer = null;
	};

	const clearResumeIntroPendingState = () => {
		if (typeof document === 'undefined') return;
		document.documentElement.classList.remove(resumeIntroPendingClass);
	};

	const completeResumeReveal = () => {
		showResumePortraitOverlay = false;
		fadeResumePortraitOverlay = false;
		resumeIntroBooting = false;
		resumeInteractionReady = true;
		syncResumeIntroBodyState();
		clearResumeIntroPendingState();
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

	const focusFirstContactCopyAction = async () => {
		await tick();
		contactCopyMenuElement?.querySelector<HTMLButtonElement>('.contact-copy-menu-item')?.focus();
	};

	const closeContactCopyMenu = ({ restoreFocus = false } = {}) => {
		contactCopyMenuOpen = false;
		if (restoreFocus) {
			void tick().then(() => contactCopyMenuTrigger?.focus());
		}
	};

	const toggleContactCopyMenu = () => {
		if (contactCopyMenuOpen) {
			closeContactCopyMenu();
			return;
		}

		contactCopyMenuOpen = true;
		void focusFirstContactCopyAction();
	};

	const handleResumeKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && contactCopyMenuOpen) {
			event.preventDefault();
			closeContactCopyMenu({ restoreFocus: true });
		}
	};

	const waitForResumePortraitImage = async () => {
		const image = resumeIntroImage;
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
		const handleScroll = () => {
			updateActionAvailability();
		};

		showResumePortraitOverlay = resumeUsesPortraitEntry;
		fadeResumePortraitOverlay = false;
		resumeIntroBooting = resumeUsesPortraitEntry;
		resumeInteractionReady = !resumeUsesPortraitEntry;
		syncResumeIntroBodyState();

		window.scrollTo({ top: 0, behavior: 'auto' });
		updateActionAvailability();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll);

		if (!resumeUsesPortraitEntry) {
			clearResumeIntroPendingState();
			return () => {
				clearResumePortraitTimers();
				clearResumeIntroPendingState();
				document.body.classList.remove('resume-intro-active');
				window.removeEventListener('scroll', handleScroll);
				window.removeEventListener('resize', handleScroll);
			};
		}

		void afterLayoutSettles().then(async () => {
			if (!showResumePortraitOverlay) return;

			await waitForResumePortraitImage();
			if (!showResumePortraitOverlay) return;

			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			if (prefersReducedMotion) {
				resumePortraitDismissTimer = setTimeout(() => {
					resumePortraitDismissTimer = null;
					completeResumeReveal();
				}, resumePortraitHoldMs);
				return;
			}

			resumePortraitFadeTimer = setTimeout(() => {
				resumePortraitFadeTimer = null;
				resumeIntroBooting = false;
				resumeInteractionReady = true;
				fadeResumePortraitOverlay = true;
				clearResumeIntroPendingState();
				resumePortraitDismissTimer = setTimeout(() => {
					resumePortraitDismissTimer = null;
					completeResumeReveal();
				}, resumePortraitFadeMs);
			}, resumePortraitHoldMs);
		});

		return () => {
			clearResumePortraitTimers();
			if (contactCopyResetTimer) clearTimeout(contactCopyResetTimer);
			clearResumeIntroPendingState();
			document.body.classList.remove('resume-intro-active');
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	});

	$effect(() => {
		openSkillIndices.length;
		if (typeof window === 'undefined') return;
		void tick().then(() => {
			updateActionAvailability();
		});
	});
</script>

<svelte:window onkeydown={handleResumeKeydown} />

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

{#if resumeEntryImage}
	<div
		class:resume-intro-overlay-boot={resumeIntroBooting}
		class:resume-intro-overlay-active={showResumePortraitOverlay}
		class:resume-intro-overlay-fading={fadeResumePortraitOverlay}
		class="resume-intro-overlay"
		aria-hidden="true"
	>
		<img
			bind:this={resumeIntroImage}
			class="resume-intro-overlay-image"
			src={resumeEntryImage}
			alt=""
			width="1254"
			height="1254"
			decoding="async"
			fetchpriority="high"
		/>
	</div>
{/if}

<main
	id="resume-top"
	class:resume-intro-content-boot={resumeIntroBooting}
	class:resume-intro-content-hidden={showResumePortraitOverlay && !fadeResumePortraitOverlay}
	class:resume-intro-content-crossfading={fadeResumePortraitOverlay}
	class="resume-page"
>
	<DestinationActions actions={resumeActions} panelId="resume-destination-actions" />

	<header class="panel hero-panel">
		<div class="hero-panel-content">
			<div class="hero-copy">
				<h1>Nicholas Francis O'Brien</h1>
				<p class="focus-line">AI-Forward | Enterprise IT Operations | Process Improvement</p>
				<div class="hero-context" aria-label="Context">
					<p class="hero-context-label">Context</p>
					<ul class="hero-context-list">
						{#each contextPoints as point}
							<li>{point}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</header>

	<section class="panel experience-panel">
		<h2>NTT, Wellington — Present</h2>

		<div class="scope-grid">
			<section class="scope-card">
				<h3>Initiative in Scope</h3>

				<section class="scope-card scope-card-nested">
					<h4>Active Project</h4>

					<section class="scope-card scope-card-deep">
						<h5>Completed</h5>
						<ul class="content-list">
							{#each activeProjectCompleted as point}
								<li>{point}</li>
							{/each}
						</ul>
					</section>

					<section class="scope-card scope-card-deep">
						<h5>Active</h5>
						<ul class="content-list">
							{#each activeProjectActive as point}
								<li>{point}</li>
							{/each}
						</ul>
					</section>
				</section>
			</section>

			<section class="scope-card">
				<h3>Delegated Scope</h3>
				<ul class="content-list">
					{#each delegatedScope as point}
						<li>{point}</li>
					{/each}
				</ul>
			</section>
		</div>

		<section class="scope-card">
			<h3>Role Progression Map</h3>
			<p class="core-role-start">From service desk baseline to AI-forward operational delivery.</p>
			<div class="progression-map">
				{#each progressionStages as stage}
					<section class="progression-stage">
						<h4>{stage.title}</h4>
						<ul class="content-list">
							{#each stage.items as point}
								<li>{point}</li>
							{/each}
						</ul>
					</section>
				{/each}
			</div>
		</section>
	</section>

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
			{#each technicalSkills as group, index}
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

	<section class="panel">
		<h2 class="qualifications-heading">Qualifications</h2>
		<ul class="content-list">
			{#each qualifications as item}
				<li>{item}</li>
			{/each}
		</ul>
	</section>

	<section class="panel" aria-label="Public details and contact channels">
		<h2 class="qualifications-heading">Public Details</h2>
		<ul class="content-list">
			<li>Location: {resumeLocation}</li>
			{#each resumePublicDetailItems as item (item.id)}
				<li>{item.label}: <span class="contact-copy-value">{item.displayValue}</span></li>
			{/each}
		</ul>

		<h2 class="qualifications-heading">Contact Channels</h2>
		<ul class="content-list">
			{#each resumeContactChannelItems as item (item.id)}
				<li>{item.label}: <span class="contact-copy-value">{item.displayValue}</span></li>
			{/each}
		</ul>

		<div class="contact-copy-menu-wrap">
			<button
				bind:this={contactCopyMenuTrigger}
				aria-controls="resume-contact-copy-menu"
				aria-expanded={contactCopyMenuOpen}
				class:contact-copy-menu-trigger-disabled={!resumeInteractionReady}
				class="contact-copy-menu-trigger"
				disabled={!resumeInteractionReady}
				type="button"
				onclick={toggleContactCopyMenu}
			>
				{contactCopyMenuOpen ? 'Close menu' : 'Copy menu'}
			</button>
			{#if contactCopyMenuOpen}
				<div
					bind:this={contactCopyMenuElement}
					class="contact-copy-menu"
					id="resume-contact-copy-menu"
					aria-label="Copy contact value"
				>
					{#each resumeContactItems as item (item.id)}
						<button
							class="contact-copy-menu-item"
							type="button"
							onclick={() => copyContactValue(item.copyValue, item.id)}
						>
							<span>{item.label}</span>
							<span class="contact-copy-menu-state">
								{copiedContactTarget === item.id ? 'Copied' : 'Copy'}
							</span>
						</button>
					{/each}
				</div>
			{/if}
		</div>
		<p class="sr-only" aria-live="polite">{copiedContactMessage}</p>
	</section>

		</main>

	<style>
		:global(html) {
			scrollbar-gutter: stable;
		}

		:global(body.resume-intro-active) {
			overflow-x: hidden;
			overflow-y: scroll;
		}

		:global(body) {
			color: #e7edf8;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
			background:
				radial-gradient(circle at 10% 0%, rgba(39, 102, 171, 0.24), transparent 32%),
				radial-gradient(circle at 90% 10%, rgba(29, 131, 113, 0.22), transparent 28%),
				linear-gradient(165deg, #070d18 0%, #111b2f 55%, #0c1629 100%);
		}

		:global(html.resume-intro-pending body) {
			margin: 0;
			overflow-x: hidden;
			overflow-y: scroll;
		}

		.resume-intro-overlay {
			position: fixed;
			inset: 0;
			z-index: 120;
			display: grid;
			place-items: center;
			padding: 1.25rem;
			opacity: 0;
			visibility: hidden;
			pointer-events: none;
			transform: translateY(0) scale(1);
			background:
				radial-gradient(circle at 50% 18%, rgba(74, 113, 171, 0.24) 0%, rgba(9, 16, 29, 0) 42%),
				linear-gradient(180deg, #060b14 0%, #0f1a2d 100%);
				transition:
					opacity 7200ms cubic-bezier(0.12, 0.72, 0.16, 1),
					transform 7200ms cubic-bezier(0.12, 0.72, 0.16, 1);
		}

		.resume-intro-overlay::after {
			content: '';
			position: absolute;
			inset: 0;
			background:
				linear-gradient(180deg, rgba(8, 12, 22, 0.04) 0%, rgba(8, 12, 22, 0.18) 100%),
				linear-gradient(90deg, rgba(8, 12, 22, 0.22) 0%, rgba(8, 12, 22, 0.06) 20%, rgba(8, 12, 22, 0.06) 80%, rgba(8, 12, 22, 0.22) 100%);
		}

		.resume-intro-overlay.resume-intro-overlay-active {
			opacity: 1;
			visibility: visible;
		}

		.resume-intro-overlay.resume-intro-overlay-boot {
			opacity: 1;
			visibility: visible;
		}

		:global(html.resume-intro-pending) .resume-intro-overlay.resume-intro-overlay-boot {
			transform: none;
			transition: none;
		}

		.resume-intro-overlay.resume-intro-overlay-fading {
			opacity: 0;
			transform: scale(1.003);
		}

		.resume-intro-overlay-image {
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

		.resume-page {
			max-width: 1320px;
			margin: 0 auto;
			padding: 1.2rem 1rem calc(6.5rem + env(safe-area-inset-bottom));
			display: grid;
			gap: 0.9rem;
			opacity: 1;
				transition: opacity 7200ms cubic-bezier(0.12, 0.72, 0.16, 1);
		}

		.resume-page.resume-intro-content-hidden {
			opacity: 0;
		}

		.resume-page.resume-intro-content-boot {
			opacity: 0;
		}

		:global(html.resume-intro-pending) .resume-page.resume-intro-content-boot {
			opacity: 0;
			transition: none;
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

	.contact-copy-value {
		color: transparent;
		background: linear-gradient(90deg, #96dcff 0%, #a98cff 52%, #6fd8b6 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.contact-copy-menu-wrap {
		position: relative;
		justify-self: end;
		grid-column: 1 / -1;
		width: max-content;
		max-width: 100%;
		padding-top: 0.65rem;
	}

	.contact-copy-menu-trigger {
		position: relative;
		isolation: isolate;
		min-height: 2.12rem;
		padding: 0.54rem 0.9rem;
		border: 1px solid transparent;
		border-radius: 999px;
		background:
			linear-gradient(120deg, rgba(12, 22, 42, 0.96), rgba(16, 30, 52, 0.96)) padding-box,
			linear-gradient(120deg, #2fd1ff 0%, #9a63e8 52%, #39c69a 100%) border-box;
		color: #f8fbff;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		text-shadow: 0 1px 2px rgba(3, 8, 20, 0.72);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.05) inset,
			0 12px 26px rgba(4, 9, 22, 0.3);
		cursor: pointer;
	}

	.contact-copy-menu-trigger::before {
		content: '';
		position: absolute;
		inset: -3px;
		z-index: -1;
		border-radius: inherit;
		background: linear-gradient(
			120deg,
			rgba(47, 209, 255, 0.28),
			rgba(154, 99, 232, 0.22),
			rgba(57, 198, 154, 0.24)
		);
		filter: blur(7px);
		opacity: 0.42;
		pointer-events: none;
	}

	.contact-copy-menu-trigger:hover,
	.contact-copy-menu-trigger:focus-visible {
		background:
			linear-gradient(120deg, rgba(17, 31, 54, 0.98), rgba(21, 39, 60, 0.98)) padding-box,
			linear-gradient(120deg, #2fd1ff 0%, #9a63e8 52%, #39c69a 100%) border-box;
		outline: none;
	}

	.contact-copy-menu-trigger:focus-visible {
		box-shadow:
			0 0 0 2px rgba(141, 214, 255, 0.5),
			0 12px 26px rgba(4, 9, 22, 0.3);
	}

		.contact-copy-menu-trigger:disabled {
			opacity: 0.68;
			cursor: default;
		}

		.contact-copy-menu-trigger-disabled {
			pointer-events: none;
		}

	.contact-copy-menu {
		position: absolute;
		right: 0;
		bottom: calc(100% + 0.5rem);
		z-index: 20;
		display: grid;
		gap: 0.18rem;
		width: min(15rem, calc(100vw - 2.2rem));
		padding: 0.42rem;
		border: 1px solid rgba(167, 213, 255, 0.3);
		border-radius: 0.82rem;
		background: rgba(10, 18, 34, 0.97);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.035) inset,
			0 16px 34px rgba(4, 9, 22, 0.38);
	}

	.contact-copy-menu-item {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 0.85rem;
		align-items: center;
		width: 100%;
		padding: 0.46rem 0.5rem;
		border: 0;
		border-radius: 0.55rem;
		background: transparent;
		color: #dce8fb;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		font-size: 0.86rem;
		font-weight: 700;
		text-align: left;
		cursor: pointer;
	}

	.contact-copy-menu-item:hover,
	.contact-copy-menu-item:focus-visible {
		background: rgba(37, 67, 108, 0.56);
		outline: none;
	}

	.contact-copy-menu-state {
		color: #9fdcff;
		font-size: 0.76rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.focus-line {
		font-size: 1.08rem;
		font-weight: 600;
		letter-spacing: 0.02em;
	}

		.experience-panel {
			gap: 0.9rem;
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

	.scope-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.8rem;
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

		.contact-copy-menu-trigger,
		.contact-copy-menu-item {
			font-size: 1rem;
		}

		.contact-copy-menu-state {
			font-size: 0.92rem;
		}

		.resume-page p,
		.content-list li,
		.core-role-start,
		.section-note {
			font-size: 1.5rem;
			line-height: 1.58;
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

		.contact-copy-menu-wrap {
			justify-self: end;
			width: max-content;
			max-width: 100%;
		}

		.contact-copy-menu {
			position: absolute;
			width: min(15rem, calc(100vw - 2.2rem));
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
			.resume-intro-overlay {
				display: none !important;
			}

			.resume-page {
				opacity: 1 !important;
				transition: none !important;
			}
		}
	</style>
