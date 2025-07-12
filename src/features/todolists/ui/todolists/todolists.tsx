import { TodolistItem } from "@/features/todolists/ui/todolists/todolist-item/todolist-item.tsx"
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector.ts"
import { selectTodolists } from "@/features/todolists/model/selectors/todolists-selectors.ts"
import { useEffect } from "react"
import { todolistsApi } from "@/features/todolists/api/todolists-api.ts"
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch.ts"
import { setTodolistsAC } from "@/features/todolists/model/todolist-reducer.ts"

export const Todolists = () => {
  const todoLists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()
  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      dispatch(setTodolistsAC({ todolists: res.data }))
    })
  }, [])

  return todoLists.map((todolist) => {
    return <TodolistItem todolist={todolist} key={todolist.id} />
  })
}
