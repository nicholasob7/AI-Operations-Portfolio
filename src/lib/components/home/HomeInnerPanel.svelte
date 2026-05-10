<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="home-inner-panel">
	{@render children()}
</div>

<style>
	.home-inner-panel {
		display: grid;
		gap: 0.8rem;
		padding: 0.85rem;
		background:
			linear-gradient(rgba(17, 29, 54, 0.72), rgba(17, 29, 54, 0.72)) padding-box,
			linear-gradient(
					130deg,
					rgba(47, 209, 255, 0.48),
					rgba(110, 63, 177, 0.9),
					rgba(30, 141, 106, 0.9)
				)
				border-box;
		border: 1px solid transparent;
		border-radius: 0.75rem;
		position: relative;
	}

	.home-inner-panel :global(p) {
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		font-size: 1.05rem;
		margin: 0;
		line-height: 1.55;
		max-width: 88ch;
		color: #d4def3;
	}

	.home-inner-panel :global(h3) {
		margin: 0;
	}

	.home-inner-panel :global(.cta) {
		justify-self: start;
		max-width: 100%;
	}

	@media (min-width: 960px) {
		.home-inner-panel {
			padding: 1.24rem 1.28rem;
			border-radius: 1rem;
		}

		.home-inner-panel :global(p) {
			font-size: 1.5rem;
			line-height: 1.58;
			max-width: 100%;
		}
	}

	@media (max-width: 820px) {
		.home-inner-panel :global(.cta) {
			justify-content: center;
			text-align: center;
		}
	}
</style>
