import { DayCell } from "@/components/calendar/day-cell";
import { WEEKDAY_LABELS } from "@/lib/constants";
import { firstWeekdayOfMonth } from "@/lib/date-utils";
import type { DayInfo } from "@/lib/panchang";

export function MonthGrid({
  year,
  month,
  days,
}: {
  year: number;
  month: number;
  days: DayInfo[];
}) {
  const leadingBlanks = firstWeekdayOfMonth(year, month);

  return (
    <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-line bg-line">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="bg-night py-2 text-center text-xs font-medium text-moonlight/80"
          >
            {label}
          </div>
        ))}

        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <div key={`blank-${i}`} className="bg-parchment-soft/40" />
        ))}

        {days.map((info) => (
          <div key={info.day} className="aspect-square min-h-[76px] sm:min-h-[92px]">
            <DayCell info={info} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink/60">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2 w-2 rounded-full ring-2 ring-inset ring-sindoor" />
          Today
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sindoor" />
          Festival
        </span>
      </div>
    </section>
  );
}
