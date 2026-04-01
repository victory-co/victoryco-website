export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initSchema } = await import("@/lib/db");
    try {
      await initSchema();
      console.log("Database schema initialized");
    } catch (err) {
      console.error("Failed to initialize database schema:", err);
    }
  }
}
