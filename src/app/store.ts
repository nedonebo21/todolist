import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { tasksReducer } from "@/features/todolists/model/tasks-reducer.ts"
import { todolistReducer } from "@/features/todolists/model/todolist-reducer.ts"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
})
export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
