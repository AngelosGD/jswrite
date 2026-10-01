import type { Note } from "./notebooks";

/*
 * definiciones de plantillas: cada una crea una quick note
 * con titulo y contenido HTML predefinido.
 * solo se usan tags que stripHtml (lib/export-note.ts) maneja:
 * h2, p, strong, ul, li — asi la exportacion no se rompe.
 */

export type Template = {
  id: string;
  title: string;
  description: string;
  icon: string;
  noteTitle: string;
  content: string;
};

export const TEMPLATES: Template[] = [
  {
    id: "clase",
    title: "Nota de clase",
    description: "Tema, apuntes, dudas y tarea",
    icon: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
    noteTitle: "Clase",
    content:
      "<h2>Tema</h2><p></p><h2>Apuntes</h2><p></p><h2>Dudas</h2><p></p><h2>Tarea</h2><p></p>",
  },
  {
    id: "correo",
    title: "Correo electrónico",
    description: "Para, asunto y cuerpo listos",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
    noteTitle: "Correo",
    content:
      "<p><strong>Para:</strong> </p><p><strong>Asunto:</strong> </p><p><strong>Cuerpo:</strong> </p><p></p><p>Saludos,</p>",
  },
  {
    id: "todo",
    title: "Todo list",
    description: "Lista de tareas para tachar",
    icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    noteTitle: "Mi lista",
    content:
      "<h2>Mi lista</h2><ul><li><p>Tarea 1</p></li><li><p>Tarea 2</p></li><li><p>Tarea 3</p></li></ul>",
  },
  {
    id: "diario",
    title: "Diario",
    description: "Cómo te sentiste y pendientes",
    icon: "M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
    noteTitle: "Diario",
    content:
      "<h2>Cómo me sentí</h2><p></p><h2>Logros</h2><p></p><h2>Pendientes</h2><p></p>",
  },
  {
    id: "pros-contras",
    title: "Pros / Contras",
    description: "Decide con dos columnas",
    icon: "M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
    noteTitle: "Pros y contras",
    content:
      "<h2>Pro</h2><ul><li><p></p></li></ul><h2>Contra</h2><ul><li><p></p></li></ul>",
  },
  {
    id: "reunion",
    title: "Reunión",
    description: "Participantes, acuerdos y tareas",
    icon: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.932-.458",
    noteTitle: "Reunión",
    content:
      "<h2>Participantes</h2><p></p><h2>Tema</h2><p></p><h2>Acuerdos</h2><ul><li><p></p></li></ul><h2>Tareas</h2><ul><li><p></p></li></ul>",
  },
  {
    id: "resumen",
    title: "Resumen",
    description: "Ideas clave y opinión",
    icon: "M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25",
    noteTitle: "Resumen",
    content:
      "<h2>Título original</h2><p></p><h2>Ideas clave</h2><p></p><h2>Opinión</h2><p></p><h2>Citas</h2><p></p>",
  },
  {
    id: "proyecto",
    title: "Proyecto",
    description: "Objetivo, pasos y deadline",
    icon: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z",
    noteTitle: "Proyecto",
    content:
      "<h2>Objetivo</h2><p></p><h2>Pasos</h2><ul><li><p></p></li></ul><h2>Deadline</h2><p></p><h2>Notas</h2><p></p>",
  },
];

export function isTemplateId(id: string): id is Template["id"] {
  return TEMPLATES.some((t) => t.id === id);
}

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

// ? crea una quick note a partir de una plantilla
export function addQuickNoteFromTemplate(
  quickNotes: Note[],
  title: string,
  content: string,
): { quickNotes: Note[]; note: Note } {
  const note: Note = {
    id: crypto.randomUUID(),
    title,
    content,
    pinned: false,
    type: "quick",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return { quickNotes: [...quickNotes, note], note };
}
