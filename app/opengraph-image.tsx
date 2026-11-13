import { profile } from "@/data/site";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = `${profile.name}: researcher and builder in Calgary`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    title: "AI/ML research, and things for math and CS students",
    subtitle: "Junior in Calgary. AI/ML research at Algoverse, co-founder of usamo.guide, Codeforces Expert.",
  });
}
