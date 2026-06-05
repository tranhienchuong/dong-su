"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  EpisodeEnding,
  MemoryFlag,
  PersonaKey,
  Stats,
} from "@/types/dong-su";

type AIEndingNarrativeProps = {
  episodeId: string;
  stats: Stats;
  memory: MemoryFlag[];
  personaKey: PersonaKey;
  endingKey: EpisodeEnding["id"];
};

type AIEndingResponse = {
  narrative?: unknown;
};

export function AIEndingNarrative({
  episodeId,
  stats,
  memory,
  personaKey,
  endingKey,
}: AIEndingNarrativeProps) {
  const [narrative, setNarrative] = useState<string | null>(null);
  const cacheKey = useMemo(
    () =>
      `dong-su:ai-ending:${episodeId}:${endingKey}:${personaKey}:${getStatsHash(stats)}:${getMemoryHash(memory)}`,
    [endingKey, episodeId, memory, personaKey, stats],
  );

  useEffect(() => {
    let isCurrent = true;

    setNarrative(null);

    try {
      const cachedNarrative = window.localStorage.getItem(cacheKey);

      if (cachedNarrative) {
        setNarrative(cachedNarrative);
        return;
      }
    } catch {
      // Storage is an optimization; the ending should still render without it.
    }

    async function loadNarrative() {
      try {
        const response = await fetch("/api/ai-ending", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            episodeId,
            stats,
            memory,
            personaKey,
            endingKey,
          }),
        });

        if (!response.ok || !isCurrent) {
          return;
        }

        const data = (await response.json()) as AIEndingResponse;

        if (typeof data.narrative !== "string" || data.narrative.length === 0) {
          return;
        }

        setNarrative(data.narrative);

        try {
          window.localStorage.setItem(cacheKey, data.narrative);
        } catch {
          // Ignore cache failures; the generated text can still be displayed.
        }
      } catch {
        // AI narrative is optional; provider or network failures must not break ending.
      }
    }

    void loadNarrative();

    return () => {
      isCurrent = false;
    };
  }, [cacheKey, endingKey, episodeId, memory, personaKey, stats]);

  if (!narrative) {
    return null;
  }

  return (
    <section className="mt-6 rounded-sm border border-old-gold/30 bg-black/30 p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-old-gold">
        Lời bình sử gia
      </p>
      <p className="mt-3 max-w-3xl leading-7 text-stone-300">{narrative}</p>
    </section>
  );
}

function getStatsHash(stats: Stats): string {
  return [
    stats.danTam,
    stats.nghiaKhi,
    stats.quanUy,
    stats.nhanTinh,
    stats.daTam,
  ].join(".");
}

function getMemoryHash(memory: MemoryFlag[]): string {
  return memory.length > 0 ? memory.join(".") : "none";
}
