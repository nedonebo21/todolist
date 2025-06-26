import {TodolistItem} from "@/features/todolists/ui/todolists/todolist-item/todolist-item.tsx";
import {useAppSelector} from "@/shared/lib/hooks/use-app-selector.ts";
import {selectTodolists} from "@/features/todolists/model/selectors/todolists-selectors.ts";

export const Todolists = () => {
  const todoLists = useAppSelector(selectTodolists)

  return (
      todoLists.map(todolist => {
        return (
            <TodolistItem
                todolist={todolist}
                key={todolist.id}/>
        )
      })
  )
}