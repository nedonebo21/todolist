import {Header} from "@/components/header/header.tsx";
import {Main} from "@/app/main.tsx";

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
    return (
        <div className="app">
            <Header/>
            <Main/>
        </div>
    )
}




