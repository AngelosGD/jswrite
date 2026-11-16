"use client";
import { motion, AnimatePresence } from "motion/react";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { addQuickNote, saveQuickNotes, useQuickNotes } from "@/lib/notebooks";
import FileDrop from "./fileDrop";

const inputClass =
  "w-full rounded-xl border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-text transition placeholder:text-text-3 focus:border-brand focus:outline-none focus:ring-4 focus:ring-blue-bg";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const textToHtml = (text: string) => {
  const clean = text.replace(/\r\n/g, "\n").trim();
  if (!clean) return "";
  return clean
    .split(/\n{2,}/)
    .map(
      (block) =>
        `<p>${block.split("\n").map(escapeHtml).join("<br>")}</p>`,
    )
    .join("");
};

export default function QuickNoteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const quickNotes = useQuickNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setTitle("");
    setContent("");
    setFileName(null);
    setError(null);
  };

  const close = () => {
    reset();
    onClose();
  };

  const acceptFiles = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (!/\.(txt|md|markdown)$/i.test(file.name)) {
      setError("Solo se aceptan archivos .txt o .md");
      return;
    }

    void file.text().then((text) => {
      setFileName(file.name);
      setTitle(file.name.replace(/\.[^.]+$/, ""));
      setContent(textToHtml(text));
      setError(null);
    });
  };

  const handleCreate = (event: FormEvent) => {
    event.preventDefault();
    const result = addQuickNote(quickNotes, title, content);
    saveQuickNotes(result.quickNotes);
    reset();
    onClose();
    router.push(`/notebooks?quick=${result.note.id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-text/25 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={close}
        >
          <motion.div
            className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-[0_24px_80px_rgba(28,25,23,0.18)] sm:p-7"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-3">
                  Captura rápida
                </p>
                <h2 className="mt-1 font-serif text-2xl leading-tight text-text">
                  Nota rápida
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar"
                className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-text-3 transition hover:bg-surface-2 hover:text-text"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="size-4"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-6 flex flex-col gap-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-text-3">
                  Título
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  type="text"
                  placeholder="Sin título"
                  className={`mt-2 ${inputClass}`}
                />
              </div>

              <div>
                <FileDrop
                  title="Arrastra un archivo"
                  hint="Acepta .txt y .md; se convierten en el contenido"
                  accept=".txt,.md,.markdown,text/plain,text/markdown"
                  fileName={fileName}
                  onFiles={acceptFiles}
                />
                {error && (
                  <p className="mt-2 rounded-lg bg-error-bg px-3 py-2 text-xs font-medium text-error-ink">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text-2 transition hover:bg-surface-2 hover:text-text active:scale-[0.98]"
                >
                  Cancelar
                </button>
                <button className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(59,91,219,0.24)] transition hover:bg-brand-hover active:scale-[0.98]">
                  Crear nota
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
