import type { Festival } from "@ishubhamx/panchangam-js";
import { CATEGORY_LABELS } from "@/lib/format";

function DateStamp({ date }: { date: Date }) {
  const day = date.toLocaleDateString("en-IN", { day: "numeric", timeZone: "UTC" });
  const month = date.toLocaleDateString("en-IN", { month: "short", timeZone: "UTC" });
  return (
    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full bg-sindoor text-parchment">
      <span className="font-display text-lg leading-none">{day}</span>
      <span className="text-[10px] leading-none tracking-wide">{month}</span>
    </div>
  );
}

export function FestivalCard({ festival }: { festival: Festival }) {
  return (
    <article className="flex gap-4 border-b border-line py-6 first:pt-0 last:border-0 last:pb-0">
      <DateStamp date={festival.date} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-xl text-ink">{festival.name}</h3>
          <span className="text-xs text-marigold">
            {CATEGORY_LABELS[festival.category] ?? festival.category}
          </span>
        </div>

        {festival.type === "span" && festival.spanDays && (
          <p className="mt-1 text-xs text-ink/55">Spans {festival.spanDays} days</p>
        )}

        {festival.description && (
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink/75">
            {festival.description}
          </p>
        )}

        {festival.observances && festival.observances.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {festival.observances.slice(0, 4).map((o) => (
              <li key={o} className="rounded-full bg-parchment-soft px-2.5 py-1 text-xs text-ink/70">
                {o}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
