import {ScrollArea} from "@/shared/ui/shadcn/scroll-area.tsx";
import {TodoListType} from "@/app/App.tsx";
import {useAppSelector} from "@/shared/lib/hooks/use-app-selector.ts";
import {selectTasks} from "@/features/todolists/model/selectors/tasks-selectors.ts";
import {TaskItem} from "@/features/todolists/ui/todolists/todolist-item/tasks/task-item/task-item.tsx";

type Props = {
  todolist: TodoListType
}
export const Tasks = ({todolist}: Props) => {
  const {id, filter} = todolist
  const tasks = useAppSelector(selectTasks)
  const todolistTasks = tasks[id]



  let filteredTasks = todolistTasks
  if (filter === 'active') filteredTasks = todolistTasks.filter(task => !task.isDone)
  if (filter === 'completed') filteredTasks = todolistTasks.filter(task => task.isDone)

  return (
      <ScrollArea>
        {
          todolistTasks.length === 0
            ? (<p>Тасок нет</p>)
            : (filteredTasks.map(task => <TaskItem task={task} todolistId={id}/>))
        }
      </ScrollArea>
  )
}
