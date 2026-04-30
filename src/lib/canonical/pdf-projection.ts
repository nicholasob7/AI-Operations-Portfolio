import { technicalSkills } from '../content/resume.ts';

export type PdfPilotResumeSkillGroup = {
	title: string;
	items: string[];
};

export type PdfProjectionPilot = {
	resume: {
		technicalSkills: PdfPilotResumeSkillGroup[];
	};
};

export function buildPdfProjectionPilot(): PdfProjectionPilot {
	return {
		resume: {
			technicalSkills
		}
	};
}
