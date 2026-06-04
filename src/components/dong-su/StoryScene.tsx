"use client";

import type { ReactNode } from "react";
import type {
  Character,
  Relic,
  StorySceneData,
} from "@/data/dong-su/zhu-yuanzhang-episode-1";

type StorySceneProps = {
  characters: Character[];
  children: ReactNode;
  onOpenFact: () => void;
  relics: Relic[];
  scene: StorySceneData;
  totalScenes: number;
};

const toneOverlays: Record<StorySceneData["imageTone"], string> = {
  ash: "from-black/80 via-stone-950/30 to-amber-950/45",
  dust: "from-black/75 via-transparent to-amber-950/50",
  embers: "from-black/75 via-red-950/20 to-amber-950/45",
  lamp: "from-black/80 via-yellow-950/20 to-stone-950/50",
  rain: "from-black/80 via-slate-950/20 to-stone-900/55",
};

export function StoryScene({
  characters,
  children,
  onOpenFact,
  relics,
  scene,
  totalScenes,
}: StorySceneProps) {
  const hasHistoricalNote = Boolean(scene.historicalNote);

  return (
    <section className="overflow-hidden border border-old-gold/35 bg-charcoal/90 shadow-ember">
      <div className="relative min-h-[24rem] sm:min-h-[30rem] lg:min-h-[34rem]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${scene.backgroundImage})` }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${toneOverlays[scene.imageTone]}`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(214,173,96,0.22),transparent_28rem)]" />

        <div className="relative flex min-h-[24rem] flex-col justify-between p-5 sm:min-h-[30rem] sm:p-7 lg:min-h-[34rem]">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-stone-200">
            <span>
              Cảnh {scene.chapter}/{totalScenes}
            </span>

            {hasHistoricalNote ? (
              <button
                className="inline-flex min-h-10 items-center gap-2 border border-old-gold/45 bg-black/45 px-3 py-2 text-faded-gold transition hover:border-faded-gold hover:bg-umber focus:outline-none focus:ring-2 focus:ring-faded-gold/70"
                onClick={onOpenFact}
                title="Tư liệu lịch sử"
                type="button"
              >
                <span
                  aria-hidden="true"
                  className="flex size-5 items-center justify-center border border-current text-xs"
                >
                  i
                </span>
                <span>Tư liệu lịch sử</span>
              </button>
            ) : null}
          </div>

          <div className="max-w-3xl">
            <p className="text-sm text-old-gold">{scene.subtitle}</p>
            <h1 className="mt-2 font-serif text-4xl leading-tight text-faded-gold sm:text-6xl">
              {scene.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-200">
              <span className="border border-old-gold/25 bg-black/35 px-3 py-1.5">
                {scene.year}
              </span>
              <span className="border border-old-gold/25 bg-black/35 px-3 py-1.5">
                {scene.location}
              </span>
            </div>

            {characters.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {characters.map((character) => (
                  <article
                    className="flex max-w-full items-center gap-3 border border-old-gold/25 bg-black/45 p-2 pr-3"
                    key={character.id}
                  >
                    <img
                      alt={character.name}
                      className="size-14 shrink-0 object-cover"
                      src={character.image}
                    />
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold text-parchment">
                        {character.name}
                      </h2>
                      <p className="truncate text-xs text-stone-300">
                        {character.role}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="space-y-4 font-serif text-xl leading-9 text-parchment">
          {scene.text.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {relics.length > 0 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {relics.map((relic) => (
              <article
                className="flex items-center gap-3 border border-old-gold/25 bg-black/30 p-3"
                key={relic.id}
              >
                <img
                  alt={relic.name}
                  className="size-16 shrink-0 object-cover"
                  src={relic.image}
                />
                <div className="min-w-0">
                  <h2 className="font-serif text-lg leading-snug text-faded-gold">
                    {relic.name}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-stone-300">
                    {relic.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        <div className="mt-7 grid gap-3">{children}</div>
      </div>
    </section>
  );
}
