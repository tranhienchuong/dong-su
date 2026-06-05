export type SceneAudioTrack = {
  id: string;
  label: string;
  range: readonly [number, number];
  src: string;
};

export type SceneAudioTrackList = readonly [
  SceneAudioTrack,
  ...SceneAudioTrack[],
];

const zhuYuanzhangEpisodeOneAudioBasePath = "/audio/dong%20su";

export const zhuYuanzhangEpisodeOneAudioTracks = [
  {
    id: "field",
    label: "Gió đồng",
    range: [1, 4],
    src: `${zhuYuanzhangEpisodeOneAudioBasePath}/scene-01-04-field-wind-sad.mp3`,
  },
  {
    id: "temple",
    label: "Chùa cổ",
    range: [5, 8],
    src: `${zhuYuanzhangEpisodeOneAudioBasePath}/scene-05-08-temple-bell-ambient.mp3`,
  },
  {
    id: "camp",
    label: "Doanh trại",
    range: [9, 12],
    src: `${zhuYuanzhangEpisodeOneAudioBasePath}/scene-09-12-rebel-camp-fire-drums.mp3`,
  },
  {
    id: "battle",
    label: "Trống trận",
    range: [13, 16],
    src: `${zhuYuanzhangEpisodeOneAudioBasePath}/scene-13-16-battle-drum-heroic.mp3`,
  },
] as const satisfies SceneAudioTrackList;

export function getTrackForChapter(
  chapter: number,
  tracks: SceneAudioTrackList,
) {
  return (
    tracks.find(
      (track) => chapter >= track.range[0] && chapter <= track.range[1],
    ) ?? tracks[0]
  );
}
