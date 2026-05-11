import { resumeProjectionRegistry } from './resume-projections';
import type { ProjectionSelectionGuidance } from './types';

export const projectionSelectionGuidance = [
	{
		projectionId: 'it_support',
		roleFamily: 'Enterprise IT support and service desk delivery',
		selectionSummary:
			'Best aligned with front-line support, service desk delivery, Microsoft administration, identity/access work, and end-user issue resolution roles.',
		roleTargets: [
			'IT Support',
			'Service Desk',
			'Help Desk',
			'Desktop Support',
			'IT Support Analyst'
		],
		aliases: ['help desk', 'desktop support', 'service desk analyst'],
		keywords: [
			'incident handling',
			'service requests',
			'microsoft 365',
			'identity and access',
			'remote support',
			'first-contact resolution'
		],
		primaryPracticeAreaIds: ['support_practice', 'documentation_delivery_evidence'],
		secondaryPracticeAreaIds: ['technical_operations_practice'],
		coreEvidenceNodeIds: [
			'service_desk_foundation',
			'privileged_access_and_operational_scope'
		],
			secondaryEvidenceNodeIds: ['endpoint_remediation']
	},
	{
		projectionId: 'technical_operations',
		roleFamily: 'Technical operations, endpoint support, and deployment diagnostics',
		selectionSummary:
			'Built for endpoint remediation, application support, deployment diagnostics, package investigation, and structured technical troubleshooting roles.',
		roleTargets: [
			'Technical Operations',
			'Systems Support',
			'Application Support',
			'Endpoint Support',
			'Deployment Support'
		],
		aliases: ['systems support', 'application support', 'endpoint support', 'deployment support'],
		keywords: [
			'endpoint remediation',
			'deployment diagnostics',
			'package investigation',
			'privileged access',
			'technical troubleshooting'
		],
		primaryPracticeAreaIds: [
			'technical_operations_practice',
			'support_practice',
			'documentation_delivery_evidence'
		],
			coreEvidenceNodeIds: [
				'endpoint_remediation',
				'package_redesign',
				'privileged_access_and_operational_scope',
				'service_desk_foundation'
			]
	},
	{
		projectionId: 'ai_process',
		roleFamily: 'AI-assisted operations and process improvement',
		selectionSummary:
			'Suited to AI-assisted operational analysis, process improvement, documentation quality, remediation design, and converting recurring issues into repeatable outputs.',
		roleTargets: [
			'AI / Process Improvement',
			'AI Operations',
			'Process Improvement',
			'Technical Analyst',
			'Automation-Adjacent Operations'
		],
		aliases: [
			'ai operations',
			'process improvement',
			'technical analyst',
			'automation-adjacent operations'
		],
		keywords: [
			'ai-assisted research',
			'documentation',
			'workflow mapping',
			'remediation design',
			'structured troubleshooting',
			'repeatable operational outputs'
		],
		primaryPracticeAreaIds: [
			'ai_process_improvement_practice',
			'documentation_delivery_evidence'
		],
		secondaryPracticeAreaIds: ['technical_operations_practice'],
			coreEvidenceNodeIds: [
				'endpoint_remediation',
				'package_redesign',
				'ai_governance',
				'website_publication'
			],
		secondaryEvidenceNodeIds: ['privileged_access_and_operational_scope']
	}
] satisfies ProjectionSelectionGuidance[];

export const projectionSelectionGuidanceById = Object.fromEntries(
	projectionSelectionGuidance.map((guidance) => [guidance.projectionId, guidance] as const)
) as Record<(typeof projectionSelectionGuidance)[number]['projectionId'], (typeof projectionSelectionGuidance)[number]>;

export const projectionIdsMissingGuidance = resumeProjectionRegistry
	.map((projection) => projection.id)
	.filter((projectionId) => !(projectionId in projectionSelectionGuidanceById));
