export async function fetchFromBackend(path: string): Promise<unknown> {
  const baseUrl = process.env.CLAN_MANAGER_BASE_URL;
  const token = process.env.CLAN_MANAGER_API_TOKEN;
  const clanId = process.env.CLAN_ID;

  if (!baseUrl || !token || !clanId) {
    throw new Error("Backend configuration missing");
  }

  const url = `${baseUrl}${path}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-clan-id": clanId,
    },
  });

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  return response.json();
}
