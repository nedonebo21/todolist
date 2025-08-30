import { TodolistItem } from '@/features/todolists/ui/todolists/todolist-item/todolist-item.tsx'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolists-api.ts'
import { TodolistItemSkeleton } from '@/shared/ui/skeletons/todolist-item-skeleton'

export const Todolists = () => {
   const { data: todoLists, isLoading } = useGetTodolistsQuery()

   if (isLoading) {
      return (
         <div className={'flex justify-center gap-3 flex-wrap'}>
            {Array(3)
               .fill(null)
               .map((_, id) => (
                  <TodolistItemSkeleton key={id} />
               ))}
         </div>
      )
   }
   return todoLists?.map(todolist => {
      return <TodolistItem todolist={todolist} key={todolist.id} />
   })
}
