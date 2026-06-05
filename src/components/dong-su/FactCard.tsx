"use client";

import { type FormEvent, useEffect, useState } from "react";
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
  const [answer, setAnswer] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");

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

  useEffect(() => {
    setAnswer(null);
    setErrorText(null);
    setIsLoading(false);
  }, [sceneTitle, historicalNote?.title, historicalNote?.body]);

  if (!isOpen || !historicalNote) {
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!historicalNote) {
      return;
    }

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    setAnswer(null);
    setErrorText(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/historical-note", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          noteBody: historicalNote.body,
          noteTitle: historicalNote.title,
          question: trimmedQuestion,
          sceneTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("Historical note request failed");
      }

      const data = (await response.json()) as { answer?: unknown };
      const nextAnswer =
        typeof data.answer === "string" ? data.answer.trim() : "";

      if (nextAnswer) {
        setAnswer(nextAnswer);
      } else {
        setErrorText("Chưa thể trả lời lúc này.");
      }
    } catch {
      setErrorText("Chưa thể trả lời lúc này.");
    } finally {
      setIsLoading(false);
    }
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

        <form
          className="mt-5 border-t border-old-gold/20 pt-4"
          onSubmit={handleSubmit}
        >
          <label
            className="text-sm font-medium text-old-gold"
            htmlFor="historical-note-question"
          >
            Hỏi thêm
          </label>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              className="min-h-11 flex-1 rounded-sm border border-old-gold/30 bg-black/35 px-3 py-2 text-sm text-parchment outline-none transition placeholder:text-stone-500 focus:border-faded-gold focus:ring-2 focus:ring-faded-gold/40"
              disabled={isLoading}
              id="historical-note-question"
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Nhập câu hỏi"
              type="text"
              value={question}
            />
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-sm border border-old-gold/45 bg-umber px-4 py-2 text-parchment transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-oxblood focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading || !question.trim()}
              type="submit"
            >
              {isLoading ? "Đang hỏi..." : "Hỏi"}
            </button>
          </div>
        </form>

        <div aria-live="polite" className="mt-4">
          {answer ? (
            <div className="rounded-sm border border-old-gold/25 bg-black/35 p-4">
              <p className="text-sm font-medium text-old-gold">Trả lời</p>
              <p className="mt-2 leading-7 text-stone-300">{answer}</p>
            </div>
          ) : null}
          {errorText ? (
            <p className="rounded-sm border border-oxblood/40 bg-oxblood/15 px-3 py-2 text-sm text-stone-200">
              {errorText}
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
