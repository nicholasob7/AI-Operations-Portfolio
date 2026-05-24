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

	.cta {
		--cta-size-block: 2.7rem;
		--btn-start: #35598f;
		--btn-mid: #50368f;
		--btn-end: #286e68;
		--btn-start-hover: #4470b3;
		--btn-mid-hover: #6747b6;
		--btn-end-hover: #318982;
		--btn-text: #ecf3ff;
		--btn-text-hover: var(--btn-text);
		text-decoration: none;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		min-height: var(--cta-size-block);
		padding: 0.45rem 0.75rem;
		border-radius: 999px;
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		color: var(--btn-text);
		background: linear-gradient(120deg, var(--btn-start) 0%, var(--btn-mid) 55%, var(--btn-end) 100%);
		border: 1px solid rgba(193, 217, 255, 0.34);
		cursor: pointer;
		transition:
			background 160ms ease,
			color 140ms ease,
			border-color 140ms ease,
			transform 140ms ease;
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.06) inset,
			0 8px 20px rgba(7, 14, 33, 0.35);
	}

	.cta-resume {
		--btn-start: #3a5254;
		--btn-mid: #3f4f64;
		--btn-end: #1f5448;
		--btn-start-hover: #486769;
		--btn-mid-hover: #51657e;
		--btn-end-hover: #2a695b;
		--btn-text: #f3f7ff;
		--btn-text-hover: #ffffff;
	}

	.endpoint-remediation-cta,
	.package-redesign-cta,
	.ai-governance-cta,
	.website-publication-cta {
		--btn-start: #3b7b63;
		--btn-mid: #2a5f4d;
		--btn-end: #1e4538;
		--btn-start-hover: #4b9278;
		--btn-mid-hover: #33735d;
		--btn-end-hover: #275547;
	}

	.cta:hover {
		background: linear-gradient(
			120deg,
			var(--btn-start-hover) 0%,
			var(--btn-mid-hover) 55%,
			var(--btn-end-hover) 100%
		);
		color: var(--btn-text-hover);
		border-color: rgba(206, 226, 255, 0.6);
		transform: translateY(-1px);
	}

	.cta:focus-visible {
		outline: 3px solid var(--accent-purple);
		outline-offset: 2px;
	}

	.interaction-disabled {
		pointer-events: none;
	}

	@media (min-width: 960px) {
		.evidence-highlights {
			gap: 1.2rem;
		}

		.cta {
			--cta-size-block: 2.95rem;
			padding: 0.62rem 1.02rem;
			font-size: 1.02rem;
		}
	}

	@media (max-width: 640px) {
		.cta {
			line-height: 1.3;
			white-space: normal;
		}
	}
</style>
