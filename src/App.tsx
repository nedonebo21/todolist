import './App.css'
import {TodolistItem} from "./components/todolistitem/todolist-item.tsx";
import {useReducer} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/todolistitem/add-item-form/add-item-form.tsx";
import {
    addTaskAC, addTasksNewTodoAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteAllTasksAC,
    deleteTaskAC, deleteTasksAfterTodoAC,
    TasksReducer
} from "./reducers/tasks-reducer.ts";
import {
    addTodoAC,
    changeFilterAC,
    changeTodoTitleAC,
    deleteTodoAC,
    TodolistReducer
} from "./reducers/todolist-reducer.ts";

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValues
}
export type TasksState = Record<string, Task[]>

export type FilterValues = "all" | "active" | "completed"

export const App = () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const [todoLists, dispatchTodoLists] = useReducer(TodolistReducer,[
        {id: todoListID1, title: "what to learn", filter: "all"},
        {id: todoListID2, title: "what to buy", filter: "all"},
    ])
    const [tasks, dispatchTasks] = useReducer(TasksReducer,{
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

    const deleteTask = (payload: { todoListID: string, taskId: string }) => {
        const {todoListID, taskId} = payload
        dispatchTasks(deleteTaskAC(todoListID, taskId))
    }
    const deleteAllTasks = (payload: { todoListID: string }) => {
        const {todoListID} = payload
        dispatchTasks(deleteAllTasksAC(todoListID))
    }

    const addTask = (payload: { todoListID: string, title: string }) => {
        const {todoListID, title} = payload
        dispatchTasks(addTaskAC(todoListID, title))
    }

    const changeTaskStatus = (payload: { todoListID: string, taskId: string, isDone: boolean }) => {
        const {todoListID, taskId, isDone} = payload
        dispatchTasks(changeTaskStatusAC(todoListID, taskId, isDone))
    }

    const changeFilter = (payload: { todoListID: string, filter: FilterValues }) => {
        const {todoListID, filter} = payload
        dispatchTodoLists(changeFilterAC(todoListID, filter))
    }
    const removeTodo = (payload: { todoListID: string }) => {
        const {todoListID} = payload
        dispatchTodoLists(deleteTodoAC(todoListID))
        dispatchTasks(deleteTasksAfterTodoAC(todoListID))
    }
    const addTodoList = (title: string) => {
        const newTodoId = v1()
        const newTodo: TodoListType = {id: newTodoId, title, filter: 'all'}
        dispatchTodoLists(addTodoAC(newTodo))
        dispatchTasks(addTasksNewTodoAC(newTodoId))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(todolistId,taskId, title))
    }
    const changeTodoTitle = (todolistId: string, title: string) => {
        dispatchTodoLists(changeTodoTitleAC(todolistId, title))
    }


    return (
        <div className="app">
            <AddItemForm onCreateItem={addTodoList}/>
            <div className={'todolist-wrapper'}>
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
                            changeTaskTitle={changeTaskTitle}
                            changeTodoTitle={changeTodoTitle}
                            removeTodo={removeTodo}
                            filter={el.filter}
                            todoTitle={el.title}
                            date="21.04.2025"/>
                    )
                })}
            </div>

        </div>
    )
}




