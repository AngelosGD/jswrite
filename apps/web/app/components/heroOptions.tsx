"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import NewNotebookModal from "./newNotebookModal";
import TemplateModal from "./templateModal";
import {
  addQuickNote,
  saveQuickNotes,
  useQuickNotes,
} from "@/lib/notebooks";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function HeroOptions() {
  const [showNotebookModal, setShowNotebookModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const quickNotes = useQuickNotes();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="dotted-canvas pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col px-6 pb-28 pt-10 sm:pt-14">
        <div className="flex justify-center sm:justify-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-border bg-green-bg px-3 py-1 text-xs font-medium text-green-ink">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-ink opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-green-ink" />
            </span>
            Guardado local automático
          </span>
        </div>

        <div className="mt-10 flex flex-col items-center text-center">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Empieza a ordenar
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <Image
              src="/icon.svg"
              alt=""
              width={52}
              height={52}
              priority
              className="size-12 rounded-2xl sm:size-[52px]"
            />
            <span className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              <span className="text-blue-ink">L</span>yno
              <span className="text-purple-ink">.</span>
            </span>
          </div>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-2 sm:text-lg">
            Una idea, un punto, todo empieza por algo desordenado, que al final
            conecta.
          </p>
          <p className="mt-2 max-w-md text-sm text-text-3">
            Crea notas con guardado local y compartido en tiempo real.
          </p>

          <div className="mt-9 w-full max-w-md">
            <button
              onClick={() => setShowNotebookModal(true)}
              className="group flex h-12 w-full items-center gap-3 rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(59,91,219,0.28)] transition duration-200 hover:bg-brand-hover active:scale-[0.99]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
                className="size-4"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span>Nuevo notebook</span>
              <span className="ml-auto transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </button>

            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <button
                onClick={() => {
                  const result = addQuickNote(quickNotes);
                  saveQuickNotes(result.quickNotes);
                  window.location.href = `/notebooks?quick=${result.note.id}`;
                }}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-4 text-left shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_10px_28px_rgba(28,25,23,0.07)] active:translate-y-0 active:scale-[0.99]"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-blue-bg text-blue-ink transition group-hover:scale-105">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-[18px]"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </span>
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="text-sm font-medium text-text">
                    Nota rápida
                  </span>
                  <span className="text-text-3 transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </span>
              </button>

              <button className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-4 text-left shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_10px_28px_rgba(28,25,23,0.07)] active:translate-y-0 active:scale-[0.99]">
                <span className="grid size-9 place-items-center rounded-xl bg-gold-bg text-gold-ink transition group-hover:scale-105">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-[18px]"
                  >
                    <rect x="3" y="5" width="8" height="6" rx="1.5" />
                    <rect x="14" y="7" width="7" height="12" rx="1.5" />
                    <rect x="3" y="14" width="8" height="5" rx="1.5" />
                  </svg>
                </span>
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="text-sm font-medium text-text">Canva</span>
                  <span className="text-text-3 transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </span>
              </button>

              <button
                onClick={() => setShowTemplateModal(true)}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-4 text-left shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_10px_28px_rgba(28,25,23,0.07)] active:translate-y-0 active:scale-[0.99]"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-purple-bg text-purple-ink transition group-hover:scale-105">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-[18px]"
                  >
                    <path d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                  </svg>
                </span>
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="text-sm font-medium text-text">
                    Plantillas
                  </span>
                  <span className="text-text-3 transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <NewNotebookModal
        isOpen={showNotebookModal}
        onClose={() => setShowNotebookModal(false)}
      />
      <TemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
      />
    </section>
  );
}
