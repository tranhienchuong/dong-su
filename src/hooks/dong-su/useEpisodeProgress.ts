"use client";

import { useEffect, useMemo, useState } from "react";
import { applyStatChanges, getEpisodeOutcome } from "@/lib/dong-su/game";
import {
  formatSavedAt,
  parseSavedProgress,
  SAVE_VERSION,
  type SavedProgress,
} from "@/lib/dong-su/progress";
import type {
  Character,
  Episode,
  MemoryFlag,
  Relic,
  Stats,
  StoryChoice,
} from "@/types/dong-su";

type UseEpisodeProgressOptions = {
  episode: Episode;
  saveKey: string;
};

export function useEpisodeProgress({
  episode,
  saveKey,
}: UseEpisodeProgressOptions) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [stats, setStats] = useState<Stats>({ ...episode.initialStats });
  const [memory, setMemory] = useState<MemoryFlag[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<StoryChoice | null>(
    null,
  );
  const [resultText, setResultText] = useState<string | null>(null);
  const [isEnded, setIsEnded] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [saveLoaded, setSaveLoaded] = useState(false);
  const [savedProgress, setSavedProgress] = useState<SavedProgress | null>(
    null,
  );

  const currentScene = episode.scenes[currentSceneIndex] ?? episode.scenes[0];
  const backdropImage = hasStarted
    ? currentScene.backgroundImage
    : episode.mapImage;
  const outcome = useMemo(
    () => getEpisodeOutcome(episode, stats, memory),
    [episode, memory, stats],
  );
  const currentCharacters = useMemo<Character[]>(
    () =>
      currentScene.characterIds
        .map((characterId) =>
          episode.characters.find((character) => character.id === characterId),
        )
        .filter((character): character is Character => Boolean(character)),
    [currentScene.characterIds, episode.characters],
  );
  const currentRelics = useMemo<Relic[]>(
    () =>
      currentScene.itemIds
        .map((itemId) => episode.relics.find((relic) => relic.id === itemId))
        .filter((relic): relic is Relic => Boolean(relic)),
    [currentScene.itemIds, episode.relics],
  );
  const savedAtLabel = useMemo(
    () => (savedProgress ? formatSavedAt(savedProgress.savedAt) : null),
    [savedProgress],
  );

  useEffect(() => {
    setHasMounted(true);

    try {
      const parsed = parseSavedProgress(
        window.localStorage.getItem(saveKey),
        episode,
      );
      setSavedProgress(parsed);
    } catch {
      setSavedProgress(null);
    } finally {
      setSaveLoaded(true);
    }
  }, [episode, saveKey]);

  useEffect(() => {
    if (!hasMounted || !saveLoaded) {
      return;
    }

    if (!hasStarted && !isEnded) {
      return;
    }

    const progress: SavedProgress = {
      version: SAVE_VERSION,
      currentSceneIndex,
      stats,
      selectedChoiceId: selectedChoice?.id ?? null,
      resultText,
      memory,
      isEnded,
      hasStarted,
      savedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(saveKey, JSON.stringify(progress));
      setSavedProgress(progress);
    } catch {
      // Keep the story playable if localStorage is unavailable.
    }
  }, [
    currentSceneIndex,
    hasMounted,
    hasStarted,
    isEnded,
    memory,
    resultText,
    saveKey,
    saveLoaded,
    selectedChoice,
    stats,
  ]);

  const clearSavedProgress = () => {
    try {
      window.localStorage.removeItem(saveKey);
    } catch {
      // Ignore localStorage failures; clearing UI state is still useful.
    }

    setSavedProgress(null);
  };

  const handleContinueSavedProgress = () => {
    if (!savedProgress) {
      return;
    }

    const savedScene =
      episode.scenes[savedProgress.currentSceneIndex] ?? episode.scenes[0];
    const restoredChoice = savedProgress.selectedChoiceId
      ? (savedScene.choices.find(
          (choice) => choice.id === savedProgress.selectedChoiceId,
        ) ?? null)
      : null;

    setCurrentSceneIndex(savedProgress.currentSceneIndex);
    setStats({ ...savedProgress.stats });
    setMemory([...savedProgress.memory]);
    setSelectedChoice(restoredChoice);
    setResultText(savedProgress.resultText);
    setIsEnded(savedProgress.isEnded);
    setHasStarted(savedProgress.hasStarted);
    setShowFact(false);
  };

  const handleStart = () => {
    setHasStarted(true);
    setShowFact(false);
  };

  const handleChoose = (choice: StoryChoice) => {
    if (selectedChoice) {
      return;
    }

    setStats((currentStats) => applyStatChanges(currentStats, choice));
    setMemory((currentMemory) => [
      ...currentMemory,
      ...(choice.memory ?? []),
    ]);
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
    clearSavedProgress();
    setCurrentSceneIndex(0);
    setStats({ ...episode.initialStats });
    setMemory([]);
    setSelectedChoice(null);
    setResultText(null);
    setIsEnded(false);
    setShowFact(false);
    setHasStarted(false);
  };

  return {
    backdropImage,
    clearSavedProgress,
    currentCharacters,
    currentRelics,
    currentScene,
    currentSceneIndex,
    ending: outcome.ending,
    endingKey: outcome.endingKey,
    handleChoose,
    handleContinue,
    handleContinueSavedProgress,
    handleRestart,
    handleStart,
    hasMounted,
    hasStarted,
    isEnded,
    memory,
    outcome,
    persona: outcome.persona,
    personaKey: outcome.personaKey,
    resultText,
    savedAtLabel,
    savedProgress,
    saveLoaded,
    selectedChoice,
    setShowFact,
    showFact,
    stats,
  };
}
