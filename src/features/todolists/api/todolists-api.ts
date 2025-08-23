import { instance } from '@/shared/api'
import { DomainTodolist, Todolist } from '@/features/todolists/api'
import { BaseResponse } from '@/shared/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AUTH_TOKEN } from '@/shared/constants'

export const _todolistsApi = {
   getTodolists() {
      return instance.get<Todolist[]>('/todo-lists')
   },
   addTodolist(title: string) {
      return instance.post<BaseResponse<{ item: Todolist }>>('/todo-lists', { title })
   },
   removeTodolist(id: string) {
      return instance.delete<BaseResponse>(`/todo-lists/${id}`)
   },
   changeTodolistTitle(payload: { id: string; title: string }) {
      const { id, title } = payload
      return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
   },
}
export const todolistsApi = createApi({
   reducerPath: 'todolistsApi',
   tagTypes: ['Todolist'],
   baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: headers => {
         headers.set('API-KEY', import.meta.env.VITE_API_KEY)
         headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
      },
   }),
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
