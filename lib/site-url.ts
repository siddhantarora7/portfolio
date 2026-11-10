// The canonical address. Production is siddhantarora.ink; previews use their
// own deployment URL; local dev uses localhost. NEXT_PUBLIC_SITE_URL overrides.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production"
    ? "https://siddhantarora.ink"
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
