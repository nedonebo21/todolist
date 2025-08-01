import {Button} from "@/shared/ui/shadcn/button.tsx"
import {FilterValues} from "@/app/App.tsx"
import {changeTodolistFilterAC} from "@/features/todolists/model/todolists-slice.ts"
import {useAppDispatch} from "@/shared/lib/hooks";
import {DomainTodolist} from "@/features/todolists/api/todolists-api.types.ts";

type Props = {
  todolist: DomainTodolist
}
export const FilterButtons = ({todolist}: Props) => {
  const {id, filter} = todolist
  const dispatch = useAppDispatch()
  const changeFilter = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({id, filter}))
  }
  return (
      <div className={"flex gap-2"}>
        <Button
            className={"flex-1 border-1 border-solid border-transparent "}
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => changeFilter("all")}
        >
          All
        </Button>
        <Button
            className={"flex-1 border-1 border-solid border-transparent"}
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => changeFilter("active")}
        >
          Active
        </Button>
        <Button
            className={"flex-1 border-1 border-solid border-transparent"}
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => changeFilter("completed")}
        >
          Completed
        </Button>
      </div>
  )
}
