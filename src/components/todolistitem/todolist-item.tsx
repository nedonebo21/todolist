import {FilterValues, Task} from "../../app/App.tsx";
import {Button} from "@/shared/ui/shadcn/button.tsx";
import {AddItemForm} from "./add-item-form/add-item-form.tsx";
import {EditableSpan} from "./editable-span/editable-span.tsx";
import {Card, CardContent, CardFooter, CardHeader} from "@/shared/ui/shadcn/card.tsx";
import {Checkbox} from "@/shared/ui/shadcn/checkbox.tsx";
import {TrashIcon} from 'lucide-react'
import {ScrollArea} from "@/shared/ui/shadcn/scroll-area.tsx";
import {cn} from "@/shared/lib/utils.ts";
import {toast} from "sonner";

type Props = {
    todoTitle: string
    tasks: Task[]
    date?: string
    filter: FilterValues
    deleteTask: (payload: { todoListID: string, taskId: string }) => void
    deleteAllTasks: (payload: { todoListID: string }) => void
    addTask: (payload: { todoListID: string, title: string }) => void
    changeTaskStatus: (payload: { todoListID: string, taskId: string, isDone: boolean }) => void
    changeFilter: (payload: { todoListID: string, filter: FilterValues }) => void
    removeTodo: (payload: { todoListID: string }) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodoTitle: (todolistId: string, title: string) => void
    todoListID: string
}

export const TodolistItem = (props: Props) => {
    const {
        todoTitle,
        tasks,
        date,
        filter,
        deleteTask,
        deleteAllTasks,
        addTask,
        changeTaskStatus,
        changeFilter,
        changeTaskTitle,
        changeTodoTitle,
        removeTodo,
        todoListID,
    } = props

    const getFilteredTasks = () => {
        let filteredTasks = tasks
        if (filter === "active") {
            return (tasks.filter(task => !task.isDone))
        }
        if (filter === "completed") {
            return (tasks.filter(task => task.isDone))
        }
        return filteredTasks
    }

    const handleAllTasksDelete = () => deleteAllTasks({todoListID: todoListID})

    const handleAllFilter = () =>
        changeFilter({
            todoListID: todoListID,
            filter: "all"
        })
    const handleActiveFilter = () =>
        changeFilter({
            todoListID: todoListID,
            filter: "active"
        })
    const handleCompletedFilter = () =>
        changeFilter({
            todoListID: todoListID,
            filter: "completed"
        })


    const tasksList = getFilteredTasks().map(task => {
        const handleDeleteTask = () => {
            deleteTask({
                todoListID: todoListID,
                taskId: task.id
            })

            toast.success(`Task ${task.title} deleted`)
        }
        const changeTaskStatusHandler = (checked: boolean) => {
            changeTaskStatus({
                todoListID: todoListID,
                taskId: task.id,
                isDone: checked
            })
        }

        const handleTaskTitleChange = (title: string) => {
            changeTaskTitle(todoListID, task.id, title)
        }

        return (
            <li className={'flex justify-between gap-1.5 items-center'} key={task.id}>
                <label className={'flex gap-3 flex-1 items-center'}>
                    <Checkbox checked={task.isDone} onCheckedChange={changeTaskStatusHandler}></Checkbox>
                    <EditableSpan className={cn(task.isDone && 'line-through opacity-50')}
                                  value={task.title} onChange={handleTaskTitleChange}/>
                </label>
                <Button variant={'ghost'} size={'icon'} onClick={handleDeleteTask}>
                    <TrashIcon className={'text-destructive'}/>
                </Button>
            </li>
        )
    })
    const renderedTasks = getFilteredTasks().length === 0
        ? <p>Тасок нет</p>
        : <ScrollArea className={'h-full max-h-64 -mr-2'}><ul className={'pr-2 flex flex-col gap-2'}>{tasksList}</ul></ScrollArea>

    const handleAddTask = (title: string) => {
        addTask({todoListID: todoListID, title: title})
    }

    const handleTodoRemove = () => {
        removeTodo({todoListID: todoListID})
        toast.success(`Todolist ${todoTitle} deleted`)
    }

    const handleTodoTitleChange = (title: string) => {
        changeTodoTitle(todoListID, title)
    }

    return (
        <Card className="min-w-xs h-[560px]">
            <CardHeader className={"container"}>
                <div className={'flex justify-between items-center gap-2'}>
                    <EditableSpan value={todoTitle} onChange={handleTodoTitleChange}/>
                    <Button variant={'ghost'} size={'icon'} onClick={handleTodoRemove}>
                        <TrashIcon className={'text-destructive'}/>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className={'flex-1'}>
                <AddItemForm className={'mb-3'} placeholderValue={'Type your Task title'} onCreateItem={handleAddTask}/>
                {renderedTasks}
            </CardContent>
            <CardFooter className={'w-full'}>
                <div className={'flex flex-col gap-2 w-full'}>
                    <div className={'flex gap-2'}>
                        <Button className={'flex-1 border-1 border-solid border-transparent '}
                                variant={filter === 'all' ? 'default' : 'outline'}
                                onClick={handleAllFilter}>All</Button>
                        <Button className={'flex-1 border-1 border-solid border-transparent'}
                                variant={filter === 'active' ? 'default' : 'outline'}
                                onClick={handleActiveFilter}>Active</Button>
                        <Button className={'flex-1 border-1 border-solid border-transparent'}
                                variant={filter === 'completed' ? 'default' : 'outline'}
                                onClick={handleCompletedFilter}>Completed</Button>
                    </div>
                    <Button size={'sm'} className={'border-1 border-solid border-transparent w-full'} variant={'destructive'}
                            onClick={handleAllTasksDelete}>Delete All</Button>
                    <div>{date}</div>
                </div>
            </CardFooter>
        </Card>
    )
}