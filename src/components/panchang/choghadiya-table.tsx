import type { Panchangam } from "@ishubhamx/panchangam-js";
import { formatTime } from "@/lib/date-utils";

const RATING_STYLES: Record<string, string> = {
  good: "bg-marigold/15 text-marigold",
  bad: "bg-sindoor/15 text-sindoor",
  neutral: "bg-peacock/15 text-peacock",
};

export function ChoghadiyaTable({ panchang }: { panchang: Panchangam }) {
  const day = panchang.choghadiya?.day ?? [];
  if (day.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      <h3 className="font-display text-lg text-ink">Choghadiya — daytime</h3>
      <p className="mt-1 text-sm text-ink/60">
        Eight divisions of the daylight hours, each carrying its own character.
      </p>
      <ol className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {day.map((interval, i) => (
          <li
            key={`${interval.name}-${i}`}
            className="flex items-center justify-between gap-3 border-l border-line pl-3.5 text-sm"
          >
            <span className="flex items-center gap-2">
              <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${RATING_STYLES[interval.rating]}`}>
                {interval.name}
              </span>
            </span>
            <span className="text-ink/70">
              {formatTime(interval.startTime)} – {formatTime(interval.endTime)}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
