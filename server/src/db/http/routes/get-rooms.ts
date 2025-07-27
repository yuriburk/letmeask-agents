import { count, desc, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../connection.ts'
import { schema } from '../../schema/index.ts'

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms',
    {
      schema: {
        querystring: z.object({
          limit: z.coerce.number().min(1).max(100).default(10).optional(),
          offset: z.coerce.number().min(0).default(0).optional(),
        }),
      },
    },
    async ({ query: { limit, offset } }) => {
      const rooms = await db
        .select({
          id: schema.rooms.id,
          name: schema.rooms.name,
          createdAt: schema.rooms.createdAt,
          questionsCount: count(schema.questions.id),
        })
        .from(schema.rooms)
        .leftJoin(
          schema.questions,
          eq(schema.questions.roomId, schema.rooms.id)
        )
        .groupBy(schema.rooms.id, schema.rooms.name)
        .orderBy(desc(schema.rooms.createdAt))
        .limit(limit ?? 10)
        .offset(offset ?? 0)

      return rooms
    }
  )
}
