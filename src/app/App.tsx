import { Header } from '@/components/header/header.tsx'
import { DomainTask } from '@/features/todolists/api'
import { Routing } from '@/shared/routing'

export type TasksState = Record<string, DomainTask[]>

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
   return (
      <div className="app">
         <Header />
         <Routing />
      </div>
   )
}
