import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

type NoteExport = { title: string; content: string };

const sanitize = (name: string) => {
  return name.replace(/[^a-z0-9áéíóúñ ]/gi, "").trim() || "nota";
};

// exportar a txt
export const exportTxt = (note: NoteExport) => {
  const blob = new Blob([note.content], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `${sanitize(note.title)}.txt`);
};

// exportar como md (markdown)
export const exportMd = (note: NoteExport) => {
  const md = `# ${note.title}\n\n${note.content}`;
  const blob = new Blob([md], { type: "text/markdown;charsef=utf-8" });
  saveAs(blob, `${sanitize(note.title)}.md`);
};

// exportar a pdf
export const exportPdf = (note: NoteExport) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(note.title, 20, 25);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  const lines = doc.splitTextToSize(note.content, 70);
  doc.text(lines, 20, 38);

  doc.save(`${sanitize(note.title)}.pdf`);
};

export const exporDocx = (note: NoteExport) => {
  const paragraphs = note.content.split("\n").map(
    (line) =>
      new Paragraph({
        children: [new TextRun({ text: line, size: 24 })], // 12pt = size 24 half-points
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
    saveAs(blob, `${sanitize(note.title)}.pdf`);
  });
};


// copiar contenido de la nota al portapapeles
export const copyToClipboard = async (note: NoteExport) =>{
    const text = `${note.title}\n\n${note.content}`
    await navigator.clipboard.writeText(text)
}