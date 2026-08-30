"use client";

import NewNotebookModal from "./newNotebookModal";
import { useState } from "react";
import { useNotebooks } from "@/lib/notebooks";

export default function HeroOptions() {
  const [showNotebookModal, setShowNotebookModal] = useState(false);
  const notebooks = useNotebooks();
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filterNotebooks = notebooks
    .filter((n) => n.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return (
    <div className="items-center justify-center flex mt-[8%] flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-10 items-start justify-center">
        <div className="items-center justify-center flex flex-col ">
          <p className="font-sans font-bold ">Guardado local automatico</p>
          <p className="font-sans text-3xl font-bold">
            Empieza a <span className="text-mist-800">ordenar</span>
          </p>

          <p className="font-sans text-center text-gray-700 text-lg">
            Crea un nuevo cuaderno y ordena tus ideas y apuntes o ve directo al
            board para empezar a idear.
          </p>

          <div className="flex flex-col gap-4 mt-5">
            <button
              onClick={() => setShowNotebookModal(true)}
              className="group flex items-center gap-2 transition duration-300 ease pr-20 pl-20 border h-12 border-black/20 rounded active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 bg-gray-200 rounded"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
              <span className="hover:text-green-700 flex items-center gap-2">
                <span className="font-sans font-semibold transition duration-200 ease">
                  Nuevo notebook
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-5 transition-transform duration-300 ease group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </button>
            <NewNotebookModal
              isOpen={showNotebookModal}
              onClose={() => setShowNotebookModal(false)}
            />

            <button className="group flex items-center justify-center transition duration-300 ease pr-20 pl-20 border h-12 border-black/20 rounded active:scale-95">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 bg-gray-200 rounded m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <span className="font-sans font-semibold group-hover:text-green-700 transition duration-200 ease">
                Nota rapida
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5 transition-all duration-300 ease group-hover:translate-x-1 group-hover:text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            <button className="group flex items-center justify-center transition duration-300 ease pr-20 pl-20 border h-12 border-black/20 rounded active:scale-95">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 bg-gray-200 rounded m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                />
              </svg>
              <span className="font-sans font-semibold group-hover:text-green-700 transition duration-200 ease">
                Canva
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5 transition-all duration-300 ease group-hover:translate-x-1 group-hover:text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            <button className="group flex items-center justify-center transition duration-300 ease pr-20 pl-20 border h-12 border-black/20 rounded active:scale-95">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 bg-gray-200 rounded m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                />
              </svg>
              <span className="font-sans font-semibold group-hover:text-green-700 transition duration-200 ease">
                Plantillas
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5 transition-all duration-300 ease group-hover:translate-x-1 group-hover:text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Div para la parte de listado de notas recientes y input para busquedda */}
        <div className="flex flex-col gap-3 w-80">
          <p className="text-sm font-medium text-gray-500">Recientes</p>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Buscar notebook..."
            className="h-9 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 transition"
          />
          {filterNotebooks.length === 0 && (
            <p className="px-1 text-sm text-gray-400">
              {notebooks.length === 0 ? "Sin notebooks aún" : "Sin resultados"}
            </p>
          )}
          {filterNotebooks.map((n) => (
            <div
              key={n.id}
              className="relative"
              onMouseEnter={() => setHoveredId(n.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* notebook row */}
              <a
                href={`/notebooks?open=${n.id}`}
                className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 transition hover:bg-gray-50 active:scale-[0.98]"
              >
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: n.color }}
                />
                <span className="min-w-0 flex-1 truncate text-sm text-gray-700">
                  {n.name}
                </span>
                {n.notes.length > 0 && (
                  <span className="text-[11px] text-gray-400 tabular-nums">
                    {n.notes.length}
                  </span>
                )}
              </a>

              {/* notas desplegadas con animación */}
              <div
                className="grid transition-all duration-200 ease-out"
                style={{
                  gridTemplateRows: hoveredId === n.id ? "1fr" : "0fr",
                }}
              >
                <div className="overflow-hidden">
                  <div className="ml-5 flex flex-col border-l border-gray-100 pl-3 pb-1">
                    {n.notes.length === 0 && (
                      <span className="py-1.5 text-xs text-gray-300 italic">
                        Sin notas
                      </span>
                    )}
                    {n.notes.map((note) => (
                      <a
                        key={note.id}
                        href={`/notebooks?open=${n.id}&note=${note.id}`}
                        className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="truncate">{note.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
