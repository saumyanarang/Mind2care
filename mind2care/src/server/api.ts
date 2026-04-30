"use server";

const systemPrompt = `You are Mira, a compassionate wellness companion for the Mind2Care app. Your role is to:
- Listen with empathy and without judgment
- Provide supportive, kind responses focused on mental wellness
- Ask thoughtful follow-up questions when appropriate
- Suggest grounding techniques or coping strategies when relevant
- Always prioritize user safety and suggest professional help if concerning topics arise
- Keep responses concise (2-3 sentences max) but warm and personal
- Use emojis sparingly to add warmth
- Remind users that you're an AI and not a replacement for professional help`;

export async function chatWithAI(messages: Array<{ role: string; content: string }>) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  if (!apiKey) {
    throw new Error(
      "OpenAI API key is not configured. Please add OPENAI_API_KEY to .dev.vars"
    );
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(
        errData.error?.message || "Failed to get response from OpenAI"
      );
    }

    const data = await response.json();
    return {
      message: data.choices[0].message.content,
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}
