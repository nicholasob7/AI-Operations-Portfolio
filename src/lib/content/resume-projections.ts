import {
	activeProjectActive,
	activeProjectCompleted,
	delegatedScope,
	progressionStages,
	resumeInitiativeMetadata,
	technicalSkills,
	type ResumeInitiativeId,
	type ResumeProgressionStageId,
	type ResumeScopeId,
	type ResumeSkillGroup,
	type ResumeSkillGroupId
} from './resume.ts';

export type ResumeProjectionId = 'default' | 'it_support' | 'technical_operations' | 'ai_process';

export type ResumeSectionId = 'experience' | 'technical_skills' | 'qualifications' | 'public_details';
export type ResumeExperienceBlockId = 'initiative' | 'delegated_scope' | 'role_progression';

export type ResumeProjection = {
	id: ResumeProjectionId;
	label: string;
	pdfLayout: 'standard' | 'it_support_compact';
	purpose: string;
	intendedRoleFamilies: string[];
	headline: string;
	summary: string[];
	sectionOrder: ResumeSectionId[];
	experienceBlockOrder: ResumeExperienceBlockId[];
	promotedSkillGroupIds: ResumeSkillGroupId[];
	promotedScopeIds: ResumeScopeId[];
	progressionOrder: ResumeProgressionStageId[];
	initiativePlacement: 'early' | 'standard' | 'late';
	pdf: {
		label: string;
		href: string;
		filename: string;
		generatedHtmlFilename: string;
	};
};

export type ResumeScopeEvidence = {
	id: ResumeScopeId;
	label: string;
	meta?: string;
	items: string[];
};

const defaultSectionOrder: ResumeSectionId[] = [
	'experience',
	'technical_skills',
	'qualifications',
	'public_details'
];

const defaultProgressionOrder: ResumeProgressionStageId[] = [
	'service_desk_foundation',
	'dedicated_bau_transport',
	'specialist_improvement',
	'ai_forward_delivery'
];

const defaultSkillOrder: ResumeSkillGroupId[] = [
	'identity_access',
	'm365',
	'endpoint',
	'enterprise_apps',
	'network',
	'service_ops',
	'knowledge_process',
	'ai_ops'
];

export const resumeProjections = [
	{
		id: 'default',
		label: 'Default',
		pdfLayout: 'standard',
		purpose:
			'Balanced public resume for enterprise IT operations, IT support, technical operations, and process improvement.',
		intendedRoleFamilies: [
			'enterprise IT operations',
			'IT support',
			'technical operations',
			'process improvement'
		],
		headline: 'AI-Forward | Enterprise IT Operations | Process Improvement',
		summary: [
			'Enterprise IT operations professional with current NTT DATA service desk experience across support, access, endpoint, application, and vendor-facing workflows.',
			'Combines BAU support discipline with process improvement, endpoint remediation, and AI-assisted technical delivery.'
		],
		sectionOrder: defaultSectionOrder,
		experienceBlockOrder: ['initiative', 'delegated_scope', 'role_progression'],
		promotedSkillGroupIds: defaultSkillOrder,
		promotedScopeIds: ['dedicated_bau_transport', 'endpoint_remediation', 'delegated_scope'],
		progressionOrder: defaultProgressionOrder,
		initiativePlacement: 'standard',
		pdf: {
			label: 'Default PDF',
			href: '/resumes/Nicholas_OBrien_Resume_Default.pdf',
			filename: 'Nicholas_OBrien_Resume_Default.pdf',
			generatedHtmlFilename: 'resume-default-bw.html'
		}
	},
	{
		id: 'it_support',
		label: 'IT Support',
		pdfLayout: 'it_support_compact',
		purpose:
			'Service desk, help desk, desktop support, IT support analyst, and support engineer-adjacent roles.',
		intendedRoleFamilies: [
			'service desk',
			'help desk',
			'desktop support',
			'IT support analyst',
			'support engineer-adjacent'
		],
		headline: 'IT Support | Service Desk | Enterprise Support Operations',
		summary: [
			'IT Service Desk Analyst at NTT DATA with nearly four years’ enterprise support experience across incidents, service requests, Microsoft administration, identity/access, endpoint, application, and network issues.',
			'Dedicated BAU support analyst for a major New Zealand transport-sector client, contributing to 90%+ first-contact resolution through structured troubleshooting, documentation, resolution ownership, and escalation judgment.'
		],
		sectionOrder: ['experience', 'qualifications'],
		experienceBlockOrder: ['role_progression'],
		promotedSkillGroupIds: [
			'm365',
			'identity_access',
			'endpoint',
			'service_ops',
			'network',
			'enterprise_apps',
			'knowledge_process',
			'ai_ops'
		],
		promotedScopeIds: ['dedicated_bau_transport', 'service_desk_foundation', 'delegated_scope'],
		progressionOrder: [
			'dedicated_bau_transport',
			'service_desk_foundation',
			'specialist_improvement',
			'ai_forward_delivery'
		],
		initiativePlacement: 'late',
		pdf: {
			label: 'IT Support PDF',
			href: '/resumes/Nicholas_OBrien_Resume_IT_Support.pdf',
			filename: 'Nicholas_OBrien_Resume_IT_Support.pdf',
			generatedHtmlFilename: 'resume-it-support-bw.html'
		}
	},
	{
		id: 'technical_operations',
		label: 'Technical Operations',
		pdfLayout: 'standard',
		purpose:
			'Systems support, application support, endpoint support, infrastructure support, and deployment support roles.',
		intendedRoleFamilies: [
			'systems support',
			'application support',
			'endpoint support',
			'infrastructure support',
			'deployment support'
		],
		headline: 'Technical Operations | Endpoint Support | Deployment Improvement',
		summary: [
			'Enterprise support operator with current NTT DATA service desk grounding and hands-on endpoint, application, access, and deployment-support experience.',
			'Strong fit for technical operations roles needing structured remediation, package reconstruction, privileged access handling, vendor application support, and process improvement.'
		],
		sectionOrder: defaultSectionOrder,
		experienceBlockOrder: ['initiative', 'delegated_scope', 'role_progression'],
		promotedSkillGroupIds: [
			'endpoint',
			'enterprise_apps',
			'identity_access',
			'service_ops',
			'knowledge_process',
			'm365',
			'network',
			'ai_ops'
		],
		promotedScopeIds: ['endpoint_remediation', 'package_reconstruction', 'specialist_improvement'],
		progressionOrder: [
			'dedicated_bau_transport',
			'specialist_improvement',
			'ai_forward_delivery',
			'service_desk_foundation'
		],
		initiativePlacement: 'early',
		pdf: {
			label: 'Technical Operations PDF',
			href: '/resumes/Nicholas_OBrien_Resume_Technical_Operations.pdf',
			filename: 'Nicholas_OBrien_Resume_Technical_Operations.pdf',
			generatedHtmlFilename: 'resume-technical-operations-bw.html'
		}
	},
	{
		id: 'ai_process',
		label: 'AI / Process Improvement',
		pdfLayout: 'standard',
		purpose:
			'AI-forward operations, process improvement, technical analyst, and automation-adjacent operations roles.',
		intendedRoleFamilies: [
			'AI-forward operations',
			'process improvement',
			'technical analyst',
			'automation-adjacent operations'
		],
		headline: 'AI-Forward Operations | Process Improvement | Technical Analysis',
		summary: [
			'Enterprise IT support professional applying structured troubleshooting, documentation, traceability, and AI-assisted delivery to operational problems.',
			'Portfolio evidence includes machine-readable public structure, endpoint remediation work, and process redesign grounded in current NTT DATA service desk operations.'
		],
		sectionOrder: defaultSectionOrder,
		experienceBlockOrder: ['initiative', 'delegated_scope', 'role_progression'],
		promotedSkillGroupIds: [
			'ai_ops',
			'knowledge_process',
			'enterprise_apps',
			'endpoint',
			'service_ops',
			'identity_access',
			'm365',
			'network'
		],
		promotedScopeIds: ['endpoint_remediation', 'package_reconstruction', 'delegated_scope'],
		progressionOrder: [
			'ai_forward_delivery',
			'specialist_improvement',
			'dedicated_bau_transport',
			'service_desk_foundation'
		],
		initiativePlacement: 'early',
		pdf: {
			label: 'AI / Process Improvement PDF',
			href: '/resumes/Nicholas_OBrien_Resume_AI_Process.pdf',
			filename: 'Nicholas_OBrien_Resume_AI_Process.pdf',
			generatedHtmlFilename: 'resume-ai-process-bw.html'
		}
	}
] satisfies ResumeProjection[];

export const defaultResumeProjectionId = 'default' satisfies ResumeProjectionId;

export const resumeProjectionIds = resumeProjections.map((projection) => projection.id);

export const getResumeProjection = (id: string | null | undefined): ResumeProjection =>
	resumeProjections.find((projection) => projection.id === id) ?? resumeProjections[0];

export const isResumeProjectionId = (id: string | null | undefined): id is ResumeProjectionId =>
	resumeProjections.some((projection) => projection.id === id);

const orderByIds = <T extends { id: string }, TId extends string>(items: T[], ids: TId[]) => [
	...ids.map((id) => items.find((item) => item.id === id)).filter((item): item is T => Boolean(item)),
	...items.filter((item) => !ids.includes(item.id as TId))
];

export const getProjectedSkillGroups = (projection: ResumeProjection): ResumeSkillGroup[] =>
	orderByIds(technicalSkills, projection.promotedSkillGroupIds);

export const getProjectedProgressionStages = (projection: ResumeProjection) =>
	orderByIds(progressionStages, projection.progressionOrder);

export const getScopeEvidence = (id: ResumeScopeId): ResumeScopeEvidence | null => {
	if (id === 'endpoint_remediation') {
		return {
			id,
			label: resumeInitiativeMetadata.completed.label,
			meta: resumeInitiativeMetadata.completed.period.display,
			items: [
				activeProjectCompleted[0],
				activeProjectCompleted[4],
				activeProjectCompleted[7]
			]
		};
	}

	if (id === 'package_reconstruction') {
		return {
			id,
			label: resumeInitiativeMetadata.active.label,
			meta: resumeInitiativeMetadata.active.period.display,
			items: activeProjectActive
		};
	}

	if (id === 'delegated_scope') {
		return {
			id,
			label: 'Delegated Scope',
			items: [delegatedScope[0], delegatedScope[2], delegatedScope[4], delegatedScope[6]]
		};
	}

	const stage = progressionStages.find((progressionStage) => progressionStage.id === id);
	if (!stage) return null;

	return {
		id,
		label: stage.title,
		meta: stage.period?.display,
		items: stage.items.slice(0, 3)
	};
};

export const getProjectedScopeEvidence = (projection: ResumeProjection): ResumeScopeEvidence[] =>
	projection.promotedScopeIds
		.map((id) => getScopeEvidence(id))
		.filter((scope): scope is ResumeScopeEvidence => Boolean(scope));
