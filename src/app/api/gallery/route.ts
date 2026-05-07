import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface GalleryRow extends Record<string, unknown> {
  id: number;
  image_url: string;
  caption: string | null;
  posted_at: string;
}

const getGallery = unstable_cache(
  async () => {
    const rows = await query<GalleryRow>(
      `SELECT id, image_url, caption, posted_at
       FROM gallery_images
       ORDER BY posted_at DESC
       LIMIT 100`
    );

    return rows.map((row) => ({
      id: row.id,
      imageUrl: row.image_url,
      caption: row.caption,
      postedAt: row.posted_at,
    }));
  },
  ["api-gallery"],
  { revalidate: 21600 }
);

export async function GET() {
  try {
    return NextResponse.json(await getGallery());
  } catch {
    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 }
    );
  }
}
