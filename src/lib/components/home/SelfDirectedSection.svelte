<script lang="ts">
	import {
		highlightsIndexRoute,
		homepageHighlightsGatewayCopy
	} from '$lib/content/highlights';

	type Props = {
		navigationReady: boolean;
	};

	let { navigationReady }: Props = $props();
</script>

<section class="card self-directed-section" aria-labelledby="self-directed-head">
	<h2 id="self-directed-head" tabindex="-1">Evidence Highlights</h2>
	<div class="projects">
		<article class="project-card project-card-governance self-directed-gateway" tabindex="-1">
			<p class="self-directed-note">{homepageHighlightsGatewayCopy}</p>
			<a
				aria-disabled={!navigationReady}
				class:interaction-disabled={!navigationReady}
				class="cta cta-resume section-cta-eliora"
				href={highlightsIndexRoute}
				tabindex={navigationReady ? undefined : -1}
			>
				View Highlights
			</a>
		</article>
	</div>
</section>
