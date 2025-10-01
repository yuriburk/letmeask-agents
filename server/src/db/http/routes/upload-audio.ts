import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../../connection.ts";
import { schema } from "../../schema/index.ts";
import { generateEmbeddings, transcribeAudio } from "../../services/gemini.ts";

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/rooms/:roomId/audio",
    {
      schema: {
        params: z.object({ roomId: z.string() }),
      },
    },
    async ({ file, params: { roomId } }, reply) => {
      const audio = await file();

      if (!audio) {
        return reply.status(400).send({ message: "Audio is required." });
      }

      const audioBuffer = await audio.toBuffer();
      const audioString = audioBuffer.toString("base64");

      const transcription = await transcribeAudio({
        audio: audioString,
        mimeType: audio.mimetype,
      });

      const embeddings = await generateEmbeddings(transcription);

      const result = await db
        .insert(schema.audioChunks)
        .values({
          roomId,
          transcription,
          embeddings,
        })
        .returning();

      const chunk = result[0];

      if (!chunk) {
        return reply
          .status(500)
          .send({ message: "Failed to save audio chunk." });
      }

      return reply.status(201).send({ chunkId: chunk.id });
    }
  );
};
