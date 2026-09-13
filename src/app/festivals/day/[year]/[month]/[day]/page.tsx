import { formatLongDate } from "@/lib/date-utils";
import { getDayInfo, tithiName } from "@/lib/panchang";
import { daysInMonth } from "@/lib/date-utils";
import { FestivalCard } from "@/components/festivals/festival-card";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// A given calendar date's panchang is a fixed astronomical calculation --
// it never changes after the fact -- so once rendered it can be cached
// indefinitely and reused for every visitor.
export const revalidate = false;
export const dynamicParams = true;

type FestivalPage =  PageProps<"/festivals/day/[year]/[month]/[day]">;

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

export default async function Page({ params }: FestivalPage) {
  const raw = await params;
  const parsed = parseParams(raw);
  if (!parsed) notFound();
  const { panchang } = getDayInfo(parsed.year, parsed.month, parsed.day);
  const festivals = panchang.festivals;
  
    return (
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-sm text-ink/55">{formatLongDate(parsed.year, parsed.month, parsed.day)}</p>
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


export async function generateMetadata({ params }: FestivalPage): Promise<Metadata> {
  const raw = await params;
  const parsed = parseParams(raw);
  if (!parsed) return {};
  const { panchang } = getDayInfo(parsed.year, parsed.month, parsed.day);
  const title = `${tithiName(panchang.tithi)} — ${formatLongDate(parsed.year, parsed.month, parsed.day)}`;
  return {
    title,
    description: `Festivals for ${formatLongDate(parsed.year, parsed.month, parsed.day)}`,
  };
}