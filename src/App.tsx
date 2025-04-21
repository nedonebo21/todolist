import './App.css'
import {TodolistItem} from "./components/todolistitem/TodolistItem.tsx";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {
    const tasks1: Task[] = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "TS", isDone: false},
        {id: 6, title: "RTK Query", isDone: false},
    ]

    return (
        <div className="app">
            <TodolistItem tasks={tasks1} title="What to learn" date="21.04.2025"/>
        </div>
    )
}
