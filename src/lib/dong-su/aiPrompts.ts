import { personaProfiles } from "@/lib/dong-su/game";
import type {
  EpisodeEnding,
  MemoryFlag,
  PersonaKey,
  Stats,
} from "@/types/dong-su";

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
    {},
  );

  return Object.entries(counts)
    .map(([flag, count]) => `- ${flag}: ${count}`)
    .join("\n");
}
