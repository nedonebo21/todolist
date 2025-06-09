import { createContext, useContext } from 'react'

export type Theme = 'dark' | 'light' | 'system'

export const THEME_KEY = 'theme'

export const DEFAULT_THEME: Theme = 'system'

type ThemeContextState = {
    setTheme: (theme: Theme) => void
    theme: Theme
}

const initialState: ThemeContextState = {
    setTheme: () => null,
    theme: DEFAULT_THEME,
}

export const ThemeContext = createContext<ThemeContextState>(initialState)

export const useTheme = () => {
    const context = useContext(ThemeContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}
