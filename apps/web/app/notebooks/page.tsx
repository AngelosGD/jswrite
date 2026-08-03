"use client";
import { useNotebooks } from "@/lib/notebooks";

export default function NotebooksPage() {
  const notebooks = useNotebooks();

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r-2 border-gray-200 p-4 bg-gray-800/5">
        <input
          placeholder="Busqueda por nombre"
          className="text-sm text-gray-500 border border-gray-400 p-2 w-full font-serif rounded"
        ></input>
        <br />
        <hr className="mt-2 opacity-50"></hr>
        {notebooks.length === 0 && <p>Sin notebooks aun</p>}

        {notebooks.map((n) => (
          <button
            key={n.id}
            className="flex items-center gap-2 text-gray-500 font-serif h-15 border border-black/30 mt-3 p-2 rounded w-full bg-white"
          >
            <span>{n.name}</span>
          </button>
        ))}
      </aside>

      <main className="flex-1 p-6">
        <h1 className="font-serif text-2xl text-gray-800">Mis notebooks</h1>
        {notebooks.length === 0 ? (
          <p className="text-gray-400 mt-4">Sin notebooks aún</p>
        ) : (
          <p className="text-gray-400 mt-4">
            {notebooks.length} notebook(s) guardado(s)
          </p>
        )}
      </main>
    </div>
  );
}
