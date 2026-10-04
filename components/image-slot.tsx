import Image from "next/image";
import type { ProjectImage } from "@/data/projects";
import { showTodos } from "@/data/todo";
import { LedStamp } from "./led-stamp";

/**
 * A photo frame with faint scanlines and a film date stamp. Until a real
 * image is set, dev and preview builds show a labelled placeholder saying
 * which file to add; production renders nothing.
 */
export function ImageSlot({
  image,
  path,
  ratio = "16 / 10",
  sizes = "(min-width: 768px) 640px, 100vw",
  priority = false,
  stamp = true,
  rounded = "rounded-[18px]",
  variant = 0,
  coverSize = "text-[clamp(22px,4vw,34px)]",
}: {
  image: ProjectImage;
  /** Kept for callers; the placeholder describes the image instead. */
  title?: string;
  path: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  stamp?: boolean;
  rounded?: string;
  variant?: number;
  coverSize?: string;
}) {
  if (!image.src && !showTodos) return null;
  const covers = [
    "radial-gradient(120% 90% at 15% 10%, var(--field-a), transparent 60%), radial-gradient(90% 90% at 90% 90%, var(--field-b), transparent 60%)",
    "radial-gradient(110% 90% at 85% 15%, var(--field-b), transparent 60%), radial-gradient(90% 90% at 10% 95%, var(--field-a), transparent 60%)",
  ];

  return (
    <figure className="m-0">
      <div
        className={`scanlines relative overflow-hidden border border-rule ${rounded}`}
        style={{ aspectRatio: ratio, background: image.src ? undefined : `${covers[variant % 2]}, var(--glass-strong)` }}
      >
        {image.src ? (
          <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6" role="img" aria-label={image.alt}>
            <span className={`hand max-w-[22ch] text-center leading-[1.2] text-balance text-ink-2 ${coverSize}`}>
              image: {image.alt.toLowerCase()}
            </span>
            <span className="hand absolute bottom-2.5 left-3.5 max-w-[80%] truncate text-[12px] text-ink-2">
              add to {path}
            </span>
          </div>
        )}
        {stamp ? <LedStamp className="absolute right-4 bottom-3.5" /> : null}
      </div>
      {image.caption ? <figcaption className="mt-2.5 text-[14px] text-ink-2">{image.caption}</figcaption> : null}
    </figure>
  );
}
