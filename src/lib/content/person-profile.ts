import {
	qualifications,
	resumeContactEmail,
	resumeCurrentEmployment,
	resumeGitHubDisplay,
	resumeGitHubUrl,
	resumeLinkedInProfileDisplay,
	resumeLinkedInProfileUrl,
	resumeLocation,
	resumeTwitterProfileDisplay,
	resumeTwitterProfileUrl,
	resumeWebsiteDisplay,
	resumeWebsiteUrl
} from './resume';
import type { PersonProfile, PublicLink } from './types';

export const personProfilePublicLinks = [
	{
		id: 'email',
		label: 'Email',
		displayValue: resumeContactEmail,
		href: `mailto:${resumeContactEmail}`,
		copyValue: resumeContactEmail
	},
	{
		id: 'website',
		label: 'Website',
		displayValue: resumeWebsiteDisplay,
		href: resumeWebsiteUrl,
		copyValue: resumeWebsiteUrl
	},
	{
		id: 'linkedin',
		label: 'LinkedIn',
		displayValue: resumeLinkedInProfileDisplay,
		href: resumeLinkedInProfileUrl,
		copyValue: resumeLinkedInProfileUrl
	},
	{
		id: 'github',
		label: 'GitHub',
		displayValue: resumeGitHubDisplay,
		href: resumeGitHubUrl,
		copyValue: resumeGitHubUrl
	},
	{
		id: 'twitter',
		label: 'X',
		displayValue: resumeTwitterProfileDisplay,
		href: resumeTwitterProfileUrl,
		copyValue: resumeTwitterProfileUrl
	}
] satisfies PublicLink[];

export const personProfile = {
	id: 'nicholas_obrien',
	name: "Nicholas Francis O'Brien",
	displayName: "Nicko O'Brien",
	location: resumeLocation,
	headline: 'IT professional with support, technical operations, and AI/process improvement capability.',
	summary: [
		'Enterprise IT support professional with current service desk experience and public evidence across support practice, technical operations, and AI/process improvement work.',
		'Published site scope is a canonical professional profile with reviewed evidence nodes and role-specific resume projections.',
		'Public detail remains intentionally bounded to protect sensitive operational substrate while preserving useful delivery evidence.'
	],
	publicLinks: personProfilePublicLinks,
	currentEmployment: resumeCurrentEmployment,
	qualifications,
	publicationNote:
		'This profile is the approved static publication surface for professional profile data, evidence nodes, projection metadata, and published PDF artifacts.'
} satisfies PersonProfile;
