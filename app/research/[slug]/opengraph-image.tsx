import { research } from "@/data/site";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Research by Siddhant Arora";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = research.find((x) => x.slug === slug);
  return renderOg({ title: r?.title ?? "Research", subtitle: r?.subtitle ?? "", tag: r?.status });
}
