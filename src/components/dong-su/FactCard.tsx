"use client";

import { useEffect } from "react";
import type { FactCardData } from "@/data/dong-su/zhu-yuanzhang-episode-1";

type FactCardProps = {
  historicalNote?: FactCardData;
  isOpen: boolean;
  onClose: () => void;
  sceneTitle: string;
};

export function FactCard({
  historicalNote,
  isOpen,
  onClose,
  sceneTitle,
}: FactCardProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !historicalNote) {
    return null;
  }

  return (
    <div
      aria-labelledby="fact-card-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <button
        aria-label="Đóng tư liệu"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />

      <section className="relative max-h-[86vh] w-full max-w-2xl overflow-y-auto border border-old-gold/45 bg-[#17100b] p-5 text-parchment shadow-ember sm:p-6">
        <div className="flex items-start justify-between gap-4 border-b border-old-gold/25 pb-4">
          <div>
          <p className="text-sm text-old-gold">Ghi chú lịch sử</p>
            <h2
              className="mt-1 font-serif text-2xl leading-tight text-faded-gold"
              id="fact-card-title"
            >
              {sceneTitle}
            </h2>
          </div>

          <button
            aria-label="Đóng"
            className="flex size-9 shrink-0 items-center justify-center border border-old-gold/40 text-faded-gold transition hover:border-faded-gold hover:bg-umber focus:outline-none focus:ring-2 focus:ring-faded-gold/70"
            onClick={onClose}
            title="Đóng"
            type="button"
          >
            X
          </button>
        </div>

        <article className="mt-5">
          <h3 className="font-serif text-xl text-parchment">
            {historicalNote.title}
          </h3>
          <p className="mt-2 leading-7 text-stone-300">
            {historicalNote.body}
          </p>
        </article>
      </section>
    </div>
  );
}
