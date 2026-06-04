"use client";

import type {
  StatKey,
  StoryChoice,
} from "@/data/dong-su/zhu-yuanzhang-episode-1";

type ChoiceButtonProps = {
  choice: StoryChoice;
  disabled?: boolean;
  statLabels: Record<StatKey, string>;
  onChoose: (choice: StoryChoice) => void;
  selected?: boolean;
};

const statBadgeClasses: Record<StatKey, string> = {
  danTam: "border-emerald-600/40 bg-emerald-950/40 text-emerald-100",
  nghiaKhi: "border-amber-500/40 bg-amber-950/50 text-amber-100",
  quanUy: "border-stone-400/40 bg-stone-900/70 text-stone-100",
  nhanTinh: "border-sky-500/40 bg-sky-950/40 text-sky-100",
  daTam: "border-red-700/50 bg-red-950/50 text-red-100",
};

export function ChoiceButton({
  choice,
  disabled = false,
  statLabels,
  onChoose,
  selected = false,
}: ChoiceButtonProps) {
  const statEntries = Object.entries(choice.effects) as [StatKey, number][];
  const buttonStateClass = selected
    ? "border-faded-gold bg-umber/80 shadow-ember"
    : "border-old-gold/30 bg-black/35 hover:-translate-y-0.5 hover:border-faded-gold hover:bg-umber/70 hover:shadow-ember";

  return (
    <button
      aria-pressed={selected}
      className={`group w-full border p-4 text-left text-parchment transition duration-200 focus:outline-none focus:ring-2 focus:ring-faded-gold/70 disabled:cursor-not-allowed disabled:opacity-70 ${buttonStateClass}`}
      disabled={disabled}
      onClick={() => onChoose(choice)}
      type="button"
    >
      <span className="block font-serif text-lg leading-snug text-faded-gold transition group-hover:text-parchment">
        {choice.label}
      </span>
      <span className="mt-1.5 block text-sm leading-6 text-stone-300">
        {choice.description}
      </span>

      <span className="mt-3 flex flex-wrap gap-2">
        {statEntries.map(([stat, value]) => (
          <span
            className={`inline-flex min-h-7 items-center border px-2.5 py-1 text-xs ${statBadgeClasses[stat]}`}
            key={stat}
          >
            {value > 0 ? "+" : ""}
            {value} {statLabels[stat]}
          </span>
        ))}
      </span>
    </button>
  );
}
