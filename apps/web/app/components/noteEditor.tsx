"use client";

import { useState } from "react";
import { Notebook, Note } from "@/lib/notebooks";

type EditorNodeProps = {
  notebook: Notebook;
  note: Note;
  onChangeTitle: (title: string) => void;
  onChangeContent: (content: string) => void;
  onClose: () => void;
  onDelete: () => void;
};

const formatDate = (iso: string, withSeconds: boolean) =>
  new Date(iso).toLocaleString("es", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" as const } : {}),
  });

export default function NoteEditor({
  notebook,
  note,
  onChangeTitle,
  onChangeContent,
  onClose,
  onDelete,
}: EditorNodeProps) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [draftTitle, setDraftTitle] = useState(note.title);

  const commitTitle = () => {
    onChangeTitle(draftTitle);
    setEditingTitle(false);
  };

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col px-6 py-8">
      {/* cabecera */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Volver"
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
            style={{ backgroundColor: notebook.color }}
          >
            {notebook.name}
          </span>
        </div>

        <button
          type="button"
          onClick={onDelete}
          aria-label="Eliminar nota"
          className="rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>

      {/* título: doble clic para editar */}
      <div className="pt-8">
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
            className="w-full border-b border-gray-200 pb-2 font-serif text-3xl font-medium text-gray-900 outline-none focus:border-gray-400"
          />
        ) : (
          <h2
            onDoubleClick={() => {
              setDraftTitle(note.title);
              setEditingTitle(true);
            }}
            className="cursor-text select-none pb-2 font-serif text-3xl leading-snug text-gray-900 transition hover:border-b hover:border-gray-200"
            title="Doble clic para editar"
          >
            {note.title}
          </h2>
        )}

        <p className="pt-2 text-xs text-gray-400">
          Actualizado {formatDate(note.updatedAt, true)}
        </p>
      </div>

      {/* contenido */}
      <div className="mt-6 flex flex-1 overflow-hidden">
        <textarea
          value={note.content}
          onChange={(e) => onChangeContent(e.target.value)}
          placeholder="Empieza a escribir..."
          className="flex-1 resize-none border-none text-base leading-7 text-gray-700 placeholder:text-gray-300 focus:outline-none"
        />
      </div>
    </div>
  );
}