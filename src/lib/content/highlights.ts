import type { EvidenceNodeId } from './types';

export const highlightsIndexRoute = '/highlights';

export const highlightsPageTitle = 'Evidence Highlights';

export const highlightsPageSummary =
	'This index gathers the public evidence routes linked from the homepage.';

export const homepageHighlightsGatewayCopy =
	'Selected evidence from support work, technical operations, AI governance, and publication delivery is grouped in one highlights index.';

export type HighlightsEntry = {
	evidenceNodeId: EvidenceNodeId;
	href: string;
	ctaLabel: string;
	ctaClass: string;
};

export const highlightsEntries: HighlightsEntry[] = [
	{
		evidenceNodeId: 'endpoint_remediation_script',
		href: '/highlights/remediation-script-development',
		ctaLabel: 'View Evidence',
		ctaClass: 'section-cta-remediation'
	},
	{
		evidenceNodeId: 'migration_stabilization_framework',
		href: '/highlights/migration-stabilization-framework',
		ctaLabel: 'View Evidence',
		ctaClass: 'section-cta-migration'
	},
	{
		evidenceNodeId: 'eliora_governance',
		href: '/highlights/eliora',
		ctaLabel: 'View Evidence',
		ctaClass: 'section-cta-eliora'
	},
	{
		evidenceNodeId: 'website_publication_system',
		href: '/highlights/website-build-notes',
		ctaLabel: 'View Evidence',
		ctaClass: 'section-cta-eliora'
	}
];
