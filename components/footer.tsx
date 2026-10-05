import { links, profile } from "@/data/site";
import { LinksDock } from "./links-dock";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* soft colour arc rising from the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 aspect-square w-[150vw] max-w-[1500px] -translate-x-1/2 rounded-full opacity-90"
        style={{
          background:
            "radial-gradient(closest-side, transparent 70%, var(--field-a) 84%, transparent 99%)",
        }}
      />
      <div className="relative mx-auto flex max-w-[680px] flex-col items-center px-4 pt-6 pb-28 text-center sm:px-5">
        <span data-mochi-rest aria-hidden="true" className="block h-[64px] w-[80px]" />
        <p className="hand mt-3 text-[19px]">thanks for stopping by</p>
        <LinksDock className="mt-6 justify-center" />
        <p className="mt-8 text-[13px] text-ink-2">
          © {new Date().getFullYear()} {profile.name}. Made in {profile.location}.
        </p>
      </div>
    </footer>
  );
}
