"use client";

import { getNoteTags, type Note } from "@/lib/notebooks";

// ? mini etiquetas bajo el nombre de la nota en el sidebar
export default function SidebarNoteTags({
  note,
  max = 3,
}: {
  note: Note;
  max?: number;
}) {
  const tags = getNoteTags(note);
  if (tags.length === 0) return null;
  const visible = tags.slice(0, max);
  const extra = tags.length - visible.length;

  return (
    <span className="flex min-w-0 flex-wrap items-center gap-1">
      {visible.map((tag) => (
        <span
          key={tag.label}
          className="inline-flex max-w-full items-center gap-0.5 truncate rounded-full px-1.5 py-px text-[10px] leading-tight font-medium"
          style={{ backgroundColor: `${tag.color}1a`, color: tag.color }}
        >
          <span className="truncate">#{tag.label}</span>
        </span>
      ))}
      {extra > 0 && (
        <span className="text-[10px] leading-tight text-gray-300">
          +{extra}
        </span>
      )}
    </span>
  );
}
