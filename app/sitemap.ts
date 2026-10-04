import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { research } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...research.map((r) => ({ url: `${siteUrl}/research/${r.slug}`, lastModified: now, priority: 0.9 })),
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
