import Link from "next/link";
import type { EpisodeCard as EpisodeCardData } from "@/data/dong-su/episodes";

type EpisodeCardProps = {
  episode: EpisodeCardData;
};

function EpisodeCardContent({ episode }: EpisodeCardProps) {
  const isAvailable = episode.status === "available";

  return (
    <>
      <div className="relative min-h-56 overflow-hidden">
        <img
          alt={episode.title}
          className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
          src={episode.coverImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
        <div className="absolute left-4 top-4 rounded-sm border border-old-gold/35 bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.16em] text-old-gold">
          {isAvailable ? "Đang mở" : "Sắp ra mắt"}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-old-gold">{episode.period}</p>
            <h3 className="mt-1 font-serif text-2xl leading-tight text-faded-gold">
              {episode.title}
            </h3>
          </div>
          <span className="shrink-0 rounded-sm border border-old-gold/25 bg-black/35 px-2.5 py-1 text-xs text-parchment">
            {episode.characterName}
          </span>
        </div>

        <p className="mt-2 text-sm leading-6 text-stone-300">
          {episode.subtitle}
        </p>
        <p className="mt-4 flex-1 leading-7 text-stone-300">
          {episode.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {episode.tags.map((tag) => (
            <span
              className="rounded-sm border border-old-gold/20 bg-black/30 px-2.5 py-1 text-xs text-stone-200"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 border-t border-old-gold/20 pt-4">
          <span className="inline-flex min-h-10 w-full items-center justify-center rounded-sm border border-old-gold/40 bg-umber px-4 py-2 text-sm font-semibold text-parchment transition group-hover:border-faded-gold group-hover:bg-oxblood">
            {isAvailable ? "Bắt đầu" : "Đang chuẩn bị"}
          </span>
        </div>
      </div>
    </>
  );
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const cardClassName =
    "group flex h-full flex-col overflow-hidden rounded-md border border-old-gold/30 bg-charcoal/90 shadow-ember transition duration-300 hover:-translate-y-1 hover:border-faded-gold/70 hover:shadow-[0_22px_60px_rgba(0,0,0,0.42),0_0_34px_rgba(214,173,96,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

  if (episode.status === "available") {
    return (
      <Link className={cardClassName} href={episode.href}>
        <EpisodeCardContent episode={episode} />
      </Link>
    );
  }

  return (
    <article aria-disabled="true" className={`${cardClassName} opacity-80`}>
      <EpisodeCardContent episode={episode} />
    </article>
  );
}
