import { createSlice } from '@reduxjs/toolkit'
import { RequestStatus } from '@/shared/types/types.ts'

export const appSlice = createSlice({
   name: 'app',
   initialState: {
      status: 'idle' as RequestStatus,
      error: null as null | string,
      isLoggedIn: false,
   },
   selectors: {
      selectStatus: state => state.status,
      selectAppError: state => state.error,
      selectIsLoggedIn: state => state.isLoggedIn,
   },
   reducers: create => ({
      setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
         state.status = action.payload.status
      }),
      setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
         state.error = action.payload.error
      }),
      setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
         state.isLoggedIn = action.payload.isLoggedIn
      }),
   }),
})

export const { selectStatus, selectAppError, selectIsLoggedIn } = appSlice.selectors
export const { setAppStatusAC, setAppErrorAC, setIsLoggedInAC } = appSlice.actions
export const appReducer = appSlice.reducer
