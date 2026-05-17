import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { hero } from "@/data/content";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${hero.name}`,
  description: hero.bio,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${fraunces.variable} antialiased`}>
        <ThemeProvider>
          <main className="mx-auto max-w-prose px-6 py-16 md:py-24">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
