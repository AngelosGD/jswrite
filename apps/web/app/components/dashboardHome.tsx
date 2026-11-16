"use client";

import StackCard from "./stackCard";
import { getNoteTags, type Notebook, type Note } from "@/lib/notebooks";

export default function DashboardHome({
  notebooks,
  onNewNotebook,
  onNewQuickNote,
  onOpenTemplates,
  onOpenSearch,
  onOpenNotebook,
  onOpenNote,
  onAddNote,
  onTogglePin,
  onToggleStar,
}: {
  notebooks: Notebook[];
  onNewNotebook: () => void;
  onNewQuickNote: () => void;
  onOpenTemplates: () => void;
  onOpenSearch: () => void;
  onOpenNotebook: (notebookId: string) => void;
  onOpenNote: (notebookId: string, noteId: string) => void;
  onAddNote: (notebookId: string) => void;
  onTogglePin: (notebookId: string) => void;
  onToggleStar: (notebookId: string) => void;
}) {
  const sorted = [...notebooks].sort(
    (a, b) =>
      Number(b.pinned) - Number(a.pinned) ||
      Number(b.starred) - Number(a.starred) ||
      b.updatedAt.localeCompare(a.updatedAt),
  );

  const pinned = notebooks.flatMap((notebook) =>
    notebook.notes
      .filter((note) => note.pinned)
      .map((note) => ({ notebook, note })),
  );

  const totalNotes = notebooks.reduce((sum, nb) => sum + nb.notes.length, 0);

  const scrollToStacks = () =>
    document
      .getElementById("stacks")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  const scrollToPinned = () =>
    document
      .getElementById("pinned-notes")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="mx-auto w-full max-w-6xl px-8 py-10">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-3">
            Tu espacio
          </p>
          <h1 className="mt-2 font-serif text-4xl leading-none text-text">
            Tus stacks
          </h1>
          <p className="mt-3 max-w-md text-sm text-text-2">
            {notebooks.length === 0
              ? "Crea tu primer stack y empieza a ordenar tus ideas."
              : `${notebooks.length} stack${notebooks.length === 1 ? "" : "s"} · ${totalNotes} nota${totalNotes === 1 ? "" : "s"}`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-2xl border border-border bg-surface p-1 shadow-[0_1px_2px_rgba(28,25,23,0.04)]">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Buscar notas"
              title="Buscar (/)"
              className="grid size-9 place-items-center rounded-xl text-text-3 transition hover:bg-surface-2 hover:text-text"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                className="size-4"
              >
                <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            <span className="mx-0.5 h-5 w-px bg-border" />

            <button
              type="button"
              onClick={onNewQuickNote}
              className="flex h-9 items-center gap-1.5 rounded-xl px-2.5 text-sm font-medium text-text-2 transition hover:bg-surface-2 hover:text-text active:scale-[0.98]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5 text-text-3"
              >
                <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />
              </svg>
              Nota rápida
            </button>

            <button
              type="button"
              onClick={() => {
                if (notebooks.length === 0) {
                  onNewNotebook();
                  return;
                }
                const first = sorted[0];
                onAddNote(first.id);
              }}
              className="flex h-9 items-center gap-1.5 rounded-xl px-2.5 text-sm font-medium text-text-2 transition hover:bg-surface-2 hover:text-text active:scale-[0.98]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5 text-text-3"
              >
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
                <path d="M14 3v5h5M9 13h6M12 10v6" />
              </svg>
              Añadir nota
            </button>
          </div>

          <button
            type="button"
            onClick={onNewNotebook}
            className="flex h-11 items-center gap-2 rounded-2xl bg-text px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(28,25,23,0.18)] transition hover:bg-text-2 active:scale-[0.98]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-4"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Nuevo stack
          </button>
        </div>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          onClick={scrollToPinned}
          className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 text-left transition hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_12px_30px_rgba(28,25,23,0.06)]"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-bg text-blue-ink">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="m12 3 2.7 5.6 6.2.9-4.5 4.4 1.1 6.1-5.5-2.9-5.5 2.9 1.1-6.1L3.1 9.5l6.2-.9L12 3Z" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-text">
              Notas importantes
            </span>
            <span className="text-xs text-text-3">
              {pinned.length === 0
                ? "Fija una nota"
                : `${pinned.length} fijada${pinned.length === 1 ? "" : "s"}`}
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenTemplates}
          className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 text-left transition hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_12px_30px_rgba(28,25,23,0.06)]"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-bg text-gold-ink">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-text">
              Crear un To-Do
            </span>
            <span className="text-xs text-text-3">Desde una plantilla</span>
          </span>
        </button>

        <button
          type="button"
          onClick={scrollToStacks}
          className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 text-left transition hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_12px_30px_rgba(28,25,23,0.06)]"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-purple-bg text-purple-ink">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
              <path d="M14 2v6h6M8 13h8M8 17h5" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-text">
              Documentos
            </span>
            <span className="text-xs text-text-3">
              {notebooks.length} stack{notebooks.length === 1 ? "" : "s"}
            </span>
          </span>
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-surface-2/40 p-4 opacity-70">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-rose-bg text-rose-ink">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-2 text-sm font-semibold text-text-2">
              Fotos
              <span className="rounded-full border border-border px-1.5 py-px text-[10px] font-medium text-text-3">
                Pronto
              </span>
            </span>
            <span className="text-xs text-text-3">Adjuntos visuales</span>
          </span>
        </div>
      </section>

      <section id="stacks" className="mt-12 scroll-mt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-text">Stacks</h2>
            <p className="mt-1 text-xs text-text-3">
              Tus cuadernos, ordenados como quieras
            </p>
          </div>
          <button
            type="button"
            onClick={onNewNotebook}
            className="text-xs font-medium text-text-3 transition hover:text-text"
          >
            + Crear stack
          </button>
        </div>

        {notebooks.length === 0 ? (
          <button
            type="button"
            onClick={onNewNotebook}
            className="mt-5 flex w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border-strong bg-surface/60 px-6 py-14 text-center transition hover:border-brand hover:bg-blue-bg/30"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-blue-bg text-blue-ink">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="size-5"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-text">
              Crea tu primer stack
            </span>
            <span className="max-w-xs text-xs text-text-3">
              Un espacio para agrupar notas por tema, proyecto o lo que se te
              ocurra.
            </span>
          </button>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sorted.map((notebook) => (
              <StackCard
                key={notebook.id}
                notebook={notebook}
                onOpen={() => onOpenNotebook(notebook.id)}
                onAddNote={() => onAddNote(notebook.id)}
                onTogglePin={() => onTogglePin(notebook.id)}
                onToggleStar={() => onToggleStar(notebook.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section id="pinned-notes" className="mt-12 scroll-mt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-text">Notas importantes</h2>
            <p className="mt-1 text-xs text-text-3">
              Lo que fijaste para tenerlo siempre a mano
            </p>
          </div>
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-text-3">
            {pinned.length}
          </span>
        </div>

        {pinned.length === 0 ? (
          <p className="mt-5 rounded-2xl border border-dashed border-border bg-surface-2/40 px-4 py-6 text-sm text-text-3">
            Aún no hay notas fijadas. Usa el pin de cualquier nota para verla
            aquí.
          </p>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {pinned.map(({ notebook, note }) => (
              <PinnedNoteCard
                key={note.id}
                notebook={notebook}
                note={note}
                onOpen={() => onOpenNote(notebook.id, note.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function PinnedNoteCard({
  notebook,
  note,
  onOpen,
}: {
  notebook: Notebook;
  note: Note;
  onOpen: () => void;
}) {
  const tags = getNoteTags(note).slice(0, 2);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-4 text-left transition hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_12px_30px_rgba(28,25,23,0.06)]"
    >
      <div className="flex items-center gap-2 text-[11px] text-text-3">
        <span
          className="size-2 rounded-full"
          style={{ backgroundColor: notebook.color }}
        />
        <span className="truncate font-medium">{notebook.name}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-auto size-3 shrink-0 text-blue-ink"
        >
          <path d="M9 3h6l-.75 5.25L18 12v2H6v-2l3.75-3.75L9 3Z" />
          <path d="M12 14v7" />
        </svg>
      </div>
      <p className="mt-2 truncate text-sm font-semibold text-text">
        {note.title || "Sin título"}
      </p>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className="rounded-full px-1.5 py-px text-[10px] font-medium"
              style={{ backgroundColor: `${tag.color}1a`, color: tag.color }}
            >
              #{tag.label}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
