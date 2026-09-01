"use client";
import { Editor } from "@tiptap/react";
import "@tiptap/extension-bold";
import "@tiptap/extension-italic";
import "@tiptap/extension-underline";
import "@tiptap/extension-strike";
import "@tiptap/extension-heading";
import "@tiptap/extension-bullet-list";
import "@tiptap/extension-ordered-list";
import "@tiptap/extension-text-align";
import "@tiptap/extension-color";
import "@tiptap/extension-highlight";

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
      onClick={onClick}
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
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-0.5">
      {/* boton para bold mode */}
      <Btn
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <strong>B</strong>
      </Btn>

      {/* boton para italic */}
      <Btn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <em>I</em>
      </Btn>

      {/* boton para underline */}
      <Btn
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
      >
        <span className="underline">U</span>
      </Btn>

      {/* boton para strike throught (linea en medio del texto) */}
      <Btn
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
      >
        <span className="line-through">S</span>
      </Btn>

      <Sep />
      {/* tipo de headings 1-3 */}
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

      {/* lists - tipos de listas */}
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

      {/* alignment  donde se alinea el texto */}
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

      {/* resaltar o cambiar de color el texto D: */}
      <label className="flex items-center gap-1 text-sm text-gray-500">
        <input
          type="color"
          className="size-5 cursor-pointer border-0 bg-transparent p-0"
          value={editor.getAttributes("textStyle").color || "#000000"}
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />
        Color
      </label>

      {/* highlight */}
      <Btn
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        active={editor.isActive("highlight")}
      >
        Resaltar
      </Btn>
    </div>
  );
};
