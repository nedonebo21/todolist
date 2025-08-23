import { DomainTask, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api'
import { BaseResponse } from '@/shared/types'
import { baseApi } from '@/app/base-api.ts'

export const tasksApi = baseApi.injectEndpoints({
   endpoints: build => ({
      getTasks: build.query<GetTasksResponse, string>({
         query: todolistId => `/todo-lists/${todolistId}/tasks`,
         providesTags: ['Task'],
      }),
      addTask: build.mutation<
         BaseResponse<{ item: DomainTask }>,
         { todolistId: string; title: string }
      >({
         query: ({ todolistId, title }) => ({
            url: `/todo-lists/${todolistId}/tasks`,
            method: 'POST',
            body: { title },
         }),
         invalidatesTags: ['Task'],
      }),
      deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
         query: ({ todolistId, taskId }) => ({
            url: `todo-lists/${todolistId}/tasks/${taskId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Task'],
      }),
      updateTask: build.mutation<
         BaseResponse,
         { todolistId: string; taskId: string; model: UpdateTaskModel }
      >({
         query: ({ todolistId, taskId, model }) => ({
            url: `todo-lists/${todolistId}/tasks/${taskId}`,
            method: 'PUT',
            body: model,
         }),
         invalidatesTags: ['Task'],
      }),
   }),
})

export const {
   useGetTasksQuery,
   useAddTaskMutation,
   useDeleteTaskMutation,
   useUpdateTaskMutation,
} = tasksApi
