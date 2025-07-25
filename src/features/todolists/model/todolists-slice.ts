import {FilterValues} from "@/app/App.tsx"
import {todolistsApi} from "@/features/todolists/api";
import {DomainTodolist} from "@/features/todolists/api/todolists-api.types.ts";
import {createAppSlice} from "@/shared/utils";
import {setAppStatusAC} from "@/app/app-slice.ts";

export const todolistsSlice = createAppSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: create => ({
    changeTodolistFilterAC: create.reducer<{ id: string, filter: FilterValues }>((state, action) => {
      const todolist = state.find(td => td.id === action.payload.id)
      if (todolist) todolist.filter = action.payload.filter
    }),
    createTodolistTC: create.asyncThunk(
        async (title: string, {dispatch, rejectWithValue}) => {
          try {
            dispatch(setAppStatusAC({status: 'pending'}))
            const res = await todolistsApi.addTodolist(title)
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolist: res.data.data.item}
          } catch (error) {
            dispatch(setAppStatusAC({status: 'failed'}))
            return rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            state.unshift({...action.payload.todolist, filter: "all"})
          }
        }
    ),
    fetchTodolistsTC: create.asyncThunk(
        async (_, {dispatch, rejectWithValue}) => {
          try {
            dispatch(setAppStatusAC({status: 'pending'}))
            const res = await todolistsApi.getTodolists()
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolists: res.data}
          } catch (error) {
            dispatch(setAppStatusAC({status: 'failed'}))
            return rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            action.payload?.todolists.forEach(tl => {
              state.push({...tl, filter: 'all'})
            })
          }
        }
    ),
    deleteTodolistTC: create.asyncThunk(
        async (id: string, {dispatch, rejectWithValue}) => {
          try {
            dispatch(setAppStatusAC({status: 'pending'}))
            await todolistsApi.removeTodolist(id)
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {id}
          } catch (error) {
            dispatch(setAppStatusAC({status: 'failed'}))
            return rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
          }
        }
    ),
    changeTodolistTitleTC: create.asyncThunk(
        async (payload: { id: string, title: string }, {dispatch, rejectWithValue}) => {
          try {
            dispatch(setAppStatusAC({status: 'pending'}))
            await todolistsApi.changeTodolistTitle(payload)
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return payload
          } catch (error) {
            dispatch(setAppStatusAC({status: 'failed'}))
            return rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
          }
        }
    )
  }),
  selectors: {
    selectTodolists: state => state
  }
})

export const {
  changeTodolistFilterAC,
  fetchTodolistsTC,
  createTodolistTC,
  deleteTodolistTC,
  changeTodolistTitleTC,
} = todolistsSlice.actions
export const todolistReducer = todolistsSlice.reducer
export const {selectTodolists} = todolistsSlice.selectors