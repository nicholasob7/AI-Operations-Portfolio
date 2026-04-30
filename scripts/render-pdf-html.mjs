import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildPdfProjectionPilot } from '../src/lib/canonical/pdf-projection.ts';
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

const renderResumeTechnicalSkills = () => {
	const items = projection.resume.technicalSkills
		.map(
			(group) =>
				`<li><strong>${escapeHtml(group.title)}:</strong> ${group.items.map(escapeHtml).join(', ')}</li>`
		)
		.join('\n\t\t\t\t\t');

	return `<ul class="bullet-list skill-list">\n\t\t\t\t\t${items}\n\t\t\t\t</ul>`;
};

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
	<meta charset="utf-8" />
	<title>${escapeHtml(title)}</title>
	<link rel="stylesheet" href="../case-bw.css" />
</head>
<body>
	<main class="doc">
		<header class="section hero">
			<p class="eyebrow">${escapeHtml(detail.eyebrow)}</p>
			<h1>${escapeHtml(detail.title)}</h1>
		</header>

			${renderProjectSections(detail)}

	</main>
</body>
</html>
`;

const replaceMarker = (template, marker, replacement) => {
	if (!template.includes(marker)) {
		throw new Error(`Template marker not found: ${marker}`);
	}

	return template.replace(marker, replacement);
};

const renderTemplate = async ({ source, destination, replacements }) => {
	let template = await readFile(source, 'utf8');

	for (const [marker, replacement] of replacements) {
		template = replaceMarker(template, marker, replacement);
	}

	await mkdir(path.dirname(destination), { recursive: true });
	await writeFile(destination, template, 'utf8');
};

if (targetSet.has('resume')) {
	const replacements = [
		['<!-- PDF_PILOT_RESUME_TECHNICAL_SKILLS -->', renderResumeTechnicalSkills()]
	];

	await renderTemplate({
		source: path.join(__dirname, 'resume-bw.html'),
		destination: path.join(generatedDir, 'resume-bw.html'),
		replacements
	});
}

if (targetSet.has('migration')) {
	await mkdir(generatedDir, { recursive: true });
	await writeFile(
		path.join(generatedDir, 'portfolio-description-bw.html'),
		renderProjectPdfHtml(migrationProjectDetail, 'Portfolio Description BW'),
		'utf8'
	);
}

if (targetSet.has('remediation')) {
	await mkdir(generatedDir, { recursive: true });
	await writeFile(
		path.join(generatedDir, 'remediation-bw.html'),
		renderProjectPdfHtml(remediationProjectDetail, 'Remediation Script Development Portfolio BW'),
		'utf8'
	);
}
