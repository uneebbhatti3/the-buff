import { NextRequest, NextResponse } from "next/server";
import { Runner, InMemorySessionService, isFinalResponse } from "@google/adk";
import { rootAgent } from "@/agents/agent";

const sessionService = new InMemorySessionService();

const runner = new Runner({
  appName: "buff_ai",
  agent: rootAgent,
  sessionService,
});

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId, userId } = await req.json();

    if (!message || !sessionId || !userId) {
      return NextResponse.json(
        { error: "message, sessionId, and userId are required" },
        { status: 400 },
      );
    }

    // Create session if it doesn't exist yet
    const existingSession = await sessionService
      .getSession({ appName: "buff_ai", userId, sessionId })
      .catch(() => null);

    if (!existingSession) {
      await sessionService.createSession({
        appName: "buff_ai",
        userId,
        sessionId,
      });
    }

    let responseText = "";

    for await (const event of runner.runAsync({
      userId,
      sessionId,
      newMessage: { role: "user", parts: [{ text: message }] },
    })) {
      if (isFinalResponse(event) && event.content?.parts) {
        responseText = event.content.parts
          .map((p: { text?: string }) => p.text ?? "")
          .join("");
      }
    }

    if (!responseText) {
      responseText =
        "I'm having trouble responding right now. Please try again or contact the studio directly via WhatsApp.";
    }

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("[chat/route] Error:", error);
    return NextResponse.json(
      {
        error: `Something went wrong on our end. Please try again in a moment.: ${error}`,
      },
      { status: 500 },
    );
  }
}
