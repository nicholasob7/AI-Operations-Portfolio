	<script lang="ts">
	import { browser } from '$app/environment';
	import { getEntryImage, isPortraitEntry, resolveEntrySurface } from '$lib/entry-surfaces';
	import { onMount, tick } from 'svelte';

	const resumeLocation = 'Lower Hutt, New Zealand';
	const resumeContactEmail = 'nicko.obrien.ai@gmail.com';
	const resumeLinkedInProfilePath = 'linkedin.com/in/nicholasfobrien/';
	const resumeTwitterProfilePath = 'x.com/nicho0101';
	const resumePortraitHoldMs = 800;
	const resumePortraitFadeMs = 7200;
	const resumeIntroPendingClass = 'resume-intro-pending';
	const resumeEntrySurface = resolveEntrySurface('resume');
	const resumeEntryImage = getEntryImage(resumeEntrySurface);
	const resumeUsesPortraitEntry = isPortraitEntry(resumeEntrySurface);

	type SkillGroup = {
		title: string;
		items: string[];
	};

	type ProgressionStage = {
		title: string;
		items: string[];
	};

	const contextPoints = [
		'Deeply engaged in learning and applying AI in my own time.',
		'Building projects at different scales.',
		'Personal investment supports continued technical growth.'
	];

	const activeProjectCompleted = [
		'Built an AI-assisted endpoint fix script for a major vendor application.',
		'This involved AI-assisted research and coding.',
		'Observed application behaviour under different conditions.',
		'Tested approaches and script versions on a dedicated test device.',
		'The script passed validation and entered production for individual endpoint failures.',
		'L2 bundling with the existing install package failed.',
		'The script was not at fault.',
		'This led to investigation of the install package itself.'
	];

	const activeProjectActive = [
		'Rebuilding the enterprise app package from the proven fix.',
		'Test-device validation is complete.',
		'Further rollout stages remain.'
	];

	const delegatedScope = [
		'I manage the printer queue serviced by a major external vendor.',
		'Supported a printer vendor transition through vendor liaison and project work.',
		'Resolved printer configuration issues beyond normal front-line scope.',
		'Reduced avoidable escalation.',
		'Reworked a fragmented multi-ticket process using bulk changes, filter logic, and cross-ticket linkage.',
		'Improved traceability across related requests.',
		'Cut staff time and repeat work.',
		'Advised on preserving classification and workflow visibility during the transition away from the three-ticket vendor model.'
	];

	const progressionStages: ProgressionStage[] = [
		{
			title: 'Service Desk Foundation',
			items: [
				'Began in November 2022 in a 5,000+ user environment across shared-service and single-organisation clients.',
				'Supported clients in transport, healthcare, energy, regional government, and consumer goods.',
				'Handled incidents and service requests from triage through resolution, documentation, and escalation.',
				'Resolved user, device, application, and access issues through remote support.'
			]
		},
		{
			title: 'Trusted Operational Scope',
			items: [
				'Progressed into dedicated BAU support for a major transport-sector client.',
				'Worked in a team sustaining 90%+ first-contact resolution.',
				'Analysed endpoint performance and device health issues as part of day-to-day support.',
				'Managed identity, access, and account lifecycle tasks within service desk scope.'
			]
		},
		{
			title: 'Specialist and Improvement Scope',
			items: [
				'Became the SME for privileged access requests across admin, local admin, shared, and external account types.',
				'Took on vendor-facing queue and transition responsibilities beyond normal front-line scope.',
				'Reworked a fragmented multi-ticket process using bulk changes, filter logic, and cross-ticket linkage.',
				'Reduced avoidable escalation, improved traceability, and cut staff time and repeat work.'
			]
		},
		{
			title: 'AI-Forward Operational Delivery',
			items: [
				'Applied AI-assisted research and coding to build an endpoint remediation script for a major vendor application.',
				'Moved the work from test-device validation into controlled production use for individual endpoint failures.',
				'Turned remediation results into evidence for package investigation and rebuild work.',
				'Continued into enterprise package reconstruction from the proven fix.'
			]
		}
	];

	const technicalSkills: SkillGroup[] = [
		{
			title: 'Identity and access administration',
			items: [
				'Active Directory',
				'Entra ID',
				'local admin',
				'guest accounts',
				'privileged access',
				'account lifecycle'
			]
		},
		{
			title: 'Messaging and Microsoft 365 support',
			items: [
				'Exchange Online',
				'mailbox creation',
				'mailbox access',
				'shared mailboxes',
				'distribution groups',
				'Microsoft 365 support'
			]
		},
		{
			title: 'Endpoint and device administration',
			items: [
				'Intune',
				'compliance',
				'BitLocker recovery',
				'Windows support',
				'drivers',
				'disk space',
				'device administration'
			]
		},
		{
			title: 'Enterprise applications and deployment',
			items: [
				'vendor applications',
				'packaged installs',
				'application faults',
				'cache issues',
				'shortcut issues',
				'deployment support'
			]
		},
		{
			title: 'Network and connectivity troubleshooting',
			items: [
				'DNS issues',
				'connectivity faults',
				'first-line network diagnosis',
				'escalation to specialist teams'
			]
		},
		{
			title: 'Service operations and remote support',
			items: [
				'Jira Service Management',
				'triage',
				'incident and request handling',
				'escalation',
				'queue workflows',
				'remote support'
			]
		},
		{
			title: 'Knowledge, process, and documentation',
			items: [
				'documentation',
				'knowledge base use and creation',
				'troubleshooting steps',
				'workflow traceability'
			]
		},
		{
			title: 'AI in IT operations',
			items: [
				'AI-assisted research',
				'troubleshooting',
				'scripting',
				'package rebuild',
				'workflow improvement'
			]
		}
	];

	const qualifications = [
		'AWS Certified Cloud Practitioner',
		'AWS Foundations of Cloud Computing — Unitec / Te Pūkenga',
		'Bachelor of Arts, History and Political Science — Griffith University',
		'NTT internal certifications, including AI training'
	];

	let openSkillIndices = $state<number[]>([]);
	let showScrollActions = $state(false);
	let showSkillsCollapseAction = $state(false);
	if (browser && resumeUsesPortraitEntry) {
		document.documentElement.classList.add(resumeIntroPendingClass);
	}

	let showResumePortraitOverlay = $state(browser && resumeUsesPortraitEntry);
	let fadeResumePortraitOverlay = $state(false);
	let resumeIntroBooting = $state(true);
	let resumeInteractionReady = $state(!resumeUsesPortraitEntry);
	let resumeRevealSettled = $state(false);
	let copiedContactTarget = $state<'email' | 'linkedin' | 'twitter' | null>(null);
	let bottomActions = $state<HTMLDivElement | null>(null);
	let heroPanel = $state<HTMLElement | null>(null);
	let topSkillsToggle = $state<HTMLButtonElement | null>(null);
	let bottomSkillsCollapse = $state<HTMLButtonElement | null>(null);
	let resumeIntroImage = $state<HTMLImageElement | null>(null);
	let resumePortraitFadeTimer: ReturnType<typeof setTimeout> | null = null;
	let resumePortraitDismissTimer: ReturnType<typeof setTimeout> | null = null;
	let contactCopyResetTimer: ReturnType<typeof setTimeout> | null = null;

	const allSkillIndices = technicalSkills.map((_, index) => index);

	const allSkillsOpen = $derived(openSkillIndices.length === technicalSkills.length);
	const anySkillsOpen = $derived(openSkillIndices.length > 0);

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

	const bottomActionsVisible = () => {
		if (!bottomActions) return false;

		const rect = bottomActions.getBoundingClientRect();
		return rect.top < window.innerHeight - 24 && rect.bottom > 24;
	};

	const heroPanelScrolledOut = () => {
		if (!heroPanel) return false;

		const rect = heroPanel.getBoundingClientRect();
		return rect.bottom < 24;
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

	const updateFloatingActions = () => {
		const hideForBottomActions = bottomActionsVisible();
		showScrollActions = !hideForBottomActions && heroPanelScrolledOut();

		showSkillsCollapseAction =
			anySkillsOpen && topSkillsToggleScrolledOut() && !bottomSkillsCollapseVisible();
	};

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
		resumeRevealSettled = true;
		syncResumeIntroBodyState();
		clearResumeIntroPendingState();
	};

	const copyText = async (value: string, target: 'email' | 'linkedin' | 'twitter') => {
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

	const copyEmail = async () => {
		await copyText(resumeContactEmail, 'email');
	};

	const copyLinkedInProfilePath = async () => {
		await copyText(resumeLinkedInProfilePath, 'linkedin');
	};

	const copyTwitterProfilePath = async () => {
		await copyText(resumeTwitterProfilePath, 'twitter');
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
			updateFloatingActions();
		};

		showResumePortraitOverlay = resumeUsesPortraitEntry;
		fadeResumePortraitOverlay = false;
		resumeIntroBooting = resumeUsesPortraitEntry;
		resumeInteractionReady = !resumeUsesPortraitEntry;
		resumeRevealSettled = !resumeUsesPortraitEntry;
		syncResumeIntroBodyState();

		window.scrollTo({ top: 0, behavior: 'auto' });
		updateFloatingActions();
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
			updateFloatingActions();
		});
	});
</script>

	<svelte:head>
		<title>Nicholas Francis O'Brien | Resume</title>
		<meta
			name="description"
			content="Resume of Nicholas Francis O'Brien, focused on enterprise IT operations, process improvement, and AI-forward delivery."
		/>
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
		{#if showScrollActions && resumeRevealSettled}
			<div class="resume-scroll-actions">
				{#if showSkillsCollapseAction}
					<button class="section-reset-button resume-scroll-collapse" type="button" onclick={collapseSkills}>
					Collapse
				</button>
			{/if}
			<a
				class="resume-print-link resume-print-link-bw"
				href="/resume-bw.pdf"
				download="Nicholas_Francis_OBrien_Resume_BW.pdf"
			>
				Print
			</a>
				<a
					class="resume-home-link"
					data-sveltekit-preload-code="hover"
					href="/"
				>
					Home
				</a>
		</div>
	{/if}

		<header bind:this={heroPanel} class="panel hero-panel">
			<div class="hero-panel-content">
				<div class="hero-copy">
					<h1>Nicholas Francis O'Brien</h1>
					<p class="focus-line">AI-Forward | Enterprise IT Operations | Process Improvement</p>
					<div class="contact-band" aria-label="Contact details">
						<div class="contact-band-row contact-band-row-static">
							<span class="contact-band-value">{resumeLocation}</span>
						</div>
						<div class="contact-band-row">
							<span class="contact-band-value">{resumeContactEmail}</span>
							<button
								class="contact-copy-button"
								disabled={!resumeInteractionReady}
								type="button"
								onclick={copyEmail}
								style:pointer-events={resumeInteractionReady ? 'auto' : 'none'}
							>
								{copiedContactTarget === 'email' ? 'Copied' : 'Copy'}
							</button>
						</div>
						<div class="contact-band-row">
							<span class="contact-band-value">{resumeLinkedInProfilePath}</span>
							<button
								class="contact-copy-button"
								disabled={!resumeInteractionReady}
								type="button"
								onclick={copyLinkedInProfilePath}
								style:pointer-events={resumeInteractionReady ? 'auto' : 'none'}
							>
								{copiedContactTarget === 'linkedin' ? 'Copied' : 'Copy'}
							</button>
						</div>
						<div class="contact-band-row">
							<span class="contact-band-value">{resumeTwitterProfilePath}</span>
							<button
								class="contact-copy-button"
								disabled={!resumeInteractionReady}
								type="button"
								onclick={copyTwitterProfilePath}
								style:pointer-events={resumeInteractionReady ? 'auto' : 'none'}
							>
								{copiedContactTarget === 'twitter' ? 'Copied' : 'Copy'}
							</button>
						</div>
						<p class="sr-only" aria-live="polite">
							{copiedContactTarget === 'email'
								? 'Email address copied to clipboard.'
								: copiedContactTarget === 'linkedin'
									? 'LinkedIn profile URL copied to clipboard.'
									: copiedContactTarget === 'twitter'
										? 'X slash Twitter profile URL copied to clipboard.'
										: ''}
						</p>
					</div>
				</div>
			</div>
		</header>

	<section class="panel">
		<h2>Context</h2>
		<ul class="content-list">
			{#each contextPoints as point}
				<li>{point}</li>
			{/each}
		</ul>
	</section>

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

	<div bind:this={bottomActions} class="resume-actions">
		<a
			class="resume-print-link resume-print-link-bw"
			href="/resume-bw.pdf"
			download="Nicholas_Francis_OBrien_Resume_BW.pdf"
		>
			Print
		</a>
			<a
				class="resume-home-link"
				data-sveltekit-preload-code="hover"
				href="/"
			>
				Home
			</a>
		<a class="resume-home-link" href="#resume-top">Top</a>
		</div>
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
			padding: 1.2rem 1rem 2.4rem;
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
	}

	.hero-portrait {
		width: clamp(5.25rem, 22vw, 6.5rem);
		aspect-ratio: 1;
		justify-self: start;
		overflow: hidden;
		border-radius: 0.95rem;
		border: 1px solid rgba(148, 208, 255, 0.34);
		background: rgba(12, 20, 35, 0.72);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.04) inset,
			0 12px 22px rgba(4, 9, 22, 0.18);
	}

	.hero-portrait img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 28%;
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

	.hero-subtitle,
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

	.hero-subtitle {
		font-size: 1.35rem;
		line-height: 1.12;
		font-weight: 600;
		letter-spacing: 0.02em;
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

	.contact-band {
		display: grid;
		gap: 0.5rem;
		max-width: 52rem;
	}

	.contact-band-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 0.55rem;
		align-items: stretch;
	}

	.contact-band-row-static {
		grid-template-columns: minmax(0, 1fr);
	}

	.contact-band-value {
		display: flex;
		align-items: center;
		min-width: 0;
		min-height: 2.6rem;
		padding: 0.52rem 0.82rem;
		border-radius: 0.84rem;
		border: 1px solid rgba(148, 208, 255, 0.22);
		background:
			linear-gradient(rgba(18, 31, 57, 0.68), rgba(18, 31, 57, 0.68)) padding-box,
			linear-gradient(135deg, rgba(91, 166, 255, 0.2), rgba(77, 221, 183, 0.18)) border-box;
		font-size: 0.92rem;
		line-height: 1.4;
		color: #c7d6ec;
		word-break: break-word;
		user-select: text;
	}

	.contact-copy-button {
		padding: 0.52rem 0.82rem;
		border: 1px solid rgba(143, 205, 255, 0.28);
		border-radius: 999px;
		background: rgba(13, 24, 43, 0.72);
		color: #d7e8ff;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		font-size: 0.84rem;
		font-weight: 600;
		cursor: pointer;
	}

	.contact-copy-button:hover {
		border-color: rgba(154, 214, 255, 0.42);
		background: rgba(18, 32, 56, 0.82);
	}

	.contact-copy-button:focus-visible {
		outline: 2px solid rgba(141, 214, 255, 0.9);
		outline-offset: 2px;
	}

	.contact-copy-button:disabled {
		opacity: 0.6;
		cursor: default;
	}

	.focus-line {
		font-size: 1.08rem;
		font-weight: 600;
		letter-spacing: 0.02em;
	}

	a {
		color: #9ed7ff;
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

	.resume-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		justify-content: flex-start;
	}

	.resume-scroll-actions {
		position: fixed;
		top: 0.85rem;
		right: max(1rem, calc((100vw - 1320px) / 2 + 1rem));
		z-index: 30;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: flex-end;
		pointer-events: auto;
	}

	.resume-scroll-actions .resume-print-link,
	.resume-scroll-actions .resume-home-link,
	.resume-scroll-actions .resume-scroll-collapse {
		min-height: 2.45rem;
		padding: 0.56rem 0.92rem;
		font-size: 0.84rem;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.04) inset,
			0 10px 22px rgba(4, 9, 22, 0.2);
	}

	.resume-scroll-actions .resume-print-link {
		background: transparent;
	}

	.resume-scroll-actions .resume-home-link {
		background: transparent;
	}

	.resume-scroll-actions .resume-scroll-collapse {
		background: transparent;
	}

	.resume-print-link,
	.resume-home-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.8rem;
		padding: 0.72rem 1.1rem;
		border: 1px solid rgba(181, 226, 197, 0.45);
		border-radius: 999px;
		text-decoration: none;
		font-size: 0.92rem;
		font-weight: 700;
		letter-spacing: 0.01em;
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.03) inset,
			0 12px 24px rgba(4, 9, 22, 0.24);
	}

	.resume-print-link {
		background: linear-gradient(135deg, rgba(87, 112, 147, 0.88), rgba(79, 120, 101, 0.88));
		color: #f4f8ff;
	}

	.resume-home-link {
		background: rgba(20, 32, 53, 0.85);
		border-color: rgba(148, 202, 255, 0.28);
		color: #d9e9ff;
	}

	.resume-scroll-collapse {
		backdrop-filter: blur(10px);
	}

	@media (min-width: 960px) {
		.resume-page {
			max-width: 1320px;
			padding: 2rem 1.25rem 3rem;
			gap: 1.1rem;
		}

		.panel {
			padding: 1.2rem 1.25rem;
			border-radius: 1rem;
		}

		.hero-panel-content {
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: center;
			gap: 1.35rem;
		}

		.hero-portrait {
			width: 7rem;
			justify-self: end;
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

		.contact-band-value {
			font-size: 0.98rem;
			min-height: 2.8rem;
			padding: 0.6rem 0.95rem;
		}

		.contact-copy-button {
			font-size: 0.9rem;
			padding: 0.6rem 0.95rem;
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

		.resume-print-link,
		.resume-home-link,
		.resume-scroll-collapse {
			font-size: 0.96rem;
		}
	}

		@media (max-width: 760px) {
			.resume-page {
				padding: 1rem 0.85rem 1.9rem;
		}
	}

	@media (max-width: 520px) {
		h1 {
			font-size: clamp(1.75rem, 9vw, 2.4rem);
		}

		.focus-line {
			font-size: 0.92rem;
		}

		.contact-band-row {
			grid-template-columns: 1fr;
		}

		.contact-band-value,
		.contact-copy-button {
			width: 100%;
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

		.resume-print-link,
		.resume-home-link,
		.resume-scroll-collapse {
			width: 100%;
		}

		.resume-scroll-actions {
			top: 0.55rem;
			right: 0.85rem;
			left: auto;
			gap: 0.35rem;
			padding: 0.35rem;
			border: 1px solid rgba(167, 213, 255, 0.22);
			border-radius: 999px;
			box-shadow:
				0 0 0 1px rgba(255, 255, 255, 0.05) inset,
				0 12px 26px rgba(4, 9, 22, 0.28);
			justify-content: flex-end;
		}

		.resume-scroll-actions .resume-print-link,
		.resume-scroll-actions .resume-home-link,
		.resume-scroll-actions .resume-scroll-collapse {
			width: auto;
			min-width: 0;
			padding: 0.56rem 0.8rem;
		}

		.resume-scroll-actions .resume-print-link {
			order: 1;
		}

		.resume-scroll-actions .resume-home-link {
			order: 2;
		}

		.resume-scroll-actions .resume-scroll-collapse {
				order: 3;
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
