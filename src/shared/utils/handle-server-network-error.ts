import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAppErrorAC, setAppStatusAC } from '@/app/app-slice.ts'
import { toast } from 'sonner'
import { z } from 'zod/v4'

export const handleServerNetworkError = (error: unknown | string, dispatch: Dispatch) => {
   let errorMessage: string
   switch (true) {
      case axios.isAxiosError(error):
         errorMessage = error.response
            ? error.response?.data?.errorMessages[0].message
            : error.message
         break
      case error instanceof z.ZodError:
         errorMessage = 'Zod Error. Смотри консоль'
         break
      case error instanceof Error:
         errorMessage = `NativeError: ${error.message}`
         break
      default:
         errorMessage = JSON.stringify(error)
   }
   toast.error('Error', {
      description: errorMessage,
   })
   dispatch(setAppStatusAC({ status: 'failed' }))
   dispatch(setAppErrorAC({ error: errorMessage }))
}
