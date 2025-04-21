import './App.css'
import {TodolistItem} from "./components/todolistitem/TodolistItem.tsx";

function App() {
    return (
        <div className="app">
            <TodolistItem/>
            <TodolistItem/>
            <TodolistItem/>
        </div>
    )
}

export default App
