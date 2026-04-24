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
		.filter((relationship) => relationship.releaseState === 'retain' || relationship.releaseState === 'retain_with_care')
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

const entries = [
	{
		id: 'homepage-hero-summary',
		sourceSurface: 'homepage.hero',
		contextIds: ['ctx_home_publication', 'ctx_home_enterprise_ops'],
		claimIds: ['clm_home_summary'],
		relationshipIds: ['rel_home_summary_to_capability', 'rel_home_summary_to_context'],
		signalIds: ['sig_home_capability', 'sig_home_direction', 'sig_home_judgment']
	},
	{
		id: 'homepage-public-channels',
		sourceSurface: 'homepage.contact',
		contextIds: ['ctx_home_contact'],
		claimIds: [
			'clm_home_contact_email',
			'clm_home_contact_github',
			'clm_home_contact_linkedin',
			'clm_home_contact_twitter'
		],
		relationshipIds: [],
		signalIds: []
	},
	{
		id: 'homepage-selected-work-summaries',
		sourceSurface: 'homepage.selected-work',
		contextIds: ['ctx_home_selected_work', 'ctx_remediation_project'],
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
		]
	},
	{
		id: 'homepage-quality-semantic-control',
		sourceSurface: 'homepage.quality',
		contextIds: ['ctx_quality'],
		claimIds: ['clm_quality_summary', 'clm_quality_standfirst', 'clm_quality_body', 'clm_quality_note'],
		relationshipIds: ['rel_quality_precision_to_capability', 'rel_quality_note_to_confidence'],
		signalIds: [
			'sig_quality_capability',
			'sig_quality_confidence',
			'sig_quality_judgment',
			'sig_quality_direction'
		]
	},
	{
		id: 'homepage-personal-governance',
		sourceSurface: 'homepage.personal',
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
		]
	},
	{
		id: 'project-remediation-slice',
		sourceSurface: 'projects.remediation',
		contextIds: ['ctx_remediation_project', 'ctx_remediation_progression'],
		claimIds: ['clm_remediation_summary', 'clm_remediation_progression', 'clm_remediation_boundary'],
		relationshipIds: [
			'rel_remediation_action_to_progression',
			'rel_remediation_progression_to_confidence',
			'rel_remediation_boundary_to_judgment'
		],
		signalIds: ['sig_remediation_capability', 'sig_remediation_confidence', 'sig_remediation_judgment']
	},
	{
		id: 'resume-identity-and-context',
		sourceSurface: 'resume.page',
		contextIds: ['ctx_resume_identity', 'ctx_resume_context'],
		claimIds: ['clm_resume_identity', 'clm_resume_context_points'],
		relationshipIds: ['rel_resume_identity_to_capability', 'rel_resume_context_to_direction'],
		signalIds: ['sig_resume_capability', 'sig_resume_direction']
	},
	{
		id: 'resume-initiative-scope',
		sourceSurface: 'resume.page',
		contextIds: ['ctx_resume_initiative', 'ctx_remediation_project', 'ctx_remediation_progression'],
		claimIds: ['clm_resume_initiative_completed', 'clm_resume_initiative_active'],
		relationshipIds: ['rel_resume_initiative_completed_to_confidence'],
		signalIds: ['sig_resume_capability', 'sig_resume_confidence', 'sig_resume_direction', 'sig_resume_judgment']
	},
	{
		id: 'resume-delegated-scope',
		sourceSurface: 'resume.page',
		contextIds: ['ctx_resume_delegated_scope'],
		claimIds: ['clm_resume_delegated_scope'],
		relationshipIds: ['rel_resume_delegated_to_judgment'],
		signalIds: ['sig_resume_capability', 'sig_resume_judgment']
	},
	{
		id: 'resume-role-progression',
		sourceSurface: 'resume.page',
		contextIds: ['ctx_resume_progression', 'ctx_resume_initiative', 'ctx_resume_delegated_scope'],
		claimIds: [
			'clm_resume_progression_foundation',
			'clm_resume_progression_trusted_scope',
			'clm_resume_progression_specialist_scope',
			'clm_resume_progression_ai_delivery'
		],
		relationshipIds: ['rel_resume_specialist_to_judgment', 'rel_resume_ai_delivery_to_direction'],
		signalIds: ['sig_resume_capability', 'sig_resume_confidence', 'sig_resume_judgment', 'sig_resume_direction']
	},
	{
		id: 'resume-technical-skills',
		sourceSurface: 'resume.page',
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
		signalIds: ['sig_resume_capability', 'sig_resume_judgment', 'sig_resume_direction']
	},
	{
		id: 'resume-qualifications',
		sourceSurface: 'resume.page',
		contextIds: ['ctx_resume_qualifications'],
		claimIds: ['clm_resume_qualifications'],
		relationshipIds: ['rel_resume_qualifications_to_confidence'],
		signalIds: ['sig_resume_confidence']
	}
].map((entry) => ({
		...entry,
		contexts: canonicalSource.contexts.filter(
			(context) => entry.contextIds.includes(context.id) && includedContextIds.has(context.id)
		),
		claims: canonicalSource.claims.filter(
			(claim) => entry.claimIds.includes(claim.id) && includedClaimIds.has(claim.id)
		),
		relationships: canonicalSource.relationships.filter(
			(relationship) =>
				entry.relationshipIds.includes(relationship.id) && includedRelationshipIds.has(relationship.id)
		),
		signals: canonicalSource.signals.filter(
			(signal) => entry.signalIds.includes(signal.id) && finalizedSignalIds.has(signal.id)
		)
	}));

const body = {
	projection: {
		id: 'canonical-machine-readable-subset',
		type: 'machine-readable-projection',
		scope: 'bounded public canonical subset',
		derivedFrom: '$lib/canonical/source.ts',
		notes: [
			'This projection contains only the currently migrated canonical subset.',
			'It preserves relationships, inference labels, release states, withheld-detail markers, and status/progression.',
			'It does not imply concealed specifics beyond the bounded public source.'
		]
	},
	entries
};

export function GET() {
	return new Response(JSON.stringify(body, null, 2), {
		headers: {
			'content-type': 'application/json; charset=utf-8'
		}
	});
}
