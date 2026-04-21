<script lang="ts">
	import { onMount, tick } from 'svelte';

	type Props = {
		showPersonal: boolean;
		showComplete: boolean;
		showActive: boolean;
		openPersonal: () => void;
		closePersonal: () => void;
		openComplete: () => void;
		closeComplete: () => void;
		openActive: () => void;
		closeActive: () => void;
	};

	let {
		showPersonal,
		showComplete,
		showActive,
		openPersonal,
		closePersonal,
		openComplete,
		closeComplete,
		openActive,
		closeActive
	}: Props = $props();
	let bottomCloseAction = $state<HTMLButtonElement | null>(null);
	let showFloatingClose = $state(false);

	const bottomCloseVisible = () => {
		if (!bottomCloseAction) return false;

		const rect = bottomCloseAction.getBoundingClientRect();
		return rect.top < window.innerHeight - 24 && rect.bottom > 24;
	};

	const updateFloatingClose = () => {
		showFloatingClose = showPersonal && !bottomCloseVisible();
	};

	onMount(() => {
		const handleViewportChange = () => {
			updateFloatingClose();
		};

		updateFloatingClose();
		window.addEventListener('scroll', handleViewportChange, { passive: true });
		window.addEventListener('resize', handleViewportChange);

		return () => {
			window.removeEventListener('scroll', handleViewportChange);
			window.removeEventListener('resize', handleViewportChange);
		};
	});

	$effect(() => {
		showPersonal;
		if (typeof window === 'undefined') return;
		void tick().then(() => {
			updateFloatingClose();
		});
	});
</script>

<section class="card">
	<h2 id="selected-work-head" tabindex="-1">Selected Work</h2>
	<div class="projects">
		<article id="remediation-head" class="project-card project-card-remediation" tabindex="-1">
			<h3>Script Development</h3>
			<p class="project-summary">
				AI-assisted endpoint remediation script development for live post-deployment incidents. Built for
				production validation.
			</p>
			<p class="project-outcome">
				Outcome: Standardized production remediation and evidence-driven validation workflow.
			</p>
			<a class="cta cta-resume section-cta-remediation" href="/projects/remediation-script-development">
				Complete
			</a>
		</article>
		<article id="deployment-head" class="project-card project-card-migration" tabindex="-1">
			<h3>Migration Framework</h3>
			<p class="project-summary">
				Evidence-driven migration stabilization methodology. Turns live remediation into hardened package
				controls.
			</p>
			<p class="project-outcome">
				Outcome: Reproducible, audit-ready stabilization framework for enterprise deployment decisions.
			</p>
			<a class="cta cta-resume section-cta-migration" href="/projects/migration-stabilization-framework">
				Active
			</a>
		</article>
		<article id="eliora-head" class="project-card project-card-governance" tabindex="-1">
			<h3>AI Governance</h3>
			<p class="project-summary">
				Interpretive AI architecture for atypical input. Converts it into structured, stable reasoning and
				response.
			</p>
			<p class="project-outcome">Outcome: Built a repeatable reasoning framework for complex input.</p>
			{#if !showPersonal}
				<button
					class="cta cta-resume section-cta-eliora"
					type="button"
					aria-expanded={showPersonal}
					aria-controls="overview"
					onclick={openPersonal}
				>
					Personal
				</button>
			{/if}
		</article>
		{#if showPersonal}
			{#if showFloatingClose}
				<div class="detail-floating-close">
					<button class="cta cta-resume section-cta-eliora" type="button" onclick={closePersonal}>
						Close
					</button>
				</div>
			{/if}
			<article id="overview" class="detail-card detail-card-governance" tabindex="-1">
				<h3 id="overview-head" class="detail-title" tabindex="-1">AI Governance</h3>
				<p class="detail-standfirst">
					Built to keep authority, derivation, and execution clearly separate. Designed for high-consequence
					agent systems.
				</p>
				<p class="detail-body">
					Eliora is an AI coordination project with strong governance controls. It separates authority clearly.
					It traces outputs back to their source. It fails safely in high-consequence systems.
				</p>
				<ul class="detail-list">
					<li>Layered architecture separating intent, doctrine, policy, and execution surfaces</li>
					<li>Clear trace paths linking outputs to their governing sources and decision context</li>
					<li>Safe handling when meaning is unclear, policy conflicts appear, or decisions are unresolved</li>
					<li>Explicit authority modeling to prevent collapse between authorship, governance, and agent behavior</li>
					<li>Structure designed for review, validation, and controlled change over time</li>
					<li>Human-in-the-loop resolution for contested or high-impact operational states</li>
				</ul>
				<p class="detail-note">
					This description is based on direct inspection of the live Eliora-v0.1 repository by Codex App, an
					OpenAI GPT-5-based coding agent. It reflects the project structure, governance surfaces, and sustained
					development history. It is not a hypothetical project brief.
				</p>
				<div class="detail-card-actions">
					<button
						bind:this={bottomCloseAction}
						class="cta cta-resume section-cta-eliora"
						type="button"
						onclick={closePersonal}
					>
						Close
					</button>
				</div>
			</article>
		{/if}
	</div>
</section>
