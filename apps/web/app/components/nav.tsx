"use client";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-black/5 bg-[#fbfbfd]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-5">
          <p className="text-xl font-bold tracking-tight text-gray-900">
            JsWrite
          </p>
          <p className="hidden pt-0.5 text-sm text-gray-500 md:block">
            cualquier <span className="font-semibold text-gray-800">nota</span>{" "}
            en tu navegador, solo{" "}
            <span className="font-semibold text-gray-800">escríbelo</span>
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button className="rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium text-gray-700 transition duration-200 ease hover:border-black hover:bg-black hover:text-white active:scale-95">
            Github
          </button>
          <button
            disabled
            className="cursor-not-allowed rounded-full border border-black bg-black px-4 py-1.5 text-sm font-medium text-white opacity-40"
            title="Escritorio llegará en una futura versión"
          >
            Escritorio (pronto)
          </button>
        </div>

        <button
          className="rounded-full border border-black/10 px-3 py-1.5 text-sm md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="flex flex-col items-center gap-3 px-6 pt-1 pb-4 md:hidden">
          <p className="text-center text-sm text-gray-500">
            cualquier <span className="font-semibold">nota</span> en tu
            navegador, solo <span className="font-semibold">escríbelo</span>
          </p>
          <div className="flex gap-2">
            <button className="rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium transition duration-200 ease hover:bg-black hover:text-white">
              Github
            </button>
            <button
              disabled
              className="cursor-not-allowed rounded-full border border-black bg-black px-4 py-1.5 text-sm font-medium text-white opacity-40"
              title="Escritorio llegará en una futura versión"
            >
              Escritorio (pronto)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
