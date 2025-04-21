import './App.css'
import {TodolistItem} from "./components/todolistitem/TodolistItem.tsx";

export const App = () => {
    return (
        <div className="app">
            <TodolistItem/>
            <TodolistItem/>
            <TodolistItem/>
        </div>
    )
}
