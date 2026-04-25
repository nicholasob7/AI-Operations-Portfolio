<script lang="ts">
	type Props = {
		githubUrl: string;
		interactionReady: boolean;
	};

	let { githubUrl, interactionReady }: Props = $props();
</script>

<section id="hero-head" class="hero card" tabindex="-1">
	<div class="hero-aurora" aria-hidden="true"></div>
	<h1>Nicko O'Brien</h1>
	<p class="tagline">AI Operations Portfolio</p>
	<p class="proof">
		Technical communication, structured reasoning, and deterministic AI delivery for enterprise operations and
		automation.
	</p>
	<div class="links">
		<div class="hero-actions" aria-label="Primary actions">
			<a
				aria-disabled={!interactionReady}
				class="cta cta-github cta-feature"
				href={githubUrl}
				rel="noopener noreferrer me"
				style:pointer-events={interactionReady ? 'auto' : 'none'}
				tabindex={interactionReady ? undefined : -1}
				target="_blank"
			>
				GitHub<span class="sr-only"> (opens in new tab)</span>
			</a>
			<a
				aria-disabled={!interactionReady}
				class="cta cta-resume"
				data-sveltekit-preload-code="hover"
				href="/resume"
				style:pointer-events={interactionReady ? 'auto' : 'none'}
				tabindex={interactionReady ? undefined : -1}
			>
				Resume
			</a>
		</div>
	</div>
</section>
