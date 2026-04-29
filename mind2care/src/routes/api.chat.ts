import { createAPIFileRoute } from "@tanstack/react-start/server";
import { chatWithAI } from "@/server/api";

export const APIRoute = createAPIFileRoute("/api/chat")({
  POST: async (opts) => {
    try {
      const body = (opts.request as any).body
        ? await (opts.request as any).json?.()
        : {};

      const messages = body.messages || [];

      const result = await chatWithAI(messages);
      return result;
    } catch (error) {
      console.error("API error:", error);
      return new Response(
        JSON.stringify({
          error: error instanceof Error ? error.message : "Unknown error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
});
