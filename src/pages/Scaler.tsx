import { useState } from 'react'

interface Line {
  id: string
  text: string
  amount?: number
  unit?: string
  rest?: string
}

// Match "number + unit" at start: 1 cup, 2 tbsp, 1/2 tsp, 250 g, etc.
const AMOUNT_REGEX = /^(\d+\/\d+|\d+\.?\d*)\s*(\w+)\s+(.*)$/

function parseLine(line: string): { amount: number; unit: string; rest: string } | null {
  const trimmed = line.trim()
  const match = trimmed.match(AMOUNT_REGEX)
  if (!match) return null
  const [, amountStr, unit, rest] = match
  let amount: number
  if (amountStr!.includes('/')) {
    const [a, b] = amountStr!.split('/').map(Number)
    amount = a / b
  } else {
    amount = parseFloat(amountStr!)
  }
  if (!Number.isFinite(amount)) return null
  return { amount, unit, rest: rest ?? '' }
}

function scaleAmount(amount: number, fromServings: number, toServings: number): number {
  if (fromServings <= 0) return amount
  return (amount * toServings) / fromServings
}

function formatAmount(n: number): string {
  if (n >= 1 && n < 100 && Math.abs(n - Math.round(n)) < 0.01) return String(Math.round(n))
  if (n < 1 && n > 0) {
    // Common fractions
    const fracs: [number, string][] = [[1/4, '1/4'], [1/3, '1/3'], [1/2, '1/2'], [2/3, '2/3'], [3/4, '3/4']]
    for (const [val, str] of fracs) {
      if (Math.abs(n - val) < 0.05) return str
    }
  }
  return n.toFixed(2).replace(/\.?0+$/, '')
}

export default function Scaler() {
  const [fromServings, setFromServings] = useState(4)
  const [toServings, setToServings] = useState(6)
  const [input, setInput] = useState(`2 cups flour
1 tsp salt
1/2 cup butter
2 eggs`)

  const lines = input.split('\n').filter(Boolean)
  const parsed: Line[] = lines.map((text, i) => {
    const p = parseLine(text)
    if (p) {
      const scaled = scaleAmount(p.amount, fromServings, toServings)
      return {
        id: `${i}-${text}`,
        text,
        amount: scaled,
        unit: p.unit,
        rest: p.rest,
      }
    }
    return { id: `${i}-${text}`, text }
  })

  return (
    <>
      <h1 className="font-display font-bold text-2xl text-pinch-ink mb-6">Recipe Scaler</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <label className="flex items-center gap-2">
          <span className="text-pinch-ink-light">Original servings</span>
          <input
            type="number"
            min={1}
            value={fromServings}
            onChange={(e) => setFromServings(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-20 px-3 py-2 border border-pinch-warm rounded-lg bg-pinch-cream text-pinch-ink focus:outline-none focus:ring-2 focus:ring-pinch-terracotta/50"
          />
        </label>
        <span className="text-pinch-ink-light">→</span>
        <label className="flex items-center gap-2">
          <span className="text-pinch-ink-light">New servings</span>
          <input
            type="number"
            min={1}
            value={toServings}
            onChange={(e) => setToServings(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-20 px-3 py-2 border border-pinch-warm rounded-lg bg-pinch-cream text-pinch-ink focus:outline-none focus:ring-2 focus:ring-pinch-terracotta/50"
          />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-pinch-ink-light mb-2">Paste or type ingredients (one per line)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            placeholder="2 cups flour&#10;1 tsp salt&#10;1/2 cup butter"
            className="w-full px-3 py-2 border border-pinch-warm rounded-lg bg-pinch-cream text-pinch-ink focus:outline-none focus:ring-2 focus:ring-pinch-terracotta/50 font-mono text-sm"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-pinch-ink-light mb-2">Scaled for {toServings} servings</p>
          <div className="bg-white border border-pinch-warm rounded-xl p-4 shadow-sm min-h-[200px]">
            {parsed.map((line) => (
              <div key={line.id} className="py-1 font-mono text-sm">
                {line.amount != null && line.unit != null ? (
                  <span>
                    <strong>{formatAmount(line.amount)}</strong> {line.unit} {line.rest}
                  </span>
                ) : (
                  <span className="text-pinch-ink-light">{line.text}</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-pinch-ink-light mt-2">
            Lines that start with a number and unit (e.g. 2 cups flour) are scaled. Others are shown as-is.
          </p>
        </div>
      </div>
    </>
  )
}
