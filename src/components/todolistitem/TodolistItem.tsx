import {FilterValues, Task} from "../../App.tsx";
import {Button} from "../button/Button.tsx";
import './TodolistItem.css'
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: string) => void
    deleteAllTasks: () => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodolistItem = ({tasks, title, date, deleteTask, deleteAllTasks, addTask, changeTaskStatus}: Props) => {
    const [filter, setFilter] = useState<FilterValues>("all")
    const [error, setError] = useState<string | null>(null)

    const getFilteredTasks = () => {
        let filteredTasks = tasks
        if (filter === "active") {
            return (filteredTasks = tasks.filter(task => !task.isDone))
        }
        if (filter === "completed"){
            return (filteredTasks = tasks.filter(task => task.isDone))
        }
        return filteredTasks
    }

    const deleteAllTasksHandler = () => deleteAllTasks()

    const allClickHandler = () => changeFilter("all")
    const activeClickHandler = () => changeFilter("active")
    const completeClickHandler = () => changeFilter("completed")

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }


    const tasksList = getFilteredTasks().map(task => {
        const deleteTaskHandler = () => {
            deleteTask(task.id)
        }
        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = event.currentTarget.checked
            changeTaskStatus(task.id, newStatusValue)
        }

        return (
            <li key={task.id}>
                <input type="checkbox" onChange={changeTaskStatusHandler} checked={task.isDone}/>
                <span className={task.isDone ? "is-done" : ""}>{task.title}</span>
                <Button onClick={deleteTaskHandler} title={"x"}/>
            </li>
        )
    })
    const renderedTasks = tasks.length ? <ul>{tasksList}</ul> : <p>Тасок нет</p>

    const [taskTitle, setTaskTitle] = useState('')
    const clickAddTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== "") {
            addTask(taskTitle)
            setTaskTitle('')
        } else {
            setError("Title is required")
        }
    }
    const ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const KeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"){
            clickAddTaskHandler()
        }
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div className={"add-tasks"}>
                <input value={taskTitle}
                       className={error ? "error" : ""}
                       onChange={ChangeHandler}
                       onKeyDown={KeyDownHandler}/>
                <Button title={"+"} onClick={clickAddTaskHandler}></Button>
            </div>
            <div>
                {error ? <div className={"error-message"}>{error}</div> : ''}
            </div>
            {renderedTasks}
            <div className={"buttons"}>
                <Button className={filter === "all" ? "active-filter" : ''} onClick={allClickHandler} title="All"/>
                <Button className={filter === "active" ? "active-filter" : ''}  onClick={activeClickHandler} title="Active"/>
                <Button className={filter === "completed" ? "active-filter" : ''} onClick={completeClickHandler} title="Completed"/>
            </div>
            <Button onClick={deleteAllTasksHandler} title="Delete All Tasks"/>
            <div>{date}</div>
        </div>
    )
}