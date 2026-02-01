import { useState } from 'react'
import { useTimers } from '../context/TimerContext'

export default function Timer() {
  const { timers, addTimer, removeTimer, toggleTimer, formatTime } = useTimers()
  const [newMinutes, setNewMinutes] = useState(5)
  const [newLabel, setNewLabel] = useState('')

  const handleAdd = () => {
    addTimer(newLabel, newMinutes)
    setNewLabel('')
  }

  return (
    <>
      <h1 className="font-display font-bold text-2xl text-pinch-ink mb-6">Kitchen Timer</h1>

      <div className="bg-white border border-pinch-warm rounded-xl p-4 shadow-sm mb-6 max-w-sm">
        <p className="text-sm text-pinch-ink-light mb-3">Add a timer</p>
        <div className="flex flex-wrap gap-2 items-end">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-pinch-ink-light">Minutes</span>
            <input
              type="number"
              min={1}
              max={120}
              value={newMinutes}
              onChange={(e) => setNewMinutes(Math.max(1, Math.min(120, parseInt(e.target.value, 10) || 1)))}
              className="w-20 px-3 py-2 border border-pinch-warm rounded-lg bg-pinch-cream text-pinch-ink focus:outline-none focus:ring-2 focus:ring-pinch-terracotta/50"
            />
          </label>
          <label className="flex flex-col gap-1 flex-1 min-w-[120px]">
            <span className="text-xs text-pinch-ink-light">Label (optional)</span>
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="e.g. Pasta"
              className="w-full px-3 py-2 border border-pinch-warm rounded-lg bg-pinch-cream text-pinch-ink focus:outline-none focus:ring-2 focus:ring-pinch-terracotta/50"
            />
          </label>
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-lg bg-pinch-terracotta text-white font-medium hover:bg-pinch-terracotta-dark transition-colors"
          >
            Start
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {timers.length === 0 && (
          <p className="text-pinch-ink-light">No timers running. Add one above.</p>
        )}
        {timers.map((t) => (
          <div
            key={t.id}
            className={`flex items-center justify-between gap-4 p-4 rounded-xl border ${
              t.remainingSeconds === 0 ? 'bg-pinch-herb/10 border-pinch-herb' : 'bg-white border-pinch-warm'
            } shadow-sm`}
          >
            <div className="min-w-0">
              <p className="font-medium text-pinch-ink truncate">{t.label}</p>
              <p className={`text-2xl font-mono font-bold ${t.remainingSeconds === 0 ? 'text-pinch-herb' : 'text-pinch-ink'}`}>
                {formatTime(t.remainingSeconds)}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => toggleTimer(t.id)}
                disabled={t.remainingSeconds === 0}
                className="px-3 py-1.5 rounded-lg bg-pinch-warm text-pinch-ink text-sm font-medium hover:bg-pinch-warm/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.running ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={() => removeTimer(t.id)}
                className="px-3 py-1.5 rounded-lg text-pinch-ink-light text-sm hover:bg-pinch-warm hover:text-pinch-ink"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
