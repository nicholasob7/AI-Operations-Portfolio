<script lang="ts">
	import HomeInnerPanel from '$lib/components/home/HomeInnerPanel.svelte';
	import {
		highlightsIndexRoute,
		homepageHighlightsGatewayCopy
	} from '$lib/content/highlights';

	type Props = {
		navigationReady: boolean;
	};

	let { navigationReady }: Props = $props();
</script>

<section class="card" aria-labelledby="self-directed-head">
	<div class="section-flow">
		<h2 id="self-directed-head" tabindex="-1">Evidence Highlights</h2>
		<HomeInnerPanel>
			<p>{homepageHighlightsGatewayCopy}</p>
			<a
				aria-disabled={!navigationReady}
				class:interaction-disabled={!navigationReady}
				class="cta cta-resume section-cta-eliora"
				href={highlightsIndexRoute}
				tabindex={navigationReady ? undefined : -1}
			>
				View Highlights
			</a>
		</HomeInnerPanel>
	</div>
</section>
