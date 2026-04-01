"use client";

import { useEffect, useState } from "react";

interface PointsEntry {
  rank: number;
  player: string;
  points: number;
  rankName?: string;
}

interface PointsData {
  allTime: PointsEntry[];
  monthly: PointsEntry[];
  weekly: PointsEntry[];
}

type TabKey = "allTime" | "monthly" | "weekly";

const TAB_LABELS: { key: TabKey; label: string }[] = [
  { key: "allTime", label: "All Time" },
  { key: "monthly", label: "Monthly" },
  { key: "weekly", label: "Weekly" },
];

const RANK_COLOR: Record<number, string> = {
  1: "#d4a843",
  2: "#c0c0c0",
  3: "#cd7f32",
};

const RANK_MEDAL: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
};

function getRankColor(rank: number): string {
  return RANK_COLOR[rank] ?? "#8a8478";
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 rounded-sm border border-[#1e1c18] bg-[#111010] px-5 py-4">
      <div className="h-4 w-6 animate-pulse rounded-sm bg-[#1e1c18]" />
      <div className="h-4 flex-1 animate-pulse rounded-sm bg-[#1e1c18]" />
      <div className="h-4 w-16 animate-pulse rounded-sm bg-[#1e1c18]" />
    </div>
  );
}

function TopThreeBlock({ entries, showRankName }: { entries: PointsEntry[]; showRankName: boolean }) {
  const top = entries.slice(0, 3);
  if (top.length === 0) return null;

  const ordered = [top[1], top[0], top[2]].filter(Boolean);
  const podiumHeight = ["pt-6 pb-4", "pt-0 pb-4", "pt-8 pb-4"];

  return (
    <div className="mb-8 flex items-end justify-center gap-3 sm:gap-5">
      {ordered.map((entry, idx) => {
        const isFirst = entry.rank === 1;
        const color = getRankColor(entry.rank);

        return (
          <div
            key={entry.rank}
            className={`flex flex-col items-center ${podiumHeight[idx]} flex-1 max-w-[180px]`}
          >
            {isFirst && (
              <div
                className="mb-2 text-xs tracking-[0.3em] uppercase"
                style={{ color: "#d4a843", fontFamily: "var(--font-cinzel), serif" }}
              >
                ✦
              </div>
            )}

            <div
              className="w-full rounded-sm border px-3 py-4 text-center transition-colors"
              style={{
                background: isFirst
                  ? "linear-gradient(180deg, rgba(212,168,67,0.07) 0%, #111010 100%)"
                  : "#111010",
                borderColor: `${color}${isFirst ? "40" : "20"}`,
              }}
            >
              <div
                className="mb-1 text-lg font-bold"
                style={{ color, fontFamily: "var(--font-cinzel), serif", letterSpacing: "0.1em" }}
              >
                {RANK_MEDAL[entry.rank]}
              </div>

              <p
                className="truncate text-sm font-semibold tracking-wide"
                style={{
                  color: isFirst ? "#e8dcc8" : "#b0a898",
                  fontFamily: "var(--font-raleway), sans-serif",
                }}
              >
                {entry.player}
              </p>

              <p
                className="mt-1 text-base font-bold"
                style={{ color, fontFamily: "var(--font-cinzel), serif" }}
              >
                {entry.points.toLocaleString()}
                <span
                  className="ml-1 text-[10px] font-normal tracking-[0.2em] uppercase"
                  style={{ color: "#8a8478", fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  pts
                </span>
              </p>

              {showRankName && entry.rankName && (
                <span
                  className="mt-2 inline-block border border-[#d4a843]/30 px-2 py-0.5 text-[10px] tracking-wide text-[#d4a843]/80 rounded-sm"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {entry.rankName}
                </span>
              )}
            </div>

            <div
              className="w-full rounded-b-sm"
              style={{
                height: isFirst ? "28px" : entry.rank === 2 ? "18px" : "10px",
                background: `linear-gradient(180deg, ${color}18, transparent)`,
                borderLeft: `1px solid ${color}18`,
                borderRight: `1px solid ${color}18`,
                borderBottom: `1px solid ${color}18`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function LeaderboardRow({ entry, showRankName }: { entry: PointsEntry; showRankName: boolean }) {
  const color = getRankColor(entry.rank);

  return (
    <div className="group flex items-center gap-4 rounded-sm border border-[#1a1816] bg-[#111010] px-5 py-3.5 transition-colors hover:border-[#d4a843]/15">
      <span
        className="w-6 shrink-0 text-center text-sm font-bold"
        style={{ color, fontFamily: "var(--font-cinzel), serif" }}
      >
        {entry.rank}
      </span>

      <div className="h-4 w-px shrink-0 bg-[#2a2620]" />

      <div className="flex flex-1 flex-wrap items-center gap-2 min-w-0">
        <span
          className="truncate text-sm font-medium text-[#c8bfb0]"
          style={{ fontFamily: "var(--font-raleway), sans-serif" }}
        >
          {entry.player}
        </span>
        {showRankName && entry.rankName && (
          <span
            className="shrink-0 border border-[#d4a843]/30 px-2 py-0.5 text-[10px] tracking-wide text-[#d4a843]/80 rounded-sm"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            {entry.rankName}
          </span>
        )}
      </div>

      <span
        className="shrink-0 text-sm font-bold tabular-nums"
        style={{ color: "#d4a843", fontFamily: "var(--font-cinzel), serif" }}
      >
        {entry.points.toLocaleString()}
        <span
          className="ml-1 text-[10px] font-normal tracking-[0.15em] text-[#8a8478] uppercase"
          style={{ fontFamily: "var(--font-raleway), sans-serif" }}
        >
          pts
        </span>
      </span>
    </div>
  );
}

export function PointsLeaderboard() {
  const [data, setData] = useState<PointsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("allTime");

  useEffect(() => {
    fetch("/api/points")
      .then((r) => r.json())
      .then((d: PointsData) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const entries: PointsEntry[] = data?.[activeTab] ?? [];
  const restEntries = entries.slice(3);
  const showRankName = activeTab === "allTime";

  return (
    <div>
      {/* Period tab switcher */}
      <div className="mb-8 flex items-center gap-1 border-b border-[#1e1c18]">
        {TAB_LABELS.map(({ key, label }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="relative px-5 py-3 text-xs font-semibold tracking-[0.25em] uppercase transition-colors"
              style={{
                fontFamily: "var(--font-raleway), sans-serif",
                color: isActive ? "#d4a843" : "#8a8478",
              }}
            >
              {label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#d4a843]" />
              )}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="py-20 text-center">
          <p
            className="text-sm tracking-[0.2em] text-[#6b6560] uppercase"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            Leaderboard data is being synced...
          </p>
        </div>
      ) : (
        <>
          {entries.length >= 1 && (
            <TopThreeBlock entries={entries} showRankName={showRankName} />
          )}

          {restEntries.length > 0 && (
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#1e1c18]" />
              <span
                className="text-[10px] tracking-[0.3em] text-[#4a4640] uppercase"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                Rankings
              </span>
              <div className="h-px flex-1 bg-[#1e1c18]" />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            {restEntries.map((entry) => (
              <LeaderboardRow
                key={`${entry.rank}-${entry.player}`}
                entry={entry}
                showRankName={showRankName}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
