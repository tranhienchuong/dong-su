import type { Character } from "@/data/dong-su/zhu-yuanzhang-episode-1";

type CharacterGalleryProps = {
  characters: Character[];
};

export function CharacterGallery({ characters }: CharacterGalleryProps) {
  return (
    <section>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.22em] text-old-gold">
          Nhân vật
        </p>
        <h2 className="dong-su-text-shadow mt-2 font-serif text-4xl text-faded-gold sm:text-5xl">
          Gương mặt trong hành trình
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {characters.map((character) => (
          <article
            className="dong-su-panel group overflow-hidden rounded-md transition duration-200 hover:-translate-y-0.5 hover:border-faded-gold/70 hover:shadow-[0_22px_60px_rgba(0,0,0,0.42),0_0_34px_rgba(214,173,96,0.14)]"
            key={character.id}
          >
            <div className="relative overflow-hidden border-b border-old-gold/20">
              <img
                alt={character.name}
                className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105"
                src={character.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            </div>

            <div className="p-5">
              <p className="text-sm text-old-gold">{character.role}</p>
              <h3 className="mt-2 font-serif text-3xl leading-tight text-faded-gold">
                {character.name}
              </h3>
              <p className="mt-4 leading-8 text-stone-300">
                {character.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
