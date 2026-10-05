import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const mochiSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 88"><defs><radialGradient id="b" cx="38%" cy="28%" r="80%"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f8f3ee"/><stop offset="1" stop-color="#ebe1d8"/></radialGradient></defs><ellipse cx="50" cy="83" rx="36" ry="3.6" fill="rgb(45 60 40 / .14)"/><path d="M11 69C8 46 25 24 50 24C75 24 92 46 89 69C87 79 72 82 50 82C28 82 13 79 11 69Z" fill="url(#b)" stroke="#2d332e" stroke-width="2.4" stroke-linejoin="round"/><path d="M22 50c2-9 9-17 19-20" stroke="#fff" stroke-width="3.4" stroke-linecap="round" fill="none" opacity=".85"/><ellipse cx="32" cy="60" rx="5" ry="3" fill="#f6a9b9" opacity=".75"/><ellipse cx="68" cy="60" rx="5" ry="3" fill="#f6a9b9" opacity=".75"/><ellipse cx="39" cy="54" rx="3.1" ry="4" fill="#2d332e"/><ellipse cx="61" cy="54" rx="3.1" ry="4" fill="#2d332e"/><circle cx="40" cy="52.4" r="1.1" fill="#fff"/><circle cx="62" cy="52.4" r="1.1" fill="#fff"/><path d="M45 61q2.5 3 5 0q2.5 3 5 0" fill="none" stroke="#2d332e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const matchaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 88"><defs><radialGradient id="g" cx="38%" cy="28%" r="80%"><stop offset="0" stop-color="#d3e8bd"/><stop offset=".55" stop-color="#a9cd8a"/><stop offset="1" stop-color="#86b066"/></radialGradient></defs><ellipse cx="50" cy="83" rx="30" ry="3.6" fill="rgb(45 60 40 / .14)"/><path d="M17 68C13 45 29 27 50 27C71 27 87 45 83 68C81 78 69 81 50 81C31 81 19 78 17 68Z" fill="url(#g)" stroke="#2d332e" stroke-width="2.4" stroke-linejoin="round"/><path d="M27 50c1-8 7-15 15-17" stroke="#fff" stroke-width="3.4" stroke-linecap="round" fill="none" opacity=".85"/><path d="M43 28c-1-6 5-10 10-7 4 3 1 8-3 6-2-1-1-4 1-4" fill="none" stroke="#2d332e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="33" cy="61" rx="5" ry="3" fill="#f6a9b9" opacity=".75"/><ellipse cx="67" cy="61" rx="5" ry="3" fill="#f6a9b9" opacity=".75"/><path d="M36.5 56q3.5-5 7 0M56.5 56q3.5-5 7 0" fill="none" stroke="#2d332e" stroke-width="2.4" stroke-linecap="round"/><path d="M44 61q6 7 12 0z" fill="#2d332e"/></svg>`;

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
            <img src={`data:image/svg+xml,${encodeURIComponent(mochiSvg)}`} width={72} height={63} alt="" />
            <img src={`data:image/svg+xml,${encodeURIComponent(matchaSvg)}`} width={60} height={53} alt="" style={{ marginLeft: -14 }} />
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
