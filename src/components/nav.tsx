"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface NavProps {
  discordInviteUrl: string;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/leaderboards/bosses", label: "Leaderboards" },
  { href: "/gallery", label: "Gallery" },
] as const;

export function Nav({ discordInviteUrl }: NavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300 ease-out",
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.8)]"
            : "bg-[#0a0a0a]/80 backdrop-blur-sm",
        ].join(" ")}
      >
        {/* Gold bottom edge — gilded trim */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a843] to-transparent opacity-60" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-18">
            {/* Logo / Brand */}
            <Link
              href="/"
              className="group relative flex items-center gap-3"
              onClick={() => setMobileOpen(false)}
            >
              {/* Decorative crown glyph */}
              <span className="flex h-9 w-9 items-center justify-center rounded border border-[#d4a843]/30 bg-[#d4a843]/10 text-lg leading-none text-[#d4a843] transition-colors duration-200 group-hover:border-[#d4a843]/60 group-hover:bg-[#d4a843]/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M2 19h20v2H2v-2zm2-2h16l-1-9-5 4-4-6-4 6-5-4-1 9h4z" />
                </svg>
              </span>
              <span
                className="text-lg font-bold tracking-[0.15em] text-[#e8dcc8] uppercase transition-colors duration-200 group-hover:text-[#d4a843]"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                Victory Co
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map(({ href, label }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={[
                      "relative px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-200",
                      active
                        ? "text-[#d4a843]"
                        : "text-[#8a8478] hover:text-[#e8dcc8]",
                    ].join(" ")}
                    style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                  >
                    {label}
                    {/* Active underline indicator */}
                    <span
                      className={[
                        "absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-[#d4a843] transition-all duration-300",
                        active ? "w-6 opacity-100" : "w-0 opacity-0",
                      ].join(" ")}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right side: Discord CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              {/* Discord CTA — desktop */}
              <a
                href={discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta relative hidden overflow-hidden rounded border border-[#d4a843]/40 bg-[#d4a843]/10 px-5 py-2 text-xs font-bold tracking-[0.15em] text-[#d4a843] uppercase transition-all duration-300 hover:border-[#d4a843]/80 hover:bg-[#d4a843]/20 hover:shadow-[0_0_20px_rgba(212,168,67,0.15)] lg:inline-flex lg:items-center lg:gap-2"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {/* Discord icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
                Join Discord
                {/* Hover glow sweep */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#d4a843]/10 to-transparent transition-transform duration-500 group-hover/cta:translate-x-full" />
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="relative flex h-10 w-10 items-center justify-center rounded border border-[#d4a843]/20 bg-transparent text-[#8a8478] transition-colors duration-200 hover:border-[#d4a843]/40 hover:text-[#d4a843] lg:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {/* Animated hamburger → X */}
                <span className="relative flex h-4 w-5 flex-col items-center justify-center">
                  <span
                    className={[
                      "absolute h-px w-5 bg-current transition-all duration-300",
                      mobileOpen ? "rotate-45" : "-translate-y-1.5",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute h-px w-5 bg-current transition-all duration-300",
                      mobileOpen ? "opacity-0 scale-x-0" : "opacity-100",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute h-px w-5 bg-current transition-all duration-300",
                      mobileOpen ? "-rotate-45" : "translate-y-1.5",
                    ].join(" ")}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={[
          "fixed inset-0 z-40 flex flex-col transition-all duration-300 lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0a0a0a]/98 backdrop-blur-lg"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu content */}
        <div
          className={[
            "relative mt-16 flex flex-1 flex-col items-center justify-center gap-2 transition-all duration-500",
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0",
          ].join(" ")}
        >
          {/* Decorative top line */}
          <div className="mb-6 h-px w-12 bg-gradient-to-r from-transparent via-[#d4a843]/50 to-transparent" />

          {NAV_LINKS.map(({ href, label }, i) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "px-6 py-3 text-center text-sm font-semibold tracking-[0.25em] uppercase transition-all duration-200",
                  active
                    ? "text-[#d4a843]"
                    : "text-[#6b6560] hover:text-[#e8dcc8]",
                ].join(" ")}
                style={{
                  fontFamily: "var(--font-raleway), sans-serif",
                  transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                }}
              >
                {label}
              </Link>
            );
          })}

          {/* Decorative divider */}
          <div className="my-4 h-px w-12 bg-gradient-to-r from-transparent via-[#d4a843]/30 to-transparent" />

          {/* Discord CTA — mobile */}
          <a
            href={discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded border border-[#d4a843]/40 bg-[#d4a843]/10 px-8 py-3 text-xs font-bold tracking-[0.2em] text-[#d4a843] uppercase transition-all duration-300 hover:border-[#d4a843]/80 hover:bg-[#d4a843]/20"
            style={{
              fontFamily: "var(--font-raleway), sans-serif",
              transitionDelay: mobileOpen ? `${NAV_LINKS.length * 60}ms` : "0ms",
            }}
            onClick={() => setMobileOpen(false)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            Join Discord
          </a>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16 lg:h-18" />
    </>
  );
}
