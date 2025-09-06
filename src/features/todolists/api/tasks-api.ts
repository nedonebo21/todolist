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
         async onQueryStarted(
            { todolistId, taskId, model },
            { dispatch, queryFulfilled, getState }
         ) {
            const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(
               getState(),
               'getTasks'
            )
            let patchResults: any[] = []
            cachedArgsForQuery.forEach(({ params }) => {
               patchResults.push(
                  dispatch(
                     tasksApi.util.updateQueryData(
                        'getTasks',
                        { todolistId, params: { page: params.page } },
                        state => {
                           const index = state.items.findIndex(t => t.id === taskId)
                           if (index !== -1) {
                              state.items[index] = { ...state.items[index], ...model }
                           }
                        }
                     )
                  )
               )
            })
            try {
               await queryFulfilled
            } catch {
               patchResults.forEach(patchResult => {
                  patchResult.undo()
               })
            }
         },
         invalidatesTags: (res, err, { todolistId }) => [{ type: 'Task', id: todolistId }],
      }),
   }),
})

export const {
   useGetTasksQuery,
   useAddTaskMutation,
   useDeleteTaskMutation,
   useUpdateTaskMutation,
} = tasksApi
