<script lang="ts">
	type Props = {
		githubUrl: string;
	};

	let { githubUrl }: Props = $props();
</script>

<section id="hero-head" class="hero card" tabindex="-1">
	<div class="hero-aurora-stack" aria-hidden="true">
		<div class="hero-aurora-frame hero-aurora-frame-1"></div>
		<div class="hero-aurora-frame hero-aurora-frame-2"></div>
		<div class="hero-aurora-frame hero-aurora-frame-3"></div>
		<div class="hero-aurora-frame hero-aurora-frame-4"></div>
	</div>
	<h1>Nicko O'Brien</h1>
	<p class="tagline">IT Professional Profile</p>
	<p class="proof">
		Support foundation, technical operations delivery evidence, and AI/process improvement capability from one
		reviewed professional profile.
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
		</div>
	</div>
</section>
