import type { Research } from "@/data/site";

const XS = [128, 256, 512, 1024, 2048, 4096];
const LO = 0.4;
const HI = 0.9;
const W = 680;
const H = 330;
const pad = { l: 40, r: 150, t: 22, b: 44 };
const hand = `style="font-family: var(--font-display); font-variation-settings: 'INFM' 100"`;
const f2 = (n: number) => n.toFixed(2).replace(/^0/, "");

/**
 * The paper's main figure, trimmed to what carries the argument and drawn
 * in the site's own palette. Server-rendered SVG string (nothing to hydrate).
 */
export function RecoverabilityChart({ r }: { r: Research }) {
  const c = r.chart;
  const plotR = W - pad.r;
  const lastX = W - 96;
  const x = (t: number) => pad.l + (XS.indexOf(t) / (XS.length - 1)) * (plotR - pad.l);
  const y = (v: number) => pad.t + (1 - (v - LO) / (HI - LO)) * (H - pad.t - pad.b);
  const path = (pts: { tokens: number; auroc: number }[]) =>
    pts.map((p, i) => `${i ? "L" : "M"}${x(p.tokens).toFixed(1)},${y(p.auroc).toFixed(1)}`).join(" ");

  const band =
    c.ceiling.map((p) => `${x(p.tokens).toFixed(1)},${y(p.hi).toFixed(1)}`).join(" ") +
    " " +
    [...c.ceiling]
      .reverse()
      .map((p) => `${x(p.tokens).toFixed(1)},${y(p.lo).toFixed(1)}`)
      .join(" ");

  const end = c.ceiling[c.ceiling.length - 1];
  const probeEnd = c.probeSame[c.probeSame.length - 1];
  const gap = c.gaps[c.gaps.length - 1];

  const svg = [
    // grid
    ...[0.5, 0.6, 0.7, 0.8, 0.9].map(
      (v) =>
        `<line x1="${pad.l}" x2="${lastX + 18}" y1="${y(v)}" y2="${y(v)}" stroke="var(--rule)" ${v === 0.5 ? 'stroke-dasharray="4 5" stroke="var(--ink-2)" stroke-opacity="0.55"' : ""}/>` +
        `<text x="${pad.l - 8}" y="${(y(v) + 3.5).toFixed(1)}" font-size="11" fill="var(--ink-2)" text-anchor="end">${f2(v)}</text>`,
    ),
    `<text x="${pad.l + 4}" y="${(y(0.5) + 15).toFixed(1)}" font-size="13" fill="var(--ink-2)" ${hand}>chance</text>`,
    // x axis
    ...XS.map(
      (t) =>
        `<text x="${x(t).toFixed(1)}" y="${H - pad.b + 18}" font-size="11" fill="var(--ink-2)" text-anchor="middle">${t.toLocaleString("en-CA")}</text>`,
    ),
    `<text x="${lastX}" y="${H - pad.b + 18}" font-size="11" fill="var(--ink-2)" text-anchor="middle">last token</text>`,
    `<text x="${((pad.l + plotR) / 2).toFixed(1)}" y="${H - 6}" font-size="11.5" fill="var(--ink-2)" text-anchor="middle">tokens into the reasoning trace</text>`,
    `<line x1="${(plotR + 24).toFixed(1)}" x2="${(plotR + 24).toFixed(1)}" y1="${pad.t}" y2="${H - pad.b}" stroke="var(--rule)"/>`,

    // ceiling band + line
    `<polygon points="${band}" fill="var(--matcha)" fill-opacity="0.14"/>`,
    // strict-sweep probe (faint)
    `<path d="${path(c.probeStrict)}" fill="none" stroke="var(--ink-2)" stroke-opacity="0.6" stroke-width="1.6" stroke-dasharray="4 4"/>`,
    ...c.probeStrict.map(
      (p) =>
        `<rect x="${(x(p.tokens) - 2.5).toFixed(1)}" y="${(y(p.auroc) - 2.5).toFixed(1)}" width="5" height="5" fill="var(--ground)" stroke="var(--ink-2)" stroke-width="1.2"><title>Probe, strict sweep, ${p.tokens} tokens: ${p.auroc.toFixed(3)}</title></rect>`,
    ),
    // probe on same prefixes
    `<path d="${path(c.probeSame)}" fill="none" stroke="var(--sky)" stroke-width="2.6" stroke-linecap="round"/>`,
    ...c.probeSame.map(
      (p) =>
        `<circle cx="${x(p.tokens).toFixed(1)}" cy="${y(p.auroc).toFixed(1)}" r="4.6" fill="var(--sky)" stroke="var(--ground)" stroke-width="1.6"><title>Probe, same prefixes, ${p.tokens} tokens: ${p.auroc.toFixed(2)}</title></circle>`,
    ),
    `<path d="${path(c.ceiling)}" fill="none" stroke="var(--matcha)" stroke-width="3" stroke-linecap="round"/>`,
    ...c.ceiling.map(
      (p) =>
        `<circle cx="${x(p.tokens).toFixed(1)}" cy="${y(p.auroc).toFixed(1)}" r="5.4" fill="var(--matcha)" stroke="var(--ground)" stroke-width="1.8"><title>Recoverability, ${p.tokens} tokens: ${p.auroc.toFixed(3)} [${p.lo}, ${p.hi}]</title></circle>`,
    ),

    // direct labels
    `<text x="${(x(end.tokens) - 10).toFixed(1)}" y="${(y(end.auroc) - 12).toFixed(1)}" font-size="14" fill="var(--matcha-deep)" text-anchor="end" ${hand}>re-rolling the prefix</text>`,
    `<text x="${(x(probeEnd.tokens) + 12).toFixed(1)}" y="${(y(probeEnd.auroc) - 2).toFixed(1)}" font-size="14" fill="var(--ink)" ${hand}>probe</text>`,
    `<text x="${(x(128) + 4).toFixed(1)}" y="${(y(0.549) - 10).toFixed(1)}" font-size="12.5" fill="var(--ink-2)" ${hand}>probe, strict sweep</text>`,

    // gap bracket at the last prefix
    `<line x1="${(x(gap.tokens) - 14).toFixed(1)}" x2="${(x(gap.tokens) - 14).toFixed(1)}" y1="${(y(end.auroc) + 6).toFixed(1)}" y2="${(y(probeEnd.auroc) - 6).toFixed(1)}" stroke="var(--matcha-deep)" stroke-width="1.4"/>`,
    `<text x="${(x(gap.tokens) - 20).toFixed(1)}" y="${((y(end.auroc) + y(probeEnd.auroc)) / 2 + 5).toFixed(1)}" font-size="15" fill="var(--matcha-deep)" text-anchor="end" ${hand}>+${f2(gap.gap)}</text>`,

    // last token: probe vs length
    `<path d="M${lastX} ${(y(c.lastToken.probe) - 6.5).toFixed(1)}l6.5 6.5-6.5 6.5-6.5-6.5z" fill="var(--sky)" stroke="var(--ground)" stroke-width="1.4"><title>Probe at the last token: ${c.lastToken.probe}</title></path>`,
    `<path d="M${lastX} ${(y(c.lastToken.length) - 5.5).toFixed(1)}l6 10.5h-12z" fill="var(--ink-2)"><title>Length baseline at the last token: ${c.lastToken.length}</title></path>`,
    `<text x="${lastX + 12}" y="${(y(c.lastToken.probe) - 3).toFixed(1)}" font-size="12.5" fill="var(--ink)" ${hand}>probe ${f2(c.lastToken.probe)}</text>`,
    `<text x="${lastX + 12}" y="${(y(c.lastToken.length) + 13).toFixed(1)}" font-size="12.5" fill="var(--ink-2)" ${hand}>length ${f2(c.lastToken.length)}</text>`,
  ].join("");

  return (
    <figure className="glass m-0 rounded-[26px] p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-[19px] font-semibold text-balance">
          Can you tell, mid-trace, whether the answer will be right?
        </p>
        <p className="mt-1.5 max-w-[60ch] text-[14.5px] text-ink-2">
          Within-problem AUROC (0.5 is a coin flip). The shaded band is the 95% interval for re-rolling. {r.model} on{" "}
          {r.dataset}.
        </p>
      </figcaption>
      <div className="dot-grid -mx-1 mt-6 overflow-x-auto rounded-[14px] border border-rule px-1 pt-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full min-w-[580px]"
          role="img"
          aria-label={`Re-rolling the prefix reaches ${end.auroc.toFixed(2)} AUROC at ${end.tokens} tokens, versus ${probeEnd.auroc.toFixed(2)} for the probe on the same prefixes; the strict-sweep probe stays near chance at every position. At the last token, the probe scores ${c.lastToken.probe} and trace length alone scores ${c.lastToken.length}.`}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
      <ul className="mt-4 space-y-1.5 text-[13px] leading-[1.5] text-ink-2">
        {c.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
        <li>
          Last token: the probe beats length by +{f2(c.lastToken.diff)} [{c.lastToken.lo}, +{f2(c.lastToken.hi)}], which
          is not significant.
        </li>
      </ul>
    </figure>
  );
}

/** A tiny version for the home page tile: ceiling vs probe, nothing else. */
export function RecoverabilitySpark({ r }: { r: Research }) {
  const c = r.chart;
  const W2 = 160;
  const H2 = 64;
  const xs = c.ceiling.map((p) => p.tokens);
  const x = (t: number) => 6 + (xs.indexOf(t) / (xs.length - 1)) * (W2 - 12);
  const y = (v: number) => 6 + (1 - (v - 0.45) / (0.87 - 0.45)) * (H2 - 12);
  const line = (pts: { tokens: number; auroc: number }[]) =>
    pts.map((p, i) => `${i ? "L" : "M"}${x(p.tokens).toFixed(1)},${y(p.auroc).toFixed(1)}`).join(" ");
  const svg =
    `<line x1="0" x2="${W2}" y1="${y(0.5)}" y2="${y(0.5)}" stroke="var(--ink-2)" stroke-opacity=".5" stroke-dasharray="3 4" vector-effect="non-scaling-stroke"/>` +
    `<path d="${line(c.ceiling)}" fill="none" stroke="var(--matcha)" stroke-width="2.6" stroke-linecap="round" vector-effect="non-scaling-stroke"/>` +
    `<path d="${line(c.probeSame)}" fill="none" stroke="var(--sky)" stroke-width="2.2" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`;
  return (
    <svg
      viewBox={`0 0 ${W2} ${H2}`}
      className="block h-14 w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Re-rolling the prefix climbs well above the probe, which stays near chance"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
