import {FilterValues} from "@/app/App.tsx"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {todolistsApi} from "@/features/todolists/api";
import {DomainTodolist} from "@/features/todolists/api/todolists-api.types.ts";

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: create => ({
    changeTodolistFilterAC: create.reducer<{ id: string, filter: FilterValues }>((state, action) => {
      const todolist = state.find(td => td.id === action.payload.id)
      if (todolist) todolist.filter = action.payload.filter
    }),
  }),
  extraReducers: builder => {
    builder
        .addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
          return action.payload?.todolist.map(tl => {
            return {...tl, filter: 'all', entityStatus: 'idle'}
          })
        })
        .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
          const index = state.findIndex(tl => tl.id === action.payload.id)
          if (index !== -1) state[index].title = action.payload.title
        })
        .addCase(createTodolistTC.fulfilled, (state, action) => {
          state.push({...action.payload.todolist, filter: 'all'})
        })
        .addCase(deleteTodolistTC.fulfilled, (state, action) => {
          const index = state.findIndex(tl => tl.id === action.payload.id)
          if (index !== -1) state.splice(index, 1)
        })
  },
  selectors: {
    selectTodolists: state=> state
  }
})

export const {
  changeTodolistFilterAC,
} = todolistsSlice.actions
export const todolistReducer = todolistsSlice.reducer
export const {selectTodolists} = todolistsSlice.selectors


export const fetchTodolistsTC = createAsyncThunk(
    `${todolistsSlice.name}/fetchTodolistsTC`,
    async (_, thunkAPI) => {
      try {
        const res = await todolistsApi.getTodolists()
        return {todolist: res.data}
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }
    }
)
export const changeTodolistTitleTC = createAsyncThunk(
    `${todolistsSlice.name}/changeTodolistTitleTC`,
    async (payload: { id: string, title: string }, thunkAPI) => {
      try {
        await todolistsApi.changeTodolistTitle(payload)
        return payload
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }
    }
)
export const createTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/createTodolistTC`,
    async (title: string, thunkAPI) => {
      try {
        const res = await todolistsApi.addTodolist(title)
        return {todolist: res.data.data.item}
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }
    }
)
export const deleteTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/deleteTodolistTC`,
    async (id: string, thunkAPI) => {
      try {
        await todolistsApi.removeTodolist(id)
        return {id}
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }
    }
)