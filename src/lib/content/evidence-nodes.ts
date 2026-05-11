import { getActiveResumeProjections } from './resume-projections';
import { resumeInitiativeMetadata, type ResumeInitiativeMetadata } from './resume';
import type { DisplayPeriod, EvidenceNode, EvidenceNodeId } from './types';

const allActiveProjectionIds = getActiveResumeProjections().map((projection) => projection.id);

const initiativePeriod = (initiative: ResumeInitiativeMetadata) => initiative.period;

const serviceDeskFoundationPeriod = {
	startLabel: 'November 2022',
	startIsoMonth: '2022-11',
	endLabel: 'late 2023',
	endIsoMonth: null,
	isCurrent: false,
	display: 'November 2022 – late 2023'
} satisfies DisplayPeriod;

const privilegedAccessOperationalScopePeriod = {
	startLabel: '2023',
	startIsoMonth: null,
	endLabel: 'Present',
	endIsoMonth: null,
	isCurrent: true,
	display: '2023 – Present'
} satisfies DisplayPeriod;

export const evidenceNodes = [
	{
		id: 'service_desk_foundation',
		label: 'Service Desk Foundation',
		summary:
			'Enterprise service desk foundation across incidents, service requests, remote support, documentation, and escalation judgment.',
		status: 'complete',
		practiceAreaIds: ['support_practice', 'documentation_delivery_evidence'],
		projectionIds: allActiveProjectionIds,
		route: null,
		keywords: [
			'service desk',
			'incident handling',
			'service requests',
			'remote support',
			'documentation',
			'escalation judgment'
		],
		publicDetails: [
			'Service desk work in a large enterprise support environment.',
			'Incidents and service requests handled from triage through resolution or evidence-based escalation.',
			'Remote support across user, device, application, and access issues.'
		],
		withheldDetailsNote:
			'Client-specific internal operational detail remains intentionally bounded to public professional summary level.',
		disclosure: 'bounded_public',
		period: serviceDeskFoundationPeriod
	},
	{
		id: 'privileged_access_and_operational_scope',
		label: 'Privileged Access and Operational Scope',
		summary:
			'Extended operational scope covering privileged access handling, vendor-facing coordination, queue/process improvement, and repeat-work reduction.',
		status: 'mixed_or_transitional',
		practiceAreaIds: [
			'support_practice',
			'technical_operations_practice',
			'documentation_delivery_evidence'
		],
		projectionIds: allActiveProjectionIds,
		route: null,
		keywords: [
			'privileged access',
			'vendor liaison',
			'queue operations',
			'traceability',
			'process improvement',
			'configuration support'
		],
		publicDetails: [
			'Privileged access request handling across multiple account/access types.',
			'Vendor-facing queue and transition support beyond normal front-line scope.',
			'Traceability and repeat-work reduction through bulk changes, filter logic, and cross-ticket linkage.'
		],
		withheldDetailsNote:
			'Sensitive client, vendor, queue, and internal process substrate remains intentionally withheld.',
		disclosure: 'bounded_public_with_sensitive_substrate_withheld',
		period: privilegedAccessOperationalScopePeriod
	},
	{
		id: 'endpoint_remediation_script',
		label: 'Endpoint Remediation Script',
		summary:
			'AI-assisted endpoint remediation development, validation, production use, and controlled translation of incident results into broader technical investigation.',
		status: 'complete',
		practiceAreaIds: [
			'technical_operations_practice',
			'ai_process_improvement_practice',
			'documentation_delivery_evidence'
		],
		projectionIds: ['technical_operations', 'ai_process', 'it_support'],
		route: '/highlights/endpoint-remediation',
		keywords: [
			'endpoint remediation',
			'PowerShell',
			'AI-assisted research',
			'validation',
			'production use',
			'technical troubleshooting'
		],
		publicDetails: [
			'Remediation script built from observed incident behavior rather than theoretical fixes.',
			'Testing moved from non-production work to device validation and controlled live use.',
			'Remediation outcomes informed broader package-level investigation.'
		],
		withheldDetailsNote:
			'Operational substrate, vendor-specific implementation detail, and deduction-enabling package internals remain intentionally withheld.',
		disclosure: 'bounded_public_with_sensitive_substrate_withheld',
		period: initiativePeriod(resumeInitiativeMetadata.completed)
	},
	{
		id: 'migration_stabilization_framework',
		label: 'Migration Stabilization Framework',
		summary:
			'Package reconstruction and migration stabilization work derived from validated remediation logic and test-device confirmation.',
		status: 'active',
		practiceAreaIds: [
			'technical_operations_practice',
			'ai_process_improvement_practice',
			'documentation_delivery_evidence'
		],
		projectionIds: ['technical_operations', 'ai_process'],
		route: '/highlights/package-redesign',
		keywords: [
			'migration stabilization',
			'deployment diagnostics',
			'package investigation',
			'change tracking',
			'test-device validation',
			'controlled deployment'
		],
		publicDetails: [
			'Validated remediation logic translated into package-level controls.',
			'Test-device reconstruction reached successful validation.',
			'Prepared review, change, and audit-ready framing for later rollout stages.'
		],
		withheldDetailsNote:
			'Specific package substrate, deployment mechanics, and deduction-enabling internal detail remain intentionally withheld.',
		disclosure: 'bounded_public_with_sensitive_substrate_withheld',
		period: initiativePeriod(resumeInitiativeMetadata.active)
	},
	{
		id: 'eliora_governance',
		label: 'Eliora Governance',
		summary:
			'AI governance thinking, semantic control, authority separation, and structured reasoning for high-consequence systems.',
		status: 'active',
		practiceAreaIds: ['ai_process_improvement_practice', 'documentation_delivery_evidence'],
		projectionIds: ['ai_process'],
		route: '/highlights/eliora',
		keywords: [
			'ai governance',
			'semantic control',
			'structured reasoning',
			'authority separation',
			'traceability',
			'human-in-the-loop'
		],
		publicDetails: [
			'Governance framing separates intent, doctrine, policy, and execution.',
			'Public material emphasizes semantic precision, traceability, and safe handling of ambiguity.',
			'Qualification notes keep analytical characterization separate from employment reference claims.'
		],
		withheldDetailsNote:
			'Only bounded public governance-direction detail is exposed through the portfolio surface.',
		disclosure: 'bounded_public'
	},
	{
		id: 'website_publication_system',
		label: 'Website Publication System',
		humanDisplayLabel: 'Publication Layer',
		summary:
			'Static publication discipline, machine-readable surface design, and controlled public delivery for the professional profile site itself.',
		status: 'active',
		practiceAreaIds: ['documentation_delivery_evidence', 'ai_process_improvement_practice'],
		projectionIds: ['ai_process'],
		route: '/highlights/website-build-notes',
		keywords: [
			'static publication',
			'machine-readable profile',
			'route metadata',
			'delivery boundaries',
			'interaction controls',
			'public structure'
		],
		publicDetails: [
			'Static publication surface with route metadata, sitemap, and machine-readable route.',
			'Interaction and transition behavior kept separate from page usability.',
			'Public structure remains intentionally bounded rather than modeling private system state.'
		],
		withheldDetailsNote:
			'Only selected implementation behavior relevant to public publication and delivery is exposed.',
		disclosure: 'bounded_public'
	}
] satisfies EvidenceNode[];

export const evidenceNodeById = Object.fromEntries(
	evidenceNodes.map((node) => [node.id, node] as const)
) as Record<EvidenceNodeId, (typeof evidenceNodes)[number]>;

export const evidenceNodeIds = evidenceNodes.map((node) => node.id);
