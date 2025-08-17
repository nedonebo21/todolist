import { Route, Routes } from 'react-router'
import { Main } from '@/app/main.tsx'
import { PageNotFound } from '@/shared/ui/page-not-found/page-not-found.tsx'
import { Login } from '@/features/auth'
import { useAppSelector } from '@/shared/lib/hooks'
import { selectIsLoggedIn } from '@/features/auth/model/auth-slice.ts'
import { ProtectedRoute } from './protected-route'

export const Path = {
   Main: '/',
   Login: '/login',
   NotFound: '*',
}

export const Routing = () => {
   const isLoggedIn = useAppSelector(selectIsLoggedIn)
   return (
      <Routes>
         <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
            <Route path={Path.Main} element={<Main />} />
         </Route>
         <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>
            <Route path={Path.Login} element={<Login />} />
         </Route>
         <Route path={Path.NotFound} element={<PageNotFound />} />
      </Routes>
   )
}
