"use client";
import {
  useNotebooks,
  createNoteTitle,
  addNote,
  updaetNote,
  deleteNotebook,
  saveNotebooks,
  deleteNote,
  updateNotebook,
  Notebook,
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

  // estado para hacer cliqueable la card del notebook y abrir sus notas
  const [openNotebookId, setOpenNotebookId] = useState<string | null>(null);

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

  // estado para arrastrar una nota entre notebooks
  const [dragItem, setDragItem] = useState<{
    fromNotebookId: string;
    noteId: string;
  } | null>(null);

  const [dragOverNotebookId, setDragOverNotebookId] = useState<string | null>(
    null,
  );

  function handleMoveNote(targetNotebookId: string) {
    if (!dragItem || dragItem.fromNotebookId === targetNotebookId) return;
    const source = notebooks.find((n) => n.id === dragItem.fromNotebookId);
    const note = source?.notes.find((nt) => nt.id === dragItem.noteId);
    if (!source || !note) return;

    const updated = notebooks.map((n) => {
      if (n.id === dragItem.fromNotebookId) {
        return {
          ...n,
          notes: n.notes.filter((nt) => nt.id !== dragItem.noteId),
        };
      }
      if (n.id === targetNotebookId) {
        return { ...n, notes: [...n.notes, note] };
      }
      return n;
    });
    saveNotebooks(updated);
    setExpandedNotebooks((prev) => new Set(prev).add(targetNotebookId));
    setDragItem(null);
    setDragOverNotebookId(null);
  }

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

  const filterNotebooks = notebooks
    .filter((n) => n.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

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

  function handleTogglePin(notebookId: string) {
    const nb = notebooks.find((n) => n.id === notebookId);
    if (!nb) return;
    saveNotebooks(
      updateNotebook(notebooks, notebookId, { pinned: !nb.pinned }),
    );
  }

  // todo: funcion para eliminar la nota
  const handleDeleteNote = (notebookId: string, noteId: string) => {
    saveNotebooks(deleteNote(notebooks, notebookId, noteId));
    if (selectedNote?.noteId === noteId) setSelectedNote(null);
  };

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

  function handleToggleNotePin(notebookId: string, noteId: string) {
    const nb = notebooks.find((n) => n.id === notebookId);
    const note = nb?.notes.find((nt) => nt.id === noteId);
    if (!note) return;
    saveNotebooks(
      updaetNote(notebooks, notebookId, noteId, {
        pinned: !note.pinned,
      }),
    );
  }

  return (
    <div className="flex h-screen">
      <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 p-4">
        {openNotebookId ? (
          (() => {
            const openNb = notebooks.find((n) => n.id === openNotebookId);
            if (!openNb) return null;
            return (
              <>
                <div className="flex items-center justify-between px-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenNotebookId(null);
                      setSelectedNote(null);
                    }}
                    className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition hover:scale-95"
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
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                    Volver
                  </button>
                  <span
                    className="rounded-sm px-2 py-0.5 font-serif text-xs font-semibold text-white"
                    style={{ backgroundColor: openNb.color }}
                  >
                    {openNb.name}
                  </span>
                </div>

                <nav className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
                  {openNb.notes.length === 0 ? (
                    <p className="px-2 py-1 text-sm text-gray-400">Sin notas</p>
                  ) : (
                    [...openNb.notes]
                      .sort((a, b) => Number(b.pinned) - Number(a.pinned))
                      .map((note) => (
                        <div
                          key={note.id}
                          className="group flex items-center gap-1 rounded-md pr-1 transition duration-100 ease hover:bg-gray-100"
                        >
<button
                            onClick={() =>
setSelectedNote({
                              notebookId: openNb.id,
                              noteId: note.id,
                            })
                          }
                            className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-gray-600 transition duration-100 ease group-hover:text-gray-900"
                          >
                            <span className="min-w-0 flex-1 truncate">
                              {note.title}
                            </span>
                                </button>
                                <button
onClick={() => handleToggleNotePin(openNb.id, note.id)}
                                  aria-label={
                                    note.pinned ? "Desfijar nota" : "Fijar nota"
                                  }
                            title={note.pinned ? "Desfijar" : "Fijar"}
                            className={`shrink-0 rounded-md p-1 transition ${
                              note.pinned
                                ? "text-gray-900"
                                : "text-gray-400 hover:text-gray-900"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-3.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                        </div>
                      ))
                  )}

                  <button
                    type="button"
                    onClick={() => handleAddNote(openNb.id)}
                    className="mt-2 flex items-center justify-center rounded-md px-2 py-1.5 text-sm text-gray-500 transition duration-100 ease hover:bg-gray-100 hover:text-gray-900"
                  >
                    + Añadir nota
                  </button>
                </nav>
              </>
            );
          })()
        ) : (
          <>
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
                  {notebooks.length === 0
                    ? "Sin notebooks aún"
                    : "Sin resultados"}
                </p>
              )}

              {filterNotebooks.map((n) => {
                const isOpen = expandedNotebooks.has(n.id);
                return (
                  <div
                    key={n.id}
                    className={`rounded-md transition-colors duration-100 ${
                      dragOverNotebookId === n.id
                        ? "bg-black/5 ring-2 ring-black/10"
                        : ""
                    }`}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setContextMenu({
                        x: e.clientX,
                        y: e.clientY,
                        notebookId: n.id,
                      });
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverNotebookId(n.id);
                    }}
                    onDragLeave={() =>
                      setDragOverNotebookId((prev) =>
                        prev === n.id ? null : prev,
                      )
                    }
                    onDrop={(e) => {
                      e.preventDefault();
                      handleMoveNote(n.id);
                    }}
                  >
                    <div className="group flex items-center gap-1 rounded-md pr-1 transition duration-100 ease hover:bg-gray-100">
                      <button
                        onClick={() => toggleNotebook(n.id)}
                        className="flex min-w-0 flex-1 items-center gap-2.5 rounded-md py-2 pl-2 text-left"
                      >
                        <span
                          className="size-2.5 shrink rounded-full"
                          style={{ backgroundColor: n.color }}
                        />
                        <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {n.name}
                        </span>
                      </button>

                      <button
                        onClick={() => handleTogglePin(n.id)}
                        aria-label={n.pinned ? "Desfijar notebook" : "Fijar notebook"}
                        title={n.pinned ? "Desfijar" : "Fijar"}
                        className={`shrink-0 rounded-md p-1 transition ${
                          n.pinned
                            ? "text-gray-900"
                            : "text-gray-400 hover:text-gray-900"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => toggleNotebook(n.id)}
                        aria-label="Expandir"
                        className={`shrink-0 rounded-md p-1 text-gray-400 transition-transform duration-200 hover:text-gray-600 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="size-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>
                    </div>

                    {isOpen && (
                      <div className="animate-notes-expand ml-3.5 border-l border-gray-200 pl-2">
                        {n.notes.length === 0 ? (
                          <p className="px-2 py-1 text-sm text-gray-400">
                            Sin notas
                          </p>
                        ) : (
                          [...n.notes]
                            .sort((a, b) => Number(b.pinned) - Number(a.pinned))
                            .map((note) => (
                              <div
                                key={note.id}
                                className="group flex items-center gap-1 rounded-md pr-1 transition duration-100 ease hover:bg-gray-100"
                              >
                                <button
                                  draggable
                                  onDragStart={() =>
                                    setDragItem({
                                      fromNotebookId: n.id,
                                      noteId: note.id,
                                    })
                                  }
                                  onDragEnd={() => {
                                    setDragItem(null);
                                    setDragOverNotebookId(null);
                                  }}
                                  onClick={() =>
                                    setSelectedNote({
                                      notebookId: n.id,
                                      noteId: note.id,
                                    })
                                  }
                                  className="flex min-w-0 flex-1 cursor-grab items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-gray-600 transition duration-100 ease group-hover:text-gray-900 active:cursor-grabbing"
                                >
                                  <span className="min-w-0 flex-1 truncate">
                                    {note.title}
                                  </span>
                                </button>
                                <button
onClick={() => handleToggleNotePin(n.id, note.id)}
                                  aria-label={
                                    note.pinned ? "Desfijar nota" : "Fijar nota"
                                  }
                                  title={note.pinned ? "Desfijar" : "Fijar"}
                                  className={`shrink-0 rounded-md p-1 transition ${
                                    note.pinned
                                      ? "text-gray-900"
                                      : "text-gray-400 hover:text-gray-900"
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-3.5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                    />
                                  </svg>
                                </button>
                              </div>
                            ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </>
        )}
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        {selectedNote ? (
          (() => {
            const nb = notebooks.find((n) => n.id === selectedNote.notebookId);
            const note = nb?.notes.find((nt) => nt.id === selectedNote.noteId);
            if (!nb || !note) return null;
            return (
              <NoteEditor
                onDelete={() => handleDeleteNote(nb.id, note.id)}
                notebook={nb}
                note={note}
                onChangeTitle={(t) => handleChangeTitle(note.id, t)}
                onChangeContent={(c) => handleChangeContent(note.id, c)}
                onClose={() => setSelectedNote(null)}
              />
            );
          })()
        ) : openNotebookId ? (
          <p className="font-serif text-2xl text-gray-800">
            Selecciona una nota del panel izquierdo.
          </p>
        ) : (
          <>
            <h1 className="font-serif text-2xl text-gray-800">Mis notebooks</h1>

            {notebooks.length === 0 ? (
              <p className="mt-4 text-gray-400">Sin notebooks aún</p>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
                {notebooks.map((n) => (
                  <NotebookCard
                    key={n.id}
                    notebook={n}
                    onOpen={() => setOpenNotebookId(n.id)}
                  />
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
          pinned={
            notebooks.find((n) => n.id === contextMenu.notebookId)?.pinned ??
            false
          }
          onTogglePin={() => handleTogglePin(contextMenu.notebookId)}
          onAddNote={() => handleAddNote(contextMenu.notebookId)}
          onDeleteNotebook={() => handleDeleteNotebook(contextMenu.notebookId)}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}
