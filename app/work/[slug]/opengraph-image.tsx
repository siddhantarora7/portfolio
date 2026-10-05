import { getWork, work } from "@/data/site";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Work by Siddhant Arora";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWork(slug);
  return renderOg({ title: w?.name ?? "Work", subtitle: w?.note ?? "", tag: w?.role });
}
