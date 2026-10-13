import { createServerFn } from "@tanstack/react-start";

const SYSTEM_PROMPT = `You are Mira, a compassionate wellness companion for the Mind2Care app. Your role is to:
- Listen with empathy and without judgment
- Provide supportive, kind responses focused on mental wellness
- Ask thoughtful follow-up questions when appropriate
- Suggest grounding techniques or coping strategies when relevant
- Always prioritize user safety and suggest professional help if concerning topics arise
- Keep responses concise (2-3 sentences max) but warm and personal
- Use emojis sparingly to add warmth
- Remind users that you're an AI and not a replacement for professional help`;

type ChatMessage = { role: "user" | "assistant"; content: string };

// Reads a secret at request time. Works in:
//  - local dev (vite.config.ts copies .dev.vars into process.env)
//  - Cloudflare Workers (secrets/vars are exposed on process.env via nodejs_compat)
function readSecret(name: string): string | undefined {
  const value = typeof process !== "undefined" ? process.env?.[name] : undefined;
  return value && value.trim() ? value.trim() : undefined;
}

export const chatWithAI = createServerFn({ method: "POST" })
  .inputValidator((data: { messages: ChatMessage[] }) => data)
  .handler(async ({ data }) => {
    const apiKey = readSecret("GEMINI_API_KEY");
    const model = readSecret("GEMINI_MODEL") ?? "gemini-2.5-flash";

    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is missing. Add it to .dev.vars locally (see .dev.vars.example) or set it as a Cloudflare secret.",
      );
    }

    // Gemini expects roles "user" | "model" and the conversation must start with a user turn,
    // so drop the leading assistant greeting.
    const contents = data.messages
      .filter((m) => m.content?.trim())
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));
    while (contents.length && contents[0].role !== "user") contents.shift();

    if (!contents.length) throw new Error("No message to send.");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
        }),
      },
    );

    if (!response.ok) {
      const err = (await response.json().catch(() => null)) as {
        error?: { message?: string };
      } | null;
      throw new Error(err?.error?.message || `Gemini request failed (${response.status})`);
    }

    const json = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = json.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? "")
      .join("")
      .trim();

    if (!text) throw new Error("Gemini returned an empty response. Please try again.");
    return { message: text };
  });
