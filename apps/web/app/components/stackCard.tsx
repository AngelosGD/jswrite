"use client";

import type { MouseEvent } from "react";
import type { Notebook } from "@/lib/notebooks";

export default function StackCard({
  notebook,
  onOpen,
  onAddNote,
  onTogglePin,
  onToggleStar,
  onContextMenu,
}: {
  notebook: Notebook;
  onOpen: () => void;
  onAddNote: () => void;
  onTogglePin: () => void;
  onToggleStar: () => void;
  onContextMenu?: (event: MouseEvent) => void;
}) {
  const preview = [...notebook.notes]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 2);

  return (
    <div
      onContextMenu={onContextMenu}
      className="group flex flex-col rounded-3xl border border-border bg-surface p-5 shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_14px_36px_rgba(28,25,23,0.08)]"
    >
      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={onOpen}
          className="flex min-w-0 items-center gap-3 text-left"
        >
          <span
            className="grid size-10 shrink-0 place-items-center rounded-2xl"
            style={{ backgroundColor: `${notebook.color}1a` }}
          >
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: notebook.color }}
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-text">
              {notebook.name}
            </span>
            <span className="text-xs text-text-3">
              {notebook.notes.length === 0
                ? "Sin notas"
                : `${notebook.notes.length} nota${notebook.notes.length > 1 ? "s" : ""}`}
            </span>
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={onToggleStar}
            aria-label={
              notebook.starred ? "Quitar de favoritos" : "Marcar favorito"
            }
            title={notebook.starred ? "Quitar favorito" : "Favorito"}
            className={`rounded-lg p-1.5 transition hover:bg-surface-2 ${
              notebook.starred
                ? "text-gold-ink"
                : "text-text-3 hover:text-text-2"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill={notebook.starred ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
            >
              <path d="m12 3 2.7 5.6 6.2.9-4.5 4.4 1.1 6.1-5.5-2.9-5.5 2.9 1.1-6.1L3.1 9.5l6.2-.9L12 3Z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onTogglePin}
            aria-label={notebook.pinned ? "Desfijar stack" : "Fijar stack"}
            title={notebook.pinned ? "Desfijar" : "Fijar"}
            className={`rounded-lg p-1.5 transition hover:bg-surface-2 ${
              notebook.pinned
                ? "text-blue-ink"
                : "text-text-3 hover:text-text-2"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
            >
              <path d="M9 3h6l-.75 5.25L18 12v2H6v-2l3.75-3.75L9 3Z" />
              <path d="M12 14v7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onAddNote}
            aria-label="Añadir nota al stack"
            title="Añadir nota"
            className="grid size-7 place-items-center rounded-full border border-border text-text-3 transition hover:border-blue-border hover:bg-blue-bg hover:text-blue-ink"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-3.5"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>

      {notebook.tags && notebook.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {notebook.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.label}
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ backgroundColor: `${tag.color}1a`, color: tag.color }}
            >
              #{tag.label}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex min-h-[74px] flex-col gap-1.5 rounded-2xl bg-surface-2/70 p-3">
        {preview.length === 0 ? (
          <p className="text-xs text-text-3">Aún no hay notas aquí.</p>
        ) : (
          preview.map((note) => (
            <button
              key={note.id}
              type="button"
              onClick={onOpen}
              className="flex items-center gap-2 rounded-lg px-1 py-0.5 text-left text-xs text-text-2 transition hover:text-text"
            >
              <span className="size-1 shrink-0 rounded-full bg-border-strong" />
              <span className="truncate">{note.title || "Sin título"}</span>
            </button>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="mt-4 flex items-center justify-between text-xs font-medium text-text-3 transition group-hover:text-text-2"
      >
        Abrir stack
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
