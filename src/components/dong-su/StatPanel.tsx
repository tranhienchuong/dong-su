import type {
  StatKey,
  Stats,
} from "@/data/dong-su/zhu-yuanzhang-episode-1";

type StatPanelProps = {
  labels: Record<StatKey, string>;
  stats: Stats;
};

const statOrder: StatKey[] = [
  "danTam",
  "nghiaKhi",
  "quanUy",
  "nhanTinh",
  "daTam",
];

const statStyles: Record<StatKey, string> = {
  danTam: "bg-emerald-700",
  nghiaKhi: "bg-old-gold",
  quanUy: "bg-stone-400",
  nhanTinh: "bg-cyan-700",
  daTam: "bg-oxblood",
};

export function StatPanel({ labels, stats }: StatPanelProps) {
  const highestValue = Math.max(6, ...statOrder.map((stat) => stats[stat]));

  return (
    <aside className="dong-su-panel rounded-md p-4 text-parchment lg:sticky lg:top-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-serif text-xl text-faded-gold dong-su-text-shadow">
          Chỉ số
        </h2>
        <span className="text-xs uppercase tracking-[0.18em] text-old-gold/80">
          Quân cơ
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:block lg:space-y-4">
        {statOrder.map((stat) => {
          const value = stats[stat];
          const width = `${Math.min(100, (Math.max(0, value) / highestValue) * 100)}%`;

          return (
            <section
              className="rounded-sm border border-old-gold/20 bg-black/25 p-3 lg:border-0 lg:bg-transparent lg:p-0"
              key={stat}
            >
              <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                <span className="text-stone-200">{labels[stat]}</span>
                <span className="font-semibold text-faded-gold tabular-nums">
                  {value}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full border border-old-gold/20 bg-charcoal/90 lg:h-2.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${statStyles[stat]}`}
                  style={{ width }}
                />
              </div>
            </section>
          );
        })}
      </div>
    </aside>
  );
}
