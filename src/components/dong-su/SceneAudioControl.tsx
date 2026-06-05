"use client";

import { useEffect, useRef, useState } from "react";

type SceneAudioControlProps = {
  currentChapter: number;
  isActive: boolean;
};

const audioTracks = [
  {
    id: "field",
    label: "Gió đồng",
    range: [1, 4],
    src: "/audio/dong%20su/scene-01-04-field-wind-sad.mp3",
  },
  {
    id: "temple",
    label: "Chùa cổ",
    range: [5, 8],
    src: "/audio/dong%20su/scene-05-08-temple-bell-ambient.mp3",
  },
  {
    id: "camp",
    label: "Doanh trại",
    range: [9, 12],
    src: "/audio/dong%20su/scene-09-12-rebel-camp-fire-drums.mp3",
  },
  {
    id: "battle",
    label: "Trống trận",
    range: [13, 16],
    src: "/audio/dong%20su/scene-13-16-battle-drum-heroic.mp3",
  },
] as const;

const audioEnabledStorageKey = "dong-su-audio-enabled";

function getTrackForChapter(chapter: number) {
  return (
    audioTracks.find(
      (track) => chapter >= track.range[0] && chapter <= track.range[1],
    ) ?? audioTracks[0]
  );
}

export function SceneAudioControl({
  currentChapter,
  isActive,
}: SceneAudioControlProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const currentTrack = getTrackForChapter(currentChapter);

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

    if (!enabled || !isActive) {
      audio.pause();
      return;
    }

    if (currentTrackId !== currentTrack.id) {
      audio.pause();
      audio.src = currentTrack.src;
      setCurrentTrackId(currentTrack.id);
    }

    audio.volume = 0.25;
    void audio.play().catch(() => {
      audio.pause();
      setEnabled(false);
    });
  }, [
    currentTrack.id,
    currentTrack.src,
    currentTrackId,
    enabled,
    isActive,
    mounted,
  ]);

  const handleToggleAudio = () => {
    setEnabled((currentEnabled) => !currentEnabled);
  };

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
