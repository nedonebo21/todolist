import {AddItemForm} from "@/shared/ui/add-item-form/add-item-form.tsx";
import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader} from "@/shared/ui/shadcn/card.tsx";
import {EditableSpan} from "@/shared/ui/editable-span/editable-span.tsx";
import {Button} from "@/shared/ui/shadcn/button.tsx";
import {TrashIcon} from "lucide-react";
import {ScrollArea} from "@/shared/ui/shadcn/scroll-area.tsx";
import {Checkbox} from "@/shared/ui/shadcn/checkbox.tsx";
import {cn} from "@/shared/lib/utils.ts";
import {TaskStatus} from "@/shared/enums";
import {DomainTask, tasksApi, Todolist, todolistsApi, UpdateTaskModel} from "@/features/todolists/api";

export const AppWithHttpRequest = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) => {
          setTasks((prevTasks) => ({
            ...prevTasks,
            [todolist.id]: res.data.items,
          }))
        })
      })
    })
  }, [])

  const addTodoList = (title: string) => {
    todolistsApi.addTodolist(title).then(res => {
      const newTodo = res.data.data.item
      setTodolists([newTodo, ...todolists])
    })
  }
  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle({id, title}).then(() => {
      setTodolists(todolists.map(todo => todo.id === id ? {...todo, title} : todo))
    })
  }
  const removeTodolist = (id: string) => {
    todolistsApi.removeTodolist(id).then(() => {
      setTodolists(todolists.filter(todo => todo.id !== id))
    })
  }

  const addTask = (todolistId: string, title: string) => {
    tasksApi.addTask(todolistId, title).then(res => {
      const newTask = res.data.data.item
      setTasks((prevTasks) => ({
        [todolistId]: [newTask, ...prevTasks[todolistId]],
        ...prevTasks
      }))
    })
  }
  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask(todolistId, taskId).then(() => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
      })
    })
  }
  const changeTaskStatus = (checked: boolean, task: DomainTask) => {
    const todolistId = task.todoListId
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: checked ? TaskStatus.Completed : TaskStatus.New,
    }
    tasksApi.changeTaskStatus({todolistId, taskId: task.id, model}).then(() => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].map(t => t.id === task.id ? {...t, ...model} : t)
      })
    })
  }
  const changeTaskTitle = (task: DomainTask, title: string) => {
    const todolistId = task.todoListId
    const model: UpdateTaskModel = {
      description: task.description,
      title,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
    }
    tasksApi.changeTaskTitle({todolistId, taskId: task.id, model}).then(() => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].map(t => t.id === task.id ? {...t, ...model} : t)
      })
    })
  }


  return (
      <div className={"container mx-auto max-w-2xl grid gap-y-2.5"}>
        <AddItemForm placeholderValue={"Type your Todolist title"} onCreateItem={addTodoList}/>
        {todolists.map((todolist) => (
            <Card key={todolist.id} className="min-w-xs h-[560px]">
              <CardHeader className={"container"}>
                <div className={"flex justify-between items-center gap-2"}>
                  <EditableSpan value={todolist.title}
                                onChange={(title) => changeTodolistTitle(todolist.id, title)}/>
                  <Button variant={"ghost"} size={"icon"} onClick={() => removeTodolist(todolist.id)}>
                    <TrashIcon className={"text-destructive"}/>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={"flex-1"}>
                <AddItemForm
                    className={"mb-3"}
                    placeholderValue={"Type your Task title"}
                    onCreateItem={(title) => addTask(todolist.id, title)}/>
                <ScrollArea>
                  {tasks[todolist.id]?.map((task) => (
                      <li className={"flex justify-between gap-1.5 items-center"} key={task.id}>
                        <label className={"flex gap-3 flex-1 items-center"}>
                          <Checkbox checked={task.status === TaskStatus.Completed}
                                    onCheckedChange={(checked: boolean) => changeTaskStatus(checked, task)}></Checkbox>
                          <EditableSpan
                              className={cn(task.status === TaskStatus.Completed && "line-through opacity-50")}
                              value={task.title}
                              onChange={(title) => changeTaskTitle(task, title)}
                          />
                        </label>
                        <Button variant={"ghost"} size={"icon"} onClick={() => deleteTask(todolist.id, task.id)}>
                          <TrashIcon className={"text-destructive"}/>
                        </Button>
                      </li>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
        ))}
      </div>
  )
}