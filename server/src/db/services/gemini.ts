import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

const model = "gemini-2.5-flash";

export async function transcribeAudio({
  audio,
  mimeType,
}: {
  audio: string;
  mimeType: string;
}): Promise<string> {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: "Transcreva o áudio para português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.",
      },
      {
        inlineData: {
          mimeType,
          data: audio,
        },
      },
    ],
  });

  if (!response.text) {
    throw new Error("Erro ao tentar transcrever áudio.");
  }

  return response.text;
}
