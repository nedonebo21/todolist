import {FilterValues, TodoListType} from "../../../app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodo')
export const createTodolistAC = createAction('todolists/createTodo', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolists/changeTodoTitle')
export const changeTodolistFilterAC = createAction<{ id: string, filter: FilterValues }>('todolists/changeTodoFilter')


let initialState: TodoListType[] = []

export const todolistReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(td => td.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state.unshift({...action.payload, filter: 'all'})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(td => td.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const todo = state.find(td => td.id === action.payload.id)
            if (todo) {
                todo.filter = action.payload.filter
            }
        })
})