"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";

/** Pill button where a beige circle expands from the point the pointer entered. */
export function AnysideButton({ href, children, className = "" }: { href: string; children: string; className?: string }) {
  const circle = useRef<HTMLDivElement>(null);
  const place = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = circle.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.style.width = `${rect.width * 3}px`;
    el.style.height = `${rect.height * 3}px`;
    el.style.left = `${e.clientX - rect.left}px`;
    el.style.top = `${e.clientY - rect.top}px`;
  };
  return (
    <Link href={href} className={`anyside magnetic ${className}`.trim()} data-cursor-stick="" onMouseEnter={place} onMouseLeave={place}>
      <span className="anyside-title">{children}</span>
      <div ref={circle} className="anyside-div" aria-hidden="true" />
    </Link>
  );
}
