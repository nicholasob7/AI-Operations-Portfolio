import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildPdfProjectionPilot } from '../src/lib/canonical/pdf-projection.ts';
import {
	activeProjectActive,
	activeProjectCompleted,
	contextPoints,
	delegatedScope,
	progressionStages,
	qualifications,
	resumeContactEmail,
	resumeGitHubDisplay,
	resumeLinkedInProfileDisplay,
	resumeLocation,
	resumeTwitterProfileDisplay,
	resumeWebsiteDisplay
} from '../src/lib/content/resume.ts';
import {
	migrationProjectDetail,
	remediationProjectDetail
} from '../src/lib/content/project-details.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const generatedDir = path.join(__dirname, 'generated');

const projection = buildPdfProjectionPilot();
const requestedTargets = process.argv.slice(2);
const targetSet = new Set(
	requestedTargets.length > 0 ? requestedTargets : ['resume', 'remediation', 'migration']
);

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

const renderResumeTechnicalSkills = () => {
	const items = projection.resume.technicalSkills
		.map(
			(group) =>
				`<li><strong>${escapeHtml(group.title)}:</strong> ${group.items.map(escapeHtml).join(', ')}</li>`
		)
		.join('\n\t\t\t\t\t');

	return `<ul class="bullet-list skill-list">\n\t\t\t\t\t${items}\n\t\t\t\t</ul>`;
};

const renderProgressionStages = () =>
	progressionStages
		.map(
			(stage) => `<section class="subsection progression-stage">
\t\t\t\t\t<h3>${escapeHtml(stage.title)}</h3>
\t\t\t\t\t${renderBulletList(stage.items)}
\t\t\t\t</section>`
		)
		.join('\n\n\t\t\t\t');

const renderResumePdfHtml = () => `<!doctype html>
<html lang="en">
<head>
\t<meta charset="utf-8" />
\t<title>Nicholas Francis O'Brien - Resume BW</title>
\t<link rel="stylesheet" href="../resume-bw.css" />
</head>
<body>
\t<main class="resume">
\t\t<header class="hero section">
\t\t\t<p class="eyebrow">Resume</p>
\t\t\t<h1>Nicholas Francis O'Brien</h1>
\t\t\t<p class="hero-line hero-focus">AI-Forward | Enterprise IT Operations | Process Improvement</p>
\t\t\t<div class="contact-block" aria-label="Contact details">
\t\t\t\t<p><strong>Location:</strong> ${escapeHtml(resumeLocation)}</p>
\t\t\t\t<p><strong>Email:</strong> ${escapeHtml(resumeContactEmail)}</p>
\t\t\t\t<p><strong>Website:</strong> ${escapeHtml(resumeWebsiteDisplay)}</p>
\t\t\t\t<p><strong>LinkedIn:</strong> ${escapeHtml(resumeLinkedInProfileDisplay)}</p>
\t\t\t\t<p><strong>GitHub:</strong> ${escapeHtml(resumeGitHubDisplay)}</p>
\t\t\t\t<p><strong>X:</strong> ${escapeHtml(resumeTwitterProfileDisplay)}</p>
\t\t\t</div>
\t\t</header>

\t\t<section class="section">
\t\t\t<h2>Context</h2>
\t\t\t${renderBulletList(contextPoints)}
\t\t</section>

\t\t<section class="section">
\t\t\t<h2>NTT, Wellington — Present</h2>

\t\t\t<div class="section-grid">
\t\t\t\t<section class="subsection">
\t\t\t\t\t<h3>Initiative in Scope</h3>

\t\t\t\t\t<section class="subsection nested">
\t\t\t\t\t\t<h4>Active Project</h4>

\t\t\t\t\t\t<section class="subsection nested-deep">
\t\t\t\t\t\t\t<h5>Completed</h5>
\t\t\t\t\t\t\t${renderBulletList(activeProjectCompleted)}
\t\t\t\t\t\t</section>

\t\t\t\t\t\t<section class="subsection nested-deep">
\t\t\t\t\t\t\t<h5>Active</h5>
\t\t\t\t\t\t\t${renderBulletList(activeProjectActive)}
\t\t\t\t\t\t</section>
\t\t\t\t\t</section>
\t\t\t\t</section>

\t\t\t\t<section class="subsection">
\t\t\t\t\t<h3>Delegated Scope</h3>
\t\t\t\t\t${renderBulletList(delegatedScope)}
\t\t\t\t</section>
\t\t\t</div>
\t\t</section>

\t\t<section class="section progression-section">
\t\t\t<h2>Role Progression Map <span class="inline-meta">From service desk baseline to AI-forward operational delivery</span></h2>

\t\t\t\t${renderProgressionStages()}
\t\t</section>

\t\t<section class="section">
\t\t\t<h2>Technical Skills</h2>
\t\t\t${renderResumeTechnicalSkills()}
\t\t</section>

\t\t<section class="section">
\t\t\t<h2>Qualifications</h2>
\t\t\t${renderBulletList(qualifications)}
\t\t</section>
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
	await writeFile(path.join(generatedDir, 'resume-bw.html'), renderResumePdfHtml(), 'utf8');
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
