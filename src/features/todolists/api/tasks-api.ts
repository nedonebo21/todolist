import {instance} from "@/shared/api";
import {DomainTask, GetTasksResponse, UpdateTaskModel} from "@/features/todolists/api";
import {BaseResponse} from "@/shared/types";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  addTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskStatus(payload: { todolistId: string, taskId: string, model: UpdateTaskModel }) {
    const {todolistId, taskId, model} = payload
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, {model})
  },
  changeTaskTitle(payload: { todolistId: string, taskId: string, model: UpdateTaskModel }) {
    const {todolistId, taskId, model} = payload
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, {model})
  }
}