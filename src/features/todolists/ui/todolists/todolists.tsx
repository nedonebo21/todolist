import { TodolistItem } from '@/features/todolists/ui/todolists/todolist-item/todolist-item.tsx'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolists-api.ts'

export const Todolists = () => {
   const { data: todoLists } = useGetTodolistsQuery()

   return todoLists?.map(todolist => {
      return <TodolistItem todolist={todolist} key={todolist.id} />
   })
}
