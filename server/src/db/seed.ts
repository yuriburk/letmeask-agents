import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await reset(db, schema)

await seed(db, schema).refine((builder) => {
  return {
    rooms: {
      count: 20,
      columns: {
        name: builder.companyName(),
        description: builder.loremIpsum(),
        createdAt: builder.date({ maxDate: '2025-05-15' }),
        updatedAt: builder.date({
          minDate: '2025-05-18',
          maxDate: '2025-05-25',
        }),
      },
    },
  }
})

await sql.end()
