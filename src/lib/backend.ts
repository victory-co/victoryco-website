export async function fetchFromBackend(path: string): Promise<unknown> {
  const baseUrl = process.env.CLAN_MANAGER_BASE_URL;
  const token = process.env.CLAN_MANAGER_API_TOKEN;
  const clanId = process.env.CLAN_ID;

  if (!baseUrl || !token || !clanId) {
    console.error("Backend configuration missing:", { baseUrl: !!baseUrl, token: !!token, clanId: !!clanId });
    throw new Error("Backend configuration missing");
  }

  const url = `${baseUrl}${path}`;
  console.log(`Backend request: ${url}`);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-clan-id": clanId,
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(`Backend request failed: ${response.status} ${response.statusText}`, body.slice(0, 500));
    throw new Error(`Backend request failed: ${response.status}`);
  }

  return response.json();
}
