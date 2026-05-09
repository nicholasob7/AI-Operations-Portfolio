<script lang="ts">
	import { onMount } from 'svelte';
	import DestinationActions, { type DestinationAction } from './DestinationActions.svelte';
	import PortraitIntro from './PortraitIntro.svelte';
	import type { ProjectDetail, ProjectDetailListItem } from '$lib/content/project-details';
	import { getEntryImage, isPortraitEntry, type EntrySurface } from '$lib/entry-surfaces';

	type Props = {
		actions: DestinationAction[];
		detail: ProjectDetail;
		panelId: string;
		entrySurface?: EntrySurface;
	};

	let { actions, detail, panelId, entrySurface }: Props = $props();
	const projectUsesPortraitEntry = $derived(entrySurface ? isPortraitEntry(entrySurface) : false);
	const projectEntryImage = $derived(entrySurface ? getEntryImage(entrySurface) : null);

	const isLabelledItem = (
		item: ProjectDetailListItem
	): item is Extract<ProjectDetailListItem, { label: string }> => typeof item !== 'string';

	onMount(() => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	});
</script>

<PortraitIntro
	src={projectEntryImage}
	enabled={projectUsesPortraitEntry}
	pathname={entrySurface?.path ?? null}
/>

<main class="doc-page">
	<DestinationActions {actions} {panelId} portraitHandoff={{ src: projectEntryImage }} />

	<section class="doc-card" aria-labelledby={detail.titleId}>
		<p class="eyebrow">{detail.eyebrow}</p>
		<h1 id={detail.titleId}>{detail.title}</h1>
		{#if detail.standfirst}
			<p class="standfirst">{detail.standfirst}</p>
		{/if}

		<div
			class:doc-text-highlighted={detail.highlightDetailText}
			class="doc-text"
			aria-label={detail.ariaLabel}
		>
			{#each detail.sections as section}
				<h2 id={section.id}>{section.title}</h2>
				{#each section.blocks as block}
					{#if block.type === 'paragraph'}
						<p class={block.className}>{block.text}</p>
					{:else}
						<ul>
							{#each block.items as item}
								<li>
									{#if isLabelledItem(item)}
										<strong>{item.label}:</strong>
										{item.text}
									{:else}
										{item}
									{/if}
								</li>
							{/each}
						</ul>
					{/if}
				{/each}
			{/each}
		</div>
	</section>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		background:
			radial-gradient(circle at 10% 10%, rgba(47, 209, 255, 0.12) 0%, transparent 25%),
			radial-gradient(circle at 75% 12%, rgba(110, 63, 177, 0.24) 0%, transparent 24%),
			radial-gradient(circle at 90% 18%, rgba(30, 141, 106, 0.18) 0%, transparent 24%),
			linear-gradient(170deg, #060912 0%, #0b1326 100%);
		color: #e8eefc;
	}

	.doc-page {
		max-width: 1320px;
		margin: 0 auto;
		padding: 2rem 1.25rem calc(6.5rem + env(safe-area-inset-bottom));
	}

	.doc-card {
		background:
			linear-gradient(rgba(14, 22, 42, 0.82), rgba(14, 22, 42, 0.82)) padding-box,
			linear-gradient(125deg, rgba(35, 148, 182, 0.54), rgba(110, 63, 177, 0.84), rgba(30, 141, 106, 0.84))
				border-box;
		border: 1px solid transparent;
		border-radius: 1rem;
		padding: 1.2rem;
		box-shadow: 0 14px 40px rgba(4, 8, 20, 0.55);
	}

	.eyebrow {
		margin: 0;
		font-size: 0.76rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-weight: 700;
		color: #5ed8ff;
	}

	h1 {
		margin: 0.42rem 0 0;
		font-size: clamp(1.62rem, 3.8vw, 2.18rem);
		line-height: 1.06;
	}

	.standfirst {
		margin: 0.32rem 0 0.96rem;
		max-width: none;
		color: #dbe5f5;
		line-height: 1.6;
	}

	.doc-text {
		margin-top: 0.8rem;
		padding: 1.05rem 1.08rem 1.15rem;
		border-radius: 0.72rem;
		border: 1px solid rgba(190, 215, 242, 0.32);
		background: rgba(12, 20, 37, 0.65);
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		font-size: 1rem;
		line-height: 1.64;
		color: #d4def3;
	}

	.doc-summary {
		margin: 0.32rem 0 0.96rem;
		max-width: none;
		color: #dbe5f5;
		line-height: 1.6;
	}

	.doc-text h2 {
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		color: #f1f6ff;
		font-size: 1.15rem;
		line-height: 1.26;
		letter-spacing: 0.015em;
		margin: 1.45rem 0 0.5rem;
		padding-top: 0.9rem;
		border-top: 1px solid rgba(162, 201, 243, 0.18);
	}

	.doc-text h2:first-of-type {
		margin-top: 0;
		padding-top: 0;
		border-top: 0;
	}

	.doc-text ul {
		margin: 0.42rem 0 0.95rem 1.22rem;
		padding: 0;
		list-style-type: disc;
		list-style-position: outside;
	}

	.doc-text li {
		display: list-item;
		margin: 0.36rem 0;
		line-height: 1.6;
		color: #d7e2f4;
	}

	.doc-text li::marker {
		color: #8fdcff;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		font-weight: 700;
	}

	.doc-text p {
		margin: 0.3rem 0 0.86rem;
		max-width: none;
		color: #dbe5f5;
	}

	.doc-text p.doc-summary {
		max-width: none;
	}

	.doc-text-highlighted h2,
	.doc-text-highlighted p.detail-highlight {
		color: transparent;
		background: linear-gradient(90deg, #5f9bb5 0%, #69579a 50%, #4b8068 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	@media (min-width: 960px) {
		.doc-page {
			max-width: 1320px;
		}

		.doc-card {
			padding: 1.7rem;
			border-radius: 1.2rem;
		}

		h1 {
			font-size: clamp(2.2rem, 4.6vw, 2.9rem);
		}

		.doc-text {
			padding: 1.24rem 1.28rem 1.32rem;
			font-size: 1.5rem;
			line-height: 1.58;
		}

		.doc-text h2 {
			font-size: 1.24rem;
		}
	}

	@media (max-width: 720px) {
		.doc-text {
			padding: 0.95rem 0.92rem 1rem;
		}

		.doc-text p {
			max-width: none;
		}
	}

	</style>
