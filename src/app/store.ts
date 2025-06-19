import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "@/model/tasks-reducer.ts";
import {todolistReducer} from "@/model/todolist-reducer.ts";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
})
export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof  store.dispatch