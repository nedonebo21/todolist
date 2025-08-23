import { Checkbox } from '@/shared/ui/shadcn/checkbox.tsx'
import { EditableSpan } from '@/shared/ui/editable-span/editable-span.tsx'
import { cn } from '@/shared/lib/utils.ts'
import { Button } from '@/shared/ui/shadcn/button.tsx'
import { TrashIcon } from 'lucide-react'
import { updateTaskTC } from '@/features/todolists/model/tasks-slice.ts'
import { toast } from 'sonner'
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch.ts'
import { TaskStatus } from '@/shared/enums'
import { DomainTask } from '@/features/todolists/api'
import { DomainTodolist } from '@/features/todolists/api/todolists-api.types.ts'
import { useDeleteTaskMutation } from '@/features/todolists/api/tasks-api.ts'

type Props = {
   todolist: DomainTodolist
   task: DomainTask
}
export const TaskItem = ({ task, todolist }: Props) => {
   const { id: todolistId, entityStatus } = todolist
   const [deleteTask] = useDeleteTaskMutation()

   const dispatch = useAppDispatch()

   const handleDeleteTask = () => {
      deleteTask({ todolistId, taskId: task.id })
      toast.success(`Task ${task.title} deleted`)
   }
   const changeTaskStatus = (checked: boolean) => {
      dispatch(
         updateTaskTC({
            todolistId,
            taskId: task.id,
            domainModel: { status: checked ? TaskStatus.Completed : TaskStatus.New },
         })
      )
   }
   const changeTaskTitle = (title: string) => {
      dispatch(
         updateTaskTC({
            todolistId,
            taskId: task.id,
            domainModel: { title },
         })
      )
   }

   const isTaskCompleted = task.status === TaskStatus.Completed

   return (
      <li className={'flex justify-between gap-1.5 items-center'} key={task.id}>
         <label className={'flex gap-3 flex-1 items-center'}>
            <Checkbox
               disabled={entityStatus === 'pending'}
               checked={isTaskCompleted}
               onCheckedChange={changeTaskStatus}
            ></Checkbox>
            <EditableSpan
               disabled={entityStatus === 'pending'}
               className={cn(isTaskCompleted && 'line-through opacity-50')}
               value={task.title}
               onChange={changeTaskTitle}
            />
         </label>
         <Button
            disabled={entityStatus === 'pending'}
            variant={'ghost'}
            size={'icon'}
            onClick={handleDeleteTask}
         >
            <TrashIcon className={'text-destructive'} />
         </Button>
      </li>
   )
}
