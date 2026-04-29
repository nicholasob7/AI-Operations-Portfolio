<script lang="ts">
	type Props = {
		navigationReady: boolean;
	};

	let { navigationReady }: Props = $props();
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
			<a
				aria-disabled={!navigationReady}
				class="cta cta-resume section-cta-eliora"
				data-sveltekit-preload-code="hover"
				href="/projects/eliora"
				style:pointer-events={navigationReady ? 'auto' : 'none'}
				tabindex={navigationReady ? undefined : -1}
			>
				Eliora
			</a>
		</article>

		<article id="about-head" class="project-card project-card-language" tabindex="-1">
			<h3>Natural Language</h3>
			<p class="project-summary">
				I work at the intersection of IT operations and AI-enabled delivery. My strength is precise language and
				clear requirements.
			</p>
			<p class="project-outcome">
				I use disciplined semantic control to drive stable AI behavior. I turn complex technical situations into
				practical tooling, stable systems, and dependable outcomes.
			</p>
			<a
					aria-disabled={!navigationReady}
					class="cta cta-resume section-cta-about"
					data-sveltekit-preload-code="hover"
					href="/projects/eliora"
					style:pointer-events={navigationReady ? 'auto' : 'none'}
					tabindex={navigationReady ? undefined : -1}
				>
				Language
			</a>
		</article>
	</div>
</section>
