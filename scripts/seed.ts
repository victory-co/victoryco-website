import { initSchema, execute, query } from "../src/lib/db";
import { BOSSES } from "../src/lib/boss-data";

const MOCK_PLAYERS = [
  "Erectedmain", "V Galileo V", "BlazIn", "IronFury", "RNG_Blessed",
  "CoxRunner", "TobRunner", "ScaleSniper", "SlayerKing", "TaskMaster",
];

function randomKc(max: number): number {
  return Math.floor(Math.random() * max) + 100;
}

async function seed() {
  console.log("Initializing schema...");
  await initSchema();

  console.log("Clearing existing data...");
  await execute("DELETE FROM boss_leaderboard");
  await execute("DELETE FROM gallery_images");

  console.log("Seeding boss leaderboard...");
  for (const boss of BOSSES) {
    const shuffled = [...MOCK_PLAYERS].sort(() => Math.random() - 0.5);
    const kcs = shuffled
      .map((name) => ({ name, kc: randomKc(5000) }))
      .sort((a, b) => b.kc - a.kc);

    for (let rank = 1; rank <= 10; rank++) {
      await execute(
        `INSERT INTO boss_leaderboard (boss_name, boss_slug, category, boss_image, rank, player_name, kc)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (boss_slug, rank) DO UPDATE
         SET boss_name = $1, category = $3, boss_image = $4, player_name = $6, kc = $7, synced_at = NOW()`,
        [boss.name, boss.slug, boss.category, boss.image, rank, kcs[rank - 1].name, kcs[rank - 1].kc]
      );
    }
  }

  console.log("Seeding gallery images with placeholders...");
  const mockImages = [
    { id: "mock-1", url: "https://placehold.co/800x600/1a1a2e/c4a44a?text=Corp+Mass", caption: "Corp mass — 40 people showed up!", posted: "2026-03-15T20:00:00Z" },
    { id: "mock-2", url: "https://placehold.co/800x600/1a1a2e/c4a44a?text=ToA+Completion", caption: "First ToA completion as a clan", posted: "2026-03-10T18:30:00Z" },
    { id: "mock-3", url: "https://placehold.co/800x600/1a1a2e/c4a44a?text=Drop+Party", caption: "Monthly drop party", posted: "2026-03-01T21:00:00Z" },
    { id: "mock-4", url: "https://placehold.co/800x600/1a1a2e/c4a44a?text=Bingo+Winners", caption: "Bingo season 3 winners!", posted: "2026-02-20T19:00:00Z" },
    { id: "mock-5", url: "https://placehold.co/800x600/1a1a2e/c4a44a?text=GWD+Trip", caption: "GWD trip with the boys", posted: "2026-02-15T17:00:00Z" },
    { id: "mock-6", url: "https://placehold.co/800x600/1a1a2e/c4a44a?text=Movie+Night", caption: "Discord movie night", posted: "2026-02-10T22:00:00Z" },
  ];

  for (const img of mockImages) {
    await execute(
      `INSERT INTO gallery_images (discord_message_id, image_url, caption, posted_at)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (discord_message_id) DO NOTHING`,
      [img.id, img.url, img.caption, img.posted]
    );
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
