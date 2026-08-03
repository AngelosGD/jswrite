"use client";
import { useNotebooks } from "@/lib/notebooks";

export default function NotebooksPage() {
  const notebooks = useNotebooks();

  return (
    <div className="flex h-screen">
      <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 p-4">
        <p className="px-2 font-serif text-sm font-semibold text-gray-700">
          Notebooks
        </p>

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
            type="text"
            placeholder="Buscar..."
            className="w-full rounded-md border border-gray-200 bg-white py-2 pr-3 pl-8 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
          {notebooks.length === 0 && (
            <p className="px-2 text-sm text-gray-400">Sin notebooks aún</p>
          )}

          {notebooks.map((n) => (
            <button
              key={n.id}
              className="group flex items-center gap-2.5 rounded-md px-2 py-2 text-left transition duration-100 ease hover:bg-gray-100"
            >
              <span
                className="size-2.5 shrink-0 rounded-full"
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
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notebooks.map((n) => (
              <article
                key={n.id}
                className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm"
              >
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: n.color }}
                />
                <div className="absolute inset-y-0 left-0 w-4 bg-black/15" />
                <div className="absolute top-3 -left-1.5 flex flex-col gap-2.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="size-2 rounded-full bg-white/80 shadow-sm ring-1 ring-black/30"
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <span className="max-w-[90%] truncate text-center font-serif text-xl font-semibold text-white drop-shadow-sm">
                    {n.name}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
