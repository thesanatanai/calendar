import { redirect } from "next/navigation";
import { todayParts } from "@/lib/date-utils";

export default function MonthIndexPage() {
  const { year, month } = todayParts();
  redirect(`/month/${year}/${month}`);
}
