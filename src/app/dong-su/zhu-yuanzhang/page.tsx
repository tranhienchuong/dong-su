"use client";

import { useMemo, useState } from "react";
import { ChoiceButton } from "@/components/dong-su/ChoiceButton";
import { FactCard } from "@/components/dong-su/FactCard";
import { StatPanel } from "@/components/dong-su/StatPanel";
import { StoryScene } from "@/components/dong-su/StoryScene";
import {
  type Character,
  type EpisodeEnding,
  type Relic,
  type StatKey,
  type Stats,
  type StoryChoice,
  zhuYuanzhangEpisodeOne,
} from "@/data/dong-su/zhu-yuanzhang-episode-1";

const episode = zhuYuanzhangEpisodeOne;

const statOrder: StatKey[] = [
  "danTam",
  "nghiaKhi",
  "quanUy",
  "nhanTinh",
  "daTam",
];

function applyStatChanges(stats: Stats, choice: StoryChoice): Stats {
  return statOrder.reduce<Stats>(
    (nextStats, stat) => ({
      ...nextStats,
      [stat]: Math.max(0, nextStats[stat] + (choice.effects[stat] ?? 0)),
    }),
    { ...stats },
  );
}

function getHighestStat(stats: Stats): StatKey {
  return statOrder.reduce((highest, stat) =>
    stats[stat] > stats[highest] ? stat : highest,
  );
}

function getEndingForStats(stats: Stats): EpisodeEnding {
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

export default function ZhuYuanzhangEpisodePage() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [stats, setStats] = useState<Stats>({ ...episode.initialStats });
  const [selectedChoice, setSelectedChoice] = useState<StoryChoice | null>(
    null,
  );
  const [resultText, setResultText] = useState<string | null>(null);
  const [isEnded, setIsEnded] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const currentScene = episode.scenes[currentSceneIndex] ?? episode.scenes[0];
  const ending = useMemo(() => getEndingForStats(stats), [stats]);
  const backdropImage = hasStarted
    ? currentScene.backgroundImage
    : episode.mapImage;

  const currentCharacters = useMemo<Character[]>(
    () =>
      currentScene.characterIds
        .map((characterId) =>
          episode.characters.find((character) => character.id === characterId),
        )
        .filter((character): character is Character => Boolean(character)),
    [currentScene.characterIds],
  );

  const currentRelics = useMemo<Relic[]>(
    () =>
      currentScene.itemIds
        .map((itemId) => episode.relics.find((relic) => relic.id === itemId))
        .filter((relic): relic is Relic => Boolean(relic)),
    [currentScene.itemIds],
  );

  const handleStart = () => {
    setHasStarted(true);
    setShowFact(false);
  };

  const handleChoose = (choice: StoryChoice) => {
    if (selectedChoice) {
      return;
    }

    setStats((currentStats) => applyStatChanges(currentStats, choice));
    setSelectedChoice(choice);
    setResultText(choice.resultText);
    setShowFact(false);
  };

  const handleContinue = () => {
    if (!selectedChoice) {
      return;
    }

    if (!selectedChoice.nextSceneId) {
      setIsEnded(true);
      setShowFact(false);
      return;
    }

    const nextSceneIndex = episode.scenes.findIndex(
      (scene) => scene.id === selectedChoice.nextSceneId,
    );

    if (nextSceneIndex < 0) {
      setIsEnded(true);
      setShowFact(false);
      return;
    }

    setCurrentSceneIndex(nextSceneIndex);
    setSelectedChoice(null);
    setResultText(null);
    setShowFact(false);
  };

  const handleRestart = () => {
    setCurrentSceneIndex(0);
    setStats({ ...episode.initialStats });
    setSelectedChoice(null);
    setResultText(null);
    setIsEnded(false);
    setShowFact(false);
    setHasStarted(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-parchment">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(9,6,4,0.35), rgba(9,6,4,0.96)), url(${backdropImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(9,6,4,0.9),rgba(21,16,12,0.44),rgba(9,6,4,0.9))]"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-5 border-b border-old-gold/25 pb-5">
          <p className="text-sm text-old-gold">Dòng Sử</p>
          <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl leading-tight text-faded-gold sm:text-5xl">
                {episode.title}
              </h1>
              <p className="mt-2 text-lg text-old-gold">{episode.subtitle}</p>
              <p className="mt-3 max-w-2xl leading-7 text-stone-300">
                {episode.framing}
              </p>
            </div>
            <button
              className="inline-flex min-h-11 w-full items-center justify-center border border-old-gold/45 bg-black/35 px-4 py-2 text-faded-gold transition hover:border-faded-gold hover:bg-umber focus:outline-none focus:ring-2 focus:ring-faded-gold/70 sm:w-auto"
              onClick={handleRestart}
              type="button"
            >
              Chơi lại
            </button>
          </div>
        </header>

        {!hasStarted ? (
          <section className="grid flex-1 overflow-hidden border border-old-gold/35 bg-charcoal/90 shadow-ember lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
            <div className="relative min-h-[22rem] lg:min-h-[34rem]">
              <img
                alt="Bản đồ hành trình đầu đời của Chu Nguyên Chương"
                className="absolute inset-0 size-full object-cover"
                src={episode.mapImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            </div>

            <div className="flex flex-col justify-center p-5 sm:p-8">
              <p className="text-sm text-old-gold">Bản đồ đầu tập</p>
              <h2 className="mt-2 font-serif text-4xl leading-tight text-faded-gold sm:text-5xl">
                {episode.description}
              </h2>
              <p className="mt-5 leading-8 text-stone-300">
                Theo dấu Chu Trùng Bát từ ruộng nghèo, cửa chùa, đường phiêu
                bạt đến doanh trại Hồng Cân. Mỗi lựa chọn sẽ bồi đắp năm chỉ số
                của tập này.
              </p>
              <button
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center border border-old-gold/45 bg-umber px-5 py-3 text-parchment transition hover:border-faded-gold hover:bg-oxblood focus:outline-none focus:ring-2 focus:ring-faded-gold/70 sm:w-auto"
                onClick={handleStart}
                type="button"
              >
                Bắt đầu
              </button>
            </div>
          </section>
        ) : (
          <div className="grid flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div>
              {isEnded ? (
                <section className="border border-old-gold/35 bg-charcoal/90 p-6 shadow-ember sm:p-8">
                  {resultText ? (
                    <div className="mb-6 border-l-4 border-faded-gold bg-black/35 px-4 py-3 text-stone-200">
                      {resultText}
                    </div>
                  ) : null}

                  <p className="text-sm text-old-gold">Kết cục tập 1</p>
                  <h2 className="mt-2 font-serif text-4xl leading-tight text-faded-gold sm:text-6xl">
                    {ending.title}
                  </h2>
                  <p className="mt-5 max-w-3xl font-serif text-xl leading-9 text-parchment">
                    {ending.body}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      className="inline-flex min-h-11 items-center justify-center border border-old-gold/45 bg-umber px-4 py-2 text-parchment transition hover:border-faded-gold hover:bg-oxblood focus:outline-none focus:ring-2 focus:ring-faded-gold/70"
                      onClick={handleRestart}
                      type="button"
                    >
                      Chơi lại từ đầu
                    </button>
                    {currentScene.historicalNote ? (
                      <button
                        className="inline-flex min-h-11 items-center justify-center border border-old-gold/35 bg-black/35 px-4 py-2 text-faded-gold transition hover:border-faded-gold hover:bg-umber focus:outline-none focus:ring-2 focus:ring-faded-gold/70"
                        onClick={() => setShowFact(true)}
                        type="button"
                      >
                        Ghi chú lịch sử cảnh cuối
                      </button>
                    ) : null}
                  </div>
                </section>
              ) : (
                <StoryScene
                  characters={currentCharacters}
                  onOpenFact={() => setShowFact(true)}
                  relics={currentRelics}
                  scene={currentScene}
                  totalScenes={episode.scenes.length}
                >
                  {currentScene.choices.map((choice) => (
                    <ChoiceButton
                      choice={choice}
                      disabled={Boolean(selectedChoice)}
                      key={choice.id}
                      onChoose={handleChoose}
                      selected={selectedChoice?.id === choice.id}
                      statLabels={episode.statLabels}
                    />
                  ))}

                  {resultText ? (
                    <div className="border-l-4 border-faded-gold bg-black/35 px-4 py-3 text-stone-200">
                      {resultText}
                    </div>
                  ) : null}

                  {selectedChoice ? (
                    <button
                      className="inline-flex min-h-12 items-center justify-center border border-old-gold/45 bg-umber px-5 py-3 text-parchment transition hover:border-faded-gold hover:bg-oxblood focus:outline-none focus:ring-2 focus:ring-faded-gold/70"
                      onClick={handleContinue}
                      type="button"
                    >
                      Tiếp tục
                    </button>
                  ) : null}
                </StoryScene>
              )}
            </div>

            <StatPanel labels={episode.statLabels} stats={stats} />
          </div>
        )}
      </div>

      <FactCard
        historicalNote={currentScene.historicalNote}
        isOpen={showFact}
        onClose={() => setShowFact(false)}
        sceneTitle={currentScene.title}
      />
    </main>
  );
}
