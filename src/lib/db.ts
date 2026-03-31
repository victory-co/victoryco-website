import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
});

export async function query<T extends Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const result = await pool.query(text, params);
  return result.rows as T[];
}

export async function execute(
  text: string,
  params?: unknown[]
): Promise<void> {
  await pool.query(text, params);
}

export async function initSchema(): Promise<void> {
  await execute(`
    CREATE TABLE IF NOT EXISTS boss_leaderboard (
      id SERIAL PRIMARY KEY,
      boss_name TEXT NOT NULL,
      boss_slug TEXT NOT NULL,
      category TEXT NOT NULL,
      boss_image TEXT NOT NULL,
      rank INTEGER NOT NULL CHECK (rank >= 1 AND rank <= 10),
      player_name TEXT NOT NULL,
      kc INTEGER NOT NULL,
      synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (boss_slug, rank)
    );

    CREATE TABLE IF NOT EXISTS gallery_images (
      id SERIAL PRIMARY KEY,
      discord_message_id TEXT UNIQUE NOT NULL,
      image_url TEXT NOT NULL,
      caption TEXT,
      posted_at TIMESTAMPTZ NOT NULL,
      synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_boss_leaderboard_category
      ON boss_leaderboard (category);
    CREATE INDEX IF NOT EXISTS idx_boss_leaderboard_slug
      ON boss_leaderboard (boss_slug, rank);
    CREATE INDEX IF NOT EXISTS idx_gallery_images_posted
      ON gallery_images (posted_at DESC);
  `);
}
