import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface LeaderboardRow extends Record<string, unknown> {
  boss_name: string;
  boss_slug: string;
  category: string;
  boss_image: string;
  rank: number;
  player_name: string;
  kc: number;
}

export async function GET() {
  try {
    const rows = await query<LeaderboardRow>(
      `SELECT boss_name, boss_slug, category, boss_image, rank, player_name, kc
       FROM boss_leaderboard
       ORDER BY category, boss_slug, rank`
    );

    // Group by boss_slug
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

    return NextResponse.json(Object.values(bosses));
  } catch {
    return NextResponse.json(
      { error: "Failed to load leaderboard data" },
      { status: 500 }
    );
  }
}
