<script lang="ts">
	import { evidenceNodeById } from '$lib/content/evidence-nodes';
	import type { EvidenceNodeId } from '$lib/content/types';

	type Props = {
		navigationReady: boolean;
	};

	let { navigationReady }: Props = $props();

	const evidenceHighlights = [
		{
			id: 'endpoint_remediation_script' as EvidenceNodeId,
			title: 'Endpoint Remediation Script',
			href: '/projects/remediation-script-development',
			ctaClass: 'section-cta-remediation'
		},
		{
			id: 'migration_stabilization_framework' as EvidenceNodeId,
			title: 'Migration Stabilization Framework',
			href: '/projects/migration-stabilization-framework',
			ctaClass: 'section-cta-migration'
		},
		{
			id: 'eliora_governance' as EvidenceNodeId,
			title: 'Eliora Governance',
			href: '/projects/eliora',
			ctaClass: 'section-cta-eliora'
		},
		{
			id: 'website_publication_system' as EvidenceNodeId,
			title: 'Website Publication System',
			href: '/projects/website-build-notes',
			ctaClass: 'section-cta-eliora'
		}
	].map((entry) => ({
		...entry,
		summary: evidenceNodeById[entry.id].summary
	}));
</script>

<section class="card self-directed-section" aria-labelledby="self-directed-head">
	<h2 id="self-directed-head" tabindex="-1">Evidence Highlights</h2>
	<div class="projects">
		{#each evidenceHighlights as item}
			<article class="project-card project-card-governance" tabindex="-1">
				<h3>{item.title}</h3>
				<p class="project-summary">{item.summary}</p>
				<a
					aria-disabled={!navigationReady}
					class:interaction-disabled={!navigationReady}
					class={`cta cta-resume ${item.ctaClass}`}
					data-sveltekit-preload-code="hover"
					href={item.href}
					tabindex={navigationReady ? undefined : -1}
				>
					View Evidence
				</a>
			</article>
		{/each}
	</div>
</section>
