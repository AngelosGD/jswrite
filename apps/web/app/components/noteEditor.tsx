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


export default function NoteEditor({
  notebook,
  note,
  onChangeTitle,
  onChangeContent,
  onClose,
  onDelete
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
        <span
          className="rounded-sm px-2 py-0.5 font-serif text-xs font-semibold text-white"
          style={{ backgroundColor: notebook.color }}
        >
          {notebook.name}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Fijar nota"
            className="rounded border border-gray-300 p-2 text-gray-600 hover:bg-gray-100"
          >
            {/* fijar */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={onDelete}
            aria-label="Eliminar nota"
            className="rounded border border-gray-300 p-2 text-red-600 hover:bg-red-50"
          >
            {/* eliminar */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
          >
            ← Volver
          </button>
        </div>
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
          <div className="flex">
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
          </div>
        )}
        <p className="pt-1 text-xs text-gray-400">
          {new Date(note.createdAt).toLocaleString("es", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <p className="pt-1 text-sm text-gray-400 font-light">
          ultima actualizacion:{" "}
          {new Date(note.updatedAt).toLocaleString("es", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
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
