import { illuminatedFraction, isWaxing } from "@/lib/panchang";

interface MoonPhaseProps {
  tithi: number;
  /** Unique-enough string to key the clip path (e.g. a date key). */
  seed: string;
  size?: number;
  className?: string;
}

/**
 * Renders the moon's illuminated disc for a given tithi (1-30) as two
 * offset circles clipped to a round viewport -- a simple, robust
 * stylisation of the lunar terminator that scales cleanly at any size
 * without relying on hand-tuned elliptical arcs.
 */
export function MoonPhase({ tithi, seed, size = 120, className }: MoonPhaseProps) {
  const r = size / 2;
  const cx = r;
  const cy = r;
  const k = illuminatedFraction(tithi);
  const waxing = isWaxing(tithi);
  const offset = 2 * r * k;
  const darkCx = waxing ? cx - offset : cx + offset;
  const clipId = `moon-clip-${seed}`;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Moon illumination for tithi ${tithi} of 30`}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <circle cx={cx} cy={cy} r={r} fill="var(--color-moonlight)" />
        {k < 0.995 && <circle cx={darkCx} cy={cy} r={r} fill="var(--color-night)" />}
      </g>
      <circle
        cx={cx}
        cy={cy}
        r={r - 0.75}
        fill="none"
        stroke="var(--color-moonlight)"
        strokeOpacity={0.25}
        strokeWidth={1.5}
      />
    </svg>
  );
}
