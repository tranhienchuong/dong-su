import Link from "next/link";
import { EpisodeCard } from "@/components/dong-su/EpisodeCard";
import { episodes } from "@/data/dong-su/episodes";

const featuredEpisode = episodes.find(
  (episode) => episode.id === "zhu-yuanzhang-episode-1",
);

const statNames = ["Dân tâm", "Nghĩa khí", "Quân uy", "Nhân tính", "Dã tâm"];

const experienceSteps = [
  {
    title: "Đọc cảnh",
    body: "Mỗi cảnh đặt người đọc vào một khoảnh khắc có áp lực, ký ức và lựa chọn rõ ràng.",
  },
  {
    title: "Chọn hành động",
    body: "Không có đáp án sạch tuyệt đối. Mỗi lựa chọn kéo nhân vật về một hướng khác nhau.",
  },
  {
    title: "Nhìn chỉ số thay đổi",
    body: "Dân tâm, nghĩa khí, quân uy, nhân tính và dã tâm cùng tạo nên kết cục của tập.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-parchment">
      <div
        aria-hidden="true"
        className="dong-su-bg-drift pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(9,6,4,0.3), rgba(9,6,4,0.96)), url(/history/zhu-yuanzhang/maps/early-journey-map.webp)",
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
        <header className="flex items-center justify-between rounded-md border border-old-gold/20 bg-black/25 px-4 py-3 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-old-gold">
            Dòng Sử
          </p>
          <a
            className="rounded-sm border border-old-gold/35 bg-black/35 px-3 py-2 text-sm text-faded-gold transition hover:border-faded-gold hover:bg-umber focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
            href="#episodes"
          >
            Các tập
          </a>
        </header>

        <section className="grid min-h-[calc(100vh-6rem)] items-center gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:py-16">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.24em] text-old-gold">
              Thư viện lịch sử tương tác
            </p>
            <h1 className="dong-su-text-shadow mt-4 font-serif text-6xl leading-none text-faded-gold sm:text-7xl lg:text-8xl">
              Dòng Sử
            </h1>
            <p className="mt-6 max-w-3xl font-serif text-2xl leading-10 text-parchment sm:text-3xl">
              Hóa thân vào nhân vật lịch sử. Đi qua lựa chọn, ký ức và cái giá
              của thời đại.
            </p>
            <p className="mt-5 max-w-2xl leading-8 text-stone-300">
              Mỗi tập là một lát cắt điện ảnh: ngắn, có lựa chọn, có chỉ số và
              có kết cục chịu ảnh hưởng từ cách bạn nhìn quyền lực, lòng người
              và thời thế.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-old-gold/45 bg-umber px-5 py-3 font-semibold text-parchment transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-oxblood focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
                href="/dong-su/zhu-yuanzhang"
              >
                Bắt đầu Chu Nguyên Chương
              </Link>
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-old-gold/35 bg-black/35 px-5 py-3 font-semibold text-faded-gold transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-umber focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
                href="#episodes"
              >
                Xem các tập
              </a>
            </div>
          </div>

          <aside className="dong-su-panel rounded-md p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-old-gold">
              Đang mở
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-faded-gold">
              Chu Nguyên Chương — Tập 1
            </h2>
            <p className="mt-4 leading-7 text-stone-300">
              Từ 13 hạt gạo, cửa chùa Hoàng Giác đến khoảnh khắc được gọi bằng
              cái tên Chu Nguyên Chương.
            </p>
            <div className="mt-5 overflow-hidden rounded-sm border border-old-gold/25">
              <img
                alt="Chu Nguyên Chương dưới ánh bình minh"
                className="aspect-[4/3] w-full object-cover"
                src="/history/zhu-yuanzhang/scenes/16-zhu-yuanzhang-dawn.webp"
              />
            </div>
            <div className="mt-5 grid gap-3">
              <Link
                className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-old-gold/45 bg-umber px-4 py-2 text-parchment transition hover:border-faded-gold hover:bg-oxblood focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
                href="/dong-su/zhu-yuanzhang"
              >
                Vào tập truyện
              </Link>
              <Link
                className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-old-gold/35 bg-black/35 px-4 py-2 text-faded-gold transition hover:border-faded-gold hover:bg-umber focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
                href="/dong-su/zhu-yuanzhang/archive"
              >
                Xem kho tư liệu
              </Link>
            </div>
          </aside>
        </section>

        <section className="py-10" id="episodes">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-old-gold">
                Episode hub
              </p>
              <h2 className="dong-su-text-shadow mt-2 font-serif text-4xl text-faded-gold sm:text-5xl">
                Chọn nhân vật và tập truyện
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-stone-300">
              Những card sắp ra mắt dùng tạm hình có sẵn trong kho ảnh hiện tại
              và sẽ được thay bằng assets riêng ở các phase sau.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {episodes.map((episode) => (
              <EpisodeCard episode={episode} key={episode.id} />
            ))}
          </div>
        </section>

        <section className="grid gap-5 py-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="dong-su-panel rounded-md p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-old-gold">
              Cách trải nghiệm
            </p>
            <h2 className="mt-2 font-serif text-4xl text-faded-gold">
              Chơi bằng lựa chọn
            </h2>
            <p className="mt-4 leading-8 text-stone-300">
              Dòng Sử không yêu cầu thắng thua. Điều quan trọng là bạn nhìn thấy
              mỗi quyết định để lại dấu vết gì trong con người nhân vật.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {statNames.map((statName) => (
                <span
                  className="rounded-sm border border-old-gold/25 bg-black/35 px-3 py-1.5 text-sm text-stone-200"
                  key={statName}
                >
                  {statName}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {experienceSteps.map((step, index) => (
              <article
                className="rounded-md border border-old-gold/25 bg-black/40 p-5 shadow-ember"
                key={step.title}
              >
                <span className="flex size-10 items-center justify-center rounded-sm border border-old-gold/35 bg-umber font-serif text-xl text-faded-gold">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-serif text-2xl text-faded-gold">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-stone-300">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-12 pt-8">
          <div className="dong-su-panel rounded-md p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.22em] text-old-gold">
              Định hướng
            </p>
            <h2 className="mt-2 font-serif text-4xl text-faded-gold">
              Mở rộng như một thư viện sống
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-stone-300">
              Dòng Sử không cố thay sách sử. Đây là một trải nghiệm tương tác
              giúp người đọc cảm nhận lựa chọn, áp lực và bi kịch của nhân vật
              trong bối cảnh lịch sử.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
