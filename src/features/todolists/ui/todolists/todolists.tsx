import { TodolistItem } from '@/features/todolists/ui/todolists/todolist-item/todolist-item.tsx'
import { useEffect } from 'react'
import { fetchTodolistsTC } from '@/features/todolists/model/todolists-slice.ts'
import { selectTodolists } from '@/features/todolists/model/todolists-slice.ts'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'

export const Todolists = () => {
   const todoLists = useAppSelector(selectTodolists)
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(fetchTodolistsTC())
   }, [])

   return todoLists.map(todolist => {
      return <TodolistItem todolist={todolist} key={todolist.id} />
   })
}
