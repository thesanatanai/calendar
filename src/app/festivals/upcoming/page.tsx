import type { Metadata } from "next";
import { FestivalCard } from "@/components/festivals/festival-card";
import { groupFestivalsByMonth } from "@/lib/format";
import { getUpcomingFestivals } from "@/lib/panchang";

export const revalidate = 21600; // 6 hours

export const metadata: Metadata = {
  title: "Upcoming festivals",
  description: "Festivals and observances over the months ahead, grouped by month.",
};

const LOOKAHEAD_DAYS = 180;

export default function UpcomingFestivalsPage() {
  const festivals = getUpcomingFestivals(new Date(), LOOKAHEAD_DAYS);
  const groups = groupFestivalsByMonth(festivals);

  return (
    <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-sm text-ink/55">Next {LOOKAHEAD_DAYS} days</p>
      <h1 className="mt-1 font-display text-4xl text-ink sm:text-5xl">Upcoming festivals</h1>

      {groups.length === 0 ? (
        <p className="mt-8 text-[15px] text-ink/70">Nothing on the calendar in this window.</p>
      ) : (
        <div className="mt-10 space-y-12">
          {groups.map((group) => (
            <div key={group.label}>
              <h2 className="font-display text-2xl text-ink">{group.label}</h2>
              <div className="mt-4 border-t border-line">
                {group.items.map((festival) => (
                  <FestivalCard key={`${festival.name}-${festival.date.toISOString()}`} festival={festival} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
