export const SITE_NAME = "Sanatan Calendar";

export const SITE_DESCRIPTION =
  "A daily Panchang for the Hindu lunar calendar — tithi, nakshatra, muhurta and festivals, calculated for every day of the year.";

export const SITE_URL = "https://sanatancalendar.vercel.app";

/**
 * Ujjain has served as the reference meridian for Hindu astronomical
 * calculation since antiquity — the "first meridian" of Indian astronomy,
 * the way Greenwich is for the modern world. We use it as the default
 * observing location for panchang calculations across the app.
 */
export const DEFAULT_LOCATION = {
  label: "Ujjain",
  region: "Madhya Pradesh, India",
  latitude: 23.1765,
  longitude: 75.7885,
  elevation: 494, // metres
  /** IST = UTC+5:30 */
  timezoneOffset: 330,
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Today" },
  { href: "/month", label: "Month view" },
  { href: "/festivals", label: "Today's festivals" },
  { href: "/festivals/upcoming", label: "Upcoming festivals" },
] as const;

export const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
