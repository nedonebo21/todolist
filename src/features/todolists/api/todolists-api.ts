import { DomainTodolist, Todolist } from '@/features/todolists/api'
import { BaseResponse } from '@/shared/types'
import { baseApi } from '@/app/base-api.ts'

export const todolistsApi = baseApi.injectEndpoints({
   endpoints: build => ({
      getTodolists: build.query<DomainTodolist[], void>({
         query: () => 'todo-lists',
         providesTags: ['Todolist'],
         transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
            todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' })),
      }),
      addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
         query: title => ({
            url: 'todo-lists',
            method: 'POST',
            body: { title },
         }),
         invalidatesTags: ['Todolist'],
      }),
      removeTodolist: build.mutation<BaseResponse, string>({
         query: id => ({
            url: `todo-lists/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Todolist'],
      }),
      updateTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
         query: ({ id, title }) => ({
            url: `todo-lists/${id}`,
            method: 'PUT',
            body: { title },
         }),
         invalidatesTags: ['Todolist'],
      }),
   }),
})
export const {
   useGetTodolistsQuery,
   useAddTodolistMutation,
   useRemoveTodolistMutation,
   useUpdateTodolistTitleMutation,
} = todolistsApi
