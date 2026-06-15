"use client";

import { type CSSProperties, useEffect, useState } from "react";

const greetings = ["Hello", "မင်္ဂလာပါ", "こんにちは", "Bonjour", "Ciao"];

const PROGRESS_DURATION_MS = 3000;
const GREETING_STEP_MS = PROGRESS_DURATION_MS / greetings.length;
const EXIT_DURATION_MS = 840;
const TEXT_FADE_MS = 150;
const LOADER_BACKGROUND =
  "linear-gradient(135deg, rgba(124, 58, 237, 0.24) 0%, rgba(17, 16, 21, 0.98) 34%, #08070b 68%, rgba(14, 165, 233, 0.14) 100%), #08070b";

type InitialHomeLoaderProps = {
  onDone?: () => void;
};

export function InitialHomeLoader({ onDone }: InitialHomeLoaderProps) {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [isProgressStarted, setIsProgressStarted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const startProgress = window.requestAnimationFrame(() => {
      setIsProgressStarted(true);
    });

    const greetingTimers = greetings.slice(1).flatMap((_, index) => {
      const changeAt = GREETING_STEP_MS * (index + 1);

      return [
        window.setTimeout(() => {
          setIsTextVisible(false);
        }, changeAt - TEXT_FADE_MS),
        window.setTimeout(() => {
          setGreetingIndex(index + 1);
          setIsTextVisible(true);
        }, changeAt),
      ];
    });

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, PROGRESS_DURATION_MS);

    const doneTimer = window.setTimeout(() => {
      setIsDone(true);
      onDone?.();
    }, PROGRESS_DURATION_MS + EXIT_DURATION_MS);

    return () => {
      window.cancelAnimationFrame(startProgress);
      greetingTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  if (isDone) {
    return null;
  }

  const loaderStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: "2rem",
    background: LOADER_BACKGROUND,
    color: "rgba(245, 245, 250, 0.94)",
    pointerEvents: "auto",
    cursor: "wait",
    transform: isExiting ? "translate3d(0, -105%, 0)" : "translate3d(0, 0, 0)",
    transition: `transform ${EXIT_DURATION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
    backfaceVisibility: "hidden",
    willChange: "transform",
    animation: "none",
    height: "100vh",
  };

  const contentStyle: CSSProperties = {
    display: "flex",
    width: "min(82vw, 34rem)",
    maxWidth: "calc(100vw - 3rem)",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "1.35rem",
    opacity: isExiting ? 0 : 1,
    transform: isExiting ? "translate3d(0, -28px, 0)" : "translate3d(0, 0, 0)",
    filter: isExiting ? "blur(8px)" : "blur(0)",
    transition:
      "opacity 420ms cubic-bezier(0.16, 1, 0.3, 1), transform 420ms cubic-bezier(0.16, 1, 0.3, 1), filter 420ms cubic-bezier(0.16, 1, 0.3, 1)",
    animation: "none",
  };

  const greetingStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    minHeight: "1.08em",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    color: "rgba(245, 245, 250, 0.94)",
    fontSize: "var(--home-intro-font-size, 5.4rem)",
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: 1,
    textAlign: "center",
    textRendering: "optimizeLegibility",
    whiteSpace: "nowrap",
    opacity: isTextVisible ? 1 : 0,
    transform: isTextVisible
      ? "translate3d(0, 0, 0)"
      : "translate3d(0, -10px, 0)",
    filter: isTextVisible ? "blur(0)" : "blur(7px)",
    transition:
      "opacity 220ms cubic-bezier(0.16, 1, 0.3, 1), transform 220ms cubic-bezier(0.16, 1, 0.3, 1), filter 220ms cubic-bezier(0.16, 1, 0.3, 1)",
    animation: "none",
  };

  const progressStyle: CSSProperties = {
    width: "100%",
    height: "2px",
    overflow: "hidden",
    borderRadius: "999px",
    background: "rgba(245, 245, 250, 0.14)",
  };

  const progressFillStyle: CSSProperties = {
    display: "block",
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    background:
      "linear-gradient(90deg, rgba(124, 58, 237, 0.95), rgba(245, 245, 250, 0.88))",
    transform: isProgressStarted ? "scaleX(1)" : "scaleX(0)",
    transformOrigin: "left center",
    transition: `transform ${PROGRESS_DURATION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
    willChange: "transform",
    animation: "none",
  };

  return (
    <div
      className={`home-intro-loader${isExiting ? " is-exiting" : ""}`}
      style={loaderStyle}
      role="status"
      aria-live="polite"
    >
      <div className="home-intro-content" style={contentStyle}>
        <p
          key={greetingIndex}
          className="home-intro-greeting"
          style={greetingStyle}
        >
          {greetings[greetingIndex]}
        </p>
        <div className="home-intro-progress" style={progressStyle} aria-hidden>
          <span style={progressFillStyle} />
        </div>
      </div>
    </div>
  );
}
