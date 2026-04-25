<script lang="ts">
	type Props = {
		githubUrl: string;
	};

	let { githubUrl }: Props = $props();
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
				class="cta cta-github cta-feature"
				href={githubUrl}
				rel="noopener noreferrer me"
				target="_blank"
			>
				GitHub<span class="sr-only"> (opens in new tab)</span>
			</a>
			<a
				class="cta cta-resume"
				data-sveltekit-preload-code="hover"
				href="/resume"
			>
				Resume
			</a>
		</div>
	</div>
</section>
