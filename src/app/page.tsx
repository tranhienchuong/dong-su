import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-parchment">
      <section className="max-w-xl text-center">
        <p className="mb-3 text-sm uppercase text-old-gold">Dòng Sử</p>
        <h1 className="font-serif text-4xl text-faded-gold sm:text-6xl">
          Dòng Sử
        </h1>
        <Link
          className="mt-8 inline-flex items-center justify-center border border-old-gold/50 bg-umber px-5 py-3 text-sm font-semibold uppercase text-parchment transition hover:border-faded-gold hover:bg-oxblood"
          href="/dong-su/zhu-yuanzhang"
        >
          Bắt đầu
        </Link>
      </section>
    </main>
  );
}
