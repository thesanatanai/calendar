"use client";

import { useIsToday } from "@/hooks/use-is-today";

interface TodayBadgeProps {
  year: number;
  month: number;
  day: number;
}

/**
 * Renders client-side only, so pages that are statically cached (month
 * grids, day-detail pages) never bake a stale "Today" label into the
 * cached HTML -- the check runs fresh in the visitor's browser instead.
 */
export function TodayBadge({ year, month, day }: TodayBadgeProps) {
  const isToday = useIsToday(year, month, day);
  if (!isToday) return null;

  return (
    <span className="rounded-full bg-sindoor px-2.5 py-0.5 text-xs font-medium text-parchment">
      Today
    </span>
  );
}
