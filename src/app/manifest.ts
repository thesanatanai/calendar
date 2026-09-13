import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sanatan Calendar",
    short_name: "Sanatan Calendar",
    background_color: "#ffffff",
    categories: ["education", "productivity"],
    lang: "en",
    orientation: "any",
    start_url: "/",
    id: "/",
    scope: "/",
    description:
      "Sanatan Calendar — Calendars Matter more than Dates. The home to universal truth representing before you the perfect data about whole hindu calendar, upcoming festivals, mhurats, and more.",
    dir: "ltr",
    display: "standalone",
    icons: [
      {
        src: "/192x192.png",
        purpose: "any",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/192x192.png",
        purpose: "maskable",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/512x512.png",
        purpose: "any",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/512x512.png",
        purpose: "maskable",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [{
      src: "/desktop.png",
      form_factor: "wide",
      label: "Desktop View of Sanatan Calendar",
      sizes: "1366x768",
      type: "image/png"
    },
    {
      src: "/desktop1.png",
      form_factor: "wide",
      label: "Multi Section View of Sanatan Calendar",
      sizes: "1366x768",
      type: "image/png"
    },
    {
      src: "/desktop2.png",
      form_factor: "wide",
      label: "Home View of Sanatan Calendar",
      sizes: "1366x768",
      type: "image/png"
    },
    {
      src: "/desktop3.png",
      form_factor: "wide",
      label: "Festivals View of Sanatan Calendar",
      sizes: "1366x768",
      type: "image/png"
    },
    {
      src: "/mobile.png",
      form_factor: "narrow",
      label: "Mobile View of Sanatan Calendar",
      sizes: "450x758",
      type: "image/png"
    },
    {
      src: "/mobile1.png",
      form_factor: "narrow",
      label: "Month View of Sanatan Calendar",
      sizes: "450x758",
      type: "image/png"
    },
    {
      src: "/mobile2.png",
      form_factor: "narrow",
      label: "Planetary View of Sanatan Calendar",
      sizes: "450x758",
      type: "image/png"
    },
    {
      src: "/mobile3.png",
      form_factor: "narrow",
      label: "Mobile View of Sanatan Calendar",
      sizes: "450x758",
      type: "image/png"
    }
  ],
    theme_color: "#ffffff",
  };
}
