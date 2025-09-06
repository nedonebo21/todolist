import { DomainTask, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api'
import { BaseResponse } from '@/shared/types'
import { baseApi } from '@/app/base-api.ts'
import { PAGE_SIZE } from '@/shared/constants'

export const tasksApi = baseApi.injectEndpoints({
   endpoints: build => ({
      getTasks: build.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
         query: ({ todolistId, params }) => ({
            url: `/todo-lists/${todolistId}/tasks`,
            params: { ...params, count: PAGE_SIZE },
         }),
         providesTags: (res, err, { todolistId }) => [{ type: 'Task', id: todolistId }],
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
         invalidatesTags: (res, err, { todolistId }) => [{ type: 'Task', id: todolistId }],
      }),
      deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
         query: ({ todolistId, taskId }) => ({
            url: `todo-lists/${todolistId}/tasks/${taskId}`,
            method: 'DELETE',
         }),
         invalidatesTags: (res, err, { todolistId }) => [{ type: 'Task', id: todolistId }],
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
