# Sanatan Calendar

A modern, daily Panchang and festival calendar for the Hindu lunar calendar, built with Next.js and a local astronomical calculation layer. The product focuses on one thing clearly: helping people understand the spiritual and astrological rhythm of each day through accurate, readable data.

This project combines a monthly calendar experience, day-level Panchang breakdowns, upcoming festival tracking, and a themed, responsive interface that works well for both quick browsing and deeper reference.

## Project overview

Sanatan Calendar is a Next.js application that calculates and displays:

- Tithi
- Vara (weekday)
- Nakshatra
- Yoga
- Karana
- Masa and Paksha
- Ritu
- Sunrise and sunset
- Rahu Kalam, Abhijit Muhurta, and other auspicious windows
- Planetary positions
- Festival and observance listings
- Monthly calendar summaries and day-by-day context

The app is intentionally grounded in a specific geographic reference: Ujjain, Madhya Pradesh, India, which is historically treated as the reference meridian for Hindu astronomical calculations.

## Why this project exists

This app is designed for people who want a practical, elegant way to view a daily Panchang without resorting to scattered sources or hard-to-read reference tables. The user experience is intentionally simple:

- Today at a glance
- Deep detail for any day
- Festival awareness for the current and upcoming months
- A calendar view that keeps the lunar context visible

It balances spiritual usefulness with a strong frontend experience.

## Core features

### 1. Daily Panchang experience

The home page and day-specific routes surface a full daily Panchang:

- Tithi and lunar phase status
- Nakshatra, yoga, and karana
- Sunrise/sunset and day segmentation
- Muhurta windows and Choghadiya table
- Planetary position data
- Festival listings relevant to the day

### 2. Monthly calendar navigation

The month view gives a broad lens across the whole month and highlights:

- day-level lunar information
- festival dates
- moon-phase style cues
- today markers
- easy navigation to any date

### 3. Festival awareness

Festival pages make it easy to:

- view what is happening today
- browse a specific date's festival list
- explore festivals in upcoming months

### 4. Theme-aware UI

The app includes a light/dark theme toggle with persistent state, giving a calmer reading experience in both daytime and evening use.

### 5. Offline-friendly frontend patterns

The project includes a service worker and offline fallback support, making the app resilient when network access is limited or when the user revisits the site.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- @ishubhamx/panchangam-js for Panchang calculations
- Custom utility layer for timezone-safe date logic and formatted output

## Architecture

The application is organized around a simple pattern:

1. Compute the required Panchang data for a date and location.
2. Normalize the result into app-friendly structures.
3. Render the data in pages and reusable UI components.
4. Add navigation and presentation logic for calendar/month/festival views.

The core logic is not spread across the app; it is centralized in the library module layer.

## Repository structure

```text
sanatan-calendar/
├── public/
│   ├── offline.html
│   └── sw.js
├── src/
│   ├── app/
│   │   ├── day/[year]/[month]/[day]/page.tsx
│   │   ├── festivals/
│   │   │   ├── day/[year]/[month]/[day]/page.tsx
│   │   │   ├── upcoming/page.tsx
│   │   │   └── page.tsx
│   │   ├── month/
│   │   │   ├── [year]/[month]/page.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── calendar/
│   │   ├── festivals/
│   │   ├── layout/
│   │   └── panchang/
│   ├── hooks/
│   │   └── use-is-today.ts
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── date-utils.ts
│   │   ├── format.ts
│   │   ├── panchang.ts
│   │   ├── Sw.ts
│   │   └── theme-store.ts
│   └── ...
├── package.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── README.md
└── public/
```

## Important implementation details

### Default calculation location

The project calculates Panchang data for Ujjain using the location configured in `src/lib/constants.ts`:

- Latitude: 23.1765
- Longitude: 75.7885
- Elevation: 494 metres
- Timezone offset: UTC+5:30

This corresponds to the conventional reference meridian used in many Hindu astronomical systems. The app centralizes this in a single configuration object so that changing location is straightforward.

### Data flow

The main calculation wrapper is in `src/lib/panchang.ts`.

That module:

- creates a shared `Observer`
- computes daily Panchang data for a given date
- supplies month-level data generation
- exposes festival lookup helpers
- provides naming utilities for tithi, nakshatra, weekday, and yoga values

The date utilities handle timezone-safe conversion and civil noon instants so the calculation is stable across local date boundaries.

### Route behavior

The application uses route-specific pages for different views:

- `/` — current day Panchang
- `/day/[year]/[month]/[day]` — any specific date
- `/month` — month overview entry point
- `/month/[year]/[month]` — specific month view
- `/festivals` — festivals for today
- `/festivals/day/[year]/[month]/[day]` — festivals for a specific day
- `/festivals/upcoming` — upcoming festival listings

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
```

### Run production build locally

```bash
npm run start
```

### Lint the project

```bash
npm run lint
```

## Scripts

This project includes the standard Next.js scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

## Design and user experience notes

Several patterns in the app are worth understanding if you plan to extend it:

- The UI uses a custom design system with readable, spiritual-themed typography.
- Time-based layout decisions remain lightweight and fast.
- The app prefers precomputed or cached page outputs where the underlying data is deterministic.
- The today indicator is handled client-side to avoid stale or incorrect “today” states on cached pages.

## Performance considerations

The app is built to be efficient:

- Panchang calculation is pure CPU work and does not require external API calls at render time.
- Date-specific pages are stable and reusable.
- The app caches pages where appropriate and revalidates only necessary areas.
- Theme preference is stored locally and loaded without flash.

## Future extension ideas

This project already has a strong foundation for expansion. Possible additions include:

- more Panchang subfields from the underlying astronomy library
- configurable observer location from user preferences
- language toggles (English, Hindi, Sanskrit terms)
- search/filtering for festivals by month or observance type
- more detailed astronomical charts
- export options for daily Panchang content

## Contributing

Contributions are welcome if they improve accuracy, UX, or maintainability.

A good contribution usually includes:

- a clear purpose
- a minimal, well-scoped change
- compatibility with the app’s existing architectural patterns
- validation through the project’s lint or build flow

## License

This project does not currently declare a license in the repository metadata, so check the project’s intended distribution terms before reuse or publication.

## Summary

Sanatan Calendar is a focused, polished daily Panchang app that blends astronomy, festival awareness, and a modern calendar UI. It is built around a stable astronomical data source and a thoughtful user experience, making it useful both as a reference tool and as a modern spiritual calendar interface.

If you are exploring this project for the first time, the important files to start with are:

- `src/lib/panchang.ts`
- `src/lib/constants.ts`
- `src/app/page.tsx`
- `src/components/panchang/day-detail.tsx`
- `src/components/calendar/month-grid.tsx`

Those files represent the heart of the app’s domain logic and rendering pipeline.
