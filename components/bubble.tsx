import { useId } from "react";

type Mood = "base" | "confused";

/**
 * The site's mark: a small glass soap bubble. Its personality is all in
 * tiny face changes: it blinks, smiles when a nearby link is hovered
 * (inside a `.mascot-host`), sleeps in dark mode, and squints when lost.
 */
export function Bubble({
  size = 44,
  mood = "base",
  className = "",
  title,
}: {
  size?: number;
  mood?: Mood;
  className?: string;
  title?: string;
}) {
  const id = useId().replace(/:/g, "");
  const ink = "var(--ink)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`bubble shrink-0 ${className}`}
      data-mood={mood}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <radialGradient id={`fill-${id}`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#eaf4ff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#d9ecc6" stopOpacity="0.55" />
        </radialGradient>
        <linearGradient id={`rim-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a7cb84" />
          <stop offset="45%" stopColor="#9cc4e4" />
          <stop offset="75%" stopColor="#d9c4ee" />
          <stop offset="100%" stopColor="#a7cb84" />
        </linearGradient>
      </defs>

      {/* body: very slightly lopsided, like a real bubble */}
      <path
        className="bubble-body"
        d="M32 5.5c15.2 0 26.8 11.4 26.8 26.6 0 15.4-11.8 26.6-27 26.6C16.8 58.7 5.2 47.6 5.2 32.3 5.2 17 16.9 5.5 32 5.5Z"
        fill={`url(#fill-${id})`}
        stroke={`url(#rim-${id})`}
        strokeWidth="2.4"
      />
      {/* shine */}
      <path d="M16.5 22.5c2-5 6.4-8.6 11.6-9.6" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
      <circle cx="14.6" cy="28.4" r="1.6" fill="#fff" opacity="0.9" />

      {mood === "confused" ? (
        <g>
          <path d="M22 33.5l5-3m0 3l-5-3" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="40.5" cy="32" r="2.6" fill={ink} />
          <path d="M26.5 43.5c2-1.8 3.6 1.8 5.6 0s3.6 1.8 5.6 0" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      ) : (
        <>
          <g className="mood-base">
            <ellipse className="eye" cx="24.5" cy="32" rx="2.3" ry="2.9" fill={ink} />
            <ellipse className="eye" cx="39.5" cy="32" rx="2.3" ry="2.9" fill={ink} />
            <path d="M28.5 40.5q3.5 2.6 7 0" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
          <g className="mood-happy">
            <path d="M21.5 33q3-3.6 6 0M36.5 33q3-3.6 6 0" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M27 39.5q5 5 10 0" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <ellipse cx="19.5" cy="38.5" rx="2.6" ry="1.5" fill="#f4b6c2" opacity="0.8" />
            <ellipse cx="44.5" cy="38.5" rx="2.6" ry="1.5" fill="#f4b6c2" opacity="0.8" />
          </g>
          <g className="mood-sleepy">
            <path d="M21.5 32q3 2.6 6 0M36.5 32q3 2.6 6 0" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <ellipse cx="32" cy="41.5" rx="2" ry="2.4" fill="none" stroke={ink} strokeWidth="1.8" />
            <text x="47" y="16" fontSize="9" fill={ink} fontFamily="var(--font-display)" opacity="0.7">
              z
            </text>
          </g>
        </>
      )}
    </svg>
  );
}
