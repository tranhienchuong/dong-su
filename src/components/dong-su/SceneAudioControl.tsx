"use client";

import { useEffect, useRef, useState } from "react";
import {
  getTrackForChapter,
  type SceneAudioTrackList,
} from "@/data/dong-su/audio-tracks";

type SceneAudioControlProps = {
  currentChapter: number;
  isActive: boolean;
  tracks: SceneAudioTrackList;
};

const audioEnabledStorageKey = "dong-su-audio-enabled";

export function SceneAudioControl({
  currentChapter,
  isActive,
  tracks,
}: SceneAudioControlProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const currentTrack =
    tracks.length > 0 ? getTrackForChapter(currentChapter, tracks) : null;

  useEffect(() => {
    setMounted(true);

    try {
      if (window.localStorage.getItem(audioEnabledStorageKey) === "true") {
        setEnabled(true);
      }
    } catch {
      setEnabled(false);
    }
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    try {
      window.localStorage.setItem(audioEnabledStorageKey, String(enabled));
    } catch {
      // Ignore storage failures; audio control should still work in-memory.
    }
  }, [enabled, mounted]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !mounted) {
      return;
    }

    if (!currentTrack) {
      audio.pause();
      setCurrentTrackId(null);
      return;
    }

    if (!isActive) {
      audio.pause();
      return;
    }

    if (currentTrackId !== currentTrack.id) {
      audio.pause();
      audio.src = currentTrack.src;
      setCurrentTrackId(currentTrack.id);
    }

    if (!enabled) {
      audio.pause();
      return;
    }

    audio.volume = 0.25;
    void audio.play().catch(() => {
      audio.pause();
      setEnabled(false);
    });
  }, [
    currentTrack,
    currentTrackId,
    enabled,
    isActive,
    mounted,
  ]);

  const handleToggleAudio = () => {
    setEnabled((currentEnabled) => !currentEnabled);
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} loop preload="none" />
      <button
        aria-label={enabled ? "Tắt âm thanh nền" : "Bật âm thanh nền"}
        aria-pressed={enabled}
        className="fixed bottom-3 right-3 z-40 inline-flex min-h-10 max-w-[calc(100vw-1.5rem)] items-center justify-center rounded-sm border border-old-gold/45 bg-black/60 px-3 py-2 text-xs font-medium text-faded-gold shadow-ember backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-faded-gold hover:bg-umber focus:outline-none focus-visible:ring-2 focus-visible:ring-faded-gold/80 sm:px-4 sm:text-sm"
        onClick={handleToggleAudio}
        type="button"
      >
        {enabled ? `Âm thanh: ${currentTrack.label}` : "Âm thanh: Tắt"}
      </button>
    </>
  );
}
