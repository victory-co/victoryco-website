import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface PointsRow extends Record<string, unknown> {
  period: string;
  rank: number;
  player_name: string;
  points: number;
  rank_name: string | null;
}

const getPoints = unstable_cache(
  async () => {
    const rows = await query<PointsRow>(
      `SELECT period, rank, player_name, points, rank_name
       FROM points_leaderboard
       WHERE rank <= 25
       ORDER BY period, rank`
    );

    const result: Record<string, { rank: number; player: string; points: number; rankName?: string }[]> = {
      allTime: [],
      monthly: [],
      weekly: [],
    };

    for (const row of rows) {
      const entry: { rank: number; player: string; points: number; rankName?: string } = {
        rank: row.rank,
        player: row.player_name,
        points: row.points,
      };
      if (row.rank_name) entry.rankName = row.rank_name;

      if (row.period === "all_time") result.allTime.push(entry);
      else if (row.period === "monthly") result.monthly.push(entry);
      else if (row.period === "weekly") result.weekly.push(entry);
    }

    return result;
  },
  ["api-points"],
  { revalidate: 21600 }
);

export async function GET() {
  try {
    return NextResponse.json(await getPoints());
  } catch {
    return NextResponse.json(
      { error: "Failed to load points data" },
      { status: 500 }
    );
  }
}
