"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/icon.svg"
            alt="Lyno"
            width={32}
            height={32}
            priority
            className="size-8 rounded-[10px]"
          />
          <span className="text-[18px] font-bold tracking-tight text-text">
            <span className="text-blue-ink">L</span>yno
            <span className="text-purple-ink">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <button className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-2 shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition duration-200 hover:border-border-strong hover:bg-surface-2 hover:text-text active:scale-[0.98]">
            <GithubIcon />
            GitHub
          </button>
          <button
            disabled
            title="Escritorio llegará en una futura versión"
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-text-3"
          >
            Escritorio
            <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-3">
              pronto
            </span>
          </button>
        </div>

        <button
          className="rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-2 transition hover:bg-surface-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="flex flex-col items-stretch gap-2 border-t border-border px-6 py-4 md:hidden">
          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-2 transition hover:bg-surface-2">
            <GithubIcon />
            GitHub
          </button>
          <button
            disabled
            className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-text-3"
          >
            Escritorio
            <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
              pronto
            </span>
          </button>
        </div>
      )}
    </nav>
  );
}
