import { Button } from '@/shared/ui/shadcn/button.tsx'
import { ThemeToggle } from '@/features/theme-toggle'
import { Progress } from '@/shared/ui/shadcn/progress.tsx'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { selectIsLoggedIn, selectStatus, setIsLoggedInAC } from '@/app/app-slice.ts'
import { useEffect, useState } from 'react'
import { useLogoutMutation } from '@/features/auth/api/auth-api.ts'
import { AUTH_TOKEN } from '@/shared/constants'
import { ResultCode } from '@/shared/enums'
import { baseApi } from '@/app/base-api.ts'

export const Header = () => {
   const [progress, setProgress] = useState(13)

   const isLoggedIn = useAppSelector(selectIsLoggedIn)
   const status = useAppSelector(selectStatus)

   const [logout] = useLogoutMutation()

   const dispatch = useAppDispatch()

   const handleSignOut = () => {
      logout()
         .then(res => {
            if (res.data?.resultCode === ResultCode.Success) {
               dispatch(setIsLoggedInAC({ isLoggedIn: false }))
               localStorage.removeItem(AUTH_TOKEN)
            }
         })
         .then(() => {
            dispatch(baseApi.util.invalidateTags(['Todolist', 'Task']))
         })
   }

   useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 300)
      return () => clearTimeout(timer)
   }, [])

   return (
      <header className={'sticky top-0 z-10 w-full border-b mb-5 bg-transparent backdrop-blur-sm'}>
         <div className={'container flex gap-6 h-16 items-center justify-between mx-auto px-4'}>
            <div className={'text-xl font-bold justify-self-start'}>Todolist by nedonebo21</div>
            <div className={'justify-self-end'}>
               <div className={'flex items-center gap-4'}>
                  {isLoggedIn && <Button onClick={handleSignOut}>Sign out</Button>}
                  <ThemeToggle />
               </div>
            </div>
         </div>
         {status === 'pending' && <Progress className={'absolute'} value={progress} />}
      </header>
   )
}
