import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer, tasksSlice } from '@/features/todolists/model/tasks-slice.ts'
import { todolistReducer, todolistsSlice } from '@/features/todolists/model/todolists-slice.ts'
import { appReducer, appSlice } from '@/app/app-slice.ts'

export const store = configureStore({
   reducer: {
      [tasksSlice.name]: tasksReducer,
      [todolistsSlice.name]: todolistReducer,
      [appSlice.name]: appReducer,
   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
