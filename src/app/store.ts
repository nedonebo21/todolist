import {configureStore} from "@reduxjs/toolkit"
import {tasksReducer, tasksSlice} from "@/features/todolists/model/tasks-slice.ts"
import {todolistReducer, todolistsSlice} from "@/features/todolists/model/todolists-slice.ts"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
