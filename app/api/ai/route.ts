import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct", // ✅ WORKING MODEL
      messages: [
        { role: "user", content: prompt },
      ],
    });

    return Response.json({
      result: response.choices[0].message.content,
    });

  } catch (error: any) {
    console.error("AI ERROR:", error);

    return Response.json({
      result: "AI temporarily unavailable. Try again.",
    });
  }
}