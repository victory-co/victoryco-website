interface LeaderboardEntry {
  rank: number;
  player: string;
  kc: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

const RANK_STYLES: Record<number, { badge: string; text: string; row: string }> = {
  1: {
    badge: "bg-[#d4a843]/20 text-[#d4a843] border border-[#d4a843]/40 shadow-[0_0_6px_rgba(212,168,67,0.2)]",
    text: "text-[#d4a843] font-semibold",
    row: "bg-[#d4a843]/[0.04]",
  },
  2: {
    badge: "bg-[#c0c0c0]/15 text-[#c0c0c0] border border-[#c0c0c0]/30",
    text: "text-[#c0c0c0] font-semibold",
    row: "bg-[#c0c0c0]/[0.03]",
  },
  3: {
    badge: "bg-[#cd7f32]/15 text-[#cd7f32] border border-[#cd7f32]/30",
    text: "text-[#cd7f32] font-semibold",
    row: "bg-[#cd7f32]/[0.03]",
  },
};

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-[#d4a843]/10">
          <th
            className="py-2 px-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a8478]"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            Rank
          </th>
          <th
            className="py-2 px-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a8478]"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            Player
          </th>
          <th
            className="py-2 px-3 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a8478]"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            KC
          </th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => {
          const style = RANK_STYLES[entry.rank];
          return (
            <tr
              key={entry.rank}
              className={[
                "border-b border-[#e8dcc8]/[0.04] transition-colors duration-150",
                "hover:bg-[#d4a843]/[0.06]",
                style?.row ?? "",
              ].join(" ")}
            >
              <td className="py-2 px-3">
                <span
                  className={[
                    "inline-flex h-6 w-6 items-center justify-center rounded-sm text-[11px] font-bold",
                    style?.badge ?? "text-[#6b6560]",
                  ].join(" ")}
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  {entry.rank}
                </span>
              </td>
              <td
                className={[
                  "py-2 px-3 text-sm tracking-wide",
                  style?.text ?? "text-[#e8dcc8]/80",
                ].join(" ")}
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {entry.player}
              </td>
              <td
                className={[
                  "py-2 px-3 text-right text-sm tabular-nums",
                  style ? "text-[#e8dcc8]" : "text-[#8a8478]",
                ].join(" ")}
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {entry.kc.toLocaleString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
