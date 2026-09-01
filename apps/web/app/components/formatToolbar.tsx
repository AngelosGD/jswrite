"use client";
import { Editor } from "@tiptap/react";
import { useState, useCallback } from "react";

type FormatToolBarProps = { editor: Editor | null };

export default function FormatToolbar({ editor }: FormatToolBarProps) {
  const [highlightColor, setHighlightColor] = useState("#ffff00");

  const cmd = useCallback(
    (fn: () => void) => {
      if (!editor) return;
      requestAnimationFrame(() => {
        editor.view.focus();
        fn();
      });
    },
    [editor],
  );

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleBold().run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("bold") ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        <strong>B</strong>
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleItalic().run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("italic") ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        <em>I</em>
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleUnderline().run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("underline") ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        <span className="underline">U</span>
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleStrike().run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("strike") ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        <span className="line-through">S</span>
      </button>

      <span className="mx-1 text-gray-200">|</span>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleHeading({ level: 1 }).run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        H1
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleHeading({ level: 2 }).run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        H2
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleHeading({ level: 3 }).run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        H3
      </button>

      <span className="mx-1 text-gray-200">|</span>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleBulletList().run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("bulletList") ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        • Lista
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().toggleOrderedList().run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("orderedList") ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        1. Lista
      </button>

      <span className="mx-1 text-gray-200">|</span>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().setTextAlign("left").run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive({ textAlign: "left" }) ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        ←
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().setTextAlign("center").run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive({ textAlign: "center" }) ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        ↔
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => cmd(() => editor.chain().setTextAlign("right").run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive({ textAlign: "right" }) ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        →
      </button>

      <span className="mx-1 text-gray-200">|</span>

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
          className={`rounded px-2 py-1 text-sm transition ${editor.isActive("highlight") ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
        >
          Resaltar
        </button>
      </div>
    </div>
  );
}