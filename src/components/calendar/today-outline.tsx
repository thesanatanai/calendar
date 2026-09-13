"use client";

import type { ReactNode } from "react";
import { useIsToday } from "@/hooks/use-is-today";

interface TodayOutlineProps {
  year: number;
  month: number;
  day: number;
  children: ReactNode;
}

export function TodayOutline({ year, month, day, children }: TodayOutlineProps) {
  const isToday = useIsToday(year, month, day);
  return (
    <div className={isToday ? "ring-2 ring-inset ring-sindoor" : undefined}>{children}</div>
  );
}
