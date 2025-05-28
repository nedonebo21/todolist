import {FilterValues, Task} from "../../App.tsx";
import {Button} from "../button/Button.tsx";
import './todolist-item.css'
import {ChangeEvent} from "react";
import {AddItemForm} from "./add-item-form/add-item-form.tsx";
import {EditableSpan} from "./editable-span/editable-span.tsx";

type Props = {
    todoTitle: string
    tasks: Task[]
    date?: string
    filter: FilterValues
    deleteTask: (payload: { todoListID: string, taskId: string }) => void
    deleteAllTasks: (payload: { todoListID: string }) => void
    addTask: (payload: { todoListID: string, title: string }) => void
    changeTaskStatus: (payload: { todoListID: string, taskId: string, isDone: boolean }) => void
    changeFilter: (payload: { todoListID: string, filter: FilterValues }) => void
    removeTodo: (payload: { todoListID: string }) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodoTitle: (todolistId: string, title: string) => void
    todoListID: string
}

export const TodolistItem = (props: Props) => {
    const {
        todoTitle,
        tasks,
        date,
        filter,
        deleteTask,
        deleteAllTasks,
        addTask,
        changeTaskStatus,
        changeFilter,
        changeTaskTitle,
        changeTodoTitle,
        removeTodo,
        todoListID,
    } = props

    const getFilteredTasks = () => {
        let filteredTasks = tasks
        if (filter === "active") {
            return (tasks.filter(task => !task.isDone))
        }
        if (filter === "completed") {
            return (tasks.filter(task => task.isDone))
        }
        return filteredTasks
    }

    const handleAllTasksDelete = () => deleteAllTasks({todoListID: todoListID})

    const handleAllFilter = () =>
        changeFilter({
            todoListID: todoListID,
            filter: "all"
        })
    const handleActiveFilter = () =>
        changeFilter({
            todoListID: todoListID,
            filter: "active"
        })
    const handleCompletedFilter = () =>
        changeFilter({
            todoListID: todoListID,
            filter: "completed"
        })


    const tasksList = getFilteredTasks().map(task => {
        const deleteTaskHandler = () => {
            deleteTask({
                todoListID: todoListID,
                taskId: task.id
            })
        }
        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = event.currentTarget.checked
            changeTaskStatus({
                todoListID: todoListID,
                taskId: task.id,
                isDone: newStatusValue
            })
        }

        const handleTaskTitleChange = (title: string) => {
            changeTaskTitle(todoListID, task.id, title)
        }

        return (
            <li className={task.isDone ? "is-done" : ""} key={task.id}>
                <input type="checkbox" onChange={changeTaskStatusHandler} checked={task.isDone}/>
                <EditableSpan value={task.title} onChange={handleTaskTitleChange} />
                <Button onClick={deleteTaskHandler} title={"x"}/>
            </li>
        )
    })
    const renderedTasks = getFilteredTasks().length === 0 ? <p>Тасок нет</p> : <ul>{tasksList}</ul>

    const handleAddTask = (title:string) => {
        addTask({todoListID: todoListID, title: title})
    }

    const handleTodoRemove = () => {
        removeTodo({todoListID: todoListID})
    }

    const handleTodoTitleChange = (title: string) => {
        changeTodoTitle(todoListID, title)
    }

    return (
        <div className="todolist">
            <div className={"container"}>
                <EditableSpan value={todoTitle} onChange={handleTodoTitleChange} />
                <Button onClick={handleTodoRemove} title={"x"}/>
            </div>
            <AddItemForm onCreateItem={handleAddTask}/>
            {renderedTasks}
            <div className={"buttons"}>
                <Button className={filter === "all" ? "active-filter" : ''} onClick={handleAllFilter}
                        title="All"/>
                <Button className={filter === "active" ? "active-filter" : ''} onClick={handleActiveFilter}
                        title="Active"/>
                <Button className={filter === "completed" ? "active-filter" : ''} onClick={handleCompletedFilter}
                        title="Completed"/>

            </div>
            <Button className={'delete-all'} onClick={handleAllTasksDelete} title="Delete All Tasks"/>
            <div>{date}</div>
        </div>
    )
}