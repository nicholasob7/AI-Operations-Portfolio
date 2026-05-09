<script lang="ts">
	import { projectionSelectionGuidanceById } from '$lib/content/projection-guidance';
	import { getHumanVisibleResumeProjections } from '$lib/content/resume-projections';

	type Props = {
		navigationReady: boolean;
	};

	let { navigationReady }: Props = $props();

	const featuredProjections = getHumanVisibleResumeProjections().map((projection) => {
		const guidance = projectionSelectionGuidanceById[projection.id];
		return {
			id: projection.id,
			label: projection.label,
			href: projection.htmlPath,
			summary: guidance.selectionSummary
		};
	});
</script>

<section class="card">
	<h2 id="selected-work-head" tabindex="-1">Role-Specific Resumes</h2>
	<div class="projects">
		{#each featuredProjections as projection}
			<article class="project-card project-card-remediation" tabindex="-1">
				<h3>{projection.label}</h3>
				<p class="project-summary">{projection.summary}</p>
				<a
					aria-disabled={!navigationReady}
					class:interaction-disabled={!navigationReady}
					class="cta cta-resume section-cta-remediation"
					href={projection.href}
					data-sveltekit-preload-code="hover"
					tabindex={navigationReady ? undefined : -1}
				>
					View Resume
				</a>
			</article>
		{/each}
	</div>
</section>
