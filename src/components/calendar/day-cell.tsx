import Link from "next/link";
import { MoonPhase } from "@/components/panchang/moon-phase";
import { TodayOutline } from "@/components/calendar/today-outline";
import { dateKey } from "@/lib/date-utils";
import { tithiName } from "@/lib/panchang";
import type { DayInfo } from "@/lib/panchang";

export function DayCell({ info }: { info: DayInfo }) {
  const { year, month, day, panchang } = info;
  const key = dateKey(year, month, day);
  const hasFestival = panchang.festivals.length > 0;

  return (
    <TodayOutline year={year} month={month} day={day}>
      <Link
        href={`/day/${year}/${month}/${day}`}
        className="group flex h-full flex-col gap-1.5 border border-line/70 bg-parchment p-2 transition-all duration-150 hover:-translate-y-0.5 hover:bg-parchment-soft hover:shadow-sm sm:p-2.5"
      >
        <div className="flex items-start justify-between">
          <span className="font-display text-base text-ink sm:text-lg">{day}</span>
          <MoonPhase tithi={panchang.tithi} seed={key} size={20} className="shrink-0" />
        </div>
        <p className="truncate text-[11px] leading-tight text-ink/65 sm:text-xs">
          {tithiName(panchang.tithi)}
        </p>
        {hasFestival && (
          <p className="mt-auto flex items-center gap-1 truncate text-[11px] text-sindoor sm:text-xs">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-sindoor" />
            <span className="truncate">{panchang.festivals[0].name}</span>
          </p>
        )}
      </Link>
    </TodayOutline>
  );
}
