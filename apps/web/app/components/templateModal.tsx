"use client";
import { motion, AnimatePresence } from "motion/react";

import { useRouter } from "next/navigation";
import { loadQuickNotes, saveQuickNotes } from "@/lib/notebooks";
import {
  TEMPLATES,
  addQuickNoteFromTemplate,
  type Template,
} from "@/lib/templates";

const TONES = [
  { bg: "bg-blue-bg", ink: "text-blue-ink" },
  { bg: "bg-purple-bg", ink: "text-purple-ink" },
  { bg: "bg-gold-bg", ink: "text-gold-ink" },
  { bg: "bg-rose-bg", ink: "text-rose-ink" },
  { bg: "bg-green-bg", ink: "text-green-ink" },
  { bg: "bg-peach-bg", ink: "text-peach-ink" },
];

// ? modal para elegir plantilla: crea una quick note con el contenido predefinido
export default function TemplateModal({
  isOpen,
  onClose,
  onCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (noteId: string) => void;
}) {
  const router = useRouter();

  const handleSelectTemplate = (template: Template) => {
    const result = addQuickNoteFromTemplate(
      loadQuickNotes(),
      template.noteTitle,
      template.content,
    );
    saveQuickNotes(result.quickNotes);
    onClose();
    if (onCreated) {
      onCreated(result.note.id);
    } else {
      router.push(`/notebooks?quick=${result.note.id}`);
    }
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
          onClick={onClose}
        >
          <motion.div
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-surface p-6 shadow-[0_24px_80px_rgba(28,25,23,0.18)] sm:p-7"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-3">
                  Empieza con una base
                </p>
                <h2 className="mt-1 font-serif text-2xl leading-tight text-text">
                  Plantillas
                </h2>
                <p className="mt-1 text-sm text-text-2">
                  Elige una plantilla para crear una nota rápida.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
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

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {TEMPLATES.map((template, index) => {
                const tone = TONES[index % TONES.length];
                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleSelectTemplate(template)}
                    className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-4 text-left shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_10px_28px_rgba(28,25,23,0.07)] active:translate-y-0 active:scale-[0.99]"
                  >
                    <span
                      className={`grid size-10 place-items-center rounded-xl ${tone.bg} ${tone.ink} transition group-hover:scale-105`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="size-5"
                      >
                        <path d={template.icon} />
                      </svg>
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-text">
                        {template.title}
                      </span>
                      <span className="text-xs leading-relaxed text-text-3">
                        {template.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text-2 transition hover:bg-surface-2 hover:text-text active:scale-[0.98]"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
