import Image from "next/image";
import type { Shot } from "@/data/site";
import { LedStamp } from "./led-stamp";

/** A screenshot in a glass frame, like a print with a film date stamp. */
export function ShotFrame({
  shot,
  priority = false,
  stamp = false,
  ratio,
  framed = true,
}: {
  shot: Shot;
  priority?: boolean;
  stamp?: boolean;
  ratio?: string;
  framed?: boolean;
}) {
  const img = (
    <div className="relative overflow-hidden rounded-[16px] border border-rule" style={{ aspectRatio: ratio ?? shot.ratio ?? "16 / 10" }}>
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        priority={priority}
        sizes="(min-width: 768px) 680px, 100vw"
        className="object-cover object-top"
      />
      {stamp ? <LedStamp className="absolute right-4 bottom-3.5" /> : null}
    </div>
  );
  return (
    <figure className="m-0">
      {framed ? <div className="glass rounded-[24px] p-2.5">{img}</div> : img}
      {shot.caption ? <figcaption className="hand mt-3 px-1 text-[15px] text-ink-2">{shot.caption}</figcaption> : null}
    </figure>
  );
}
