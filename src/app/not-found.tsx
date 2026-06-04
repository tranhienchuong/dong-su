import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-parchment">
      <section className="max-w-xl text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-old-gold">
          Dòng Sử
        </p>
        <h1 className="font-serif text-4xl text-faded-gold sm:text-6xl">
          Không tìm thấy trang
        </h1>
        <p className="mt-4 leading-7 text-stone-300">
          Đường dẫn này không có trong tập truyện hiện tại.
        </p>
        <Link
          className="mt-8 inline-flex items-center justify-center rounded-sm border border-old-gold/50 bg-umber px-5 py-3 text-sm font-semibold uppercase text-parchment transition hover:border-faded-gold hover:bg-oxblood focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
          href="/"
        >
          Về trang chính
        </Link>
      </section>
    </main>
  );
}
