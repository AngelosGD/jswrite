"use client";
import { motion, AnimatePresence } from "motion/react";

import { useState } from "react";

const NEWS = [
  {
    title: "Etiquetas",
    description: "Añade #etiquetas de colores a tus notas",
    isNew: true,
  },
  {
    title: "Plantillas",
    description: "8 plantillas listas desde la home",
    isNew: true,
  },
  {
    title: "Notas rápidas",
    description: "Sección con arrastre a notebooks y borrado animado",
    isNew: false,
  },
  {
    title: "Exportar",
    description: "Descarga en .txt, .md, .pdf y .docx",
    isNew: false,
  },
];

// ? bloque inferior del sidebar: novedades, tema (próximamente) y búsqueda
export default function SidebarFooter({
  onOpenSearch,
}: {
  onOpenSearch: () => void;
}) {
  const [showNews, setShowNews] = useState(false);

  return (
    <>
      <div className="mt-2 border-t border-gray-100 pt-2">
        <button
          type="button"
          onClick={() => setShowNews(true)}
          className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs text-gray-400 transition hover:bg-gray-50 hover:text-gray-700"
        >
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          <span className="flex-1">¿Qué ha llegado?</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-3 transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        <div className="mt-1 flex items-center gap-1 px-2">
          <button
            type="button"
            title="Modo oscuro (próximamente)"
            aria-label="Cambiar tema (próximamente)"
            className="group rounded-lg p-2 text-gray-400 transition-all duration-200 hover:rotate-12 hover:bg-gray-100 hover:text-gray-700 active:scale-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 transition-transform duration-300 group-hover:-rotate-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 12 21.75a9.753 9.753 0 0 0 9.752-6.748Z"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={onOpenSearch}
            title="Buscar notas"
            aria-label="Buscar notas"
            className="group flex flex-1 items-center gap-2 rounded-lg px-2 py-2 text-xs text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-700 active:scale-[0.98]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-4 transition-transform duration-200 group-hover:scale-110"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <span className="flex-1 text-left">Buscar...</span>
            <kbd className="rounded border border-gray-200 bg-gray-50 px-1 text-[10px] text-gray-400">
              /
            </kbd>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showNews && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setShowNews(false)}
          >
            <motion.div
              className="w-80 rounded-xl border border-gray-200 bg-white p-5 shadow-xl"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-serif text-lg text-gray-800">
                ¿Qué ha llegado?
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {NEWS.map((item) => (
                  <div key={item.title} className="flex items-start gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green-500" />
                    <div>
                      <p className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                        {item.title}
                        {item.isNew && (
                          <span className="rounded-full bg-green-100 px-1.5 py-px text-[10px] font-semibold text-green-700">
                            Nuevo
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowNews(false)}
                  className="rounded-lg bg-black px-3 py-1.5 text-sm text-white transition hover:bg-gray-800 active:scale-95"
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
