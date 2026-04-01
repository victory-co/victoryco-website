import { NextRequest, NextResponse } from "next/server";
import { isSyncAuthorized } from "@/lib/sync-auth";
import { fetchGalleryImages } from "@/lib/discord";
import { execute, initSchema } from "@/lib/db";

export async function POST(request: NextRequest) {
  if (!isSyncAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initSchema();

    const images = await fetchGalleryImages();

    for (const img of images) {
      await execute(
        `INSERT INTO gallery_images (discord_message_id, image_url, caption, posted_at, synced_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (discord_message_id) DO UPDATE
         SET image_url = $2, caption = $3, synced_at = NOW()`,
        [img.messageId, img.imageUrl, img.caption, img.postedAt]
      );
    }

    return NextResponse.json({ status: "ok", count: images.length });
  } catch {
    return NextResponse.json(
      { error: "Sync failed" },
      { status: 500 }
    );
  }
}
