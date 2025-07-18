import { test, expect, beforeEach } from "vitest"
import { TodoListType } from "@/app/App.tsx"
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistReducer,
} from "@/features/todolists/model/todolists-slice.ts"
import { nanoid } from "@reduxjs/toolkit"

let todolistId1: string
let todolistId2: string
let startState: TodoListType[]

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    { id: todolistId1, title: "what to learn", filter: "all" },
    { id: todolistId2, title: "what to buy", filter: "all" },
  ]
})

test("correct todo should be add", () => {
  const newTitle = "yo"
  const endState = todolistReducer(startState, createTodolistAC(newTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTitle)
})

test("correct todo should be deleted", () => {
  const endState = todolistReducer(startState, deleteTodolistAC({ id: todolistId2 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId1)
})

test("correct todo should change title", () => {
  const newTitle = "changed title"
  const endState = todolistReducer(startState, changeTodolistTitleAC({ id: todolistId1, title: newTitle }))

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe(newTitle)
  expect(endState[1].title).not.toBe(newTitle)
})

test("correct todo should change filter", () => {
  const newFilter = "completed"
  const endState = todolistReducer(startState, changeTodolistFilterAC({ id: todolistId1, filter: newFilter }))

  expect(endState[0].filter).toBe(newFilter)
  expect(endState[1].filter).toBe("all")
})
