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

export type ResumeInitiativeId = 'endpoint_remediation' | 'package_redesign';
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
export const resumeTwitterProfileDisplay = 'x.com/francis_o39763';
export const resumeTwitterProfileUrl = 'https://x.com/francis_o39763';

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
		id: 'package_redesign',
		label: 'Package Redesign',
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
	'Used remediation results to identify package-level deployment issues requiring further redesign.',
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
			'Continued into enterprise package redesign from the proven fix.'
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
	'NTT internal training via Skillsoft Percipio, including Azure AI, AI development, Microsoft Azure Fundamentals preparation, service management, security awareness, and enterprise IT support coursework'
];

export type ItSupportCompactExperienceBlock = {
	stageId: ResumeProgressionStageId;
	titleWithPeriod: string;
	items: string[];
};

export const itSupportProfessionalSummary = [
	'IT Service Desk Analyst at NTT DATA with over three and a half years’ enterprise support experience across incidents, service requests, Microsoft administration, identity/access, endpoint, application, and network issues.',
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
			'Supported users in a 5,000+ user enterprise environment across shared-service support operations.',
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
	'Built an AI-assisted PowerShell remediation script for a major vendor application endpoint issue.',
	'Tested versions on a dedicated device before production use.',
	'Script passed validation and entered production for individual endpoint failures.',
	'Recognised internally for initiative, documentation, manager endorsement, and cross-team circulation.',
	'Used results to identify package-level deployment issues requiring further redesign.'
];

export const itSupportCompactQualifications = [
	'AWS Certified Cloud Practitioner | AWS Foundations of Cloud Computing — Unitec / Te Pūkenga',
	'BA History and Political Science — Griffith University | NTT internal certifications, including AI training',
	'NTT internal training via Skillsoft Percipio, including Azure AI, AI development, Microsoft Azure Fundamentals preparation, service management, security awareness, and enterprise IT support coursework'
];

export const technicalOperationsSummary = [
	'IT Service Desk Analyst at NTT DATA with hands-on experience in endpoint remediation, application support, and Microsoft administration.',
	'Technical focus includes deployment diagnostics, fault-pattern analysis, package-level investigation, endpoint health, privileged access, and scripted remediation.',
	'Uses AI-assisted research and scripting to narrow faults, validate remediation paths, and improve escalation quality where access or ownership boundaries require handoff.'
];

export const technicalOperationsSelectedDelivery = [
	'Investigated a recurring vendor application endpoint failure through controlled manual testing. Built an AI-assisted PowerShell remediation script from the findings.',
	'Mapped safe remediation handling for application folders, cache contents, and local state files. Validated what could be cleared, regenerated, or preserved before production use.',
	'Documented the remediation process and circulated guidance to relevant teams. Recognised internally for initiative, documentation, and manager endorsement.',
	'Used endpoint remediation results to identify package-level deployment issues requiring further redesign.'
];

export const technicalOperationsScope = [
	'Analysed endpoint performance and device health issues during day-to-day support. Investigated recurring endpoint/application failures through device state and deployment symptoms.',
	'Managed identity, access, and account lifecycle work across Active Directory and Microsoft administration surfaces. Handled privileged access requests across admin, local admin, shared, and external account types.',
	'Supported printer vendor transition work. Resolved printer configuration issues beyond normal front-line scope.',
	'Improved operational traceability through bulk updates, filtering, and cross-ticket linkage. Produced repeatable remediation guidance for endpoint/application support workflows.',
	'Used remediation findings to separate endpoint-state faults from package-level deployment issues before escalation or handoff.'
];

export const technicalOperationsCoreSkillLines = [
	'Endpoint/device: Intune, compliance, BitLocker recovery, Windows support, drivers, disk space, device administration, endpoint health',
	'Applications/deployment: vendor applications, packaged installs, application faults, cache issues, shortcut issues, deployment diagnostics, remediation validation, package-level deployment diagnosis',
	'Access/admin: Active Directory, Entra ID, security groups, privileged access, account lifecycle, Microsoft 365 admin center, Exchange, licensing',
	'Tooling/process: ServiceNow, Jira Service Management, ITSM, remote/admin tools, operational troubleshooting, scripted fixes, PowerShell tooling, technical documentation, AI-assisted troubleshooting/scripting'
];

export const technicalOperationsSupportingFoundation = [
	'Supported users in a 5,000+ user enterprise environment across shared-service support operations.',
	'Owned incidents and service requests from diagnosis through resolution, documentation, or evidence-based escalation.'
];

export const technicalOperationsCompactQualifications = [
	'AWS Certified Cloud Practitioner | AWS Foundations of Cloud Computing — Unitec / Te Pūkenga',
	'BA History and Political Science — Griffith University',
	'NTT internal training via Skillsoft Percipio, including Azure AI, AI development, Microsoft Azure Fundamentals preparation, service management, security awareness, and enterprise IT support coursework'
];

export const aiProcessSummary = [
	'Enterprise IT support professional applying AI-assisted research, scripting, documentation, and structured troubleshooting to operational support problems.',
	'Uses AI as a practical delivery aid for fault analysis, remediation design, workflow mapping, documentation, automation enablement, and escalation quality.',
	'Well suited to evolving operational environments where loose problems need to become documented workflows, scripts, decisions, or repeatable outputs.'
];

export const aiProcessSelectedDelivery = [
	'Investigated a recurring vendor application endpoint failure through controlled manual testing. Used AI-assisted research and scripting to convert findings into a PowerShell remediation path.',
	'Mapped safe remediation handling for application folders, cache contents, and local state files. Validated what could be cleared, regenerated, or preserved before production use.',
	'Documented the remediation process and circulated guidance to relevant teams. Recognised internally for initiative, clarity, and manager endorsement.',
	'Used AI-assisted investigation to convert a recurring support failure into an internal remediation path, reducing dependency on higher-tier or external-vendor investigation.',
	'Built the remediation logic and evidence base needed to make package-level deployment automation actionable.'
];

export const aiProcessSelfDirectedWork = [
	'Building AI-forward portfolio, resume projection, and canonical profile workflows with deterministic PDF and machine-readable profile outputs.',
	'Developing data visualization, assistant-design, Linux support, and AI governance projects as applied AI systems practice.',
	'Uses self-directed AI systems projects to strengthen prompting, workflow design, documentation, deterministic outputs, technical communication, and operational analysis.'
];

export const aiProcessWorkflowImprovement = [
	'Improved operational traceability through bulk updates, filtering, and cross-ticket linkage.',
	'Used AI-assisted drafting and analysis to turn troubleshooting results into clearer documentation and repeatable guidance.',
	'Converted recurring support failures into remediation logic, documentation, and deployment evidence for automation-ready handoff.',
	'Supported printer vendor transition work and resolved configuration issues beyond normal front-line scope.',
	'Applied remediation evidence to improve handoff quality where access, ownership, or packaging boundaries required escalation.'
];

export const aiProcessMethodLines = [
	'AI-assisted operations: research, troubleshooting, scripting, documentation, remediation logic, playbooks, automation-ready handoff',
	'Process improvement: workflow traceability, process mapping, ticket linkage, repeatable guidance, documentation quality, handoff clarity',
	'Enterprise investigation: vendor applications, packaged installs, application faults, deployment symptoms, endpoint-state evidence',
	'Operational delivery: ServiceNow, Jira Service Management, incident/request handling, remote/admin tools, PowerShell tooling'
];

export const aiProcessSupportingFoundation = [
	'Supported users in a 5,000+ user enterprise environment across shared-service support operations.',
	'Owned incidents and service requests from diagnosis through resolution, documentation, or evidence-based escalation.'
];

export const aiProcessCompactQualifications = [
	'NTT internal training via Skillsoft Percipio, including Azure AI, AI development, Microsoft Azure Fundamentals preparation, implementation strategy, service management, security awareness, and enterprise IT support coursework.',
	'AWS Certified Cloud Practitioner | AWS Foundations of Cloud Computing — Unitec / Te Pūkenga',
	'BA History and Political Science — Griffith University'
];
