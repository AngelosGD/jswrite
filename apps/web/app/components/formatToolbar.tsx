"use client";
import { Editor } from "@tiptap/react";
import { useState } from "react";

type FormatToolBarProps = { editor: Editor | null };

const Btn = ({
  onClick,
  active = false,
  disabled = false,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        requestAnimationFrame(() => onClick());
      }}
      disabled={disabled}
      className={`rounded px-2 py-1 text-sm transition ${
        active
          ? "bg-gray-200 text-gray-900"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
    >
      {children}
    </button>
  );
};

const Sep = () => {
  return <span className="mx-1 text-gray-200">|</span>;
};

export default function FormatToolbar({ editor }: FormatToolBarProps) {
  const [highlightColor, setHighlightColor] = useState("#ffff00");

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-0.5">
      <Btn
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <strong>B</strong>
      </Btn>

      <Btn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <em>I</em>
      </Btn>

      <Btn
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
      >
        <span className="underline">U</span>
      </Btn>

      <Btn
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
      >
        <span className="line-through">S</span>
      </Btn>

      <Sep />

      <Btn
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive("heading", { level: 1 })}
      >
        H1
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
      >
        H2
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
      >
        H3
      </Btn>

      <Sep />

      <Btn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      >
        • Lista
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
      >
        1. Lista
      </Btn>

      <Sep />

      <Btn
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        active={editor.isActive({ textAlign: "left" })}
      >
        ←
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        active={editor.isActive({ textAlign: "center" })}
      >
        ↔
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        active={editor.isActive({ textAlign: "right" })}
      >
        →
      </Btn>

      <Sep />

      <label className="flex items-center gap-1 text-sm text-gray-500">
        <input
          type="color"
          className="size-5 cursor-pointer border-0 bg-transparent p-0"
          value={editor.getAttributes("textStyle").color || "#000000"}
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => {
            const color = e.target.value;
            requestAnimationFrame(() => {
              editor.chain().focus().setColor(color).run();
            });
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
            setHighlightColor(e.target.value);
            requestAnimationFrame(() => {
              editor.chain().focus().toggleHighlight({ color: e.target.value }).run();
            });
          }}
        />
        <Btn
          onClick={() => {
            if (editor.isActive("highlight")) {
              editor.chain().focus().unsetHighlight().run();
            } else {
              editor.chain().focus().toggleHighlight({ color: highlightColor }).run();
            }
          }}
          active={editor.isActive("highlight")}
        >
          Resaltar
        </Btn>
      </div>
    </div>
  );
}