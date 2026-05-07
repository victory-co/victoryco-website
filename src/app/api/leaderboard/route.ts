import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { query } from "@/lib/db";

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

const getLeaderboard = unstable_cache(
  async () => {
    const rows = await query<LeaderboardRow>(
      `SELECT boss_name, boss_slug, category, boss_image, rank, player_name, kc
       FROM boss_leaderboard
       ORDER BY category, boss_slug, rank`
    );

    const bosses: Record<string, {
      name: string;
      slug: string;
      category: string;
      image: string;
      entries: { rank: number; player: string; kc: number }[];
    }> = {};

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
  },
  ["api-leaderboard"],
  { revalidate: 21600 }
);

export async function GET() {
  try {
    return NextResponse.json(await getLeaderboard());
  } catch {
    return NextResponse.json(
      { error: "Failed to load leaderboard data" },
      { status: 500 }
    );
  }
}
