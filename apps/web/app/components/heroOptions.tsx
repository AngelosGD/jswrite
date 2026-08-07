"use client";

import NewNotebookModal from "./newNotebookModal";
import { use, useState } from "react";
import { useNotebooks } from "@/lib/notebooks";

export default function HeroOptions() {
  const [showNotebookModal, setShowNotebookModal] = useState(false);
  const notebooks = useNotebooks();
  const [query, setQuery] = useState("");

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
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                    stroke-linejoin="round"
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
                  stroke-linejoin="round"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Div para la parte de listado de notas recientes y input para busquedda */}
        <div className="flex flex-col gap-4 w-80">
          <div>
            <p className="font-sans text-gray-700 mb-1">Recientes</p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Buscar..."
              className="border h-9 border-gray-400 p-2 w-full focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded transition duration-100 ease"
            />
          </div>
          {filterNotebooks.length === 0 && (
            <p className="px-2 text-sm text-gray-400">
              {notebooks.length === 0 ? "Sin notebooks aún" : "Sin resultados"}
            </p>
          )}
          <p className="font-bold text-mist-800 mb-4 ">
            {filterNotebooks.map((n) => {
              return <p key={n.id}>{n.name}</p>;
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
