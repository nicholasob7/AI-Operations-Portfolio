import {
	personProfile,
	personProfilePublicLinks
} from './person-profile';
import {
	projectionSelectionGuidanceById
} from './projection-guidance';
import {
	getActiveResumeProjections,
	getResumeProjectionById,
	getResumeProjectionBySlug,
	type ResumeProjection,
	type ResumeProjectionId
} from './resume-projections';
import {
	aiProcessCompactQualifications,
	aiProcessMethodLines,
	aiProcessSelectedDelivery,
	aiProcessSelfDirectedWork,
	aiProcessSummary,
	aiProcessSupportingFoundation,
	aiProcessWorkflowImprovement,
	itSupportAdditionalScope,
	itSupportCompactQualifications,
	itSupportCoreSkillLines,
	itSupportProfessionalSummary,
	itSupportRelevantExperience,
	itSupportSelectedTechnicalImprovement,
	technicalOperationsCompactQualifications,
	technicalOperationsCoreSkillLines,
	technicalOperationsScope,
	technicalOperationsSelectedDelivery,
	technicalOperationsSummary,
	technicalOperationsSupportingFoundation
} from './resume';

export type ResumeDocumentBlock =
	| {
			type: 'paragraphs';
			lines: string[];
	  }
	| {
			type: 'bullet_list';
			items: string[];
	  }
	| {
			type: 'experience_group';
			items: Array<{
				title: string;
				items: string[];
			}>;
	  };

export type ResumeDocumentSection = {
	id:
		| 'professional_summary'
		| 'key_terms'
		| 'selected_experience'
		| 'selected_evidence'
		| 'qualifications';
	title: string;
	blocks: ResumeDocumentBlock[];
};

export type ResumeDocumentContactItem = {
	id: string;
	label: string;
	value: string;
	href: string;
};

export type ResumeProjectionDocument = {
	projectionId: ResumeProjectionId;
	slug: string;
	htmlPath: string;
	pdfPath: string;
	pageTitle: string;
	heading: string;
	subheading: string;
	roleFamily: string;
	sectionOrder: ResumeDocumentSection['id'][];
	sections: ResumeDocumentSection[];
	contactItems: ResumeDocumentContactItem[];
};

const primaryContactIds = new Set(['email', 'linkedin', 'github']);

const resumeDocumentContactItems: ResumeDocumentContactItem[] = personProfilePublicLinks
	.filter((item) => primaryContactIds.has(item.id))
	.map((item) => ({
		id: item.id,
		label: item.label,
		value: item.displayValue,
		href: item.href
	}));

const getProjectionOrThrow = (projectionId: ResumeProjectionId): ResumeProjection => {
	const projection = getResumeProjectionById(projectionId);
	if (!projection) {
		throw new Error(`Missing resume projection registry entry for "${projectionId}".`);
	}
	return projection;
};

const getRoleSubheading = (projectionId: ResumeProjectionId) => {
	const guidance = projectionSelectionGuidanceById[projectionId];
	return `${guidance.roleFamily} | ${personProfile.currentEmployment.role} | ${personProfile.currentEmployment.location}`;
};

const buildItSupportDocument = (): ResumeProjectionDocument => {
	const projection = getProjectionOrThrow('it_support');

	return {
		projectionId: projection.id,
		slug: projection.slug,
		htmlPath: projection.htmlPath,
		pdfPath: projection.pdfPath,
		pageTitle: `${projection.label} Resume | ${personProfile.name}`,
		heading: `${personProfile.name} | ${projection.label}`,
		subheading: getRoleSubheading(projection.id),
		roleFamily: projection.roleFamily,
		sectionOrder: [
			'professional_summary',
			'key_terms',
			'selected_experience',
			'selected_evidence',
			'qualifications'
		],
		sections: [
			{
				id: 'professional_summary',
				title: 'Professional Summary',
				blocks: [{ type: 'paragraphs', lines: itSupportProfessionalSummary }]
			},
			{
				id: 'key_terms',
				title: 'Key Terms and Skills',
				blocks: [{ type: 'bullet_list', items: itSupportCoreSkillLines }]
			},
			{
				id: 'selected_experience',
				title: 'Selected Experience',
				blocks: [
					{
						type: 'experience_group',
						items: itSupportRelevantExperience.map((experience) => ({
							title: experience.titleWithPeriod,
							items: experience.items
						}))
					},
					{
						type: 'bullet_list',
						items: itSupportAdditionalScope
					}
				]
			},
			{
				id: 'selected_evidence',
				title: 'Selected Evidence',
				blocks: [{ type: 'bullet_list', items: itSupportSelectedTechnicalImprovement }]
			},
			{
				id: 'qualifications',
				title: 'Qualifications',
				blocks: [{ type: 'bullet_list', items: itSupportCompactQualifications }]
			}
		],
		contactItems: resumeDocumentContactItems
	};
};

const buildTechnicalOperationsDocument = (): ResumeProjectionDocument => {
	const projection = getProjectionOrThrow('technical_operations');

	return {
		projectionId: projection.id,
		slug: projection.slug,
		htmlPath: projection.htmlPath,
		pdfPath: projection.pdfPath,
		pageTitle: `${projection.label} Resume | ${personProfile.name}`,
		heading: `${personProfile.name} | ${projection.label}`,
		subheading: getRoleSubheading(projection.id),
		roleFamily: projection.roleFamily,
		sectionOrder: [
			'professional_summary',
			'key_terms',
			'selected_experience',
			'selected_evidence',
			'qualifications'
		],
		sections: [
			{
				id: 'professional_summary',
				title: 'Professional Summary',
				blocks: [{ type: 'paragraphs', lines: technicalOperationsSummary }]
			},
			{
				id: 'key_terms',
				title: 'Key Terms and Skills',
				blocks: [{ type: 'bullet_list', items: technicalOperationsCoreSkillLines }]
			},
			{
				id: 'selected_experience',
				title: 'Selected Experience',
				blocks: [
					{ type: 'bullet_list', items: technicalOperationsScope },
					{ type: 'bullet_list', items: technicalOperationsSupportingFoundation }
				]
			},
			{
				id: 'selected_evidence',
				title: 'Selected Evidence',
				blocks: [{ type: 'bullet_list', items: technicalOperationsSelectedDelivery }]
			},
			{
				id: 'qualifications',
				title: 'Qualifications',
				blocks: [{ type: 'bullet_list', items: technicalOperationsCompactQualifications }]
			}
		],
		contactItems: resumeDocumentContactItems
	};
};

const buildAiProcessDocument = (): ResumeProjectionDocument => {
	const projection = getProjectionOrThrow('ai_process');

	return {
		projectionId: projection.id,
		slug: projection.slug,
		htmlPath: projection.htmlPath,
		pdfPath: projection.pdfPath,
		pageTitle: `${projection.label} Resume | ${personProfile.name}`,
		heading: `${personProfile.name} | ${projection.label}`,
		subheading: getRoleSubheading(projection.id),
		roleFamily: projection.roleFamily,
		sectionOrder: [
			'professional_summary',
			'key_terms',
			'selected_experience',
			'selected_evidence',
			'qualifications'
		],
		sections: [
			{
				id: 'professional_summary',
				title: 'Professional Summary',
				blocks: [{ type: 'paragraphs', lines: aiProcessSummary }]
			},
			{
				id: 'key_terms',
				title: 'Key Terms and Skills',
				blocks: [{ type: 'bullet_list', items: aiProcessMethodLines }]
			},
			{
				id: 'selected_experience',
				title: 'Selected Experience',
				blocks: [
					{ type: 'bullet_list', items: aiProcessWorkflowImprovement },
					{ type: 'bullet_list', items: aiProcessSupportingFoundation }
				]
			},
			{
				id: 'selected_evidence',
				title: 'Selected Evidence',
				blocks: [
					{ type: 'bullet_list', items: aiProcessSelectedDelivery },
					{ type: 'bullet_list', items: aiProcessSelfDirectedWork }
				]
			},
			{
				id: 'qualifications',
				title: 'Qualifications',
				blocks: [{ type: 'bullet_list', items: aiProcessCompactQualifications }]
			}
		],
		contactItems: resumeDocumentContactItems
	};
};

export const resumeProjectionDocuments = [
	buildItSupportDocument(),
	buildTechnicalOperationsDocument(),
	buildAiProcessDocument()
] satisfies ResumeProjectionDocument[];

export const resumeProjectionDocumentById = Object.fromEntries(
	resumeProjectionDocuments.map((document) => [document.projectionId, document] as const)
) as Record<ResumeProjectionId, (typeof resumeProjectionDocuments)[number]>;

export const getResumeProjectionDocumentById = (projectionId: ResumeProjectionId) =>
	resumeProjectionDocumentById[projectionId];

export const getResumeProjectionDocumentBySlug = (slug: string) => {
	const projection = getResumeProjectionBySlug(slug);
	if (!projection) return null;
	return getResumeProjectionDocumentById(projection.id);
};

export const activeResumeProjectionDocumentSlugs = getActiveResumeProjections().map(
	(projection) => projection.slug
);
