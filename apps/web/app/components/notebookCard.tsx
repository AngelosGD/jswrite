"use client";
import { motion } from "motion/react";
import type { Notebook } from "@/lib/notebooks";

export default function NotebookCard({
  notebook,
  onOpen,
}: {
  notebook: Notebook;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="group relative mx-auto flex aspect-[4/3] w-full max-w-[170px] flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      {/* línea de acento con el color */}
      <div
        className="h-1.5 w-full shrink-0"
        style={{ backgroundColor: notebook.color }}
      />

      <div className="flex flex-1 flex-col items-start justify-between p-4">
        <p className="line-clamp-2 text-left font-serif text-base font-medium text-gray-800">
          {notebook.name}
        </p>

        <span className="text-xs text-gray-400">
          {notebook.notes.length === 0
            ? "Sin notas"
            : `${notebook.notes.length} nota${notebook.notes.length > 1 ? "s" : ""}`}
        </span>
      </div>

      {/* overlay "Abrir" al hacer hover */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/60 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
        <span className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-medium text-white">
          Abrir
        </span>
      </div>
    </motion.button>
  );
}