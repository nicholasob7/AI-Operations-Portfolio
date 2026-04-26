<script lang="ts">
	type Props = {
		navigationReady: boolean;
	};

	let { navigationReady }: Props = $props();
</script>

<section class="card">
	<h2 id="selected-work-head" tabindex="-1">Selected Work</h2>
	<div class="projects">
		<article id="remediation-head" class="project-card project-card-remediation" tabindex="-1">
			<h3>Script Fix</h3>
			<p class="project-summary">
				AI-assisted endpoint remediation for live post-deployment incidents. Built for production validation.
			</p>
			<p class="project-outcome">
				Outcome: Standardized production remediation with an evidence-driven validation workflow.
			</p>
					<a
						aria-disabled={!navigationReady}
						class="cta cta-resume section-cta-remediation"
						href="/projects/remediation-script-development"
						data-sveltekit-preload-code="hover"
						style:pointer-events={navigationReady ? 'auto' : 'none'}
						tabindex={navigationReady ? undefined : -1}
					>
					Script Fix
				</a>
		</article>
		<article id="deployment-head" class="project-card project-card-migration" tabindex="-1">
			<h3>Migration Fix</h3>
			<p class="project-summary">
				Evidence-driven migration stabilization methodology. Turns live remediation into robust package controls.
			</p>
			<p class="project-outcome">
				Outcome: Reproducible, audit-ready stabilization framework for enterprise deployment decisions.
			</p>
					<a
						aria-disabled={!navigationReady}
						class="cta cta-resume section-cta-migration"
						href="/projects/migration-stabilization-framework"
						data-sveltekit-preload-code="hover"
						style:pointer-events={navigationReady ? 'auto' : 'none'}
						tabindex={navigationReady ? undefined : -1}
					>
					Migration Fix
				</a>
		</article>
	</div>
</section>
