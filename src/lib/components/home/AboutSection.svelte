<script lang="ts">
	import { onMount, tick } from 'svelte';

	type Props = {
		showPrecision: boolean;
		openPrecision: () => void;
		closePrecision: () => void;
	};

	let { showPrecision, openPrecision, closePrecision }: Props = $props();
	let bottomCloseAction = $state<HTMLButtonElement | null>(null);
	let showFloatingClose = $state(false);

	const bottomCloseVisible = () => {
		if (!bottomCloseAction) return false;

		const rect = bottomCloseAction.getBoundingClientRect();
		return rect.top < window.innerHeight - 24 && rect.bottom > 24;
	};

	const updateFloatingClose = () => {
		showFloatingClose = showPrecision && !bottomCloseVisible();
	};

	onMount(() => {
		const handleViewportChange = () => {
			updateFloatingClose();
		};

		updateFloatingClose();
		window.addEventListener('scroll', handleViewportChange, { passive: true });
		window.addEventListener('resize', handleViewportChange);

		return () => {
			window.removeEventListener('scroll', handleViewportChange);
			window.removeEventListener('resize', handleViewportChange);
		};
	});

	$effect(() => {
		showPrecision;
		if (typeof window === 'undefined') return;
		void tick().then(() => {
			updateFloatingClose();
		});
	});
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
			{#if showFloatingClose}
				<div class="detail-floating-close">
					<button class="cta cta-resume section-cta-about" type="button" onclick={closePrecision}>
						Close
					</button>
				</div>
			{/if}
			<article id="precision" class="detail-card" tabindex="-1">
				<h3 id="precision-head" class="detail-title" tabindex="-1">Semantic Control</h3>
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
					<button
						bind:this={bottomCloseAction}
						class="cta cta-resume section-cta-about"
						type="button"
						onclick={closePrecision}
					>
						Close
					</button>
				</div>
			</article>
		{/if}
	</div>
</section>
