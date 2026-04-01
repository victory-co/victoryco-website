import type { Metadata } from "next";
import { PointsLeaderboard } from "@/components/points-leaderboard";

export const metadata: Metadata = {
  title: "Ranks — Victory Co",
  description:
    "Victory Co's points-based ranking system. Earn points through daily play, competitions, boss milestones, events, and teaching.",
};

const RANKS = [
  { name: "Prospect of Victory", pts: 15 },
  { name: "Apprentice of Arms", pts: 35 },
  { name: "Squire of Triumph", pts: 60 },
  { name: "Soldier of Fortune", pts: 100 },
  { name: "Victor", pts: 150 },
  { name: "Conqueror", pts: 210 },
  { name: "Vanquisher", pts: 290 },
  { name: "Vanguard of Victory", pts: 390 },
  { name: "Paragon of Triumph", pts: 510 },
  { name: "Exemplar of Victory", pts: 670 },
  { name: "Ascendant Victor", pts: 900 },
] as const;

const AUTO_TRACKED = [
  {
    title: "Daily Activity",
    detail: "+1 pt/day for any XP gained",
    cap: "Cap: 8/month",
  },
  {
    title: "Competition Placements",
    detail: "1st: +3 pts · 2nd: +2 pts · 3rd: +1 pt",
    cap: null,
  },
  {
    title: "Boss KC Milestones",
    detail: "+1 pt per 100 KC",
    cap: "Cap: 50 pts/boss lifetime",
  },
  {
    title: "Raids KC Milestones",
    detail: "+1 pt per 25 KC",
    cap: "Cap: 100 pts lifetime",
  },
] as const;

const MANUAL_CLAIMED = [
  {
    title: "Clan Events",
    detail: "Attend +2 pts · Host +3 pts",
    cap: "Cap: 8 pts/month",
  },
  {
    title: "Coffer Filler Events",
    detail: "Attend +2 pts · Host +3 pts",
    cap: "Cap: 8 pts/month",
  },
  {
    title: "Boss Teaching",
    detail: "+2 pts per session",
    cap: "Cap: 4/week, 8/month",
  },
  {
    title: "Learner Raid Attend",
    detail: "+2 pts per raid",
    cap: "Cap: 6/month, 50 lifetime",
  },
  {
    title: "Learner Raid Teach",
    detail: "+3 pts per raid",
    cap: "Cap: 6/month",
  },
] as const;

const MAX_PTS = RANKS[RANKS.length - 1].pts;

const discordInviteUrl = process.env.DISCORD_INVITE_URL || "#";

export default function RanksPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* ── Page Header ── */}
      <header className="relative overflow-hidden border-b border-[#d4a843]/10 pb-10 pt-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(212,168,67,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-[#d4a843]/50 to-transparent" />
          <h1
            className="text-3xl font-bold tracking-[0.15em] text-[#e8dcc8] uppercase sm:text-4xl"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            Rank <span className="text-[#d4a843]">Ladder</span>
          </h1>
          <p
            className="mt-3 text-sm tracking-[0.25em] text-[#8a8478] uppercase"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            Climb through 11 ranks of the Victory Company
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#d4a843]/50 to-transparent" />
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ── Points Leaderboard ── */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-[#d4a843]/20 to-transparent" />
            <h2
              className="shrink-0 text-xs font-semibold tracking-[0.3em] text-[#d4a843]/80 uppercase"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              Leaderboard
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-[#d4a843]/20 to-transparent" />
          </div>

          <PointsLeaderboard />
        </section>

        {/* ── Rank Ladder ── */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-[#d4a843]/20 to-transparent" />
            <h2
              className="shrink-0 text-xs font-semibold tracking-[0.3em] text-[#d4a843]/80 uppercase"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              Rank Progression
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-[#d4a843]/20 to-transparent" />
          </div>

          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[2.25rem] top-4 bottom-4 w-px bg-gradient-to-b from-[#8a8478]/20 via-[#d4a843]/30 to-[#d4a843]/60 sm:left-[2.75rem]" />

            <ol className="relative space-y-3">
              {RANKS.map((rank, i) => {
                const progress = rank.pts / MAX_PTS;
                const isMax = i === RANKS.length - 1;
                /* Gold intensity increases with rank */
                const goldOpacity = 0.06 + progress * 0.18;
                const borderOpacity = 0.15 + progress * 0.45;
                const textColor = isMax
                  ? "text-[#d4a843]"
                  : progress > 0.6
                    ? "text-[#e8dcc8]"
                    : "text-[#b0a898]";
                const numColor = isMax
                  ? "text-[#d4a843]"
                  : progress > 0.6
                    ? "text-[#d4a843]/80"
                    : "text-[#8a8478]";

                return (
                  <li key={rank.name} className="relative flex items-stretch">
                    {/* Rank number badge */}
                    <div
                      className={`relative z-10 flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-full border bg-[#0a0a0a] text-xs font-bold tracking-wider sm:h-[3rem] sm:w-[3rem] sm:text-sm ${numColor}`}
                      style={{
                        fontFamily: "var(--font-cinzel), serif",
                        borderColor: `rgba(212,168,67,${borderOpacity})`,
                      }}
                    >
                      {i + 1}
                    </div>

                    {/* Rank card */}
                    <div
                      className="ml-4 flex flex-1 items-center justify-between rounded border px-4 py-3 sm:ml-5 sm:px-5 sm:py-4"
                      style={{
                        backgroundColor: `rgba(212,168,67,${goldOpacity * 0.35})`,
                        borderColor: `rgba(212,168,67,${borderOpacity * 0.6})`,
                      }}
                    >
                      <span
                        className={`text-sm font-semibold tracking-wide sm:text-base ${textColor}`}
                        style={{ fontFamily: "var(--font-cinzel), serif" }}
                      >
                        {rank.name}
                      </span>

                      <span
                        className="shrink-0 text-xs font-medium tracking-wider text-[#8a8478] sm:text-sm"
                        style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                      >
                        {rank.pts}
                        {isMax ? (
                          <span className="ml-1 text-[#d4a843]/70">MAX</span>
                        ) : (
                          <span className="ml-0.5 opacity-60">pts</span>
                        )}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ── How You Earn Points ── */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-[#d4a843]/20 to-transparent" />
            <h2
              className="shrink-0 text-xs font-semibold tracking-[0.3em] text-[#d4a843]/80 uppercase"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              How You Earn Points
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-[#d4a843]/20 to-transparent" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Auto-Tracked */}
            <div>
              <h3
                className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#e8dcc8] uppercase"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
                Auto-Tracked
              </h3>
              <div className="space-y-3">
                {AUTO_TRACKED.map((item) => (
                  <div
                    key={item.title}
                    className="rounded border border-[#d4a843]/10 bg-[#111010] px-4 py-3"
                  >
                    <p
                      className="text-sm font-semibold text-[#e8dcc8]"
                      style={{ fontFamily: "var(--font-cinzel), serif" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="mt-1 text-xs leading-relaxed text-[#8a8478]"
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      {item.detail}
                    </p>
                    {item.cap && (
                      <p
                        className="mt-1.5 text-[10px] font-semibold tracking-wider text-[#d4a843]/50 uppercase"
                        style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                      >
                        {item.cap}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Manually Claimed */}
            <div>
              <h3
                className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#e8dcc8] uppercase"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                Manually Claimed
              </h3>
              <div className="space-y-3">
                {MANUAL_CLAIMED.map((item) => (
                  <div
                    key={item.title}
                    className="rounded border border-[#d4a843]/10 bg-[#111010] px-4 py-3"
                  >
                    <p
                      className="text-sm font-semibold text-[#e8dcc8]"
                      style={{ fontFamily: "var(--font-cinzel), serif" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="mt-1 text-xs leading-relaxed text-[#8a8478]"
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      {item.detail}
                    </p>
                    <p
                      className="mt-1.5 text-[10px] font-semibold tracking-wider text-[#d4a843]/50 uppercase"
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      {item.cap}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer Note ── */}
        <div className="mb-14 text-center">
          <p
            className="text-xs leading-relaxed tracking-wide text-[#6b6560] italic"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            Consistency &gt; grinding. Caps prevent burnout. All rank-ups
            require admin approval.
          </p>
        </div>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden rounded-lg border border-[#d4a843]/15 bg-[#111010] px-6 py-10 text-center sm:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.04)_0%,transparent_70%)]" />
          <div className="relative">
            <h2
              className="text-xl font-bold tracking-[0.1em] text-[#e8dcc8] uppercase sm:text-2xl"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              Ready to start climbing?
            </h2>
            <p
              className="mt-2 text-sm text-[#8a8478]"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              Join the clan and begin your ascent through the ranks.
            </p>
            <a
              href={discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded border border-[#d4a843]/40 bg-[#d4a843]/10 px-8 py-3 text-xs font-bold tracking-[0.15em] text-[#d4a843] uppercase transition-all duration-300 hover:border-[#d4a843]/80 hover:bg-[#d4a843]/20 hover:shadow-[0_0_24px_rgba(212,168,67,0.12)]"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
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
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#d4a843]/10 to-transparent transition-transform duration-500 group-hover/cta:translate-x-full" />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
