import { readFile, writeFile } from 'node:fs/promises';

const [, , inputHtml, outputPdf] = process.argv;

if (!inputHtml || !outputPdf) {
	console.error('Usage: node scripts/render-html-text-pdf.mjs <input-html> <output-pdf>');
	process.exit(1);
}

const decodeHtml = (value) =>
	value
		.replaceAll('&amp;', '&')
		.replaceAll('&lt;', '<')
		.replaceAll('&gt;', '>')
		.replaceAll('&quot;', '"')
		.replaceAll('&#39;', "'");

const extractTextLines = (html) => {
	const text = html
		.replace(/<script[\s\S]*?<\/script>/gi, '')
		.replace(/<style[\s\S]*?<\/style>/gi, '')
		.replace(/<\/(h1|h2|h3|h4|h5|p|li|section|header|div|ul|main)>/gi, '\n')
		.replace(/<li[^>]*>/gi, '• ')
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<[^>]+>/g, '')
		.replace(/\t/g, ' ');

	return decodeHtml(text)
		.split('\n')
		.map((line) => line.replace(/\s+/g, ' ').trim())
		.filter(Boolean);
};

const wrapLine = (line, width = 96) => {
	if (line.length <= width) return [line];

	const words = line.split(' ');
	const lines = [];
	let current = '';

	for (const word of words) {
		if (!current) {
			current = word;
			continue;
		}

		if (`${current} ${word}`.length > width) {
			lines.push(current);
			current = word;
		} else {
			current = `${current} ${word}`;
		}
	}

	if (current) lines.push(current);
	return lines;
};

const winAnsiMap = new Map([
	['•', 0x95],
	['–', 0x96],
	['—', 0x97],
	['‘', 0x91],
	['’', 0x92],
	['“', 0x93],
	['”', 0x94],
	['…', 0x85]
]);

const toWinAnsiByte = (character) => {
	const codePoint = character.codePointAt(0);
	if (codePoint === undefined) return 0x3f;
	if (codePoint >= 0x20 && codePoint <= 0x7e) return codePoint;
	return winAnsiMap.get(character) ?? 0x3f;
};

const toPdfString = (value) => {
	const bytes = [...value].map(toWinAnsiByte);
	const escaped = bytes
		.map((byte) => {
			if (byte === 0x28 || byte === 0x29 || byte === 0x5c) {
				return `\\${String.fromCharCode(byte)}`;
			}
			if (byte < 0x20 || byte > 0x7e) {
				return `\\${byte.toString(8).padStart(3, '0')}`;
			}
			return String.fromCharCode(byte);
		})
		.join('');

	return `(${escaped})`;
};

const createContentStream = (lines) => {
	const commands = ['BT', '/F1 9.8 Tf', '42 800 Td', '12 TL'];

	for (const line of lines) {
		commands.push(`${toPdfString(line)} Tj`, 'T*');
	}

	commands.push('ET');
	return commands.join('\n');
};

const buildPdf = (rawLines) => {
	const wrappedLines = rawLines.flatMap((line) => wrapLine(line));
	const linesPerPage = 63;
	const pages = [];
	for (let index = 0; index < wrappedLines.length; index += linesPerPage) {
		pages.push(wrappedLines.slice(index, index + linesPerPage));
	}

	const objects = [];
	const addObject = (body) => {
		objects.push(body);
		return objects.length;
	};

	const catalogId = addObject('<< /Type /Catalog /Pages 2 0 R >>');
	const pagesId = addObject('');
	const fontId = addObject(
		'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'
	);
	const pageIds = [];

	for (const pageLines of pages) {
		const content = createContentStream(pageLines);
		const contentId = addObject(
			`<< /Length ${Buffer.byteLength(content, 'utf8')} >>\nstream\n${content}\nendstream`
		);
		const pageId = addObject(
			`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`
		);
		pageIds.push(pageId);
	}

	objects[pagesId - 1] =
		`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

	const chunks = ['%PDF-1.4\n'];
	const offsets = [0];

	objects.forEach((body, index) => {
		offsets.push(Buffer.byteLength(chunks.join(''), 'utf8'));
		chunks.push(`${index + 1} 0 obj\n${body}\nendobj\n`);
	});

	const xrefOffset = Buffer.byteLength(chunks.join(''), 'utf8');
	chunks.push(`xref\n0 ${objects.length + 1}\n`);
	chunks.push('0000000000 65535 f \n');
	for (let index = 1; index < offsets.length; index += 1) {
		chunks.push(`${offsets[index].toString().padStart(10, '0')} 00000 n \n`);
	}
	chunks.push(
		`trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`
	);

	return chunks.join('');
};

const html = await readFile(inputHtml, 'utf8');
const lines = extractTextLines(html);
await writeFile(outputPdf, buildPdf(lines), 'utf8');
