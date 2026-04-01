import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface GalleryRow extends Record<string, unknown> {
  id: number;
  image_url: string;
  caption: string | null;
  posted_at: string;
}

export async function GET() {
  try {
    const rows = await query<GalleryRow>(
      `SELECT id, image_url, caption, posted_at
       FROM gallery_images
       ORDER BY posted_at DESC
       LIMIT 100`
    );

    return NextResponse.json(
      rows.map((row) => ({
        id: row.id,
        imageUrl: row.image_url,
        caption: row.caption,
        postedAt: row.posted_at,
      }))
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 }
    );
  }
}
