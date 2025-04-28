import {FilterValues, Task} from "../../App.tsx";
import {Button} from "../button/Button.tsx";
import './TodolistItem.css'

type Props = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: number) => void
    changeFilter: (filter: FilterValues) => void
}

export const TodolistItem = ({tasks, title, date, deleteTask, changeFilter}: Props) => {
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div className={"add-tasks"}>
                <input/>
                <button>+</button>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
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
            <div>{date}</div>
        </div>
    )
}