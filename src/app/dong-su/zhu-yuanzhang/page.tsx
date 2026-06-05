"use client";

import Link from "next/link";
import { ChoiceButton } from "@/components/dong-su/ChoiceButton";
import { DongSuShell } from "@/components/dong-su/DongSuShell";
import { FactCard } from "@/components/dong-su/FactCard";
import { SceneAudioControl } from "@/components/dong-su/SceneAudioControl";
import { StatPanel } from "@/components/dong-su/StatPanel";
import { StoryScene } from "@/components/dong-su/StoryScene";
import { zhuYuanzhangEpisodeOneAudioTracks } from "@/data/dong-su/audio";
import { useEpisodeProgress } from "@/hooks/dong-su/useEpisodeProgress";
import { zhuYuanzhangEpisodeOne } from "@/data/dong-su/zhu-yuanzhang-episode-1";

const episode = zhuYuanzhangEpisodeOne;
const SAVE_KEY = "dong-su:zhu-yuanzhang:episode-1:progress";

export default function ZhuYuanzhangEpisodePage() {
  const {
    clearSavedProgress,
    currentCharacters,
    currentRelics,
    currentScene,
    ending,
    handleChoose,
    handleContinue,
    handleContinueSavedProgress,
    handleRestart,
    handleStart,
    hasMounted,
    hasStarted,
    isEnded,
    resultText,
    savedAtLabel,
    savedProgress,
    saveLoaded,
    selectedChoice,
    setShowFact,
    showFact,
    stats,
  } = useEpisodeProgress({ episode, saveKey: SAVE_KEY });
  const backdropImage = hasStarted
    ? currentScene.backgroundImage
    : episode.mapImage;

  return (
    <DongSuShell
      backgroundGradient="linear-gradient(180deg, rgba(9,6,4,0.35), rgba(9,6,4,0.96))"
      backgroundImage={backdropImage}
      showHorizontalShade
    >
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-5 rounded-md border border-old-gold/20 bg-black/25 px-4 py-4 backdrop-blur-sm sm:px-5">
          <p className="text-xs uppercase tracking-[0.22em] text-old-gold">
            Dòng Sử
          </p>
          <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h1 className="dong-su-text-shadow font-serif text-3xl leading-tight text-faded-gold sm:text-5xl">
                {episode.title}
              </h1>
              <p className="mt-2 text-lg text-old-gold">{episode.subtitle}</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
                {episode.framing}
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-old-gold/35 bg-black/35 px-4 py-2 text-faded-gold transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-umber focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
                href="/dong-su/zhu-yuanzhang/archive"
              >
                Kho tư liệu
              </Link>
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-old-gold/45 bg-black/35 px-4 py-2 text-faded-gold transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-umber focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
                onClick={handleRestart}
                type="button"
              >
                Chơi lại
              </button>
            </div>
          </div>
        </header>

        {!hasStarted ? (
          <section className="dong-su-panel dong-su-fade-in grid flex-1 overflow-hidden rounded-md lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
            <div className="relative min-h-[22rem] overflow-hidden lg:min-h-[34rem]">
              <img
                alt="Bản đồ hành trình đầu đời của Chu Nguyên Chương"
                className="absolute inset-0 size-full scale-110 object-cover object-[30%_center]"
                src={episode.mapImage}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/35 to-black/95" />
              <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-r from-transparent via-black/70 to-black" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-0 dong-su-vignette" />
              <div className="absolute inset-0 dong-su-dust" />
            </div>

            <div className="relative z-10 flex flex-col justify-center border-t border-old-gold/20 bg-black/80 p-5 shadow-[inset_24px_0_60px_rgba(0,0,0,0.45)] sm:p-8 lg:border-l lg:border-t-0 lg:bg-charcoal/95">
              <p className="text-sm uppercase tracking-[0.22em] text-old-gold">
                Bản đồ đầu tập
              </p>
              <h2 className="dong-su-text-shadow mt-3 font-serif text-3xl leading-tight text-faded-gold sm:text-5xl">
                {episode.subtitle}
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-stone-300">
                {episode.description}
              </p>
              <p className="mt-4 max-w-2xl leading-8 text-stone-300">
                Theo dấu Chu Trùng Bát từ ruộng nghèo, cửa chùa, đường phiêu
                bạt đến doanh trại Hồng Cân. Mỗi lựa chọn sẽ bồi đắp năm chỉ số
                của tập này.
              </p>
              <button
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-sm border border-old-gold/45 bg-umber px-5 py-3 text-parchment transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-oxblood focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80 sm:w-auto"
                onClick={handleStart}
                type="button"
              >
                Bắt đầu
              </button>
              {hasMounted && saveLoaded && savedProgress ? (
                <div className="mt-5 rounded-sm border border-old-gold/30 bg-black/35 p-4">
                  <p className="text-sm font-medium text-old-gold">
                    Tiến trình đã lưu
                  </p>
                  <p className="mt-1 text-sm leading-6 text-stone-300">
                    Bạn đang ở cảnh {savedProgress.currentSceneIndex + 1}/
                    {episode.scenes.length}.
                  </p>
                  {savedAtLabel ? (
                    <p className="mt-1 text-xs leading-5 text-stone-400">
                      Lưu lúc {savedAtLabel}
                    </p>
                  ) : null}
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                      className="inline-flex min-h-11 items-center justify-center rounded-sm border border-old-gold/45 bg-umber px-4 py-2 text-parchment transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-oxblood focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
                      onClick={handleContinueSavedProgress}
                      type="button"
                    >
                      Tiếp tục hành trình
                    </button>
                    <button
                      className="inline-flex min-h-11 items-center justify-center rounded-sm border border-old-gold/35 bg-black/35 px-4 py-2 text-faded-gold transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-umber focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
                      onClick={clearSavedProgress}
                      type="button"
                    >
                      Xóa tiến trình
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : (
          <div className="grid flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div>
              {isEnded ? (
                <section className="dong-su-panel dong-su-fade-in rounded-md p-6 sm:p-8">
                  {resultText ? (
                    <div className="mb-6 rounded-sm border-l-4 border-faded-gold bg-black/35 px-4 py-3 text-stone-200">
                      {resultText}
                    </div>
                  ) : null}

                  <p className="text-sm uppercase tracking-[0.22em] text-old-gold">
                    Kết cục tập 1
                  </p>
                  <div className="mt-5 border-l-4 border-old-gold/55 bg-black/25 px-4 py-4 font-serif text-2xl leading-9 text-parchment sm:text-3xl sm:leading-10">
                    <p>Chu Trùng Bát đã chết.</p>
                    <p className="mt-2 text-faded-gold">
                      Từ hôm nay, ta là Chu Nguyên Chương.
                    </p>
                  </div>
                  <h2 className="dong-su-text-shadow mt-7 font-serif text-4xl leading-tight text-faded-gold sm:text-6xl">
                    {ending.title}
                  </h2>
                  <p className="mt-5 max-w-3xl font-serif text-xl leading-9 text-parchment">
                    {ending.body}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      className="inline-flex min-h-11 items-center justify-center rounded-sm border border-old-gold/45 bg-umber px-4 py-2 text-parchment transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-oxblood focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
                      onClick={handleRestart}
                      type="button"
                    >
                      Chơi lại từ đầu
                    </button>
                    {currentScene.historicalNote ? (
                      <button
                        className="inline-flex min-h-11 items-center justify-center rounded-sm border border-old-gold/35 bg-black/35 px-4 py-2 text-faded-gold transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-umber focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
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
                    <div className="dong-su-fade-in rounded-sm border-l-4 border-faded-gold bg-black/35 px-4 py-3 text-stone-200">
                      {resultText}
                    </div>
                  ) : null}

                  {selectedChoice ? (
                    <button
                      className="dong-su-fade-in inline-flex min-h-12 items-center justify-center rounded-sm border border-old-gold/45 bg-umber px-5 py-3 text-parchment transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-oxblood focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80"
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
      <SceneAudioControl
        currentChapter={currentScene.chapter}
        isActive={hasStarted}
        tracks={zhuYuanzhangEpisodeOneAudioTracks}
      />
    </DongSuShell>
  );
}
