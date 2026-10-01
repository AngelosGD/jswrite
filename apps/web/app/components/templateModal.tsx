"use client";
import { motion, AnimatePresence } from "motion/react";

import { loadQuickNotes, saveQuickNotes } from "@/lib/notebooks";
import { TEMPLATES, addQuickNoteFromTemplate, type Template } from "@/lib/templates";

// ? modal para elegir plantilla: crea una quick note con el contenido predefinido
export default function TemplateModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleSelectTemplate = (template: Template) => {
    const result = addQuickNoteFromTemplate(
      loadQuickNotes(),
      template.noteTitle,
      template.content,
    );
    saveQuickNotes(result.quickNotes);
    onClose();
    window.location.href = `/notebooks?quick=${result.note.id}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            className="max-h-[80vh] w-[28rem] overflow-y-auto rounded border border-gray-200 bg-white p-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-xl text-gray-800">Plantillas</h2>
            <p className="mt-1 text-sm text-gray-500">
              Elige una plantilla para crear una nota rápida
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleSelectTemplate(template)}
                  className="group flex flex-col items-start gap-1 rounded-lg border border-gray-200 p-3 text-left transition duration-150 ease hover:border-gray-400 hover:bg-gray-50 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 rounded bg-gray-200 p-1 text-gray-600 transition group-hover:text-green-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={template.icon}
                    />
                  </svg>
                  <span className="text-sm font-semibold text-gray-800">
                    {template.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {template.description}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="border border-gray-400 p-2 transition duration-280 ease hover:bg-black hover:text-white active:scale-95"
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
