"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Boss KC", href: "/leaderboards/bosses" },
  { label: "Points", href: "/leaderboards/points" },
];

export function LeaderboardTabs() {
  const pathname = usePathname();

  return (
    <div className="border-b border-[#d4a843]/10 bg-[#0d0c0a]">
      <nav className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8">
        {TABS.map(({ label, href }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="relative px-5 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase transition-colors"
              style={{
                fontFamily: "var(--font-cinzel), serif",
                color: isActive ? "#d4a843" : "#8a8478",
              }}
            >
              {label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#d4a843]" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
