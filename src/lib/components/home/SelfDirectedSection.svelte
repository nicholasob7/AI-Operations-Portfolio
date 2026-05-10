<script lang="ts">
	type Props = {
		navigationReady: boolean;
	};

	let { navigationReady }: Props = $props();
</script>

<section class="card self-directed-section" aria-labelledby="self-directed-head">
	<h2 id="self-directed-head" tabindex="-1">Evidence Highlights</h2>
	<div class="projects">
		<article class="project-card project-card-governance self-directed-gateway" tabindex="-1">
			<p class="self-directed-note">
				Selected evidence from support work, technical operations, AI governance, and publication
				delivery is grouped in one highlights index.
			</p>
			<a
				aria-disabled={!navigationReady}
				class:interaction-disabled={!navigationReady}
				class="cta cta-resume section-cta-eliora"
				href="/highlights"
				tabindex={navigationReady ? undefined : -1}
			>
				View Highlights
			</a>
		</article>
	</div>
</section>
