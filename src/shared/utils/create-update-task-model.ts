import { DomainTask, UpdateTaskModel } from '@/features/todolists/api'

export const CreateUpdateTaskModel = (
   task: DomainTask,
   changes: Partial<UpdateTaskModel>
): UpdateTaskModel => {
   return {
      status: task.status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      ...changes,
   }
}
