"use client";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b-2 border-gray-200 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <p className="font-serif text-2xl text-gray-800 pl-5">JsWrite</p>
          <p className="hidden md:block font-serif pt-1">
            cualquier <span className="font-bold">nota</span> en tu navegador,
            solo <span className="font-bold">escribelo</span> o dictalo por voz
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="border border-gray-400 p-2 w-25 transition duration-280 ease hover:bg-black hover:text-white">Github</button>
          <button className="bg-black border border-black text-white p-2 w-25 transition duration-280 ease hover:bg-white hover:text-black hover:border-black">Escritorio</button>
        </div>

        <button
          className="md:hidden border border-gray-400 px-3 py-1 text-sm"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col items-center gap-3 mt-4 pb-2">
          <p className="font-serif text-center">
            cualquier <span className="font-bold">nota</span> en tu navegador,
            solo <span className="font-bold">escribelo</span> o dictalo por voz
          </p>
          <div className="flex gap-3">
            <button className="border border-gray-400 p-2 w-25 transition duration-280 ease hover:bg-black hover:text-white">Github</button>
            <button className="bg-black border border-black text-white p-2 w-25 transition duration-280 ease hover:bg-white hover:text-black hover:border-black">Escritorio</button>
          </div>
        </div>
      )}
    </nav>
  );
}
