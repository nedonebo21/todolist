import {instance} from "@/shared/api"
import {Todolist} from "@/features/todolists/api"
import {BaseResponse} from "@/shared/types";

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>('/todo-lists')
  },
  addTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>('/todo-lists', {title})
  },
  removeTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
  changeTodolistTitle(payload: { id: string, title: string }) {
    const {id, title} = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, {title})
  }
}
