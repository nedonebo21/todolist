import { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Path } from '@/shared/routing/routing.tsx'

type Props = {
   children?: ReactNode
   isAllowed: boolean
   redirectPath?: string
}

export const ProtectedRoute = ({ children, isAllowed, redirectPath = Path.Login }: Props) => {
   if (!isAllowed) {
      return <Navigate to={redirectPath} />
   }
   return children ? children : <Outlet />
}
