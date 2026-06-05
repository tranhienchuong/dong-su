import type { StorySceneData } from "@/types/dong-su";

type EpisodeTimelineProps = {
  scenes: StorySceneData[];
};

export function EpisodeTimeline({ scenes }: EpisodeTimelineProps) {
  return (
    <section>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.22em] text-old-gold">
          Timeline
        </p>
        <h2 className="dong-su-text-shadow mt-2 font-serif text-4xl text-faded-gold sm:text-5xl">
          16 cảnh của tập 1
        </h2>
      </div>

      <div className="relative space-y-5 lg:pl-8">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-3 top-0 hidden w-px bg-old-gold/30 lg:block"
        />

        {scenes.map((scene) => (
          <article
            className="group relative overflow-hidden rounded-md border border-old-gold/25 bg-black/35 transition duration-200 hover:border-faded-gold/70 hover:shadow-ember lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]"
            key={scene.id}
          >
            <span className="absolute -left-[2.12rem] top-8 hidden size-6 items-center justify-center rounded-full border border-old-gold/45 bg-ink text-xs text-faded-gold lg:flex">
              {scene.chapter}
            </span>

            <div className="relative min-h-48 overflow-hidden lg:min-h-full">
              <img
                alt={scene.title}
                className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
                src={scene.backgroundImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute left-4 top-4 rounded-sm border border-old-gold/35 bg-black/60 px-3 py-1 text-sm text-faded-gold">
                Cảnh {scene.chapter}
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap gap-2 text-sm text-stone-300">
                <span className="rounded-sm border border-old-gold/20 bg-black/30 px-2.5 py-1">
                  {scene.year}
                </span>
                <span className="rounded-sm border border-old-gold/20 bg-black/30 px-2.5 py-1">
                  {scene.location}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-3xl leading-tight text-faded-gold">
                {scene.title}
              </h3>
              <p className="mt-2 text-old-gold">{scene.subtitle}</p>
              <p className="mt-4 leading-8 text-stone-300">
                {scene.text[0]}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
