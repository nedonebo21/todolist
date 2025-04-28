import {FilterValues, Task} from "../../App.tsx";
import {Button} from "../button/Button.tsx";
import './TodolistItem.css'
import {useState} from "react";

type Props = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: number) => void
    deleteAllTasks: () => void
}

export const TodolistItem = ({tasks, title, date, deleteTask,deleteAllTasks}: Props) => {
    const [filter, setFilter] = useState<FilterValues>("all")
    let filteredTasks = tasks

    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === "completed"){
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div className={"add-tasks"}>
                <input/>
                <button>+</button>
            </div>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {filteredTasks.map(task => {
                        // debugger
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button onClick={() => deleteTask(task.id)} title={"x"}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div className={"buttons"}>
                <Button onClick={() => changeFilter("all")} title="All"/>
                <Button onClick={() => changeFilter("active")} title="Active"/>
                <Button onClick={() => changeFilter("completed")} title="Completed"/>
            </div>
            <Button onClick={() => deleteAllTasks()} title="Delete All Tasks"/>
            <div>{date}</div>
        </div>
    )
}