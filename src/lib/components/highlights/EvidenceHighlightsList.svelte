<script lang="ts">
	import HomeInnerPanel from '$lib/components/home/HomeInnerPanel.svelte';
	import { evidenceNodeById } from '$lib/content/evidence-nodes';
	import { highlightsEntries } from '$lib/content/highlights';

	type Props = {
		navigationReady: boolean;
	};

	let { navigationReady }: Props = $props();
</script>

<div class="evidence-highlights">
		{#each highlightsEntries as entry}
			{@const node = evidenceNodeById[entry.evidenceNodeId]}
			<HomeInnerPanel>
				<h3>{'humanDisplayLabel' in node ? node.humanDisplayLabel ?? node.label : node.label}</h3>
				<p class="evidence-summary">{node.summary}</p>
			<a
				aria-disabled={!navigationReady}
				class:interaction-disabled={!navigationReady}
				class={`cta cta-resume ${entry.ctaClass}`}
				data-sveltekit-preload-code="hover"
				href={entry.href}
				tabindex={navigationReady ? undefined : -1}
			>
				{entry.ctaLabel}
			</a>
		</HomeInnerPanel>
	{/each}
</div>

<style>
	.evidence-highlights {
		display: grid;
		gap: 0.9rem;
	}

	.evidence-highlights :global(h3) {
		justify-self: center;
		text-align: center;
	}

	.evidence-highlights :global(.evidence-summary) {
		text-align: left;
	}

	@media (min-width: 960px) {
		.evidence-highlights {
			gap: 1.2rem;
		}
	}
</style>
