import {Dispatch} from "@reduxjs/toolkit";
import {isAxiosError} from "axios";
import {setAppErrorAC, setAppStatusAC} from "@/app/app-slice.ts";
import {toast} from "sonner";

export const handleServerNetworkError = (error: unknown | string, dispatch: Dispatch) => {
  let errorMessage: string
  if (isAxiosError(error)) {
    errorMessage = error.response
        ? error.response.data.errorMessages[0].message
        : error.message
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  } else {
    errorMessage = JSON.stringify(error)
  }
  toast.error('Error', {
    description: errorMessage
  })
  dispatch(setAppStatusAC({status: 'failed'}))
  dispatch(setAppErrorAC({error: errorMessage}))
}