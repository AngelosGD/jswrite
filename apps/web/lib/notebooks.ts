import { m } from "framer-motion";
import path from "path";
import { useSyncExternalStore } from "react";

/*
? definimos los tipos / estructura de las notas y los notebooks
*/

// ? etiqueta de una nota: se muestra con prefijo # y color propio
export type Tag = {
  label: string;
  color: string;
};

export const TAG_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

export type Note = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  type?: "quick";
  tags?: Tag[];
  createdAt: string;
  updatedAt: string;
};

export type Notebook = {
  id: string;
  name: string;
  color: string;
  pinned: boolean;
  starred: boolean;
  createdAt: string;
  updatedAt: string;
  notes: Note[];
};

export const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
];

const STORAGE_KEY = "jswrite.notebooks";
const EMPTY: Notebook[] = [];

let cache: Notebook[] | null = null;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notify() {
  listeners.forEach((callback) => callback());
}

export function loadNotebooks(): Notebook[] {
  if (typeof window === "undefined") return EMPTY;
  if (cache) return cache;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    cache = EMPTY;
    return cache;
  }
  try {
    cache = JSON.parse(raw) as Notebook[];
    return cache;
  } catch {
    cache = EMPTY;
    return cache;
  }
}

export function saveNotebooks(notebooks: Notebook[]): void {
  cache = notebooks;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notebooks));
  notify();
}

const QUICK_KEY = "jswrite.quickNotes";
const EMPTY_Q: Note[] = [];
let quickCache: Note[] | null = null;
const quickListeners = new Set<() => void>();

const quickSubscrite = (cb: () => void) => {
  quickListeners.add(cb);
  return () => {
    quickListeners.delete(cb);
  };
};

const quickNotify = () => {
  quickListeners.forEach((cb) => cb());
};

export function loadQuickNotes(): Note[] {
  if (typeof window === "undefined") return EMPTY_Q;
  if (quickCache) return quickCache;
  const raw = window.localStorage.getItem(QUICK_KEY);
  if (!raw) {
    quickCache = EMPTY_Q;
    return quickCache;
  }
  try {
    quickCache = JSON.parse(raw) as Note[]
    return quickCache
  } catch {
    quickCache = EMPTY_Q;
    return quickCache;
  }
}

export function saveQuickNotes(notes: Note[]): void{
  quickCache = notes
  window.localStorage.setItem(QUICK_KEY, JSON.stringify(notes))
  quickNotify()
}

export function useQuickNotes(): Note[]{
  return useSyncExternalStore(quickSubscrite, loadQuickNotes, () => EMPTY_Q)
}


export function createNotebook(name: string, color: string): Notebook {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name: name.trim() || "Sin título",
    color,
    pinned: false,
    starred: false,
    createdAt: now,
    updatedAt: now,
    notes: [],
  };
}

export function updateNotebook(
  notebooks: Notebook[],
  id: string,
  patch: Partial<Notebook>,
): Notebook[] {
  return notebooks.map((n) =>
    n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n,
  );
}

export function deleteNotebook(notebooks: Notebook[], id: string): Notebook[] {
  return notebooks.filter((n) => n.id !== id);
}

export function useNotebooks(): Notebook[] {
  return useSyncExternalStore(subscribe, loadNotebooks, () => EMPTY);
}

//todo libs para la nota, apartado del noteboook atras

const NOTE_TITLES = [
  "Recordatorios",
  "Apuntes",
  "Borradores",
  "Pendiente",
  "Lista",
  "Ideas",
  "Diario",
];

export function createNoteTitle(): string {
  const index = Math.floor(Math.random() * NOTE_TITLES.length);
  return NOTE_TITLES[index];
}

export function addNote(
  notebooks: Notebook[],
  notebookId: string,
  title: string,
  content: string,
): { notebooks: Notebook[]; note: Note } {
  const note: Note = {
    id: crypto.randomUUID(),
    title,
    content,
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    note,
    notebooks: notebooks.map((n) =>
      n.id === notebookId ? { ...n, notes: [...n.notes, note] } : n,
    ),
  };
}

export function updaetNote(
  notebooks: Notebook[],
  notebookId: string,
  noteId: string,
  patch: Partial<Note>,
): Notebook[] {
  return notebooks.map((n) =>
    n.id !== notebookId
      ? n
      : {
          ...n,
          notes: n.notes.map((note) =>
            note.id === noteId
              ? { ...note, ...patch, updatedAt: new Date().toISOString() }
              : note,
          ),
        },
  );
}

export function deleteNote(
  notebooks: Notebook[],
  notebookId: string,
  noteId: string,
): Notebook[] {
  return notebooks.map((n) =>
    n.id !== notebookId
      ? n
      : { ...n, notes: n.notes.filter((note) => note.id !== noteId) },
  );
}



// ! helpers para las etiquetas de las notas

export function getNoteTags(note: Note): Tag[] {
  return note.tags ?? [];
}

function randomTagColor(existing: Tag[]): string {
  const used = new Set(existing.map((t) => t.color));
  const free = TAG_COLORS.filter((c) => !used.has(c));
  const pool = free.length > 0 ? free : TAG_COLORS;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ? crea una etiqueta (sin #, sin duplicados, color al azar); null si inválida
export function createTag(existing: Tag[], rawLabel: string): Tag | null {
  const label = rawLabel.trim().replace(/^#+/, "").trim();
  if (!label) return null;
  if (existing.some((t) => t.label.toLowerCase() === label.toLowerCase()))
    return null;
  return { label, color: randomTagColor(existing) };
}

export function addTagToNote(note: Note, rawLabel: string): Note {
  const tags = getNoteTags(note);
  const tag = createTag(tags, rawLabel);
  if (!tag) return note;
  return { ...note, tags: [...tags, tag] };
}

export function removeTagFromNote(note: Note, label: string): Note {
  return {
    ...note,
    tags: getNoteTags(note).filter(
      (t) => t.label.toLowerCase() !== label.toLowerCase(),
    ),
  };
}

// ! helpers para las quick notes
// ! funciones auxiliares para tareas repetitivas

function randomSuffix(): string{
  return Math.random().toString(36).slice(2,6)
}

export function createQuickNoteTitle(quickNotes: Note[]): string{
  return `Untitled-${randomSuffix()}`  
}

export function addQuickNote(quickNotes: Note[]): {quickNotes: Note[]; note: Note}{
  const note: Note = {
    id: crypto.randomUUID(),
    title: createQuickNoteTitle(quickNotes),
    content:"",
    pinned: false,
    type: "quick",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {quickNotes: [...quickNotes, note], note}
}


export function deleteQuickNote(quickNotes: Note[], noteId: string): Note[]{
  return quickNotes.filter((n) => n.id !== noteId)
}


export function moveQuickNoteToNotebook(
  quickNotes: Note[],
  notebooks: Notebook[],
  noteId: string,
  notebookId: string
):{quickNotes: Note[], notebooks: Notebook[]} {
  const note = quickNotes.find((n) => n.id === noteId);
  if(!note) return {quickNotes, notebooks}
  const moved: Note = {...note, type:undefined}
  return {
    quickNotes: quickNotes.filter((n) => n.id !== noteId),
    notebooks: notebooks.map((n) =>
      n.id === notebookId ? {...n, notes: [...n.notes, moved]} : n,
    )
  }
}


