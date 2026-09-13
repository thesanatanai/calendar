import { DEFAULT_LOCATION } from "./constants";

/**
 * Returns a Date instant representing 12:00 local time (per timezoneOffset,
 * minutes east of UTC) on the given calendar day.
 *
 * We anchor to local noon — never local midnight — so that the instant we
 * hand to the panchang engine always falls safely inside the intended civil
 * day, no matter what timezone the server process itself is running in
 * (build machines, edge runtimes and local dev boxes rarely run in IST).
 */
export function civilNoonInstant(
  year: number,
  month: number, // 1-12
  day: number,
  timezoneOffset: number = DEFAULT_LOCATION.timezoneOffset,
): Date {
  const utcMillisForLocalNoon =
    Date.UTC(year, month - 1, day, 12, 0, 0) - timezoneOffset * 60 * 1000;
  return new Date(utcMillisForLocalNoon);
}

/** The calendar date (per the app's default timezone) that "now" falls on. */
export function todayParts(timezoneOffset: number = DEFAULT_LOCATION.timezoneOffset) {
  const localNow = new Date(Date.now() + timezoneOffset * 60 * 1000);
  return {
    year: localNow.getUTCFullYear(),
    month: localNow.getUTCMonth() + 1,
    day: localNow.getUTCDate(),
  };
}

export function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

/** Stable "YYYY-MM-DD" key for a calendar day, independent of server TZ. */
export function dateKey(year: number, month: number, day: number): string {
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

/**
 * Converts an instant returned by the panchang engine (already computed for
 * the correct civil day) into "YYYY-MM-DD" using the app's fixed timezone
 * offset, so it matches up with dateKey() from calendar parts.
 */
export function dateKeyFromInstant(
  date: Date,
  timezoneOffset: number = DEFAULT_LOCATION.timezoneOffset,
): string {
  const shifted = new Date(date.getTime() + timezoneOffset * 60 * 1000);
  return dateKey(shifted.getUTCFullYear(), shifted.getUTCMonth() + 1, shifted.getUTCDate());
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** 0 (Sun) - 6 (Sat) weekday of the 1st of the given month, per app timezone. */
export function firstWeekdayOfMonth(
  year: number,
  month: number,
  timezoneOffset: number = DEFAULT_LOCATION.timezoneOffset,
): number {
  const noon = civilNoonInstant(year, month, 1, timezoneOffset);
  const shifted = new Date(noon.getTime() + timezoneOffset * 60 * 1000);
  return shifted.getUTCDay();
}

export function addMonths(year: number, month: number, delta: number) {
  const total = year * 12 + (month - 1) + delta;
  return { year: Math.floor(total / 12), month: (((total % 12) + 12) % 12) + 1 };
}

export function formatTime(
  date: Date | null,
  timezoneOffset: number = DEFAULT_LOCATION.timezoneOffset,
): string {
  if (!date) return "—";
  const shifted = new Date(date.getTime() + timezoneOffset * 60 * 1000);
  let hours = shifted.getUTCHours();
  const minutes = shifted.getUTCMinutes();
  const suffix = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${pad2(minutes)} ${suffix}`;
}

export function formatLongDate(year: number, month: number, day: number): string {
  const d = civilNoonInstant(year, month, day);
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatShortDate(date: Date, timezoneOffset: number = DEFAULT_LOCATION.timezoneOffset): string {
  const shifted = new Date(date.getTime() + timezoneOffset * 60 * 1000);
  return shifted.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
