import { canonicalSource } from './source.ts';

export type PdfPilotResumeSkillGroup = {
	title: string;
	items: string[];
};

export type PdfProjectionPilot = {
	resume: {
		technicalSkills: PdfPilotResumeSkillGroup[];
	};
	migration: {
		summary: string;
	};
};

const getClaimText = (id: string): string => {
	const claim = canonicalSource.claims.find((entry) => entry.id === id);

	if (!claim) {
		throw new Error(`Canonical claim not found for PDF projection: ${id}`);
	}

	return claim.claimText;
};

const parseSkillGroup = (claimId: string): PdfPilotResumeSkillGroup => {
	const claimText = getClaimText(claimId);
	const separatorIndex = claimText.indexOf(':');

	if (separatorIndex === -1) {
		throw new Error(`Resume skill claim is not in the expected title/detail format: ${claimId}`);
	}

	const title = claimText.slice(0, separatorIndex).trim();
	const detailText = claimText.slice(separatorIndex + 1).trim().replace(/\.$/, '');
	const items = detailText
		.split(',')
		.map((item) => item.trim())
		.filter(Boolean);

	return { title, items };
};

export function buildPdfProjectionPilot(): PdfProjectionPilot {
	return {
		resume: {
			technicalSkills: [
				'clm_resume_skills_identity_access',
				'clm_resume_skills_m365',
				'clm_resume_skills_endpoint',
				'clm_resume_skills_enterprise_apps',
				'clm_resume_skills_network',
				'clm_resume_skills_service_ops',
				'clm_resume_skills_knowledge',
				'clm_resume_skills_ai_ops'
			].map(parseSkillGroup)
		},
		migration: {
			summary: getClaimText('clm_migration_summary')
		}
	};
}
