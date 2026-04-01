const SYNC_INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 hours

async function runSync() {
  const secret = process.env.SYNC_SECRET;
  if (!secret) {
    console.warn("SYNC_SECRET not set, skipping scheduled sync");
    return;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  const routes = ["/api/sync/leaderboard", "/api/sync/gallery", "/api/sync/points"];

  for (const route of routes) {
    try {
      const res = await fetch(`${baseUrl}${route}`, {
        method: "POST",
        headers: { "x-sync-secret": secret },
      });
      console.log(`Sync ${route}: ${res.status}`);
    } catch (err) {
      console.error(`Sync ${route} failed:`, err);
    }
  }
}

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initSchema } = await import("@/lib/db");
    try {
      await initSchema();
      console.log("Database schema initialized");
    } catch (err) {
      console.error("Failed to initialize database schema:", err);
    }

    // Run first sync after a short delay (let the server finish starting)
    setTimeout(() => {
      runSync();
      // Then sync every 6 hours
      setInterval(runSync, SYNC_INTERVAL_MS);
    }, 10_000);

    console.log("Sync scheduler started (every 6 hours)");
  }
}
