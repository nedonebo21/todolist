import type { ReactNode } from "react"

import type { Theme } from "@/shared/lib/theme"

import { useEffect, useState } from "react"

import { DEFAULT_THEME, THEME_KEY, ThemeContext } from "@/shared/lib/theme"

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export const ThemeProvider = ({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = THEME_KEY,
  ...rest
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

      root.classList.add(systemTheme)

      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    theme,
  }

  return (
    <ThemeContext.Provider {...rest} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
