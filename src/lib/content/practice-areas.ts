import type { PracticeArea, PracticeAreaId } from './types';

export const practiceAreas = [
	{
		id: 'support_practice',
		label: 'Support Practice',
		shortLabel: 'Support',
		summary:
			'Front-line and extended support capability across incident handling, service requests, Microsoft administration, identity/access work, remote support, and escalation judgment.',
		keywords: [
			'service desk',
			'help desk',
			'incident handling',
			'service requests',
			'microsoft 365',
			'identity and access',
			'remote support',
			'first-contact resolution'
		],
		evidenceNodeIds: [
			'service_desk_foundation',
			'privileged_access_and_operational_scope'
		],
		projectionIds: ['it_support', 'technical_operations', 'ai_process']
	},
	{
		id: 'technical_operations_practice',
		label: 'Technical Operations Practice',
		shortLabel: 'Technical Operations',
		summary:
			'Operational technical capability across endpoint troubleshooting, deployment diagnostics, application support, package investigation, access administration, and controlled remediation work.',
		keywords: [
			'endpoint support',
			'application support',
			'deployment diagnostics',
			'package investigation',
			'privileged access',
			'technical troubleshooting',
			'endpoint remediation'
		],
		evidenceNodeIds: [
			'privileged_access_and_operational_scope',
			'endpoint_remediation_script',
			'migration_stabilization_framework'
		],
		projectionIds: ['it_support', 'technical_operations']
	},
	{
		id: 'ai_process_improvement_practice',
		label: 'AI and Process Improvement Practice',
		shortLabel: 'AI and Process Improvement',
		summary:
			'AI-assisted operational capability across research, troubleshooting, remediation design, workflow mapping, documentation, and conversion of recurring issues into repeatable outputs.',
		keywords: [
			'ai operations',
			'process improvement',
			'ai-assisted research',
			'workflow mapping',
			'remediation design',
			'structured troubleshooting',
			'repeatable operational outputs'
		],
		evidenceNodeIds: [
			'endpoint_remediation_script',
			'migration_stabilization_framework',
			'eliora_governance',
			'website_publication_system'
		],
		projectionIds: ['technical_operations', 'ai_process', 'it_support']
	},
	{
		id: 'documentation_delivery_evidence',
		label: 'Documentation and Delivery Evidence',
		shortLabel: 'Documentation and Delivery',
		summary:
			'Public evidence of documentation quality, traceability, bounded communication, and delivery framing that supports both human readers and machine-readable publication surfaces.',
		keywords: [
			'documentation',
			'traceability',
			'technical communication',
			'public evidence',
			'delivery evidence',
			'machine-readable profile',
			'bounded disclosure'
		],
		evidenceNodeIds: [
			'service_desk_foundation',
			'privileged_access_and_operational_scope',
			'endpoint_remediation_script',
			'migration_stabilization_framework',
			'eliora_governance',
			'website_publication_system'
		],
		projectionIds: ['it_support', 'technical_operations', 'ai_process']
	}
] satisfies PracticeArea[];

export const practiceAreaById = Object.fromEntries(
	practiceAreas.map((area) => [area.id, area] as const)
) as Record<PracticeAreaId, (typeof practiceAreas)[number]>;

export const practiceAreaIds = practiceAreas.map((area) => area.id);
