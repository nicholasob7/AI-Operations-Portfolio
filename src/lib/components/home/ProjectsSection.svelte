<script lang="ts">
	type Props = {
		navigationReady: boolean;
	};

	let { navigationReady }: Props = $props();
</script>

<section class="card" aria-labelledby="selected-work-head">
	<h2 id="selected-work-head" tabindex="-1">Resume Versions</h2>
	<div class="projects">
		<article class="project-card project-card-remediation resume-versions-card" tabindex="-1">
			<p>
				There are three current resumes on this website. They are generated and served from one
				canonical JSON and canonical public profile source so the public evidence stays consistent
				even when the presentation emphasis changes.
			</p>
			<p>
				The current emphases are <strong>IT Support</strong>,
				<strong>Technical Operations</strong>, and
				<strong>AI / Process Improvement</strong>.
			</p>
			<p>
				These versions exist to save recruiters time by presenting the same underlying professional
				evidence with different role emphasis, key terms, and skill areas relevant to different
				recruiting and compliance processes.
			</p>
			<a
				aria-disabled={!navigationReady}
				class:interaction-disabled={!navigationReady}
				class="cta cta-resume section-cta-remediation"
				href="/resume"
				data-sveltekit-preload-code="hover"
				tabindex={navigationReady ? undefined : -1}
			>
				View Resume Versions
			</a>

			<section class="resume-publication-layer" aria-labelledby="website-build-notes-head">
				<h3 id="website-build-notes-head" tabindex="-1">Website Publication Layer</h3>
				<p>
					The same publication logic also includes the website publication layer: the public-facing
					structure that describes how the profile, route metadata, and machine-readable surfaces are
					published without changing the underlying resume or project routes.
				</p>
				<a
					aria-disabled={!navigationReady}
					class:interaction-disabled={!navigationReady}
					class="cta cta-resume section-cta-eliora"
					href="/projects/website-build-notes"
					data-sveltekit-preload-code="hover"
					tabindex={navigationReady ? undefined : -1}
				>
					View Publication Layer
				</a>
			</section>
		</article>
	</div>
</section>
