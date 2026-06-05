import { statOrder } from "@/lib/dong-su/game";
import type { Episode, StatKey, Stats } from "@/types/dong-su";

export const SAVE_VERSION = 1;

export type SavedProgress = {
  version: number;
  currentSceneIndex: number;
  stats: Stats;
  selectedChoiceId: string | null;
  resultText: string | null;
  isEnded: boolean;
  hasStarted: boolean;
  savedAt: string;
};

export function isValidStats(value: unknown): value is Stats {
  if (!value || typeof value !== "object") {
    return false;
  }

  const stats = value as Record<StatKey, unknown>;

  return statOrder.every((stat) => typeof stats[stat] === "number");
}

export function parseSavedProgress(
  raw: string | null,
  episode: Episode,
): SavedProgress | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<SavedProgress>;

    if (
      parsed.version !== SAVE_VERSION ||
      typeof parsed.currentSceneIndex !== "number" ||
      parsed.currentSceneIndex < 0 ||
      parsed.currentSceneIndex >= episode.scenes.length ||
      !isValidStats(parsed.stats) ||
      !(
        typeof parsed.selectedChoiceId === "string" ||
        parsed.selectedChoiceId === null
      ) ||
      !(typeof parsed.resultText === "string" || parsed.resultText === null) ||
      typeof parsed.isEnded !== "boolean" ||
      typeof parsed.hasStarted !== "boolean" ||
      typeof parsed.savedAt !== "string"
    ) {
      return null;
    }

    return {
      version: parsed.version,
      currentSceneIndex: parsed.currentSceneIndex,
      stats: parsed.stats,
      selectedChoiceId: parsed.selectedChoiceId,
      resultText: parsed.resultText,
      isEnded: parsed.isEnded,
      hasStarted: parsed.hasStarted,
      savedAt: parsed.savedAt,
    };
  } catch {
    return null;
  }
}

export function formatSavedAt(savedAt: string): string | null {
  const savedAtDate = new Date(savedAt);

  if (Number.isNaN(savedAtDate.getTime())) {
    return null;
  }

  return savedAtDate.toLocaleString();
}
