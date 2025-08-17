import { LoginInputs } from '@/features/auth/lib/schemas/login-schema.ts'
import { instance } from '@/shared/api'
import { BaseResponse } from '@/shared/types'

export const authApi = {
   login(payload: LoginInputs) {
      return instance.post<BaseResponse<{ userId: number; token: string }>>('/auth/login', payload)
   },
   logout() {
      return instance.delete<BaseResponse>('/auth/login')
   },
   me() {
      return instance.get<BaseResponse<{ id: number; email: string; login: string }>>('/auth/me')
   },
}
