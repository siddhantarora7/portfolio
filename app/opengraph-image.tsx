import { profile } from "@/data/site";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = `${profile.name}: researcher and builder in Calgary`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    title: "Research on reasoning models, and things for math and CS students",
    subtitle: "Junior in Calgary. Reasoning-model research at Algoverse, co-founder of usamo.guide, Codeforces Expert.",
  });
}
