import { ScrollArea } from '@/shared/ui/shadcn/scroll-area.tsx'
import { TaskItem } from '@/features/todolists/ui/todolists/todolist-item/tasks/task-item/task-item.tsx'
import { TaskStatus } from '@/shared/enums'
import { DomainTodolist } from '@/features/todolists/api/todolists-api.types.ts'
import { useGetTasksQuery } from '@/features/todolists/api/tasks-api.ts'
import { TaskItemSkeleton } from '@/features/todolists/ui/todolists/todolist-item/tasks/task-item/task-item-skeleton.tsx'

type Props = {
   todolist: DomainTodolist
}
export const Tasks = ({ todolist }: Props) => {
   const { id, filter } = todolist

   const { data, isLoading } = useGetTasksQuery(id)

   let filteredTasks = data?.items
   if (filter === 'active')
      filteredTasks = filteredTasks?.filter(task => task.status === TaskStatus.New)
   if (filter === 'completed')
      filteredTasks = filteredTasks?.filter(task => task.status === TaskStatus.Completed)

   if (isLoading) {
      return <TaskItemSkeleton />
   }
   return (
      <ScrollArea>
         {filteredTasks?.length === 0 ? (
            <p>Тасок нет</p>
         ) : (
            filteredTasks?.map(task => <TaskItem key={task.id} task={task} todolist={todolist} />)
         )}
      </ScrollArea>
   )
}
