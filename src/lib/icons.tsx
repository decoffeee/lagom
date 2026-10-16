import { ICONS, type IconName as FillIconName } from "./icon-paths";
import { STROKE_ICONS, type StrokeIconName } from "./icon-strokes";

export type IconName = FillIconName | StrokeIconName;

export function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  if (name in STROKE_ICONS) {
    const paths = STROKE_ICONS[name as StrokeIconName];
    return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" role="presentation" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", height: size, width: size }}>
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    );
  }
  const def = ICONS[name as FillIconName];
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={def.viewBox}
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{ display: "block", height: size, width: size, fill: "currentcolor" }}
    >
      {def.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22C10.1671 22 8.44851 21.5064 6.97086 20.6447L2.00516 22L3.35712 17.0315C2.49494 15.5536 2.00098 13.8345 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2ZM8.59339 7.30019L8.39232 7.30833C8.26293 7.31742 8.13607 7.34902 8.02057 7.40811C7.93392 7.45244 7.85348 7.51651 7.72709 7.63586C7.60774 7.74855 7.53857 7.84697 7.46569 7.94186C7.09599 8.4232 6.89729 9.01405 6.90098 9.62098C6.90299 10.1116 7.03043 10.5884 7.23169 11.0336C7.63982 11.9364 8.31288 12.8908 9.20194 13.7759C9.4155 13.9885 9.62473 14.2034 9.85034 14.402C10.9538 15.3736 12.2688 16.0742 13.6907 16.4482C13.6907 16.4482 14.2507 16.5342 14.2589 16.5347C14.4444 16.5447 14.6296 16.5313 14.8153 16.5218C15.1066 16.5068 15.391 16.428 15.6484 16.2909C15.8139 16.2028 15.8922 16.159 16.0311 16.0714C16.0311 16.0714 16.0737 16.0426 16.1559 15.9814C16.2909 15.8808 16.3743 15.81 16.4866 15.6934C16.5694 15.6074 16.6406 15.5058 16.6956 15.3913C16.7738 15.2281 16.8525 14.9166 16.8838 14.6579C16.9077 14.4603 16.9005 14.3523 16.8979 14.2854C16.8936 14.1778 16.8047 14.0671 16.7073 14.0201L16.1258 13.7587C16.1258 13.7587 15.2563 13.3803 14.7245 13.1377C14.6691 13.1124 14.6085 13.1007 14.5476 13.097C14.4142 13.0888 14.2647 13.1236 14.1696 13.2238C14.1646 13.2218 14.0984 13.279 13.3749 14.1555C13.335 14.2032 13.2415 14.3069 13.0798 14.2972C13.0554 14.2955 13.0311 14.292 13.0074 14.2858C12.9419 14.2685 12.8781 14.2457 12.8157 14.2193C12.692 14.1668 12.6486 14.1469 12.5641 14.1105C11.9868 13.8583 11.457 13.5209 10.9887 13.108C10.8631 12.9974 10.7463 12.8783 10.6259 12.7616C10.2057 12.3543 9.86169 11.9211 9.60577 11.4938C9.5918 11.4705 9.57027 11.4368 9.54708 11.3991C9.50521 11.331 9.45903 11.25 9.44455 11.1944C9.40738 11.0473 9.50599 10.9291 9.50599 10.9291C9.50599 10.9291 9.74939 10.663 9.86248 10.5183C9.97128 10.379 10.0652 10.2428 10.125 10.1457C10.2428 9.95633 10.2801 9.76062 10.2182 9.60963C9.93764 8.92565 9.64818 8.24536 9.34986 7.56894C9.29098 7.43545 9.11585 7.33846 8.95659 7.32007C8.90265 7.31384 8.84875 7.30758 8.79459 7.30402C8.66053 7.29748 8.5262 7.29892 8.39232 7.30833L8.59339 7.30019Z" />
    </svg>
  );
}

export function CloseIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function GridIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="7.5" height="7.5" rx="1" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1" />
    </svg>
  );
}

export function PlayIcon({ size = 80 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l12-7.5z" />
    </svg>
  );
}

export function LaurelIcon({ flip = false, size = 22 }: { flip?: boolean; size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M27.5 2c.3 3.2-.6 6-2.5 8.1 1.6.5 2.8 1.4 3.6 2.7-2.6 1.2-5.1 1.1-7.3-.2-.2 2.4-1.3 4.4-3.1 5.9 2 .7 3.4 2.2 4.1 4.2-2.9.5-5.4-.3-7.3-2.2-1 2.5-2.8 4.3-5.4 5.3.4 2.2 1.6 4 3.5 5.2-3 1.3-5.9 1-8.4-1 .5-2.2 1.9-3.9 3.9-4.9-1.1-2.3-1.1-4.7.2-7-2.1-.9-3.6-2.5-4.4-4.6 2.8-.8 5.3-.3 7.4 1.4.3-2.4 1.4-4.5 3.3-6-2-1-3.4-2.6-4.1-4.7 3-.5 5.5.4 7.5 2.5.8-2.3 2.4-4 4.7-5.1 1.5 1.9 2.1 4 1.8 6.3 1.4-1.4 2.2-3.4 2.5-5.9z" />
    </svg>
  );
}
