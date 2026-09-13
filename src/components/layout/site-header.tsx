"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import Image from "next/image";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-night text-moonlight">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/logo.png" width={28} height={28} alt="Snatan Logo" />
          <span className="font-display text-xl leading-none tracking-tight text-moonlight">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded px-3 py-2 text-sm transition-colors ${
                isActive(pathname, link.href)
                  ? "bg-white/10 text-marigold-soft"
                  : "text-moonlight/85 hover:text-marigold-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 border-l border-moonlight/15 pl-3">
            <ThemeToggle />
          </div>
          <a
          href="https://sanatan-ai.vercel.app"
          className="group relative overflow-hidden rounded-full p-2 hover:pl-21.5 text-sm transition-all ease duration-500 flex justify-center items-center gap-2 border border-moonlight/25 text-marigold-soft ml-2"
          >
           <Image src="/logo.png" alt="Logo" width={30} height={30} />
           <span className="absolute right-20 group-hover:right-11 transition-all ease duration-500 w-17.5">Sanatan AI</span>
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded border border-moonlight/30"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path
                  d="M2 5h14M2 9h14M2 13h14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
            </svg>
          </button>
        </div>
      </div>
        <nav className={`flex flex-col gap-1 p-5 h-screen w-screen fixed top-0 transition-all ease-in-out duration-500 z-1 bg-night sm:hidden ${open ? "left-0" : "left-full"}`}>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded border border-moonlight/30 ml-auto mb-2"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              
                <path
                  d="M3 3l12 12M15 3L3 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
            </svg>
          </button>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded px-3 py-2.5 text-sm ${
                isActive(pathname, link.href)
                  ? "bg-white/10 text-marigold-soft"
                  : "text-moonlight/85"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href="https://sanatan-ai.vercel.app" className="rounded px-3 py-2.5 text-lg mt-auto bg-white/10 text-marigold-soft flex justify-center items-center gap-2">
           <Image src="/logo.png" alt="Logo" width={30} height={30} />
           Sanatan AI
          </a>
        </nav>
    </header>
  );
}
