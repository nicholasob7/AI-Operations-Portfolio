<script lang="ts">
	type Props = {
		showOverview: boolean;
		showCase1: boolean;
		showCase2: boolean;
		openOverview: () => void;
		closeOverview: () => void;
		openCase1: () => void;
		closeCase1: () => void;
		openCase2: () => void;
		closeCase2: () => void;
	};

	let {
		showOverview,
		showCase1,
		showCase2,
		openOverview,
		closeOverview,
		openCase1,
		closeCase1,
		openCase2,
		closeCase2
	}: Props = $props();
</script>

<section class="card">
	<h2 id="selected-work-head" tabindex="-1">Selected Work</h2>
	<div class="projects">
		<article class="project-card">
			<p class="project-label">AI Architecture</p>
			<h3>Eliora</h3>
			<p class="project-summary">
				Interpretive AI architecture designed to convert atypical input into structured, stable reasoning and
				response.
			</p>
			<p class="project-outcome">Outcome: Built a repeatable reasoning framework for complex input.</p>
			<button
				class="cta cta-resume section-cta-eliora"
				type="button"
				aria-expanded={showOverview}
				aria-controls="overview"
				onclick={showOverview ? closeOverview : openOverview}
			>
				{showOverview ? 'Hide Overview' : 'Overview'}
			</button>
		</article>
		{#if showOverview}
			<article id="overview" class="detail-card" tabindex="-1">
				<p id="overview-head" class="detail-kicker" tabindex="-1">System Overview</p>
				<h3 class="detail-title">Governance-First AI Coordination</h3>
				<p class="detail-standfirst">
					Built to keep authority, derivation, and execution clearly separate in high-consequence agent systems.
				</p>
				<h4 class="detail-heading">Summary</h4>
				<p class="detail-body">
					Eliora is an AI coordination project with strong governance controls. It is built to separate authority
					clearly, trace outputs back to their source, and fail safely in high-consequence systems.
				</p>
				<h4 class="detail-heading">Core Features</h4>
				<ul class="detail-list">
					<li>Layered architecture separating intent, doctrine, policy, and execution surfaces</li>
					<li>Clear trace paths linking outputs to their governing sources and decision context</li>
					<li>Safe handling when meaning is unclear, policy conflicts appear, or decisions are unresolved</li>
					<li>Explicit authority modeling to prevent collapse between authorship, governance, and agent behavior</li>
					<li>Structure designed for review, validation, and controlled change over time</li>
					<li>Human-in-the-loop resolution for contested or high-impact operational states</li>
				</ul>
				<h4 class="detail-heading">Attribution</h4>
				<p class="detail-note">
					This description is based on direct inspection of the live Eliora-v0.1 repository by Codex App, an
					OpenAI GPT-5-based coding agent. It reflects the project structure, governance surfaces, and sustained
					development history rather than a hypothetical project brief.
				</p>
				<div class="detail-card-actions">
					<button class="cta cta-resume section-cta-eliora" type="button" onclick={closeOverview}>
						Hide and Return to Main Page
					</button>
				</div>
			</article>
		{/if}
		<article id="remediation-head" class="project-card" tabindex="-1">
			<p class="project-label">Remediation</p>
			<h3>Post-Deployment Remediation Script Development</h3>
			<p class="project-summary">
				AI-assisted endpoint remediation script development for live post-deployment incidents and production
				validation.
			</p>
			<p class="project-outcome">
				Outcome: Standardized production remediation and evidence-driven validation workflow.
			</p>
			<button
				class="cta cta-resume section-cta-remediation"
				type="button"
				aria-expanded={showCase1}
				aria-controls="case-1"
				onclick={showCase1 ? closeCase1 : openCase1}
			>
				{showCase1 ? 'Hide Case 1' : 'Case 1'}
			</button>
			{#if showCase1}
				<div
					class="resume-subactions"
					id="case-1"
					aria-label="Case 1 actions"
					tabindex="-1"
				>
					<a class="cta cta-view" href="/projects/remediation-script-development">View First</a>
					<a
						class="cta cta-download"
						href="/appprojects/Remediation_Script_Development_Portfolio_bw.pdf"
						download="Remediation_Script_Development_Portfolio_BW.pdf">Download (B&W PDF)</a
					>
				</div>
			{/if}
		</article>
		<article id="deployment-head" class="project-card" tabindex="-1">
			<p class="project-label">Deployment</p>
			<h3>Enterprise Migration Stabilization Framework</h3>
			<p class="project-summary">
				Evidence-driven application migration stabilization methodology translating live remediation into
				hardened package controls.
			</p>
			<p class="project-outcome">
				Outcome: Reproducible, audit-ready stabilization framework for enterprise deployment decisions.
			</p>
			<button
				class="cta cta-resume section-cta-migration"
				type="button"
				aria-expanded={showCase2}
				aria-controls="case-2"
				onclick={showCase2 ? closeCase2 : openCase2}
			>
				{showCase2 ? 'Hide Case 2' : 'Case 2'}
			</button>
			{#if showCase2}
				<div class="resume-subactions" id="case-2" aria-label="Case 2 actions" tabindex="-1">
					<a class="cta cta-view" href="/projects/migration-stabilization-framework">View First</a>
					<a class="cta cta-download" href="/appprojects/Portfolio_Description_bw.pdf" download="Portfolio_Description_BW.pdf">Download (B&W PDF)</a>
				</div>
			{/if}
		</article>
	</div>
</section>
