export type ResumeSkillGroup = {
	title: string;
	items: string[];
};

export type ResumeProgressionStage = {
	title: string;
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
	'The script was not at fault.',
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
		title: 'Service Desk Foundation',
		items: [
			'Began in November 2022 in a 5,000+ user environment across shared-service and single-organisation clients.',
			'Supported clients in transport, healthcare, energy, regional government, and consumer goods.',
			'Handled incidents and service requests from triage through resolution, documentation, and escalation.',
			'Resolved user, device, application, and access issues through remote support.'
		]
	},
	{
		title: 'Trusted Operational Scope',
		items: [
			'Progressed into dedicated BAU support for a major transport-sector client.',
			'Worked in a team sustaining 90%+ first-contact resolution.',
			'Analysed endpoint performance and device health issues as part of day-to-day support.',
			'Managed identity, access, and account lifecycle tasks within service desk scope.'
		]
	},
	{
		title: 'Specialist and Improvement Scope',
		items: [
			'Became the SME for privileged access requests across admin, local admin, shared, and external account types.',
			'Took on vendor-facing queue and transition responsibilities beyond normal front-line scope.',
			'Reworked a fragmented multi-ticket process using bulk changes, filter logic, and cross-ticket linkage.',
			'Reduced avoidable escalation, improved traceability, and cut staff time and repeat work.'
		]
	},
	{
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
		title: 'Identity and access administration',
		items: [
			'Active Directory',
			'Entra ID',
			'local admin',
			'guest accounts',
			'privileged access',
			'account lifecycle'
		]
	},
	{
		title: 'Messaging and Microsoft 365 support',
		items: [
			'Exchange Online',
			'mailbox creation',
			'mailbox access',
			'shared mailboxes',
			'distribution groups',
			'Microsoft 365 support'
		]
	},
	{
		title: 'Endpoint and device administration',
		items: [
			'Intune',
			'compliance',
			'BitLocker recovery',
			'Windows support',
			'drivers',
			'disk space',
			'device administration'
		]
	},
	{
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
		title: 'Network and connectivity troubleshooting',
		items: [
			'DNS issues',
			'connectivity faults',
			'first-line network diagnosis',
			'escalation to specialist teams'
		]
	},
	{
		title: 'Service operations and remote support',
		items: [
			'Jira Service Management',
			'triage',
			'incident and request handling',
			'escalation',
			'queue workflows',
			'remote support'
		]
	},
	{
		title: 'Knowledge, process, and documentation',
		items: [
			'documentation',
			'knowledge base use and creation',
			'troubleshooting steps',
			'workflow traceability'
		]
	},
	{
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
	'NTT internal certifications, including AI training'
];
