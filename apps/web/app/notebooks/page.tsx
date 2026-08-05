"use client";
import { useNotebooks } from "@/lib/notebooks";
import NotebookCard from "@/app/components/notebookCard";
import NewNotebookModal from "@/app/components/newNotebookModal";
import Link from "next/link";
import { useState } from "react";

export default function NotebooksPage() {
  const notebooks = useNotebooks();
  const [showNotebookModal, setShowNotebookModal] = useState(false);

  const [query, setQuery] = useState("");

  const filterNotebooks = notebooks.filter((n) => {
    return n.name.toLowerCase().includes(query.trim().toLowerCase());
  });

  return (
    <div className="flex h-screen">
      <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 p-4">
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
              {notebooks.length === 0 ? "Sin notebooks aún" : "Sin resultados"}
            </p>
          )}

          {filterNotebooks.map((n) => (
            <button
              key={n.id}
              className="group flex items-center gap-2.5 rounded-md px-2 py-2 text-left transition duration-100 ease hover:bg-gray-100"
            >
              <span
                className="size-2.5 shrink rounded-full"
                style={{ backgroundColor: n.color }}
              />
              <span className="truncate text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {n.name}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        <h1 className="font-serif text-2xl text-gray-800">Mis notebooks</h1>

        {notebooks.length === 0 ? (
          <p className="mt-4 text-gray-400">Sin notebooks aún</p>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {notebooks.map((n) => (
              <NotebookCard key={n.id} notebook={n} />
            ))}
          </div>
        )}
      </main>

      <NewNotebookModal
        isOpen={showNotebookModal}
        onClose={() => setShowNotebookModal(false)}
      />
    </div>
  );
}
