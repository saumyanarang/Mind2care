import { chatWithAI } from "@/server/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = body.messages || [];

    const result = await chatWithAI(messages);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
