import { ReactNode } from "react"
import { ThemeProvider } from "./theme/theme-provider"
import { Toaster } from "@/shared/ui/shadcn/sonner.tsx"
import { Provider } from "react-redux"
import { store } from "@/app/store.ts"

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
        <Toaster/>
      </ThemeProvider>
    </Provider>
  )
}
