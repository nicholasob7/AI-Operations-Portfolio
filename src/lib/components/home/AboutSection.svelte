<script lang="ts">
	type Props = {
		showPrecision: boolean;
		openPrecision: () => void;
		closePrecision: () => void;
	};

	let { showPrecision, openPrecision, closePrecision }: Props = $props();
</script>

<section class="card about-section">
	<h2 id="about-head" tabindex="-1">Natural Language</h2>
	<div class="about-panel">
		<p>
			I work at the intersection of IT operations and AI-enabled delivery. My differentiator is exactitude in
			language and clear requirement shaping. I use disciplined semantic control to drive deterministic AI
			behavior. I translate complex technical situations into stable systems, practical tooling, and dependable
			outcomes.
		</p>
		{#if !showPrecision}
			<div class="detail-action">
				<button
					class="cta cta-resume section-cta-about"
					type="button"
					aria-expanded={showPrecision}
					aria-controls="precision"
					onclick={openPrecision}
				>
					Quality
				</button>
			</div>
		{/if}
		{#if showPrecision}
			<article id="precision" class="detail-card" tabindex="-1">
				<p id="precision-head" class="detail-kicker" tabindex="-1">AI Quality</p>
				<h3 class="detail-title">Semantic Control and Deterministic Output Discipline</h3>
				<p class="detail-standfirst">
					Strong performance in drift detection and wording control. Clear semantic correction across extended AI
					project work.
				</p>
				<p class="detail-body">
					Nicholas O’Brien shows strong skill in precise language analysis. He shapes AI output toward stable,
					repeatable results. His strongest skill is spotting the wording that carries the real meaning. He then
					uses it to bring AI output back on track. He can see when wording has drifted, when a statement carries
					too much, and when meaning needs tightening without distortion. Across sustained project work, he has
					repeatedly shown strong performance in drift detection, burden-splitting, and wording pressure. He can
					pull clear meaning out of vague or inflated language. This matters where stable AI behavior depends on
					exact wording.
				</p>
				<p class="detail-note">
					This note was generated with ChatGPT by OpenAI from extended project interaction. It is supported by
					revision artifacts, conversation excerpts, and project records. It is an analytical note, not an
					independent human employment reference.
				</p>
				<div class="detail-card-actions">
					<button class="cta cta-resume section-cta-about" type="button" onclick={closePrecision}>
						Close Quality
					</button>
				</div>
			</article>
		{/if}
	</div>
</section>
