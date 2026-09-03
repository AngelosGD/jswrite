"use client";

import { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { Notebook, Note } from "@/lib/notebooks";
import {
  copyToClipboard,
  exportDocx,
  exportMd,
  exportPdf,
  exportTxt,
} from "@/lib/export-note";
import FormatToolbar from "./formatToolbar";
import { TextStyle } from "@tiptap/extension-text-style";
import { useMemo } from "react";

type EditorNodeProps = {
  notebook?: Notebook;
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
  const [showExportMenu, setShowExportMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const extensions = useMemo(() => [
    StarterKit, 
    Underline,
    TextAlign.configure({types:["heading","paragraph"]}),
    Color,
    TextStyle,
    Highlight.configure({ multicolor: true })
  ], []);

  const editor = useEditor({
    extensions,
    content: note.content,
    onUpdate: ({editor}) =>{
      onChangeContent(editor.getHTML())
    }
  })
  // use effect para cerrar el menu con el esc o dandole clic fueram
  useEffect(() => {
    if (!showExportMenu) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setShowExportMenu(false);
    };

    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowExportMenu(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [showExportMenu]);

  const commitTitle = () => {
    onChangeTitle(draftTitle);
    setEditingTitle(false);
  };

  const handleExport = (fn: () => void) => {
    fn();
    setShowExportMenu(false);
  };

  return (
    <div className="mx-auto flex h-full w-[85%] flex-col px-6 py-8">
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

          {notebook && (
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
              style={{ backgroundColor: notebook.color }}
            >
              {notebook.name}
            </span>
          )}
        </div>

        <div className="flex items-center justify-end pl-[70%]">
          {/* boton de descargar nota */}
          <div className="relative" ref={menuRef}>
            <button
              className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
              onClick={() => setShowExportMenu((v) => !v)}
              type="button"
              aria-label="Descargar Nota"
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
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>

            {/* mostrar el menu al darle clic a descargar D: */}
            {showExportMenu && (
              <div className="absolute right-0 z-50 mt-1 w-52 flex flex-col rounded-md border border-gray-300 bg-white py-1 shadow-lg ">
                {/* boton para copiar aal clipboard */}
                <button
                  type="button"
                  onClick={() => handleExport(() => copyToClipboard(note))}
                  className="px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200 items-center flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clipboard-plus-icon lucide-clipboard-plus mr-1 opacity-90"
                  >
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <path d="M9 14h6" />
                    <path d="M12 17v-6" />
                  </svg>
                  Copiar al portapapeles
                </button>
                {/* boton con opciones de exportacion */}
                <div>
                  {/* boton exportar a .txt */}
                  <button
                    onClick={() => handleExport(() => exportTxt(note))}
                    type="button"
                    className="px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200 w-full flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-file-text-icon lucide-file-text opacity-90 mr-1 flex items-center"
                    >
                      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                      <path d="M10 9H8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                    </svg>
                    Exportar como .txt
                  </button>

                  {/* botton para exportar a markdown (md) */}
                  <button
                    type="button"
                    className="px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200 w-full flex items-center"
                    onClick={() => handleExport(() => exportMd(note))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-file-minus-corner-icon lucide-file-minus-corner opacity-90 mr-1"
                    >
                      <path d="M20 14V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12" />
                      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                      <path d="M14 18h6" />
                    </svg>
                    Exportar como
                  </button>

                  {/* boton para pdf >:v*/}
                  <button
                    className="px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200 w-full flex items-center"
                    type="button"
                    onClick={() => handleExport(() => exportPdf(note))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-file-box-icon lucide-file-box opacity-90 mr-1"
                    >
                      <path d="M14 2v5a1 1 0 001 1h5" />
                      <path d="M14.692 22H18a2 2 0 002-2V8a2.4 2.4 0 00-.706-1.706l-3.588-3.588A2.4 2.4 0 0014 2H6a2 2 0 00-2 2v3.804" />
                      <path d="M2.264 13.752 7 16.5l4.737-2.748" />
                      <path d="M2.995 13.014A2 2 0 002 14.744v3.516a2 2 0 00.996 1.73l3 1.74a2 2 0 002.008 0l3-1.74A2 2 0 0012 18.26v-3.517a2 2 0 00-.995-1.73l-3-1.742a2 2 0 00-1.892-.064z" />
                      <path d="M7 16.5V22" />
                    </svg>
                    Exportar como .pdf
                  </button>

                  {/* exportar como docx (word) */}

                  <button
                    className="px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200 w-full flex items-center"
                    type="button"
                    onClick={() => handleExport(() => exportDocx(note))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-file-badge-icon lucide-file-badge mr-1 opacity-90"
                    >
                      <path d="M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3" />
                      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                      <path d="m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88" />
                      <circle cx="6" cy="14" r="3" />
                    </svg>
                    Exportar como .docx
                  </button>
                </div>
              </div>
            )}
          </div>
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

      {/* barra de formato + contenido */}
      <div className="mt-6 flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-200">
        <FormatToolbar editor={editor} />
        <div className="flex-1 overflow-y-auto">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
