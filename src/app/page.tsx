import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

/* ─── Decorative SVG Components ─── */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CrownIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 56" fill="none" className={className} aria-hidden="true">
      <path
        d="M32 4L24 20L8 10L12 40H52L56 10L40 20L32 4Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <rect x="10" y="42" width="44" height="6" rx="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="32" cy="16" r="2.5" fill="currentColor" fillOpacity="0.6" />
      <circle cx="20" cy="22" r="2" fill="currentColor" fillOpacity="0.4" />
      <circle cx="44" cy="22" r="2" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-1">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a843]/40" />
      <svg viewBox="0 0 12 12" className="h-2 w-2 text-[#d4a843]/50" fill="currentColor" aria-hidden="true">
        <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" />
      </svg>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a843]/40" />
    </div>
  );
}

function SwordsDivider() {
  return (
    <div className="relative mx-auto my-20 flex w-full max-w-md items-center justify-center">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a843]/20 to-[#d4a843]/40" />
      <div className="mx-4 flex items-center gap-1">
        <svg viewBox="0 0 24 24" className="h-5 w-5 -rotate-45 text-[#d4a843]/30" fill="currentColor" aria-hidden="true">
          <path d="M6.92 5H5l9 9 1-.94-4.32-4.33L13 6.42V5h-1.92l-2.54 2.54L6.92 5zM3.59 3.59L2.17 5l6.59 6.59-3.17 3.17.71.71L9.47 12.3l2.83 2.83.71-.71-3.17-3.17L16.41 4.68l1.42 1.42 2-2.82-2.83 2L15.59 3.86 9.76 9.69 3.59 3.59z" />
        </svg>
        <svg viewBox="0 0 8 8" className="h-1.5 w-1.5 text-[#d4a843]/50" fill="currentColor" aria-hidden="true">
          <path d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z" />
        </svg>
        <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-45 scale-x-[-1] text-[#d4a843]/30" fill="currentColor" aria-hidden="true">
          <path d="M6.92 5H5l9 9 1-.94-4.32-4.33L13 6.42V5h-1.92l-2.54 2.54L6.92 5zM3.59 3.59L2.17 5l6.59 6.59-3.17 3.17.71.71L9.47 12.3l2.83 2.83.71-.71-3.17-3.17L16.41 4.68l1.42 1.42 2-2.82-2.83 2L15.59 3.86 9.76 9.69 3.59 3.59z" />
        </svg>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4a843]/20 to-[#d4a843]/40" />
    </div>
  );
}

/* ─── Activity Card ─── */

function ActivityCard({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="group relative overflow-hidden rounded border border-[#d4a843]/10 bg-[#111010] p-5 transition-all duration-300 hover:border-[#d4a843]/30 hover:shadow-[0_0_30px_rgba(212,168,67,0.06)]">
      <div className="mb-3 text-[#d4a843]/70 transition-colors duration-300 group-hover:text-[#d4a843]">
        {icon}
      </div>
      <h4
        className="mb-1.5 text-sm font-semibold tracking-[0.12em] text-[#e8dcc8] uppercase"
        style={{ fontFamily: "var(--font-cinzel), serif" }}
      >
        {title}
      </h4>
      <p
        className="text-sm leading-relaxed text-[#8a8478]"
        style={{ fontFamily: "var(--font-raleway), sans-serif" }}
      >
        {desc}
      </p>
    </div>
  );
}

/* ─── Requirement Badge ─── */

function RequirementBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded border border-[#d4a843]/15 bg-[#111010] px-6 py-5 transition-all duration-300 hover:border-[#d4a843]/30">
      <span
        className="text-xl font-bold tracking-wide text-[#d4a843]"
        style={{ fontFamily: "var(--font-cinzel), serif" }}
      >
        {value}
      </span>
      <span
        className="text-xs tracking-[0.15em] text-[#8a8478] uppercase"
        style={{ fontFamily: "var(--font-raleway), sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── React type import ─── */
import type { ReactNode } from "react";

/* ─── Page ─── */

export default function Home() {
  const discordInviteUrl = process.env.DISCORD_INVITE_URL || "#";
  const womGroupUrl = process.env.WOM_GROUP_URL || "#";

  return (
    <main className="relative overflow-hidden">
      {/* ━━━ HERO ━━━ */}
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 pt-16">
        {/* Atmospheric background layers */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        {/* Radial glow behind logo */}
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,67,0.06)_0%,transparent_70%)]" />
        {/* Subtle vertical light beams */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_20%,rgba(212,168,67,0.015)_20.5%,transparent_21%,transparent_49.5%,rgba(212,168,67,0.02)_50%,transparent_50.5%,transparent_79%,rgba(212,168,67,0.015)_79.5%,transparent_80%)]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Clan logo */}
          <div className="relative mb-8">
            <div className="absolute -inset-5 rounded-full border border-[#d4a843]/10" />
            <div className="absolute -inset-10 rounded-full border border-[#d4a843]/5" />
            <Image
              src="/logo.jpg"
              alt="Victory Co logo"
              width={200}
              height={200}
              className="h-36 w-36 rounded-full object-cover sm:h-44 sm:w-44"
              priority
            />
          </div>

          {/* Clan name */}
          <h1
            className="mb-4 text-4xl font-bold tracking-[0.3em] text-[#e8dcc8] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            VICTORY CO
          </h1>

          <GoldDivider />

          {/* Tagline */}
          <p
            className="mt-4 text-sm tracking-[0.25em] text-[#8a8478] uppercase sm:text-base"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            PvM &middot; Social &middot; Raiding &middot; Skilling &middot; Events
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
            {/* Primary CTA */}
            <a
              href={discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-2.5 overflow-hidden rounded border border-[#d4a843]/50 bg-[#d4a843]/10 px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-[#d4a843] uppercase transition-all duration-300 hover:border-[#d4a843] hover:bg-[#d4a843]/20 hover:shadow-[0_0_40px_rgba(212,168,67,0.15)]"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
              </svg>
              Join Discord
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#d4a843]/10 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            </a>

            {/* Secondary CTA */}
            <a
              href={womGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-[#e8dcc8]/15 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-[#8a8478] uppercase transition-all duration-300 hover:border-[#e8dcc8]/30 hover:text-[#e8dcc8]"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              View on WOM
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-[#8a8478]/50">
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-[#d4a843]/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* ━━━ WHO WE ARE ━━━ */}
      <section className="relative px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Text — left */}
              <div>
                <span
                  className="mb-4 inline-block text-xs tracking-[0.3em] text-[#d4a843]/70 uppercase"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  Our Story
                </span>
                <h2
                  className="mb-6 text-3xl font-bold tracking-[0.08em] text-[#e8dcc8] sm:text-4xl"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  Who We Are
                </h2>
                <div className="mb-6 h-px w-12 bg-gradient-to-r from-[#d4a843]/50 to-transparent" />
                <p
                  className="mb-5 text-base leading-[1.8] text-[#8a8478] sm:text-lg"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  Founded by three friends with a shared vision: to build a clan that balances
                  fun, learning, and community.
                </p>
                <p
                  className="text-base leading-[1.8] text-[#8a8478] sm:text-lg"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  We&rsquo;re an active, friendly group that welcomes learners and veterans
                  alike. Whether you&rsquo;re tackling your first raid or grinding for the
                  pet, there&rsquo;s a place for you here.
                </p>
              </div>

              {/* Image — right */}
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#d4a843]/10 bg-[#111010]">
                  <Image
                    src="/bosses/chambers_of_xeric.png"
                    alt="Chambers of Xeric — a clan favorite"
                    width={600}
                    height={450}
                    className="h-full w-full object-cover opacity-80 transition-transform duration-700 hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/20" />
                  {/* Corner accents */}
                  <div className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-[#d4a843]/40 to-transparent" />
                  <div className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-[#d4a843]/40 to-transparent" />
                  <div className="absolute bottom-0 right-0 h-8 w-px bg-gradient-to-t from-[#d4a843]/40 to-transparent" />
                  <div className="absolute bottom-0 right-0 h-px w-8 bg-gradient-to-l from-[#d4a843]/40 to-transparent" />
                </div>
                {/* Floating label */}
                <div
                  className="absolute -bottom-3 left-6 rounded border border-[#d4a843]/20 bg-[#0a0a0a] px-4 py-1.5 text-[10px] tracking-[0.2em] text-[#d4a843]/60 uppercase"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  Chambers of Xeric
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SwordsDivider />

      {/* ━━━ WHAT WE DO ━━━ */}
      <section className="relative px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Image — left */}
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#d4a843]/10 bg-[#111010]">
                  <Image
                    src="/bosses/theatre_of_blood.png"
                    alt="Theatre of Blood — endgame raiding"
                    width={600}
                    height={450}
                    className="h-full w-full object-cover opacity-80 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/20" />
                  <div className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-[#d4a843]/40 to-transparent" />
                  <div className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-[#d4a843]/40 to-transparent" />
                  <div className="absolute bottom-0 right-0 h-8 w-px bg-gradient-to-t from-[#d4a843]/40 to-transparent" />
                  <div className="absolute bottom-0 right-0 h-px w-8 bg-gradient-to-l from-[#d4a843]/40 to-transparent" />
                </div>
                <div
                  className="absolute -bottom-3 right-6 rounded border border-[#d4a843]/20 bg-[#0a0a0a] px-4 py-1.5 text-[10px] tracking-[0.2em] text-[#d4a843]/60 uppercase"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  Theatre of Blood
                </div>
              </div>

              {/* Text — right */}
              <div className="order-1 lg:order-2">
                <span
                  className="mb-4 inline-block text-xs tracking-[0.3em] text-[#d4a843]/70 uppercase"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  Activities
                </span>
                <h2
                  className="mb-6 text-3xl font-bold tracking-[0.08em] text-[#e8dcc8] sm:text-4xl"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  What We Do
                </h2>
                <div className="mb-8 h-px w-12 bg-gradient-to-r from-[#d4a843]/50 to-transparent" />

                {/* Activity grid */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <ActivityCard
                    icon={
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                        <path d="M6.92 5H5l9 9 1-.94-4.32-4.33L13 6.42V5h-1.92l-2.54 2.54L6.92 5zM14.59 12.17l4.59 4.59-1.41 1.41-4.59-4.59 1.41-1.41z" />
                      </svg>
                    }
                    title="PvM Bossing"
                    desc="Group raids, boss masses, and learner sessions for all levels."
                  />
                  <ActivityCard
                    icon={
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z" />
                      </svg>
                    }
                    title="Competitions"
                    desc="SOTW, BOTW, bingos, and seasonal events with prizes."
                  />
                  <ActivityCard
                    icon={
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                      </svg>
                    }
                    title="Learning"
                    desc="Mentorship for new raiders. No one gets left behind."
                  />
                  <ActivityCard
                    icon={
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                        <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
                      </svg>
                    }
                    title="Community"
                    desc="Drop parties, movie nights, and vibes beyond the game."
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SwordsDivider />

      {/* ━━━ COMPETE ━━━ */}
      <section className="relative px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Text — left */}
              <div>
                <span
                  className="mb-4 inline-block text-xs tracking-[0.3em] text-[#d4a843]/70 uppercase"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  Rank Progression
                </span>
                <h2
                  className="mb-6 text-3xl font-bold tracking-[0.08em] text-[#e8dcc8] sm:text-4xl"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  Rise Through the Ranks
                </h2>
                <div className="mb-6 h-px w-12 bg-gradient-to-r from-[#d4a843]/50 to-transparent" />
                <p
                  className="mb-8 text-base leading-[1.8] text-[#8a8478] sm:text-lg"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  Earn points through daily play, competitions, boss milestones, events,
                  and teaching. Climb 11 ranks from Prospect of Victory all the way to
                  Ascendant Victor — consistency beats grinding.
                </p>
                <Link
                  href="/ranks"
                  className="group/link inline-flex items-center gap-2 rounded border border-[#d4a843]/30 bg-[#d4a843]/5 px-6 py-3 text-xs font-bold tracking-[0.2em] text-[#d4a843] uppercase transition-all duration-300 hover:border-[#d4a843]/60 hover:bg-[#d4a843]/10 hover:shadow-[0_0_30px_rgba(212,168,67,0.1)]"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  View Ranks
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true">
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </Link>
              </div>

              {/* Rank ladder teaser — right */}
              <div className="relative">
                <div className="overflow-hidden rounded-lg border border-[#d4a843]/10 bg-[#111010]">
                  {/* Header bar */}
                  <div className="flex items-center gap-3 border-b border-[#d4a843]/10 px-5 py-3">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#d4a843]/60" aria-hidden="true">
                      <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                    </svg>
                    <span
                      className="text-xs tracking-[0.15em] text-[#8a8478] uppercase"
                      style={{ fontFamily: "var(--font-cinzel), serif" }}
                    >
                      Rank Ladder
                    </span>
                  </div>
                  {/* Rank preview rows */}
                  {[
                    { name: "Prospect of Victory", pts: 15, opacity: 0.08 },
                    { name: "Squire of Triumph", pts: 60, opacity: 0.12 },
                    { name: "Victor", pts: 150, opacity: 0.16 },
                    { name: "Vanquisher", pts: 290, opacity: 0.2 },
                    { name: "Ascendant Victor", pts: 900, opacity: 0.28 },
                  ].map((rank) => (
                    <div
                      key={rank.name}
                      className="flex items-center gap-4 border-b border-[#ffffff]/[0.03] px-5 py-3 transition-colors duration-200 last:border-0 hover:bg-[#d4a843]/[0.03]"
                      style={{ backgroundColor: `rgba(212,168,67,${rank.opacity * 0.3})` }}
                    >
                      <span
                        className="flex-1 text-sm font-semibold"
                        style={{
                          fontFamily: "var(--font-cinzel), serif",
                          color: rank.pts === 900 ? "#d4a843" : "#e8dcc8",
                        }}
                      >
                        {rank.name}
                      </span>
                      <span
                        className="text-xs tabular-nums text-[#8a8478]"
                        style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                      >
                        {rank.pts} pts
                      </span>
                    </div>
                  ))}
                </div>
                {/* Corner accents */}
                <div className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-[#d4a843]/30 to-transparent" />
                <div className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-[#d4a843]/30 to-transparent" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SwordsDivider />

      {/* ━━━ JOIN CTA FOOTER ━━━ */}
      <section className="relative px-4 py-24 sm:py-32">
        {/* Background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.04)_0%,transparent_70%)]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <Image
              src="/logo.jpg"
              alt="Victory Co logo"
              width={64}
              height={64}
              className="mx-auto mb-6 h-16 w-16 rounded-full object-cover"
            />

            <h2
              className="mb-4 text-3xl font-bold tracking-[0.12em] text-[#e8dcc8] sm:text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              Join the Company
            </h2>

            <GoldDivider />

            <p
              className="mx-auto mt-5 mb-12 max-w-lg text-base leading-[1.8] text-[#8a8478] sm:text-lg"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              Ready to join? Make sure you meet the requirements below, then hop
              into our Discord to get started.
            </p>

            {/* Requirements grid */}
            <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <RequirementBadge value="1250+" label="Total Level" />
              <RequirementBadge value="100+" label="Combat Level" />
              <RequirementBadge value="Discord" label="Required" />
              <RequirementBadge value="Irons" label="Welcome" />
            </div>

            {/* Final CTA */}
            <a
              href={discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/join relative inline-flex items-center gap-3 overflow-hidden rounded border border-[#d4a843]/50 bg-[#d4a843]/10 px-10 py-4 text-sm font-bold tracking-[0.2em] text-[#d4a843] uppercase transition-all duration-300 hover:border-[#d4a843] hover:bg-[#d4a843]/20 hover:shadow-[0_0_50px_rgba(212,168,67,0.2)]"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
              </svg>
              Join Discord
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#d4a843]/10 to-transparent transition-transform duration-700 group-hover/join:translate-x-full" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#d4a843]/30 to-transparent" />
    </main>
  );
}
