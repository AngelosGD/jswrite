"use client";
import { Editor } from "@tiptap/react";
import { useState } from "react";

type FormatToolBarProps = { editor: Editor | null };

export default function FormatToolbar({ editor }: FormatToolBarProps) {
  const [highlightColor, setHighlightColor] = useState("#ffff00");

  if (!editor) return null;

  const run = (cmd: () => void) => {
    cmd();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run(() => editor.chain().focus().toggleBold().run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("bold") ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        <strong>B</strong>
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run(() => editor.chain().focus().toggleItalic().run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("italic") ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        <em>I</em>
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run(() => editor.chain().focus().toggleUnderline().run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("underline") ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        <span className="underline">U</span>
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run(() => editor.chain().focus().toggleStrike().run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("strike") ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        <span className="line-through">S</span>
      </button>

      <span className="mx-1 text-gray-200">|</span>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        H1
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        H2
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run(() => editor.chain().focus().toggleHeading({ level: 3 }).run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        H3
      </button>

      <span className="mx-1 text-gray-200">|</span>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run(() => editor.chain().focus().toggleBulletList().run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("bulletList") ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        • Lista
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run(() => editor.chain().focus().toggleOrderedList().run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive("orderedList") ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        1. Lista
      </button>

      <span className="mx-1 text-gray-200">|</span>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run(() => editor.chain().focus().setTextAlign("left").run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive({ textAlign: "left" }) ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        ←
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run(() => editor.chain().focus().setTextAlign("center").run())}
        className={`rounded px-2 py-1 text-sm transition ${editor.isActive({ textAlign: "center" }) ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
      >
        ↔
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => run(() => editor.chain().focus().setTextAlign("right").run())}
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
            run(() => editor.chain().focus().setColor(color).run());
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
            run(() => editor.chain().focus().toggleHighlight({ color }).run());
          }}
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run(() => {
              if (editor.isActive("highlight")) {
                editor.chain().focus().unsetHighlight().run();
              } else {
                editor.chain().focus().toggleHighlight({ color: highlightColor }).run();
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