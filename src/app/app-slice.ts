import {createSlice} from "@reduxjs/toolkit";
import {RequestStatus} from "@/shared/types/types.ts";

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatus
  },
  selectors: {
    selectStatus: (state) => state.status
  },
  reducers: (create) => ({
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    })
  })
})

export const {selectStatus} = appSlice.selectors
export const {setAppStatusAC} = appSlice.actions
export const appReducer = appSlice.reducer