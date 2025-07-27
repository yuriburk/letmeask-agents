import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../connection.ts'
import { schema } from '../../schema/index.ts'

export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms',
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
          description: z.string().optional(),
        }),
      },
    },
    async ({ body: { name, description } }, reply) => {
      const [room] = await db
        .insert(schema.rooms)
        .values({ name, description })
        .returning({ id: schema.rooms.id })

      if (!room) {
        return reply.status(500).send({ error: 'Failed to create new room.' })
      }

      return reply.status(201).send({ roomId: room.id })
    }
  )
}
