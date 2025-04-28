import {Task} from "../../App.tsx";
import {Button} from "../button/Button.tsx";
import './TodolistItem.css'

type Props = {
    title: string
    tasks: Task[]
    date?: string
}

export const TodolistItem = ({tasks, title, date}: Props) => {
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
                                <button>x</button>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div className={"buttons"}>
                <Button title="All"/>
                <Button title="Active"/>
                <Button title="Completed"/>
            </div>
            <div>{date}</div>
        </div>
    )
}