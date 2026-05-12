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
		evidenceNodeId: 'endpoint_remediation',
		href: '/highlights/endpoint-remediation',
		ctaLabel: 'Endpoint Remediation',
		ctaClass: 'endpoint-remediation-cta'
	},
	{
		evidenceNodeId: 'package_redesign',
		href: '/highlights/package-redesign',
		ctaLabel: 'Package Redesign',
		ctaClass: 'package-redesign-cta'
	},
	{
		evidenceNodeId: 'ai_governance',
		href: '/highlights/ai-governance',
		ctaLabel: 'AI Governance',
		ctaClass: 'ai-governance-cta'
	},
	{
		evidenceNodeId: 'website_publication',
		href: '/highlights/website-publication',
		ctaLabel: 'Website Publication',
		ctaClass: 'website-publication-cta'
	}
];
