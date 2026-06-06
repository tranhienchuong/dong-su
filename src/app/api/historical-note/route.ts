import { NextResponse } from "next/server";
import { buildHistoricalNotePrompt } from "@/lib/dong-su/aiPrompts";

type HistoricalNoteRequest = {
  sceneTitle: string;
  noteTitle: string;
  noteBody: string;
  question: string;
};

type GroqChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const noInformationAnswer = "Ghi chú hiện tại chưa có thông tin này.";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ answer: null }, { status: 400 });
  }

  const input = parseHistoricalNoteRequest(body);

  if (!input) {
    return NextResponse.json({ answer: null }, { status: 400 });
  }

  const prompt = buildHistoricalNotePrompt(input);
  const answer = await generateHistoricalNoteAnswer(prompt);

  return NextResponse.json({ answer });
}

function parseHistoricalNoteRequest(
  value: unknown,
): HistoricalNoteRequest | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const input = value as Partial<Record<keyof HistoricalNoteRequest, unknown>>;
  const sceneTitle = parseRequiredString(input.sceneTitle);
  const noteTitle = parseRequiredString(input.noteTitle);
  const noteBody = parseRequiredString(input.noteBody);
  const question = parseRequiredString(input.question);

  if (!sceneTitle || !noteTitle || !noteBody || !question) {
    return null;
  }

  return {
    sceneTitle,
    noteTitle,
    noteBody,
    question,
  };
}

function parseRequiredString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue || null;
}

async function generateHistoricalNoteAnswer(
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
          max_completion_tokens: 180,
          messages: [{ role: "user", content: prompt }],
          model: process.env.GROQ_MODEL ?? "llama-3.1-8b-instant",
          temperature: 0.2,
        }),
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as GroqChatCompletionResponse;
    const text = data.choices?.[0]?.message?.content;

    return normalizeHistoricalNoteAnswer(text);
  } catch {
    return null;
  }
}

function normalizeHistoricalNoteAnswer(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  return isNoInformationAnswer(trimmedValue)
    ? noInformationAnswer
    : trimmedValue;
}

function isNoInformationAnswer(value: string): boolean {
  const normalizedValue = value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

  return [
    "ghi chu hien tai chua co thong tin",
    "khong co thong tin",
    "chua co thong tin",
    "khong thay thong tin",
    "khong du thong tin",
    "khong tim thay thong tin",
    "khong the tra loi",
  ].some((signal) => normalizedValue.includes(signal));
}
