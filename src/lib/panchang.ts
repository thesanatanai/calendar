import {
  getPanchangam,
  getUpcomingFestivals as libGetUpcomingFestivals,
  Observer,
  tithiNames,
  nakshatraNames,
  yogaNames,
  dayNames,
  type Panchangam,
  type Festival,
} from "@ishubhamx/panchangam-js";

import { DEFAULT_LOCATION } from "./constants";
import { civilNoonInstant, daysInMonth } from "./date-utils";

export type { Panchangam, Festival };

let cachedObserver: Observer | null = null;

export function getObserver(): Observer {
  if (!cachedObserver) {
    cachedObserver = new Observer(
      DEFAULT_LOCATION.latitude,
      DEFAULT_LOCATION.longitude,
      DEFAULT_LOCATION.elevation,
    );
  }
  return cachedObserver;
}

export interface DayInfo {
  year: number;
  month: number; // 1-12
  day: number;
  panchang: Panchangam;
}

/** Full panchang for one calendar day, computed for the app's default location. */
export function getDayInfo(year: number, month: number, day: number, type?: "amanta" | "purnimanta"): DayInfo {
  const instant = civilNoonInstant(year, month, day);
  const panchang = getPanchangam(instant, getObserver(), {
    timezoneOffset: DEFAULT_LOCATION.timezoneOffset,
    calendarType: type
  });
  return { year, month, day, panchang };
}

/** Panchang for every day of a given month — the data behind the month grid. */
export function getMonthInfo(year: number, month: number): DayInfo[] {
  const total = daysInMonth(year, month);
  const days: DayInfo[] = [];
  for (let day = 1; day <= total; day += 1) {
    days.push(getDayInfo(year, month, day));
  }
  return days;
}

export function getUpcomingFestivals(fromDate: Date, days = 90): Festival[] {
  return libGetUpcomingFestivals({
    date: fromDate,
    observer: getObserver(),
    days,
    timezoneOffset: DEFAULT_LOCATION.timezoneOffset,
  });
}

export function tithiName(index: number): string {
  return tithiNames[index] ?? `Tithi ${index}`;
}

export function nakshatraName(index: number): string {
  return nakshatraNames[index] ?? `Nakshatra ${index}`;
}

export function weekdayName(index: number): string {
  return dayNames[index] ?? "";
}

export function yogaName(index: number): string {
  return yogaNames[index] ?? `Yoga ${index}`;
}

/**
 * Illuminated fraction of the moon's disc (0 = new moon, 1 = full moon) for
 * a given tithi index (1-30), following the standard cosine phase curve.
 */
export function illuminatedFraction(tithi: number): number {
  const theta = (tithi / 30) * 2 * Math.PI;
  return (1 - Math.cos(theta)) / 2;
}

export function isWaxing(tithi: number): boolean {
  return tithi <= 15;
}
