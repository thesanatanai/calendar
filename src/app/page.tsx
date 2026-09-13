import { DayDetail } from "@/components/panchang/day-detail";
import { getDayInfo } from "@/lib/panchang";
import { todayParts } from "@/lib/date-utils";

// Panchang doesn't need to be recomputed on every request -- the tithi
// only changes once a day, at sunrise -- so an hourly revalidation keeps
// the page fast (served from cache) while staying accurate.
export const revalidate = 3600;

export default function HomePage() {
  const { year, month, day } = todayParts();
  const { panchang } = getDayInfo(year, month, day, "amanta");

  return <DayDetail year={year} month={month} day={day} panchang={panchang} />;
}
