import { ScrollArea } from "@/shared/ui/shadcn/scroll-area.tsx"
import { TodoListType } from "@/app/App.tsx"
import { selectTasks } from "@/features/todolists/model/tasks-slice.ts"
import { TaskItem } from "@/features/todolists/ui/todolists/todolist-item/tasks/task-item/task-item.tsx"
import {useAppSelector} from "@/shared/lib/hooks";

type Props = {
  todolist: TodoListType
}
export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === "active") filteredTasks = todolistTasks.filter((task) => !task.isDone)
  if (filter === "completed") filteredTasks = todolistTasks.filter((task) => task.isDone)

  return (
    <ScrollArea>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolistId={id} />)
      )}
    </ScrollArea>
  )
}
