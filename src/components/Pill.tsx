import Image from "next/image";
import Link from "next/link";
import { IMAGES, type ImageKey } from "@/lib/images";

export function Pill({ label, italic, image, href, className = "" }: { label: string; italic?: boolean; image: ImageKey; href: string; className?: string }) {
  return (
    <Link href={href} className={`pill magnetic ${className}`.trim()} data-cursor-stick="">
      <Image src={IMAGES[image].src} alt="" width={240} height={300} sizes="240px" />
      <h3 className={`pill-title ${italic ? "is-italic" : ""}`.trim()}>{label}</h3>
    </Link>
  );
}
