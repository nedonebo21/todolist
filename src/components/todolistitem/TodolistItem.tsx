import {FilterValues, Task} from "../../App.tsx";
import {Button} from "../button/Button.tsx";
import './TodolistItem.css'
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    title: string
    tasks: Task[]
    date?: string
    filter: FilterValues
    deleteTask: (payload: { todoListID: string, taskId: string }) => void
    deleteAllTasks: (payload: { todoListID: string }) => void
    addTask: (payload: { todoListID: string, title: string }) => void
    changeTaskStatus: (payload: { todoListID: string, taskId: string, isDone: boolean }) => void
    changeFilter: (payload: { todoListID: string, filter: FilterValues }) => void
    removeTodo: (payload: { todoListID: string }) => void
    todoListID: string
}

export const TodolistItem = (props: Props) => {
    const {
        title,
        tasks,
        date,
        filter,
        deleteTask,
        deleteAllTasks,
        addTask,
        changeTaskStatus,
        changeFilter,
        removeTodo,
        todoListID,
    } = props

    const [error, setError] = useState<string | null>(null)

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
        const deleteTaskHandler = () => {
            deleteTask({
                todoListID: todoListID,
                taskId: task.id
            })
        }
        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = event.currentTarget.checked
            changeTaskStatus({
                todoListID: todoListID,
                taskId: task.id,
                isDone: newStatusValue
            })
        }

        return (
            <li key={task.id}>
                <input type="checkbox" onChange={changeTaskStatusHandler} checked={task.isDone}/>
                <span className={task.isDone ? "is-done" : ""}>{task.title}</span>
                <Button onClick={deleteTaskHandler} title={"x"}/>
            </li>
        )
    })
    const renderedTasks = getFilteredTasks().length === 0 ? <p>Тасок нет</p> : <ul>{tasksList}</ul>

    const [taskTitle, setTaskTitle] = useState('')
    const handleAddTask = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== "") {
            addTask({
                todoListID: props.todoListID,
                title: taskTitle
            })
            setTaskTitle('')
        } else {
            setError("Title is required")
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddTask()
        }
    }
    const handleTodoRemove = () => {
        removeTodo({todoListID: todoListID})
    }

    return (
        <div className="todolist">
            <div className={"container"}>
                <h3>{title}</h3>
                <Button onClick={handleTodoRemove} title={"x"}/>
            </div>
            <div className={"add-tasks"}>
                <input value={taskTitle}
                       className={error ? "error" : ""}
                       onChange={handleChange}
                       onKeyDown={handleKeyDown}/>
                <Button title={"+"} onClick={handleAddTask}></Button>
            </div>
            <div>
                {error ? <div className={"error-message"}>{error}</div> : ''}
            </div>
            {renderedTasks}
            <div className={"buttons"}>
                <Button className={filter === "all" ? "active-filter" : ''} onClick={handleAllFilter}
                        title="All"/>
                <Button className={filter === "active" ? "active-filter" : ''} onClick={handleActiveFilter}
                        title="Active"/>
                <Button className={filter === "completed" ? "active-filter" : ''} onClick={handleCompletedFilter}
                        title="Completed"/>
            </div>
            <Button onClick={handleAllTasksDelete} title="Delete All Tasks"/>
            <div>{date}</div>
        </div>
    )
}