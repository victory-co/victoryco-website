import Image from "next/image";
import { LeaderboardTable } from "./leaderboard-table";

interface BossCardProps {
  name: string;
  image: string;
  entries: { rank: number; player: string; kc: number }[];
}

export function BossCard({ name, image, entries }: BossCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-[#d4a843]/10 bg-[#111010] shadow-[0_2px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#d4a843]/25 hover:shadow-[0_4px_30px_rgba(0,0,0,0.6),0_0_15px_rgba(212,168,67,0.05)]">
      {/* Boss image banner */}
      <div className="relative h-36 overflow-hidden bg-[#0d0d0d]">
        <Image
          src={`/bosses/${image}`}
          alt={name}
          width={260}
          height={160}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay for name readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111010] via-[#111010]/40 to-transparent" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.4)]" />
        {/* Boss name */}
        <span
          className="absolute bottom-3 left-3 right-3 text-sm font-bold tracking-[0.1em] text-[#e8dcc8] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
          style={{ fontFamily: "var(--font-cinzel), serif" }}
        >
          {name}
        </span>
      </div>
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#d4a843]/20 to-transparent" />
      {/* Leaderboard table */}
      <div className="p-1">
        <LeaderboardTable entries={entries} />
      </div>
    </div>
  );
}
