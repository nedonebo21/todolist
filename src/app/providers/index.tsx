import { ReactNode } from 'react'
import { ThemeProvider } from './theme/theme-provider'
import { Toaster } from '@/shared/ui/shadcn/sonner.tsx'

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider>
            {children}
            <Toaster/>
        </ThemeProvider>
    )
}