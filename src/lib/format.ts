import type { Festival, Panchangam } from "@ishubhamx/panchangam-js";
import { dateKeyFromInstant, formatShortDate } from "./date-utils";

const ORDINAL_SUFFIXES: Record<string, string> = { one: "st", two: "nd", few: "rd", other: "th" };
const pluralRules = new Intl.PluralRules("en-IN", { type: "ordinal" });

export function ordinal(n: number): string {
  const rule = pluralRules.select(n);
  return `${n}${ORDINAL_SUFFIXES[rule] ?? "th"}`;
}

/**
 * A plain-language sentence describing where the day sits in the lunar
 * month — the kind of line a family almanac would print under the date.
 */
export function describeDay(panchang: Panchangam): string {
  const isShukla = panchang.paksha === "Shukla";
  const { isAdhika } =  panchang.masa;
  const dayInPaksha = isShukla ? panchang.tithi : panchang.tithi - 15;
  const pakshaLabel = isShukla ? "waxing" : "waning";
  return `The ${ordinal(dayInPaksha + 1)} day of the ${pakshaLabel} moon, in the month of ${isAdhika ? "Adhika" : ""} ${panchang.masa.name} during ${panchang.ritu} ritu.`;
}

/** Groups a flat, chronological festival list by calendar month for display. */
export function groupFestivalsByMonth(
  festivals: Festival[],
): { label: string; items: Festival[] }[] {
  const groups = new Map<string, { label: string; items: Festival[] }>();
  for (const festival of festivals) {
    const label = festival.date.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
    const key = label;
    if (!groups.has(key)) groups.set(key, { label, items: [] });
    groups.get(key)!.items.push(festival);
  }
  return Array.from(groups.values());
}

export function festivalDayLabel(date: Date): string {
  return formatShortDate(date);
}

export function festivalDateKey(date: Date): string {
  return dateKeyFromInstant(date);
}

export const CATEGORY_LABELS: Record<string, string> = {
  major: "Major festival",
  minor: "Observance",
  ekadashi: "Ekadashi",
  pradosham: "Pradosham",
  vrat: "Vrat",
  jayanti: "Jayanti",
  solar: "Solar transition",
};
