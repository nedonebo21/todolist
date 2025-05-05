import './App.css'
import {TodolistItem} from "./components/todolistitem/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValues = "all" | "active" | "completed"

export const App = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "TS", isDone: false},
        {id: v1(), title: "RTK Query", isDone: false},
    ])

    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks
            .filter(task => task.id !== taskId)
        setTasks(filteredTasks);
    }
    const deleteAllTasks = () => {
        setTasks(tasks.filter(task => task != task))
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }



    return (
        <div className="app">
            <TodolistItem
                tasks={tasks}
                deleteAllTasks={deleteAllTasks}
                deleteTask={deleteTask}
                addTask={addTask}
                title="What to learn"
                date="21.04.2025"/>
        </div>
    )
}




