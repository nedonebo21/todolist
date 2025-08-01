import {test, expect, beforeEach} from "vitest"
import {
  changeTodolistFilterAC, changeTodolistTitleTC, createTodolistTC, deleteTodolistTC,
  todolistReducer,
} from "@/features/todolists/model/todolists-slice.ts"
import {nanoid} from "@reduxjs/toolkit"
import {DomainTodolist} from "@/features/todolists/api/todolists-api.types.ts";

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[]

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    {id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'succeeded'},
    {id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'succeeded'},
  ]
})

test("correct todo should be add", () => {
  const newTodo: DomainTodolist = {
    id: '123123',
    title: 'yo',
    addedDate: '',
    order: 0,
    filter: 'all',
    entityStatus: 'succeeded'
  }
  const endState = todolistReducer(
      startState,
      createTodolistTC.fulfilled({todolist: newTodo}, 'requestId', 'yo')
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('yo')
})

test("correct todo should be deleted", () => {
  const endState = todolistReducer(
      startState,
      deleteTodolistTC.fulfilled({id: todolistId1}, 'requestId', todolistId1)
  )

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todo should change title", () => {
  const newTitle = "changed title"
  const endState = todolistReducer(startState, changeTodolistTitleTC.fulfilled(
      {id: todolistId1, title: newTitle}, 'requestId', {id: todolistId1, title: newTitle})
  )

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe(newTitle)
  expect(endState[1].title).not.toBe(newTitle)
})

test("correct todo should change filter", () => {
  const newFilter = "completed"
  const endState = todolistReducer(startState,
      changeTodolistFilterAC({id: todolistId1, filter: newFilter})
  )

  expect(endState[0].filter).toBe(newFilter)
  expect(endState[1].filter).toBe("all")
})
