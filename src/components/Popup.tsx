"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { lockScroll } from "@/lib/lenis";

/** Accessible modal shell: backdrop, ESC + click-outside to close, scroll lock. */
export function Popup({ open, onClose, variant, label, children }: { open: boolean; onClose: () => void; variant: "photos" | "amen"; label: string; children: ReactNode }) {
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    content.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, onClose]);

  if (!open) return null;
  // Portal to <body> so the popup escapes <main>'s stacking context (the fixed header sits above main).
  return createPortal(
    <div className={`popup popup--${variant}`} role="dialog" aria-modal="true" aria-label={label}>
      <div className="popup-backdrop" onClick={onClose} />
      <div ref={content} className="popup-content" data-lenis-prevent tabIndex={-1}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
