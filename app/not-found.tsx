import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

const linkClass =
  "underline underline-offset-4 decoration-[color:var(--rule)] hover:decoration-current transition-colors";

export default function NotFound() {
  return (
    <div>
      <SectionHeader>Not found</SectionHeader>
      <p className="mt-2 text-[color:var(--muted)]">
        that page doesn&apos;t exist.
      </p>
      <p className="mt-6">
        <Link href="/" className={linkClass}>
          ← back home
        </Link>
      </p>
    </div>
  );
}
