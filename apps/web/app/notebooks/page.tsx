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
  Note,
  useQuickNotes,
  saveQuickNotes,
  addQuickNote,
  deleteQuickNote,
} from "@/lib/notebooks";
import NotebookCard from "@/app/components/notebookCard";
import NewNotebookModal from "@/app/components/newNotebookModal";
import Link from "next/link";
import { useState, useEffect, type MouseEvent } from "react";

import ContextMenu from "../components/contextMenu";
import NoteEditor from "../components/noteEditor";
import EditNotebookModal from "../components/editNotebookModal";

export default function NotebooksPage() {
  const notebooks = useNotebooks();
  const [showNotebookModal, setShowNotebookModal] = useState(false);

  // estado para hacer cliqueable la card del notebook y abrir sus notas
  const [openNotebookId, setOpenNotebookId] = useState<string | null>(null);

  // abrir notebook/nota desde query param (?open=<id>&note=<id>)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nbId = params.get("open");
    const noteId = params.get("note");
    if (nbId) {
      setOpenNotebookId(nbId);
      if (noteId) {
        setSelectedNote({ notebookId: nbId, noteId });
      }
    }
  }, []);

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

  const [editingNotebookId, setEditingNotebookId] = useState<string | null>(
    null,
  );

  const [selectedNote, setSelectedNote] = useState<{
    notebookId: string;
    noteId: string;
  } | null>(null);

  // estado para arrastrar una nota entre notebooks
  const [dragItem, setDragItem] = useState<{
    fromNotebookId: string;
    noteId: string;
  } | null>(null);

  const quickNotes = useQuickNotes();
  const [showQuickNotes, setShowQuickNotes] = useState(false);
  const [quickContextMenu, setQuickContextMenu] = useState<{
    x: number;
    y: number;
    noteId: string;
  } | null>(null);

  // ! Funciones para las quicknotes
  function handleAddQuickNote() {
    const result = addQuickNote(quickNotes);
    saveQuickNotes(result.quickNotes);
  }

  function handleDeleteQuickNote(noteId: string) {
    saveQuickNotes(deleteQuickNote(quickNotes, noteId));
  }
  const [selectedQuickNote, setSelectedQuickNote] = useState<Note | null>(null);

  function handleClickQuickNote(note: Note) {
    setSelectedQuickNote(note);
  }

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

  function handleEditNotebook(id: string, name: string, color: string) {
    saveNotebooks(updateNotebook(notebooks, id, { name, color }));
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
                          className="group flex items-center gap-1 rounded-lg pr-1 transition duration-100 ease hover:bg-gray-50"
                        >
                          <button
                            onClick={() =>
                              setSelectedNote({
                                notebookId: openNb.id,
                                noteId: note.id,
                              })
                            }
                            className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-gray-500 transition duration-100 ease group-hover:text-gray-800"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-3.5 shrink-0 text-gray-300"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h6m-6 4h6M10 3.75H6.375A2.625 2.625 0 0 0 3.75 6.375v11.25A2.625 2.625 0 0 0 6.375 20.25h11.25A2.625 2.625 0 0 0 20.25 17.625V6.375A2.625 2.625 0 0 0 17.625 3.75H14M9 3.75a1.5 1.5 0 0 1 3 0h.25A1.5 1.5 0 0 0 15 3.15v.832A1.5 1.5 0 0 0 15 5.25V6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-.75a1.5 1.5 0 0 0 0-.9V3.75Z"
                              />
                            </svg>
                            <span className="min-w-0 flex-1 truncate">
                              {note.title}
                            </span>
                          </button>
                          <button
                            onClick={() =>
                              handleToggleNotePin(openNb.id, note.id)
                            }
                            aria-label={
                              note.pinned ? "Desfijar nota" : "Fijar nota"
                            }
                            title={note.pinned ? "Desfijar" : "Fijar"}
                            className={`shrink-0 rounded-md p-1 transition ${
                              note.pinned
                                ? "text-gray-900"
                                : "text-gray-300 hover:text-gray-700"
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
                    className="mt-2 flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-400 transition duration-100 ease hover:bg-gray-50 hover:text-gray-700"
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
                    Añadir nota
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
                className="flex size-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition duration-100 ease hover:bg-black hover:text-white active:scale-95"
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
                className="w-full rounded-lg border border-transparent bg-gray-50 py-2 pr-3 pl-8 text-sm text-gray-700 placeholder:text-gray-400 transition focus:border-gray-300 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-200"
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
                    <div className="group flex items-center gap-1 rounded-lg border border-gray-100 bg-white p-1 pr-1 shadow-sm transition duration-100 ease hover:border-gray-200 hover:shadow">
                      <button
                        onClick={() => toggleNotebook(n.id)}
                        className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2 py-1.5 text-left"
                      >
                        <span
                          className="flex size-5 shrink-0 items-center justify-center rounded-md"
                          style={{ backgroundColor: n.color + "1a" }}
                        >
                          <span
                            className="size-2 rounded-full"
                            style={{ backgroundColor: n.color }}
                          />
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {n.name}
                        </span>
                        <span className="shrink-0 text-xs text-gray-300">
                          {n.notes.length}
                        </span>
                      </button>

                      <button
                        onClick={() => handleTogglePin(n.id)}
                        aria-label={
                          n.pinned ? "Desfijar notebook" : "Fijar notebook"
                        }
                        title={n.pinned ? "Desfijar" : "Fijar"}
                        className={`shrink-0 rounded-md p-1 transition ${
                          n.pinned
                            ? "text-gray-900"
                            : "text-gray-300 hover:text-gray-700"
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
                        className={`shrink-0 rounded-md p-1 text-gray-300 transition-transform duration-200 hover:text-gray-500 ${
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
                      <div className="animate-notes-expand mt-1 ml-3 flex flex-col gap-0.5 border-l border-gray-100 pl-3">
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
                                className="group flex items-center gap-1 rounded-md transition duration-100 ease hover:bg-gray-50"
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
                                  className="flex min-w-0 flex-1 cursor-grab items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-gray-500 transition duration-100 ease group-hover:text-gray-800 active:cursor-grabbing"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-3.5 shrink-0 text-gray-300"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 12h6m-6 4h6M10 3.75H6.375A2.625 2.625 0 0 0 3.75 6.375v11.25A2.625 2.625 0 0 0 6.375 20.25h11.25A2.625 2.625 0 0 0 20.25 17.625V6.375A2.625 2.625 0 0 0 17.625 3.75H14M9 3.75a1.5 1.5 0 0 1 3 0h.25A1.5 1.5 0 0 0 15 3.15v.832A1.5 1.5 0 0 0 15 5.25V6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-.75a1.5 1.5 0 0 0 0-.9V3.75Z"
                                    />
                                  </svg>
                                  <span className="min-w-0 flex-1 truncate">
                                    {note.title}
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleToggleNotePin(n.id, note.id)
                                  }
                                  aria-label={
                                    note.pinned ? "Desfijar nota" : "Fijar nota"
                                  }
                                  title={note.pinned ? "Desfijar" : "Fijar"}
                                  className={`shrink-0 rounded-md p-1 transition ${
                                    note.pinned
                                      ? "text-gray-900"
                                      : "text-gray-300 hover:text-gray-700"
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
              <div className="mt-4 border-t border-gray-100 pt-3">
                <button
                  type="button"
                  onClick={() => setShowQuickNotes((v) => !v)}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className={`size-3.5 transition-transform duration-200 ${showQuickNotes ? "rotate-180" : ""}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                  Notas rápidas
                  <span className="ml-auto text-xs text-gray-300">
                    {quickNotes.length}
                  </span>
                </button>

                {showQuickNotes && (
                  <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l border-gray-100 pl-3">
                    {quickNotes.length === 0 ? (
                      <p className="px-2 py-1 text-sm text-gray-400">
                        Sin notas rápidas
                      </p>
                    ) : (
                      quickNotes.map((note) => (
                        <div
                          key={note.id}
                          className="group flex items-center gap-1 rounded-md transition duration-100 ease hover:bg-gray-50"
                        >
                          <button
                            onClick={() => handleClickQuickNote(note)}
                            className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-gray-500 transition duration-100 ease group-hover:text-gray-800"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-3.5 shrink-0 text-yellow-400"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                              />
                            </svg>
                            <span className="min-w-0 flex-1 truncate">
                              {note.title}
                            </span>
                          </button>
                        </div>
                      ))
                    )}

                    <button
                      type="button"
                      onClick={handleAddQuickNote}
                      className="mt-1 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-gray-400 transition duration-100 ease hover:bg-gray-50 hover:text-gray-700"
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
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      Nueva nota rápida
                    </button>
                  </div>
                )}
              </div>
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

      <EditNotebookModal
        isOpen={editingNotebookId !== null}
        notebook={notebooks.find((n) => n.id === editingNotebookId) ?? null}
        onSave={handleEditNotebook}
        onClose={() => setEditingNotebookId(null)}
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
          onEditNotebook={() => setEditingNotebookId(contextMenu.notebookId)}
          onAddNote={() => handleAddNote(contextMenu.notebookId)}
          onDeleteNotebook={() => handleDeleteNotebook(contextMenu.notebookId)}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}
