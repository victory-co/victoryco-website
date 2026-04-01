import type { Metadata } from "next";
import { Cinzel, Raleway } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Victory Co — OSRS Clan",
  description:
    "Victory Company is an Old School RuneScape clan focused on PvM, events, and community. Join us!",
  openGraph: {
    title: "Victory Co — OSRS Clan",
    description:
      "PvM, events, raiding, skilling, and a chill community. Join Victory Company.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const discordInviteUrl = process.env.DISCORD_INVITE_URL || "#";

  return (
    <html lang="en" className={`${cinzel.variable} ${raleway.variable}`}>
      <body>
        <Nav discordInviteUrl={discordInviteUrl} />
        {children}
      </body>
    </html>
  );
}
