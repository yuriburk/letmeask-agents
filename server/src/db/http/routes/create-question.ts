import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";

import { db } from "../../connection.ts";
import { schema } from "../../schema/index.ts";
import { generateAnswer, generateEmbeddings } from "../../services/gemini.ts";

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/rooms/:roomId/questions",
    {
      schema: {
        params: z.object({ roomId: z.string() }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async ({ body: { question }, params: { roomId } }, reply) => {
      const embeddings = `[${(await generateEmbeddings(question)).join(",")}]`;

      const similarity = `${schema.audioChunks.embeddings} <=> ${embeddings}::vector`;

      const chunks = await db
        .select({
          id: schema.audioChunks.id,
          transcription: schema.audioChunks.transcription,
          similarity: sql<number>`1 - (${similarity})`,
        })
        .from(schema.audioChunks)
        .where(
          and(
            eq(schema.audioChunks.roomId, roomId),
            sql`1 - (${similarity}) > 0.7`
          )
        )
        .orderBy(sql`${similarity}`)
        .limit(3);

      let answer: string | null = null;

      if (chunks.length > 0) {
        const transcriptions = chunks.map((chunk) => chunk.transcription);

        answer = await generateAnswer({ question, transcriptions });
      }

      const [createdQuestion] = await db
        .insert(schema.questions)
        .values({ roomId, question, answer })
        .returning({ id: schema.questions.id });

      if (!createdQuestion) {
        return reply
          .status(500)
          .send({ error: "Failed to create new question." });
      }

      return reply.status(201).send({ questionId: createdQuestion.id, answer });
    }
  );
};
