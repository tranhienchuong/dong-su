export type StatKey = "danTam" | "nghiaKhi" | "quanUy" | "nhanTinh" | "daTam";

export type Stats = Record<StatKey, number>;

export type Character = {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
};

export type Relic = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export type Item = Relic;

export type StoryChoice = {
  id: string;
  label: string;
  description: string;
  effects: Partial<Stats>;
  resultText: string;
  nextSceneId: string | null;
  endingId?: EpisodeEnding["id"];
};

export type FactCardData = {
  title: string;
  body: string;
};

export type ImageTone = "ash" | "dust" | "embers" | "lamp" | "rain";

export type StorySceneData = {
  id: string;
  chapter: number;
  title: string;
  subtitle: string;
  year: string;
  location: string;
  imageTone: ImageTone;
  backgroundImage: string;
  characterIds: string[];
  itemIds: string[];
  text: string[];
  choices: StoryChoice[];
  historicalNote?: FactCardData;
};

export type EpisodeResult = {
  stat: StatKey;
  title: string;
  body: string;
};

export type EpisodeEnding = {
  id: "balanced" | "humane" | "ambitious";
  title: string;
  body: string;
};

export type Episode = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  character: string;
  framing: string;
  mapImage: string;
  initialStats: Stats;
  statLabels: Record<StatKey, string>;
  characters: Character[];
  relics: Relic[];
  scenes: StorySceneData[];
  endings: EpisodeEnding[];
};
