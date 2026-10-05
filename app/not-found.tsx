import Link from "next/link";
import { MochiArt } from "@/components/mochi/mochi-art";

export default function NotFound() {
  return (
    <section className="flex min-h-[55dvh] flex-col items-center justify-center text-center">
      <span aria-hidden="true" className="block origin-bottom scale-x-125 scale-y-[0.55]">
        <MochiArt mood="dizzy" size={110} jetpack />
      </span>
      <h1 className="font-display mt-6 text-[38px] leading-tight font-semibold">this page got squished</h1>
      <p className="mt-2 max-w-[42ch] text-[17px] text-ink-2">
        Mochi flew into a wall. Nothing lives at this address; it may have moved, or never existed.
      </p>
      <Link href="/" className="glass mt-8 rounded-full px-5 py-2.5 text-[15px] font-medium">
        Go home
      </Link>
    </section>
  );
}
