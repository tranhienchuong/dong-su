export type SceneAudioTrack = {
  id: string;
  label: string;
  range: readonly [number, number];
  src: string;
};

export type SceneAudioTrackList = readonly SceneAudioTrack[];

const zhuYuanzhangAudioBasePath = "/audio/dong-su";

export const zhuYuanzhangAudioTracks = [
  {
    id: "field",
    label: "GiÃ³ Ä‘á»“ng",
    range: [1, 4],
    src: `${zhuYuanzhangAudioBasePath}/scene-01-04-field-wind-sad.mp3`,
  },
  {
    id: "temple",
    label: "ChÃ¹a cá»•",
    range: [5, 8],
    src: `${zhuYuanzhangAudioBasePath}/scene-05-08-temple-bell-ambient.mp3`,
  },
  {
    id: "camp",
    label: "Doanh tráº¡i",
    range: [9, 12],
    src: `${zhuYuanzhangAudioBasePath}/scene-09-12-rebel-camp-fire-drums.mp3`,
  },
  {
    id: "battle",
    label: "Trá»‘ng tráº­n",
    range: [13, 16],
    src: `${zhuYuanzhangAudioBasePath}/scene-13-16-battle-drum-heroic.mp3`,
  },
] as const satisfies SceneAudioTrackList;

export function getTrackForChapter(
  chapter: number,
  tracks: SceneAudioTrackList,
): SceneAudioTrack | null {
  return (
    tracks.find(
      (track) => chapter >= track.range[0] && chapter <= track.range[1],
    ) ??
    tracks[0] ??
    null
  );
}
