import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

type NoteExport = { title: string; content: string };

const sanitize = (name: string) => {
  return name.replace(/[^a-z0-9áéíóúñ ]/gi, "").trim() || "nota";
};

// quitar tags HTML y dejar texto plano
const stripHtml = (html: string) => {
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "_${1}_")
    .replace(/<i[^>]*>(.*?)<\/i>/gi, "_${1}_")
    .replace(/<u[^>]*>(.*?)<\/u>/gi, "$1")
    .replace(/<s[^>]*>(.*?)<\/s>/gi, "~~$1~~")
    .replace(/<del[^>]*>(.*?)<\/del>/gi, "~~$1~~")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
    .replace(/<\/?p[^>]*>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

// exportar a txt
export const exportTxt = (note: NoteExport) => {
  const text = stripHtml(note.content);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `${sanitize(note.title)}.txt`);
};

// exportar como md (markdown)
export const exportMd = (note: NoteExport) => {
  const md = `# ${note.title}\n\n${stripHtml(note.content)}`;
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  saveAs(blob, `${sanitize(note.title)}.md`);
};

// exportar a pdf
export const exportPdf = (note: NoteExport) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const text = stripHtml(note.content);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(note.title, 20, 25);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  const lines = doc.splitTextToSize(text, 170);
  doc.text(lines, 20, 38);

  doc.save(`${sanitize(note.title)}.pdf`);
};

export const exportDocx = (note: NoteExport) => {
  const text = stripHtml(note.content);
  const paragraphs = text.split("\n").map(
    (line) =>
      new Paragraph({
        children: [new TextRun({ text: line, size: 24 })],
      }),
  );

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun({ text: note.title, bold: true, size: 36 })],
            heading: HeadingLevel.HEADING_1,
          }),
          ...paragraphs,
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${sanitize(note.title)}.docx`);
  });
};


// copiar contenido de la nota al portapapeles
export const copyToClipboard = async (note: NoteExport) => {
  const text = `${note.title}\n\n${stripHtml(note.content)}`;
  await navigator.clipboard.writeText(text);
};