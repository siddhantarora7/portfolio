import { useId } from "react";

export type MochiKind = "mochi" | "matcha";
export type MochiMood = "idle" | "happy" | "squish" | "dizzy" | "wow" | "sleep";

/**
 * The two mascots, drawn as plain SVG so they can be used anywhere
 * (server or client). Faces are swapped by mood; in dark mode an idle
 * mascot falls asleep via CSS. Eye position follows --gx / --gy, which
 * the interactive wrapper sets from the pointer.
 */
export function MochiArt({
  kind = "mochi",
  mood = "idle",
  size = 64,
  className = "",
  title,
}: {
  kind?: MochiKind;
  mood?: MochiMood;
  size?: number;
  className?: string;
  title?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ink = "var(--mochi-ink)";
  const isMatcha = kind === "matcha";

  const body = isMatcha
    ? "M17 68C13 45 29 27 50 27C71 27 87 45 83 68C81 78 69 81 50 81C31 81 19 78 17 68Z"
    : "M11 69C8 46 25 24 50 24C75 24 92 46 89 69C87 79 72 82 50 82C28 82 13 79 11 69Z";
  const eyeY = isMatcha ? 55 : 54;
  const eyeL = isMatcha ? 40 : 39;
  const eyeR = isMatcha ? 60 : 61;
  const mouthY = isMatcha ? 62 : 61;
  const cheekY = isMatcha ? 61 : 60;

  return (
    <svg
      width={size}
      height={size * 0.88}
      viewBox="0 0 100 88"
      className={`mochi-art ${className}`}
      data-kind={kind}
      data-mood={mood}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <radialGradient id={`b${id}`} cx="38%" cy="28%" r="80%">
          {isMatcha ? (
            <>
              <stop offset="0" stopColor="#d3e8bd" />
              <stop offset="0.55" stopColor="#a9cd8a" />
              <stop offset="1" stopColor="#86b066" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.6" stopColor="#f8f3ee" />
              <stop offset="1" stopColor="#ebe1d8" />
            </>
          )}
        </radialGradient>
      </defs>

      <ellipse cx="50" cy="83" rx={isMatcha ? 30 : 36} ry="3.6" fill="var(--mochi-shadow)" />

      <g className="mochi-body">
        <path d={body} fill={`url(#b${id})`} stroke={ink} strokeWidth="2.4" strokeLinejoin="round" />
        {/* dusting: cornstarch on mochi, powder on matcha */}
        {isMatcha ? (
          <g fill="#6f9a4f" opacity="0.55">
            <circle cx="31" cy="44" r="1" />
            <circle cx="68" cy="41" r="1.1" />
            <circle cx="58" cy="35" r="0.8" />
            <circle cx="37" cy="36" r="0.9" />
            <circle cx="73" cy="56" r="0.9" />
            <circle cx="26" cy="58" r="0.8" />
          </g>
        ) : (
          <g fill="#ffffff">
            <circle cx="30" cy="40" r="1.3" />
            <circle cx="70" cy="38" r="1.1" />
            <circle cx="60" cy="31" r="0.9" />
            <circle cx="41" cy="31" r="1" />
          </g>
        )}
        {/* shine */}
        <path
          d={isMatcha ? "M27 50c1-8 7-15 15-17" : "M22 50c2-9 9-17 19-20"}
          stroke="#ffffff"
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        {/* matcha wears a little curl of cream */}
        {isMatcha ? (
          <path
            d="M43 28c-1-6 5-10 10-7 4 3 1 8-3 6-2-1-1-4 1-4"
            fill="none"
            stroke={ink}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}

        <ellipse cx={eyeL - 7} cy={cheekY} rx="5" ry="3" fill="#f6a9b9" opacity="0.75" />
        <ellipse cx={eyeR + 7} cy={cheekY} rx="5" ry="3" fill="#f6a9b9" opacity="0.75" />

        {/* faces */}
        <g className="face face-open">
          <g className="gaze">
            <g className="blink">
              <ellipse cx={eyeL} cy={eyeY} rx="3.1" ry="4" fill={ink} />
              <ellipse cx={eyeR} cy={eyeY} rx="3.1" ry="4" fill={ink} />
              <circle cx={eyeL + 1} cy={eyeY - 1.6} r="1.1" fill="#fff" />
              <circle cx={eyeR + 1} cy={eyeY - 1.6} r="1.1" fill="#fff" />
            </g>
          </g>
          <path
            d={`M${45} ${mouthY}q2.5 3 5 0q2.5 3 5 0`}
            fill="none"
            stroke={ink}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        <g className="face face-happy">
          <path
            d={`M${eyeL - 3.5} ${eyeY + 1}q3.5-5 7 0M${eyeR - 3.5} ${eyeY + 1}q3.5-5 7 0`}
            fill="none"
            stroke={ink}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path d={`M44 ${mouthY - 1}q6 7 12 0z`} fill={ink} />
        </g>

        <g className="face face-squish">
          <path
            d={`M${eyeL - 3} ${eyeY - 3}l5 3-5 3M${eyeR + 3} ${eyeY - 3}l-5 3 5 3`}
            fill="none"
            stroke={ink}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d={`M46 ${mouthY + 1}q4-3 8 0`} fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
        </g>

        <g className="face face-dizzy">
          {[eyeL, eyeR].map((x) => (
            <g key={x}>
              <circle cx={x} cy={eyeY} r="3.8" fill="none" stroke={ink} strokeWidth="1.7" />
              <circle cx={x + 1.1} cy={eyeY + 0.6} r="1.3" fill={ink} />
            </g>
          ))}
          <path d={`M45 ${mouthY + 1}q2.5-3 5 0t5 0`} fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
        </g>

        <g className="face face-wow">
          <ellipse cx={eyeL} cy={eyeY} rx="3.6" ry="4.6" fill={ink} />
          <ellipse cx={eyeR} cy={eyeY} rx="3.6" ry="4.6" fill={ink} />
          <circle cx={eyeL + 1.2} cy={eyeY - 1.8} r="1.3" fill="#fff" />
          <circle cx={eyeR + 1.2} cy={eyeY - 1.8} r="1.3" fill="#fff" />
          <ellipse cx="50" cy={mouthY + 1.5} rx="3" ry="3.6" fill={ink} />
        </g>

        <g className="face face-sleep">
          <path
            d={`M${eyeL - 3.5} ${eyeY}q3.5 3.4 7 0M${eyeR - 3.5} ${eyeY}q3.5 3.4 7 0`}
            fill="none"
            stroke={ink}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <ellipse cx="50" cy={mouthY + 1} rx="2" ry="1.6" fill={ink} />
          <text x="78" y="26" fontSize="13" fill={ink} className="zzz" style={{ fontFamily: "var(--font-display)" }}>
            z
          </text>
        </g>
      </g>
    </svg>
  );
}
