import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface PointsRow extends Record<string, unknown> {
  period: string;
  rank: number;
  player_name: string;
  points: number;
  rank_name: string | null;
}

export async function GET() {
  try {
    const rows = await query<PointsRow>(
      `SELECT period, rank, player_name, points, rank_name
       FROM points_leaderboard
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

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to load points data" },
      { status: 500 }
    );
  }
}
