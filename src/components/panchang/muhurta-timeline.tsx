import type { Panchangam } from "@ishubhamx/panchangam-js";
import { formatTime } from "@/lib/date-utils";

interface Segment {
  label: string;
  start: Date;
  end: Date;
  tone: "auspicious" | "caution";
}

function toRatio(date: Date, dayStart: number, dayEnd: number) {
  const span = dayEnd - dayStart;
  if (span <= 0) return 0;
  return Math.min(1, Math.max(0, (date.getTime() - dayStart) / span));
}

export function MuhurtaTimeline({ panchang }: { panchang: Panchangam }) {
  if (!panchang.sunrise || !panchang.sunset) return null;

  const dayStart = panchang.sunrise.getTime();
  const dayEnd = panchang.sunset.getTime();

  const segments: Segment[] = [];
  if (panchang.rahuKalamStart && panchang.rahuKalamEnd) {
    segments.push({
      label: "Rahu Kalam",
      start: panchang.rahuKalamStart,
      end: panchang.rahuKalamEnd,
      tone: "caution",
    });
  }
  if (panchang.yamagandaKalam) {
    segments.push({
      label: "Yamaganda Kalam",
      start: panchang.yamagandaKalam.start,
      end: panchang.yamagandaKalam.end,
      tone: "caution",
    });
  }
  if (panchang.gulikaKalam) {
    segments.push({
      label: "Gulika Kalam",
      start: panchang.gulikaKalam.start,
      end: panchang.gulikaKalam.end,
      tone: "caution",
    });
  }
  if (panchang.abhijitMuhurta) {
    segments.push({
      label: "Abhijit Muhurta",
      start: panchang.abhijitMuhurta.start,
      end: panchang.abhijitMuhurta.end,
      tone: "auspicious",
    });
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      <h3 className="font-display text-lg text-ink">The day, hour by hour</h3>
      <p className="mt-1 text-sm text-ink/60">
        Sunrise {formatTime(panchang.sunrise)} to sunset {formatTime(panchang.sunset)}, with the
        periods worth planning around.
      </p>

      <div className="relative mt-6 h-2 rounded-full bg-parchment-soft">
        {segments.map((segment) => {
          const left = toRatio(segment.start, dayStart, dayEnd) * 100;
          const right = toRatio(segment.end, dayStart, dayEnd) * 100;
          return (
            <div
              key={segment.label}
              className={`absolute top-0 h-2 rounded-full ${
                segment.tone === "auspicious" ? "bg-marigold" : "bg-sindoor"
              }`}
              style={{ left: `${left}%`, width: `${Math.max(1, right - left)}%` }}
              title={`${segment.label}: ${formatTime(segment.start)} – ${formatTime(segment.end)}`}
            />
          );
        })}
      </div>

      <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-ink/80">
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full ${
                  segment.tone === "auspicious" ? "bg-marigold" : "bg-sindoor"
                }`}
              />
              {segment.label}
            </span>
            <span className="font-display text-ink">
              {formatTime(segment.start)} – {formatTime(segment.end)}
            </span>
          </li>
        ))}
        {panchang.brahmaMuhurta && (
          <li className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-ink/80">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-peacock" />
              Brahma Muhurta (pre-dawn)
            </span>
            <span className="font-display text-ink">
              {formatTime(panchang.brahmaMuhurta.start)} – {formatTime(panchang.brahmaMuhurta.end)}
            </span>
          </li>
        )}
      </ul>
    </section>
  );
}
