import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { migrationProjectDetail, remediationProjectDetail } from '../src/lib/content/project-details.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const generatedDir = path.join(__dirname, 'generated');

const requestedTargets = process.argv.slice(2);
const targetSet = new Set(
	requestedTargets.length > 0 ? requestedTargets : ['remediation', 'migration']
);

if (targetSet.has('resume')) {
	throw new Error(
		'Legacy resume PDF rendering is retired. Active resume PDFs are reviewed static artifacts until the resume-documents.ts renderer is implemented.'
	);
}

const escapeHtml = (value) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');

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
