import {Checkbox} from "@/shared/ui/shadcn/checkbox.tsx";
import {EditableSpan} from "@/shared/ui/editable-span/editable-span.tsx";
import {cn} from "@/shared/lib/utils.ts";
import {Button} from "@/shared/ui/shadcn/button.tsx";
import {TrashIcon} from "lucide-react";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {toast} from "sonner";
import {Task} from "@/app/App.tsx";
import {useAppDispatch} from "@/shared/lib/hooks/use-app-dispatch.ts";
type Props = {
  todolistId: string
  task: Task
}
export const TaskItem = ({task,todolistId}: Props) => {
  const dispatch = useAppDispatch()
  const deleteTask = () => {
    dispatch(deleteTaskAC({todolistId, taskId: task.id}))
    toast.success(`Task ${task.title} deleted`)
  }
  const changeTaskStatus = (checked: boolean) => {
    dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: checked}))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
  }
  return (
      <li className={'flex justify-between gap-1.5 items-center'} key={task.id}>
        <label className={'flex gap-3 flex-1 items-center'}>
          <Checkbox checked={task.isDone} onCheckedChange={changeTaskStatus}></Checkbox>
          <EditableSpan className={cn(task.isDone && 'line-through opacity-50')}
                        value={task.title} onChange={changeTaskTitle}/>
        </label>
        <Button variant={'ghost'} size={'icon'} onClick={deleteTask}>
          <TrashIcon className={'text-destructive'}/>
        </Button>
      </li>
  )
}
