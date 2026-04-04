<script lang="ts">
	type Props = {
		showElioraDetail: boolean;
		showRemediationOptions: boolean;
		showMigrationOptions: boolean;
		openElioraDetail: () => void;
		closeElioraDetail: () => void;
		openRemediationOptions: () => void;
		closeRemediationOptions: () => void;
		openMigrationOptions: () => void;
		closeMigrationOptions: () => void;
	};

	let {
		showElioraDetail,
		showRemediationOptions,
		showMigrationOptions,
		openElioraDetail,
		closeElioraDetail,
		openRemediationOptions,
		closeRemediationOptions,
		openMigrationOptions,
		closeMigrationOptions
	}: Props = $props();
</script>

<section class="card">
	<h2 id="selected-work-heading">Selected Work</h2>
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
				aria-expanded={showElioraDetail}
				aria-controls="eliora-detail"
				onclick={showElioraDetail ? closeElioraDetail : openElioraDetail}
			>
				{showElioraDetail ? 'Hide Overview' : 'Overview'}
			</button>
		</article>
		{#if showElioraDetail}
			<article id="eliora-detail" class="detail-card" tabindex="-1">
				<p>
					Eliora is a governance-first AI coordination project built to enforce explicit authority
					separation, derivation traceability, and fail-closed operational behavior in high-consequence
					agent systems.
				</p>
				<h4 class="detail-heading">Key Features</h4>
				<ul class="detail-list">
					<li>Layered architecture separating intent, doctrine, policy, and execution surfaces</li>
					<li>Traceable derivation paths linking outputs to governing sources and decision context</li>
					<li>Fail-closed handling for ambiguity, policy conflict, or unresolved adjudication states</li>
					<li>Explicit authority modeling to prevent collapse between authorship, governance, and agent behavior</li>
					<li>Audit-oriented structure supporting review, validation, and controlled change over time</li>
					<li>Human-in-the-loop resolution for contested or high-impact operational states</li>
				</ul>
				<p class="project-outcome">
					<em
						>This characterization is provided by Codex App, an OpenAI GPT-5-based coding agent, and is
						based on direct inspection of the live Eliora-v0.1 repository, including its folder structure,
						governance surfaces, and sustained development history, rather than a hypothetical project
						brief. Eliora-v0.1 is maintained as a private repository; where private contribution visibility
						is enabled on GitHub, the cadence of work can also be reflected in the associated profile
						activity.</em
					>
				</p>
				<div class="detail-card-actions">
					<button class="cta cta-resume section-cta-eliora" type="button" onclick={closeElioraDetail}>
						Hide and Return to Main Page
					</button>
				</div>
			</article>
		{/if}
		<article id="remediation-card" class="project-card">
			<p id="remediation-label" class="project-label">Remediation</p>
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
				aria-expanded={showRemediationOptions}
				aria-controls="remediation-subactions"
				onclick={showRemediationOptions ? closeRemediationOptions : openRemediationOptions}
			>
				{showRemediationOptions ? 'Hide View Case 1' : 'View Case 1'}
			</button>
			{#if showRemediationOptions}
				<div
					class="resume-subactions"
					id="remediation-subactions"
					aria-label="Remediation project actions"
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
		<article id="migration-card" class="project-card">
			<p id="migration-label" class="project-label">Deployment</p>
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
				aria-expanded={showMigrationOptions}
				aria-controls="migration-subactions"
				onclick={showMigrationOptions ? closeMigrationOptions : openMigrationOptions}
			>
				{showMigrationOptions ? 'Hide View Case 2' : 'View Case 2'}
			</button>
			{#if showMigrationOptions}
				<div class="resume-subactions" id="migration-subactions" aria-label="Migration project actions" tabindex="-1">
					<a class="cta cta-view" href="/projects/migration-stabilization-framework">View First</a>
					<a class="cta cta-download" href="/appprojects/Portfolio_Description_bw.pdf" download="Portfolio_Description_BW.pdf">Download (B&W PDF)</a>
				</div>
			{/if}
		</article>
	</div>
</section>
