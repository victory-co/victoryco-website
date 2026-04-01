"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface NavProps {
  discordInviteUrl: string;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/leaderboards/bosses", label: "Leaderboards" },
  { href: "/ranks", label: "Ranks" },
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
              {/* Clan logo */}
              <Image
                src="/logo.jpg"
                alt="Victory Co logo"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover border border-[#d4a843]/30 transition-all duration-200 group-hover:border-[#d4a843]/60"
              />
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
                  <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
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
              <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
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
