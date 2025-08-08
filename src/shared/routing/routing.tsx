import { Route, Routes } from 'react-router'
import { Main } from '@/app/main.tsx'
import { PageNotFound } from '@/shared/ui/page-not-found/page-not-found.tsx'
import { Login } from '@/features/auth'

export const Path = {
   Main: '/',
   Login: '/login',
   NotFound: '*',
}

export const Routing = () => {
   return (
      <Routes>
         <Route path={Path.Main} element={<Main />} />
         <Route path={Path.Login} element={<Login />} />
         <Route path={Path.NotFound} element={<PageNotFound />} />
      </Routes>
   )
}
