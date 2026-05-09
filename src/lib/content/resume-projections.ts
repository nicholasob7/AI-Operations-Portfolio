export type ResumeProjectionStatus = 'active' | 'retired' | 'draft' | 'hidden';

export type ResumeProjectionId = 'it_support' | 'technical_operations' | 'ai_process';

export type ResumeProjection = {
	id: ResumeProjectionId;
	status: ResumeProjectionStatus;
	slug: string;
	label: string;
	roleFamily: string;
	roleTargets: string[];
	summary: string;
	htmlPath: string;
	pdfPath: string;
	humanVisible: boolean;
	machineVisible: boolean;
	canonicalPriority: number;
	sortOrder: number;
	version?: string;
	lastReviewed?: string;
	sha256?: string;
	supersedes?: string[];
	supersededBy?: string[];
	legacyOf?: string;
	notes?: string[];
};

export const resumeProjectionRegistryVersion = '2026-05-role-specific';

export const resumeProjectionRegistry: ResumeProjection[] = [
	{
		id: 'it_support',
		status: 'active',
		slug: 'it-support',
		label: 'IT Support',
		roleFamily: 'Enterprise IT support and service desk delivery',
		roleTargets: [
			'IT Support',
			'Service Desk',
			'Help Desk',
			'Desktop Support',
			'IT Support Analyst'
		],
		summary:
			'Front-line enterprise support projection for incident handling, service requests, Microsoft administration, identity and access work, endpoint troubleshooting, and escalation judgment.',
		htmlPath: '/resume/it-support',
		pdfPath: '/resumes/Nicholas_OBrien_Resume_IT_Support.pdf',
		humanVisible: true,
		machineVisible: true,
		canonicalPriority: 1,
		sortOrder: 1
	},
	{
		id: 'technical_operations',
		status: 'active',
		slug: 'technical-operations',
		label: 'Technical Operations',
		roleFamily: 'Technical operations, endpoint support, and deployment diagnostics',
		roleTargets: [
			'Technical Operations',
			'Systems Support',
			'Application Support',
			'Endpoint Support',
			'Deployment Support'
		],
		summary:
			'Operational support projection for endpoint remediation, application support, deployment troubleshooting, privileged access handling, package-level investigation, and structured improvement work.',
		htmlPath: '/resume/technical-operations',
		pdfPath: '/resumes/Nicholas_OBrien_Resume_Technical_Operations.pdf',
		humanVisible: true,
		machineVisible: true,
		canonicalPriority: 1,
		sortOrder: 2
	},
	{
		id: 'ai_process',
		status: 'active',
		slug: 'ai-process',
		label: 'AI / Process Improvement',
		roleFamily: 'AI-assisted operations and process improvement',
		roleTargets: [
			'AI / Process Improvement',
			'AI Operations',
			'Process Improvement',
			'Technical Analyst',
			'Automation-Adjacent Operations'
		],
		summary:
			'AI-forward operations projection for workflow mapping, troubleshooting analysis, documentation, remediation design, and turning recurring support issues into repeatable operational outputs.',
		htmlPath: '/resume/ai-process',
		pdfPath: '/resumes/Nicholas_OBrien_Resume_AI_Process.pdf',
		humanVisible: true,
		machineVisible: true,
		canonicalPriority: 1,
		sortOrder: 3
	}
];

const bySortOrder = (a: ResumeProjection, b: ResumeProjection) => a.sortOrder - b.sortOrder;

export const getAllResumeProjections = () => [...resumeProjectionRegistry].sort(bySortOrder);

export const getActiveResumeProjections = () =>
	getAllResumeProjections().filter((projection) => projection.status === 'active');

export const getHumanVisibleResumeProjections = () =>
	getActiveResumeProjections().filter((projection) => projection.humanVisible);

export const getMachineVisibleResumeProjections = () =>
	getActiveResumeProjections().filter((projection) => projection.machineVisible);

export const getRetiredResumeProjections = () =>
	getAllResumeProjections().filter((projection) => projection.status === 'retired');

export const activeResumeProjectionIds = getActiveResumeProjections().map((projection) => projection.id);

export const humanVisibleResumeProjectionIds = getHumanVisibleResumeProjections().map(
	(projection) => projection.id
);

export const machineVisibleResumeProjectionIds = getMachineVisibleResumeProjections().map(
	(projection) => projection.id
);

export const getResumeProjectionById = (id: ResumeProjectionId) =>
	getAllResumeProjections().find((projection) => projection.id === id);

export const getResumeProjectionBySlug = (slug: string) =>
	getAllResumeProjections().find((projection) => projection.slug === slug);

export const isActiveResumeProjectionId = (
	id: string | null | undefined
): id is ResumeProjectionId => activeResumeProjectionIds.includes(id as ResumeProjectionId);

export const isActiveResumeProjectionSlug = (slug: string | null | undefined) =>
	!!slug && getActiveResumeProjections().some((projection) => projection.slug === slug);
