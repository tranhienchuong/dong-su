# Thiên Mệnh Engine — Blueprint

## Nguyên tắc thiết kế

```
Core game luôn deterministic.

Choice
→ Stats
→ Memory
→ Persona
→ Ending type
→ UI hiển thị kết quả
```

AI chỉ được dùng ở tầng diễn giải:

```
endingKey + persona + stats + memory
→ AI viết đoạn tổng kết / giải thích
```

AI **không được quyết định**:

```
nextSceneId
stats
choice effects
memory flags chính thức
persona chính thức
ending chính thức
```

---

# Kiến trúc hiện tại cần tôn trọng

## Type chung

```
src/types/dong-su.ts
```

Đây là nơi đặt:

```
StatKey
Stats
Character
Relic
StoryChoice
FactCardData
ImageTone
StorySceneData
EpisodeEnding
Episode
```

Không thêm type engine vào `src/data/dong-su/episodes.ts`.

---

## Game logic

```
src/lib/dong-su/game.ts
```

Hiện file này đang chứa:

```
statOrder
applyStatChanges
getHighestStat
getEndingForStats
```

Phase 12 sẽ mở rộng file này thành nơi chứa **Thiên Mệnh Engine deterministic**.

---

## Progress / localStorage

```
src/lib/dong-su/progress.ts
```

Hiện file này chứa `SavedProgress`, `SAVE_VERSION`, validate save, parse save, format thời gian lưu. Save progress hiện đang là một object thống nhất, không nên tách memory ra key riêng.

---

## Hook điều khiển game

```
src/hooks/dong-su/useEpisodeProgress.ts
src/hooks/useEpisodeProgress.ts
```

Hook hiện quản lý:

```
currentSceneIndex
stats
selectedChoice
resultText
isEnded
showFact
hasStarted
save/restore
currentScene
currentCharacters
currentRelics
ending
backdropImage
```

Nó xử lý chọn choice, chuyển scene, ending, save/restore localStorage.

---

# Phase 12A — Deterministic Outcome Engine

## Mục tiêu

Thay ending kiểu highest-stat bằng hệ thống:

```
Stats
→ Weighted ending score
→ Persona
→ Episode outcome
```

Chưa thêm memory, chưa thêm AI.

## Type cần thêm vào `src/types/dong-su.ts`

```ts
export type PersonaKey =
  | "iron-ruler"
  | "people-hearted"
  | "brotherhood-leader"
  | "balanced-founder"
  | "survivor";

export type PersonaProfile = {
  key: PersonaKey;
  label: string;
  description: string;
};
```

Không thêm `EndingKey = "brotherhood"` ở Phase 12A.

Lý do: hiện `EpisodeEnding["id"]` mới có:

```
"balanced" | "humane" | "ambitious"
```

Nếu thêm `brotherhood` ngay, phải sửa data ending. Phase 12A chỉ nên dùng 3 ending hiện có.

Nếu cần type ending key:

```ts
export type EndingKey = EpisodeEnding["id"];
```

---

## Thêm persona profiles

Có thể đặt trong:

```
src/lib/dong-su/game.ts
```

hoặc tách riêng:

```
src/data/dong-su/personas.ts
```

Đề xuất đơn giản trước:

```ts
export const personaProfiles: Record<PersonaKey, PersonaProfile> = {
  "iron-ruler": {
    key: "iron-ruler",
    label: "Đế vương sắt lạnh",
    description:
      "Ngươi học cách đặt quân lệnh và quyền lực lên trên tình riêng.",
  },
  "people-hearted": {
    key: "people-hearted",
    label: "Người giữ dân tâm",
    description:
      "Giữa thời loạn, ngươi vẫn nhìn thấy dân đói trước khi nhìn thấy ngai vàng.",
  },
  "brotherhood-leader": {
    key: "brotherhood-leader",
    label: "Đại ca thời loạn",
    description:
      "Ngươi sống bằng nghĩa khí, và khiến người khác muốn đứng cùng mình.",
  },
  "balanced-founder": {
    key: "balanced-founder",
    label: "Người lập nghiệp giữa máu và cơm",
    description:
      "Ngươi không hoàn toàn mềm yếu, cũng chưa hoàn toàn sắt đá.",
  },
  survivor: {
    key: "survivor",
    label: "Kẻ sống sót",
    description:
      "Trước khi nói đến thiên hạ, ngươi đã học cách không chết đói.",
  },
};
```

---

## Thêm `getPlayerPersona`

File:

```
src/lib/dong-su/game.ts
```

```ts
export function getPlayerPersona(stats: Stats): PersonaKey {
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
```

---

## Thêm weighted ending score

Vẫn dùng 3 ending hiện có:

```ts
type EndingKey = EpisodeEnding["id"];
```

```ts
function balanceScore(stats: Stats): number {
  const values = statOrder.map((stat) => stats[stat]);
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;

  const variance =
    values.reduce((sum, value) => sum + Math.abs(value - average), 0) /
    values.length;

  return average * 0.8 - variance * 0.5;
}

export function getWeightedEndingKey(stats: Stats): EndingKey {
  const scores: Record<EndingKey, number> = {
    humane:
      stats.danTam * 1.4 +
      stats.nhanTinh * 1.3 +
      stats.nghiaKhi * 0.35 -
      stats.daTam * 0.35,

    ambitious:
      stats.daTam * 1.5 +
      stats.quanUy * 1.2 +
      stats.nghiaKhi * 0.25 -
      stats.nhanTinh * 0.25,

    balanced: balanceScore(stats),
  };

  return Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0] as EndingKey;
}
```

---

## Thêm `EpisodeOutcome`

Trong `src/types/dong-su.ts`:

```ts
export type EpisodeOutcome = {
  endingKey: EpisodeEnding["id"];
  ending: EpisodeEnding;
  personaKey: PersonaKey;
  persona: PersonaProfile;
  scores: Record<EpisodeEnding["id"], number>;
};
```

Hoặc nếu không muốn expose `scores`, có thể bỏ `scores`. Nhưng giữ `scores` hữu ích để debug/playtest.

---

## Thêm `getEpisodeOutcome`

File:

```
src/lib/dong-su/game.ts
```

```ts
export function getEpisodeOutcome(
  episode: Episode,
  stats: Stats,
): EpisodeOutcome {
  const endingKey = getWeightedEndingKey(stats);
  const ending =
    episode.endings.find((item) => item.id === endingKey) ?? episode.endings[0];

  const personaKey = getPlayerPersona(stats);
  const persona = personaProfiles[personaKey];

  return {
    endingKey,
    ending,
    personaKey,
    persona,
    scores: getEndingScores(stats),
  };
}
```

Nếu dùng `getEndingScores`, tách score ra function riêng:

```ts
export function getEndingScores(
  stats: Stats,
): Record<EpisodeEnding["id"], number> {
  return {
    humane:
      stats.danTam * 1.4 +
      stats.nhanTinh * 1.3 +
      stats.nghiaKhi * 0.35 -
      stats.daTam * 0.35,

    ambitious:
      stats.daTam * 1.5 +
      stats.quanUy * 1.2 +
      stats.nghiaKhi * 0.25 -
      stats.nhanTinh * 0.25,

    balanced: balanceScore(stats),
  };
}
```

---

## Cập nhật hook

File:

```
src/hooks/dong-su/useEpisodeProgress.ts
```

Thay:

```ts
const ending = useMemo(
  () => getEndingForStats(episode, stats),
  [episode, stats],
);
```

bằng:

```ts
const outcome = useMemo(
  () => getEpisodeOutcome(episode, stats),
  [episode, stats],
);
```

Hook return thêm:

```
outcome
ending: outcome.ending
endingKey: outcome.endingKey
persona: outcome.persona
personaKey: outcome.personaKey
```

Giữ `ending` để page ít phải sửa.

---

## Cập nhật ending UI

File:

```
src/app/dong-su/zhu-yuanzhang/page.tsx
```

Lấy thêm từ hook:

```
persona,
personaKey,
endingKey,
```

Trong ending screen, dưới câu:

```
Chu Trùng Bát đã chết.
Từ hôm nay, ta là Chu Nguyên Chương.
```

thêm persona badge:

```tsx
<div className="mt-6 rounded-sm border border-old-gold/35 bg-black/35 p-4">
  <p className="text-xs uppercase tracking-[0.22em] text-old-gold">
    Chân dung của ngươi
  </p>
  <p className="mt-2 font-serif text-2xl text-faded-gold">
    {persona.label}
  </p>
  <p className="mt-2 leading-7 text-stone-300">
    {persona.description}
  </p>
</div>
```

---

## Checklist Phase 12A

```
[ ] Thêm PersonaKey / PersonaProfile / EpisodeOutcome vào src/types/dong-su.ts
[ ] Thêm personaProfiles
[ ] Thêm getPlayerPersona
[ ] Thêm getEndingScores
[ ] Thêm getWeightedEndingKey
[ ] Thêm getEpisodeOutcome
[ ] Hook dùng getEpisodeOutcome
[ ] Hook return persona/personaKey/endingKey/outcome
[ ] Ending UI hiển thị persona badge
[ ] Không thêm memory
[ ] Không thêm AI
[ ] Build pass
[ ] Lint pass
```

---

# Phase 12B — Memory Flags

## Mục tiêu

Mỗi choice để lại dấu vết hành động, không chỉ cộng điểm.

Ví dụ:

```
shared_food
protected_weak
chose_power
used_fear
protected_brothers
```

Memory dùng để:

```
tiebreak persona
weighted ending chính xác hơn
AI ending narrative có input sâu hơn
```

---

## Type cần thêm vào `src/types/dong-su.ts`

```ts
export type MemoryFlag =
  | "shared_food"
  | "protected_weak"
  | "chose_power"
  | "protected_brothers"
  | "defied_authority"
  | "showed_mercy"
  | "chose_discipline"
  | "led_by_example"
  | "used_fear"
  | "accepted_humiliation"
  | "remembered_hunger"
  | "chose_survival"
  | "protected_dignity"
  | "took_responsibility";
```

Mở rộng `StoryChoice`:

```ts
export type StoryChoice = {
  id: string;
  label: string;
  description: string;
  effects: Partial<Stats>;
  resultText: string;
  nextSceneId: string | null;
  endingId?: EpisodeEnding["id"];
  memory?: MemoryFlag[];
};
```

---

## Mở rộng progress save

File:

```
src/lib/dong-su/progress.ts
```

Thêm vào `SavedProgress`:

```ts
memory: MemoryFlag[];
```

Khi parse save:

* nếu save cũ chưa có memory → fallback `[]`
* không làm hỏng save version 1 nếu muốn nhẹ nhàng

Khuyến nghị tăng version:

```
export const SAVE_VERSION = 2;
```

Nhưng nếu tăng version, save cũ sẽ bị bỏ qua. Với MVP thì chấp nhận được.

Nếu muốn migrate mềm:

```ts
const memory = Array.isArray(parsed.memory) ? parsed.memory : [];
```

---

## Hook accumulate memory

File:

```
src/hooks/dong-su/useEpisodeProgress.ts
```

Thêm state:

```ts
const [memory, setMemory] = useState<MemoryFlag[]>([]);
```

Trong `handleChoose`:

```ts
setMemory((currentMemory) => [
  ...currentMemory,
  ...(choice.memory ?? []),
]);
```

Khi save progress:

```
memory,
```

Khi restore:

```ts
setMemory([...savedProgress.memory]);
```

Khi restart:

```ts
setMemory([]);
```

Hook return thêm:

```
memory
```

---

## Cập nhật outcome dùng memory

Sửa signature:

```ts
export function getPlayerPersona(
  stats: Stats,
  memory: MemoryFlag[] = [],
): PersonaKey
```

```ts
export function getEndingScores(
  stats: Stats,
  memory: MemoryFlag[] = [],
): Record<EpisodeEnding["id"], number>
```

```ts
export function getEpisodeOutcome(
  episode: Episode,
  stats: Stats,
  memory: MemoryFlag[] = [],
): EpisodeOutcome
```

Trong hook:

```ts
const outcome = useMemo(
  () => getEpisodeOutcome(episode, stats, memory),
  [episode, stats, memory],
);
```

---

## Memory helper

File:

```
src/lib/dong-su/game.ts
```

```ts
export function countMemory(memory: MemoryFlag[], flag: MemoryFlag): number {
  return memory.filter((item) => item === flag).length;
}
```

Dùng trong score:

```ts
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
  balanceScore(stats) +
  countMemory(memory, "took_responsibility") * 0.8,
```

---

## Gán memory vào data

File:

```
src/data/dong-su/zhu-yuanzhang-episode-1.ts
```

Mỗi choice nên có 1–2 memory flags, không cần quá nhiều.

Ví dụ:

```ts
{
  id: "promise-feed-brothers",
  label: "Hứa sẽ cho huynh đệ ăn no",
  effects: { nghiaKhi: 2, daTam: 1 },
  memory: ["protected_brothers", "remembered_hunger"],
  resultText: "...",
  nextSceneId: "landlord-calf",
}
```

---

## Checklist Phase 12B

```
[ ] Thêm MemoryFlag type
[ ] Thêm memory?: MemoryFlag[] vào StoryChoice
[ ] SavedProgress thêm memory
[ ] parseSavedProgress validate/fallback memory
[ ] Hook có memory state
[ ] handleChoose accumulate memory
[ ] save/restore/restart xử lý memory
[ ] getEpisodeOutcome nhận memory
[ ] getPlayerPersona dùng memory làm tiebreak
[ ] getEndingScores dùng memory
[ ] Data 16 scene được gán memory hợp lý
[ ] Build pass
[ ] Lint pass
[ ] Reload sau khi chọn choice vẫn restore memory
```

---

# Phase 12C — AI Ending Narrative

## Mục tiêu

Sau khi deterministic engine tính xong:

```
stats
memory
personaKey
endingKey
```

AI viết một đoạn tổng kết cá nhân hóa.

AI không quyết định ending. AI chỉ viết diễn giải.

---

## Không gửi raw prompt từ client

Không làm:

```ts
fetch("/api/ai-ending", {
  body: JSON.stringify({ prompt })
});
```

Làm đúng:

```ts
fetch("/api/ai-ending", {
  method: "POST",
  body: JSON.stringify({
    episodeId,
    stats,
    memory,
    personaKey,
    endingKey,
  }),
});
```

Server tự build prompt.

---

## File mới

```
src/lib/dong-su/aiPrompts.ts
src/app/api/ai-ending/route.ts
src/components/dong-su/AIEndingNarrative.tsx
.env.example
```

---

## Prompt builder

File:

```
src/lib/dong-su/aiPrompts.ts
```

```ts
import type {
  EpisodeEnding,
  MemoryFlag,
  PersonaKey,
  Stats,
} from "@/types/dong-su";
import { personaProfiles } from "@/lib/dong-su/game";

type BuildEndingPromptInput = {
  stats: Stats;
  memory: MemoryFlag[];
  personaKey: PersonaKey;
  endingKey: EpisodeEnding["id"];
};

export function buildEndingPrompt({
  stats,
  memory,
  personaKey,
  endingKey,
}: BuildEndingPromptInput): string {
  const persona = personaProfiles[personaKey];
  const memorySummary = summarizeMemory(memory);

  return `Bạn là sử gia viết về một nhân vật thời loạn.
Giọng văn ngắn, nặng, điện ảnh. Không dùng sáo ngữ.

Nhân vật: Chu Nguyên Chương thời trẻ.
Tập: Từ Chu Trùng Bát đến Chu Nguyên Chương.

Hình tượng nhân vật: ${persona.label}
Kết cục deterministic: ${endingKey}

Chỉ số cuối:
- Dân tâm: ${stats.danTam}
- Nghĩa khí: ${stats.nghiaKhi}
- Quân uy: ${stats.quanUy}
- Nhân tính: ${stats.nhanTinh}
- Dã tâm: ${stats.daTam}

Dấu vết hành động:
${memorySummary}

Viết 3-4 câu theo góc nhìn sử gia.
Không nhắc đến "người chơi".
Không tiết lộ số điểm.
Không bịa thêm sự kiện ngoài hành trình trên.
Chỉ nhận xét về kiểu Chu Nguyên Chương đã được tạo ra.`;
}

function summarizeMemory(memory: MemoryFlag[]): string {
  if (memory.length === 0) {
    return "Không có dấu vết nổi bật.";
  }

  const counts = memory.reduce<Partial<Record<MemoryFlag, number>>>(
    (acc, flag) => {
      acc[flag] = (acc[flag] ?? 0) + 1;
      return acc;
    },
  );

  return Object.entries(counts)
    .map(([flag, count]) => `- ${flag}: ${count}`)
    .join("\n");
}
```

---

## API route

File:

```
src/app/api/ai-ending/route.ts
```

Yêu cầu:

* đọc structured input
* validate đơn giản
* build prompt server-side
* gọi AI provider bằng API key server env
* không lộ key ra client
* nếu fail, trả fallback sạch

Không hard-code API key.

```
ANTHROPIC_API_KEY=
```

hoặc nếu dùng provider khác thì đặt tên env tương ứng.

---

## Component AI ending

File:

```
src/components/dong-su/AIEndingNarrative.tsx
```

Props:

```ts
type AIEndingNarrativeProps = {
  episodeId: string;
  stats: Stats;
  memory: MemoryFlag[];
  personaKey: PersonaKey;
  endingKey: EpisodeEnding["id"];
};
```

Cache localStorage key:

```
const cacheKey = `dong-su:ai-ending:${episodeId}:${endingKey}:${personaKey}:${statsHash}:${memoryHash}`;
```

Yêu cầu:

* nếu có cache → dùng cache
* nếu chưa có → gọi API
* API fail → không crash, có thể không hiển thị gì
* reload không sinh narrative mới

---

## Tích hợp UI

Trong ending screen:

```tsx
<AIEndingNarrative
  episodeId={episode.id}
  stats={stats}
  memory={memory}
  personaKey={personaKey}
  endingKey={endingKey}
/>
```

Chỉ làm sau khi Phase 12B đã có memory.

---

## Checklist Phase 12C

```
[ ] Client không gửi raw prompt
[ ] Server build prompt
[ ] API key chỉ ở server env
[ ] AI output cache bằng localStorage
[ ] Cache key gồm episodeId + endingKey + personaKey + stats + memory
[ ] API fail không crash game
[ ] Build pass
[ ] Lint pass
```

---

# Phase 12D — AI Historical Note Q&A

## Mục tiêu

FactCard hiện có note tĩnh. Thêm khả năng hỏi thêm, nhưng AI chỉ trả lời dựa trên note hiện có.

---

## Input phải khớp `FactCardData`

Hiện `historicalNote` không phải string đơn, mà là:

```ts
type FactCardData = {
  title: string;
  body: string;
};
```

Vì vậy request body nên là:

```json
{
  "sceneTitle": "string",
  "noteTitle": "string",
  "noteBody": "string",
  "question": "string"
}
```

---

## API route

```
src/app/api/historical-note/route.ts
```

Prompt server-side:

```
Bạn là trợ lý lịch sử cho web Dòng Sử.

Cảnh: {sceneTitle}
Ghi chú: {noteTitle}
Nội dung ghi chú:
{noteBody}

Câu hỏi:
{question}

Trả lời 2-3 câu.
Chỉ dựa trên nội dung ghi chú.
Nếu ghi chú không có thông tin, trả lời:
"Ghi chú hiện tại chưa có thông tin này."
Không bịa, không mở rộng ngoài context.
```

---

## Cập nhật `FactCard.tsx`

Thêm:

* input câu hỏi
* button hỏi
* loading state
* answer state
* clear answer khi đổi scene/note

Không làm modal quá cao trên mobile.

---

## Checklist Phase 12D

```
[ ] API route nhận structured data
[ ] Server build prompt
[ ] FactCard có Q&A UI
[ ] Câu hỏi ngoài context trả lời không có thông tin
[ ] AI fail không crash FactCard
[ ] Build pass
[ ] Lint pass
```

---

# Phase 12E — Soft Result Variants

## Mục tiêu

Không khóa lựa chọn. Người chơi vẫn chọn được, nhưng kết quả khác nhau tùy stats/memory.

---

## Type thêm vào `src/types/dong-su.ts`

```ts
export type ChoiceCondition = {
  stat?: Partial<Record<StatKey, number>>;
  memoryIncludes?: MemoryFlag[];
};

export type ChoiceResultVariant = {
  condition: ChoiceCondition;
  resultText: string;
};

export type ChoiceSoftRequirement = {
  stat?: Partial<Record<StatKey, number>>;
  memoryIncludes?: MemoryFlag[];
  hintText: string;
};
```

Mở rộng `StoryChoice`:

```ts
resultVariants?: ChoiceResultVariant[];
softRequirement?: ChoiceSoftRequirement;
```

---

## Logic trong `src/lib/dong-su/game.ts`

```ts
export function meetsCondition(
  condition: ChoiceCondition,
  stats: Stats,
  memory: MemoryFlag[] = [],
): boolean {
  if (condition.stat) {
    for (const [stat, threshold] of Object.entries(condition.stat)) {
      if (stats[stat as StatKey] < threshold) {
        return false;
      }
    }
  }

  if (condition.memoryIncludes) {
    for (const flag of condition.memoryIncludes) {
      if (!memory.includes(flag)) {
        return false;
      }
    }
  }

  return true;
}

export function resolveChoiceResultText(
  choice: StoryChoice,
  stats: Stats,
  memory: MemoryFlag[] = [],
): string {
  const matchedVariant = choice.resultVariants?.find((variant) =>
    meetsCondition(variant.condition, stats, memory),
  );

  return matchedVariant?.resultText ?? choice.resultText;
}

export function getChoiceHint(
  choice: StoryChoice,
  stats: Stats,
  memory: MemoryFlag[] = [],
): string | null {
  if (!choice.softRequirement) {
    return null;
  }

  const { hintText, ...condition } = choice.softRequirement;

  return meetsCondition(condition, stats, memory) ? null : hintText;
}
```

---

## Hook dùng resolver

Trong `handleChoose`:

```ts
const resolvedResultText = resolveChoiceResultText(choice, stats, memory);
setResultText(resolvedResultText);
```

Lưu ý: phải dùng stats hiện tại trước khi cộng effect, hoặc sau khi cộng effect?
Khuyến nghị: dùng **stats trước khi chọn**, vì kết quả phản ánh uy tín/tính cách đã xây dựng trước đó.

---

## UI hint

`ChoiceButton` có thể nhận thêm:

```ts
hintText?: string | null;
```

Page render:

```tsx
<ChoiceButton
  ...
  hintText={getChoiceHint(choice, stats, memory)}
/>
```

Hoặc hook return helper:

```ts
getChoiceHintForChoice(choice)
```

---

## Checklist Phase 12E

```
[ ] Thêm ChoiceCondition / ChoiceResultVariant / ChoiceSoftRequirement
[ ] StoryChoice có resultVariants / softRequirement
[ ] game.ts có meetsCondition / resolveChoiceResultText / getChoiceHint
[ ] handleChoose dùng resolveChoiceResultText
[ ] ChoiceButton hiển thị hintText
[ ] Không khóa choice
[ ] Thêm resultVariants cho 4-6 choice quan trọng
[ ] Build pass
[ ] Lint pass
```

---

# Phase 12F — Pre-generated Scene Text Variants

## Mục tiêu

Một số scene quan trọng có text khác theo persona. Không gọi AI runtime ở bản đầu.

---

## Type mở rộng

Trong `StorySceneData`:

```ts
textVariants?: Partial<Record<PersonaKey, string[]>>;
```

Không dùng `content` hoặc `contentVariants`.

Vì code hiện tại đang dùng:

```
text: string[]
```

---

## Resolver

File:

```
src/lib/dong-su/game.ts
```

```ts
export function resolveSceneText(
  scene: StorySceneData,
  personaKey: PersonaKey,
): string[] {
  return scene.textVariants?.[personaKey] ?? scene.text;
}
```

---

## Tích hợp

Có 2 cách.

### Cách khuyến nghị

Trong hook tạo `displayScene`:

```ts
const displayScene = useMemo(
  () => ({
    ...currentScene,
    text: resolveSceneText(currentScene, outcome.personaKey),
  }),
  [currentScene, outcome.personaKey],
);
```

Hook return `displayScene` hoặc thay `currentScene` bằng scene đã resolve.

Ưu điểm: `StoryScene` không cần biết textVariants.

---

## Chỉ làm cho turning points

Không cần 16 scene × 5 persona ngay.

Chỉ làm trước:

```
Scene 1
Scene 8
Scene 13
Scene 16
```

Mỗi scene 2-3 persona quan trọng:

```
iron-ruler
people-hearted
brotherhood-leader
```

---

## Checklist Phase 12F

```
[ ] StorySceneData có textVariants
[ ] resolveSceneText
[ ] Hook tạo displayScene
[ ] StoryScene vẫn nhận scene.text như cũ
[ ] Thêm variant cho 4 scene quan trọng
[ ] Không runtime AI
[ ] Build pass
[ ] Lint pass
```

---

# Thứ tự triển khai chuẩn

```
Phase 12A
Weighted Ending + Persona
↓
Phase 12B
Memory Flags
↓
Phase 12C
AI Ending Narrative
↓
Phase 12D
AI Historical Q&A
↓
Phase 12E
Soft Result Variants
↓
Phase 12F
Pre-generated Scene Text Variants
```

Có thể đổi 12D và 12E:

```
Nếu muốn gameplay sâu hơn trước → làm 12E trước 12D
Nếu muốn AI demo sớm hơn → làm 12D trước 12E
```

Nhưng không nên làm 12C trước 12A/12B, vì AI ending cần input tốt.

---

# Những điều không được làm

```
Không đặt engine logic trong src/data/dong-su/episodes.ts
Không thêm brotherhood ending nếu chưa thêm data ending tương ứng
Không lưu memory bằng key localStorage riêng ds_memory
Không để client gửi raw prompt lên API
Không cho AI quyết định stats/persona/ending/nextSceneId
Không dùng runtime AI cho scene text ở bản đầu
Không khóa cứng choice ở 12E
```

---

# Files tác động theo phase

| Phase | Files chính |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 12A   | `src/types/dong-su.ts`, `src/lib/dong-su/game.ts`, `src/hooks/dong-su/useEpisodeProgress.ts`, `src/app/dong-su/zhu-yuanzhang/page.tsx` |
| 12B   | `src/types/dong-su.ts`, `src/lib/dong-su/progress.ts`, `src/lib/dong-su/game.ts`, `src/hooks/dong-su/useEpisodeProgress.ts`, `src/data/dong-su/zhu-yuanzhang-episode-1.ts`             |
| 12C   | `src/app/api/ai-ending/route.ts`, `src/lib/dong-su/aiPrompts.ts`, `src/components/dong-su/AIEndingNarrative.tsx`, `.env.example`                                                       |
| 12D   | `src/app/api/historical-note/route.ts`, `src/components/dong-su/FactCard.tsx`, `src/lib/dong-su/aiPrompts.ts`                                                                          |
| 12E   | `src/types/dong-su.ts`, `src/lib/dong-su/game.ts`, `src/hooks/dong-su/useEpisodeProgress.ts`, `src/components/dong-su/ChoiceButton.tsx`, `src/data/dong-su/zhu-yuanzhang-episode-1.ts` |
| 12F   | `src/types/dong-su.ts`, `src/lib/dong-su/game.ts`, `src/hooks/dong-su/useEpisodeProgress.ts`, `src/data/dong-su/zhu-yuanzhang-episode-1.ts`                                            |

---

# QA bắt buộc sau mỗi phase

```bash
npm run build
npm run lint
npm run dev
```

Test:

```
/
 /dong-su/zhu-yuanzhang
/dong-su/zhu-yuanzhang/archive
```

Checklist tối thiểu:

```
Homepage load đúng
Story bắt đầu được
Choice đổi stats
Reload restore đúng
Restart xóa save
Audio vẫn bật/tắt và đổi track
Ending hiển thị đúng
Archive đủ 16 scene / 6 nhân vật / 4 vật phẩm
Không console error
Không network 404
Không hydration error
Mobile 390px không overflow
```
