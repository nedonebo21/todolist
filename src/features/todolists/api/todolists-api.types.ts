import { FilterValues } from '@/app/App.tsx'
import { RequestStatus } from '@/shared/types/types.ts'

export type Todolist = {
   id: string
   title: string
   addedDate: string
   order: number
}

export type DomainTodolist = Todolist & {
   filter: FilterValues
   entityStatus: RequestStatus
}
