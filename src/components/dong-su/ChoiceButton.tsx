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
  danTam: "border-emerald-700/40 bg-emerald-950/35 text-emerald-100",
  nghiaKhi: "border-old-gold/45 bg-amber-950/40 text-amber-100",
  quanUy: "border-stone-500/40 bg-stone-900/60 text-stone-100",
  nhanTinh: "border-cyan-800/35 bg-cyan-950/30 text-cyan-100",
  daTam: "border-oxblood/70 bg-red-950/40 text-red-100",
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
    ? "border-faded-gold bg-[linear-gradient(135deg,rgba(92,32,24,0.82),rgba(59,36,22,0.86))] shadow-[0_0_0_1px_rgba(214,173,96,0.2),0_18px_42px_rgba(0,0,0,0.36),0_0_34px_rgba(214,173,96,0.18)]"
    : disabled
      ? "border-old-gold/20 bg-black/25 opacity-60"
      : "border-old-gold/35 bg-[linear-gradient(135deg,rgba(0,0,0,0.34),rgba(59,36,22,0.28))] hover:-translate-y-0.5 hover:border-faded-gold/80 hover:bg-umber/70 hover:shadow-[0_16px_34px_rgba(0,0,0,0.34),0_0_22px_rgba(214,173,96,0.12)]";

  return (
    <button
      aria-pressed={selected}
      className={`group min-h-24 w-full rounded-md border p-4 text-left text-parchment transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/85 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed sm:p-5 ${buttonStateClass}`}
      disabled={disabled}
      onClick={() => onChoose(choice)}
      type="button"
    >
      <span className="block font-serif text-lg leading-snug text-faded-gold transition group-hover:text-parchment sm:text-xl">
        {choice.label}
      </span>
      <span className="mt-1.5 block text-sm leading-6 text-stone-300">
        {choice.description}
      </span>

      <span className="mt-3 flex flex-wrap gap-2">
        {statEntries.map(([stat, value]) => (
          <span
            className={`inline-flex min-h-7 items-center rounded-sm border px-2.5 py-1 text-xs ${statBadgeClasses[stat]}`}
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
