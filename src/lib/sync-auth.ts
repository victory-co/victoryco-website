import { NextRequest } from "next/server";

export function isSyncAuthorized(request: NextRequest): boolean {
  const secret = request.headers.get("x-sync-secret");
  return secret === process.env.SYNC_SECRET;
}
