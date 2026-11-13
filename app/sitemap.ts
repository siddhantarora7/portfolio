import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
