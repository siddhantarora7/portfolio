import type { Research } from "@/data/site";
import { isTodo } from "@/data/todo";
import { Todo } from "./primitives";

const LO = 0.4;
const HI = 1;
const pct = (v: number) => `${((v - LO) / (HI - LO)) * 100}%`;
const fmt = (v: number, approx?: boolean) => `${approx ? "~" : ""}${v.toFixed(2)}`;

/** One clean comparison: how well each method predicts a trace's eventual correctness. */
export function AurocChart({ r }: { r: Research }) {
  const { comparison, curve } = r;
  const ticks = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

  return (
    <figure className="glass m-0 rounded-[26px] p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-[19px] font-semibold">
          Predicting the final answer from a {new Intl.NumberFormat("en-CA").format(comparison.atTokens)}-token prefix
        </p>
        <p className="mt-1 text-[14.5px] text-ink-2">
          AUROC, higher is better. 0.5 is a coin flip. {r.model} on {r.dataset}.
        </p>
      </figcaption>

      <div className="dot-grid relative mt-7 rounded-[14px] border border-rule px-4 pt-5 pb-9 sm:px-5">
        <div className="relative">
          {/* chance line */}
          <div className="absolute top-[-8px] bottom-[-8px] w-px border-l border-dashed border-ink-2/60" style={{ left: pct(comparison.chance) }} aria-hidden="true" />
          <ul className="relative space-y-5">
            {comparison.points.map((p, i) => (
              <li key={p.label}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3 text-[14.5px]">
                  <span className={i === 0 ? "font-medium" : "text-ink-2"}>{p.label}</span>
                  <span className="tabular font-medium">{fmt(p.auroc, p.approx)}</span>
                </div>
                <div className="h-3.5 rounded-full bg-[var(--heat-0)]" role="img" aria-label={`${p.label}: AUROC ${fmt(p.auroc, p.approx)}`}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: pct(p.auroc), background: i === 0 ? "var(--matcha)" : "var(--sky)" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="tabular absolute inset-x-4 bottom-2.5 text-[11.5px] text-ink-2 sm:inset-x-5" aria-hidden="true">
          {ticks.map((t) => (
            <span key={t} className="absolute -translate-x-1/2" style={{ left: pct(t) }}>
              {t.toFixed(1)}
            </span>
          ))}
        </div>
      </div>
      <p className="hand mt-3 text-[14px] text-ink-2">dashed line: chance</p>

      {typeof curve === "string" ? (
        isTodo(curve) ? (
          <div className="mt-5">
            <Todo value={curve} />
          </div>
        ) : null
      ) : (
        <CurveChart curve={curve} />
      )}
    </figure>
  );
}

function CurveChart({ curve }: { curve: { tokens: number; probe: number; sampling: number }[] }) {
  if (curve.length < 2) return null;
  const W = 600;
  const H = 220;
  const pad = { l: 34, r: 16, t: 12, b: 28 };
  const xs = curve.map((c) => c.tokens);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const x = (t: number) => pad.l + ((t - x0) / (x1 - x0)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - LO) / (HI - LO)) * (H - pad.t - pad.b);
  const line = (k: "probe" | "sampling") => curve.map((c, i) => `${i ? "L" : "M"}${x(c.tokens)},${y(c[k])}`).join(" ");
  const last = curve[curve.length - 1];

  return (
    <div className="mt-8">
      <p className="mb-3 text-[14px] text-ink-2">AUROC as the prefix grows</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="AUROC versus prefix length for both methods">
        {[0.5, 0.6, 0.7, 0.8, 0.9].map((v) => (
          <g key={v}>
            <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke="var(--rule)" strokeDasharray={v === 0.5 ? "3 4" : undefined} />
            <text x={pad.l - 6} y={y(v) + 3.5} fontSize="10" textAnchor="end" fill="var(--ink-2)">
              {v.toFixed(1)}
            </text>
          </g>
        ))}
        {curve.map((c) => (
          <text key={c.tokens} x={x(c.tokens)} y={H - 8} fontSize="10" textAnchor="middle" fill="var(--ink-2)">
            {c.tokens}
          </text>
        ))}
        <path d={line("sampling")} fill="none" stroke="var(--matcha)" strokeWidth="2.2" />
        <path d={line("probe")} fill="none" stroke="var(--sky)" strokeWidth="2.2" />
        <text x={x(last.tokens) - 4} y={y(last.sampling) - 8} fontSize="11" textAnchor="end" fill="var(--ink)">
          sampling
        </text>
        <text x={x(last.tokens) - 4} y={y(last.probe) - 8} fontSize="11" textAnchor="end" fill="var(--ink)">
          probe
        </text>
      </svg>
    </div>
  );
}
