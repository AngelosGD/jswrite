"use client";

import { getNoteTags, type Notebook, type Note } from "@/lib/notebooks";

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("es", {
    day: "numeric",
    month: "short",
  });

export default function NotebookHome({
  notebook,
  query,
  activeTag,
  onAddNote,
  onOpenNote,
  onToggleNotePin,
  onOpenSearch,
  onTogglePin,
  onToggleStar,
}: {
  notebook: Notebook;
  query: string;
  activeTag: string | null;
  onAddNote: () => void;
  onOpenNote: (noteId: string) => void;
  onToggleNotePin: (noteId: string) => void;
  onOpenSearch: () => void;
  onTogglePin: () => void;
  onToggleStar: () => void;
}) {
  const q = query.trim().toLowerCase();
  const matches = (note: Note) =>
    (!q || note.title.toLowerCase().includes(q)) &&
    (!activeTag ||
      getNoteTags(note).some(
        (tag) => tag.label.toLowerCase() === activeTag.toLowerCase(),
      ));

  const visible = notebook.notes
    .filter(matches)
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));
  const pinned = visible.filter((note) => note.pinned);
  const rest = visible.filter((note) => !note.pinned);

  const tags = [
    ...new Map(
      notebook.notes
        .flatMap((note) => getNoteTags(note))
        .map((tag) => [tag.label.toLowerCase(), tag]),
    ).values(),
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-8 py-10">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex min-w-0 items-start gap-4">
          <span
            className="mt-1 grid size-12 shrink-0 place-items-center rounded-2xl"
            style={{ backgroundColor: `${notebook.color}1a` }}
          >
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: notebook.color }}
            />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-3">
              Stack
            </p>
            <h1 className="mt-1 truncate font-serif text-4xl leading-none text-text">
              {notebook.name}
            </h1>
            <p className="mt-2 text-sm text-text-2">
              {notebook.notes.length === 0
                ? "Todavía no hay notas en este stack"
                : `${notebook.notes.length} nota${notebook.notes.length === 1 ? "" : "s"} · ${pinned.length} fijada${pinned.length === 1 ? "" : "s"}`}
            </p>
            {tags.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1">
                {tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag.label}
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor: `${tag.color}1a`,
                      color: tag.color,
                    }}
                  >
                    #{tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>
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
              onClick={onToggleStar}
              aria-label={
                notebook.starred ? "Quitar de favoritos" : "Marcar favorito"
              }
              title={notebook.starred ? "Quitar favorito" : "Favorito"}
              className={`grid size-9 place-items-center rounded-xl transition hover:bg-surface-2 ${
                notebook.starred ? "text-gold-ink" : "text-text-3 hover:text-text"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill={notebook.starred ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="m12 3 2.7 5.6 6.2.9-4.5 4.4 1.1 6.1-5.5-2.9-5.5 2.9 1.1-6.1L3.1 9.5l6.2-.9L12 3Z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={onTogglePin}
              aria-label={notebook.pinned ? "Desfijar stack" : "Fijar stack"}
              title={notebook.pinned ? "Desfijar" : "Fijar"}
              className={`grid size-9 place-items-center rounded-xl transition hover:bg-surface-2 ${
                notebook.pinned ? "text-blue-ink" : "text-text-3 hover:text-text"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M9 3h6l-.75 5.25L18 12v2H6v-2l3.75-3.75L9 3Z" />
                <path d="M12 14v7" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={onAddNote}
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
            Añadir nota
          </button>
        </div>
      </header>

      {notebook.notes.length === 0 ? (
        <button
          type="button"
          onClick={onAddNote}
          className="mt-10 flex w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border-strong bg-surface/60 px-6 py-14 text-center transition hover:border-brand hover:bg-blue-bg/30"
        >
          <span
            className="grid size-12 place-items-center rounded-2xl"
            style={{ backgroundColor: `${notebook.color}1a` }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
              style={{ color: notebook.color }}
            >
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
              <path d="M14 3v5h5M9 13h6M12 10v6" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-text">
            Crea la primera nota
          </span>
          <span className="max-w-xs text-xs text-text-3">
            Escribe una idea, una tarea o lo que necesites guardar en este
            stack.
          </span>
        </button>
      ) : visible.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-border bg-surface-2/40 px-4 py-8 text-center text-sm text-text-3">
          {query.trim()
            ? `Sin resultados para “${query.trim()}”`
            : activeTag
              ? `Sin notas con #${activeTag}`
              : "Sin notas"}
        </p>
      ) : (
        <>
          {pinned.length > 0 && (
            <section className="mt-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-text">Fijadas</h2>
                  <p className="mt-1 text-xs text-text-3">
                    Lo que quieres tener siempre a mano
                  </p>
                </div>
                <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-text-3">
                  {pinned.length}
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {pinned.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    color={notebook.color}
                    onOpen={() => onOpenNote(note.id)}
                    onTogglePin={() => onToggleNotePin(note.id)}
                  />
                ))}
              </div>
            </section>
          )}

          <section className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-text">
                  Todas las notas
                </h2>
                <p className="mt-1 text-xs text-text-3">
                  Ordenadas por las fijadas primero
                </p>
              </div>
              <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-text-3">
                {rest.length}
              </span>
            </div>

            {rest.length === 0 ? (
              <p className="mt-4 rounded-2xl border border-dashed border-border bg-surface-2/40 px-4 py-6 text-sm text-text-3">
                Todas las notas están fijadas.
              </p>
            ) : (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {rest.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    color={notebook.color}
                    onOpen={() => onOpenNote(note.id)}
                    onTogglePin={() => onToggleNotePin(note.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function NoteCard({
  note,
  color,
  onOpen,
  onTogglePin,
}: {
  note: Note;
  color: string;
  onOpen: () => void;
  onTogglePin: () => void;
}) {
  const tags = getNoteTags(note).slice(0, 3);
  const preview = stripHtml(note.content);

  return (
    <div
      className="group relative flex min-h-[150px] flex-col rounded-2xl border border-border p-4 text-left transition hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_12px_30px_rgba(28,25,23,0.06)]"
      style={{ background: `linear-gradient(180deg, ${color}12, #ffffff 62%)` }}
    >
      <button type="button" onClick={onOpen} className="flex-1 text-left">
        <p className="pr-8 text-sm font-semibold text-text">
          {note.title || "Sin título"}
        </p>
        <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-text-3">
          {preview || "Nota vacía"}
        </p>
      </button>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="flex min-w-0 flex-wrap gap-1">
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
        <span className="shrink-0 text-[10px] text-text-3">
          {formatDate(note.updatedAt)}
        </span>
      </div>

      <button
        type="button"
        onClick={onTogglePin}
        aria-label={note.pinned ? "Desfijar nota" : "Fijar nota"}
        title={note.pinned ? "Desfijar" : "Fijar"}
        className={`absolute right-3 top-3 grid size-7 place-items-center rounded-lg border border-border bg-surface/80 backdrop-blur transition hover:bg-surface ${
          note.pinned ? "text-blue-ink" : "text-text-3 opacity-0 group-hover:opacity-100"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <path d="M9 3h6l-.75 5.25L18 12v2H6v-2l3.75-3.75L9 3Z" />
          <path d="M12 14v7" />
        </svg>
      </button>
    </div>
  );
}
