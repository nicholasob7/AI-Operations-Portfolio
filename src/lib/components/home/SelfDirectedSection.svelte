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
				<a
					aria-disabled={!navigationReady}
					class:interaction-disabled={!navigationReady}
					class="cta cta-resume section-cta-eliora"
					data-sveltekit-preload-code="hover"
					href="/projects/eliora"
					tabindex={navigationReady ? undefined : -1}
				>
					View
				</a>
			</article>
			<article id="website-build-notes-head" class="project-card project-card-build-notes" tabindex="-1">
				<h3>Web Build Notes</h3>
				<p class="project-summary">
					Build notes for the website’s transition behaviour, interaction controls, public structure, and static
					delivery.
				</p>
				<a
					aria-disabled={!navigationReady}
					class:interaction-disabled={!navigationReady}
					class="cta cta-resume section-cta-eliora"
					data-sveltekit-preload-code="hover"
					href="/projects/website-build-notes"
					tabindex={navigationReady ? undefined : -1}
				>
					View
				</a>
			</article>
		</div>
	</section>
