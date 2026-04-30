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

// Mock responses for demo mode
const mockResponses = [
  "That sounds challenging. Remember, it's okay to have difficult feelings. What do you think might help you feel a bit better right now? 💙",
  "I hear you. Taking one small step towards self-care can make a difference. Would you like to share what's on your mind? 🌸",
  "Thank you for opening up. Your feelings are valid. Let's explore this together - what's the main thing bothering you today? 💛",
  "I'm glad you're here. Sometimes just talking about it helps. What would you like to focus on first? 🌿",
  "That takes courage to share. Remember, you're not alone in this. What would help you feel more grounded right now? ✨",
];

export async function chatWithAI(messages: Array<{ role: string; content: string }>) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  // If no API key, use mock responses
  if (!apiKey || apiKey.includes("sk-your")) {
    console.log("Using mock responses - no API key configured");
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    return {
      message: randomResponse,
    };
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
      console.log("OpenAI API returned error, using mock response");
      // Fallback to mock if API fails
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      return {
        message: randomResponse,
      };
    }

    const data = await response.json();
    return {
      message: data.choices[0].message.content,
    };
  } catch (error) {
    console.error("OpenAI API error, using mock response:", error);
    // Fallback to mock if there's any error
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    return {
      message: randomResponse,
    };
  }
}
