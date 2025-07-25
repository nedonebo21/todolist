import {TodoListType} from "@/app/App.tsx"
import {Button} from "@/shared/ui/shadcn/button.tsx"
import {AddItemForm} from "@/shared/ui/add-item-form/add-item-form.tsx"
import {Card, CardContent, CardFooter, CardHeader} from "@/shared/ui/shadcn/card.tsx"
import {toast} from "sonner"
import {createTaskTC, deleteAllTasksAC} from "@/features/todolists/model/tasks-slice.ts"
import {TodolistTitle} from "@/features/todolists/ui/todolists/todolist-item/todolist-title/todolist-title.tsx"
import {Tasks} from "@/features/todolists/ui/todolists/todolist-item/tasks/tasks.tsx"
import {FilterButtons} from "@/features/todolists/ui/todolists/todolist-item/filter-buttons/filter-buttons.tsx"
import {useAppDispatch} from "@/shared/lib/hooks";

type Props = {
  todolist: TodoListType
}

export const TodolistItem = ({todolist}: Props) => {
  const {id} = todolist
  const dispatch = useAppDispatch()
  const deleteAllTasks = () => {
    dispatch(deleteAllTasksAC({todolistId: id}))
    toast.success(`All tasks has been deleted`)
  }
  const addTask = (title: string) => {
    dispatch(createTaskTC({todolistId:id, title}))
  }

  return (
      <Card className="min-w-xs h-[560px]">
        <CardHeader className={"container"}>
          <TodolistTitle todolist={todolist}/>
        </CardHeader>
        <CardContent className={"flex-1"}>
          <AddItemForm className={"mb-3"} placeholderValue={"Type your Task title"} onCreateItem={addTask}/>
          <Tasks todolist={todolist}/>
        </CardContent>
        <CardFooter className={"w-full"}>
          <div className={"flex flex-col gap-2 w-full"}>
            <FilterButtons todolist={todolist}/>
            <Button
                size={"sm"}
                className={"border-1 border-solid border-transparent w-full"}
                variant={"destructive"}
                onClick={deleteAllTasks}
            >
              Delete All
            </Button>
          </div>
        </CardFooter>
      </Card>
  )
}
