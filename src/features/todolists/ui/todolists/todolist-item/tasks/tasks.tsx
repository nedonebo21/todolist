import { ScrollArea } from '@/shared/ui/shadcn/scroll-area.tsx'
import { TaskItem } from '@/features/todolists/ui/todolists/todolist-item/tasks/task-item/task-item.tsx'
import { TaskStatus } from '@/shared/enums'
import { useGetTasksQuery } from '@/features/todolists/api/tasks-api.ts'
import { TaskItemSkeleton } from '@/shared/ui/skeletons/task-item-skeleton'
import { DomainTodolist } from '@/features/todolists/lib/types'
import { TasksPagination } from '@/features/todolists/ui/todolists/todolist-item/tasks/tasks-pagination/tasks-pagination.tsx'
import { useState } from 'react'

type TasksPropsType = {
   todolist: DomainTodolist
}
export const Tasks = ({ todolist }: TasksPropsType) => {
   const { id, filter } = todolist

   const [page, setPage] = useState(1)

   const { data, isLoading } = useGetTasksQuery({
      todolistId: id,
      params: { page },
   })

   let filteredTasks = data?.items
   if (filter === 'active')
      filteredTasks = filteredTasks?.filter(task => task.status === TaskStatus.New)
   if (filter === 'completed')
      filteredTasks = filteredTasks?.filter(task => task.status === TaskStatus.Completed)

   if (isLoading) {
      return <TaskItemSkeleton />
   }
   return (
      <div className={'flex flex-col h-full'}>
         <ScrollArea className={'flex-1'}>
            {filteredTasks?.length === 0 ? (
               <p>Тасок нет</p>
            ) : (
               filteredTasks?.map(task => (
                  <TaskItem key={task.id} task={task} todolist={todolist} />
               ))
            )}
         </ScrollArea>
         <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
      </div>
   )
}
