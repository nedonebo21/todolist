import { Header } from '@/components/header/header.tsx'
import { DomainTask } from '@/features/todolists/api'
import { Routing } from '@/shared/routing'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useEffect, useState } from 'react'
import { initializeAppTC } from '@/features/auth/model/auth-slice.ts'
import { Progress } from '@/shared/ui/shadcn/progress.tsx'

export type TasksState = Record<string, DomainTask[]>

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
   const [isInitialized, setIsInitialized] = useState(false)
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(initializeAppTC()).finally(() => {
         setIsInitialized(true)
      })
   }, [])
   if (!isInitialized) {
      return <Progress />
   }
   return (
      <div className="app">
         <Header />
         <Routing />
      </div>
   )
}
