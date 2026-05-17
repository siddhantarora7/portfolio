import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        prose: "880px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        accent: "var(--accent)",
        primary: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
