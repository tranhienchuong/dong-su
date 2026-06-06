import { NextResponse } from "next/server";
import { buildEndingPrompt } from "@/lib/dong-su/aiPrompts";
import type {
  EpisodeEnding,
  MemoryFlag,
  PersonaKey,
  StatKey,
  Stats,
} from "@/types/dong-su";

const statKeys: StatKey[] = [
  "danTam",
  "nghiaKhi",
  "quanUy",
  "nhanTinh",
  "daTam",
];

const memoryFlags: MemoryFlag[] = [
  "shared_food",
  "protected_weak",
  "chose_power",
  "protected_brothers",
  "defied_authority",
  "showed_mercy",
  "chose_discipline",
  "led_by_example",
  "used_fear",
  "accepted_humiliation",
  "remembered_hunger",
  "chose_survival",
  "protected_dignity",
  "took_responsibility",
];

const personaKeys: PersonaKey[] = [
  "iron-ruler",
  "people-hearted",
  "brotherhood-leader",
  "balanced-founder",
  "survivor",
];

const endingKeys: EpisodeEnding["id"][] = [
  "balanced",
  "humane",
  "ambitious",
];

type AIEndingRequest = {
  episodeId: string;
  stats: Stats;
  memory: MemoryFlag[];
  personaKey: PersonaKey;
  endingKey: EpisodeEnding["id"];
};

type GroqChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ narrative: null }, { status: 400 });
  }

  const input = parseAIEndingRequest(body);

  if (!input) {
    return NextResponse.json({ narrative: null }, { status: 400 });
  }

  const prompt = buildEndingPrompt(input);
  const narrative = await generateEndingNarrative(prompt);

  return NextResponse.json({ narrative });
}

function parseAIEndingRequest(value: unknown): AIEndingRequest | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const input = value as Partial<AIEndingRequest>;

  if (
    typeof input.episodeId !== "string" ||
    !isStats(input.stats) ||
    !Array.isArray(input.memory) ||
    !input.memory.every(isMemoryFlag) ||
    !isPersonaKey(input.personaKey) ||
    !isEndingKey(input.endingKey)
  ) {
    return null;
  }

  return {
    episodeId: input.episodeId,
    stats: input.stats,
    memory: input.memory,
    personaKey: input.personaKey,
    endingKey: input.endingKey,
  };
}

function isStats(value: unknown): value is Stats {
  if (!value || typeof value !== "object") {
    return false;
  }

  const stats = value as Partial<Record<StatKey, unknown>>;

  return statKeys.every((stat) => typeof stats[stat] === "number");
}

function isMemoryFlag(value: unknown): value is MemoryFlag {
  return (
    typeof value === "string" && memoryFlags.includes(value as MemoryFlag)
  );
}

function isPersonaKey(value: unknown): value is PersonaKey {
  return (
    typeof value === "string" && personaKeys.includes(value as PersonaKey)
  );
}

function isEndingKey(value: unknown): value is EpisodeEnding["id"] {
  return (
    typeof value === "string" &&
    endingKeys.includes(value as EpisodeEnding["id"])
  );
}

async function generateEndingNarrative(
  prompt: string,
): Promise<string | null> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          max_completion_tokens: 280,
          messages: [{ role: "user", content: prompt }],
          model: process.env.GROQ_MODEL ?? "llama-3.1-8b-instant",
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as GroqChatCompletionResponse;
    const text = data.choices?.[0]?.message?.content;

    return text?.trim() || null;
  } catch {
    return null;
  }
}
