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

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: "text-embedding-004",
    contents: [{ text }],
    config: {
      taskType: "RETRIEVAL_DOCUMENT",
    },
  });

  const embeddings = response.embeddings?.[0].values;

  if (!embeddings) {
    throw new Error("Error while generating the chunks.");
  }

  return embeddings;
}

export async function generateAnswer({
  question,
  transcriptions,
}: {
  question: string;
  transcriptions: string[];
}) {
  const context = transcriptions.join("\n\n");

  const prompt = `
  Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e objetiva usando o português do Brasil.

  CONTEXTO:
  ${context}

  PERGUNTA:
  ${question}

  INSTRUÇÕES:
  - Use apenas informações contidas no contexto enviado;
  - Se a resposta não estiver no contexto, apenas responda que não tem informação suficiente;
  - Seja objetivo mantendo um tom educativo e profissional;
  - Inclua trechos relevantes do contexto se apropriado;
  - Se for citar o contexto, utilize o termo "conteúdo da aula";
  `.trim();

  const response = await gemini.models.generateContent({
    model,
    contents: [{ text: prompt }],
  });

  const answer = response.text;

  if (!answer) {
    throw new Error("Error while generating the answer.");
  }

  return answer;
}
