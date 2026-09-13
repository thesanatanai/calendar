import Link from "next/link";
import { MONTH_LABELS } from "@/lib/constants";
import { addMonths } from "@/lib/date-utils";

export function MonthNav({ year, month }: { year: number; month: number }) {
  const prev = addMonths(year, month, -1);
  const next = addMonths(year, month, 1);

  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-8 sm:px-8">
      <Link
        href={`/month/${prev.year}/${prev.month}`}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-parchment-soft"
        aria-label="Previous month"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <h1 className="font-display text-3xl text-ink sm:text-4xl">
        {MONTH_LABELS[month - 1]} {year}
      </h1>

      <Link
        href={`/month/${next.year}/${next.month}`}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-parchment-soft"
        aria-label="Next month"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}
