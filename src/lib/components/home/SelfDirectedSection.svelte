<script lang="ts">
	import { onMount, tick } from 'svelte';
	import NaturalLanguageCard from '$lib/components/home/NaturalLanguageCard.svelte';

	type Props = {
		entrySettled: boolean;
		showPersonal: boolean;
		showPrecision: boolean;
		openPersonal: () => void;
		closePersonal: () => void;
		openPrecision: () => void;
		closePrecision: () => void;
	};

	let {
		entrySettled,
		showPersonal,
		showPrecision,
		openPersonal,
		closePersonal,
		openPrecision,
		closePrecision
	}: Props = $props();
	let bottomCloseAction = $state<HTMLButtonElement | null>(null);
	let showGovernanceFloatingClose = $state(false);
	let showPrecisionFloatingClose = $state(false);

	const bottomCloseVisible = () => {
		if (!bottomCloseAction) return false;

		const rect = bottomCloseAction.getBoundingClientRect();
		return rect.top < window.innerHeight - 24 && rect.bottom > 24;
	};

	const updateFloatingClose = () => {
		showGovernanceFloatingClose = showPersonal && !bottomCloseVisible();
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

	const syncPrecisionFloatingClose = (visible: boolean) => {
		showPrecisionFloatingClose = visible;
	};
</script>

<section class="card self-directed-section" aria-labelledby="self-directed-head">
	<h2 id="self-directed-head" tabindex="-1">Self-Directed and Independent Work</h2>
	<div class="projects">
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
					disabled={!entrySettled}
					type="button"
					aria-expanded={showPersonal}
					aria-controls="overview"
					onclick={openPersonal}
					style:pointer-events={entrySettled ? 'auto' : 'none'}
				>
					Eliora
				</button>
			{/if}
		</article>
		{#if showPersonal}
			<article id="overview" class="detail-card detail-card-governance" tabindex="-1">
				<h3 id="overview-head" class="detail-title" tabindex="-1">AI Governance</h3>
				<p class="detail-standfirst">
					Built to keep authority, derivation, and execution clearly separate. Designed for high-consequence
					agent systems.
				</p>
				<p class="detail-body">
					Eliora is an AI coordination project with strong governance controls. It clearly separates authority.
					It traces outputs to their source. It fails safely in high-consequence systems.
				</p>
				<ul class="detail-list">
					<li>Layered architecture separating intent, doctrine, policy, and execution</li>
					<li>Clear trace paths linking outputs to governing sources and decision context</li>
					<li>Safe handling when meaning is unclear, policy conflicts appear, or decisions remain unresolved</li>
					<li>Explicit authority modeling to prevent collapse between authorship, governance, and agent behavior</li>
					<li>Structure designed for review, validation, and controlled change over time</li>
					<li>Human-in-the-loop resolution for contested or high-impact operational states</li>
				</ul>
				<p class="detail-note">
					This description is based on direct inspection of the live Eliora-v0.1 repository by Codex App, an
					OpenAI GPT-5 coding agent. It reflects the project structure, governance surfaces, and sustained
					development history. It is not a hypothetical project brief.
				</p>
				<div class="detail-card-actions">
					<button
						bind:this={bottomCloseAction}
						class="cta cta-resume section-cta-eliora"
						disabled={!entrySettled}
						type="button"
						onclick={closePersonal}
						style:pointer-events={entrySettled ? 'auto' : 'none'}
					>
						Close
					</button>
				</div>
			</article>
		{/if}

		<NaturalLanguageCard
			entrySettled={entrySettled}
			{showPrecision}
			{openPrecision}
			{closePrecision}
			suppressFloatingClose={true}
			onFloatingCloseChange={syncPrecisionFloatingClose}
		/>
	</div>
</section>

{#if showGovernanceFloatingClose || showPrecisionFloatingClose}
	<div class="detail-floating-close detail-floating-close-group">
		{#if showGovernanceFloatingClose}
			<button
				class="cta cta-resume section-cta-eliora"
				disabled={!entrySettled}
				type="button"
				onclick={closePersonal}
				style:pointer-events={entrySettled ? 'auto' : 'none'}
			>
				Close AI Governance
			</button>
		{/if}
		{#if showPrecisionFloatingClose}
			<button
				class="cta cta-resume section-cta-about"
				disabled={!entrySettled}
				type="button"
				onclick={closePrecision}
				style:pointer-events={entrySettled ? 'auto' : 'none'}
			>
				Close Natural Language
			</button>
		{/if}
	</div>
{/if}
