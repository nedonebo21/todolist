import {TodolistItem} from "@/features/todolists/ui/todolists/todolist-item/todolist-item.tsx"
import {useAppSelector} from "@/shared/lib/hooks/use-app-selector.ts"
import {useEffect} from "react"
import {useAppDispatch} from "@/shared/lib/hooks/use-app-dispatch.ts"
import {fetchTodolistsTC} from "@/features/todolists/model/todolists-slice.ts"
import {selectTodolists} from "@/features/todolists/model/todolists-slice.ts";

export const Todolists = () => {
  const todoLists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return todoLists.map((todolist) => {
    return <TodolistItem todolist={todolist} key={todolist.id}/>
  })
}
