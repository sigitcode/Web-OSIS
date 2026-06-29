"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";

// JoditReact wrapper for SSR safety
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || "Mulai menulis artikel...",
    height: 400,
    toolbarSticky: false,
    buttons: [
      "source", "|",
      "bold", "strikethrough", "underline", "italic", "|",
      "superscript", "subscript", "|",
      "ul", "ol", "|",
      "outdent", "indent", "|",
      "font", "fontsize", "brush", "paragraph", "|",
      "image", "video", "table", "link", "|",
      "align", "undo", "redo", "|",
      "hr", "eraser", "copyformat", "|",
      "fullsize"
    ]
  }), [placeholder]);

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent) => onChange(newContent)}
      />
    </div>
  );
}
