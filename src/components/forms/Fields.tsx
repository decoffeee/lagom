"use client";

import { useState, type ChangeEvent } from "react";

/** Native date input that shows a placeholder-like label until a value is picked. */
export function DateField({ name, placeholder, required }: { name: string; placeholder: string; required?: boolean }) {
  const [empty, setEmpty] = useState(true);
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      required={required}
      className={empty ? "date-empty" : undefined}
      aria-label={placeholder}
      onFocus={(e) => {
        e.currentTarget.min = new Date().toISOString().slice(0, 10);
        e.currentTarget.type = "date";
      }}
      onBlur={(e) => {
        if (!e.currentTarget.value) e.currentTarget.type = "text";
      }}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setEmpty(!e.currentTarget.value)}
    />
  );
}

export function SelectField({ name, placeholder, options, required }: { name: string; placeholder: string; options: readonly string[]; required?: boolean }) {
  const [empty, setEmpty] = useState(true);
  return (
    <select name={name} required={required} defaultValue="" className={empty ? "is-placeholder" : undefined} aria-label={placeholder} onChange={(e) => setEmpty(!e.currentTarget.value)}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
