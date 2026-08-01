import { useSyncExternalStore } from "react";


/*
? definimos los tipos / estructura de las notas y los notebooks
*/
export type Note = {
  id: string;
  title: string;
  content: string;
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
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#3b82f6", "#8b5cf6", "#ec4899", "#64748b",
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