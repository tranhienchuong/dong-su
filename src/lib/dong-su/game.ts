import type {
  Episode,
  EpisodeEnding,
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

export function getEndingForStats(
  episode: Episode,
  stats: Stats,
): EpisodeEnding {
  const highestStat = getHighestStat(stats);
  const endingId: EpisodeEnding["id"] =
    highestStat === "daTam" || highestStat === "quanUy"
      ? "ambitious"
      : highestStat === "danTam" || highestStat === "nhanTinh"
        ? "humane"
        : "balanced";

  return (
    episode.endings.find((ending) => ending.id === endingId) ??
    episode.endings[0]
  );
}
