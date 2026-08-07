"use client";
import { motion, AnimatePresence } from "motion/react";

import { useState, type FormEvent } from "react";
import { COLORS, Notebook } from "@/lib/notebooks";

// ? formulario del modal, se remonta con cada notebook (key = id)
function EditForm({
  notebook,
  onSave,
  onClose,
}: {
  notebook: Notebook;
  onSave: (id: string, name: string, color: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(notebook.name);
  const [color, setColor] = useState(notebook.color);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    onSave(notebook.id, name, color);
    onClose();
  };

  return (
    <motion.div
      className="w-96 rounded border border-gray-200 bg-white p-6 shadow-lg"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="font-serif text-xl text-gray-800">Editar notebook</h2>

      <label className="mt-4 block text-sm text-gray-600">Nombre</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        type="text"
        placeholder="Sin título"
        className="mt-1 w-full rounded border border-gray-400 p-2 transition duration-100 ease focus:outline-none focus:ring-1 focus:ring-gray-400"
      />

      <p className="mt-4 text-sm text-gray-600">Color</p>
      <div className="mt-2 flex gap-2">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            style={{ backgroundColor: c }}
            className={`size-8 rounded-full transition ${
              color === c
                ? "ring-2 ring-black ring-offset-2"
                : "border border-black/10"
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleSave} className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="border border-gray-400 p-2 transition duration-280 ease hover:bg-black hover:text-white active:scale-95"
        >
          Cancelar
        </button>
        <button className="border border-black bg-black p-2 text-white transition duration-280 ease hover:bg-white hover:text-black active:scale-95">
          Guardar
        </button>
      </form>
    </motion.div>
  );
}

export default function EditNotebookModal({
  isOpen,
  notebook,
  onSave,
  onClose,
}: {
  isOpen: boolean;
  notebook: Notebook | null;
  onSave: (id: string, name: string, color: string) => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && notebook && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          {/* key remonta el form al cambiar de notebook -> precarga sin efectos */}
          <EditForm
            key={notebook.id}
            notebook={notebook}
            onSave={onSave}
            onClose={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
