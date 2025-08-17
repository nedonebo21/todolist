import { createAppSlice, handleServerAppError, handleServerNetworkError } from '@/shared/utils'
import { LoginInputs } from '@/features/auth/lib/schemas/login-schema.ts'
import { setAppStatusAC } from '@/app/app-slice.ts'
import { authApi } from '@/features/auth/api/auth-api.ts'
import { ResultCode } from '@/shared/enums/enums.ts'
import { AUTH_TOKEN } from '@/shared/constants'

export const authSlice = createAppSlice({
   name: 'auth',
   initialState: {
      isLoggedIn: false,
   },
   selectors: {
      selectIsLoggedIn: state => state,
   },
   reducers: create => ({
      loginTC: create.asyncThunk(
         async (data: LoginInputs, { dispatch, rejectWithValue }) => {
            try {
               dispatch(setAppStatusAC({ status: 'pending' }))
               const res = await authApi.login(data)
               if (res.data.resultCode === ResultCode.Success) {
                  dispatch(setAppStatusAC({ status: 'succeeded' }))
                  localStorage.setItem(AUTH_TOKEN, res.data.data.token)
                  return { isLoggedIn: true }
               } else {
                  handleServerAppError(res.data, dispatch)
                  return rejectWithValue(null)
               }
            } catch (error) {
               handleServerNetworkError(error, dispatch)
               return rejectWithValue(error)
            }
         },
         {
            fulfilled: (state, action) => {
               state.isLoggedIn = action.payload.isLoggedIn
            },
         }
      ),
   }),
})

export const authReducer = authSlice.reducer
export const { loginTC } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors
