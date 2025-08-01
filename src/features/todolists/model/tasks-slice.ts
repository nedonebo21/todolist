import {TasksState} from "@/app/App.tsx"
import {createTodolistTC, deleteTodolistTC} from "@/features/todolists/model/todolists-slice.ts";
import {createAppSlice, handleServerAppError, handleServerNetworkError} from "@/shared/utils";
import {tasksApi, UpdateTaskModel} from "@/features/todolists/api";
import {RootState} from "@/app/store.ts";
import {setAppStatusAC} from "@/app/app-slice.ts";
import {ResultCode} from "@/shared/enums/enums.ts";

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TasksState,
  reducers: create => ({
    deleteAllTasksAC: create.reducer<{ todolistId: string }>(
        (state, action) => {
          state[action.payload.todolistId] = []
        }
    ),
    fetchTasksTC: create.asyncThunk(
        async (todolistId: string, {dispatch, rejectWithValue}) => {
          try {
            dispatch(setAppStatusAC({status: 'pending'}))
            const res = await tasksApi.getTasks(todolistId)
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolistId, tasks: res.data.items}
          } catch (error) {
            handleServerNetworkError(error,dispatch)
            return rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
          }
        }
    ),
    createTaskTC: create.asyncThunk(
        async (payload: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
          try {
            dispatch(setAppStatusAC({status: 'pending'}))
            const res = await tasksApi.addTask(payload)

            if (res.data.resultCode === ResultCode.Success){
              dispatch(setAppStatusAC({status: 'succeeded'}))
              return {task: res.data.data.item}
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error,dispatch)
            return rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
          }
        }
    ),
    deleteTaskTC: create.asyncThunk(
        async (payload: { todolistId: string, taskId: string }, {dispatch, rejectWithValue}) => {
          try {
            dispatch(setAppStatusAC({status: 'pending'}))
            const res = await tasksApi.deleteTask(payload)

            if (res.data.resultCode === ResultCode.Success){
              dispatch(setAppStatusAC({status: 'succeeded'}))
              return payload
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error,dispatch)
            return rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) {
              tasks.splice(index, 1)
            }
          }
        }
    ),
    updateTaskTC: create.asyncThunk(
        async (payload: {todolistId: string, taskId: string, domainModel: Partial<UpdateTaskModel>}, {dispatch, rejectWithValue, ...thunkAPI}) => {
          const {todolistId, taskId, domainModel} = payload
          const todolistTasks = (thunkAPI.getState() as RootState).tasks[todolistId]
          const task = todolistTasks.find(t => t.id === taskId)
          if (!task){
            return rejectWithValue(null)
          }
          const model: UpdateTaskModel = {
            description: task.description,
            title: domainModel.title ?? task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: domainModel.status ?? task.status
          }
          try{
            dispatch(setAppStatusAC({status: 'pending'}))
            const res = await tasksApi.updateTask({todolistId,taskId,model})

            if (res.data.resultCode === ResultCode.Success){
              dispatch(setAppStatusAC({status: 'succeeded'}))
              return {task: res.data.data.item}
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error){
            handleServerNetworkError(error,dispatch)
            return rejectWithValue(error)
          }
        }
    ),
  }),
  extraReducers: builder => {
    builder
        .addCase(createTodolistTC.fulfilled, (state, action) => {
          state[action.payload.todolist.id] = []
        })
        .addCase(deleteTodolistTC.fulfilled, (state, action) => {
          delete state[action.payload.id]
        })
  },
  selectors: {
    selectTasks: state => state
  }
})
export const {
  deleteTaskTC,
  createTaskTC,
  updateTaskTC,
  deleteAllTasksAC,
  fetchTasksTC,
} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const {selectTasks} = tasksSlice.selectors
