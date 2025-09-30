import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../../connection.ts";
import { schema } from "../../schema/index.ts";

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
    }
  );
};
