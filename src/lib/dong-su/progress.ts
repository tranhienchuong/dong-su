import { statOrder } from "@/lib/dong-su/game";
import type { Episode, MemoryFlag, StatKey, Stats } from "@/types/dong-su";

export const SAVE_VERSION = 1;

const memoryFlags: MemoryFlag[] = [
  "shared_food",
  "protected_weak",
  "chose_power",
  "protected_brothers",
  "defied_authority",
  "showed_mercy",
  "chose_discipline",
  "led_by_example",
  "used_fear",
  "accepted_humiliation",
  "remembered_hunger",
  "chose_survival",
  "protected_dignity",
  "took_responsibility",
];

export type SavedProgress = {
  version: number;
  currentSceneIndex: number;
  stats: Stats;
  selectedChoiceId: string | null;
  resultText: string | null;
  memory: MemoryFlag[];
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

function isMemoryFlag(value: unknown): value is MemoryFlag {
  return (
    typeof value === "string" && memoryFlags.includes(value as MemoryFlag)
  );
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

    const memory = Array.isArray(parsed.memory)
      ? parsed.memory.filter(isMemoryFlag)
      : [];

    return {
      version: parsed.version,
      currentSceneIndex: parsed.currentSceneIndex,
      stats: parsed.stats,
      selectedChoiceId: parsed.selectedChoiceId,
      resultText: parsed.resultText,
      memory,
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
