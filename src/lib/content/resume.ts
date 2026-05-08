export type ResumeSkillGroupId =
	| 'identity_access'
	| 'm365'
	| 'endpoint'
	| 'enterprise_apps'
	| 'network'
	| 'service_ops'
	| 'knowledge_process'
	| 'ai_ops';

export type ResumeProgressionStageId =
	| 'service_desk_foundation'
	| 'dedicated_bau_transport'
	| 'specialist_improvement'
	| 'ai_forward_delivery';

export type ResumeInitiativeId = 'endpoint_remediation' | 'package_reconstruction';
export type ResumeScopeId = ResumeProgressionStageId | ResumeInitiativeId | 'delegated_scope';

export type ResumeSkillGroup = {
	id: ResumeSkillGroupId;
	title: string;
	items: string[];
};

export type ResumeProgressionStage = {
	id: ResumeProgressionStageId;
	title: string;
	period?: ResumePeriod;
	items: string[];
};

export type ResumeContactTarget = 'email' | 'website' | 'linkedin' | 'github' | 'twitter';

export type ResumeContactItem = {
	id: ResumeContactTarget;
	label: string;
	displayValue: string;
	copyValue: string;
	copiedMessage: string;
};

export type ResumePeriod = {
	startLabel: string;
	startIsoMonth: string | null;
	endLabel: string;
	endIsoMonth: string | null;
	isCurrent: boolean;
	display: string;
};

export type ResumeCurrentEmployment = {
	role: string;
	employer: string;
	location: string;
	period: ResumePeriod;
};

export type ResumeInitiativeMetadata = {
	id: ResumeInitiativeId;
	label: string;
	period: ResumePeriod;
};

export const formatResumeEmploymentRoleLine = (employment: ResumeCurrentEmployment) =>
	`${employment.role} — ${employment.employer}`;

export const formatResumeEmploymentLocationPeriodLine = (employment: ResumeCurrentEmployment) =>
	`${employment.location} | ${employment.period.display}`;

export const resumeLocation = 'Lower Hutt, New Zealand';
export const resumeContactEmail = 'nicko.obrien.ai@gmail.com';
export const resumeWebsiteDisplay = 'nicko.obrienai.com';
export const resumeWebsiteUrl = 'https://nicko.obrienai.com';
export const resumeLinkedInProfileDisplay = 'linkedin.com/in/nicholasfobrien/';
export const resumeLinkedInProfileUrl = 'https://linkedin.com/in/nicholasfobrien/';
export const resumeGitHubDisplay = 'github.com/nicholasob7';
export const resumeGitHubUrl = 'https://github.com/nicholasob7';
export const resumeTwitterProfileDisplay = 'x.com/nicho0101';
export const resumeTwitterProfileUrl = 'https://x.com/nicho0101';

export const resumeCurrentEmployment = {
	role: 'IT Service Desk Analyst',
	employer: 'NTT DATA',
	location: 'Wellington, New Zealand',
	period: {
		startLabel: 'November 2022',
		startIsoMonth: '2022-11',
		endLabel: 'Present',
		endIsoMonth: null,
		isCurrent: true,
		display: 'November 2022 – Present'
	}
} satisfies ResumeCurrentEmployment;

export const resumeCurrentEmploymentRoleLine =
	formatResumeEmploymentRoleLine(resumeCurrentEmployment);
export const resumeCurrentEmploymentLocationPeriodLine =
	formatResumeEmploymentLocationPeriodLine(resumeCurrentEmployment);

export const resumeInitiativeMetadata = {
	completed: {
		id: 'endpoint_remediation',
		label: 'Endpoint Remediation / Script Fix',
		period: {
			startLabel: 'August 2025',
			startIsoMonth: '2025-08',
			endLabel: 'October 2025',
			endIsoMonth: '2025-10',
			isCurrent: false,
			display: 'August–October 2025'
		}
	},
	active: {
		id: 'package_reconstruction',
		label: 'Package Reconstruction',
		period: {
			startLabel: 'February 2026',
			startIsoMonth: '2026-02',
			endLabel: 'Ongoing',
			endIsoMonth: null,
			isCurrent: true,
			display: 'February 2026 – Ongoing'
		}
	}
} satisfies Record<'completed' | 'active', ResumeInitiativeMetadata>;

export const resumeContactItems: ResumeContactItem[] = [
	{
		id: 'email',
		label: 'Email',
		displayValue: resumeContactEmail,
		copyValue: resumeContactEmail,
		copiedMessage: 'Email address copied to clipboard.'
	},
	{
		id: 'website',
		label: 'Website',
		displayValue: resumeWebsiteDisplay,
		copyValue: resumeWebsiteUrl,
		copiedMessage: 'Website address copied to clipboard.'
	},
	{
		id: 'linkedin',
		label: 'LinkedIn',
		displayValue: resumeLinkedInProfileDisplay,
		copyValue: resumeLinkedInProfileUrl,
		copiedMessage: 'LinkedIn profile URL copied to clipboard.'
	},
	{
		id: 'github',
		label: 'GitHub',
		displayValue: resumeGitHubDisplay,
		copyValue: resumeGitHubUrl,
		copiedMessage: 'GitHub profile URL copied to clipboard.'
	},
	{
		id: 'twitter',
		label: 'X',
		displayValue: resumeTwitterProfileDisplay,
		copyValue: resumeTwitterProfileUrl,
		copiedMessage: 'X profile URL copied to clipboard.'
	}
];

export const resumePublicDetailItems = resumeContactItems.filter((item) => item.id === 'website');
export const resumeContactChannelItems = resumeContactItems.filter((item) => item.id !== 'website');

export const contextPoints = [
	'Deeply engaged in learning and applying AI in my own time.',
	'Building projects at different scales.',
	'Personal investment supports continued technical growth.'
];

export const activeProjectCompleted = [
	'Built an AI-assisted endpoint fix script for a major vendor application.',
	'This involved AI-assisted research and coding.',
	'Observed application behaviour under different conditions.',
	'Tested approaches and script versions on a dedicated test device.',
	'The script passed validation and entered production for individual endpoint failures.',
	'L2 bundling with the existing install package failed.',
	'Used remediation results to identify package-level deployment issues requiring further reconstruction.',
	'This led to investigation of the install package itself.'
];

export const activeProjectActive = [
	'Rebuilding the enterprise app package from the proven fix.',
	'Test-device validation is complete.',
	'Further rollout stages remain.'
];

export const delegatedScope = [
	'I manage the printer queue serviced by a major external vendor.',
	'Supported a printer vendor transition through vendor liaison and project work.',
	'Resolved printer configuration issues beyond normal front-line scope.',
	'Reduced avoidable escalation.',
	'Reworked a fragmented multi-ticket process using bulk changes, filter logic, and cross-ticket linkage.',
	'Improved traceability across related requests.',
	'Cut staff time and repeat work.',
	'Advised on preserving classification and workflow visibility during the transition away from the three-ticket vendor model.'
];

export const progressionStages: ResumeProgressionStage[] = [
	{
		id: 'service_desk_foundation',
		title: 'Service Desk Foundation',
		period: {
			startLabel: 'November 2022',
			startIsoMonth: '2022-11',
			endLabel: 'late 2023',
			endIsoMonth: null,
			isCurrent: false,
			display: 'November 2022 – late 2023'
		},
		items: [
			'Began in November 2022 in a 5,000+ user environment across shared-service and single-organisation clients.',
			'Supported clients in transport, healthcare, energy, regional government, and consumer goods.',
			'Handled incidents and service requests from triage through resolution, documentation, and escalation.',
			'Resolved user, device, application, and access issues through remote support.'
		]
	},
	{
		id: 'dedicated_bau_transport',
		title: 'Dedicated BAU Support — Major NZ Transport Client',
		period: {
			startLabel: '2023',
			startIsoMonth: null,
			endLabel: 'Present',
			endIsoMonth: null,
			isCurrent: true,
			display: '2023 – Present'
		},
		items: [
			'Progressed into dedicated BAU support for a major transport-sector client.',
			'Worked in a team sustaining 90%+ first-contact resolution.',
			'Analysed endpoint performance and device health issues as part of day-to-day support.',
			'Managed identity, access, and account lifecycle tasks within service desk scope.'
		]
	},
	{
		id: 'specialist_improvement',
		title: 'Specialist and Improvement Scope',
		items: [
			'Became the SME for privileged access requests across admin, local admin, shared, and external account types.',
			'Took on vendor-facing queue and transition responsibilities beyond normal front-line scope.',
			'Reworked a fragmented multi-ticket process using bulk changes, filter logic, and cross-ticket linkage.',
			'Reduced avoidable escalation, improved traceability, and cut staff time and repeat work.'
		]
	},
	{
		id: 'ai_forward_delivery',
		title: 'AI-Forward Operational Delivery',
		items: [
			'Applied AI-assisted research and coding to build an endpoint remediation script for a major vendor application.',
			'Moved the work from test-device validation into controlled production use for individual endpoint failures.',
			'Turned remediation results into evidence for package investigation and rebuild work.',
			'Continued into enterprise package reconstruction from the proven fix.'
		]
	}
];

export const technicalSkills: ResumeSkillGroup[] = [
	{
		id: 'identity_access',
		title: 'Identity and access administration',
		items: [
			'Active Directory',
			'Entra ID',
			'security groups',
			'local admin',
			'guest accounts',
			'privileged access',
			'account lifecycle'
		]
	},
	{
		id: 'm365',
		title: 'Messaging and Microsoft 365 support',
		items: [
			'Microsoft 365 admin center',
			'licensing',
			'Exchange Online',
			'mailbox creation',
			'mailbox access',
			'shared mailboxes',
			'distribution groups',
			'Microsoft 365 support'
		]
	},
	{
		id: 'endpoint',
		title: 'Endpoint and device administration',
		items: [
			'Intune',
			'hardware',
			'compliance',
			'BitLocker recovery',
			'Windows support',
			'drivers',
			'disk space',
			'device administration'
		]
	},
	{
		id: 'enterprise_apps',
		title: 'Enterprise applications and deployment',
		items: [
			'vendor applications',
			'packaged installs',
			'application faults',
			'cache issues',
			'shortcut issues',
			'deployment support'
		]
	},
	{
		id: 'network',
		title: 'Network and connectivity troubleshooting',
		items: [
			'DNS issues',
			'connectivity faults',
			'first-line network diagnosis',
			'escalation to specialist teams'
		]
	},
	{
		id: 'service_ops',
		title: 'Service operations and remote support',
		items: [
			'ServiceNow',
			'Jira Service Management',
			'ITSM',
			'triage',
			'incident and request handling',
			'escalation',
			'queue workflows',
			'remote support'
		]
	},
	{
		id: 'knowledge_process',
		title: 'Knowledge, process, and documentation',
		items: [
			'remote/admin tools',
			'documentation',
			'knowledge base use and creation',
			'troubleshooting steps',
			'workflow traceability'
		]
	},
	{
		id: 'ai_ops',
		title: 'AI in IT operations',
		items: [
			'AI-assisted research',
			'troubleshooting',
			'scripting',
			'package rebuild',
			'workflow improvement'
		]
	}
];

export const qualifications = [
	'AWS Certified Cloud Practitioner',
	'AWS Foundations of Cloud Computing — Unitec / Te Pūkenga',
	'Bachelor of Arts, History and Political Science — Griffith University',
	'NTT internal certifications, including AI training',
	'NTT internal training via Skillsoft Percipio, including Microsoft Azure Fundamentals preparation, AI fundamentals, service management, security awareness, and enterprise IT support coursework'
];

export type ItSupportCompactExperienceBlock = {
	stageId: ResumeProgressionStageId;
	titleWithPeriod: string;
	items: string[];
};

export const itSupportProfessionalSummary = [
	'IT Service Desk Analyst at NTT DATA with nearly four years’ enterprise support experience across incidents, service requests, Microsoft administration, identity/access, endpoint, application, and network issues.',
	'Dedicated BAU support analyst for a major New Zealand transport-sector client, contributing to 90%+ first-contact resolution through structured troubleshooting, documentation, resolution ownership, and escalation judgment.'
];

export const itSupportCoreSkillLines = [
	'Service operations: ServiceNow, Jira Service Management; ITSM, incident/request ownership, escalation, SLA handling',
	'Microsoft administration: Microsoft 365 admin center, Intune, Entra ID, Exchange; identity, licensing, compliance, endpoint, app, messaging support',
	'Directory/access: Active Directory; account lifecycle, local/admin/privileged/service/shared/external access, security groups',
	'Endpoint/hardware/network support: Windows troubleshooting, vendor apps, packaged installs, deployments, network troubleshooting, DNS/connectivity diagnosis',
	'Technical tooling: remote/admin tools, knowledge bases, scripted fixes, PowerShell tooling, AI-assisted troubleshooting/scripting'
];

export const itSupportRelevantExperience: ItSupportCompactExperienceBlock[] = [
	{
		stageId: 'service_desk_foundation',
		titleWithPeriod: 'Service Desk Foundation | November 2022 – late 2023',
		items: [
			'Supported users in a 5,000+ user environment across shared-service and single-organisation clients.',
			'Owned incidents and service requests from diagnosis through resolution, documentation, or evidence-based escalation.',
			'Resolved user, endpoint, application, access, and network issues across remote enterprise support workflows.'
		]
	},
	{
		stageId: 'dedicated_bau_transport',
		titleWithPeriod: 'Dedicated BAU Support — Major NZ Transport Client | 2023 – Present',
		items: [
			'Progressed into dedicated BAU support for a major transport-sector client.',
			'Worked in a team sustaining 90%+ first-contact resolution.',
			'Managed identity, access, and account lifecycle work across Active Directory and Microsoft administration surfaces.',
			'Analysed endpoint performance and device health issues as part of day-to-day support.'
		]
	}
];

export const itSupportAdditionalScope = [
	'SME for privileged access requests across admin, local admin, shared, and external account types.',
	'Managed a printer queue serviced by a major external vendor.',
	'Supported printer vendor transition and resolved printer configuration issues beyond normal front-line scope.',
	'Improved traceability and reduced repeat work through bulk updates, filtering, and cross-ticket linkage.'
];

export const itSupportSelectedTechnicalImprovement = [
	'Built an AI-assisted PowerShell endpoint remediation script for a major vendor application.',
	'Tested script versions on a dedicated test device.',
	'Script passed validation and entered production for individual endpoint failures.',
	'Used remediation results to identify package-level deployment issues requiring further reconstruction.'
];

export const itSupportCompactQualifications = [
	'AWS Certified Cloud Practitioner | AWS Foundations of Cloud Computing — Unitec / Te Pūkenga',
	'BA History and Political Science — Griffith University | NTT internal certifications, including AI training',
	'NTT internal training via Skillsoft Percipio, including Microsoft Azure Fundamentals preparation, AI fundamentals, service management, security awareness, and enterprise IT support coursework'
];

export const technicalOperationsSummary = [
	'IT Service Desk Analyst at NTT DATA with hands-on technical operations experience across endpoint remediation, package reconstruction, vendor application support, deployment support, and privileged access handling.',
	'Additional scope includes endpoint performance and device health analysis, printer/vendor transition work, queue/process improvement, and AI-assisted research and scripting.'
];

export const technicalOperationsSelectedDelivery = [
	'Built an AI-assisted PowerShell endpoint remediation script for a major vendor application.',
	'Script passed validation and entered production for individual endpoint failures after dedicated test-device work.',
	'Used remediation results to identify package-level deployment issues requiring further reconstruction.',
	'Rebuilding the enterprise app package from the proven fix; test-device validation is complete and further rollout stages remain.'
];

export const technicalOperationsScope = [
	'Analysed endpoint performance and device health issues as part of day-to-day support.',
	'Managed identity, access, and account lifecycle work across Active Directory and Microsoft administration surfaces, including privileged access handling.',
	'Supported printer vendor transition and resolved printer configuration issues beyond normal front-line scope.',
	'Improved traceability and reduced repeat work through bulk updates, filtering, and cross-ticket linkage.'
];

export const technicalOperationsCoreSkillLines = [
	'Endpoint/device: Intune, compliance, BitLocker recovery, Windows support, drivers, disk space, device administration',
	'Applications/deployment: vendor applications, packaged installs, application faults, cache issues, shortcut issues, deployment support',
	'Access/admin: Active Directory, Entra ID, security groups, privileged access, account lifecycle, Microsoft 365 admin center, licensing',
	'Tooling/process: ServiceNow, Jira Service Management, ITSM, remote/admin tools, troubleshooting, scripted fixes, PowerShell tooling, AI-assisted troubleshooting/scripting'
];

export const technicalOperationsSupportingFoundation = [
	'Supported users in a 5,000+ user environment across shared-service and single-organisation clients.',
	'Owned incidents and service requests from diagnosis through resolution, documentation, or evidence-based escalation.'
];

export const technicalOperationsCompactQualifications = [
	'AWS Certified Cloud Practitioner | AWS Foundations of Cloud Computing — Unitec / Te Pūkenga',
	'NTT internal certifications, AI training, and Skillsoft Percipio coursework spanning Azure fundamentals preparation, AI fundamentals, service management, security awareness, and enterprise IT support'
];
