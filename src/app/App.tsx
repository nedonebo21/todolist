import { Header } from '@/components/header/header.tsx'
import { DomainTask } from '@/features/todolists/api'
import { Routing } from '@/shared/routing'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useEffect } from 'react'
import { initializeAppTC } from '@/features/auth/model/auth-slice.ts'

export type TasksState = Record<string, DomainTask[]>

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
   const dispatch = useAppDispatch()
   useEffect(() => {
      dispatch(initializeAppTC())
   }, [])
   return (
      <div className="app">
         <Header />
         <Routing />
      </div>
   )
}
