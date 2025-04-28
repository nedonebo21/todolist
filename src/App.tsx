import './App.css'
import {TodolistItem} from "./components/todolistitem/TodolistItem.tsx";
import {useState} from "react";

export type Task = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValues = "all" | "active" | "completed"

export const App = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "TS", isDone: false},
        {id: 6, title: "RTK Query", isDone: false},
    ])

    const deleteTask = (taskId: number) => {
        const filteredTasks = tasks
            .filter(task => task.id !== taskId)
        setTasks(filteredTasks);
    }

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
        <div className="app">
            <TodolistItem changeFilter={changeFilter} deleteTask={deleteTask} tasks={filteredTasks} title="What to learn" date="21.04.2025"/>
        </div>
    )
}




