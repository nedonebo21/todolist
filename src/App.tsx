import './App.css'
import {TodolistItem} from "./components/todolistitem/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string
    title: string
    isDone: boolean
}
type TodoListType = {
    id: string
    title: string
    filter: FilterValues
}
export type FilterValues = "all" | "active" | "completed"

export const App = () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListID1, title: "what to learn", filter: "all"},
        {id: todoListID2, title: "what to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "TS", isDone: false},
            {id: v1(), title: "RTK Query", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Headphones", isDone: true},
            {id: v1(), title: "glasses", isDone: false},
            {id: v1(), title: "Chair", isDone: false},
        ],
    })

    const deleteTask = (payload:{todoListID: string, taskId: string}) => {
        const {todoListID, taskId} = payload
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].filter(el => el.id !== taskId)
        })
    }
    const deleteAllTasks = (payload:{todoListID: string}) => {
        const {todoListID} = payload
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].filter(el => el !== el)
        })
    }

    const addTask = (payload:{todoListID: string, title: string}) => {
        const {todoListID, title} = payload
        const newTask = {id: v1(), title, isDone: false}
        setTasks({
            ...tasks,
            [todoListID]: [newTask, ...tasks[todoListID]]
        })
    }

    const changeTaskStatus = (payload:{todoListID: string, taskId: string, isDone: boolean}) => {
        const {todoListID, taskId, isDone} = payload
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID]
                .map(el => el.id === taskId ? {...el, isDone} : el)
        })
    }
    const changeFilter = (payload:{todoListID: string, filter: FilterValues}) => {
        const {todoListID, filter} = payload
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter} : el))
    }
    const removeTodo = (payload:{todoListID: string}) => {
        const {todoListID} = payload
        setTodoLists(todoLists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
    }


    return (
        <div className="app">
            {todoLists.map(el => {
                return (
                    <TodolistItem
                        tasks={tasks[el.id]}
                        key={el.id}
                        todoListID={el.id}
                        deleteAllTasks={deleteAllTasks}
                        deleteTask={deleteTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeFilter={changeFilter}
                        removeTodo={removeTodo}
                        filter={el.filter}
                        title={el.title}
                        date="21.04.2025"/>
                )
            })}

        </div>
    )
}




