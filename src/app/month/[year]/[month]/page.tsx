import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MonthGrid } from "@/components/calendar/month-grid";
import { MonthNav } from "@/components/calendar/month-nav";
import { MONTH_LABELS } from "@/lib/constants";
import { getMonthInfo } from "@/lib/panchang";

// A month's panchang is a fixed astronomical calculation -- it never
// changes after the fact -- so it can be cached indefinitely once built.
export const revalidate = false;
export const dynamicParams = true;

interface MonthPageProps {
  params: Promise<{ year: string; month: string }>;
}

function parseParams(raw: { year: string; month: string }) {
  const year = Number(raw.year);
  const month = Number(raw.month);
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12 ||
    year < 1900 ||
    year > 2200
  ) {
    return null;
  }
  return { year, month };
}

export async function generateMetadata({ params }: MonthPageProps): Promise<Metadata> {
  const raw = await params;
  const parsed = parseParams(raw);
  if (!parsed) return {};
  return {
    title: `${MONTH_LABELS[parsed.month - 1]} ${parsed.year} — Month view`,
    description: `Tithi and festivals for every day of ${MONTH_LABELS[parsed.month - 1]} ${parsed.year}.`,
  };
}

export default async function MonthPage({ params }: MonthPageProps) {
  const raw = await params;
  const parsed = parseParams(raw);
  if (!parsed) notFound();

  const { year, month } = parsed;
  const days = getMonthInfo(year, month);

  return (
    <>
      <MonthNav year={year} month={month} />
      <MonthGrid year={year} month={month} days={days} />
    </>
  );
}
