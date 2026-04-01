import { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";

export function isSyncAuthorized(request: NextRequest): boolean {
  const secret = request.headers.get("x-sync-secret");
  const expected = process.env.SYNC_SECRET;

  if (!secret || !expected) {
    return false;
  }

  const a = Buffer.from(secret);
  const b = Buffer.from(expected);

  if (a.length !== b.length) {
    return false;
  }

  return timingSafeEqual(a, b);
}
