"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

type FileDropProps = {
  title: string;
  hint?: string;
  badge?: string;
  accept?: string;
  disabled?: boolean;
  fileName?: string | null;
  onFiles?: (files: File[]) => void;
};

export default function FileDrop({
  title,
  hint,
  badge,
  accept,
  disabled = false,
  fileName,
  onFiles,
}: FileDropProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0 || disabled) return;
    onFiles?.(Array.from(files));
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
    event.target.value = "";
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(event) => {
        if (disabled) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`group flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-6 py-7 text-center transition duration-200 ${
        disabled
          ? "cursor-not-allowed border-border bg-surface-2/60"
          : "cursor-pointer border-border-strong bg-surface-2/40 hover:border-blue-border hover:bg-blue-bg/30"
      } ${dragging ? "border-brand bg-blue-bg" : ""}`}
    >
      <span
        className={`transition ${
          disabled
            ? "text-text-3"
            : "text-text-3 group-hover:text-blue-ink"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="size-7"
        >
          <path d="M12 16.5V9.75m0 0 3 3m-3-3-3 3" />
          <path d="M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
        </svg>
      </span>

      <span className="text-sm font-medium text-text">{title}</span>
      {hint && <span className="text-xs text-text-3">{hint}</span>}

      {fileName ? (
        <span className="mt-1 inline-flex max-w-full items-center gap-1.5 truncate rounded-full border border-blue-border bg-blue-bg px-2.5 py-1 text-[11px] font-medium text-blue-ink">
          {fileName}
        </span>
      ) : badge ? (
        <span className="mt-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-3">
          {badge}
        </span>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
}
