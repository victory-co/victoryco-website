import { query } from "@/lib/db";
import { BOSS_CATEGORIES } from "@/lib/boss-data";
import { BossCard } from "@/components/boss-card";
import { LeaderboardTabs } from "@/components/leaderboard-tabs";

export const dynamic = "force-dynamic";

interface LeaderboardRow extends Record<string, unknown> {
  boss_name: string;
  boss_slug: string;
  category: string;
  boss_image: string;
  rank: number;
  player_name: string;
  kc: number;
}

interface BossData {
  name: string;
  slug: string;
  category: string;
  image: string;
  entries: { rank: number; player: string; kc: number }[];
}

async function getLeaderboardData(): Promise<BossData[]> {
  const rows = await query<LeaderboardRow>(
    `SELECT boss_name, boss_slug, category, boss_image, rank, player_name, kc
     FROM boss_leaderboard
     ORDER BY category, boss_slug, rank`
  );

  const bosses: Record<string, BossData> = {};

  for (const row of rows) {
    if (!bosses[row.boss_slug]) {
      bosses[row.boss_slug] = {
        name: row.boss_name,
        slug: row.boss_slug,
        category: row.category,
        image: row.boss_image,
        entries: [],
      };
    }
    bosses[row.boss_slug].entries.push({
      rank: row.rank,
      player: row.player_name,
      kc: row.kc,
    });
  }

  return Object.values(bosses);
}

export default async function BossLeaderboardPage() {
  const bosses = await getLeaderboardData();

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Page header */}
      <header className="relative overflow-hidden border-b border-[#d4a843]/10 pb-10 pt-12">
        {/* Atmospheric background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(212,168,67,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Decorative line */}
          <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-[#d4a843]/50 to-transparent" />
          <h1
            className="text-3xl font-bold tracking-[0.15em] text-[#e8dcc8] uppercase sm:text-4xl"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            Boss <span className="text-[#d4a843]">KC</span>
          </h1>
          <p
            className="mt-3 text-sm tracking-[0.25em] text-[#8a8478] uppercase"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            Victory Company Hall of Fame
          </p>
          {/* Decorative line */}
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#d4a843]/50 to-transparent" />
        </div>
      </header>

      {/* Leaderboard type navigation */}
      <LeaderboardTabs />

      {/* Category sections */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {BOSS_CATEGORIES.map((cat) => {
          const categoryBosses = bosses.filter((b) => b.category === cat.key);
          if (categoryBosses.length === 0) return null;

          return (
            <section key={cat.key} className="mb-14 last:mb-0">
              {/* Category header */}
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-[#d4a843]/20 to-transparent" />
                <h2
                  className="shrink-0 text-xs font-semibold tracking-[0.3em] text-[#d4a843]/80 uppercase"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  {cat.label}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-[#d4a843]/20 to-transparent" />
              </div>

              {/* Boss cards grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categoryBosses.map((boss) => (
                  <BossCard
                    key={boss.slug}
                    name={boss.name}
                    image={boss.image}
                    entries={boss.entries}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* Empty state */}
        {bosses.length === 0 && (
          <div className="py-20 text-center">
            <p
              className="text-sm tracking-[0.2em] text-[#6b6560] uppercase"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              Leaderboard data is being synced...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
