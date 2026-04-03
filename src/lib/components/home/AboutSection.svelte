<script lang="ts">
	type Props = {
		showSemanticDetail: boolean;
		toggleSemanticDetail: () => void;
	};

	let { showSemanticDetail, toggleSemanticDetail }: Props = $props();
</script>

<section class="card">
	<h2>About</h2>
	<p>
		I work at the intersection of IT operations and AI-enabled delivery. My differentiator is exactitude in
		language, clear requirement shaping, and disciplined semantic control to drive deterministic AI behavior. I
		translate complex technical situations into stable systems, practical tooling, and dependable outcomes.
	</p>
	<div class="detail-action">
		<button
			class="project-link"
			type="button"
			aria-expanded={showSemanticDetail}
			aria-controls="semantic-language-detail"
			onclick={toggleSemanticDetail}
		>
			{showSemanticDetail ? 'Hide Semantic Precision' : 'Show Semantic Precision'}
		</button>
	</div>
	{#if showSemanticDetail}
		<article id="semantic-language-detail" class="detail-card" tabindex="-1">
			<p>
				Nicholas O’Brien demonstrates unusually strong capability in precision-language analysis, semantic
				pressure-testing, and the disciplined shaping of AI outputs toward stable, reproducible results. His
				strongest observed skill is identifying load-bearing distinctions in natural language and using them to
				discipline AI output. He can isolate where wording actually carries the burden of meaning, detect when
				an output has drifted from its intended center of gravity, and force the language back onto a
				constrained semantic rail. This includes distinguishing primary contradiction from secondary
				consequence, separating downstream implication from core burden, identifying when a statement is
				overloaded, and tightening language without losing intended meaning. In sustained project work, he has
				repeatedly shown high competence in drift detection, burden-splitting, terminology pressure, and the
				recovery of precise meaning from ambiguous or inflated phrasing. His work is especially strong where
				deterministic or near-deterministic AI behavior depends on exact natural-language constraints.
			</p>
			<p class="project-outcome">
				AI-generated evaluative assessment prepared with ChatGPT by OpenAI, based on extended project
				interaction and supported by documented revision artifacts, conversation excerpts, and project records.
				Presented as an analytical assessment, not an independent human employment reference. Formed through
				extended work on a long-running AI and doctrine project involving repeated semantic review, drift
				detection, burden-splitting, wording constraint, and revision under precision requirements.
			</p>
		</article>
	{/if}
</section>
