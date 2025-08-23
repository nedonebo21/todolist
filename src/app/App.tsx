import { Header } from '@/components/header/header.tsx'
import { DomainTask } from '@/features/todolists/api'
import { Routing } from '@/shared/routing'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useEffect, useState } from 'react'
import { Progress } from '@/shared/ui/shadcn/progress.tsx'
import { useMeQuery } from '@/features/auth/api/auth-api.ts'
import { ResultCode } from '@/shared/enums'
import { setIsLoggedInAC } from '@/app/app-slice.ts'

export type TasksState = Record<string, DomainTask[]>

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
   const [isInitialized, setIsInitialized] = useState(false)
   const dispatch = useAppDispatch()

   const { data, isLoading } = useMeQuery()

   useEffect(() => {
      if (isLoading) return
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
         dispatch(setIsLoggedInAC({ isLoggedIn: true }))
      }
   }, [isLoading])

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
