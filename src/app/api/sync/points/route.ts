import { NextRequest, NextResponse } from "next/server";
import { isSyncAuthorized } from "@/lib/sync-auth";
import { fetchFromBackend } from "@/lib/backend";
import { execute, initSchema } from "@/lib/db";

interface PointsEntry {
  rank: number;
  player: string;
  points: number;
  rankName?: string;
}

interface PointsResponse {
  allTime: PointsEntry[];
  monthly: PointsEntry[];
  weekly: PointsEntry[];
}

export async function POST(request: NextRequest) {
  if (!isSyncAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initSchema();

    const data = await fetchFromBackend("/api/website/points/leaderboard") as PointsResponse;

    // Clear existing data and reinsert (full refresh)
    await execute("DELETE FROM points_leaderboard");

    const periods: { key: keyof PointsResponse; dbValue: string }[] = [
      { key: "allTime", dbValue: "all_time" },
      { key: "monthly", dbValue: "monthly" },
      { key: "weekly", dbValue: "weekly" },
    ];

    for (const period of periods) {
      const entries = data[period.key] || [];
      for (const entry of entries) {
        await execute(
          `INSERT INTO points_leaderboard (period, rank, player_name, points, rank_name, synced_at)
           VALUES ($1, $2, $3, $4, $5, NOW())`,
          [period.dbValue, entry.rank, entry.player, entry.points, entry.rankName || null]
        );
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json(
      { error: "Sync failed" },
      { status: 500 }
    );
  }
}
