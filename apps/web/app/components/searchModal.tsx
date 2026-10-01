"use client";
import { motion, AnimatePresence } from "motion/react";

import { useMemo, useState } from "react";
import { getNoteTags, type Notebook, type Note } from "@/lib/notebooks";

type SearchResult =
  | { kind: "note"; notebook: Notebook; note: Note }
  | { kind: "quick"; note: Note };

// ? modal de búsqueda global: filtra notas y notas rápidas conforme escribes
export default function SearchModal({
  isOpen,
  onClose,
  notebooks,
  quickNotes,
  onOpenNote,
  onOpenQuickNote,
}: {
  isOpen: boolean;
  onClose: () => void;
  notebooks: Notebook[];
  quickNotes: Note[];
  onOpenNote: (notebookId: string, noteId: string) => void;
  onOpenQuickNote: (note: Note) => void;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const out: SearchResult[] = [];
    for (const notebook of notebooks) {
      for (const note of notebook.notes) {
        const tags = getNoteTags(note);
        const haystack =
          `${note.title} ${tags.map((t) => `#${t.label}`).join(" ")}`.toLowerCase();
        if (haystack.includes(q)) out.push({ kind: "note", notebook, note });
      }
    }
    for (const note of quickNotes) {
      const tags = getNoteTags(note);
      const haystack =
        `${note.title} ${tags.map((t) => `#${t.label}`).join(" ")}`.toLowerCase();
      if (haystack.includes(q)) out.push({ kind: "quick", note });
    }
    return out.slice(0, 20);
  }, [query, notebooks, quickNotes]);

  const handleSelect = (result: SearchResult) => {
    if (result.kind === "note") {
      onOpenNote(result.notebook.id, result.note.id);
    } else {
      onOpenQuickNote(result.note);
    }
    setQuery("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            className="w-[28rem] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-4 shrink-0 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") onClose();
                  if (e.key === "Enter" && results.length > 0)
                    handleSelect(results[0]);
                }}
                type="text"
                placeholder="Buscar notas por título o #etiqueta..."
                className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Limpiar búsqueda"
                  className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto py-1">
              {query.trim() === "" ? (
                <p className="px-4 py-6 text-center text-sm text-gray-400">
                  Escribe para buscar entre tus notas
                </p>
              ) : results.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-gray-400">
                  Sin resultados para “{query.trim()}”
                </p>
              ) : (
                results.map((result) => {
                  const note = result.note;
                  const tags = getNoteTags(note);
                  const key =
                    result.kind === "note"
                      ? `${result.notebook.id}-${note.id}`
                      : `quick-${note.id}`;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSelect(result)}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-left transition hover:bg-gray-50"
                    >
                      {result.kind === "note" ? (
                        <span
                          className="size-2 shrink-0 rounded-full"
                          style={{
                            backgroundColor: result.notebook.color,
                          }}
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4 shrink-0 text-yellow-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                          />
                        </svg>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-gray-800">
                          {note.title}
                        </span>
                        <span className="block truncate text-xs text-gray-400">
                          {result.kind === "note"
                            ? result.notebook.name
                            : "Nota rápida"}
                          {tags.length > 0 &&
                            ` · ${tags.map((t) => `#${t.label}`).join(" ")}`}
                        </span>
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
