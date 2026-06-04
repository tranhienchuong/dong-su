import type { Relic } from "@/data/dong-su/zhu-yuanzhang-episode-1";

type RelicGalleryProps = {
  relics: Relic[];
};

export function RelicGallery({ relics }: RelicGalleryProps) {
  return (
    <section>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.22em] text-old-gold">
          Vật phẩm
        </p>
        <h2 className="dong-su-text-shadow mt-2 font-serif text-4xl text-faded-gold sm:text-5xl">
          Những vật phẩm ký ức
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {relics.map((relic) => (
          <article
            className="group overflow-hidden rounded-md border border-old-gold/25 bg-[linear-gradient(135deg,rgba(0,0,0,0.42),rgba(59,36,22,0.38))] shadow-ember transition duration-200 hover:-translate-y-0.5 hover:border-faded-gold/70 hover:shadow-[0_18px_48px_rgba(0,0,0,0.4),0_0_28px_rgba(214,173,96,0.15)]"
            key={relic.id}
          >
            <div className="relative overflow-hidden border-b border-old-gold/20">
              <img
                alt={relic.name}
                className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                src={relic.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            </div>
            <div className="p-5">
              <h3 className="font-serif text-2xl leading-tight text-faded-gold">
                {relic.name}
              </h3>
              <p className="mt-3 leading-7 text-stone-300">
                {relic.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
