interface DiscordAttachment {
  url: string;
  content_type?: string;
}

interface DiscordMessage {
  id: string;
  content: string;
  timestamp: string;
  attachments: DiscordAttachment[];
}

export async function fetchGalleryImages(): Promise<
  { messageId: string; imageUrl: string; caption: string; postedAt: string }[]
> {
  const token = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.DISCORD_CHANNEL_ID;

  if (!token || !channelId) {
    throw new Error("Discord configuration missing");
  }

  const response = await fetch(
    `https://discord.com/api/v10/channels/${channelId}/messages?limit=100`,
    {
      headers: {
        Authorization: `Bot ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Discord API request failed");
  }

  const messages: DiscordMessage[] = await response.json();

  return messages
    .filter((msg) =>
      msg.attachments.some(
        (a) => a.content_type?.startsWith("image/")
      )
    )
    .flatMap((msg) =>
      msg.attachments
        .filter((a) => a.content_type?.startsWith("image/"))
        .map((a) => ({
          messageId: msg.id,
          imageUrl: a.url,
          caption: msg.content || "",
          postedAt: msg.timestamp,
        }))
    );
}
