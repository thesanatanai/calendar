"use client";

import { useSyncExternalStore } from "react";
import { getServerTheme, getTheme, setTheme, subscribeToTheme } from "@/lib/theme-store";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);

  function toggle() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-moonlight/25 text-moonlight transition-colors hover:bg-white/10"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
        className={`absolute transition-all duration-300 ${
          theme === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      >
        <circle cx="8" cy="8" r="3.4" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
          <path d="M8 0.8v2M8 13.2v2M15.2 8h-2M2.8 8h-2M13.1 2.9l-1.4 1.4M4.3 11.7l-1.4 1.4M13.1 13.1l-1.4-1.4M4.3 4.3 2.9 2.9" />
        </g>
      </svg>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
        className={`absolute transition-all duration-300 ${
          theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
        }`}
      >
        <path
          d="M14 9.3A6.2 6.2 0 1 1 6.7 2a5 5 0 0 0 7.3 7.3Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
