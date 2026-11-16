"use client";
import { motion, AnimatePresence } from "motion/react";

import { useState } from "react";

const NEWS = [
  {
    title: "Dashboard nuevo",
    description: "Stacks, notas importantes y accesos rápidos",
    isNew: true,
  },
  {
    title: "Favoritos",
    description: "Marca stacks con estrella y fíjalos arriba",
    isNew: true,
  },
  {
    title: "Plantillas",
    description: "8 plantillas listas desde la home",
    isNew: false,
  },
  {
    title: "Exportar",
    description: "Descarga en .txt, .md, .pdf y .docx",
    isNew: false,
  },
];

// ? bloque inferior del sidebar: ajustes (tema/atajos), búsqueda y novedades
export default function SidebarFooter({
  onOpenSearch,
}: {
  onOpenSearch: () => void;
}) {
  const [showNews, setShowNews] = useState(false);

  return (
    <>
      <div className="mt-2 border-t border-border pt-3">
        <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-3">
          Ajustes
        </p>

        <div className="mt-1.5 flex flex-col gap-0.5">
          <button
            type="button"
            disabled
            title="Modo oscuro (próximamente)"
            className="flex cursor-not-allowed items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-text-3 opacity-70"
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
              <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 12 21.75a9.753 9.753 0 0 0 9.752-6.748Z" />
            </svg>
            Modo oscuro
            <span className="ml-auto rounded-full border border-border px-1.5 py-px text-[10px]">
              pronto
            </span>
          </button>

          <button
            type="button"
            disabled
            title="Atajos de teclado (próximamente)"
            className="flex cursor-not-allowed items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-text-3 opacity-70"
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
              <rect x="2.5" y="6" width="19" height="12" rx="2" />
              <path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M7 14h10" />
            </svg>
            Atajos de teclado
            <span className="ml-auto rounded-full border border-border px-1.5 py-px text-[10px]">
              pronto
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenSearch}
            className="group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-text-2 transition hover:bg-surface-2 hover:text-text"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="size-4 text-text-3"
            >
              <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            Buscar notas
            <kbd className="ml-auto rounded border border-border bg-surface-2 px-1 text-[10px] text-text-3">
              /
            </kbd>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowNews(true)}
          className="group mt-1 flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs text-text-3 transition hover:bg-surface-2 hover:text-text-2"
        >
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          <span className="flex-1">¿Qué ha llegado?</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3 transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {showNews && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-text/20 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setShowNews(false)}
          >
            <motion.div
              className="w-full max-w-sm rounded-3xl border border-border bg-surface p-6 shadow-[0_24px_80px_rgba(28,25,23,0.18)]"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-serif text-2xl text-text">
                ¿Qué ha llegado?
              </h2>
              <div className="mt-4 flex flex-col gap-3.5">
                {NEWS.map((item) => (
                  <div key={item.title} className="flex items-start gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green-500" />
                    <div>
                      <p className="flex items-center gap-1.5 text-sm font-medium text-text">
                        {item.title}
                        {item.isNew && (
                          <span className="rounded-full bg-green-100 px-1.5 py-px text-[10px] font-semibold text-green-700">
                            Nuevo
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-text-3">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowNews(false)}
                  className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(59,91,219,0.24)] transition hover:bg-brand-hover active:scale-95"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
