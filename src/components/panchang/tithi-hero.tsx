import type { Panchangam } from "@ishubhamx/panchangam-js";
import { MoonPhase } from "@/components/panchang/moon-phase";
import { TodayBadge } from "@/components/panchang/today-badge";
import { formatLongDate, formatTime } from "@/lib/date-utils";
import { describeDay } from "@/lib/format";
import { tithiName } from "@/lib/panchang";

interface TithiHeroProps {
  year: number;
  month: number;
  day: number;
  panchang: Panchangam;
}

export function TithiHero({ year, month, day, panchang }: TithiHeroProps) {
  const dateKey = `${year}-${month}-${day}`;

  return (
    <section className="overflow-hidden bg-night text-moonlight">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
        <div className="flex justify-center md:justify-start">
          <MoonPhase
            tithi={panchang.tithi}
            seed={dateKey}
            size={168}
            className="animate-fade-up"
          />
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-moonlight/70">{formatLongDate(year, month, day)}</p>
            <TodayBadge year={year} month={month} day={day} />
          </div>

          <h1 className="mt-2 font-display text-5xl leading-[1.05] tracking-tight text-moonlight sm:text-6xl">
            {tithiName(panchang.tithi)}
          </h1>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-moonlight/80">
            {describeDay(panchang)}
          </p>

          <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-moonlight/55">Sunrise</dt>
              <dd className="font-display text-lg text-marigold-soft">
                {formatTime(panchang.sunrise)}
              </dd>
            </div>
            <div>
              <dt className="text-moonlight/55">Sunset</dt>
              <dd className="font-display text-lg text-marigold-soft">
                {formatTime(panchang.sunset)}
              </dd>
            </div>
            <div>
              <dt className="text-moonlight/55">Moonrise</dt>
              <dd className="font-display text-lg text-marigold-soft">
                {formatTime(panchang.moonrise)}
              </dd>
            </div>
            <div>
              <dt className="text-moonlight/55">Moonset</dt>
              <dd className="font-display text-lg text-marigold-soft">
                {formatTime(panchang.moonset)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
