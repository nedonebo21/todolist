import { FilterValues } from '@/app/App.tsx'
import { z } from 'zod/v4'

const domainTodolistSchema = z.object({
   id: z.string(),
   title: z.string(),
   addedDate: z.iso.datetime({ local: true }),
   order: z.int(),
})

export type Todolist = z.infer<typeof domainTodolistSchema>

export type DomainTodolist = Todolist & {
   filter: FilterValues
}
