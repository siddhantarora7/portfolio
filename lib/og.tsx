import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const bubbleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><radialGradient id="f" cx="40%" cy="35%" r="70%"><stop offset="0%" stop-color="#fff" stop-opacity=".9"/><stop offset="60%" stop-color="#eaf4ff" stop-opacity=".45"/><stop offset="100%" stop-color="#d9ecc6" stop-opacity=".7"/></radialGradient><linearGradient id="r" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a7cb84"/><stop offset="45%" stop-color="#9cc4e4"/><stop offset="75%" stop-color="#d9c4ee"/><stop offset="100%" stop-color="#a7cb84"/></linearGradient></defs><path d="M32 5.5c15.2 0 26.8 11.4 26.8 26.6 0 15.4-11.8 26.6-27 26.6C16.8 58.7 5.2 47.6 5.2 32.3 5.2 17 16.9 5.5 32 5.5Z" fill="url(#f)" stroke="url(#r)" stroke-width="2.4"/><path d="M16.5 22.5c2-5 6.4-8.6 11.6-9.6" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/><ellipse cx="24.5" cy="32" rx="2.3" ry="2.9" fill="#1d2621"/><ellipse cx="39.5" cy="32" rx="2.3" ry="2.9" fill="#1d2621"/><path d="M28.5 40.5q3.5 2.6 7 0" stroke="#1d2621" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

export async function renderOg({ title, subtitle, tag }: { title: string; subtitle: string; tag?: string }) {
  const [display, regular] = await Promise.all([font("shantell-600.ttf"), font("geist-400.ttf")]);
  const stamp = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Edmonton",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .replace(/-/g, " ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 64,
          background:
            "radial-gradient(circle at 12% 8%, #c2dca3 0%, rgba(194,220,163,0) 46%), radial-gradient(circle at 92% 70%, #c0dcf2 0%, rgba(192,220,242,0) 50%), #f4f6f0",
          fontFamily: "Geist",
          color: "#1d2621",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 60px",
            borderRadius: 40,
            background: "rgba(255,255,255,0.55)",
            border: "2px solid rgba(255,255,255,0.9)",
            boxShadow: "0 30px 60px -30px rgba(40,70,40,0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={`data:image/svg+xml,${encodeURIComponent(bubbleSvg)}`} width={64} height={64} alt="" />
            <div style={{ fontFamily: "Shantell", fontSize: 30 }}>siddhant arora</div>
            {tag ? (
              <div
                style={{
                  marginLeft: 10,
                  padding: "6px 16px",
                  borderRadius: 999,
                  background: "#dcebc9",
                  color: "#3f6b26",
                  fontSize: 22,
                }}
              >
                {tag}
              </div>
            ) : null}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Shantell", fontSize: title.length > 34 ? 60 : 76, lineHeight: 1.05, letterSpacing: -1.5 }}>
              {title}
            </div>
            <div style={{ marginTop: 22, fontSize: 30, lineHeight: 1.35, color: "#56625b", maxWidth: 900 }}>{subtitle}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", color: "#ff7a1a", fontSize: 22, letterSpacing: 2 }}>
            {`'${stamp}`}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Shantell", data: display, weight: 600, style: "normal" },
        { name: "Geist", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
