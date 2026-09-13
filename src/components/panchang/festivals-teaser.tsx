import Link from "next/link";
import type { Festival } from "@ishubhamx/panchangam-js";

export function FestivalsTeaser({ festivals, date: preDate }: { festivals: Festival[], date?: Date }) {
  const date = preDate ?? festivals[0]?.date;
  return (
    <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      <div className="rounded-lg border border-line bg-parchment-soft/60 p-6">
        <h3 className="font-display text-lg text-ink">Festivals today</h3>
        {!date ? (
          <p className="mt-2 text-sm text-ink/65">
            No named festival falls on this day — an ordinary tithi, well spent.
          </p>
        ) : (
          <>
            <ul className="mt-3 flex flex-wrap gap-2">
              {festivals.map((f) => (
                <li
                  key={f.name}
                  className="rounded-full bg-marigold/15 px-3 py-1 text-sm text-ink"
                >
                  {f.name}
                </li>
              ))}
            </ul>

            <Link
              href={`/festivals/day/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`}
              className="mt-4 inline-block text-sm text-sindoor underline decoration-sindoor/40 underline-offset-4 hover:decoration-sindoor"
            >
              Full details on festivals
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
