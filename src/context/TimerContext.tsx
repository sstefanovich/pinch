import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export interface TimerState {
  id: string
  label: string
  totalSeconds: number
  remainingSeconds: number
  running: boolean
}

interface TimerContextValue {
  timers: TimerState[]
  addTimer: (label: string, minutes: number) => void
  removeTimer: (id: string) => void
  toggleTimer: (id: string) => void
  formatTime: (seconds: number) => string
}

const TimerContext = createContext<TimerContextValue | null>(null)

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timers, setTimers] = useState<TimerState[]>([])

  const tick = useCallback(() => {
    setTimers((prev) =>
      prev.map((t) =>
        t.running && t.remainingSeconds > 0
          ? { ...t, remainingSeconds: t.remainingSeconds - 1 }
          : t
      )
    )
  }, [])

  useEffect(() => {
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [tick])

  const addTimer = useCallback((label: string, minutes: number) => {
    const total = minutes * 60
    setTimers((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: label.trim() || 'Timer',
        totalSeconds: total,
        remainingSeconds: total,
        running: true,
      },
    ])
  }, [])

  const toggleTimer = useCallback((id: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, running: !t.running } : t))
    )
  }, [])

  const removeTimer = useCallback((id: string) => {
    setTimers((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const value: TimerContextValue = {
    timers,
    addTimer,
    removeTimer,
    toggleTimer,
    formatTime,
  }

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  )
}

export function useTimers() {
  const ctx = useContext(TimerContext)
  if (!ctx) throw new Error('useTimers must be used within TimerProvider')
  return ctx
}
