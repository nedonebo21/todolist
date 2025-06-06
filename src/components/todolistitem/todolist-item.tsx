import {FilterValues, Task} from "../../App.tsx";
import {Button} from "@/components/ui/button.tsx";
import {AddItemForm} from "./add-item-form/add-item-form.tsx";
import {EditableSpan} from "./editable-span/editable-span.tsx";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Delete, BookmarkX} from 'lucide-react'
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

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
            <li className={'flex justify-between items-center not-last:mb-2.5'} key={task.id}>
                <Checkbox checked={task.isDone} onCheckedChange={changeTaskStatusHandler}></Checkbox>
                <EditableSpan value={task.title} onChange={handleTaskTitleChange}/>
                <Button variant={'ghost'} size={'icon'} onClick={handleDeleteTask}>
                    <BookmarkX/>
                </Button>
            </li>
        )
    })
    const renderedTasks = getFilteredTasks().length === 0
        ? <p>Тасок нет</p>
        : <ScrollArea className={'flex flex-col grow h-72 w-full rounded-md border p-2'}>{tasksList}</ScrollArea>

    const handleAddTask = (title: string) => {
        addTask({todoListID: todoListID, title: title})
    }

    const handleTodoRemove = () => {
        removeTodo({todoListID: todoListID})
    }

    const handleTodoTitleChange = (title: string) => {
        changeTodoTitle(todoListID, title)
    }

    return (
        <Card className="w-sm flex flex-col h-[600px] overflow-hidden">
            <CardHeader className={"container"}>
                <div className={'flex justify-between items-center'}>
                    <EditableSpan value={todoTitle} onChange={handleTodoTitleChange}/>
                    <Button variant={'ghost'} size={'icon'} onClick={handleTodoRemove}>
                        <Delete/>
                    </Button>
                </div>
                <AddItemForm placeholderValue={'Type your Task title'} onCreateItem={handleAddTask}/>
            </CardHeader>
            <CardContent className={'flex flex-col grow gap-6 overflow-auto'}>
                {renderedTasks}
            </CardContent>
            <CardFooter className={'flex flex-col'}>
                <div className={'flex justify-center gap-2'}>
                    <Button variant={filter === 'all' ? 'default' : 'secondary'} onClick={handleAllFilter}>All</Button>
                    <Button variant={filter === 'active' ? 'default' : 'secondary'}
                            onClick={handleActiveFilter}>Active</Button>
                    <Button variant={filter === 'completed' ? 'default' : 'secondary'}
                            onClick={handleCompletedFilter}>Completed</Button>
                    <Button variant={'destructive'} onClick={handleAllTasksDelete}>Delete All</Button>
                </div>
                <div>{date}</div>
            </CardFooter>
        </Card>
    )
}