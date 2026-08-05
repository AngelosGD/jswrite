"use client";
import {
  useNotebooks,
  createNoteTitle,
  addNote,
  updaetNote,
  deleteNotebook,
  saveNotebooks,
} from "@/lib/notebooks";
import NotebookCard from "@/app/components/notebookCard";
import NewNotebookModal from "@/app/components/newNotebookModal";
import Link from "next/link";
import { useState, type MouseEvent } from "react";

import ContextMenu from "../components/contextMenu";
import NoteEditor from "../components/noteEditor";

export default function NotebooksPage() {
  const notebooks = useNotebooks();
  const [showNotebookModal, setShowNotebookModal] = useState(false);

  const [query, setQuery] = useState("");

  const [expandedNotebooks, setExpandedNotebooks] = useState<Set<string>>(
    () => new Set(),
  );

  // estados para la nota
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    notebookId: string;
  } | null>(null);

  const [selectedNote, setSelectedNote] = useState<{
    notebookId: string;
    noteId: string;
  } | null>(null);

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  function toggleNotebook(id: string) {
    setExpandedNotebooks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const filterNotebooks = notebooks.filter((n) => {
    return n.name.toLowerCase().includes(query.trim().toLowerCase());
  });

  const handleAddNote = (notebookId: string) => {
    const result = addNote(notebooks, notebookId, createNoteTitle(), "");
    saveNotebooks(result.notebooks);
    setSelectedNote({ notebookId, noteId: result.note.id });
  };
  function handleDeleteNotebook(notebookId: string) {
    saveNotebooks(deleteNotebook(notebooks, notebookId));
    setSelectedNote((prev) =>
      prev && prev.notebookId === notebookId ? null : prev,
    );
  }

  function handleChangeTitle(noteId: string, title: string) {
    if (!selectedNote) return;
    saveNotebooks(
      updaetNote(notebooks, selectedNote.notebookId, noteId, { title }),
    );
  }

  function handleChangeContent(noteId: string, content: string) {
    if (!selectedNote) return;
    saveNotebooks(
      updaetNote(notebooks, selectedNote.notebookId, noteId, { content }),
    );
  }

  return (
    <div className="flex h-screen">
      <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 p-4">
        <div className="flex items-center justify-between px-2">
          <Link
            href="/"
            className="group flex items-center gap-1.5"
            aria-label="Volver al inicio"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-4 text-gray-400 transition duration-100 ease group-hover:text-gray-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <p className="font-serif text-sm font-semibold text-gray-700">
              Notebooks
            </p>
          </Link>
          <button
            onClick={() => setShowNotebookModal(true)}
            className="flex size-6 items-center justify-center rounded border border-gray-300 text-gray-500 transition duration-100 ease hover:bg-gray-100 hover:text-gray-900 active:scale-95"
            aria-label="Nuevo notebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>

        <div className="relative mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Buscar..."
            className="w-full rounded-md border border-gray-200 bg-white py-2 pr-3 pl-8 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
          {filterNotebooks.length === 0 && (
            <p className="px-2 text-sm text-gray-400">
              {notebooks.length === 0 ? "Sin notebooks aún" : "Sin resultados"}
            </p>
          )}

          {filterNotebooks.map((n) => {
            const isOpen = expandedNotebooks.has(n.id);
            return (
              <div
                key={n.id}
                className="rounded-md"
                onContextMenu={(e) => {
                  e.preventDefault();
                  setContextMenu({
                    x: e.clientX,
                    y: e.clientY,
                    notebookId: n.id,
                  });
                }}
              >
                <button
                  onClick={() => toggleNotebook(n.id)}
                  className="group flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition duration-100 ease hover:bg-gray-100"
                >
                  <span
                    className="size-2.5 shrink rounded-full"
                    style={{ backgroundColor: n.color }}
                  />
                  <span className="min-w-0 truncate text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {n.name}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className={`ml-auto size-3.5 shrink-0 text-gray-400 transition-transform duration-200 group-hover:text-gray-600 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="animate-notes-expand ml-3.5 border-l border-gray-200 pl-2">
                    {n.notes.length === 0 ? (
                      <p className="px-2 py-1 text-sm text-gray-400">
                        Sin notas
                      </p>
                    ) : (
                      n.notes.map((note) => (
                        <button
                          key={note.id}
                          onClick={() =>
                            setSelectedNote({
                              notebookId: n.id,
                              noteId: note.id,
                            })
                          }
                          className="flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm text-gray-600 transition duration-100 ease hover:bg-gray-100 hover:text-gray-900"
                        >
                          {note.title}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        {selectedNote ? (
          (() => {
            const nb = notebooks.find((n) => n.id === selectedNote.notebookId);
            const note = nb?.notes.find((nt) => nt.id === selectedNote.noteId);
            if (!nb || !note) return null;
            return (
              <NoteEditor
                notebook={nb}
                note={note}
                onChangeTitle={(t) => handleChangeTitle(note.id, t)}
                onChangeContent={(c) => handleChangeContent(note.id, c)}
                onClose={() => setSelectedNote(null)}
              />
            );
          })()
        ) : (
          <>
            <h1 className="font-serif text-2xl text-gray-800">
              Mis notebooks
            </h1>

            {notebooks.length === 0 ? (
              <p className="mt-4 text-gray-400">Sin notebooks aún</p>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
                {notebooks.map((n) => (
                  <NotebookCard key={n.id} notebook={n} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <NewNotebookModal
        isOpen={showNotebookModal}
        onClose={() => setShowNotebookModal(false)}
      />

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onAddNote={() => handleAddNote(contextMenu.notebookId)}
          onDeleteNotebook={() => handleDeleteNotebook(contextMenu.notebookId)}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
    
  );
}
