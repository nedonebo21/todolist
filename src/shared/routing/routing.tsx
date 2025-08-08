import { Route, Routes } from 'react-router'
import { Main } from '@/app/main.tsx'
import { Login } from '@/features/auth/ui/login/login.tsx'

export const Path = {
   Main: '/',
   Login: '/login',
}

export const Routing = () => {
   return (
      <Routes>
         <Route path={Path.Main} element={<Main />} />
         <Route path={Path.Login} element={<Login />} />
      </Routes>
   )
}
