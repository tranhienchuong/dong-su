import type {
  EndingKey,
  Episode,
  EpisodeEnding,
  EpisodeOutcome,
  MemoryFlag,
  PersonaKey,
  PersonaProfile,
  StatKey,
  Stats,
  StoryChoice,
} from "@/types/dong-su";

export const statOrder: StatKey[] = [
  "danTam",
  "nghiaKhi",
  "quanUy",
  "nhanTinh",
  "daTam",
];

export const personaProfiles: Record<PersonaKey, PersonaProfile> = {
  "iron-ruler": {
    key: "iron-ruler",
    label: "Đế vương sắt lạnh",
    description:
      "Người học cách đặt quân lệnh và quyền lực lên trên tình riêng.",
  },
  "people-hearted": {
    key: "people-hearted",
    label: "Người giữ dân tâm",
    description:
      "Giữa thời loạn, người vẫn nhìn thấy dân đói trước khi nhìn thấy ngai vàng.",
  },
  "brotherhood-leader": {
    key: "brotherhood-leader",
    label: "Đại ca thời loạn",
    description:
      "Người sống bằng nghĩa khí, và khiến người khác muốn đứng cùng mình.",
  },
  "balanced-founder": {
    key: "balanced-founder",
    label: "Người lập nghiệp giữa máu và cơm",
    description:
      "Người không hoàn toàn mềm yếu, cũng chưa hoàn toàn sắt đá.",
  },
  survivor: {
    key: "survivor",
    label: "Kẻ sống sót",
    description:
      "Trước khi nói đến thiên hạ, người đã học cách không chết đói.",
  },
};

export function applyStatChanges(stats: Stats, choice: StoryChoice): Stats {
  return statOrder.reduce<Stats>(
    (nextStats, stat) => ({
      ...nextStats,
      [stat]: Math.max(0, nextStats[stat] + (choice.effects[stat] ?? 0)),
    }),
    { ...stats },
  );
}

export function getHighestStat(stats: Stats): StatKey {
  return statOrder.reduce((highest, stat) =>
    stats[stat] > stats[highest] ? stat : highest,
  );
}

export function countMemory(memory: MemoryFlag[], flag: MemoryFlag): number {
  return memory.filter((item) => item === flag).length;
}

function getMemoryPersona(stats: Stats, memory: MemoryFlag[]): PersonaKey | null {
  const highestValue = Math.max(...statOrder.map((stat) => stats[stat]));
  const hasStatTie =
    statOrder.filter((stat) => stats[stat] === highestValue).length > 1;

  if (!hasStatTie) {
    return null;
  }

  const scores: Record<PersonaKey, number> = {
    "iron-ruler":
      countMemory(memory, "chose_power") +
      countMemory(memory, "used_fear") +
      countMemory(memory, "chose_discipline"),
    "people-hearted":
      countMemory(memory, "shared_food") +
      countMemory(memory, "protected_weak") +
      countMemory(memory, "showed_mercy"),
    "brotherhood-leader":
      countMemory(memory, "protected_brothers") +
      countMemory(memory, "defied_authority") +
      countMemory(memory, "led_by_example"),
    "balanced-founder": countMemory(memory, "took_responsibility"),
    survivor:
      countMemory(memory, "accepted_humiliation") +
      countMemory(memory, "remembered_hunger") +
      countMemory(memory, "chose_survival") +
      countMemory(memory, "protected_dignity"),
  };

  const [personaKey, score] = Object.entries(scores).sort(
    ([, a], [, b]) => b - a,
  )[0] as [PersonaKey, number];

  return score > 0 ? personaKey : null;
}

export function getPlayerPersona(
  stats: Stats,
  memory: MemoryFlag[] = [],
): PersonaKey {
  const { danTam, nghiaKhi, quanUy, nhanTinh, daTam } = stats;

  if (daTam >= 6 && quanUy >= 5) {
    return "iron-ruler";
  }

  if (danTam >= 6 && nhanTinh >= 5) {
    return "people-hearted";
  }

  if (nghiaKhi >= 6) {
    return "brotherhood-leader";
  }

  const memoryPersona = getMemoryPersona(stats, memory);

  if (memoryPersona) {
    return memoryPersona;
  }

  const dominant = getHighestStat(stats);

  if (dominant === "daTam" || dominant === "quanUy") {
    return "iron-ruler";
  }

  if (dominant === "danTam" || dominant === "nhanTinh") {
    return "people-hearted";
  }

  if (dominant === "nghiaKhi") {
    return "brotherhood-leader";
  }

  return "survivor";
}

function balanceScore(stats: Stats): number {
  const values = statOrder.map((stat) => stats[stat]);
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance =
    values.reduce((sum, value) => sum + Math.abs(value - average), 0) /
    values.length;

  return average * 0.8 - variance * 0.5;
}

export function getEndingScores(
  stats: Stats,
  memory: MemoryFlag[] = [],
): Record<EndingKey, number> {
  return {
    humane:
      stats.danTam * 1.4 +
      stats.nhanTinh * 1.3 +
      countMemory(memory, "protected_weak") * 1.8 +
      countMemory(memory, "showed_mercy") * 1.4 -
      stats.daTam * 0.35,

    ambitious:
      stats.daTam * 1.5 +
      stats.quanUy * 1.2 +
      countMemory(memory, "chose_power") * 1.8 +
      countMemory(memory, "used_fear") * 1.4 -
      stats.nhanTinh * 0.25,

    balanced:
      balanceScore(stats) + countMemory(memory, "took_responsibility") * 0.8,
  };
}

export function getWeightedEndingKey(
  stats: Stats,
  memory: MemoryFlag[] = [],
): EndingKey {
  const scores = getEndingScores(stats, memory);

  return Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0] as EndingKey;
}

export function getEpisodeOutcome(
  episode: Episode,
  stats: Stats,
  memory: MemoryFlag[] = [],
): EpisodeOutcome {
  const endingKey = getWeightedEndingKey(stats, memory);
  const ending =
    episode.endings.find((item) => item.id === endingKey) ?? episode.endings[0];
  const personaKey = getPlayerPersona(stats, memory);
  const persona = personaProfiles[personaKey];

  return {
    endingKey,
    ending,
    personaKey,
    persona,
    scores: getEndingScores(stats, memory),
  };
}

export function getEndingForStats(
  episode: Episode,
  stats: Stats,
): EpisodeEnding {
  return getEpisodeOutcome(episode, stats).ending;
}
