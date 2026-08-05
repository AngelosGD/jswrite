"use client";

import { useState } from "react";
import { Notebook, Note } from "@/lib/notebooks";

type EditorNodeProps = {
  notebook: Notebook;
  note: Note;
  onChangeTitle: (title: string) => void;
  onChangeContent: (content: string) => void;
  onClose: () => void;
};

export default function NoteEditor({
  notebook,
  note,
  onChangeTitle,
  onChangeContent,
  onClose,
}: EditorNodeProps) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [draftTitle, setDraftTitle] = useState(note.title);

  const commitTitle = () => {
    onChangeTitle(draftTitle);
    setEditingTitle(false);
  };

  return (
    <div className="flex h-full flex-col">
      {/* cabecera */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
        >
          ← Volver
        </button>
        <span
          className="rounded-sm px-2 py-0.5 font-serif text-xs font-semibold text-white"
          style={{ backgroundColor: notebook.color }}
        >
          {notebook.name}
        </span>
      </div>

      {/* título: doble clic para editar */}
      <div className="px-6 pt-6">
        {editingTitle ? (
          <input
            autoFocus
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onBlur={commitTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitTitle();
              if (e.key === "Escape") setEditingTitle(false);
            }}
            className="w-full border-b border-gray-400 pb-1 font-serif text-2xl text-gray-800 outline-none focus:border-gray-900"
          />
        ) : (
          <h2
            onDoubleClick={() => {
              setDraftTitle(note.title);
              setEditingTitle(true);
            }}
            className="cursor-text select-none border-b border-transparent pb-1 font-serif text-2xl text-gray-800 hover:border-gray-300"
            title="Doble clic para editar"
          >
            {note.title}
          </h2>
        )}
      </div>

      {/* contenido — líneas de cuaderno */}
      <div className="flex flex-1 gap-6 overflow-hidden px-6 py-4">
        <textarea
          value={note.content}
          onChange={(e) => onChangeContent(e.target.value)}
          placeholder="Empieza a escribir..."
          className="flex-1 resize-none bg-[repeating-linear-gradient(transparent,transparent_31px,#e7e5e4_32px)] leading-8 text-gray-800 outline-none"
        />
      </div>
    </div>
  );
}
