import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Sky } from "@/components/sky";
import { Footer } from "@/components/footer";
import { profile } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", weight: ["600"], preload: false });
// Shantell Sans (OFL), self-hosted: variable wght 500–600 + INFM axis,
// subset to Latin. 62 KB instead of the 145 KB Google serves. See assets/fonts/README.md.
const shantell = localFont({
  src: "../assets/fonts/shantell-sans-subset.woff2",
  variable: "--font-shantell",
  weight: "500 600",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: profile.name, template: `%s · ${profile.name}` },
  description: profile.summary,
  openGraph: { type: "website", siteName: profile.name, locale: "en_CA" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1512" },
  ],
};

// Runs before paint so the saved or system theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${shantell.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="glass fixed top-3 left-3 z-[60] -translate-y-20 rounded-full px-4 py-2 text-[14px] focus:translate-y-0"
        >
          Skip to content
        </a>
        <Sky />
        <Nav />
        <main id="main" className="mx-auto w-full max-w-[680px] px-4 pt-24 sm:px-5 sm:pt-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
