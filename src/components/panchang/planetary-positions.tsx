import type { Panchangam } from "@ishubhamx/panchangam-js";

const GRAHAS: { key: keyof Panchangam["planetaryPositions"]; label: string }[] = [
  { key: "sun", label: "Sun" },
  { key: "moon", label: "Moon" },
  { key: "mars", label: "Mars" },
  { key: "mercury", label: "Mercury" },
  { key: "jupiter", label: "Jupiter" },
  { key: "venus", label: "Venus" },
  { key: "saturn", label: "Saturn" },
  { key: "rahu", label: "Rahu" },
  { key: "ketu", label: "Ketu" },
];

export function PlanetaryPositions({ panchang }: { panchang: Panchangam }) {
  return (
    <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      <h3 className="font-display text-lg text-ink">Where the grahas stand</h3>
      <p className="mt-1 text-sm text-ink/60">Rashi placement for each of the nine grahas.</p>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-120 border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-ink/55">
              <th className="py-2 pr-4 font-normal">Graha</th>
              <th className="py-2 pr-4 font-normal">Rashi</th>
              <th className="py-2 pr-4 font-normal">Degree</th>
              <th className="py-2 font-normal">Motion</th>
            </tr>
          </thead>
          <tbody>
            {GRAHAS.map(({ key, label }) => {
              const p = panchang.planetaryPositions[key];
              return (
                <tr key={key} className="border-b border-line/60 last:border-0">
                  <td className="py-2.5 pr-4 font-display text-base text-ink">{label}</td>
                  <td className="py-2.5 pr-4 text-ink/80">{p.rashiName}</td>
                  <td className="py-2.5 pr-4 text-ink/80">{p.degree.toFixed(1)}°</td>
                  <td className="py-2.5 text-ink/80">{p.isRetrograde ? "Retrograde" : "Direct"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
