export default function DayLoading() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div className="flex items-center justify-center gap-3 text-ink/60 animate-pulse-soft">
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <circle cx="11" cy="11" r="9" fill="var(--color-night)" />
          <path d="M11 2a9 9 0 0 0 0 18 7.2 7.2 0 0 1 0-18Z" fill="var(--color-moonlight)" />
        </svg>
        <span className="text-sm">Reading the day&rsquo;s panchang…</span>
      </div>
    </div>
  );
}
