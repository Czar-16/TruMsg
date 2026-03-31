import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const runtime = "edge";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST() {
  try {
    const prompt = `
Create a list of three open-ended and engaging questions formatted as a single string.
Each question must be separated by '||'.

Return ONLY plain text. No markdown, no HTML.

Example:
What motivates you daily? || What makes you happy? || What inspires you?
`;

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    return Response.json({
      message: result.text,
    });
  } catch (error: any) {
    console.log("AI ERROR:", error); // 👈 IMPORTANT

    return Response.json(
      {
        error: error?.message || "Something went wrong",
      },
      { status: 500 },
    );
  }
}
