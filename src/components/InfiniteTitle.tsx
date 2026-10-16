import Image from "next/image";
import { IMAGES, type ImageKey } from "@/lib/images";

function Column({ images, hidden }: { images: ImageKey[]; hidden?: boolean }) {
  return (
    <div className="inf-wrapper" aria-hidden={hidden || undefined}>
      {images.map((k, i) => (
        <Image key={k + i} src={IMAGES[k].src} alt={hidden ? "" : IMAGES[k].alt} width={240} height={300} sizes="20vw" />
      ))}
    </div>
  );
}

/** Vertical, endlessly scrolling column of images (used in the off-canvas menu). */
export function InfiniteTitle({ images }: { images: ImageKey[] }) {
  return (
    <div className="inf-title">
      <div className="inf-track">
        <Column images={images} />
        <Column images={images} hidden />
      </div>
    </div>
  );
}
