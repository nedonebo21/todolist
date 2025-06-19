import {TodolistItem} from "../components/todolistitem/todolist-item.tsx";
import {AddItemForm} from "../components/todolistitem/add-item-form/add-item-form.tsx";
import {
    changeTaskStatusAC,
    changeTaskTitleAC, createTaskAC,
    deleteAllTasksAC,
    deleteTaskAC,
} from "../model/tasks-reducer.ts";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
} from "../model/todolist-reducer.ts";
import {Header} from "@/components/header/header.tsx";
import {useAppSelector} from "@/shared/lib/hooks/use-app-selector.ts";
import {selectTodolists} from "@/model/selectors/todolists-selectors.ts";
import {selectTasks} from "@/model/selectors/tasks-selectors.ts";
import {useAppDispatch} from "@/shared/lib/hooks/use-app-dispatch.ts";

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
    const todoLists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }
    const deleteAllTasks = (todolistId: string) => {
        dispatch(deleteAllTasksAC({todolistId}))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }
    const removeTodo = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }
    const addTodoList = (title: string) => {
        const action = createTodolistAC(title)
        dispatch(action)
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }
    const changeTodoTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
    }


    return (
        <div className="app">
            <Header>
                <AddItemForm placeholderValue={'Type your Todolist title'} onCreateItem={addTodoList}/>
            </Header>
            <div className={'container mx-auto max-w-2xl'}>

                <div className={'flex justify-center gap-3 flex-wrap'}>
                    {todoLists.map(el => {
                        return (
                            <TodolistItem
                                tasks={tasks[el.id]}
                                key={el.id}
                                todolistId={el.id}
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
        </div>
    )
}




