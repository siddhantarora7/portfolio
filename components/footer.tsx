import { links, profile } from "@/data/site";
import { MochiArt } from "./mochi/mochi-art";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* soft colour arc rising from the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 aspect-square w-[150vw] max-w-[1500px] -translate-x-1/2 rounded-full opacity-90"
        style={{
          background:
            "radial-gradient(closest-side, transparent 72%, var(--field-b) 80%, var(--field-a) 88%, transparent 99%)",
        }}
      />
      <div className="relative mx-auto flex max-w-[680px] flex-col items-center px-4 pt-6 pb-28 text-center sm:px-5">
        <div className="flex items-end gap-0.5" aria-hidden="true">
          <MochiArt kind="mochi" mood="happy" size={50} />
          <MochiArt kind="matcha" mood="happy" size={42} />
        </div>
        <p className="hand mt-3 text-[19px]">thanks for stopping by</p>
        <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[15px] text-ink-2">
          <li>
            <a className="link" href={`mailto:${links.email}`}>
              email
            </a>
          </li>
          <li>
            <a className="link" href={links.github} target="_blank" rel="noreferrer">
              github
            </a>
          </li>
          <li>
            <a className="link" href={links.linkedin} target="_blank" rel="noreferrer">
              linkedin
            </a>
          </li>
          <li>
            <a className="link" href={links.resume}>
              resume
            </a>
          </li>
        </ul>
        <p className="mt-8 text-[13px] text-ink-2">
          © {new Date().getFullYear()} {profile.name}. Made in {profile.location}.
        </p>
      </div>
    </footer>
  );
}
