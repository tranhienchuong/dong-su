"use client";

import { useEffect } from "react";
import type { FactCardData } from "@/types/dong-su";

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
      className="dong-su-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-4"
      role="dialog"
    >
      <button
        aria-label="Đóng tư liệu"
        className="absolute inset-0 cursor-default focus:outline-none"
        onClick={onClose}
        type="button"
      />

      <section className="dong-su-panel relative max-h-[84vh] w-full max-w-2xl overflow-y-auto rounded-md p-5 text-parchment sm:max-h-[86vh] sm:p-6">
        <div className="flex items-start justify-between gap-4 border-b border-old-gold/25 pb-4">
          <div>
            <p className="text-sm text-old-gold">Ghi chú lịch sử</p>
            <h2
              className="dong-su-text-shadow mt-1 font-serif text-2xl leading-tight text-faded-gold"
              id="fact-card-title"
            >
              {sceneTitle}
            </h2>
          </div>

          <button
            aria-label="Đóng"
            className="flex size-9 shrink-0 items-center justify-center rounded-sm border border-old-gold/40 bg-black/25 text-faded-gold transition hover:border-faded-gold hover:bg-umber focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
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
