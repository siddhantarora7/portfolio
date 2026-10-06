import { useId } from "react";

export type MochiMood = "idle" | "happy" | "squish" | "dizzy" | "wow" | "sleep";

/**
 * Mochi, the site's one mascot: a soft white daifuku, optionally wearing a
 * tiny matcha jetpack. Plain SVG so it renders anywhere. Faces swap by mood
 * (idle mochi sleeps in dark mode via CSS); eyes follow --gx / --gy; flame
 * length follows --thrust.
 */
export function MochiArt({
  mood = "idle",
  size = 64,
  jetpack = false,
  shadow = true,
  className = "",
  title,
}: {
  mood?: MochiMood;
  size?: number;
  jetpack?: boolean;
  shadow?: boolean;
  className?: string;
  title?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ink = "var(--mochi-ink)";
  const eyeY = 54;
  const eyeL = 39;
  const eyeR = 61;
  const mouthY = 61;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`mochi-art ${className}`}
      data-mood={mood}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      overflow="visible"
    >
      <defs>
        <radialGradient id={`b${id}`} cx="38%" cy="28%" r="80%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#f8f3ee" />
          <stop offset="1" stopColor="#ebe1d8" />
        </radialGradient>
        <linearGradient id={`f${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3b0" />
          <stop offset="0.45" stopColor="#ffb547" />
          <stop offset="1" stopColor="#ff6b3d" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`p${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c2dca3" />
          <stop offset="1" stopColor="#86b066" />
        </linearGradient>
      </defs>

      {shadow ? <ellipse className="mochi-shadow" cx="50" cy="84" rx="34" ry="3.6" fill="var(--mochi-shadow)" /> : null}

      {jetpack ? (
        <g className="jetpack">
          {/* flames, straight down from under mochi */}
          {[33, 67].map((x) => (
            <g key={x} className="flame" style={{ transformOrigin: `${x}px 88px` }}>
              <path d={`M${x - 4.5} 88c0 7 3 13 4.5 19 1.5-6 4.5-12 4.5-19z`} fill={`url(#f${id})`} />
              <path d={`M${x - 2.2} 88c0 4.5 1.3 7.5 2.2 10 1-2.5 2.2-5.5 2.2-10z`} fill="#fffbe0" opacity="0.9" />
            </g>
          ))}
          {/* two little thrusters tucked under the body; only the nozzles show */}
          {[33, 67].map((x) => (
            <g key={x}>
              <rect x={x - 6.5} y="66" width="13" height="18" rx="5" fill={`url(#p${id})`} stroke={ink} strokeWidth="2.2" />
              <path d={`M${x - 5.5} 83h11l-1.6 5h-7.8z`} fill="#5e8b3e" stroke={ink} strokeWidth="1.8" strokeLinejoin="round" />
            </g>
          ))}
        </g>
      ) : null}

      <g className="mochi-body">
        <path
          d="M11 69C8 46 25 24 50 24C75 24 92 46 89 69C87 79 72 82 50 82C28 82 13 79 11 69Z"
          fill={`url(#b${id})`}
          stroke={ink}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <g fill="#ffffff">
          <circle cx="30" cy="40" r="1.3" />
          <circle cx="70" cy="38" r="1.1" />
          <circle cx="60" cy="31" r="0.9" />
          <circle cx="41" cy="31" r="1" />
        </g>
        <path d="M22 50c2-9 9-17 19-20" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" fill="none" opacity="0.85" />

        <ellipse cx={eyeL - 7} cy={60} rx="5" ry="3" fill="#f6a9b9" opacity="0.75" />
        <ellipse cx={eyeR + 7} cy={60} rx="5" ry="3" fill="#f6a9b9" opacity="0.75" />

        <g className="face face-open">
          <g className="gaze">
            <g className="blink">
              <ellipse cx={eyeL} cy={eyeY} rx="3.1" ry="4" fill={ink} />
              <ellipse cx={eyeR} cy={eyeY} rx="3.1" ry="4" fill={ink} />
              <circle cx={eyeL + 1} cy={eyeY - 1.6} r="1.1" fill="#fff" />
              <circle cx={eyeR + 1} cy={eyeY - 1.6} r="1.1" fill="#fff" />
            </g>
          </g>
          <path d={`M45 ${mouthY}q2.5 3 5 0q2.5 3 5 0`} fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <g className="face face-happy">
          <path d={`M${eyeL - 3.5} ${eyeY + 1}q3.5-5 7 0M${eyeR - 3.5} ${eyeY + 1}q3.5-5 7 0`} fill="none" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
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
          <path d={`M${eyeL - 3.5} ${eyeY}q3.5 3.4 7 0M${eyeR - 3.5} ${eyeY}q3.5 3.4 7 0`} fill="none" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="50" cy={mouthY + 1} rx="2" ry="1.6" fill={ink} />
          <text x="80" y="24" fontSize="13" fill={ink} className="zzz" style={{ fontFamily: "var(--font-display)" }}>
            z
          </text>
        </g>
      </g>
    </svg>
  );
}
