import { desc, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../connection.ts'
import { schema } from '../../schema/index.ts'

export const getRoomQuestionsRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms/:id/questions',
    { schema: { params: z.object({ id: z.string() }) } },
    async ({ params: { id } }) => {
      const result = await db
        .select({
          id: schema.questions.id,
          question: schema.questions.question,
          answer: schema.questions.answer,
          createdAt: schema.questions.createdAt,
        })
        .from(schema.questions)
        .where(eq(schema.questions.roomId, id))
        .orderBy(desc(schema.questions.createdAt))

      return result
    }
  )
}
