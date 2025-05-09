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
}

export const TodolistItem = ({tasks, title, date, deleteTask, deleteAllTasks, addTask}: Props) => {
    const [filter, setFilter] = useState<FilterValues>("all")
    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === "completed"){
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const deleteAllTasksHandler = () => deleteAllTasks()

    const allClickHandler = () => changeFilter("all")
    const activeClickHandler = () => changeFilter("active")
    const completeClickHandler = () => changeFilter("completed")

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }
    const tasksList = filteredTasks.map(task => {
        const deleteTaskHandler = () => {
            deleteTask(task.id)
        }

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <Button onClick={deleteTaskHandler} title={"x"}/>
            </li>
        )
    })
    const renderedTasks = tasks.length ? <ul>{tasksList}</ul> : <p>Тасок нет</p>

    const [taskTitle, setTaskTitle] = useState('')
    const onClickAddTask = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value)
    }
    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isBtnDisabled){
            onClickAddTask()
        }
    }
    const isBtnDisabled = taskTitle === '' || taskTitle.length > 18
    const inputCheck =
        taskTitle.length > 18 ? <span style={{color: "red"}}>Your title is out of range</span> :
            !taskTitle.length ? <span style={{color: "orange"}}>Write your task title</span> :
                <span style={{color: "yellowgreen"}}>Enter Your title</span>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div className={"add-tasks"}>
                <input value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button disabled={isBtnDisabled} onClick={onClickAddTask}>+</button>
            </div>
            <div>
                {inputCheck}
            </div>
            {renderedTasks}
            <div className={"buttons"}>
                <Button onClick={allClickHandler} title="All"/>
                <Button onClick={activeClickHandler} title="Active"/>
                <Button onClick={completeClickHandler} title="Completed"/>
            </div>
            <Button onClick={deleteAllTasksHandler} title="Delete All Tasks"/>
            <div>{date}</div>
        </div>
    )
}