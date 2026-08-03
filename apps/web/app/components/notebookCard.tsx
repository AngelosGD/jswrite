"use client";
import { motion } from "motion/react";
import type { Notebook } from "@/lib/notebooks";

const RINGS = Array.from({ length: 4 });
const PAGE_LINES =
  "repeating-linear-gradient(90deg, #fff 0 1px, #d6d3d1 1px 2px, #fafaf9 2px 4px)";

export default function NotebookCard({ notebook }: { notebook: Notebook }) {
  return (
    <motion.div
      className="group relative mx-auto aspect-[4/3] w-full max-w-[210px] cursor-pointer [perspective:1200px]"
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <div
        className="absolute inset-0 rounded-md border border-stone-300 bg-white shadow-md"
        style={{ transform: "translate(16px, 9px)" }}
      >
        <div
          className="absolute inset-y-0 right-0 w-4 rounded-r-md shadow-inner"
          style={{ backgroundImage: PAGE_LINES }}
        />
        <div
          className="absolute right-0 bottom-0 left-0 h-2.5 rounded-b-md"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #fff 0 1px, #d6d3d1 1px 2px, #fafaf9 2px 4px)",
          }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
        variants={{
          rest: { opacity: 0, scale: 0.8 },
          hover: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.25, delay: 0.08, ease: "easeOut" }}
      >
        <span className="rounded-full border border-black/60 bg-white/60 px-6 py-2 text-base font-bold tracking-wide text-black shadow-md backdrop-blur-sm">
          Abrir
        </span>
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-md border-2 border-neutral-900 bg-white shadow-sm"
        style={{ transformOrigin: "left center" }}
        variants={{
          rest: { rotateY: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
          hover: {
            rotateY: -8,
            scale: 0.98,
            opacity: 0.92,
            filter: "blur(0.4px)",
          },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
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
