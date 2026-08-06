"use client"

import { KeyboardEvent, useEffect, useEffectEvent } from "react"


type ContextMenuProps = {
    x: number;
    y: number;
    pinned: boolean;
    onTogglePin: () => void;
    onAddNote: () => void;
    onDeleteNotebook: () => void;
    onClose: () => void
}


export default function ContextMenu({
  x,
  y,
  pinned,
  onTogglePin,
  onAddNote,
  onDeleteNotebook,
  onClose,
}: ContextMenuProps) {
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {/* overlay invisible: un clic afuera cierra el menú */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed z-50 flex w-48 flex-col rounded-md border border-gray-200 bg-white py-1 shadow-lg"
        style={{ left: x, top: y }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => {
            onAddNote();
            onClose();
          }}
          className="px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        >
          Añadir nota
        </button>
        <button
          type="button"
          onClick={() => {
            onTogglePin();
            onClose();
          }}
          className="px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        >
          {pinned ? "Desfijar notebook" : "Fijar notebook"}
        </button>
        <button
          type="button"
          onClick={() => {
            onDeleteNotebook();
            onClose();
          }}
          className="px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
        >
          Eliminar notebook
        </button>
      </div>
    </>
  );
}