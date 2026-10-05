import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a production build run beside `next dev` without sharing .next
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  reactStrictMode: true,
  devIndicators: false,
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
