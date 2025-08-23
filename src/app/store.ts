import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer, tasksSlice } from '@/features/todolists/model/tasks-slice.ts'
import { todolistReducer, todolistsSlice } from '@/features/todolists/model/todolists-slice.ts'
import { appReducer, appSlice } from '@/app/app-slice.ts'
import { authReducer, authSlice } from '@/features/auth/model/auth-slice.ts'
import { todolistsApi } from '@/features/todolists/api/todolists-api.ts'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
   reducer: {
      [tasksSlice.name]: tasksReducer,
      [todolistsSlice.name]: todolistReducer,
      [appSlice.name]: appReducer,
      [authSlice.name]: authReducer,
      [todolistsApi.reducerPath]: todolistsApi.reducer,
   },
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todolistsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
