import { evidenceNodes } from '$lib/content/evidence-nodes';
import { personProfile } from '$lib/content/person-profile';
import {
	projectionIdsMissingGuidance,
	projectionSelectionGuidanceById
} from '$lib/content/projection-guidance';
import { practiceAreas } from '$lib/content/practice-areas';
import {
	getMachineVisibleResumeProjections,
	resumeProjectionRegistryVersion
} from '$lib/content/resume-projections';
import type {
	DisplayPeriod,
	EvidenceNode,
	PersonProfile,
	PracticeArea,
	ProjectionSelectionGuidance,
	PublicLink
} from '$lib/content/types';
import { canonicalOrigin, toCanonicalUrl } from '$lib/site';

type CanonicalRoute = {
	path: string;
	url: string;
};

const asRoute = (path: string): CanonicalRoute => ({
	path,
	url: toCanonicalUrl(path)
});

const toJsonPeriod = (period: DisplayPeriod) => ({
	start_label: period.startLabel,
	start_iso_month: period.startIsoMonth,
	end_label: period.endLabel,
	end_iso_month: period.endIsoMonth,
	is_current: period.isCurrent,
	display: period.display
});

const toJsonPublicLink = (link: PublicLink) => ({
	id: link.id,
	label: link.label,
	display_value: link.displayValue,
	href: link.href,
	copy_value: link.copyValue
});

const toJsonProfile = (profile: PersonProfile) => ({
	id: profile.id,
	name: profile.name,
	display_name: profile.displayName,
	location: profile.location,
	headline: profile.headline,
	summary: profile.summary,
	public_links: profile.publicLinks.map(toJsonPublicLink),
	current_employment: {
		role: profile.currentEmployment.role,
		employer: profile.currentEmployment.employer,
		location: profile.currentEmployment.location,
		period: toJsonPeriod(profile.currentEmployment.period)
	},
	qualifications: profile.qualifications,
	publication_note: profile.publicationNote ?? null
});

const toJsonPracticeArea = (practiceArea: PracticeArea) => ({
	id: practiceArea.id,
	label: practiceArea.label,
	short_label: practiceArea.shortLabel,
	summary: practiceArea.summary,
	keywords: practiceArea.keywords,
	evidence_node_ids: practiceArea.evidenceNodeIds,
	projection_ids: practiceArea.projectionIds
});

const toJsonEvidenceNode = (evidenceNode: EvidenceNode) => ({
	id: evidenceNode.id,
	label: evidenceNode.label,
	summary: evidenceNode.summary,
	status: evidenceNode.status,
	practice_area_ids: evidenceNode.practiceAreaIds,
	projection_ids: evidenceNode.projectionIds,
	...(evidenceNode.route ? { route: asRoute(evidenceNode.route) } : {}),
	keywords: evidenceNode.keywords,
	public_details: evidenceNode.publicDetails,
	disclosure: evidenceNode.disclosure,
	withheld_detail_note: evidenceNode.withheldDetailsNote,
	...(evidenceNode.period ? { period: toJsonPeriod(evidenceNode.period) } : {})
});

const practiceAreaIds = practiceAreas.map((practiceArea) => practiceArea.id);
const evidenceNodeIds = evidenceNodes.map((evidenceNode) => evidenceNode.id);

const evidenceNodeByProjectionId = Object.fromEntries(
	getMachineVisibleResumeProjections().map((projection) => [
		projection.id,
		evidenceNodes
			.filter((evidenceNode) => evidenceNode.projectionIds.some((id) => id === projection.id))
			.map((evidenceNode) => evidenceNode.id)
	])
);

const evidenceNodeByPracticeAreaId = Object.fromEntries(
	practiceAreas.map((practiceArea) => [
		practiceArea.id,
		evidenceNodes
			.filter((evidenceNode) => evidenceNode.practiceAreaIds.some((id) => id === practiceArea.id))
			.map((evidenceNode) => evidenceNode.id)
	])
);

const ensureGuidance = (projectionId: string): ProjectionSelectionGuidance => {
	const guidance = projectionSelectionGuidanceById[projectionId as keyof typeof projectionSelectionGuidanceById];
	if (!guidance) {
		throw new Error(`Missing projection guidance for projection id "${projectionId}".`);
	}
	return guidance;
};

const machineVisibleProjections = getMachineVisibleResumeProjections();

if (projectionIdsMissingGuidance.length > 0) {
	throw new Error(
		`Canonical projection guidance coverage is incomplete: ${projectionIdsMissingGuidance.join(', ')}`
	);
}

const mergedProjectionItems = machineVisibleProjections.map((projection) => {
	const guidance = ensureGuidance(projection.id);

	return {
		id: projection.id,
		status: projection.status,
		label: projection.label,
		role_family: projection.roleFamily,
		role_targets: projection.roleTargets,
		aliases: guidance.aliases,
		keywords: guidance.keywords,
		summary: projection.summary,
		selection_summary: guidance.selectionSummary,
		practice_area_ids: guidance.primaryPracticeAreaIds,
		...(guidance.secondaryPracticeAreaIds
			? { secondary_practice_area_ids: guidance.secondaryPracticeAreaIds }
			: {}),
		core_evidence_node_ids: guidance.coreEvidenceNodeIds,
			...(guidance.secondaryEvidenceNodeIds
				? { secondary_evidence_node_ids: guidance.secondaryEvidenceNodeIds }
				: {}),
			html_route: {
				path: projection.htmlPath,
				url: toCanonicalUrl(projection.htmlPath)
			},
			pdf: {
				path: projection.pdfPath,
				url: toCanonicalUrl(projection.pdfPath),
			human_visible: projection.humanVisible,
			machine_visible: projection.machineVisible
		},
		registry: {
			canonical_priority: projection.canonicalPriority,
			sort_order: projection.sortOrder
		}
	};
});

export function buildCanonical() {
	const profile = toJsonProfile(personProfile);

	const practiceAreaItems = practiceAreas.map(toJsonPracticeArea);
	const evidenceNodeItems = evidenceNodes.map(toJsonEvidenceNode);

	const resumeProjectionIndex = {
		registry_version: resumeProjectionRegistryVersion,
		human_index_route: '/resume',
		active_projection_ids: mergedProjectionItems.map((projection) => projection.id),
		projection_count: mergedProjectionItems.length,
		items: mergedProjectionItems.map((projection) => ({
			id: projection.id,
			label: projection.label,
			role_family: projection.role_family,
			role_targets: projection.role_targets,
			aliases: projection.aliases,
			keywords: projection.keywords,
				practice_area_ids: projection.practice_area_ids,
				evidence_node_ids: projection.core_evidence_node_ids,
				selection_summary: projection.selection_summary,
				html_route: {
					path: projection.html_route.path,
					url: projection.html_route.url
				},
				pdf: {
					path: projection.pdf.path,
					url: projection.pdf.url
			}
		}))
	};

	return {
		profile,
		practice_areas: {
			ids: practiceAreaIds,
			items: practiceAreaItems
		},
		resume_projection_index: resumeProjectionIndex,
		resume_projections: mergedProjectionItems,
		evidence_index: {
			ids: evidenceNodeIds,
			by_projection_id: evidenceNodeByProjectionId,
			by_practice_area_id: evidenceNodeByPracticeAreaId
		},
		evidence_nodes: evidenceNodeItems,
		artifacts: {
			canonical_json: asRoute('/canonical.json'),
			homepage: asRoute('/'),
			highlights_index: asRoute('/highlights'),
			resume_index: asRoute('/resume'),
			project_routes: evidenceNodes
				.filter((evidenceNode) => evidenceNode.route)
				.map((evidenceNode) => ({
					id: evidenceNode.id,
					label: evidenceNode.label,
					...asRoute(evidenceNode.route!)
				})),
				resume_pdfs: mergedProjectionItems.map((projection) => ({
					projection_id: projection.id,
					label: projection.label,
					path: projection.pdf.path,
					url: projection.pdf.url
				})),
				resume_html_routes: mergedProjectionItems.map((projection) => ({
					projection_id: projection.id,
					label: projection.label,
					path: projection.html_route.path,
					url: projection.html_route.url
				})),
				sitemap: asRoute('/sitemap.xml')
			},
		publication: {
			type: 'static_publication_surface',
			canonical_origin: canonicalOrigin,
			generated_from:
				'build-time content modules for profile, practice areas, evidence nodes, projection guidance, and published resume projection registry',
			scope:
				'reviewed public professional profile, evidence nodes, projection metadata, and published PDF artifacts',
			freshness: 'build-time projection',
			machine_reader_start_point: 'resume_projection_index'
		},
		future_generation_boundary: {
			runtime_bespoke_generation_supported: false,
			runtime_job_description_ingestion_supported: false,
			publication_model:
				'Only reviewed, committed PDF artifacts are published from this repository.',
			separate_generation_system_expected: true,
			future_integration_note:
				'A separate generation system may consume this canonical profile, practice, evidence, and projection model later to propose bespoke outputs for review.'
		}
	};
}
