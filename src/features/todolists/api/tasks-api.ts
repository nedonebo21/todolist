import { instance } from '@/shared/api'
import { DomainTask, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api'
import { BaseResponse } from '@/shared/types'
import { baseApi } from '@/app/base-api.ts'

export const _tasksApi = {
   getTasks(todolistId: string) {
      return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
   },
   addTask(payload: { todolistId: string; title: string }) {
      const { todolistId, title } = payload
      return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, {
         title,
      })
   },
   deleteTask(payload: { todolistId: string; taskId: string }) {
      const { todolistId, taskId } = payload
      return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
   },
   updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
      const { todolistId, taskId, model } = payload
      return instance.put<BaseResponse<{ item: DomainTask }>>(
         `/todo-lists/${todolistId}/tasks/${taskId}`,
         model
      )
   },
}

export const tasksApi = baseApi.injectEndpoints({
   endpoints: build => ({
      getTasks: build.query<GetTasksResponse, string>({
         query: todolistId => `/todo-lists/${todolistId}/tasks`,
         providesTags: ['Task'],
      }),
   }),
})

export const { useGetTasksQuery } = tasksApi
