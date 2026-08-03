"use client";
import { motion } from "motion/react";
import type { Notebook } from "@/lib/notebooks";

const RINGS = Array.from({ length: 4 });
const PAGES = [6, 12, 18];

export default function NotebookCard({ notebook }: { notebook: Notebook }) {
  return (
    <motion.div
      className="group relative mx-auto aspect-[4/3] w-full max-w-[260px] cursor-pointer [perspective:1200px]"
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      {PAGES.map((offset, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-md border border-neutral-200 bg-white shadow-sm"
          style={{ transform: `translateX(${offset}px)` }}
        />
      ))}

      <motion.div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <span className="text-sm font-semibold tracking-wide text-black/80 underline decoration-black/40 underline-offset-4">
          Abrir
        </span>
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-md border-2 border-neutral-900 bg-white shadow-sm"
        style={{ transformOrigin: "left center" }}
        variants={{
          rest: { rotateY: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
          hover: {
            rotateY: -12,
            scale: 0.97,
            opacity: 0.9,
            filter: "blur(0.5px)",
          },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="absolute inset-y-3 left-0 z-10 flex w-6 -translate-x-1/2 flex-col justify-between">
          {RINGS.map((_, i) => (
            <div key={i} className="relative size-5">
              <div className="absolute inset-0 rounded-full border-[3px] border-neutral-600 bg-gradient-to-b from-neutral-100 via-white to-neutral-400 shadow-sm" />
              <div className="absolute top-1 left-1.5 size-1.5 rounded-full bg-neutral-500/70" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center p-4">
          <span
            className="rounded-sm px-4 py-1.5 text-center font-serif text-xl font-semibold text-white shadow-sm"
            style={{ backgroundColor: notebook.color }}
          >
            {notebook.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
