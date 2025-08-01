import {FilterValues} from "@/app/App.tsx"
import {todolistsApi} from "@/features/todolists/api";
import {DomainTodolist} from "@/features/todolists/api/todolists-api.types.ts";
import {createAppSlice, handleServerAppError} from "@/shared/utils";
import {setAppStatusAC} from "@/app/app-slice.ts";
import {RequestStatus} from "@/shared/types/types.ts";
import {handleServerNetworkError} from "@/shared/utils/handle-server-network-error.ts";
import {ResultCode} from "@/shared/enums/enums.ts";

export const todolistsSlice = createAppSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: create => ({
    changeTodolistFilterAC: create.reducer<{ id: string, filter: FilterValues }>((state, action) => {
      const todolist = state.find(td => td.id === action.payload.id)
      if (todolist) todolist.filter = action.payload.filter
    }),
    changeTodolistStatusAC: create.reducer<{ id: string, entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find(td => td.id === action.payload.id)
      if (todolist) todolist.entityStatus = action.payload.entityStatus
    }),
    createTodolistTC: create.asyncThunk(
        async (title: string, {dispatch, rejectWithValue}) => {
          try {
            dispatch(setAppStatusAC({status: 'pending'}))
            const res = await todolistsApi.addTodolist(title)

            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatusAC({status: 'succeeded'}))
              return {todolist: res.data.data.item}
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
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: 'succeeded'})
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
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            action.payload?.todolists.forEach(tl => {
              state.push({...tl, filter: 'all', entityStatus: 'succeeded'})
            })
          }
        }
    ),
    deleteTodolistTC: create.asyncThunk(
        async (id: string, {dispatch, rejectWithValue}) => {
          try {
            dispatch(setAppStatusAC({status: 'pending'}))
            dispatch(changeTodolistStatusAC({id, entityStatus: 'pending'}))

            const res = await todolistsApi.removeTodolist(id)

            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatusAC({status: 'succeeded'}))
              return {id}
            } else {
              dispatch(changeTodolistStatusAC({id, entityStatus: 'failed'}))
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
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
            const res = await todolistsApi.changeTodolistTitle(payload)

            if (res.data.resultCode === ResultCode.Success){
              dispatch(setAppStatusAC({status: 'succeeded'}))
              return payload
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
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
    ),
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
  changeTodolistStatusAC
} = todolistsSlice.actions
export const todolistReducer = todolistsSlice.reducer
export const {selectTodolists} = todolistsSlice.selectors