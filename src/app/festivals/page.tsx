import type { Metadata } from "next";
import { FestivalCard } from "@/components/festivals/festival-card";
import { formatLongDate, todayParts } from "@/lib/date-utils";
import { getDayInfo } from "@/lib/panchang";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Today's festivals",
  description: "Every festival and observance that falls on today's tithi.",
};

export default function TodayFestivalsPage() {
  const { year, month, day } = todayParts();
  const { panchang } = getDayInfo(year, month, day);
  const festivals = panchang.festivals;

  return (
    <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-sm text-ink/55">{formatLongDate(year, month, day)}</p>
      <h1 className="mt-1 font-display text-4xl text-ink sm:text-5xl">Today&rsquo;s festivals</h1>

      {festivals.length === 0 ? (
        <p className="mt-8 max-w-prose text-[15px] leading-relaxed text-ink/70">
          No named festival falls on today&rsquo;s {""}
          <span className="font-display">tithi</span> — an ordinary day on the panchang, which is
          its own kind of quiet. Take a look at what&rsquo;s{" "}
          <a
            href="/festivals/upcoming"
            className="text-sindoor underline decoration-sindoor/40 underline-offset-4 hover:decoration-sindoor"
          >
            coming up
          </a>
          .
        </p>
      ) : (
        <div className="mt-8">
          {festivals.map((festival) => (
            <FestivalCard key={festival.name} festival={festival} />
          ))}
        </div>
      )}
    </section>
  );
}
