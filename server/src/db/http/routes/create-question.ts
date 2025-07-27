import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../connection.ts'
import { schema } from '../../schema/index.ts'

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({ roomId: z.string() }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async ({ body: { question }, params: { roomId } }, reply) => {
      const [createdQuestion] = await db
        .insert(schema.questions)
        .values({ roomId, question })
        .returning({ id: schema.questions.id })

      if (!createdQuestion) {
        return reply
          .status(500)
          .send({ error: 'Failed to create new question.' })
      }

      return reply.status(201).send({ questionId: createdQuestion.id })
    }
  )
}
