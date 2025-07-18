import {TasksState} from "@/app/App.tsx"
import {createSlice, nanoid} from "@reduxjs/toolkit"
import {createTodolistTC, deleteTodolistTC} from "@/features/todolists/model/todolists-slice.ts";

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksState,
  reducers: create => ({
    deleteTaskAC: create.reducer<{ todolistId: string, id: string }>(
        (state, action) => {
          const index = state[action.payload.todolistId]
              .findIndex(task => task.id === action.payload.id)
          if (index !== -1) state[action.payload.todolistId].splice(index, 1)
        }),
    createTaskAC: create.preparedReducer(
        (title: string, todolistId: string) => ({payload: {title, todolistId, id: nanoid()}}),
        (state, action) => {
          state[action.payload.todolistId].push({...action.payload, isDone: false})
        }
    ),
    changeTaskStatusAC: create.reducer<{ todolistId: string, id: string, isDone: boolean }>(
        (state, action) => {
          const task = state[action.payload.todolistId]
              .find(task => task.id === action.payload.id)
          if (task) task.isDone = action.payload.isDone
        }
    ),
    changeTaskTitleAC: create.reducer<{ todolistId: string, id: string, title: string }>(
        (state, action) => {
          const task = state[action.payload.todolistId]
              .find(task => task.id === action.payload.id)
          if (task) task.title = action.payload.title
        }
    ),
    deleteAllTasksAC: create.reducer<{ todolistId: string }>(
        (state, action) => {
          state[action.payload.todolistId] = []
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
  deleteTaskAC,
  createTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteAllTasksAC,
} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const {selectTasks} = tasksSlice.selectors
