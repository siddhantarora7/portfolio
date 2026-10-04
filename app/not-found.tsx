import Link from "next/link";
import { Bubble } from "@/components/bubble";

export default function NotFound() {
  return (
    <section className="flex min-h-[55dvh] flex-col items-center justify-center text-center">
      <Bubble size={96} mood="confused" />
      <h1 className="font-display mt-6 text-[38px] leading-tight font-semibold">this page popped</h1>
      <p className="mt-2 text-[17px] text-ink-2">Nothing lives at this address. It may have moved, or never existed.</p>
      <Link href="/" className="glass mt-8 rounded-full px-5 py-2.5 text-[15px] font-medium">
        Go home
      </Link>
    </section>
  );
}
