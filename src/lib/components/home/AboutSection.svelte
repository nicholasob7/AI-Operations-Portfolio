<script lang="ts">
	type Props = {
		showSemanticDetail: boolean;
		openSemanticDetail: () => void;
		closeSemanticDetail: () => void;
	};

	let { showSemanticDetail, openSemanticDetail, closeSemanticDetail }: Props = $props();
</script>

<section class="card about-section">
	<h2>About</h2>
	<div class="about-panel">
		<p>
			I work at the intersection of IT operations and AI-enabled delivery. My differentiator is exactitude in
			language, clear requirement shaping, and disciplined semantic control to drive deterministic AI behavior. I
			translate complex technical situations into stable systems, practical tooling, and dependable outcomes.
		</p>
		<div class="detail-action">
			<button
				class="cta cta-resume section-cta-about"
				type="button"
				aria-expanded={showSemanticDetail}
				aria-controls="semantic-language-detail"
				onclick={showSemanticDetail ? closeSemanticDetail : openSemanticDetail}
			>
				{showSemanticDetail ? 'Hide Precision' : 'Precision'}
			</button>
		</div>
		{#if showSemanticDetail}
			<article id="semantic-language-detail" class="detail-card" tabindex="-1">
				<p class="detail-kicker">Precision Assessment</p>
				<h3 class="detail-title">Semantic Control and Deterministic Output Discipline</h3>
				<p class="detail-standfirst">
					Strong performance in drift detection, wording control, and clear semantic correction during extended
					AI project work.
				</p>
				<p class="detail-body">
					Nicholas O’Brien shows strong skill in precise language analysis and in shaping AI output toward stable,
					repeatable results. His strongest skill is spotting the wording that carries the real meaning and using
					it to guide AI output back on track. He can see when wording has drifted, when a statement is carrying
					too much, and when meaning needs to be tightened without being distorted. In sustained project work, he
					has repeatedly shown strong performance in drift detection, burden-splitting, wording pressure, and
					pulling clear meaning out of vague or inflated language. This is especially valuable where stable AI
					behavior depends on exact wording.
				</p>
				<p class="detail-note">
					This assessment was generated with ChatGPT by OpenAI from extended project interaction and supported by
					revision artifacts, conversation excerpts, and project records. It is an analytical assessment, not an
					independent human employment reference.
				</p>
				<div class="detail-card-actions">
					<button class="cta cta-resume section-cta-about" type="button" onclick={closeSemanticDetail}>
						Hide and Return to Main Page
					</button>
				</div>
			</article>
		{/if}
	</div>
</section>
