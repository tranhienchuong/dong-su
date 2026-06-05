"use client";

import type { ReactNode } from "react";
import type { Character, Relic, StorySceneData } from "@/types/dong-su";

type StorySceneProps = {
  characters: Character[];
  children: ReactNode;
  onOpenFact: () => void;
  relics: Relic[];
  scene: StorySceneData;
  totalScenes: number;
};

const toneOverlays: Record<StorySceneData["imageTone"], string> = {
  ash: "from-black/90 via-stone-950/35 to-amber-950/55",
  dust: "from-black/85 via-black/20 to-amber-950/60",
  embers: "from-black/90 via-red-950/25 to-amber-950/55",
  lamp: "from-black/90 via-yellow-950/20 to-stone-950/60",
  rain: "from-black/90 via-slate-950/25 to-stone-900/65",
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
    <section className="dong-su-panel dong-su-fade-in overflow-hidden rounded-md">
      <div className="relative min-h-[24rem] sm:min-h-[30rem] lg:min-h-[34rem]">
        <div
          className="dong-su-bg-drift absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${scene.backgroundImage})` }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${toneOverlays[scene.imageTone]}`}
        />
        <div className="absolute inset-0 dong-su-vignette" />
        <div className="absolute inset-0 dong-su-dust" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(214,173,96,0.2),transparent_28rem)]" />

        <div className="relative flex min-h-[24rem] flex-col justify-between p-5 sm:min-h-[30rem] sm:p-7 lg:min-h-[34rem]">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-stone-200">
            <span className="rounded-sm border border-old-gold/25 bg-black/45 px-3 py-1.5 text-old-gold backdrop-blur-sm">
              Cảnh {scene.chapter}/{totalScenes}
            </span>

            {hasHistoricalNote ? (
              <button
                className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-old-gold/45 bg-black/50 px-3 py-2 text-faded-gold backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-umber focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
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

          <div className="max-w-3xl rounded-md border border-old-gold/15 bg-black/25 p-4 backdrop-blur-[2px] sm:p-5">
            <p className="text-sm text-old-gold dong-su-text-shadow">
              {scene.subtitle}
            </p>
            <h1 className="dong-su-text-shadow mt-2 font-serif text-4xl leading-tight text-faded-gold sm:text-5xl lg:text-6xl">
              {scene.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-200">
              <span className="rounded-sm border border-old-gold/25 bg-black/45 px-3 py-1.5 backdrop-blur-sm">
                {scene.year}
              </span>
              <span className="rounded-sm border border-old-gold/25 bg-black/45 px-3 py-1.5 backdrop-blur-sm">
                {scene.location}
              </span>
            </div>

            {characters.length > 0 ? (
              <div className="mt-5 flex gap-3 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
                {characters.map((character) => (
                  <article
                    className="flex min-w-56 max-w-full items-center gap-3 rounded-md border border-old-gold/35 bg-black/50 p-2 pr-3 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-faded-gold/75 hover:bg-umber/55 sm:min-w-0"
                    key={character.id}
                  >
                    <img
                      alt={character.name}
                      className="size-14 shrink-0 rounded-sm border border-old-gold/40 object-cover"
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
        <div className="space-y-4 rounded-md border border-old-gold/15 bg-black/20 p-4 font-serif text-lg leading-8 text-parchment backdrop-blur-[2px] sm:p-5 sm:text-xl sm:leading-9">
          {scene.text.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {relics.length > 0 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {relics.map((relic) => (
              <article
                className="flex items-center gap-3 rounded-md border border-old-gold/30 bg-[linear-gradient(135deg,rgba(0,0,0,0.34),rgba(59,36,22,0.32))] p-3 transition duration-200 hover:-translate-y-0.5 hover:border-faded-gold/65 hover:shadow-[0_0_24px_rgba(214,173,96,0.16)]"
                key={relic.id}
              >
                <img
                  alt={relic.name}
                  className="size-16 shrink-0 rounded-sm border border-old-gold/35 object-cover"
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
