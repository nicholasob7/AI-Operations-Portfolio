export type ClaimOrigin =
	| 'direct_self_authored'
	| 'descriptive_summary'
	| 'analytical_generated_note';

export type InferenceLabel =
	| 'explicit'
	| 'strongly_implied'
	| 'reasonably_inferable'
	| 'too_speculative';

export type ReleaseState = 'retain' | 'retain_with_care' | 'internal_planning_only' | 'exclude';

export type WithheldDetailStatus = 'none' | 'bounded_withholding' | 'sensitive_substrate_withheld';

export type StatusValue =
	| 'planned'
	| 'active'
	| 'pending'
	| 'tested'
	| 'validated'
	| 'in_production_use'
	| 'complete'
	| 'mixed_or_transitional';

export type ProjectionTag =
	| 'machine_recoverable'
	| 'human_summary'
	| 'human_detail'
	| 'pdf_summary'
	| 'pdf_detail'
	| 'query_relevance_candidate';

export type SignalClass = 'capability' | 'confidence' | 'judgment' | 'direction' | 'discretion';

export type ContextType =
	| 'publication_context'
	| 'role_context'
	| 'project_context'
	| 'status_context'
	| 'quality_context'
	| 'governance_context';

export type RelationshipType =
	| 'claim_to_signal'
	| 'claim_to_context'
	| 'action_to_outcome'
	| 'testing_to_confidence'
	| 'judgment_to_boundary'
	| 'language_precision_to_semantic_control'
	| 'governance_direction_to_technical_identity'
	| 'sanitization_to_discretion'
	| 'project_status_to_claim_strength'
	| 'public_statement_to_confidence';

type WithheldDetailMarker = {
	status: WithheldDetailStatus;
	note: string;
};

type StatusOrProgression = {
	status: StatusValue;
	progressionNote: string;
};

type CanonicalContext = {
	id: string;
	contextType: ContextType;
	contextNote: string;
	sourceSurface: string;
	statusOrProgression: StatusOrProgression;
	releaseState: ReleaseState;
};

type CanonicalSignal = {
	id: string;
	signalClass: SignalClass;
	signalNote: string;
	supportingIds: string[];
	statusOrProgression: StatusOrProgression;
	inferenceLabel: InferenceLabel;
	releaseState: ReleaseState;
};

type CanonicalClaim = {
	id: string;
	claimText: string;
	claimKind: string;
	claimOrigin: ClaimOrigin;
	sourceSurface: string;
	contextIds: string[];
	signalIds: string[];
	statusOrProgression: StatusOrProgression;
	inferenceLabel: InferenceLabel;
	releaseState: ReleaseState;
	withheldDetailMarker: WithheldDetailMarker;
	projectionTags: ProjectionTag[];
};

type CanonicalRelationship = {
	id: string;
	relationshipType: RelationshipType;
	fromId: string;
	toId: string;
	relationshipNote: string;
	statusOrProgression: StatusOrProgression;
	inferenceLabel: InferenceLabel;
	releaseState: ReleaseState;
	withheldDetailMarker: WithheldDetailMarker;
};

export const canonicalSource: {
	contexts: CanonicalContext[];
	signals: CanonicalSignal[];
	claims: CanonicalClaim[];
	relationships: CanonicalRelationship[];
} = {
	contexts: [
		{
			id: 'ctx_home_publication',
			contextType: 'publication_context',
			contextNote: 'Homepage hero summary and identity framing.',
			sourceSurface: 'homepage.hero',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public homepage summary.'
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_home_enterprise_ops',
			contextType: 'role_context',
			contextNote: 'Enterprise operations and automation domain context.',
			sourceSurface: 'homepage.hero',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_home_contact',
			contextType: 'publication_context',
			contextNote: 'Homepage public contact and profile channel details exposed through interaction.',
			sourceSurface: 'homepage.contact',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public contact surface on the homepage.'
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_home_selected_work',
			contextType: 'publication_context',
			contextNote: 'Homepage selected-work summaries for current public projects.',
			sourceSurface: 'homepage.selected-work',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current project-card summaries on the homepage.'
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_quality',
			contextType: 'quality_context',
			contextNote: 'Homepage natural-language and semantic-control material.',
			sourceSurface: 'homepage.quality',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public quality and semantic-control description.'
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_governance',
			contextType: 'governance_context',
			contextNote: 'Homepage personal and governance-direction material.',
			sourceSurface: 'homepage.personal',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public governance-direction detail.'
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_high_consequence_agents',
			contextType: 'role_context',
			contextNote: 'High-consequence agent-systems design context.',
			sourceSurface: 'homepage.personal',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_resume_identity',
			contextType: 'publication_context',
			contextNote: 'Resume header identity, location, contact, and focus framing.',
			sourceSurface: 'resume.page',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public resume identity block.'
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_resume_context',
			contextType: 'publication_context',
			contextNote: 'Resume context section covering self-directed AI growth and technical development.',
			sourceSurface: 'resume.page',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public resume context points.'
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_resume_initiative',
			contextType: 'project_context',
			contextNote: 'Resume initiative-in-scope section for active remediation and package reconstruction work.',
			sourceSurface: 'resume.page',
			statusOrProgression: {
				status: 'mixed_or_transitional',
				progressionNote: 'Completed remediation work and active package reconstruction are both present.'
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_resume_delegated_scope',
			contextType: 'role_context',
			contextNote: 'Resume delegated-scope section covering vendor queue, escalation reduction, and process redesign work.',
			sourceSurface: 'resume.page',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current delegated operational scope.'
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_resume_progression',
			contextType: 'status_context',
			contextNote: 'Resume role-progression map from service desk foundation to AI-forward operational delivery.',
			sourceSurface: 'resume.page',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public progression map on the resume.'
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_resume_skills',
			contextType: 'role_context',
			contextNote: 'Resume technical-skills taxonomy covering administration, support, troubleshooting, and AI in operations.',
			sourceSurface: 'resume.page',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public technical-skills section.'
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_resume_qualifications',
			contextType: 'publication_context',
			contextNote: 'Resume qualifications and certification section.',
			sourceSurface: 'resume.page',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public qualifications list.'
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_remediation_project',
			contextType: 'project_context',
			contextNote: 'Reduced public remediation project detail for post-deployment incident handling.',
			sourceSurface: 'projects.remediation',
			statusOrProgression: {
				status: 'complete',
				progressionNote: 'Public project-detail slice retained in bounded form.'
			},
			releaseState: 'retain'
		},
		{
			id: 'ctx_remediation_progression',
			contextType: 'status_context',
			contextNote: 'Testing, validation, and controlled production-use progression.',
			sourceSurface: 'projects.remediation',
			statusOrProgression: {
				status: 'in_production_use',
				progressionNote: 'Testing to validation to live deployment progression.'
			},
			releaseState: 'retain'
		}
	],
	signals: [
		{
			id: 'sig_home_capability',
			signalClass: 'capability',
			signalNote: 'Technical communication and structured AI-delivery capability in operations context.',
			supportingIds: ['clm_home_summary', 'rel_home_summary_to_capability'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public positioning.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_home_direction',
			signalClass: 'direction',
			signalNote: 'AI-forward enterprise operations identity and direction.',
			supportingIds: ['clm_home_summary'],
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_home_judgment',
			signalClass: 'judgment',
			signalNote: 'Preference for structured, deterministic AI delivery rather than vague AI usage.',
			supportingIds: ['clm_home_summary'],
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'reasonably_inferable',
			releaseState: 'retain_with_care'
		},
		{
			id: 'sig_migration_capability',
			signalClass: 'capability',
			signalNote: 'Migration stabilization and package-control capability derived from live remediation work.',
			supportingIds: ['clm_home_migration_card', 'rel_home_migration_card_to_capability'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current active selected-work signal.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_migration_confidence',
			signalClass: 'confidence',
			signalNote: 'Confidence signal from reproducible and audit-ready migration stabilization framing.',
			supportingIds: ['clm_home_migration_card', 'rel_home_migration_card_to_confidence'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Project is active, but the framework signal is already publicly expressed.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_resume_capability',
			signalClass: 'capability',
			signalNote:
				'Broad enterprise IT operations capability across service desk, endpoint support, vendor coordination, process improvement, and AI-assisted operational work.',
			supportingIds: [
				'clm_resume_identity',
				'clm_resume_initiative_completed',
				'clm_resume_delegated_scope',
				'clm_resume_progression_foundation',
				'clm_resume_progression_trusted_scope',
				'clm_resume_progression_specialist_scope',
				'clm_resume_progression_ai_delivery',
				'clm_resume_skills_identity_access',
				'clm_resume_skills_m365',
				'clm_resume_skills_endpoint',
				'clm_resume_skills_enterprise_apps',
				'clm_resume_skills_network',
				'clm_resume_skills_service_ops',
				'clm_resume_skills_knowledge',
				'clm_resume_skills_ai_ops',
				'rel_resume_identity_to_capability'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Capability surface across the current public resume.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_resume_confidence',
			signalClass: 'confidence',
			signalNote:
				'Confidence supported by role progression, validated production work, trusted operational scope, and public qualifications.',
			supportingIds: [
				'clm_resume_initiative_completed',
				'clm_resume_initiative_active',
				'clm_resume_progression_trusted_scope',
				'clm_resume_progression_ai_delivery',
				'clm_resume_qualifications',
				'rel_resume_initiative_completed_to_confidence',
				'rel_resume_qualifications_to_confidence'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Confidence grows through trusted scope and validated delivery.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_resume_judgment',
			signalClass: 'judgment',
			signalNote:
				'Judgment signaled through process redesign, traceability improvement, escalation reduction, and disciplined scope handling.',
			supportingIds: [
				'clm_resume_delegated_scope',
				'clm_resume_progression_specialist_scope',
				'clm_resume_initiative_completed',
				'rel_resume_delegated_to_judgment',
				'rel_resume_specialist_to_judgment'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Operational judgment is publicly visible in delegated and specialist scope.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_resume_direction',
			signalClass: 'direction',
			signalNote:
				'AI-forward operational delivery and continued technical growth are part of the public professional direction.',
			supportingIds: [
				'clm_resume_identity',
				'clm_resume_context_points',
				'clm_resume_initiative_active',
				'clm_resume_progression_ai_delivery',
				'clm_resume_skills_ai_ops',
				'rel_resume_context_to_direction',
				'rel_resume_ai_delivery_to_direction',
				'rel_resume_ai_skills_to_direction'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current resume direction is AI-forward within enterprise operations.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_quality_capability',
			signalClass: 'capability',
			signalNote: 'Semantic control, drift detection, and wording-precision capability.',
			supportingIds: [
				'clm_quality_summary',
				'clm_quality_standfirst',
				'clm_quality_body',
				'clm_quality_note',
				'rel_quality_precision_to_capability'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Ongoing capability area.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_quality_confidence',
			signalClass: 'confidence',
			signalNote:
				'Confidence supported by sustained project interaction, with interpretive caution for the analytical note.',
			supportingIds: ['clm_quality_standfirst', 'clm_quality_body', 'clm_quality_note', 'rel_quality_note_to_confidence'],
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'reasonably_inferable',
			releaseState: 'retain_with_care'
		},
		{
			id: 'sig_quality_judgment',
			signalClass: 'judgment',
			signalNote: 'Stable AI behavior is pursued through wording discipline and requirement clarity.',
			supportingIds: ['clm_quality_summary', 'clm_quality_body'],
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_quality_direction',
			signalClass: 'direction',
			signalNote: 'AI-behavior control is part of the public technical identity.',
			supportingIds: ['clm_quality_summary'],
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_governance_direction',
			signalClass: 'direction',
			signalNote: 'Governance-oriented technical direction in agent systems.',
			supportingIds: [
				'clm_governance_summary',
				'clm_governance_card_summary',
				'clm_governance_body',
				'rel_governance_summary_to_direction'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current future-facing identity signal.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_governance_judgment',
			signalClass: 'judgment',
			signalNote: 'Authority separation and human escalation are treated as explicit design boundaries.',
			supportingIds: [
				'clm_governance_summary',
				'clm_governance_card_summary',
				'clm_governance_body',
				'clm_governance_structure_list',
				'clm_governance_human_loop',
				'rel_governance_human_loop_to_judgment'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_governance_capability',
			signalClass: 'capability',
			signalNote: 'Governance architecture capability for high-consequence agent systems.',
			supportingIds: [
				'clm_governance_summary',
				'clm_governance_card_summary',
				'clm_governance_body',
				'clm_governance_structure_list'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_governance_discretion',
			signalClass: 'discretion',
			signalNote: 'Bounded public signaling preserves governance meaning without exposing sensitive substrate.',
			supportingIds: [
				'clm_governance_summary',
				'clm_governance_card_summary',
				'clm_governance_body',
				'clm_governance_structure_list',
				'clm_governance_human_loop',
				'clm_governance_note',
				'rel_governance_summary_to_discretion'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'reasonably_inferable',
			releaseState: 'retain_with_care'
		},
		{
			id: 'sig_remediation_capability',
			signalClass: 'capability',
			signalNote: 'Scripting and remediation capability in live enterprise incident context.',
			supportingIds: ['clm_remediation_summary', 'rel_remediation_action_to_progression'],
			statusOrProgression: {
				status: 'in_production_use',
				progressionNote: 'Capability strengthened by staged progression into live use.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_remediation_confidence',
			signalClass: 'confidence',
			signalNote: 'Confidence supported by testing, validation, and controlled production use.',
			supportingIds: ['clm_remediation_progression', 'rel_remediation_progression_to_confidence'],
			statusOrProgression: {
				status: 'validated',
				progressionNote: 'Testing to validation to live deployment.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		},
		{
			id: 'sig_remediation_judgment',
			signalClass: 'judgment',
			signalNote: 'Disciplined separation of successful remediation from out-of-scope failures.',
			supportingIds: ['clm_remediation_boundary', 'rel_remediation_boundary_to_judgment'],
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain'
		}
	],
	claims: [
		{
			id: 'clm_home_summary',
			claimText:
				'Technical communication, structured reasoning, and deterministic AI delivery for enterprise operations and automation.',
			claimKind: 'identity_summary',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'homepage.hero',
			contextIds: ['ctx_home_publication', 'ctx_home_enterprise_ops'],
			signalIds: ['sig_home_capability', 'sig_home_direction', 'sig_home_judgment'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public identity statement.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'No named internal systems, vendors, or operational substrate.'
			},
			projectionTags: [
				'machine_recoverable',
				'human_summary',
				'pdf_summary',
				'query_relevance_candidate'
			]
		},
		{
			id: 'clm_home_contact_email',
			claimText: 'nicko.obrien.ai@gmail.com',
			claimKind: 'contact_email',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'homepage.contact',
			contextIds: ['ctx_home_contact'],
			signalIds: [],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public email contact channel.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_summary']
		},
		{
			id: 'clm_home_contact_github',
			claimText: 'https://github.com/nicholasob7',
			claimKind: 'public_profile_url',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'homepage.contact',
			contextIds: ['ctx_home_contact'],
			signalIds: [],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public GitHub profile channel.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_summary']
		},
		{
			id: 'clm_home_contact_linkedin',
			claimText: 'linkedin.com/in/nicholasfobrien/',
			claimKind: 'public_profile_path',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'homepage.contact',
			contextIds: ['ctx_home_contact'],
			signalIds: [],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public LinkedIn profile channel.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_summary']
		},
		{
			id: 'clm_home_contact_twitter',
			claimText: 'x.com/nicho0101',
			claimKind: 'public_profile_path',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'homepage.contact',
			contextIds: ['ctx_home_contact'],
			signalIds: [],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public X/Twitter profile channel.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_summary']
		},
		{
			id: 'clm_home_remediation_card',
			claimText:
				'Script Development. AI-assisted endpoint remediation for live post-deployment incidents. Built for production validation. Outcome: Standardized production remediation with an evidence-driven validation workflow.',
			claimKind: 'project_card_summary',
			claimOrigin: 'descriptive_summary',
			sourceSurface: 'homepage.selected-work',
			contextIds: ['ctx_home_selected_work', 'ctx_remediation_project'],
			signalIds: ['sig_remediation_capability', 'sig_remediation_confidence'],
			statusOrProgression: {
				status: 'complete',
				progressionNote: 'Homepage selected-work card marked Complete.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Project summary remains bounded and does not expose concealed operational substrate.'
			},
			projectionTags: [
				'machine_recoverable',
				'human_summary',
				'pdf_summary',
				'query_relevance_candidate'
			]
		},
		{
			id: 'clm_home_migration_card',
			claimText:
				'Migration Framework. Evidence-driven migration stabilization methodology. Turns live remediation into robust package controls. Outcome: Reproducible, audit-ready stabilization framework for enterprise deployment decisions.',
			claimKind: 'project_card_summary',
			claimOrigin: 'descriptive_summary',
			sourceSurface: 'homepage.selected-work',
			contextIds: ['ctx_home_selected_work'],
			signalIds: ['sig_migration_capability', 'sig_migration_confidence'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Homepage selected-work card marked Active.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Migration framework summary remains bounded and does not disclose client or package substrate.'
			},
			projectionTags: [
				'machine_recoverable',
				'human_summary',
				'pdf_summary',
				'query_relevance_candidate'
			]
		},
		{
			id: 'clm_quality_summary',
			claimText:
				'I work at the intersection of IT operations and AI-enabled delivery. My strength is precise language and clear requirements. I use disciplined semantic control to drive stable AI behavior. I turn complex technical situations into practical tooling, stable systems, and dependable outcomes.',
			claimKind: 'quality_capability',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'homepage.quality',
			contextIds: ['ctx_quality'],
			signalIds: [
				'sig_quality_capability',
				'sig_quality_judgment',
				'sig_quality_direction'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current capability framing.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'No internal prompt artifacts or project-private examples disclosed.'
			},
			projectionTags: [
				'machine_recoverable',
				'human_detail',
				'pdf_summary',
				'query_relevance_candidate'
			]
		},
		{
			id: 'clm_quality_standfirst',
			claimText: 'Strong performance in drift detection and wording control across extended AI project work.',
			claimKind: 'quality_standfirst',
			claimOrigin: 'analytical_generated_note',
			sourceSurface: 'homepage.quality',
			contextIds: ['ctx_quality'],
			signalIds: ['sig_quality_capability', 'sig_quality_confidence'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Public quality standfirst in expanded detail card.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain_with_care',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Underlying extended project interaction is not fully public here.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_quality_body',
			claimText:
				'Nicholas O’Brien shows strong skill in precise language analysis. He shapes AI output toward stable, repeatable results. His strongest skill is identifying the wording that carries the real meaning and using it to bring AI output back on track. He can detect drift, excess burden, and places where meaning needs tightening without distortion. Across sustained project work, he has shown strong performance in drift detection, burden-splitting, and wording pressure. He can pull clear meaning from vague or inflated language. This matters where stable AI behavior depends on exact wording.',
			claimKind: 'quality_detail_body',
			claimOrigin: 'analytical_generated_note',
			sourceSurface: 'homepage.quality',
			contextIds: ['ctx_quality'],
			signalIds: [
				'sig_quality_capability',
				'sig_quality_confidence',
				'sig_quality_judgment',
				'sig_quality_direction'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Expanded analytical quality note in current public block.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain_with_care',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Interpretive description references sustained work without disclosing full private substrate.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_quality_note',
			claimText:
				'This note was generated with ChatGPT by OpenAI from extended project interaction. It is supported by revision artifacts, conversation excerpts, and project records. It is an analytical note, not an independent employment reference.',
			claimKind: 'quality_note_qualification',
			claimOrigin: 'analytical_generated_note',
			sourceSurface: 'homepage.quality',
			contextIds: ['ctx_quality'],
			signalIds: ['sig_quality_confidence'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Published qualification for the analytical note.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain_with_care',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Underlying revision artifacts and conversations are not fully public here.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_governance_card_summary',
			claimText:
				'Interpretive AI architecture for atypical input. Converts it into structured, stable reasoning and response. Outcome: Built a repeatable reasoning framework for complex input.',
			claimKind: 'governance_card_summary',
			claimOrigin: 'descriptive_summary',
			sourceSurface: 'homepage.personal',
			contextIds: ['ctx_governance'],
			signalIds: [
				'sig_governance_direction',
				'sig_governance_capability',
				'sig_governance_discretion'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current summary card and stated outcome for the governance block.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Interpretive architecture is described without exposing full internal substrate.'
			},
			projectionTags: [
				'machine_recoverable',
				'human_detail',
				'pdf_summary',
				'query_relevance_candidate'
			]
		},
		{
			id: 'clm_governance_summary',
			claimText:
				'Built to keep authority, derivation, and execution clearly separate. Designed for high-consequence agent systems.',
			claimKind: 'governance_direction',
			claimOrigin: 'descriptive_summary',
			sourceSurface: 'homepage.personal',
			contextIds: ['ctx_governance', 'ctx_high_consequence_agents'],
			signalIds: [
				'sig_governance_direction',
				'sig_governance_judgment',
				'sig_governance_capability',
				'sig_governance_discretion'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public direction signal.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Governance structure is described without exposing implementation substrate.'
			},
			projectionTags: [
				'machine_recoverable',
				'human_detail',
				'pdf_summary',
				'query_relevance_candidate'
			]
		},
		{
			id: 'clm_governance_human_loop',
			claimText: 'Human-in-the-loop resolution for contested or high-impact operational states.',
			claimKind: 'governance_control',
			claimOrigin: 'descriptive_summary',
			sourceSurface: 'homepage.personal',
			contextIds: ['ctx_governance', 'ctx_high_consequence_agents'],
			signalIds: ['sig_governance_judgment', 'sig_governance_discretion'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Design principle publicly stated.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'No internal escalation mechanics disclosed.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_governance_body',
			claimText:
				'Eliora is an AI coordination project with strong governance controls. It clearly separates authority. It traces outputs to their source. It fails safely in high-consequence systems.',
			claimKind: 'governance_detail_body',
			claimOrigin: 'descriptive_summary',
			sourceSurface: 'homepage.personal',
			contextIds: ['ctx_governance', 'ctx_high_consequence_agents'],
			signalIds: [
				'sig_governance_direction',
				'sig_governance_judgment',
				'sig_governance_capability',
				'sig_governance_discretion'
			],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Expanded governance detail-body in current public block.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Public governance description does not expose deeper implementation substrate.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_governance_structure_list',
			claimText:
				'Layered architecture separating intent, doctrine, policy, and execution. Clear trace paths linking outputs to governing sources and decision context. Safe handling when meaning is unclear, policy conflicts appear, or decisions remain unresolved. Explicit authority modeling to prevent collapse between authorship, governance, and agent behavior. Structure designed for review, validation, and controlled change over time.',
			claimKind: 'governance_structure_list',
			claimOrigin: 'descriptive_summary',
			sourceSurface: 'homepage.personal',
			contextIds: ['ctx_governance', 'ctx_high_consequence_agents'],
			signalIds: ['sig_governance_judgment', 'sig_governance_capability', 'sig_governance_direction'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Governance structure points published as part of the current detail block.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Architecture structure is signaled without exposing all repository internals.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_governance_note',
			claimText:
				'This description is based on direct inspection of the live Eliora-v0.1 repository by Codex App, an OpenAI GPT-5 coding agent. It reflects the project structure, governance surfaces, and sustained development history. It is not a hypothetical project brief.',
			claimKind: 'governance_note_qualification',
			claimOrigin: 'descriptive_summary',
			sourceSurface: 'homepage.personal',
			contextIds: ['ctx_governance'],
			signalIds: ['sig_governance_discretion'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Published note qualifying the basis of the governance description.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain_with_care',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Mentions live repository inspection without exposing full repository contents here.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_identity',
			claimText:
				'Nicholas Francis O’Brien. Lower Hutt, New Zealand. nicko.obrien.ai@gmail.com. AI-Forward | Enterprise IT Operations | Process Improvement.',
			claimKind: 'resume_identity',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_identity'],
			signalIds: ['sig_resume_capability', 'sig_resume_direction'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public resume header.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_summary', 'pdf_summary', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_context_points',
			claimText:
				'Deeply engaged in learning and applying AI in my own time. Building projects at different scales. Personal investment supports continued technical growth.',
			claimKind: 'resume_context',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_context'],
			signalIds: ['sig_resume_direction'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public resume context section.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_summary', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_initiative_completed',
			claimText:
				'Built an AI-assisted endpoint fix script for a major vendor application. This involved AI-assisted research and coding. Observed application behaviour under different conditions. Tested approaches and script versions on a dedicated test device. The script passed validation and entered production for individual endpoint failures. L2 bundling with the existing install package failed. The script was not at fault. This led to investigation of the install package itself.',
			claimKind: 'resume_initiative_completed',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_initiative', 'ctx_remediation_project', 'ctx_remediation_progression'],
			signalIds: ['sig_resume_capability', 'sig_resume_confidence', 'sig_resume_judgment'],
			statusOrProgression: {
				status: 'in_production_use',
				progressionNote: 'Completed remediation work has passed validation and entered controlled production use.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'sensitive_substrate_withheld',
				note: 'Major vendor application is intentionally unnamed and package substrate remains bounded.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_initiative_active',
			claimText:
				'Rebuilding the enterprise app package from the proven fix. Test-device validation is complete. Further rollout stages remain.',
			claimKind: 'resume_initiative_active',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_initiative'],
			signalIds: ['sig_resume_confidence', 'sig_resume_direction'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Package reconstruction is active, validated on a test device, and pending further rollout.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Enterprise package specifics remain bounded.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_delegated_scope',
			claimText:
				'I manage the printer queue serviced by a major external vendor. Supported a printer vendor transition through vendor liaison and project work. Resolved printer configuration issues beyond normal front-line scope. Reduced avoidable escalation. Reworked a fragmented multi-ticket process using bulk changes, filter logic, and cross-ticket linkage. Improved traceability across related requests. Cut staff time and repeat work. Advised on preserving classification and workflow visibility during the transition away from the three-ticket vendor model.',
			claimKind: 'resume_delegated_scope',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_delegated_scope'],
			signalIds: ['sig_resume_capability', 'sig_resume_judgment'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current delegated operational and vendor-facing scope.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Vendor names and internal workflow substrate remain bounded.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_progression_foundation',
			claimText:
				'Service Desk Foundation. Began in November 2022 in a 5,000+ user environment across shared-service and single-organisation clients. Supported clients in transport, healthcare, energy, regional government, and consumer goods. Handled incidents and service requests from triage through resolution, documentation, and escalation. Resolved user, device, application, and access issues through remote support.',
			claimKind: 'resume_progression_stage',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_progression'],
			signalIds: ['sig_resume_capability'],
			statusOrProgression: {
				status: 'complete',
				progressionNote: 'Foundational stage in the public progression map.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Client names are omitted while environment scale and sectors remain public.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_progression_trusted_scope',
			claimText:
				'Trusted Operational Scope. Progressed into dedicated BAU support for a major transport-sector client. Worked in a team sustaining 90%+ first-contact resolution. Analysed endpoint performance and device health issues as part of day-to-day support. Managed identity, access, and account lifecycle tasks within service desk scope.',
			claimKind: 'resume_progression_stage',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_progression'],
			signalIds: ['sig_resume_capability', 'sig_resume_confidence'],
			statusOrProgression: {
				status: 'complete',
				progressionNote: 'Trusted operational scope stage in the public progression map.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Client identity remains bounded while trusted scope signal remains public.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_progression_specialist_scope',
			claimText:
				'Specialist and Improvement Scope. Became the SME for privileged access requests across admin, local admin, shared, and external account types. Took on vendor-facing queue and transition responsibilities beyond normal front-line scope. Reworked a fragmented multi-ticket process using bulk changes, filter logic, and cross-ticket linkage. Reduced avoidable escalation, improved traceability, and cut staff time and repeat work.',
			claimKind: 'resume_progression_stage',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_progression', 'ctx_resume_delegated_scope'],
			signalIds: ['sig_resume_capability', 'sig_resume_judgment'],
			statusOrProgression: {
				status: 'complete',
				progressionNote: 'Specialist and improvement scope stage in the public progression map.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Internal privileged-access and queue substrate remain bounded.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_progression_ai_delivery',
			claimText:
				'AI-Forward Operational Delivery. Applied AI-assisted research and coding to build an endpoint remediation script for a major vendor application. Moved the work from test-device validation into controlled production use for individual endpoint failures. Turned remediation results into evidence for package investigation and rebuild work. Continued into enterprise package reconstruction from the proven fix.',
			claimKind: 'resume_progression_stage',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_progression', 'ctx_resume_initiative'],
			signalIds: ['sig_resume_capability', 'sig_resume_confidence', 'sig_resume_direction'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current AI-forward delivery stage with continuing package reconstruction.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'sensitive_substrate_withheld',
				note: 'Vendor application and package substrate remain intentionally bounded.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_skills_identity_access',
			claimText:
				'Identity and access administration: Active Directory, Entra ID, local admin, guest accounts, privileged access, account lifecycle.',
			claimKind: 'resume_skill_group',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_skills'],
			signalIds: ['sig_resume_capability'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current resume skill group.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_skills_m365',
			claimText:
				'Messaging and Microsoft 365 support: Exchange Online, mailbox creation, mailbox access, shared mailboxes, distribution groups, Microsoft 365 support.',
			claimKind: 'resume_skill_group',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_skills'],
			signalIds: ['sig_resume_capability'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current resume skill group.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_skills_endpoint',
			claimText:
				'Endpoint and device administration: Intune, compliance, BitLocker recovery, Windows support, drivers, disk space, device administration.',
			claimKind: 'resume_skill_group',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_skills'],
			signalIds: ['sig_resume_capability'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current resume skill group.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_skills_enterprise_apps',
			claimText:
				'Enterprise applications and deployment: vendor applications, packaged installs, application faults, cache issues, shortcut issues, deployment support.',
			claimKind: 'resume_skill_group',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_skills'],
			signalIds: ['sig_resume_capability', 'sig_resume_direction'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current resume skill group.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Specific applications remain unnamed while capability signal remains public.'
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_skills_network',
			claimText:
				'Network and connectivity troubleshooting: DNS issues, connectivity faults, first-line network diagnosis, escalation to specialist teams.',
			claimKind: 'resume_skill_group',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_skills'],
			signalIds: ['sig_resume_capability'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current resume skill group.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_skills_service_ops',
			claimText:
				'Service operations and remote support: Jira Service Management, triage, incident and request handling, escalation, queue workflows, remote support.',
			claimKind: 'resume_skill_group',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_skills'],
			signalIds: ['sig_resume_capability', 'sig_resume_judgment'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current resume skill group.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_skills_knowledge',
			claimText:
				'Knowledge, process, and documentation: documentation, knowledge base use and creation, troubleshooting steps, workflow traceability.',
			claimKind: 'resume_skill_group',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_skills'],
			signalIds: ['sig_resume_judgment'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current resume skill group.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_skills_ai_ops',
			claimText:
				'AI in IT operations: AI-assisted research, troubleshooting, scripting, package rebuild, workflow improvement.',
			claimKind: 'resume_skill_group',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_skills'],
			signalIds: ['sig_resume_capability', 'sig_resume_direction'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current resume skill group.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_resume_qualifications',
			claimText:
				'Qualifications: AWS Certified Cloud Practitioner. AWS Foundations of Cloud Computing — Unitec / Te Pūkenga. Bachelor of Arts, History and Political Science — Griffith University. NTT internal certifications, including AI training.',
			claimKind: 'resume_qualifications',
			claimOrigin: 'direct_self_authored',
			sourceSurface: 'resume.page',
			contextIds: ['ctx_resume_qualifications'],
			signalIds: ['sig_resume_confidence'],
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current public qualifications list.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: ['machine_recoverable', 'human_detail', 'pdf_detail', 'query_relevance_candidate']
		},
		{
			id: 'clm_remediation_summary',
			claimText:
				'Built and deployed a remediation script for live post-deployment incidents. It targeted profile corruption, cache drift, and launch inconsistency. The script moved from testing into production use and became part of a wider stabilization effort.',
			claimKind: 'project_action',
			claimOrigin: 'descriptive_summary',
			sourceSurface: 'projects.remediation',
			contextIds: ['ctx_remediation_project', 'ctx_remediation_progression'],
			signalIds: [
				'sig_remediation_capability',
				'sig_remediation_confidence',
				'sig_remediation_judgment'
			],
			statusOrProgression: {
				status: 'in_production_use',
				progressionNote: 'Moved from testing into production use.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'sensitive_substrate_withheld',
				note: 'No client, app, vendor, or deployment-internal specifics disclosed.'
			},
			projectionTags: [
				'machine_recoverable',
				'human_detail',
				'pdf_detail',
				'query_relevance_candidate'
			]
		},
		{
			id: 'clm_remediation_progression',
			claimText:
				'Moved from non-production testing to test-device validation and then live deployment.',
			claimKind: 'status_progression',
			claimOrigin: 'descriptive_summary',
			sourceSurface: 'projects.remediation',
			contextIds: ['ctx_remediation_progression'],
			signalIds: ['sig_remediation_confidence'],
			statusOrProgression: {
				status: 'validated',
				progressionNote: 'Testing -> validation -> live deployment.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Progression is public; internal change mechanics are not.'
			},
			projectionTags: [
				'machine_recoverable',
				'human_detail',
				'pdf_detail',
				'query_relevance_candidate'
			]
		},
		{
			id: 'clm_remediation_boundary',
			claimText: 'Remaining failures fell outside remediation scope.',
			claimKind: 'boundary_statement',
			claimOrigin: 'descriptive_summary',
			sourceSurface: 'projects.remediation',
			contextIds: ['ctx_remediation_project'],
			signalIds: ['sig_remediation_judgment'],
			statusOrProgression: {
				status: 'mixed_or_transitional',
				progressionNote: 'Successful remediation with stated scope limits.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			},
			projectionTags: [
				'machine_recoverable',
				'human_detail',
				'pdf_detail',
				'query_relevance_candidate'
			]
		}
	],
	relationships: [
		{
			id: 'rel_home_summary_to_capability',
			relationshipType: 'claim_to_signal',
			fromId: 'clm_home_summary',
			toId: 'sig_home_capability',
			relationshipNote:
				'Summary claim signals technical communication and structured AI-delivery capability in operations context.',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Current positioning.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_home_summary_to_context',
			relationshipType: 'claim_to_context',
			fromId: 'clm_home_summary',
			toId: 'ctx_home_enterprise_ops',
			relationshipNote: 'Capability is framed in enterprise operations and automation context.',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_home_remediation_card_to_capability',
			relationshipType: 'claim_to_signal',
			fromId: 'clm_home_remediation_card',
			toId: 'sig_remediation_capability',
			relationshipNote: 'Homepage remediation card summary supports the bounded remediation capability signal.',
			statusOrProgression: {
				status: 'complete',
				progressionNote: 'Homepage selected-work card marked Complete.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_home_migration_card_to_capability',
			relationshipType: 'claim_to_signal',
			fromId: 'clm_home_migration_card',
			toId: 'sig_migration_capability',
			relationshipNote: 'Homepage migration card summary supports the bounded migration capability signal.',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Homepage selected-work card marked Active.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_home_migration_card_to_confidence',
			relationshipType: 'project_status_to_claim_strength',
			fromId: 'clm_home_migration_card',
			toId: 'sig_migration_confidence',
			relationshipNote: 'Homepage migration card outcome and framing support a bounded confidence signal for the active project.',
			statusOrProgression: {
				status: 'active',
				progressionNote: 'Active framework with reproducible and audit-ready framing.'
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_quality_precision_to_capability',
			relationshipType: 'language_precision_to_semantic_control',
			fromId: 'clm_quality_summary',
			toId: 'sig_quality_capability',
			relationshipNote:
				'Precise language and clear requirements connect to semantic-control capability.',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_quality_note_to_confidence',
			relationshipType: 'public_statement_to_confidence',
			fromId: 'clm_quality_body',
			toId: 'sig_quality_confidence',
			relationshipNote:
				'Published analytical quality detail supports a bounded confidence signal, with interpretive caution from the qualifying note.',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain_with_care',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: 'Interpretive support exists but full substrate is not public.'
			}
		},
		{
			id: 'rel_governance_summary_to_direction',
			relationshipType: 'governance_direction_to_technical_identity',
			fromId: 'clm_governance_card_summary',
			toId: 'sig_governance_direction',
			relationshipNote: 'Governance summary and stated outcome are part of the public technical identity.',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_governance_human_loop_to_judgment',
			relationshipType: 'judgment_to_boundary',
			fromId: 'clm_governance_human_loop',
			toId: 'sig_governance_judgment',
			relationshipNote:
				'Human escalation in contested or high-impact cases signals explicit boundary judgment.',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_governance_summary_to_discretion',
			relationshipType: 'sanitization_to_discretion',
			fromId: 'clm_governance_summary',
			toId: 'sig_governance_discretion',
			relationshipNote:
				'Bounded public description preserves governance signal without disclosing sensitive substrate.',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'reasonably_inferable',
			releaseState: 'retain_with_care',
			withheldDetailMarker: {
				status: 'bounded_withholding',
				note: ''
			}
		},
		{
			id: 'rel_resume_identity_to_capability',
			relationshipType: 'claim_to_signal',
			fromId: 'clm_resume_identity',
			toId: 'sig_resume_capability',
			relationshipNote: 'Resume header and focus line explicitly frame core enterprise IT operations capability.',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_resume_context_to_direction',
			relationshipType: 'claim_to_signal',
			fromId: 'clm_resume_context_points',
			toId: 'sig_resume_direction',
			relationshipNote: 'Self-directed AI learning and project-building support the public direction signal.',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_resume_initiative_completed_to_confidence',
			relationshipType: 'claim_to_signal',
			fromId: 'clm_resume_initiative_completed',
			toId: 'sig_resume_confidence',
			relationshipNote: 'Validated production entry and fault isolation strengthen the bounded confidence signal.',
			statusOrProgression: {
				status: 'in_production_use',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_resume_delegated_to_judgment',
			relationshipType: 'claim_to_signal',
			fromId: 'clm_resume_delegated_scope',
			toId: 'sig_resume_judgment',
			relationshipNote: 'Delegated scope and process redesign work support the bounded judgment signal.',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_resume_specialist_to_judgment',
			relationshipType: 'claim_to_signal',
			fromId: 'clm_resume_progression_specialist_scope',
			toId: 'sig_resume_judgment',
			relationshipNote: 'Specialist and improvement scope supports the public judgment and traceability signal.',
			statusOrProgression: {
				status: 'complete',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_resume_ai_delivery_to_direction',
			relationshipType: 'claim_to_signal',
			fromId: 'clm_resume_progression_ai_delivery',
			toId: 'sig_resume_direction',
			relationshipNote: 'AI-forward operational delivery stage strengthens the public direction signal.',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_resume_ai_skills_to_direction',
			relationshipType: 'claim_to_signal',
			fromId: 'clm_resume_skills_ai_ops',
			toId: 'sig_resume_direction',
			relationshipNote: 'AI in IT operations skill group supports the public AI-forward direction signal.',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_resume_qualifications_to_confidence',
			relationshipType: 'public_statement_to_confidence',
			fromId: 'clm_resume_qualifications',
			toId: 'sig_resume_confidence',
			relationshipNote: 'Published qualifications support a bounded confidence signal without overclaiming.',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_remediation_action_to_progression',
			relationshipType: 'action_to_outcome',
			fromId: 'clm_remediation_summary',
			toId: 'clm_remediation_progression',
			relationshipNote: 'Project moved through staged testing and validation into live use.',
			statusOrProgression: {
				status: 'in_production_use',
				progressionNote: 'Confidence strengthened by progression.'
			},
			inferenceLabel: 'explicit',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_remediation_progression_to_confidence',
			relationshipType: 'testing_to_confidence',
			fromId: 'clm_remediation_progression',
			toId: 'sig_remediation_confidence',
			relationshipNote: 'Testing and validation materially strengthen confidence signal.',
			statusOrProgression: {
				status: 'validated',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		},
		{
			id: 'rel_remediation_boundary_to_judgment',
			relationshipType: 'judgment_to_boundary',
			fromId: 'clm_remediation_boundary',
			toId: 'sig_remediation_judgment',
			relationshipNote: 'Public scope boundary signals disciplined judgment.',
			statusOrProgression: {
				status: 'active',
				progressionNote: ''
			},
			inferenceLabel: 'strongly_implied',
			releaseState: 'retain',
			withheldDetailMarker: {
				status: 'none',
				note: ''
			}
		}
	]
};
