import {test, expect, beforeEach} from "vitest"
import {TasksState} from "@/app/App.tsx"
import {
  createTaskTC,
  deleteTaskTC,
  tasksReducer,
  updateTaskTC,
} from "@/features/todolists/model/tasks-slice.ts"
import {TaskPriority, TaskStatus} from "@/shared/enums";
import {DomainTask} from "@/features/todolists/api";

let startState: TasksState

const taskDefaultValues = {
  description: '',
  deadline: '',
  addedDate: '',
  startDate: '',
  priority: TaskPriority.Low,
  order: 0,
}

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatus.Completed,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
    ],
  }
})

test("task should be added to correct arr", () => {
  const newTask: DomainTask = {
    id: '52',
    title: 'yo',
    status: TaskStatus.New,
    todoListId: 'todolistId1',
    ...taskDefaultValues,
  }
  const endState = tasksReducer(startState,
      createTaskTC.fulfilled(
          {task: newTask}, 'requestId',
          {todolistId: 'todolistId1', title: 'yo'}
      )
  )

  expect(endState['todolistId1'].length).toBe(4)
  expect(endState['todolistId1'][0].title).toBe('yo')
  expect(endState['todolistId2'][0].title).not.toBe('yo')
})

test("correct task should be deleted from correct arr", () => {
  const endState = tasksReducer(startState,
      deleteTaskTC.fulfilled(
          {todolistId: 'todolistId1', taskId: "3"}, 'requestId',
          {todolistId: 'todolistId1', taskId: "3"}
      )
  )

  expect(endState['todolistId1'].length).toBe(2)
  expect(endState['todolistId2'].length).toBe(3)
})

test("task should change status", () => {
  const updatedTask: DomainTask = {
    id: '1',
    title: 'CSS',
    status: TaskStatus.Completed,
    todoListId: 'todolistId1',
    ...taskDefaultValues,
  }
  const endState = tasksReducer(startState,
      updateTaskTC.fulfilled(
          {task: updatedTask},
          'requestId',
          {
            todolistId: 'todolistId1',
            taskId: "1",
            domainModel: {status: TaskStatus.Completed}
          }
      )
  )

  expect(endState['todolistId1'].find(tl => tl.id === '1')?.status).toBe(TaskStatus.Completed)
  expect(endState['todolistId2'].find(tl => tl.id === '1')?.status).toBe(TaskStatus.New)
})

test("task should change title", () => {
  const updatedTask: DomainTask = {
    id: '1',
    title: 'yo',
    status: TaskStatus.New,
    todoListId: 'todolistId1',
    ...taskDefaultValues,
  }
  const endState = tasksReducer(startState,
      updateTaskTC.fulfilled(
          {task: updatedTask},
          'requestId',
          {
            todolistId: 'todolistId1',
            taskId: "1",
            domainModel: {title: 'yo'}
          }
      )
  )

  expect(endState['todolistId1'].find(tl => tl.id === '1')?.title).toBe('yo')
  expect(endState['todolistId2'].find(tl => tl.id === '1')?.title).not.toBe('yo')
})
