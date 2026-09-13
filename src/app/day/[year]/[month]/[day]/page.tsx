import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DayDetail } from "@/components/panchang/day-detail";
import { formatLongDate } from "@/lib/date-utils";
import { getDayInfo, tithiName } from "@/lib/panchang";
import { daysInMonth } from "@/lib/date-utils";

// A given calendar date's panchang is a fixed astronomical calculation --
// it never changes after the fact -- so once rendered it can be cached
// indefinitely and reused for every visitor.
export const revalidate = false;
export const dynamicParams = true;

interface DayPageProps {
  params: Promise<{ year: string; month: string; day: string }>;
}

function parseParams(raw: { year: string; month: string; day: string }) {
  const year = Number(raw.year);
  const month = Number(raw.month);
  const day = Number(raw.day);
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > daysInMonth(year, month) ||
    year < 1900 ||
    year > 2200
  ) {
    return null;
  }
  return { year, month, day };
}

export async function generateMetadata({ params }: DayPageProps): Promise<Metadata> {
  const raw = await params;
  const parsed = parseParams(raw);
  if (!parsed) return {};
  const { panchang } = getDayInfo(parsed.year, parsed.month, parsed.day);
  const title = `${tithiName(panchang.tithi)} — ${formatLongDate(parsed.year, parsed.month, parsed.day)}`;
  return {
    title,
    description: `Panchang for ${formatLongDate(parsed.year, parsed.month, parsed.day)}: tithi, nakshatra, muhurta and festivals.`,
  };
}

export default async function DayPage({ params }: DayPageProps) {
  const raw = await params;
  const parsed = parseParams(raw);
  if (!parsed) notFound();

  const { year, month, day } = parsed;
  const { panchang } = getDayInfo(year, month, day);

  return <DayDetail year={year} month={month} day={day} panchang={panchang} />;
}
