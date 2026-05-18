"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShiningText } from "./ui/shining-text";

const VERBS = [
  "Befuddling",
  "Cooking",
  "Hashing",
  "Brewing",
  "Ruminating",
  "Pondering",
  "Conjuring",
  "Marinating",
  "Composing",
  "Plotting",
  "Synthesizing",
  "Calibrating",
  "Mulling",
  "Tinkering",
  "Wrangling",
];
  
const SHIMMER_MS = 1500;
const FADE_MS = 350;
const REDUCED_MS = 750;

export function BootSplash() {
  const [visible, setVisible] = useState(true);
  const [verb, setVerb] = useState<string | null>(null);
  const reduced = useReducedMotion();

  // Pick the verb client-only so SSR + initial client render match (both null).
  useEffect(() => {
    setVerb(VERBS[Math.floor(Math.random() * VERBS.length)]);
  }, []);

  useEffect(() => {
    const dwell = reduced ? REDUCED_MS : SHIMMER_MS;
    const id = window.setTimeout(() => setVisible(false), dwell);
    return () => window.clearTimeout(id);
  }, [reduced]);

  const barDuration = (reduced ? REDUCED_MS : SHIMMER_MS) / 1000;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: "var(--background)" }}
          aria-hidden
        >
          {/* Dot grid background, masked to a focal ellipse */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, color-mix(in oklab, var(--foreground) 20%, transparent) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              WebkitMaskImage:
                "radial-gradient(ellipse 620px 420px at center, black 0%, transparent 65%)",
              maskImage:
                "radial-gradient(ellipse 620px 420px at center, black 0%, transparent 65%)",
            }}
          />

          {/* Pulsing radial halo */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, color-mix(in oklab, var(--foreground) 9%, transparent), transparent 45%)",
            }}
            initial={{ opacity: 0.55 }}
            animate={
              reduced ? { opacity: 0.7 } : { opacity: [0.55, 0.95, 0.55] }
            }
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
          />

          {/* Expanding concentric rings (staggered pair) */}
          {!reduced && (
            <>
              <ExpandingRing delay={0} />
              <ExpandingRing delay={0.9} />
            </>
          )}

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-5">
            <div
              className="flex h-9 items-center gap-2.5"
              style={{
                color:
                  "color-mix(in oklab, var(--foreground) 82%, transparent)",
              }}
            >
              <SparkleIcon reduced={!!reduced} />
              {verb && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <ShiningText
                    text={`${verb}…`}
                    className="text-2xl sm:text-3xl tracking-[-0.01em]"
                  />
                </motion.div>
              )}
            </div>

            {/* Loading bar */}
            <div
              className="relative h-[2px] w-56 overflow-hidden rounded-full sm:w-64"
              style={{
                background:
                  "color-mix(in oklab, var(--foreground) 10%, transparent)",
              }}
            >
              <motion.div
                aria-hidden
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent 0%, color-mix(in oklab, var(--foreground) 75%, transparent) 45%, var(--foreground) 80%, transparent 100%)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: barDuration, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ExpandingRing({ delay }: { delay: number }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute rounded-full"
      style={{
        width: 160,
        height: 160,
        border:
          "1px solid color-mix(in oklab, var(--foreground) 14%, transparent)",
      }}
      initial={{ scale: 0.45, opacity: 0.55 }}
      animate={{ scale: 2.4, opacity: 0 }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeOut",
        delay,
      }}
    />
  );
}

function SparkleIcon({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={{ rotate: 0, scale: 0.85 }}
      animate={
        reduced
          ? { rotate: 0, scale: 1 }
          : { rotate: 360, scale: [0.85, 1.05, 0.85] }
      }
      transition={
        reduced
          ? { duration: 0 }
          : {
              rotate: { repeat: Infinity, duration: 2.6, ease: "linear" },
              scale: {
                repeat: Infinity,
                duration: 1.1,
                ease: "easeInOut",
              },
            }
      }
      className="inline-flex"
      style={{ width: 18, height: 18 }}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 1.5 C 12.6 7.4 16.6 11.4 22.5 12 C 16.6 12.6 12.6 16.6 12 22.5 C 11.4 16.6 7.4 12.6 1.5 12 C 7.4 11.4 11.4 7.4 12 1.5 Z" />
      </svg>
    </motion.div>
  );
}
