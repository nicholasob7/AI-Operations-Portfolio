import type { ResumeProjectionId } from './resume-projections';

export type PublicLinkId = 'email' | 'website' | 'linkedin' | 'github' | 'twitter';

export type IsoMonth = string | null;

export type DisplayPeriod = {
	startLabel: string;
	startIsoMonth: IsoMonth;
	endLabel: string;
	endIsoMonth: IsoMonth;
	isCurrent: boolean;
	display: string;
};

export type PublicLink = {
	id: PublicLinkId;
	label: string;
	displayValue: string;
	href: string;
	copyValue: string;
};

export type EmploymentContext = {
	role: string;
	employer: string;
	location: string;
	period: DisplayPeriod;
};

export type PersonProfile = {
	id: 'nicholas_obrien';
	name: string;
	displayName: string;
	location: string;
	headline: string;
	summary: string[];
	publicLinks: PublicLink[];
	currentEmployment: EmploymentContext;
	qualifications: string[];
	publicationNote?: string;
};

export type PracticeAreaId =
	| 'support_practice'
	| 'technical_operations_practice'
	| 'ai_process_improvement_practice'
	| 'documentation_delivery_evidence';

export type EvidenceNodeId =
	| 'service_desk_foundation'
	| 'privileged_access_and_operational_scope'
	| 'endpoint_remediation_script'
	| 'migration_stabilization_framework'
	| 'eliora_governance'
	| 'website_publication_system';

export type PracticeArea = {
	id: PracticeAreaId;
	label: string;
	shortLabel: string;
	summary: string;
	keywords: string[];
	evidenceNodeIds: EvidenceNodeId[];
	projectionIds: ResumeProjectionId[];
};

export type EvidenceDisclosure =
	| 'public'
	| 'bounded_public'
	| 'bounded_public_with_sensitive_substrate_withheld';

export type EvidenceNodeStatus = 'active' | 'complete' | 'mixed_or_transitional';

export type EvidenceNode = {
	id: EvidenceNodeId;
	label: string;
	humanDisplayLabel?: string;
	summary: string;
	status: EvidenceNodeStatus;
	practiceAreaIds: PracticeAreaId[];
	projectionIds: ResumeProjectionId[];
	route: string | null;
	keywords: string[];
	publicDetails: string[];
	withheldDetailsNote: string;
	disclosure: EvidenceDisclosure;
	period?: DisplayPeriod;
};

export type ProjectionSelectionGuidance = {
	projectionId: ResumeProjectionId;
	roleFamily: string;
	selectionSummary: string;
	roleTargets: string[];
	aliases: string[];
	keywords: string[];
	primaryPracticeAreaIds: PracticeAreaId[];
	secondaryPracticeAreaIds?: PracticeAreaId[];
	coreEvidenceNodeIds: EvidenceNodeId[];
	secondaryEvidenceNodeIds?: EvidenceNodeId[];
};
