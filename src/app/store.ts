import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer, tasksSlice } from '@/features/todolists/model/tasks-slice.ts'
import { todolistReducer, todolistsSlice } from '@/features/todolists/model/todolists-slice.ts'
import { appReducer, appSlice } from '@/app/app-slice.ts'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '@/app/base-api.ts'

export const store = configureStore({
   reducer: {
      [tasksSlice.name]: tasksReducer,
      [todolistsSlice.name]: todolistReducer,
      [appSlice.name]: appReducer,
      [baseApi.reducerPath]: baseApi.reducer,
   },
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
