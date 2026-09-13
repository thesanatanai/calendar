import { DEFAULT_LOCATION, SITE_NAME } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="bg-night text-moonlight/70">
      <div className="mx-auto max-w-5xl px-5 py-8 text-sm sm:px-8">
        <p className="font-display text-base text-moonlight">{SITE_NAME}</p>
        <p className="mt-2 max-w-prose leading-relaxed">
          Panchang calculated for {DEFAULT_LOCATION.label}, {DEFAULT_LOCATION.region} — the
          traditional reference meridian of Indian astronomy — using sunrise-anchored Udaya
          Tithi, in the way a printed almanac would reckon the day.
        </p>
        <p className="mt-4 text-lg text-moonlight">
          Powered by <a href="https://sanatan-ai.vercel.app" className="underline text-blue-400">Sanatan AI</a>
        </p>
      </div>
    </footer>
  );
}
