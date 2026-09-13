import type { Panchangam } from "@ishubhamx/panchangam-js";
import { formatTime } from "@/lib/date-utils";
import { nakshatraName, tithiName, weekdayName, yogaName } from "@/lib/panchang";

interface LedgerEntry {
  label: string;
  value: string;
  until?: string;
}

function LedgerRow({ title, entries }: { title: string; entries: LedgerEntry[] }) {
  return (
    <div className="py-6 first:pt-0 last:pb-0">
      <h3 className="font-display text-lg text-ink">{title}</h3>
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-5">
        {entries.map((entry) => (
          <div key={entry.label} className="border-l border-line pl-3.5">
            <p className="text-xs text-ink/55">{entry.label}</p>
            <p className="mt-0.5 font-display text-xl leading-snug text-ink">{entry.value}</p>
            {entry.until && <p className="mt-0.5 text-xs text-ink/50">until {entry.until}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PanchangLedger({ panchang }: { panchang: Panchangam }) {
  const panchanga: LedgerEntry[] = [
    { label: "Tithi", value: tithiName(panchang.tithi), until: formatTime(panchang.tithiEndTime) },
    { label: "Vara", value: weekdayName(panchang.vara) },
    {
      label: "Nakshatra",
      value: nakshatraName(panchang.nakshatra),
      until: formatTime(panchang.nakshatraEndTime),
    },
    { label: "Yoga", value: yogaName(panchang.yoga), until: formatTime(panchang.yogaEndTime) },
    { label: "Karana", value: panchang.karana },
  ];

  const reckoning: LedgerEntry[] = [
    { label: "Paksha", value: panchang.paksha },
    { label: "Masa", value: panchang.masa.isAdhika ? `Adhika ${panchang.masa.name}` : panchang.masa.name },
    { label: "Ritu", value: panchang.ritu },
    { label: "Ayana", value: panchang.ayana },
    { label: "Vikram Samvat", value: `${panchang.samvat.vikram}` },
  ];

  return (
    <section className="mx-auto pt-5 pb-5 max-w-5xl divide-y divide-line px-5 sm:px-8">
      <LedgerRow title="The five limbs — Panchanga" entries={panchanga} />
      <LedgerRow title="Reckoning" entries={reckoning} />
    </section>
  );
}
