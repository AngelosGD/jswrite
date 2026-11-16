"use client";
import { motion, AnimatePresence } from "motion/react";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  COLORS,
  createNotebook,
  createTag,
  loadNotebooks,
  saveNotebooks,
  type Tag,
} from "@/lib/notebooks";
import FileDrop from "./fileDrop";

const inputClass =
  "w-full rounded-xl border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-text transition placeholder:text-text-3 focus:border-brand focus:outline-none focus:ring-4 focus:ring-blue-bg";

// ? funcion para abrir o cerrar el modal del notebook
export default function NewNotebookModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [customColor, setCustomColor] = useState("#3B5BDB");
  const [tags, setTags] = useState<Tag[]>([]);
  const [draftTag, setDraftTag] = useState("");
  const isCustom = !COLORS.includes(color);

  const reset = () => {
    setName("");
    setColor(COLORS[0]);
    setCustomColor("#3B5BDB");
    setTags([]);
    setDraftTag("");
  };

  const close = () => {
    reset();
    onClose();
  };

  const commitTag = () => {
    const tag = createTag(tags, draftTag);
    if (tag) setTags([...tags, tag]);
    setDraftTag("");
  };

  const handleCreateNotebook = (e: FormEvent) => {
    e.preventDefault();
    saveNotebooks([
      ...loadNotebooks(),
      createNotebook(name, color, tags),
    ]);
    reset();
    onClose();
    router.push("/notebooks");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-text/25 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={close}
        >
          <motion.div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border bg-surface p-6 shadow-[0_24px_80px_rgba(28,25,23,0.18)] sm:p-7"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-3">
                  Nuevo espacio
                </p>
                <h2 className="mt-1 font-serif text-2xl leading-tight text-text">
                  Nuevo notebook
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar"
                className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-text-3 transition hover:bg-surface-2 hover:text-text"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="size-4"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <form
              onSubmit={handleCreateNotebook}
              className="mt-6 flex flex-col gap-5"
            >
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-text-3">
                  Nombre
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  type="text"
                  placeholder="Sin título"
                  className={`mt-2 ${inputClass}`}
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-3">
                  Categoría
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2.5">
                  {COLORS.map((c) => {
                    const selected = color === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        aria-label={`Color ${c}`}
                        aria-pressed={selected}
                        style={{ backgroundColor: c }}
                        className={`grid size-9 place-items-center rounded-xl transition duration-200 ${
                          selected
                            ? "scale-110 shadow-[0_4px_14px_rgba(28,25,23,0.20)]"
                            : "hover:scale-105 hover:shadow-[0_2px_8px_rgba(28,25,23,0.10)]"
                        }`}
                      >
                        {selected && (
                          <span className="grid size-4 place-items-center rounded-full bg-white/90 shadow-sm">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                              className="size-3 text-text"
                            >
                              <path d="m5 12 4 4L19 6" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => colorInputRef.current?.click()}
                    aria-label="Elegir color personalizado"
                    aria-pressed={isCustom}
                    title="Color personalizado"
                    style={isCustom ? { backgroundColor: color } : undefined}
                    className={`relative grid size-9 place-items-center overflow-hidden rounded-xl border border-border-strong transition duration-200 ${
                      isCustom
                        ? "scale-110 shadow-[0_4px_14px_rgba(28,25,23,0.20)]"
                        : "hover:scale-105 hover:shadow-[0_2px_8px_rgba(28,25,23,0.10)]"
                    }`}
                  >
                    {isCustom ? (
                      <span className="grid size-4 place-items-center rounded-full bg-white/90 shadow-sm">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="size-3 text-text"
                        >
                          <path d="m5 12 4 4L19 6" />
                        </svg>
                      </span>
                    ) : (
                      <>
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                          style={{
                            background:
                              "conic-gradient(from 90deg, #ef4444, #f59e0b, #22c55e, #3b82f6, #8b5cf6, #ec4899, #ef4444)",
                          }}
                        />
                        <span className="relative grid size-4 place-items-center rounded-full bg-white/90 shadow-sm">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            aria-hidden="true"
                            className="size-3 text-text"
                          >
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </>
                    )}
                  </button>

                  <input
                    ref={colorInputRef}
                    type="color"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      setColor(e.target.value);
                    }}
                    aria-label="Color personalizado"
                    className="sr-only"
                  />
                </div>
                {isCustom && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-text-3">
                    Personalizado
                    <span className="font-mono text-[11px] font-medium text-text-2">
                      {color.toUpperCase()}
                    </span>
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-3">
                  Etiquetas
                </p>
                {tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag.label}
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: `${tag.color}1a`,
                          color: tag.color,
                        }}
                      >
                        #{tag.label}
                        <button
                          type="button"
                          onClick={() =>
                            setTags(
                              tags.filter(
                                (t) =>
                                  t.label.toLowerCase() !==
                                  tag.label.toLowerCase(),
                              ),
                            )
                          }
                          aria-label={`Quitar etiqueta ${tag.label}`}
                          className="rounded-full opacity-60 transition hover:opacity-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-2 flex gap-2">
                  <input
                    value={draftTag}
                    onChange={(e) => setDraftTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        commitTag();
                      }
                    }}
                    type="text"
                    placeholder="Añadir etiqueta y Enter"
                    className={`flex-1 ${inputClass}`}
                  />
                  <button
                    type="button"
                    onClick={commitTag}
                    className="grid size-[42px] shrink-0 place-items-center rounded-xl border border-border-strong bg-surface text-text-2 transition hover:bg-surface-2 hover:text-text"
                    aria-label="Añadir etiqueta"
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
                  </button>
                </div>
              </div>

              <FileDrop
                title="Importar respaldo"
                hint="Arrastra un archivo de notebook aquí"
                badge="Próximamente"
                accept=".lyno,.json,.zip"
                disabled
              />

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text-2 transition hover:bg-surface-2 hover:text-text active:scale-[0.98]"
                >
                  Cancelar
                </button>
                <button className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(59,91,219,0.24)] transition hover:bg-brand-hover active:scale-[0.98]">
                  Crear notebook
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
