import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Victory Co — OSRS Clan",
  description:
    "Victory Company is an Old School RuneScape clan focused on PvM, events, and community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
