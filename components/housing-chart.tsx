import { housingRuns } from "@/data/projects";

/** R² across the README's four test runs, drawn in the site's palette. */
export function HousingChart() {
  const W = 600;
  const H = 260;
  const pad = { l: 36, r: 16, t: 26, b: 52 };
  const bw = (W - pad.l - pad.r) / housingRuns.length;
  const y = (v: number) => pad.t + (1 - v) * (H - pad.t - pad.b);
  const parts: string[] = [];
  for (const v of [0, 0.25, 0.5, 0.75, 1]) {
    parts.push(
      `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y(v)}" y2="${y(v)}" stroke="var(--rule)"/>`,
      `<text x="${pad.l - 8}" y="${y(v) + 3.5}" font-size="11" fill="var(--ink-2)" text-anchor="end">${v.toFixed(2).replace(/^0/, "")}</text>`,
    );
  }
  housingRuns.forEach((r, i) => {
    const cx = pad.l + bw * i + bw / 2;
    const w = bw * 0.46;
    parts.push(
      `<rect x="${(cx - w / 2).toFixed(1)}" y="${y(r.r2Dollars).toFixed(1)}" width="${w.toFixed(1)}" height="${(y(0) - y(r.r2Dollars)).toFixed(1)}" rx="6" fill="var(--matcha)" fill-opacity="${(0.45 + 0.55 * r.r2Dollars).toFixed(2)}"><title>${r.label}: R² ${r.r2Dollars} in dollars</title></rect>`,
      `<text x="${cx.toFixed(1)}" y="${(y(r.r2Dollars) - 8).toFixed(1)}" font-size="13" font-weight="600" fill="var(--ink)" text-anchor="middle">${r.r2Dollars.toFixed(2)}</text>`,
      `<text x="${cx.toFixed(1)}" y="${H - pad.b + 18}" font-size="12" fill="var(--ink)" text-anchor="middle">${r.label}</text>`,
      `<text x="${cx.toFixed(1)}" y="${H - pad.b + 33}" font-size="11" fill="var(--ink-2)" text-anchor="middle">${r.note}</text>`,
    );
    if (r.r2Log) {
      parts.push(
        `<circle cx="${cx.toFixed(1)}" cy="${y(r.r2Log).toFixed(1)}" r="4.5" fill="var(--sky)" stroke="var(--ground)" stroke-width="1.5"><title>${r.label}: R² ${r.r2Log} in log space</title></circle>`,
      );
    }
  });
  parts.push(
    `<text x="${(pad.l + bw * 1.5 + 10).toFixed(1)}" y="${(y(0.986) - 9).toFixed(1)}" font-size="13" fill="var(--sky-ink)" style="font-family: var(--font-display); font-variation-settings: 'INFM' 100">log space ≈ .99</text>`,
  );

  return (
    <figure className="glass m-0 rounded-[26px] p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-[19px] font-semibold">How the model improved, run by run</p>
        <p className="mt-1.5 text-[14.5px] text-ink-2">
          Test-set R². Bars are in dollars; dots are in log space. From the repo&apos;s README.
        </p>
      </figcaption>
      <div className="dot-grid mt-6 rounded-[14px] border border-rule p-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="R squared in dollars rose from 0.19 to 0.87 across four runs; in log space it stayed near 0.99."
          dangerouslySetInnerHTML={{ __html: parts.join("") }}
        />
      </div>
    </figure>
  );
}
