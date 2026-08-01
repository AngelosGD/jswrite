'use client'
import { useNotebooks } from "@/lib/notebooks";

export default function NotebooksPage() {
  const notebooks = useNotebooks();

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-gray-200 p-4">
        <p className="text-sm text-gray-400">Buscador (Paso 4)</p>
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