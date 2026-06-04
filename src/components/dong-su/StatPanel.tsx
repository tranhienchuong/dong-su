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
  danTam: "bg-emerald-500",
  nghiaKhi: "bg-amber-500",
  quanUy: "bg-stone-300",
  nhanTinh: "bg-sky-500",
  daTam: "bg-red-700",
};

export function StatPanel({ labels, stats }: StatPanelProps) {
  const highestValue = Math.max(6, ...statOrder.map((stat) => stats[stat]));

  return (
    <aside className="border border-old-gold/30 bg-black/45 p-4 text-parchment shadow-ember lg:sticky lg:top-6">
      <h2 className="font-serif text-xl text-faded-gold">Chỉ số</h2>

      <div className="mt-4 space-y-4">
        {statOrder.map((stat) => {
          const value = stats[stat];
          const width = `${Math.min(100, (Math.max(0, value) / highestValue) * 100)}%`;

          return (
            <section key={stat}>
              <div className="mb-1.5 flex items-center justify-between gap-4 text-sm">
                <span className="text-stone-200">{labels[stat]}</span>
                <span className="font-semibold text-faded-gold">{value}</span>
              </div>
              <div className="h-2.5 overflow-hidden border border-old-gold/20 bg-charcoal">
                <div
                  className={`h-full transition-all duration-300 ${statStyles[stat]}`}
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
