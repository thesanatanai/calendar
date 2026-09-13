"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_LOCATION } from "@/lib/constants";
import { dateKey, todayParts } from "@/lib/date-utils";

// "Today" never changes while a page is mounted (a stale tab left open
// across midnight is an acceptable edge case), so there is nothing to
// subscribe to -- we just need the client's snapshot instead of the
// server's, which is exactly what useSyncExternalStore is for.
function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return false;
}

/**
 * True once the client has confirmed the given calendar date matches
 * "today" -- always false during SSR/SSG, so a statically cached page
 * never bakes in a stale "Today" label.
 */
export function useIsToday(year: number, month: number, day: number): boolean {
  return useSyncExternalStore(
    subscribe,
    () => {
      const t = todayParts(DEFAULT_LOCATION.timezoneOffset);
      return dateKey(t.year, t.month, t.day) === dateKey(year, month, day);
    },
    getServerSnapshot,
  );
}
