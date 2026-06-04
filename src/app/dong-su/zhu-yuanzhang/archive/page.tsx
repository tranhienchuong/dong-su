import Link from "next/link";
import { CharacterGallery } from "@/components/dong-su/CharacterGallery";
import { EpisodeTimeline } from "@/components/dong-su/EpisodeTimeline";
import { JourneyMap } from "@/components/dong-su/JourneyMap";
import { RelicGallery } from "@/components/dong-su/RelicGallery";
import { zhuYuanzhangEpisodeOne } from "@/data/dong-su/zhu-yuanzhang-episode-1";

const episode = zhuYuanzhangEpisodeOne;

export default function ZhuYuanzhangArchivePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-parchment">
      <div
        aria-hidden="true"
        className="dong-su-bg-drift pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(9,6,4,0.32), rgba(9,6,4,0.96)), url(${episode.mapImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div
        aria-hidden="true"
        className="dong-su-vignette pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="dong-su-dust pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 rounded-md border border-old-gold/20 bg-black/30 px-4 py-3 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <Link
            className="text-xs uppercase tracking-[0.24em] text-old-gold transition hover:text-faded-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
            href="/"
          >
            Dòng Sử
          </Link>
          <Link
            className="inline-flex min-h-10 items-center justify-center rounded-sm border border-old-gold/35 bg-black/35 px-4 py-2 text-sm text-faded-gold transition hover:border-faded-gold hover:bg-umber focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
            href="/dong-su/zhu-yuanzhang"
          >
            Chơi tập 1
          </Link>
        </header>

        <section className="py-12 sm:py-16">
          <p className="text-sm uppercase tracking-[0.24em] text-old-gold">
            Kho tư liệu
          </p>
          <h1 className="dong-su-text-shadow mt-4 max-w-4xl font-serif text-5xl leading-tight text-faded-gold sm:text-7xl">
            Chu Nguyên Chương — Tập 1
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
            Xem lại hành trình từ Chu Trùng Bát đến Chu Nguyên Chương qua các
            cảnh, nhân vật và vật phẩm biểu tượng.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-old-gold/45 bg-umber px-5 py-3 font-semibold text-parchment transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-oxblood focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
              href="/dong-su/zhu-yuanzhang"
            >
              Chơi tập 1
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-old-gold/35 bg-black/35 px-5 py-3 font-semibold text-faded-gold transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-umber focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
              href="/"
            >
              Về trang chủ
            </Link>
          </div>
        </section>

        <div className="space-y-14 pb-14">
          <JourneyMap mapImage={episode.mapImage} />
          <EpisodeTimeline scenes={episode.scenes} />
          <CharacterGallery characters={episode.characters} />
          <RelicGallery relics={episode.relics} />

          <section className="dong-su-panel rounded-md p-6 text-center sm:p-8">
            <p className="font-serif text-3xl text-faded-gold">
              Sẵn sàng quay lại câu chuyện?
            </p>
            <Link
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-sm border border-old-gold/45 bg-umber px-5 py-3 font-semibold text-parchment transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-oxblood focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
              href="/dong-su/zhu-yuanzhang"
            >
              Bắt đầu lại tập 1
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
