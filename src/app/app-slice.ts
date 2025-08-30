import { RequestStatus } from '@/shared/types/types.ts'
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

export const appSlice = createSlice({
   name: 'app',
   initialState: {
      status: 'idle' as RequestStatus,
      error: null as null | string,
      isLoggedIn: false,
   },
   extraReducers: builder => {
      builder
         .addMatcher(isPending, state => {
            state.status = 'pending'
         })
         .addMatcher(isFulfilled, state => {
            state.status = 'succeeded'
         })
         .addMatcher(isRejected, state => {
            state.status = 'failed'
         })
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
