import { streamText } from "ai";
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

These questions are for an anonymous social messaging platform.
Keep them universal, positive, and non-personal.
`;

    const result = streamText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    return result.toTextStreamResponse();
  } 
  catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error?.message || "Something went wrong",
      }),
      { status: 500 },
    );
  }
}
