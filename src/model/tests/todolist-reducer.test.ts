import {test,expect,beforeEach} from "vitest";
import {TodoListType} from "@/app/App.tsx";
import {v1} from "uuid";
import {
    addTodoAC,
    changeFilterAC,
    changeTodoTitleAC,
    deleteTodoAC,
    todolistReducer
} from "@/model/todolist-reducer.ts";

let todolistId1: string
let todolistId2: string
let startState: TodoListType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all'},
    ]
})

test('correct todo should be add',() => {
    const newTitle = 'yo'
    const endState = todolistReducer(startState, addTodoAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
})


test('correct todo should be deleted',() => {
    const endState = todolistReducer(startState, deleteTodoAC(todolistId2))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId1)
})

test('correct todo should change title',() => {
    const newTitle = 'changed title'
    const endState = todolistReducer(startState, changeTodoTitleAC(todolistId1, newTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).not.toBe(newTitle)
})

test('correct todo should change filter',() => {
    const newFilter = 'completed'
    const endState = todolistReducer(startState, changeFilterAC(todolistId1, newFilter))

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})