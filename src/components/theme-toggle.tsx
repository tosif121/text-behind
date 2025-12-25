"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg border transition-all duration-200 bg-background border-border hover:bg-accent">
        <Sun className="w-5 h-5" />
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-lg border transition-all duration-200 bg-background border-border hover:bg-accent hover:scale-105"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative">
        <Sun className={`w-5 h-5 transition-all duration-200 ${
          isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        }`} />
        <Moon className={`absolute inset-0 w-5 h-5 transition-all duration-200 ${
          isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        }`} />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}