import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/manrope";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";
import Sw from "@/lib/Sw";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Daily Panchang, tithi & festivals`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: "/192x192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/192x192.png", sizes: "192x192", type: "image/png" }],
  },
  creator: "Shivam Sharma",
  publisher: "Sanatan AI",
  openGraph: {
    title: `${SITE_NAME} — Daily Panchang, tithi & festivals`,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    emails: "shivam8299.sharma@gmail.com",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Daily Panchang, Tithi and Festivals`,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  authors: {
    name: "Shivam Sharma",
    url: "https://shivamsharma999.github.io",
  },
  keywords: [
    "Sanatan AI",
    "Sanatan Calendar",
    "AI Calendar",
    "Sanatan",
    "Calendar",
    "hindu calendar",
    "Gemini calendar",
    "Sanatan panchang",
    "panchang",
  ],
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef2f0" },
    { media: "(prefers-color-scheme: dark)", color: "#10131f" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Runs before hydration so the correct theme class is on <html> for the
// very first paint -- otherwise a light page flashes before switching to
// a stored dark preference.
const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col bg-parchment font-body text-ink antialiased">
        <Sw />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
