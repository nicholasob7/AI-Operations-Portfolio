import { canonicalSource } from '$lib/canonical/source';

export const prerender = true;

const machineProjectionTag = 'machine_recoverable';

const includedClaimIds = new Set(
	canonicalSource.claims
		.filter(
			(claim) =>
				claim.projectionTags.includes(machineProjectionTag) &&
				(claim.releaseState === 'retain' || claim.releaseState === 'retain_with_care')
		)
		.map((claim) => claim.id)
);

const includedSignalIds = new Set(
	canonicalSource.signals
		.filter((signal) => signal.releaseState === 'retain' || signal.releaseState === 'retain_with_care')
		.filter(
			(signal) =>
				signal.supportingIds.some((id) => includedClaimIds.has(id)) ||
				signal.supportingIds.some((id) => id.startsWith('rel_'))
		)
		.map((signal) => signal.id)
);

const includedRelationshipIds = new Set(
	canonicalSource.relationships
		.filter(
			(relationship) =>
				relationship.releaseState === 'retain' || relationship.releaseState === 'retain_with_care'
		)
		.filter(
			(relationship) =>
				(includedClaimIds.has(relationship.fromId) &&
					(includedClaimIds.has(relationship.toId) || includedSignalIds.has(relationship.toId))) ||
				(includedClaimIds.has(relationship.toId) && includedSignalIds.has(relationship.fromId))
		)
		.map((relationship) => relationship.id)
);

const finalizedSignalIds = new Set(
	canonicalSource.signals
		.filter((signal) => signal.releaseState === 'retain' || signal.releaseState === 'retain_with_care')
		.filter(
			(signal) =>
				signal.supportingIds.some((id) => includedClaimIds.has(id)) ||
				signal.supportingIds.some((id) => includedRelationshipIds.has(id))
		)
		.map((signal) => signal.id)
);

const includedContextIds = new Set(
	canonicalSource.claims
		.filter((claim) => includedClaimIds.has(claim.id))
		.flatMap((claim) => claim.contextIds)
);

const getClaim = (id: string) => canonicalSource.claims.find((claim) => claim.id === id);
const getSignal = (id: string) => canonicalSource.signals.find((signal) => signal.id === id);
const getRelationship = (id: string) =>
	canonicalSource.relationships.find((relationship) => relationship.id === id);
const getContext = (id: string) => canonicalSource.contexts.find((context) => context.id === id);

const isDefined = <T>(value: T | undefined): value is T => value !== undefined;

const summarizeWithholding = (
	items: Array<{ withheldDetailMarker: { status: string; note: string } }>
) => {
	const statuses = new Set(
		items
			.map((item) => item.withheldDetailMarker.status)
			.filter((status) => status !== 'none')
	);
	const notes = items
		.map((item) => item.withheldDetailMarker.note)
		.filter((note) => note.trim().length > 0);

	return {
		status: statuses.size > 0 ? 'present' : 'none',
		detail_statuses: [...statuses],
		note:
			notes.length > 0
				? notes[0]
				: 'No additional withholding marker is needed for this machine-facing entry.'
	};
};

const surfaceSpecs = [
	{
		id: 'homepage.hero',
		label: 'Homepage Hero Summary',
		surface_type: 'homepage_summary',
		coverage_status: 'covered',
		notes: ['Homepage identity summary and domain framing.']
	},
	{
		id: 'homepage.contact',
		label: 'Homepage Public Channels',
		surface_type: 'homepage_support',
		coverage_status: 'covered',
		notes: ['Public contact and profile channels exposed through homepage interaction.']
	},
	{
		id: 'homepage.selected_work',
		label: 'Homepage Selected Work Summaries',
		surface_type: 'homepage_support',
		coverage_status: 'covered',
		notes: ['Project-card summaries for currently surfaced public work.']
	},
	{
		id: 'homepage.quality',
		label: 'Homepage Quality and Semantic Control',
		surface_type: 'quality_surface',
		coverage_status: 'covered',
		notes: ['Language, semantic-control, and analytical qualification material.']
	},
	{
		id: 'homepage.personal',
		label: 'Homepage Personal and Governance',
		surface_type: 'personal_surface',
		coverage_status: 'covered',
		notes: ['Governance direction, control boundaries, and public qualification note.']
	},
	{
		id: 'resume.identity_context',
		label: 'Resume Identity and Context',
		surface_type: 'resume_surface',
		coverage_status: 'covered',
		notes: ['Resume header and context framing.']
	},
	{
		id: 'resume.initiative_scope',
		label: 'Resume Initiative Scope',
		surface_type: 'resume_surface',
		coverage_status: 'covered',
		notes: ['Completed remediation work and active package reconstruction.']
	},
	{
		id: 'resume.delegated_scope',
		label: 'Resume Delegated Scope',
		surface_type: 'resume_surface',
		coverage_status: 'covered',
		notes: ['Vendor-facing and process-improvement scope beyond normal front-line work.']
	},
	{
		id: 'resume.role_progression',
		label: 'Resume Role Progression',
		surface_type: 'resume_surface',
		coverage_status: 'covered',
		notes: ['Progression from service desk foundation to AI-forward operational delivery.']
	},
	{
		id: 'resume.technical_skills',
		label: 'Resume Technical Skills',
		surface_type: 'resume_surface',
		coverage_status: 'covered',
		notes: ['Current public skill-group taxonomy.']
	},
	{
		id: 'resume.qualifications',
		label: 'Resume Qualifications',
		surface_type: 'resume_surface',
		coverage_status: 'covered',
		notes: ['Published qualifications and certifications.']
	},
	{
		id: 'projects.remediation_detail',
		label: 'Remediation Project Detail',
		surface_type: 'project_detail',
		coverage_status: 'covered',
		notes: ['Full bounded public remediation project page coverage.']
	},
	{
		id: 'projects.migration_detail',
		label: 'Migration Stabilization Project Detail',
		surface_type: 'project_detail',
		coverage_status: 'covered',
		notes: ['Full bounded public migration stabilization project page coverage.']
	}
];

const entrySpecs = [
	{
		id: 'homepage-hero-summary',
		surface_id: 'homepage.hero',
		label: 'Homepage Hero Summary',
		entry_type: 'summary_entry',
		public_summary:
			'Homepage identity summary for AI-forward enterprise operations and deterministic AI delivery.',
		contextIds: ['ctx_home_publication', 'ctx_home_enterprise_ops'],
		claimIds: ['clm_home_summary'],
		relationshipIds: ['rel_home_summary_to_capability', 'rel_home_summary_to_context'],
		signalIds: ['sig_home_capability', 'sig_home_direction', 'sig_home_judgment'],
		projection_notes: ['Identity-facing summary entry for the homepage hero.']
	},
	{
		id: 'homepage-public-channels',
		surface_id: 'homepage.contact',
		label: 'Homepage Public Channels',
		entry_type: 'support_entry',
		public_summary: 'Public contact and profile channels intentionally exposed on the homepage.',
		contextIds: ['ctx_home_contact'],
		claimIds: [
			'clm_home_contact_email',
			'clm_home_contact_github',
			'clm_home_contact_linkedin',
			'clm_home_contact_twitter'
		],
		relationshipIds: [],
		signalIds: [],
		projection_notes: ['Interaction-dependent UI channels projected here as direct public contact/profile data.']
	},
	{
		id: 'homepage-selected-work-summaries',
		surface_id: 'homepage.selected_work',
		label: 'Homepage Selected Work Summaries',
		entry_type: 'support_entry',
		public_summary:
			'Selected-work summaries for remediation and migration work as currently surfaced on the homepage.',
		contextIds: ['ctx_home_selected_work', 'ctx_remediation_project', 'ctx_migration_project'],
		claimIds: ['clm_home_remediation_card', 'clm_home_migration_card'],
		relationshipIds: [
			'rel_home_remediation_card_to_capability',
			'rel_home_migration_card_to_capability',
			'rel_home_migration_card_to_confidence'
		],
		signalIds: [
			'sig_remediation_capability',
			'sig_remediation_confidence',
			'sig_migration_capability',
			'sig_migration_confidence'
		],
		projection_notes: ['Selected-work card summaries remain bounded and do not replace full project-detail surfaces.']
	},
	{
		id: 'homepage-quality-semantic-control',
		surface_id: 'homepage.quality',
		label: 'Homepage Quality and Semantic Control',
		entry_type: 'detail_entry',
		public_summary:
			'Homepage quality block covering semantic control, language precision, analytical characterization, and qualification note.',
		contextIds: ['ctx_quality'],
		claimIds: ['clm_quality_summary', 'clm_quality_standfirst', 'clm_quality_body', 'clm_quality_note'],
		relationshipIds: ['rel_quality_precision_to_capability', 'rel_quality_note_to_confidence'],
		signalIds: [
			'sig_quality_capability',
			'sig_quality_confidence',
			'sig_quality_judgment',
			'sig_quality_direction'
		],
		projection_notes: ['Includes the analytical/generated note and its qualifying public note.']
	},
	{
		id: 'homepage-personal-governance',
		surface_id: 'homepage.personal',
		label: 'Homepage Personal and Governance',
		entry_type: 'detail_entry',
		public_summary:
			'Homepage governance block covering public direction, governance structure, human escalation boundaries, and qualifying note.',
		contextIds: ['ctx_governance', 'ctx_high_consequence_agents'],
		claimIds: [
			'clm_governance_card_summary',
			'clm_governance_summary',
			'clm_governance_body',
			'clm_governance_structure_list',
			'clm_governance_human_loop',
			'clm_governance_note'
		],
		relationshipIds: [
			'rel_governance_summary_to_direction',
			'rel_governance_human_loop_to_judgment',
			'rel_governance_summary_to_discretion'
		],
		signalIds: [
			'sig_governance_direction',
			'sig_governance_judgment',
			'sig_governance_capability',
			'sig_governance_discretion'
		],
		projection_notes: ['Includes bounded qualification of the governance description basis.']
	},
	{
		id: 'project-remediation-detail',
		surface_id: 'projects.remediation_detail',
		label: 'Remediation Project Detail',
		entry_type: 'project_detail',
		public_summary:
			'Full bounded remediation project detail covering build workflow, findings, operational use, live progression, and explicit scope discipline.',
		contextIds: ['ctx_remediation_project', 'ctx_remediation_progression'],
		claimIds: [
			'clm_remediation_summary',
			'clm_remediation_build',
			'clm_remediation_findings',
			'clm_remediation_use',
			'clm_remediation_helped',
			'clm_remediation_progression',
			'clm_remediation_boundary'
		],
		relationshipIds: [
			'rel_remediation_action_to_progression',
			'rel_remediation_progression_to_confidence',
			'rel_remediation_boundary_to_judgment',
			'rel_remediation_build_to_capability',
			'rel_remediation_use_to_confidence',
			'rel_remediation_findings_to_judgment'
		],
		signalIds: ['sig_remediation_capability', 'sig_remediation_confidence', 'sig_remediation_judgment'],
		projection_notes: [
			'Full bounded public remediation project page.',
			'Operational substrate remains intentionally withheld.'
		]
	},
	{
		id: 'project-migration-detail',
		surface_id: 'projects.migration_detail',
		label: 'Migration Stabilization Project Detail',
		entry_type: 'project_detail',
		public_summary:
			'Full bounded migration project detail covering framework summary, findings, validated results, stakeholder utility, and reusable review discipline.',
		contextIds: ['ctx_migration_project', 'ctx_migration_progression'],
		claimIds: [
			'clm_migration_summary',
			'clm_migration_findings',
			'clm_migration_results',
			'clm_migration_helped',
			'clm_migration_worked'
		],
		relationshipIds: [
			'rel_migration_summary_to_capability',
			'rel_migration_results_to_confidence',
			'rel_migration_worked_to_judgment'
		],
		signalIds: ['sig_migration_capability', 'sig_migration_confidence', 'sig_migration_judgment'],
		projection_notes: [
			'Full bounded public migration stabilization project page.',
			'Validated test-device progress is represented without disclosing concealed package substrate.'
		]
	},
	{
		id: 'resume-identity-and-context',
		surface_id: 'resume.identity_context',
		label: 'Resume Identity and Context',
		entry_type: 'resume_section',
		public_summary: 'Resume header identity plus context statements about AI growth, projects, and technical direction.',
		contextIds: ['ctx_resume_identity', 'ctx_resume_context'],
		claimIds: ['clm_resume_identity', 'clm_resume_context_points'],
		relationshipIds: ['rel_resume_identity_to_capability', 'rel_resume_context_to_direction'],
		signalIds: ['sig_resume_capability', 'sig_resume_direction'],
		projection_notes: ['Resume-facing identity and direction section.']
	},
	{
		id: 'resume-initiative-scope',
		surface_id: 'resume.initiative_scope',
		label: 'Resume Initiative Scope',
		entry_type: 'resume_section',
		public_summary:
			'Resume initiative section covering completed remediation delivery and active package reconstruction work.',
		contextIds: ['ctx_resume_initiative', 'ctx_remediation_project', 'ctx_remediation_progression'],
		claimIds: ['clm_resume_initiative_completed', 'clm_resume_initiative_active'],
		relationshipIds: ['rel_resume_initiative_completed_to_confidence'],
		signalIds: ['sig_resume_capability', 'sig_resume_confidence', 'sig_resume_direction', 'sig_resume_judgment'],
		projection_notes: ['Completed and active initiative material remains bounded and avoids concealed package specifics.']
	},
	{
		id: 'resume-delegated-scope',
		surface_id: 'resume.delegated_scope',
		label: 'Resume Delegated Scope',
		entry_type: 'resume_section',
		public_summary:
			'Resume delegated-scope section covering vendor liaison, printer queue ownership, escalation reduction, and process redesign.',
		contextIds: ['ctx_resume_delegated_scope'],
		claimIds: ['clm_resume_delegated_scope'],
		relationshipIds: ['rel_resume_delegated_to_judgment'],
		signalIds: ['sig_resume_capability', 'sig_resume_judgment'],
		projection_notes: ['Delegated operational scope beyond normal front-line work.']
	},
	{
		id: 'resume-role-progression',
		surface_id: 'resume.role_progression',
		label: 'Resume Role Progression',
		entry_type: 'resume_section',
		public_summary:
			'Resume progression map from service desk foundation to trusted scope, specialist improvement work, and AI-forward operational delivery.',
		contextIds: ['ctx_resume_progression', 'ctx_resume_initiative', 'ctx_resume_delegated_scope'],
		claimIds: [
			'clm_resume_progression_foundation',
			'clm_resume_progression_trusted_scope',
			'clm_resume_progression_specialist_scope',
			'clm_resume_progression_ai_delivery'
		],
		relationshipIds: ['rel_resume_specialist_to_judgment', 'rel_resume_ai_delivery_to_direction'],
		signalIds: ['sig_resume_capability', 'sig_resume_confidence', 'sig_resume_judgment', 'sig_resume_direction'],
		projection_notes: ['Progression material is compressed by stage rather than mirrored bullet-for-bullet.']
	},
	{
		id: 'resume-technical-skills',
		surface_id: 'resume.technical_skills',
		label: 'Resume Technical Skills',
		entry_type: 'resume_section',
		public_summary:
			'Resume technical-skills taxonomy covering identity and access, Microsoft 365, endpoint support, enterprise applications, networking, service operations, documentation, and AI in IT operations.',
		contextIds: ['ctx_resume_skills'],
		claimIds: [
			'clm_resume_skills_identity_access',
			'clm_resume_skills_m365',
			'clm_resume_skills_endpoint',
			'clm_resume_skills_enterprise_apps',
			'clm_resume_skills_network',
			'clm_resume_skills_service_ops',
			'clm_resume_skills_knowledge',
			'clm_resume_skills_ai_ops'
		],
		relationshipIds: ['rel_resume_ai_skills_to_direction'],
		signalIds: ['sig_resume_capability', 'sig_resume_judgment', 'sig_resume_direction'],
		projection_notes: ['Skill groups are intentionally compressed as bounded public categories rather than expanded into atomic skill objects.']
	},
	{
		id: 'resume-qualifications',
		surface_id: 'resume.qualifications',
		label: 'Resume Qualifications',
		entry_type: 'resume_section',
		public_summary: 'Resume qualifications and certifications currently published on the web resume.',
		contextIds: ['ctx_resume_qualifications'],
		claimIds: ['clm_resume_qualifications'],
		relationshipIds: ['rel_resume_qualifications_to_confidence'],
		signalIds: ['sig_resume_confidence'],
		projection_notes: ['Qualifications remain bounded public confidence signals rather than exhaustive credential records.']
	}
];

const entries = entrySpecs.map((entry) => {
	const claims = entry.claimIds
		.map(getClaim)
		.filter(isDefined)
		.filter((claim) => includedClaimIds.has(claim.id))
		.map((claim) => ({
			id: claim.id,
			text: claim.claimText,
			kind: claim.claimKind,
			origin: claim.claimOrigin,
			inference: claim.inferenceLabel,
			release_state: claim.releaseState,
			status_or_progression: claim.statusOrProgression,
			withheld_detail: claim.withheldDetailMarker
		}));

	const signals = entry.signalIds
		.map(getSignal)
		.filter(isDefined)
		.filter((signal) => finalizedSignalIds.has(signal.id))
		.map((signal) => ({
			id: signal.id,
			class: signal.signalClass,
			summary: signal.signalNote,
			inference: signal.inferenceLabel,
			release_state: signal.releaseState,
			status_or_progression: signal.statusOrProgression
		}));

	const relationships = entry.relationshipIds
		.map(getRelationship)
		.filter(isDefined)
		.filter((relationship) => includedRelationshipIds.has(relationship.id))
		.map((relationship) => ({
			id: relationship.id,
			type: relationship.relationshipType,
			from: relationship.fromId,
			to: relationship.toId,
			summary: relationship.relationshipNote,
			inference: relationship.inferenceLabel,
			release_state: relationship.releaseState,
			status_or_progression: relationship.statusOrProgression
		}));

	const contexts = entry.contextIds
		.map(getContext)
		.filter(isDefined)
		.filter((context) => includedContextIds.has(context.id))
		.map((context) => ({
			id: context.id,
			type: context.contextType,
			summary: context.contextNote,
			status_or_progression: context.statusOrProgression
		}));

	const status_or_progression =
		claims.find((claim) => claim.status_or_progression.progressionNote.trim().length > 0)
			?.status_or_progression ??
		contexts.find((context) => context.status_or_progression.progressionNote.trim().length > 0)
			?.status_or_progression ?? {
			status: 'active',
			progressionNote: ''
		};

	return {
		id: entry.id,
		surface_id: entry.surface_id,
		label: entry.label,
		entry_type: entry.entry_type,
		public_summary: entry.public_summary,
		claims,
		signals,
		relationships,
		contexts,
		status_or_progression,
		withheld_detail: summarizeWithholding(
			entry.claimIds
				.map(getClaim)
				.filter(isDefined)
		),
		projection_notes: entry.projection_notes
	};
});

const surfaces = surfaceSpecs.map((surface) => ({
	...surface,
	entry_ids: entries.filter((entry) => entry.surface_id === surface.id).map((entry) => entry.id)
}));

const body = {
	projection: {
		id: 'canonical-machine-readable-projection',
		version: '1.0',
		type: 'machine-readable-projection',
		derived_from: '$lib/canonical/source.ts',
		scope: 'bounded public canonical coverage currently implemented in the repository',
		coverage_note:
			'This projection reflects currently migrated canonical coverage only and does not imply total site coverage.',
		freshness: 'build-time projection from repo canonical source'
	},
	coverage: {
		covered_surface_ids: surfaces
			.filter((surface) => surface.coverage_status === 'covered')
			.map((surface) => surface.id),
		partially_covered_surface_ids: [],
		not_yet_covered_note:
			'Unmigrated site content remains outside this projection until it is added to the canonical source.'
	},
	surfaces,
	entries
};

export function GET() {
	return new Response(JSON.stringify(body, null, 2), {
		headers: {
			'content-type': 'application/json; charset=utf-8'
		}
	});
}
