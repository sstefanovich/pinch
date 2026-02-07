import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react'

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

function playCompletionSound(timer: TimerState) {
  const isNamed = timer.label && timer.label !== 'Timer'
  if (isNamed) {
    const utterance = new SpeechSynthesisUtterance(`${timer.label} has completed`)
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  } else {
    try {
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = 880
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.2, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.3)
    } catch {
      // AudioContext blocked (e.g. autoplay policy) — no fallback
    }
  }
}

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timers, setTimers] = useState<TimerState[]>([])
  const notifiedIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    const ids = new Set(timers.map((t) => t.id))
    for (const id of Array.from(notifiedIds.current)) {
      if (!ids.has(id)) notifiedIds.current.delete(id)
    }
    for (const t of timers) {
      if (t.remainingSeconds === 0 && !notifiedIds.current.has(t.id)) {
        notifiedIds.current.add(t.id)
        playCompletionSound(t)
      }
    }
  }, [timers])

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
