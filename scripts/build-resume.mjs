// Generates public/resume.pdf from src/content/site.ts so the PDF never drifts from the site.
// Runs automatically before `next build` (see the "prebuild" script) and via `npm run resume`.
import { createRequire } from "node:module";
import { mkdirSync, createWriteStream } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const PDFDocument = require("pdfkit");

const here = path.dirname(fileURLToPath(import.meta.url));
const { site, roles, education, certifications, learning, story } = await import(
  path.join(here, "..", "src", "content", "site.ts")
);

const INK = "#1f2a24";
const MUTED = "#5a655e";
const ACCENT = "#1f4a3a";
const RULE = "#d9cfb8";

const out = path.join(here, "..", "public", "resume.pdf");
mkdirSync(path.dirname(out), { recursive: true });

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: 48, bottom: 48, left: 54, right: 54 },
  info: { Title: `${site.name} Resume`, Author: site.name },
});
doc.pipe(createWriteStream(out));

const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
const metricText = (m) => `${m.prefix ?? ""}${m.value.toLocaleString("en-US")}${m.suffix ?? ""} ${m.label}`;

// Header
doc.font("Helvetica-Bold").fontSize(24).fillColor(INK).text(site.name);
doc.moveDown(0.15);
doc.font("Helvetica").fontSize(11).fillColor(ACCENT).text(`${site.title}, ${site.org}`);
doc.moveDown(0.2);
doc
  .fontSize(9.5)
  .fillColor(MUTED)
  .text(`${site.email}   ·   ${site.url.replace("https://", "")}   ·   ${site.links.linkedin.replace("https://www.", "")}   ·   ${site.location}`);
rule();

// Summary
heading("Summary");
doc.font("Helvetica").fontSize(10).fillColor(INK).text(`${site.intro} ${story.background}`, { width, lineGap: 1.5 });

// Experience
heading("Experience");
for (const r of roles) {
  keepTogether(90);
  doc.font("Helvetica-Bold").fontSize(11).fillColor(INK).text(r.title, { continued: true });
  doc.font("Helvetica").fontSize(9.5).fillColor(MUTED).text(`   ${r.start} to ${r.end}`, { align: "right" });
  doc.font("Helvetica").fontSize(10).fillColor(ACCENT).text(`${r.company}  ·  ${r.location}`);
  doc.moveDown(0.25);
  const bullets = [...r.description.slice(0, 3), ...r.metrics.slice(0, 3).map(metricText)];
  for (const b of bullets) bullet(b);
  doc.moveDown(0.5);
}

// Education and credentials
heading("Education");
doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK).text(education.school, { continued: true });
doc.font("Helvetica").fontSize(9.5).fillColor(MUTED).text(`   ${education.years}`, { align: "right" });
doc.font("Helvetica").fontSize(10).fillColor(INK).text(education.degree);

heading("Certifications and skills");
for (const c of certifications) bullet(`${c.name} (${c.status})`);
bullet(`Currently learning ${learning.join(", ")}`);
bullet("Operations, grant strategy and compliance, hospitality, volunteer leadership, process design, technology support");

doc.end();
console.log("resume.pdf written to", path.relative(process.cwd(), out));

function heading(t) {
  doc.moveDown(0.9);
  doc.font("Helvetica-Bold").fontSize(9).fillColor(ACCENT).text(t.toUpperCase(), { characterSpacing: 1.5 });
  rule(4);
}
function rule(gap = 6) {
  const y = doc.y + gap;
  doc.moveTo(doc.page.margins.left, y).lineTo(doc.page.margins.left + width, y).lineWidth(0.6).strokeColor(RULE).stroke();
  doc.y = y + 8;
}
function bullet(text) {
  const x = doc.page.margins.left;
  keepTogether(24);
  doc.font("Helvetica").fontSize(9.5).fillColor(INK);
  doc.text("•", x, doc.y, { width: 10, continued: false });
  doc.moveUp();
  doc.text(text, x + 12, doc.y, { width: width - 12, lineGap: 1 });
  doc.x = x;
}
function keepTogether(px) {
  if (doc.y + px > doc.page.height - doc.page.margins.bottom) doc.addPage();
}
