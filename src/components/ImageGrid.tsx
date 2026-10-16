import Image from "next/image";
import { IMAGES, type ImageKey } from "@/lib/images";
import { Lightbox } from "./Lightbox";

/** Grid of images opening in a lightbox. */
export function ImageGrid({ id, images, sizes = "(max-width: 479px) 50vw, 33vw", className = "" }: { id: string; images: readonly ImageKey[]; sizes?: string; className?: string }) {
  return (
    <>
      <ul id={id} className={`img-grid ${className}`.trim()}>
        {images.map((k, i) => {
          const im = IMAGES[k];
          return (
            <li key={k + i}>
              <figure>
                <a href={im.src.src} data-pswp-width={im.src.width} data-pswp-height={im.src.height} target="_blank" rel="noreferrer" aria-label={`Open photo: ${im.alt}`}>
                  <span className="image">
                    <Image src={im.src} alt={im.alt} sizes={sizes} placeholder="blur" />
                  </span>
                </a>
              </figure>
            </li>
          );
        })}
      </ul>
      <Lightbox gallery={`#${id}`} />
    </>
  );
}
