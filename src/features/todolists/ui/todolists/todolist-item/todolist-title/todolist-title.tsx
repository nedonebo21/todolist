import { EditableSpan } from "@/shared/ui/editable-span/editable-span.tsx"
import { Button } from "@/shared/ui/shadcn/button.tsx"
import { TrashIcon } from "lucide-react"
import { toast } from "sonner"
import { changeTodolistTitleAC, deleteTodolistAC } from "@/features/todolists/model/todolist-reducer.ts"
import { TodoListType } from "@/app/App.tsx"
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch.ts"
type Props = {
  todolist: TodoListType
}
export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist
  const dispatch = useAppDispatch()
  const removeTodo = () => {
    toast.success(`Todolist ${title} deleted`)
    dispatch(deleteTodolistAC({ id }))
  }
  const changeTodoTitle = (title: string) => {
    dispatch(changeTodolistTitleAC({ id, title }))
  }
  return (
    <div className={"flex justify-between items-center gap-2"}>
      <EditableSpan value={title} onChange={changeTodoTitle} />
      <Button variant={"ghost"} size={"icon"} onClick={removeTodo}>
        <TrashIcon className={"text-destructive"} />
      </Button>
    </div>
  )
}
