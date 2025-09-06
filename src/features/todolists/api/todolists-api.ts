import { BaseResponse } from '@/shared/types'
import { baseApi } from '@/app/base-api.ts'
import { DomainTodolist, Todolist } from '@/features/todolists/lib/types'

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
         async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
            const patchResult = dispatch(
               todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
                  const index = state.findIndex(tl => tl.id === id)
                  if (index !== -1) {
                     state.splice(index, 1)
                  }
               })
            )
            try {
               await queryFulfilled
            } catch {
               patchResult.undo()
            }
         },
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
