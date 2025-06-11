import {FilterValues, TodoListType} from "../app/App.tsx";
import {v1} from "uuid";

let initialState: TodoListType[] = []
export const TodolistReducer = (state: TodoListType[] = initialState, action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            const todoListID = action.payload.todolistID
            const filter = action.payload.filter
            return state.map(el => el.id === todoListID ? {...el, filter} : el)
        }
        case 'ADD-TODO': {
            const newTodo: TodoListType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [
                newTodo,
                ...state
            ]
        }
        case 'CHANGE-TODO-TITLE': {
            const todoListID = action.payload.todolistId
            const title = action.payload.title
            return state.map(el => el.id === todoListID ? {...el, title} : el)
        }
        case 'DELETE-TODO': {
            const todoListID = action.payload.todolistId
            return state.filter(el => el.id !== todoListID)
        }
        default:
            return state
    }
}

type ActionsType = ChangeFilterACType
    | AddTodoACType
    | ChangeTodoTitleACType
    | DeleteTodoACType

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, filter: FilterValues) => ({
    type: 'CHANGE-FILTER',
    payload: {
        todolistID,
        filter
    }
} as const)

type AddTodoACType = ReturnType<typeof addTodoAC>
export const addTodoAC = (title: string) => ({
    type: 'ADD-TODO',
    payload: {title, id: v1()}
} as const)

type ChangeTodoTitleACType = ReturnType<typeof changeTodoTitleAC>
export const changeTodoTitleAC = (todolistId: string, title: string) => ({
    type: 'CHANGE-TODO-TITLE',
    payload: {
        todolistId,
        title
    }
} as const)

type DeleteTodoACType = ReturnType<typeof deleteTodoAC>
export const deleteTodoAC = (todolistId: string) => ({
    type: 'DELETE-TODO',
    payload: {
        todolistId
    }
} as const)
