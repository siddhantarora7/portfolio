import { getProject, projects } from "@/data/projects";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Project by Siddhant Arora";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return renderOg({ title: p?.name ?? "Project", subtitle: p?.tagline ?? "", tag: p?.result ?? p?.year });
}
