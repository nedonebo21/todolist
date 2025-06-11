import {test,expect, beforeEach} from "vitest";
import {TasksState} from "@/app/App.tsx";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskAC,
    TasksReducer
} from "@/reducers/tasks-reducer.ts";
import {v1} from "uuid";

let startState: TasksState
let todolistId1: string
let todolistId2: string
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: true},
        ],
    }
})

test('task should be added to correct arr', () => {
    const newTitle = 'new task'
    const endState = TasksReducer(startState, addTaskAC(todolistId1,newTitle))

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId1][0].title).toBe(newTitle)
    expect(endState[todolistId2][0].title).not.toBe(newTitle)
})

test('correct task should be deleted from correct arr', () => {
    const endState = TasksReducer(startState, deleteTaskAC(todolistId1,'3'))

    expect(endState[todolistId1].length).toBe(2)
    expect(endState).toEqual({
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
        ],
        [todolistId2]: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: true},
        ],
    })
})

test('task should change status', () => {
    const endState = TasksReducer(startState, changeTaskStatusAC(todolistId1, '1', false))

    expect(endState[todolistId1][0].isDone).toBeFalsy()
    expect(endState[todolistId2][0].isDone).toBeTruthy()
})

test('task should change title', () => {
    const newTitle = 'changed task title'
    const endState = TasksReducer(startState, changeTaskTitleAC(todolistId1, '1', newTitle))

    expect(endState[todolistId1][0].title).toBe(newTitle)
    expect(endState[todolistId2][0].title).not.toBe(newTitle)
})