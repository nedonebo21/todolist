import { Dispatch } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import { setAppErrorAC, setAppStatusAC } from '@/app/app-slice.ts'
import { BaseResponse } from '@/shared/types'

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
   let errorMessage: string
   if (data.messages.length) {
      errorMessage = data.messages[0]
      dispatch(setAppErrorAC({ error: errorMessage }))
   } else {
      errorMessage = 'Some error occured'
      dispatch(setAppErrorAC({ error: errorMessage }))
   }
   toast.error('Error', {
      description: errorMessage,
   })
   dispatch(setAppStatusAC({ status: 'failed' }))
   dispatch(setAppErrorAC({ error: errorMessage }))
}
