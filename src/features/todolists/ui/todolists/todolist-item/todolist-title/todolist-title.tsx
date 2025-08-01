import { EditableSpan } from "@/shared/ui/editable-span/editable-span.tsx"
import { Button } from "@/shared/ui/shadcn/button.tsx"
import { TrashIcon } from "lucide-react"
import { toast } from "sonner"
import {
  changeTodolistTitleTC,
  deleteTodolistTC
} from "@/features/todolists/model/todolists-slice.ts"
import {useAppDispatch} from "@/shared/lib/hooks";
import {DomainTodolist} from "@/features/todolists/api/todolists-api.types.ts";

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  const dispatch = useAppDispatch()
  const removeTodo = () => {
    toast.success(`Todolist ${title} deleted`)
    dispatch(deleteTodolistTC(id))
  }
  const changeTodoTitle = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }))
  }
  return (
    <div className={"flex justify-between items-center gap-2"}>
      <EditableSpan disabled={entityStatus === 'pending'} value={title} onChange={changeTodoTitle} />
      <Button disabled={entityStatus === 'pending'} variant={"ghost"} size={"icon"} onClick={removeTodo}>
        <TrashIcon className={"text-destructive"} />
      </Button>
    </div>
  )
}
