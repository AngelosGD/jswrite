"use client";
import { Editor } from "@tiptap/react";
import { useState, useCallback } from "react";

type FormatToolBarProps = { editor: Editor | null };

export default function FormatToolbar({ editor }: FormatToolBarProps) {
  const [highlightColor, setHighlightColor] = useState("#ffff00");

  const cmd = useCallback(
    (fn: () => void) => {
      if (!editor) return;
      fn();
    },
    [editor],
  );

  if (!editor) return null;

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b border-black/5 bg-white/80 px-3 py-2 backdrop-blur-md">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleBold().run())}
        className={`rounded-lg px-2.5 py-1 text-sm transition active:scale-95 ${editor.isActive("bold") ? "bg-black/[0.07] text-gray-900" : "text-gray-500 hover:bg-black/5 hover:text-gray-800"}`}
      >
        <strong>B</strong>
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleItalic().run())}
        className={`rounded-lg px-2.5 py-1 text-sm transition active:scale-95 ${editor.isActive("italic") ? "bg-black/[0.07] text-gray-900" : "text-gray-500 hover:bg-black/5 hover:text-gray-800"}`}
      >
        <em>I</em>
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleUnderline().run())}
        className={`rounded-lg px-2.5 py-1 text-sm transition active:scale-95 ${editor.isActive("underline") ? "bg-black/[0.07] text-gray-900" : "text-gray-500 hover:bg-black/5 hover:text-gray-800"}`}
      >
        <span className="underline">U</span>
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleStrike().run())}
        className={`rounded-lg px-2.5 py-1 text-sm transition active:scale-95 ${editor.isActive("strike") ? "bg-black/[0.07] text-gray-900" : "text-gray-500 hover:bg-black/5 hover:text-gray-800"}`}
      >
        <span className="line-through">S</span>
      </button>

      <span className="mx-1.5 h-4 w-px bg-black/10" />

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleHeading({ level: 1 }).run())}
        className={`rounded-lg px-2.5 py-1 text-sm transition active:scale-95 ${editor.isActive("heading", { level: 1 }) ? "bg-black/[0.07] text-gray-900" : "text-gray-500 hover:bg-black/5 hover:text-gray-800"}`}
      >
        H1
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleHeading({ level: 2 }).run())}
        className={`rounded-lg px-2.5 py-1 text-sm transition active:scale-95 ${editor.isActive("heading", { level: 2 }) ? "bg-black/[0.07] text-gray-900" : "text-gray-500 hover:bg-black/5 hover:text-gray-800"}`}
      >
        H2
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleHeading({ level: 3 }).run())}
        className={`rounded-lg px-2.5 py-1 text-sm transition active:scale-95 ${editor.isActive("heading", { level: 3 }) ? "bg-black/[0.07] text-gray-900" : "text-gray-500 hover:bg-black/5 hover:text-gray-800"}`}
      >
        H3
      </button>

      <span className="mx-1.5 h-4 w-px bg-black/10" />

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleBulletList().run())}
        className={`rounded-lg px-2.5 py-1 text-sm transition active:scale-95 ${editor.isActive("bulletList") ? "bg-black/[0.07] text-gray-900" : "text-gray-500 hover:bg-black/5 hover:text-gray-800"}`}
      >
        • Lista
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleOrderedList().run())}
        className={`rounded-lg px-2.5 py-1 text-sm transition active:scale-95 ${editor.isActive("orderedList") ? "bg-black/[0.07] text-gray-900" : "text-gray-500 hover:bg-black/5 hover:text-gray-800"}`}
      >
        1. Lista
      </button>

      <span className="mx-1.5 h-4 w-px bg-black/10" />

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().setTextAlign("left").run())}
        className={`rounded-lg px-2.5 py-1 text-sm transition active:scale-95 ${editor.isActive({ textAlign: "left" }) ? "bg-black/[0.07] text-gray-900" : "text-gray-500 hover:bg-black/5 hover:text-gray-800"}`}
      >
        ←
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().setTextAlign("center").run())}
        className={`rounded-lg px-2.5 py-1 text-sm transition active:scale-95 ${editor.isActive({ textAlign: "center" }) ? "bg-black/[0.07] text-gray-900" : "text-gray-500 hover:bg-black/5 hover:text-gray-800"}`}
      >
        ↔
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().setTextAlign("right").run())}
        className={`rounded-lg px-2.5 py-1 text-sm transition active:scale-95 ${editor.isActive({ textAlign: "right" }) ? "bg-black/[0.07] text-gray-900" : "text-gray-500 hover:bg-black/5 hover:text-gray-800"}`}
      >
        →
      </button>

      <span className="mx-1.5 h-4 w-px bg-black/10" />

      <label className="flex items-center gap-1 text-sm text-gray-500">
        <input
          type="color"
          className="size-5 cursor-pointer border-0 bg-transparent p-0"
          value={editor.getAttributes("textStyle").color || "#000000"}
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => {
            const color = e.target.value;
            cmd(() => editor.chain().setColor(color).run());
          }}
        />
        Color
      </label>

      <div className="flex items-center gap-1">
        <input
          type="color"
          className="size-5 cursor-pointer rounded border-0 bg-transparent p-0"
          value={highlightColor}
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => {
            const color = e.target.value;
            setHighlightColor(color);
            cmd(() => editor.chain().toggleHighlight({ color }).run());
          }}
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            cmd(() => {
              if (editor.isActive("highlight")) {
                editor.chain().unsetHighlight().run();
              } else {
                editor.chain().toggleHighlight({ color: highlightColor }).run();
              }
            })
          }
          className={`rounded-lg px-2.5 py-1 text-sm transition active:scale-95 ${editor.isActive("highlight") ? "bg-black/[0.07] text-gray-900" : "text-gray-500 hover:bg-black/5 hover:text-gray-800"}`}
        >
          Resaltar
        </button>
      </div>
    </div>
  );
}