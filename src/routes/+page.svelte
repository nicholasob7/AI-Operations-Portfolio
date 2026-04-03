<script lang="ts">
	import { onDestroy } from 'svelte';

	const contactEmail = 'nicko.obrien.ai@gmail.com';
	const linkedInUrl = 'https://www.linkedin.com/in/nicholasfobrien';
	const githubUrl = 'https://github.com/nicholasob7';
	const twitterUrl = 'https://x.com/nicho0101';
	let showResumeOptions = $state(false);
	let showEmailOptions = $state(false);
	let showSocialOptions = $state(false);
	let showElioraDetail = $state(false);
	let showSemanticDetail = $state(false);
	let copied = $state(false);
	let showEmailText = $state(false);
	let copyResetTimer: ReturnType<typeof setTimeout> | null = null;

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
		showEmailOptions = !showEmailOptions;
		if (!showEmailOptions) {
			showEmailText = false;
			copied = false;
			if (copyResetTimer) clearTimeout(copyResetTimer);
		}
	};

	const toggleResumeOptions = () => {
		showResumeOptions = !showResumeOptions;
	};

	const toggleSocialOptions = () => {
		showSocialOptions = !showSocialOptions;
	};

	const toggleElioraDetail = () => {
		showElioraDetail = !showElioraDetail;
	};

	const toggleSemanticDetail = () => {
		showSemanticDetail = !showSemanticDetail;
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
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Source+Serif+4:wght@400;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="page">
	<section class="hero card">
		<div class="hero-aurora" aria-hidden="true"></div>
		<p class="eyebrow">AI Operations Portfolio</p>
		<h1>Nicko O'Brien</h1>
		<p class="tagline">AI-Forward IT Operations Professional</p>
		<p class="proof">
			High-precision technical communication and structured reasoning for deterministic AI outcomes
			across enterprise operations, automation, and delivery.
		</p>
		<div class="links">
			<div class="link-row link-row-github">
				<a
					class="cta cta-github cta-feature"
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer me"
					>GitHub<span class="sr-only"> (opens in new tab)</span></a
				>
			</div>
			<div class="link-row link-row-resume">
				<button
					class="cta cta-resume"
					type="button"
					aria-expanded={showResumeOptions}
					aria-controls="resume-subactions"
					onclick={toggleResumeOptions}
				>
					Resume Options
				</button>
				{#if showResumeOptions}
					<div class="resume-subactions" id="resume-subactions" aria-label="Resume actions">
						<a class="cta cta-view" href="/resume" target="_blank" rel="noopener noreferrer"
							>View<span class="sr-only"> resume in new tab</span></a
						>
						<a
							class="cta cta-download"
							href="/resume-bw.pdf"
							download="Nicholas_Francis_OBrien_Resume_BW.pdf"
						>
							Download (B&W PDF)<span class="sr-only"> black and white resume PDF</span></a
						>
						<a
							class="cta cta-view"
							href="/resume-color.pdf"
							download="Nicholas_Francis_OBrien_Resume_Color.pdf"
						>
							Download (Color PDF)<span class="sr-only"> color resume PDF</span></a
						>
					</div>
				{/if}
			</div>
			<div class="link-row link-row-email">
				<button
					class="cta cta-contact"
					type="button"
					aria-expanded={showEmailOptions}
					aria-controls="email-subactions"
					onclick={toggleEmailOptions}
				>
					Email Options
				</button>
				{#if showEmailOptions}
					<div class="email-subactions" id="email-subactions" aria-label="Email actions">
							<button
								class="cta cta-contact-sub"
								type="button"
								aria-pressed={showEmailText}
								onclick={() => (showEmailText = !showEmailText)}
							>
								{showEmailText ? 'Hide' : 'Show'}
							</button>
							<button class="cta cta-contact-sub" type="button" onclick={copyEmail}>
								{copied ? 'Copied' : 'Copy'}
							</button>
							{#if showEmailText}
								<p class="email-plain">{contactEmail}</p>
							{/if}
					</div>
				{/if}
			</div>
			<div class="link-row link-row-linkedin">
				<button
					class="cta cta-social"
					type="button"
					aria-expanded={showSocialOptions}
					aria-controls="social-subactions"
					onclick={toggleSocialOptions}
				>
					Social Media Options
				</button>
				{#if showSocialOptions}
					<div class="social-subactions" id="social-subactions" aria-label="Social media actions">
						<a class="cta cta-linkedin" href={linkedInUrl} target="_blank" rel="noopener noreferrer me"
							>LinkedIn<span class="sr-only"> (opens in new tab)</span></a
						>
						<a class="cta cta-twitter" href={twitterUrl} target="_blank" rel="noopener noreferrer me"
							>X / Twitter<span class="sr-only"> (opens in new tab)</span></a
						>
					</div>
				{/if}
			</div>
		</div>
	</section>

		<section class="card">
			<h2>About</h2>
			<p>
				I work at the intersection of IT operations and AI-enabled delivery. My differentiator is
				exactitude in language, clear requirement shaping, and disciplined semantic control to drive
				deterministic AI behavior. I translate complex technical situations into stable systems,
				practical tooling, and dependable outcomes.
			</p>
			<div class="detail-action">
				<button
					class="project-link"
					type="button"
					aria-expanded={showSemanticDetail}
					aria-controls="semantic-language-detail"
					onclick={toggleSemanticDetail}
				>
					{showSemanticDetail ? 'Hide Semantic Precision' : 'Semantic Precision'}
				</button>
			</div>
			{#if showSemanticDetail}
				<article id="semantic-language-detail" class="detail-card" tabindex="-1">
					<p>
						Nicholas O’Brien demonstrates unusually strong capability in precision-language analysis,
						semantic pressure-testing, and the disciplined shaping of AI outputs toward stable,
						reproducible results. His strongest observed skill is identifying load-bearing distinctions
						in natural language and using them to discipline AI output. He can isolate where wording
						actually carries the burden of meaning, detect when an output has drifted from its intended
						center of gravity, and force the language back onto a constrained semantic rail. This
						includes distinguishing primary contradiction from secondary consequence, separating
						downstream implication from core burden, identifying when a statement is overloaded, and
						tightening language without losing intended meaning. In sustained project work, he has
						repeatedly shown high competence in drift detection, burden-splitting, terminology pressure,
						and the recovery of precise meaning from ambiguous or inflated phrasing. His work is
						especially strong where deterministic or near-deterministic AI behavior depends on exact
						natural-language constraints.
					</p>
					<p class="project-outcome">
						AI-generated evaluative assessment prepared with ChatGPT by OpenAI, based on extended
						project interaction and supported by documented revision artifacts, conversation excerpts,
						and project records. Presented as an analytical assessment, not an independent human
						employment reference. Formed through extended work on a long-running AI and doctrine
						project involving repeated semantic review, drift detection, burden-splitting, wording
						constraint, and revision under precision requirements, and presented as a transparent
						AI-generated evaluation rather than as a formal credential or human referee statement.
					</p>
				</article>
			{/if}
			<div class="status-strip" aria-label="Profile snapshot">
				<span>Location: Wellington</span>
				<span>Focus: Deterministic AI + Enterprise Delivery</span>
				<span>Strength: Precision Language + Structured Reasoning</span>
			</div>
		</section>

	<div class="section-divider" aria-hidden="true"></div>

		<section class="card">
			<h2>Projects</h2>
			<div class="projects">
				<article>
					<p class="project-label">AI Architecture</p>
					<h3>Eliora</h3>
					<p>
						Interpretive AI architecture designed to convert atypical input into structured, stable
						reasoning and response.
					</p>
					<p class="project-outcome">Outcome: Built a repeatable reasoning framework for complex input.</p>
					<button
						class="project-link"
						type="button"
						aria-expanded={showElioraDetail}
						aria-controls="eliora-detail"
						onclick={toggleElioraDetail}
					>
						{showElioraDetail ? 'Hide Eliora Detail' : 'Open Eliora Detail'}
					</button>
				</article>
				{#if showElioraDetail}
					<article id="eliora-detail" class="detail-card" tabindex="-1">
						<p class="project-label">Eliora Detail</p>
						<p>
							Eliora is a governance-first AI coordination project built to enforce explicit authority
							separation, derivation traceability, and fail-closed operational behavior in
							high-consequence agent systems.
						</p>
						<h4 class="detail-heading">Key Features</h4>
						<ul class="detail-list">
							<li>Layered architecture separating intent, doctrine, policy, and execution surfaces</li>
							<li>Traceable derivation paths linking outputs to governing sources and decision context</li>
							<li>Fail-closed handling for ambiguity, policy conflict, or unresolved adjudication states</li>
							<li>
								Explicit authority modeling to prevent collapse between authorship, governance, and
								agent behavior
							</li>
							<li>
								Audit-oriented structure supporting review, validation, and controlled change over time
							</li>
							<li>Human-in-the-loop resolution for contested or high-impact operational states</li>
						</ul>
						<p class="project-outcome">
							<em
								>This characterization is provided by Codex App, an OpenAI GPT-5-based coding agent,
								and is based on direct inspection of the live Eliora-v0.1 repository, including its
								folder structure, governance surfaces, and sustained development history, rather than a
								hypothetical project brief. Eliora-v0.1 is maintained as a private repository; where
								private contribution visibility is enabled on GitHub, the cadence of work can also be
								reflected in the associated profile activity.</em
							>
						</p>
					</article>
				{/if}
				<article>
					<p class="project-label">Remediation Tooling</p>
					<h3>Post-Deployment Remediation Script Development</h3>
					<p>
						AI-assisted endpoint remediation script development for live post-deployment incidents and
						production validation.
					</p>
					<p class="project-outcome">
						Outcome: Standardized production remediation and evidence-driven validation workflow.
					</p>
					<a
						class="project-link"
						href="/projects/remediation-script-development"
						target="_blank"
						rel="noopener noreferrer"
						>View Project Detail</a
					>
				</article>
				<article>
					<p class="project-label">Systems Integration</p>
					<h3>Enterprise Migration Stabilization Framework</h3>
					<p>
						Evidence-driven application migration stabilization methodology translating live remediation
						into hardened package controls.
					</p>
					<p class="project-outcome">
						Outcome: Reproducible, audit-ready stabilization framework for enterprise deployment
						decisions.
					</p>
					<a
						class="project-link"
						href="/projects/migration-stabilization-framework"
						target="_blank"
						rel="noopener noreferrer"
						>View Project Detail</a
					>
				</article>
			</div>
		</section>
	</main>

<style>
	:global(:root) {
		--bg-0: #060912;
		--bg-1: #0b1326;
		--panel: rgba(14, 22, 42, 0.78);
		--text-main: #e8eefc;
		--text-muted: #aab8d8;
		--accent: #2fd1ff;
		--accent-purple: #6e3fb1;
		--accent-green: #1e8d6a;
		--accent-purple-bright: #9a63e8;
		--accent-green-bright: #39c69a;
		--accent-soft: rgba(47, 209, 255, 0.15);
	}

	:global(body) {
		margin: 0;
		font-family: 'Space Grotesk', sans-serif;
		background:
			radial-gradient(circle at 10% 10%, rgba(47, 209, 255, 0.12) 0%, transparent 25%),
			radial-gradient(circle at 75% 12%, rgba(110, 63, 177, 0.24) 0%, transparent 24%),
			radial-gradient(circle at 90% 18%, rgba(30, 141, 106, 0.18) 0%, transparent 24%),
			linear-gradient(170deg, var(--bg-0) 0%, var(--bg-1) 100%);
		color: var(--text-main);
	}

	:global(body)::after {
		content: '';
		position: fixed;
		inset: 0;
		pointer-events: none;
		background-image: radial-gradient(rgba(255, 255, 255, 0.035) 0.6px, transparent 0.6px);
		background-size: 3px 3px;
		opacity: 0.18;
		mix-blend-mode: soft-light;
	}

	.page {
		position: relative;
		max-width: 900px;
		margin: 0 auto;
		padding: 3rem 1.25rem 4rem;
		display: grid;
		gap: 1.5rem;
	}

	.page::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-image:
			linear-gradient(rgba(180, 210, 255, 0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(180, 210, 255, 0.04) 1px, transparent 1px);
		background-size: 28px 28px;
		mask-image: radial-gradient(circle at center, black 40%, transparent 95%);
	}

	.card {
		background:
			linear-gradient(var(--panel), var(--panel)) padding-box,
			linear-gradient(
					125deg,
					rgba(35, 148, 182, 0.54),
					rgba(110, 63, 177, 0.84),
					rgba(30, 141, 106, 0.84)
				)
				border-box;
		backdrop-filter: blur(8px);
		border: 1px solid transparent;
		border-radius: 1rem;
		padding: 1.25rem;
		box-shadow: 0 14px 40px rgba(4, 8, 20, 0.55);
		animation: rise-in 520ms ease both;
	}

	.hero h1 {
		font-size: clamp(2.1rem, 5vw, 3.25rem);
		line-height: 1;
		margin: 0.25rem 0;
	}

	.hero {
		position: relative;
		overflow: hidden;
		padding: 1.75rem;
	}

	.hero > * {
		position: relative;
		z-index: 1;
	}

	.hero-aurora {
		position: absolute;
		inset: -35% -10% auto -10%;
		height: 68%;
		background:
			radial-gradient(55% 60% at 20% 50%, rgba(111, 255, 214, 0.26) 0%, transparent 60%),
			radial-gradient(50% 60% at 45% 45%, rgba(154, 99, 232, 0.31) 0%, transparent 65%),
			radial-gradient(45% 55% at 75% 50%, rgba(47, 209, 255, 0.25) 0%, transparent 62%);
		filter: blur(18px) saturate(124%);
		animation: aurora-drift 14s ease-in-out infinite alternate;
	}

	.eyebrow {
		margin: 0;
		color: transparent;
		background: linear-gradient(
			90deg,
			var(--accent),
			var(--accent-purple-bright),
			var(--accent-green-bright)
		);
		background-clip: text;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-size: 0.75rem;
	}

	.tagline {
		font-size: 1.12rem;
		margin: 0.35rem 0 0;
		max-width: 28ch;
	}

	.proof {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.92rem;
		color: var(--text-muted);
		margin-top: 0.6rem;
	}

	.links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.link-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}

	.email-subactions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		align-items: center;
	}

	.resume-subactions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		align-items: center;
	}

	.social-subactions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		align-items: center;
	}

	.link-row-email {
		align-items: center;
	}

	.link-row-resume {
		align-items: center;
	}

	.email-plain {
		margin: 0;
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.84rem;
		color: #d8e7ff;
		padding: 0.34rem 0.62rem;
		border-radius: 999px;
		border: 1px solid rgba(190, 215, 242, 0.52);
		background: linear-gradient(120deg, #32464e 0%, #36495b 55%, #1e4b41 100%);
		user-select: text;
	}

	.status-strip {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: 0.9rem;
	}

	.status-strip span {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: #e8f3ff;
		padding: 0.26rem 0.55rem;
		border-radius: 999px;
		background: linear-gradient(120deg, #34484f 0%, #3c4b5f 55%, #204c44 100%);
		border: 1px solid rgba(190, 215, 242, 0.55);
		box-shadow:
			0 0 0 1px rgba(230, 244, 255, 0.1) inset,
			0 6px 14px rgba(7, 14, 33, 0.28);
	}

	.cta {
		--btn-start: #35598f;
		--btn-mid: #50368f;
		--btn-end: #286e68;
		--btn-start-hover: #4470b3;
		--btn-mid-hover: #6747b6;
		--btn-end-hover: #318982;
		--btn-text: #ecf3ff;
		--btn-text-hover: var(--btn-text);
		text-decoration: none;
		font-family: inherit;
		padding: 0.45rem 0.75rem;
		border-radius: 999px;
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		color: var(--btn-text);
		background: linear-gradient(120deg, var(--btn-start) 0%, var(--btn-mid) 55%, var(--btn-end) 100%);
		border: 1px solid rgba(193, 217, 255, 0.34);
		cursor: pointer;
		transition:
			background 160ms ease,
			color 140ms ease,
			border-color 140ms ease,
			transform 140ms ease;
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.06) inset,
			0 8px 20px rgba(7, 14, 33, 0.35);
	}

	.cta-view {
		--btn-start: #3a5254;
		--btn-mid: #3f4f64;
		--btn-end: #1f5448;
		--btn-start-hover: #486769;
		--btn-mid-hover: #51657e;
		--btn-end-hover: #2a695b;
		--btn-text: #f3f7ff;
		--btn-text-hover: #ffffff;
	}

	.cta-download {
		--btn-start: #395759;
		--btn-mid: #3d5366;
		--btn-end: #1f584b;
		--btn-start-hover: #466d6f;
		--btn-mid-hover: #4f6980;
		--btn-end-hover: #296f5f;
		--btn-text: #f3f7ff;
		--btn-text-hover: #ffffff;
	}

	.cta-contact {
		--btn-start: #3c5856;
		--btn-mid: #415466;
		--btn-end: #22594a;
		--btn-start-hover: #4a6e6a;
		--btn-mid-hover: #536980;
		--btn-end-hover: #2d705e;
		--btn-text: #f3f7ff;
		--btn-text-hover: #ffffff;
	}

	.cta-resume {
		--btn-start: #3a5254;
		--btn-mid: #3f4f64;
		--btn-end: #1f5448;
		--btn-start-hover: #486769;
		--btn-mid-hover: #51657e;
		--btn-end-hover: #2a695b;
		--btn-text: #f3f7ff;
		--btn-text-hover: #ffffff;
	}

	.cta-social {
		--btn-start: #3a5456;
		--btn-mid: #405064;
		--btn-end: #205649;
		--btn-start-hover: #476a6d;
		--btn-mid-hover: #51657d;
		--btn-end-hover: #2a6b5b;
		--btn-text: #f3f7ff;
		--btn-text-hover: #ffffff;
	}

	.cta-contact-sub {
		--btn-start: #314a57;
		--btn-mid: #365161;
		--btn-end: #1f4c43;
		--btn-start-hover: #3d5f6f;
		--btn-mid-hover: #456477;
		--btn-end-hover: #286055;
		--btn-text: #eaf4ff;
		--btn-text-hover: #ffffff;
		font-size: 0.84rem;
		padding: 0.36rem 0.62rem;
	}

	.cta-github {
		--btn-start: #3b7b63;
		--btn-mid: #2a5f4d;
		--btn-end: #1e4538;
		--btn-start-hover: #4b9278;
		--btn-mid-hover: #33735d;
		--btn-end-hover: #275547;
		--btn-text: #e9fff4;
		--btn-text-hover: #f6fffb;
	}

	.cta-linkedin {
		--btn-start: #3a5456;
		--btn-mid: #405064;
		--btn-end: #205649;
		--btn-start-hover: #476a6d;
		--btn-mid-hover: #51657d;
		--btn-end-hover: #2a6b5b;
		--btn-text: #f3f7ff;
		--btn-text-hover: #ffffff;
	}

	.cta-twitter {
		--btn-start: #35598f;
		--btn-mid: #4a4f7e;
		--btn-end: #27556b;
		--btn-start-hover: #4470b3;
		--btn-mid-hover: #5a6498;
		--btn-end-hover: #336b85;
		--btn-text: #f3f7ff;
		--btn-text-hover: #ffffff;
	}

	.cta:hover {
		background: linear-gradient(
			120deg,
			var(--btn-start-hover) 0%,
			var(--btn-mid-hover) 55%,
			var(--btn-end-hover) 100%
		);
		color: var(--btn-text-hover);
		border-color: rgba(206, 226, 255, 0.6);
		transform: translateY(-1px);
	}

	.cta-feature {
		padding: 0.5rem 0.95rem;
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: 0.015em;
		border-color: rgba(182, 238, 219, 0.8);
		box-shadow:
			0 0 0 1px rgba(210, 240, 230, 0.26) inset,
			0 0 18px rgba(92, 191, 154, 0.24),
			0 10px 24px rgba(7, 14, 33, 0.4);
	}

	.cta-github.cta-feature:hover {
		border-color: rgba(194, 255, 231, 0.95);
		box-shadow:
			0 0 0 1px rgba(224, 255, 243, 0.34) inset,
			0 0 20px rgba(108, 209, 171, 0.35),
			0 12px 26px rgba(7, 14, 33, 0.46);
	}

	.cta:focus-visible,
	.projects article:focus-within {
		outline: 3px solid var(--accent-purple);
		outline-offset: 2px;
	}

	h2 {
		margin-top: 0;
		font-size: 1.35rem;
		color: #d8e8ff;
		letter-spacing: 0.01em;
	}

	p {
		font-family: 'Source Serif 4', serif;
		font-size: 1.05rem;
		line-height: 1.55;
		margin-bottom: 0;
		max-width: 68ch;
		color: #d4def3;
	}

	.projects {
		display: grid;
		gap: 0.9rem;
	}

	.section-divider {
		height: 2px;
		border-radius: 999px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(47, 209, 255, 0.95) 18%,
			rgba(154, 99, 232, 1) 50%,
			rgba(77, 228, 181, 0.95) 82%,
			transparent 100%
		);
		box-shadow: 0 0 20px rgba(154, 99, 232, 0.35);
		animation: divider-pulse 4.4s ease-in-out infinite;
	}

	/* Add section-level richness so lower cards are not visually plain */
	.card:has(h2) {
		background:
			linear-gradient(
					135deg,
					rgba(22, 34, 66, 0.8) 0%,
					rgba(31, 28, 69, 0.82) 56%,
					rgba(18, 42, 53, 0.8) 100%
				)
				padding-box,
			linear-gradient(
					128deg,
					rgba(47, 209, 255, 0.44),
					rgba(110, 63, 177, 0.64),
					rgba(30, 141, 106, 0.6)
				)
				border-box;
	}

	.card:has(h2)::before {
		content: '';
		display: block;
		height: 2px;
		width: 120px;
		margin-bottom: 0.9rem;
		background: linear-gradient(
			90deg,
			rgba(47, 209, 255, 1),
			rgba(154, 99, 232, 1),
			rgba(77, 228, 181, 0.98)
		);
		border-radius: 999px;
		box-shadow: 0 0 16px rgba(154, 99, 232, 0.35);
	}

	.projects article {
		padding: 0.85rem;
		background:
			linear-gradient(rgba(17, 29, 54, 0.72), rgba(17, 29, 54, 0.72)) padding-box,
			linear-gradient(
					130deg,
					rgba(47, 209, 255, 0.48),
					rgba(110, 63, 177, 0.9),
					rgba(30, 141, 106, 0.9)
				)
				border-box;
		border: 1px solid transparent;
		border-radius: 0.75rem;
		position: relative;
		transition:
			border-color 140ms ease,
			transform 140ms ease,
			box-shadow 180ms ease;
	}

	.projects article::before {
		content: '';
		position: absolute;
		left: -1px;
		top: -1px;
		bottom: -1px;
		width: 5px;
		border-radius: 0.75rem 0 0 0.75rem;
		background: linear-gradient(
			180deg,
			rgba(47, 209, 255, 1),
			rgba(154, 99, 232, 1),
			rgba(57, 198, 154, 0.95)
		);
		box-shadow: 0 0 18px rgba(154, 99, 232, 0.35);
	}

	.projects article:hover {
		background:
			linear-gradient(rgba(20, 34, 62, 0.86), rgba(20, 34, 62, 0.86)) padding-box,
			linear-gradient(
					130deg,
					rgba(95, 224, 255, 0.92),
					rgba(154, 99, 232, 1),
					rgba(77, 228, 181, 0.98)
				)
				border-box;
		transform: translateY(-1px);
		box-shadow: 0 10px 30px rgba(8, 16, 35, 0.45);
	}

	.projects h3 {
		margin: 0.12rem 0 0;
		font-size: 1.02rem;
	}

	.projects p {
		margin-top: 0.5rem;
	}

	.project-outcome {
		margin-top: 0.6rem;
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.82rem;
		line-height: 1.4;
		color: #c4d6f7;
	}

	.project-label {
		margin: 0;
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.74rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: transparent;
		background: linear-gradient(
			90deg,
			var(--accent),
			var(--accent-purple-bright),
			var(--accent-green-bright)
		);
		background-clip: text;
		text-shadow: 0 0 16px var(--accent-soft);
	}

	.project-link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		margin-top: 0.65rem;
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		text-decoration: none;
		color: #dff3ff;
		padding: 0.32rem 0.58rem;
		border-radius: 999px;
		border: 1px solid rgba(191, 221, 255, 0.44);
		background: linear-gradient(120deg, #35598f 0%, #4f4685 55%, #2a7167 100%);
		box-shadow:
			0 0 0 1px rgba(236, 245, 255, 0.08) inset,
			0 6px 16px rgba(7, 14, 33, 0.3);
		transition:
			transform 130ms ease,
			border-color 130ms ease,
			filter 130ms ease;
	}

	.project-link:hover {
		transform: translateY(-1px);
		border-color: rgba(212, 236, 255, 0.72);
		filter: brightness(1.05);
	}

	.detail-action {
		margin-top: 0.65rem;
	}

	.detail-card {
		margin-top: 0.9rem;
		padding: 0.85rem;
		background:
			linear-gradient(rgba(17, 29, 54, 0.72), rgba(17, 29, 54, 0.72)) padding-box,
			linear-gradient(
					130deg,
					rgba(47, 209, 255, 0.48),
					rgba(110, 63, 177, 0.9),
					rgba(30, 141, 106, 0.9)
				)
				border-box;
		border: 1px solid transparent;
		border-radius: 0.75rem;
		position: relative;
	}

	.detail-list {
		margin: 0.55rem 0 0;
		padding-left: 1.05rem;
		list-style-type: disc;
		list-style-position: outside;
	}

	.detail-list li {
		margin-top: 0.36rem;
		font-family: 'Source Serif 4', serif;
		color: #d4def3;
		line-height: 1.48;
	}

	.detail-heading {
		margin: 0.6rem 0 0;
		font-size: 1rem;
		letter-spacing: 0.01em;
		color: #dce9ff;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (max-width: 640px) {
		.page {
			padding-top: 1.5rem;
			gap: 1rem;
		}

		.hero {
			padding: 1.2rem;
		}

		.hero h1 {
			font-size: clamp(1.9rem, 11vw, 2.45rem);
		}

		.status-strip span {
			font-size: 0.7rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card,
		.hero-aurora,
		.section-divider {
			animation: none;
		}

		.cta,
		.projects article {
			transition: none;
		}
	}

	@keyframes aurora-drift {
		0% {
			transform: translateX(-2%) translateY(0%) scale(1);
		}
		50% {
			transform: translateX(2%) translateY(3%) scale(1.05);
		}
		100% {
			transform: translateX(-1%) translateY(-2%) scale(1.02);
		}
	}

	@keyframes rise-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes divider-pulse {
		0% {
			opacity: 0.62;
			transform: scaleX(0.98);
		}
		50% {
			opacity: 1;
			transform: scaleX(1);
		}
		100% {
			opacity: 0.62;
			transform: scaleX(0.98);
		}
	}
</style>
