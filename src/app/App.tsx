import { Header } from '@/components/header/header.tsx'
import { Main } from '@/app/main.tsx'
import { DomainTask } from '@/features/todolists/api'
export type TodoListType = {
   id: string
   title: string
   filter: FilterValues
}
export type TasksState = Record<string, DomainTask[]>

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
   return (
      <div className="app">
         <Header />
         <Main />
      </div>
   )
}
