import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
	activeProjectActive,
	aiProcessCompactQualifications,
	aiProcessMethodLines,
	aiProcessSelectedDelivery,
	aiProcessSelfDirectedWork,
	aiProcessSummary,
	aiProcessSupportingFoundation,
	aiProcessWorkflowImprovement,
	activeProjectCompleted,
	delegatedScope,
	itSupportAdditionalScope,
	itSupportCompactQualifications,
	itSupportCoreSkillLines,
	itSupportProfessionalSummary,
	itSupportRelevantExperience,
	itSupportSelectedTechnicalImprovement,
	progressionStages,
	qualifications,
	resumeContactEmail,
	resumeCurrentEmploymentLocationPeriodLine,
	resumeCurrentEmploymentRoleLine,
	resumeGitHubDisplay,
	resumeInitiativeMetadata,
	resumeLinkedInProfileDisplay,
	resumeLocation,
	resumeTwitterProfileDisplay,
	resumeWebsiteDisplay,
	technicalOperationsCompactQualifications,
	technicalOperationsCoreSkillLines,
	technicalOperationsScope,
	technicalOperationsSelectedDelivery,
	technicalOperationsSummary,
	technicalOperationsSupportingFoundation
} from '../src/lib/content/resume.ts';
import {
	defaultResumeProjectionId,
	getProjectedProgressionStages,
	getProjectedSkillGroups,
	isResumeProjectionId,
	resumeProjections
} from '../src/lib/content/resume-projections.ts';
import {
	migrationProjectDetail,
	remediationProjectDetail
} from '../src/lib/content/project-details.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const generatedDir = path.join(__dirname, 'generated');

const requestedTargets = process.argv.slice(2);
const targetSet = new Set(
	requestedTargets.length > 0 ? requestedTargets : ['resume', 'remediation', 'migration']
);
const resumeProjectionFilter = requestedTargets[0] === 'resume' ? requestedTargets[1] : undefined;

if (resumeProjectionFilter !== undefined && !isResumeProjectionId(resumeProjectionFilter)) {
	throw new Error(
		`Unknown resume projection id "${resumeProjectionFilter}". Expected one of: ${resumeProjections
			.map((projection) => projection.id)
			.join(', ')}`
	);
}

const escapeHtml = (value) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');

const renderBulletList = (items, className = 'bullet-list') => {
	const renderedItems = items.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n\t\t\t\t\t');
	return `<ul class="${className}">\n\t\t\t\t\t${renderedItems}\n\t\t\t\t</ul>`;
};

const renderParagraphList = (items, className = 'summary-paragraphs') =>
	items.map((item) => `<p class="${className}">${escapeHtml(item)}</p>`).join('\n\t\t\t');

const renderItSupportRelevantExperience = () =>
	itSupportRelevantExperience
		.map(
			(stage) => `<section class="subsection compact-subsection progression-stage">
\t\t\t\t\t<h3>${escapeHtml(stage.titleWithPeriod)}</h3>
\t\t\t\t\t${renderBulletList(stage.items, 'bullet-list compact-list')}
\t\t\t\t</section>`
		)
		.join('\n\n\t\t\t');

const renderResumeTechnicalSkills = (projection) => {
	const items = getProjectedSkillGroups(projection)
		.map(
			(group) =>
				`<li><strong>${escapeHtml(group.title)}:</strong> ${group.items.map(escapeHtml).join(', ')}</li>`
		)
		.join('\n\t\t\t\t\t');

	return `<ul class="bullet-list skill-list">\n\t\t\t\t\t${items}\n\t\t\t\t</ul>`;
};

const renderProgressionStages = (projection) =>
	getProjectedProgressionStages(projection)
		.map(
			(stage) => `<section class="subsection progression-stage">
\t\t\t\t\t<h3>${escapeHtml(stage.title)}</h3>
\t\t\t\t\t${stage.period ? `<p class="section-meta">${escapeHtml(stage.period.display)}</p>` : ''}
\t\t\t\t\t${renderBulletList(stage.items)}
\t\t\t\t</section>`
		)
		.join('\n\n\t\t\t\t');

const renderResumeInitiativeScope = () => `<section class="section">
\t\t\t<h2>Initiative in Scope</h2>

\t\t\t<section class="subsection nested">
\t\t\t\t<h3>Active Project</h3>

\t\t\t\t<section class="subsection nested-deep">
\t\t\t\t\t<h4>Completed</h4>
\t\t\t\t\t<p class="section-meta">${escapeHtml(resumeInitiativeMetadata.completed.label)} | ${escapeHtml(resumeInitiativeMetadata.completed.period.display)}</p>
\t\t\t\t\t${renderBulletList(activeProjectCompleted)}
\t\t\t\t</section>

\t\t\t\t<section class="subsection nested-deep">
\t\t\t\t\t<h4>Active</h4>
\t\t\t\t\t<p class="section-meta">${escapeHtml(resumeInitiativeMetadata.active.label)} | ${escapeHtml(resumeInitiativeMetadata.active.period.display)}</p>
\t\t\t\t\t${renderBulletList(activeProjectActive)}
\t\t\t\t</section>
\t\t\t</section>
\t\t</section>`;

const renderResumeDelegatedScope = () => `<section class="section">
\t\t\t<h2>Delegated Scope</h2>
\t\t\t${renderBulletList(delegatedScope)}
\t\t</section>`;

const renderResumeProgression = (projection) => `<section class="section progression-section">
\t\t\t<h2>Role Progression Map <span class="inline-meta">From service desk baseline to AI-forward operational delivery</span></h2>

\t\t\t\t${renderProgressionStages(projection)}
\t\t</section>`;

const renderExperienceBlock = (projection, blockId) => {
	if (blockId === 'initiative') return renderResumeInitiativeScope();
	if (blockId === 'delegated_scope') return renderResumeDelegatedScope();
	return renderResumeProgression(projection);
};

const renderResumeExperience = (projection) => `<section class="section">
\t\t\t<div class="employment-heading">
\t\t\t\t<h2 class="employment-title">${escapeHtml(resumeCurrentEmploymentRoleLine)}</h2>
\t\t\t\t<p class="employment-meta">${escapeHtml(resumeCurrentEmploymentLocationPeriodLine)}</p>
\t\t\t</div>
\t\t</section>

\t\t${projection.experienceBlockOrder.map((blockId) => renderExperienceBlock(projection, blockId)).join('\n\n\t\t')}`;

const renderResumeSection = (projection, sectionId) => {
	if (sectionId === 'experience') return renderResumeExperience(projection);

	if (sectionId === 'technical_skills') {
		return `<section class="section">
\t\t\t<h2>Technical Skills</h2>
\t\t\t${renderResumeTechnicalSkills(projection)}
\t\t</section>`;
	}

	if (sectionId === 'qualifications') {
		return `<section class="section">
\t\t\t<h2>Qualifications</h2>
\t\t\t${renderBulletList(qualifications)}
\t\t</section>`;
	}

	return '';
};

const renderItSupportCompactContent = () => `<section class="section compact-section">
\t\t\t<h2>Professional Summary</h2>
\t\t\t${renderParagraphList(itSupportProfessionalSummary)}
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>Current Employment</h2>
\t\t\t<div class="employment-heading compact-employment-heading">
\t\t\t\t<h3 class="employment-title">${escapeHtml(resumeCurrentEmploymentRoleLine)}</h3>
\t\t\t\t<p class="employment-meta">${escapeHtml(resumeCurrentEmploymentLocationPeriodLine)}</p>
\t\t\t</div>
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>Core IT Support Skills</h2>
\t\t\t${renderBulletList(itSupportCoreSkillLines, 'bullet-list compact-list')}
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>Relevant Experience</h2>
\t\t\t${renderItSupportRelevantExperience()}
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>Additional Scope</h2>
\t\t\t${renderBulletList(itSupportAdditionalScope, 'bullet-list compact-list')}
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>Selected Technical Improvement</h2>
\t\t\t${renderBulletList(itSupportSelectedTechnicalImprovement, 'bullet-list compact-list')}
\t\t</section>

\t\t<section class="section compact-section compact-qualifications">
\t\t\t<h2>Qualifications</h2>
\t\t\t${renderBulletList(itSupportCompactQualifications, 'bullet-list compact-list')}
\t\t</section>`;

const renderTechnicalOperationsCompactContent = (projection) => `<section class="section compact-section">
\t\t\t<h2>Technical Operations Summary</h2>
\t\t\t${renderParagraphList(technicalOperationsSummary)}
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>Current Employment</h2>
\t\t\t<div class="employment-heading compact-employment-heading">
\t\t\t\t<h3 class="employment-title">${escapeHtml(resumeCurrentEmploymentRoleLine)}</h3>
\t\t\t\t<p class="employment-meta">${escapeHtml(resumeCurrentEmploymentLocationPeriodLine)}</p>
\t\t\t</div>
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>${escapeHtml(projection.compactSectionHeadings?.selectedDelivery ?? 'Selected Technical Delivery')}</h2>
\t\t\t${renderBulletList(technicalOperationsSelectedDelivery, 'bullet-list compact-list')}
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>Technical Operations Scope</h2>
\t\t\t${renderBulletList(technicalOperationsScope, 'bullet-list compact-list')}
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>Core Technical Operations Skills</h2>
\t\t\t${renderBulletList(technicalOperationsCoreSkillLines, 'bullet-list compact-list')}
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>${escapeHtml(projection.compactSectionHeadings?.supportingFoundation ?? 'Supporting Foundation')}</h2>
\t\t\t${renderBulletList(technicalOperationsSupportingFoundation, 'bullet-list compact-list')}
\t\t</section>

\t\t<section class="section compact-section compact-qualifications">
\t\t\t<h2>Qualifications</h2>
\t\t\t${renderBulletList(technicalOperationsCompactQualifications, 'bullet-list compact-list')}
\t\t</section>`;

const renderAiProcessCompactContent = (projection) => `<section class="section compact-section">
\t\t\t<h2>AI / Process Improvement Summary</h2>
\t\t\t${renderParagraphList(aiProcessSummary)}
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>Current Employment</h2>
\t\t\t<div class="employment-heading compact-employment-heading">
\t\t\t\t<h3 class="employment-title">${escapeHtml(resumeCurrentEmploymentRoleLine)}</h3>
\t\t\t\t<p class="employment-meta">${escapeHtml(resumeCurrentEmploymentLocationPeriodLine)}</p>
\t\t\t</div>
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>${escapeHtml(projection.compactSectionHeadings?.selectedDelivery ?? 'Selected AI-Enabled Delivery')}</h2>
\t\t\t${renderBulletList(aiProcessSelectedDelivery, 'bullet-list compact-list')}
\t\t</section>

		${
			projection.compactSectionHeadings?.selfDirectedWork
				? `<section class="section compact-section">
			<h2>${escapeHtml(projection.compactSectionHeadings.selfDirectedWork)}</h2>
			${renderBulletList(aiProcessSelfDirectedWork, 'bullet-list compact-list')}
		</section>`
				: ''
		}

\t\t<section class="section compact-section">
\t\t\t<h2>Process / Workflow Improvement</h2>
\t\t\t${renderBulletList(aiProcessWorkflowImprovement, 'bullet-list compact-list')}
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>Core AI / Process Methods</h2>
\t\t\t${renderBulletList(aiProcessMethodLines, 'bullet-list compact-list')}
\t\t</section>

\t\t<section class="section compact-section">
\t\t\t<h2>Supporting Enterprise Foundation</h2>
\t\t\t${renderBulletList(aiProcessSupportingFoundation, 'bullet-list compact-list')}
\t\t</section>

\t\t<section class="section compact-section compact-qualifications">
\t\t\t<h2>Qualifications</h2>
\t\t\t${renderBulletList(aiProcessCompactQualifications, 'bullet-list compact-list')}
\t\t</section>`;

const renderResumeHeroIntro = (projection) => {
	if (
		projection.pdfLayout === 'it_support_compact' ||
		projection.pdfLayout === 'technical_operations_compact' ||
		projection.pdfLayout === 'ai_process_compact'
	) {
		return `<p class="hero-line hero-focus">${escapeHtml(projection.headline)}</p>`;
	}

	return `<p class="hero-line hero-focus">${escapeHtml(projection.headline)}</p>
\t\t\t${renderBulletList(projection.summary, 'bullet-list summary-list')}`;
};

const renderResumePdfHtml = (projection) => `<!doctype html>
<html lang="en">
<head>
\t<meta charset="utf-8" />
\t<title>Nicholas Francis O'Brien - ${escapeHtml(projection.label)} Resume BW</title>
\t<link rel="stylesheet" href="../resume-bw.css" />
</head>
<body>
	\t<main class="resume${
		projection.pdfLayout === 'it_support_compact'
			? ' resume-compact-it-support'
			: projection.pdfLayout === 'technical_operations_compact'
				? ' resume-compact-technical-operations'
				: projection.pdfLayout === 'ai_process_compact'
					? ' resume-compact-ai-process'
				: ''
	}">
\t\t<header class="hero section">
\t\t\t<p class="eyebrow">Resume: ${escapeHtml(projection.label)}</p>
\t\t\t<h1>Nicholas Francis O'Brien</h1>
\t\t\t${renderResumeHeroIntro(projection)}
\t\t\t<div class="contact-block" aria-label="Contact details">
\t\t\t\t<p><strong>Location:</strong> ${escapeHtml(resumeLocation)}</p>
\t\t\t\t<p><strong>Email:</strong> ${escapeHtml(resumeContactEmail)}</p>
\t\t\t\t<p><strong>Website:</strong> ${escapeHtml(resumeWebsiteDisplay)}</p>
\t\t\t\t<p><strong>LinkedIn:</strong> ${escapeHtml(resumeLinkedInProfileDisplay)}</p>
\t\t\t\t<p><strong>GitHub:</strong> ${escapeHtml(resumeGitHubDisplay)}</p>
\t\t\t\t<p><strong>X:</strong> ${escapeHtml(resumeTwitterProfileDisplay)}</p>
\t\t\t</div>
\t\t</header>

\t\t${
			projection.pdfLayout === 'it_support_compact'
				? renderItSupportCompactContent()
				: projection.pdfLayout === 'technical_operations_compact'
					? renderTechnicalOperationsCompactContent(projection)
					: projection.pdfLayout === 'ai_process_compact'
						? renderAiProcessCompactContent(projection)
				: projection.sectionOrder.map((sectionId) => renderResumeSection(projection, sectionId)).join('\n\n\t\t')
		}
\t</main>
</body>
</html>
`;

const renderProjectListItem = (item) => {
	if (typeof item === 'string') {
		return `<li>${escapeHtml(item)}</li>`;
	}

	return `<li><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.text)}</li>`;
};

const getProjectParagraphClass = (className) => (className === 'doc-summary' ? 'summary-copy' : '');

const renderProjectSections = (detail) =>
	detail.sections
		.map((section) => {
			const blocks = section.blocks
				.map((block) => {
					if (block.type === 'paragraph') {
						const className = getProjectParagraphClass(block.className);
						const classAttribute = className ? ` class="${className}"` : '';
						return `<p${classAttribute}>${escapeHtml(block.text)}</p>`;
					}

					const items = block.items.map(renderProjectListItem).join('\n\t\t\t\t\t');
					return `<ul>\n\t\t\t\t\t${items}\n\t\t\t\t</ul>`;
				})
				.join('\n\t\t\t\t');

			return `<section class="section">\n\t\t\t\t<h2>${escapeHtml(section.title)}</h2>\n\t\t\t\t${blocks}\n\t\t\t</section>`;
		})
		.join('\n\n\t\t\t');

const renderProjectPdfHtml = (detail, title) => `<!doctype html>
<html lang="en">
<head>
\t<meta charset="utf-8" />
\t<title>${escapeHtml(title)}</title>
\t<link rel="stylesheet" href="../case-bw.css" />
</head>
<body>
\t<main class="doc">
\t\t<header class="section hero">
\t\t\t<p class="eyebrow">${escapeHtml(detail.eyebrow)}</p>
\t\t\t<h1>${escapeHtml(detail.title)}</h1>
\t\t</header>

\t\t\t${renderProjectSections(detail)}

\t</main>
</body>
</html>
`;

await mkdir(generatedDir, { recursive: true });

if (targetSet.has('resume')) {
	const projectionsToRender =
		resumeProjectionFilter === undefined
			? resumeProjections
			: resumeProjections.filter((resumeProjection) => resumeProjection.id === resumeProjectionFilter);

	for (const resumeProjection of projectionsToRender) {
		await writeFile(
			path.join(generatedDir, resumeProjection.pdf.generatedHtmlFilename),
			renderResumePdfHtml(resumeProjection),
			'utf8'
		);
	}

	const shouldWriteDefaultHtml =
		resumeProjectionFilter === undefined || resumeProjectionFilter === defaultResumeProjectionId;
	const defaultProjection = resumeProjections.find(
		(resumeProjection) => resumeProjection.id === defaultResumeProjectionId
	);
	if (shouldWriteDefaultHtml && defaultProjection) {
		await writeFile(path.join(generatedDir, 'resume-bw.html'), renderResumePdfHtml(defaultProjection), 'utf8');
	}
}

if (targetSet.has('migration')) {
	await writeFile(
		path.join(generatedDir, 'portfolio-description-bw.html'),
		renderProjectPdfHtml(migrationProjectDetail, 'Portfolio Description BW'),
		'utf8'
	);
}

if (targetSet.has('remediation')) {
	await writeFile(
		path.join(generatedDir, 'remediation-bw.html'),
		renderProjectPdfHtml(remediationProjectDetail, 'Remediation Script Development Portfolio BW'),
		'utf8'
	);
}
