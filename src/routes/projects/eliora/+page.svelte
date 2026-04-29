<svelte:head>
	<title>Eliora AI Governance | Nicko O'Brien</title>
	<meta
		name="description"
		content="Compact portfolio page describing Eliora as an AI governance and coordination project."
	/>
</svelte:head>

<main class="detail-page">
	<section class="detail-card" aria-labelledby="eliora-title">
		<p class="eyebrow">Project Detail</p>
		<h1 id="eliora-title">Eliora AI Governance</h1>
		<p class="standfirst">
			Built to keep authority, derivation, and execution clearly separate. Designed for high-consequence
			agent systems.
		</p>
		<div class="future-portrait-placeholder" aria-hidden="true"></div>

			<div class="detail-text">
				<section class="detail-section detail-section-language" aria-labelledby="natural-language-title">
					<h2 id="natural-language-title">Natural Language and Semantic Control</h2>
					<p class="detail-body">
						Nicholas O’Brien shows strong skill in precise language analysis. He shapes AI output toward stable,
					repeatable results. His strongest skill is identifying the wording that carries the real meaning and
					using it to bring AI output back on track. He can detect drift, excess burden, and places where meaning
					needs tightening without distortion. Across sustained project work, he has shown strong performance in
						drift detection, burden-splitting, and wording pressure. He can pull clear meaning from vague or
						inflated language. This matters where stable AI behavior depends on exact wording.
					</p>
					<p class="detail-note detail-highlight">
						This note was generated with ChatGPT by OpenAI from extended project interaction. It is supported by
						revision artifacts, conversation excerpts, and project records. It is an analytical note, not an
						independent employment reference.
					</p>
				</section>

				<section class="detail-section detail-section-governance" aria-labelledby="eliora-governance-title">
					<h2 id="eliora-governance-title">Eliora / AI governance</h2>
					<p class="detail-body detail-highlight">
						Eliora is an AI coordination project with strong governance controls. It clearly separates authority.
						It traces outputs to their source. It fails safely in high-consequence systems.
					</p>

				<ul class="detail-list">
					<li>Layered architecture separating intent, doctrine, policy, and execution</li>
					<li>Clear trace paths linking outputs to governing sources and decision context</li>
					<li>Safe handling when meaning is unclear, policy conflicts appear, or decisions remain unresolved</li>
					<li>Explicit authority modeling to prevent collapse between authorship, governance, and agent behavior</li>
					<li>Structure designed for review, validation, and controlled change over time</li>
						<li>Human-in-the-loop resolution for contested or high-impact operational states</li>
					</ul>

					<p class="detail-note detail-highlight">
						This description is based on direct inspection of the live Eliora-v0.1 repository by Codex App, an
						OpenAI GPT-5 coding agent. It reflects the project structure, governance surfaces, and sustained
						development history. It is not a hypothetical project brief.
					</p>
				</section>
			</div>

		<div class="actions">
			<a class="detail-cta" data-sveltekit-preload-code="hover" href="/">Home</a>
			<a class="detail-cta" data-sveltekit-preload-code="hover" href="/#eliora-head">Back to Card</a>
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

		.detail-page {
			max-width: 960px;
			margin: 0 auto;
			min-height: 100vh;
			padding: clamp(2.5rem, 7vw, 5rem) 1.25rem clamp(3.5rem, 8vw, 6rem);
		}

	.detail-card {
		background:
			linear-gradient(rgba(14, 22, 42, 0.84), rgba(14, 22, 42, 0.84)) padding-box,
			linear-gradient(125deg, rgba(35, 148, 182, 0.54), rgba(110, 63, 177, 0.84), rgba(30, 141, 106, 0.84)) border-box;
			border: 1px solid transparent;
			border-radius: 1rem;
			padding: clamp(1.5rem, 5vw, 3rem);
			box-shadow: 0 14px 40px rgba(4, 8, 20, 0.55);
		}

	.eyebrow {
		margin: 0 0 0.45rem;
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #5ed8ff;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 7vw, 3.25rem);
		font-weight: 600;
		line-height: 1;
		letter-spacing: -0.025em;
	}

	.standfirst {
		max-width: 65ch;
		margin: 0.9rem 0 0;
		font-size: 1.14rem;
		line-height: 1.45;
		color: #c6d5ef;
	}

		.detail-text {
			display: grid;
			gap: clamp(1.15rem, 3vw, 2rem);
			margin-top: clamp(1.75rem, 4vw, 2.75rem);
		}

		.detail-section {
			display: grid;
			gap: 0.85rem;
			padding: clamp(1rem, 3vw, 1.5rem);
			border: 1px solid rgba(190, 215, 242, 0.24);
			border-radius: 1rem;
			background: linear-gradient(rgba(14, 22, 42, 0.72), rgba(14, 22, 42, 0.72)) padding-box;
		}

		.detail-section-governance {
			border-color: transparent;
			background:
				linear-gradient(rgba(14, 22, 42, 0.82), rgba(14, 22, 42, 0.82)) padding-box,
				linear-gradient(125deg, rgba(35, 148, 182, 0.54), rgba(110, 63, 177, 0.84), rgba(30, 141, 106, 0.84)) border-box;
		}

	p,
	li {
		font-size: 1rem;
		line-height: 1.55;
		color: #dce7f8;
	}

		p,
		ul {
			margin: 0;
		}

		h2 {
			margin: 0;
			font-size: 1.35rem;
			font-weight: 600;
			line-height: 1.18;
		}

			h2,
			.detail-highlight {
				color: transparent;
				background: linear-gradient(90deg, #5f9bb5 0%, #69579a 50%, #4b8068 100%);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

		.detail-list {
			display: grid;
			gap: 0.45rem;
			padding-left: 1.35rem;
			list-style: disc outside;
		}

		.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		margin-top: 1.5rem;
	}

	.detail-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.5rem;
		padding: 0.62rem 1rem;
		border: 1px solid rgba(190, 215, 242, 0.52);
		border-radius: 999px;
		color: #f4f8ff;
		text-decoration: none;
		background: linear-gradient(120deg, rgba(38, 94, 120, 0.78), rgba(71, 54, 117, 0.8));
	}
</style>
