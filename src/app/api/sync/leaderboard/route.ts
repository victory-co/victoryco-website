import { NextRequest, NextResponse } from "next/server";
import { isSyncAuthorized } from "@/lib/sync-auth";
import { fetchFromBackend } from "@/lib/backend";
import { execute, initSchema } from "@/lib/db";
import { BOSSES } from "@/lib/boss-data";

export async function POST(request: NextRequest) {
  if (!isSyncAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initSchema();

    const data = await fetchFromBackend("/leaderboard") as Record<string, unknown>[];

    for (const boss of BOSSES) {
      const bossData = data.find(
        (d: Record<string, unknown>) => d.slug === boss.slug
      ) as { entries?: { rank: number; player: string; kc: number }[] } | undefined;

      if (!bossData?.entries) continue;

      for (const entry of bossData.entries.slice(0, 10)) {
        await execute(
          `INSERT INTO boss_leaderboard (boss_name, boss_slug, category, boss_image, rank, player_name, kc, synced_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
           ON CONFLICT (boss_slug, rank) DO UPDATE
           SET boss_name = $1, category = $3, boss_image = $4, player_name = $6, kc = $7, synced_at = NOW()`,
          [boss.name, boss.slug, boss.category, boss.image, entry.rank, entry.player, entry.kc]
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
