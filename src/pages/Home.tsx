import { Link } from 'react-router-dom'
import { useTimers } from '../context/TimerContext'

const tools = [
  {
    to: '/convert',
    title: 'Unit Converter',
    description: 'Convert cups, tablespoons, grams, ounces & temperatures.',
    icon: '📐',
  },
  {
    to: '/scale',
    title: 'Recipe Scaler',
    description: 'Scale recipes up or down by changing the number of servings.',
    icon: '📋',
  },
  {
    to: '/timer',
    title: 'Kitchen Timer',
    description: 'One or more timers so nothing gets forgotten.',
    icon: '⏱️',
  },
  {
    to: '/reference',
    title: 'Measurement Reference',
    description: 'Pinch, dash, smidgen & other cooking measures.',
    icon: '📏',
  },
  {
    to: '/substitutions',
    title: 'Common Substitutions',
    description: 'Out of something? Swap with these common ingredient substitutes.',
    icon: '🔄',
  },
]

export default function Home() {
  const { timers, formatTime } = useTimers()
  const activeCount = timers.filter((t) => t.remainingSeconds > 0).length
  const hasActiveTimers = timers.length > 0

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-pinch-ink mb-2">
          A pinch of help in the kitchen
        </h1>
        <p className="text-pinch-ink-light text-lg">
          Quick tools for converting, scaling, timing & reference.
        </p>
      </div>

      {hasActiveTimers && (
        <Link
          to="/timer"
          className="block mb-6 p-4 rounded-xl bg-white border border-pinch-terracotta/40 shadow-sm hover:shadow-md hover:border-pinch-terracotta/60 transition-all text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden>⏱️</span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-pinch-ink">
                {timers.length === 1 ? '1 timer' : `${timers.length} timers`}
                {activeCount === 0 && timers.length > 0 && ' — all done'}
              </p>
              <p className="text-sm text-pinch-ink-light mt-0.5">
                {timers
                  .slice(0, 3)
                  .map((t) => `${t.label} ${formatTime(t.remainingSeconds)}${t.remainingSeconds === 0 ? ' ✓' : ''}`)
                  .join(' · ')}
                {timers.length > 3 && ` · +${timers.length - 3} more`}
              </p>
            </div>
            <span className="text-pinch-terracotta text-sm font-medium shrink-0">Open timer →</span>
          </div>
        </Link>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.to}
            to={tool.to}
            className="block p-6 rounded-xl bg-white border border-pinch-warm shadow-sm hover:shadow-md hover:border-pinch-terracotta/30 transition-all text-left group"
          >
            <span className="text-3xl mb-3 block" aria-hidden>{tool.icon}</span>
            <h2 className="font-display font-semibold text-lg text-pinch-ink group-hover:text-pinch-terracotta transition-colors">
              {tool.title}
            </h2>
            <p className="text-pinch-ink-light text-sm mt-1">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </>
  )
}
