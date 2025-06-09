import {Task, TasksState} from "../app/App.tsx";
import {v1} from "uuid";

export const TasksReducer = (state: TasksState, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newTitle = action.payload.title
            const todoListID = action.payload.todoListID
            const newTask: Task = {id: v1(), title: newTitle, isDone: false}
            return {
                ...state,
                [todoListID]: [newTask, ...state[todoListID]]
            }
        }
        case 'DELETE-TASK': {
            const taskId = action.payload.taskId
            const todoListID = action.payload.todoListID
            return {
                ...state,
                [todoListID]: state[todoListID].filter(el => el.id !== taskId)
            }
        }
        case 'DELETE-ALL-TASKS': {
            const todoListID = action.payload.todoListID
            return {
                ...state,
                [todoListID]: state[todoListID].filter(el => el !== el)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            const todoListID = action.payload.todoListID
            const taskId = action.payload.taskId
            const isDone = action.payload.isDone
            return {
                ...state,
                [todoListID]: state[todoListID].map(el => el.id === taskId ? {...el, isDone} : el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            const todoListID = action.payload.todoListID
            const taskId = action.payload.taskId
            const newTitle = action.payload.title
            return {
                ...state,
                [todoListID]: state[todoListID].map(el => el.id === taskId ? {...el, title: newTitle} : el)
            }
        }
        case 'ADD-TASKS-NEW-TODO': {
            const newTodoId = action.payload.newTodoId
            return {
                ...state,
                [newTodoId]: []
            }
        }
        case 'DELETE-TASKS-AFTER-TODO': {
            const todoListID = action.payload.todoListID
            const newState = {...state}
            delete newState[todoListID]
            return newState
        }
        default:
            return state
    }
}

type ActionsType = CreateTaskACType
    | DeleteTaskACType
    | DeleteAllTasksACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTasksNewTodoACType
    | DeleteTasksAfterTodoACType

type CreateTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListID: string, title: string) => ({
    type: 'ADD-TASK',
    payload: {
        todoListID,
        title
    }

} as const)

type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todoListID: string, taskId: string) => ({
    type: 'DELETE-TASK',
    payload: {
        todoListID,
        taskId
    }

} as const)

type DeleteAllTasksACType = ReturnType<typeof deleteAllTasksAC>
export const deleteAllTasksAC = (todoListID: string) => ({
    type: 'DELETE-ALL-TASKS',
    payload: {
        todoListID
    }

} as const)

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListID: string, taskId: string, isDone: boolean) => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todoListID,
        taskId,
        isDone
    }

} as const)

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (
    todoListID: string,
    taskId: string,
    title: string) => ({
    type: 'CHANGE-TASK-TITLE',
    payload: {
        todoListID,
        taskId,
        title
    }

} as const)

type AddTasksNewTodoACType = ReturnType<typeof addTasksNewTodoAC>
export const addTasksNewTodoAC = (newTodoId: string) => ({
    type: 'ADD-TASKS-NEW-TODO',
    payload: {
        newTodoId
    }

} as const)

type DeleteTasksAfterTodoACType = ReturnType<typeof deleteTasksAfterTodoAC>
export const deleteTasksAfterTodoAC = (todoListID: string) => ({
    type: 'DELETE-TASKS-AFTER-TODO',
    payload: {
        todoListID
    }
} as const)