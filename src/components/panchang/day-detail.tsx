import type { Panchangam } from "@ishubhamx/panchangam-js";
import { ChoghadiyaTable } from "@/components/panchang/choghadiya-table";
import { FestivalsTeaser } from "@/components/panchang/festivals-teaser";
import { MuhurtaTimeline } from "@/components/panchang/muhurta-timeline";
import { PanchangLedger } from "@/components/panchang/panchang-ledger";
import { PlanetaryPositions } from "@/components/panchang/planetary-positions";
import { TithiHero } from "@/components/panchang/tithi-hero";

interface DayDetailProps {
  year: number;
  month: number;
  day: number;
  panchang: Panchangam;
}

export function DayDetail({ year, month, day, panchang }: DayDetailProps) {
  return (
    <>
      <TithiHero year={year} month={month} day={day} panchang={panchang} />
      <PanchangLedger panchang={panchang} />
      <div className="border-t border-line">
        <MuhurtaTimeline panchang={panchang} />
      </div>
      <div className="border-t border-line">
        <ChoghadiyaTable panchang={panchang} />
      </div>
      <div className="border-t border-line">
        <PlanetaryPositions panchang={panchang} />
      </div>
      <div className="border-t border-line">
        <FestivalsTeaser festivals={panchang.festivals} />
      </div>
    </>
  );
}
