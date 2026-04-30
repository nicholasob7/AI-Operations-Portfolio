<script lang="ts">
	type Props = {
		navigationReady: boolean;
	};

	let { navigationReady }: Props = $props();
</script>

<section class="card self-directed-section" aria-labelledby="self-directed-head">
		<h2 id="self-directed-head" tabindex="-1">Independent Systems</h2>
		<div class="projects">
			<article id="eliora-head" class="project-card project-card-governance" tabindex="-1">
				<h3>Eliora — AI Governance System</h3>
				<p class="project-summary">
					Interpretive AI architecture for atypical input. Uses precise language and semantic control to produce
					stable, structured reasoning and response.
				</p>
				<p class="project-outcome">
					Outcome: Built a repeatable reasoning and governance framework for complex input.
				</p>
				<a
					aria-disabled={!navigationReady}
					class="cta cta-resume section-cta-eliora"
				data-sveltekit-preload-code="hover"
				href="/projects/eliora"
				style:pointer-events={navigationReady ? 'auto' : 'none'}
					tabindex={navigationReady ? undefined : -1}
				>
					View
				</a>
			</article>
		</div>
	</section>
