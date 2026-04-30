<script lang="ts">
	import DestinationActions, { type DestinationAction } from '$lib/components/DestinationActions.svelte';

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	const elioraActions = [
		{
			id: 'home',
			label: 'Home',
			type: 'link',
			href: '/',
			preload: true
		},
		{
			id: 'back-to-card',
			label: 'Back to Card',
			type: 'link',
			href: '/#eliora-head',
			preload: true
		},
		{
			id: 'top',
			label: 'Top',
			type: 'button',
			onclick: scrollToTop
		}
	] satisfies DestinationAction[];
</script>

<svelte:head>
	<title>Eliora AI Governance | Nicko O'Brien</title>
	<meta
		name="description"
		content="Compact portfolio page describing Eliora as an AI governance and coordination project."
	/>
</svelte:head>

<main class="doc-page">
	<DestinationActions actions={elioraActions} panelId="eliora-destination-actions" />

	<section class="doc-card" aria-labelledby="eliora-title">
		<p class="eyebrow">Project Detail</p>
		<h1 id="eliora-title">Eliora AI Governance</h1>
		<p class="standfirst">
			Built to keep authority, derivation, and execution clearly separate. Designed for high-consequence
			agent systems.
		</p>
		<div class="future-portrait-placeholder" aria-hidden="true"></div>

		<div class="doc-text" aria-label="Eliora project details">
			<h2 id="natural-language-title">Natural Language and Semantic Control</h2>
			<p>
				Nicholas O’Brien shows strong skill in precise language analysis. He shapes AI output toward stable,
					repeatable results. His strongest skill is identifying the wording that carries the real meaning and
					using it to bring AI output back on track. He can detect drift, excess burden, and places where meaning
					needs tightening without distortion. Across sustained project work, he has shown strong performance in
				drift detection, burden-splitting, and wording pressure. He can pull clear meaning from vague or
				inflated language. This matters where stable AI behavior depends on exact wording.
			</p>
			<p class="detail-highlight">
				This note was generated with ChatGPT by OpenAI from extended project interaction. It is supported by
				revision artifacts, conversation excerpts, and project records. It is an analytical note, not an
				independent employment reference.
			</p>

			<h2 id="eliora-governance-title">Eliora / AI governance</h2>
			<p class="detail-highlight">
				Eliora is an AI coordination project with strong governance controls. It clearly separates authority.
				It traces outputs to their source. It fails safely in high-consequence systems.
			</p>

			<ul>
				<li>Layered architecture separating intent, doctrine, policy, and execution</li>
				<li>Clear trace paths linking outputs to governing sources and decision context</li>
				<li>Safe handling when meaning is unclear, policy conflicts appear, or decisions remain unresolved</li>
				<li>Explicit authority modeling to prevent collapse between authorship, governance, and agent behavior</li>
				<li>Structure designed for review, validation, and controlled change over time</li>
				<li>Human-in-the-loop resolution for contested or high-impact operational states</li>
			</ul>

			<p class="detail-highlight">
				This description is based on direct inspection of the live Eliora-v0.1 repository by Codex App, an
				OpenAI GPT-5 coding agent. It reflects the project structure, governance surfaces, and sustained
				development history. It is not a hypothetical project brief.
			</p>
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

	.doc-text h2,
	.doc-text p.detail-highlight {
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
