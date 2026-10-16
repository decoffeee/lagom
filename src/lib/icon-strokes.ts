/** Simple stroke-based icons (24x24) for amenities that have no icon in the fill set. */
export const STROKE_ICONS = {
  car: ["M3 14l1.6-4.8A2 2 0 0 1 6.5 8h11a2 2 0 0 1 1.9 1.2L21 14v5h-2.5v-2h-13v2H3v-5z", "M3 14h18", "M7 16.5h.01M17 16.5h.01"],
  parking: ["M5 3h14v18H5z", "M9.5 16.5V7.5h3.5a2.5 2.5 0 0 1 0 5H9.5"],
  laptop: ["M4 6h16v10H4z", "M2 18.5h20"],
  bell: ["M4.5 17h15", "M6 17a6 6 0 0 1 12 0", "M12 11V9", "M3 20h18"],
  "touch-switch": ["M7 8h10a4 4 0 0 1 0 8H7a4 4 0 0 1 0-8z", "M17 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"],
  bottle: ["M10 3h4v3l1.5 2v12a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V8L10 6V3z", "M8.5 11h7"],
  luggage: ["M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", "M4 7h16v12H4z", "M9 7v12M15 7v12"],
  towel: ["M6 4h12v16H6z", "M6 9h12", "M9.5 4v5"],
  curtains: ["M3 4h18", "M5 4v14c3-2 4.5-6 4.5-14", "M19 4v14c-3-2-4.5-6-4.5-14", "M8 19h8"],
  bathtub: ["M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3z", "M6 12V6a2 2 0 0 1 4 0", "M8 19v2M16 19v2"],
  bidet: ["M5 10h14a7 7 0 0 1-7 7 7 7 0 0 1-7-7z", "M12 17v4", "M12 4v3"],
} as const;

export type StrokeIconName = keyof typeof STROKE_ICONS;
