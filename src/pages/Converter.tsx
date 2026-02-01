import { useState } from 'react'

type VolumeUnit = 'cup' | 'tbsp' | 'tsp' | 'ml' | 'floz'
type WeightUnit = 'g' | 'oz'
type TempUnit = 'F' | 'C'

const VOLUME_TO_ML: Record<VolumeUnit, number> = {
  cup: 236.588,
  tbsp: 14.787,
  tsp: 4.929,
  ml: 1,
  floz: 29.574,
}

const WEIGHT_TO_G: Record<WeightUnit, number> = {
  g: 1,
  oz: 28.35,
}

function convertVolume(value: number, from: VolumeUnit, to: VolumeUnit): number {
  const ml = value * VOLUME_TO_ML[from]
  return ml / VOLUME_TO_ML[to]
}

function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  const g = value * WEIGHT_TO_G[from]
  return g / WEIGHT_TO_G[to]
}

function convertTemp(value: number, from: TempUnit, to: TempUnit): number {
  if (from === to) return value
  if (from === 'F' && to === 'C') return (value - 32) * (5 / 9)
  return value * (9 / 5) + 32
}

export default function Converter() {
  const [mode, setMode] = useState<'volume' | 'weight' | 'temp'>('volume')
  const [input, setInput] = useState('1')
  const [fromUnit, setFromUnit] = useState<VolumeUnit | WeightUnit | TempUnit>('cup')
  const [toUnit, setToUnit] = useState<VolumeUnit | WeightUnit | TempUnit>('ml')

  const num = parseFloat(input) || 0

  let result = 0
  if (mode === 'volume') {
    result = convertVolume(num, fromUnit as VolumeUnit, toUnit as VolumeUnit)
  } else if (mode === 'weight') {
    result = convertWeight(num, fromUnit as WeightUnit, toUnit as WeightUnit)
  } else {
    result = convertTemp(num, fromUnit as TempUnit, toUnit as TempUnit)
  }

  const volumeUnits: { value: VolumeUnit; label: string }[] = [
    { value: 'cup', label: 'cups' },
    { value: 'tbsp', label: 'tbsp' },
    { value: 'tsp', label: 'tsp' },
    { value: 'ml', label: 'ml' },
    { value: 'floz', label: 'fl oz' },
  ]
  const weightUnits: { value: WeightUnit; label: string }[] = [
    { value: 'g', label: 'g' },
    { value: 'oz', label: 'oz' },
  ]
  const tempUnits: { value: TempUnit; label: string }[] = [
    { value: 'F', label: '°F' },
    { value: 'C', label: '°C' },
  ]

  const setUnits = (m: 'volume' | 'weight' | 'temp') => {
    setMode(m)
    if (m === 'volume') {
      setFromUnit('cup')
      setToUnit('ml')
    } else if (m === 'weight') {
      setFromUnit('g')
      setToUnit('oz')
    } else {
      setFromUnit('F')
      setToUnit('C')
    }
  }

  const fromOpts = mode === 'volume' ? volumeUnits : mode === 'weight' ? weightUnits : tempUnits
  const toOpts = fromOpts

  return (
    <>
      <h1 className="font-display font-bold text-2xl text-pinch-ink mb-6">Unit Converter</h1>

      <div className="flex gap-2 mb-6">
        {(['volume', 'weight', 'temp'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setUnits(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              mode === m
                ? 'bg-pinch-terracotta text-white'
                : 'bg-pinch-warm text-pinch-ink-light hover:bg-pinch-warm/80'
            }`}
          >
            {m === 'temp' ? 'Temperature' : m}
          </button>
        ))}
      </div>

      <div className="bg-white border border-pinch-warm rounded-xl p-6 shadow-sm max-w-md">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[100px]">
            <label className="block text-sm font-medium text-pinch-ink-light mb-1">From</label>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              step="any"
              min="0"
              className="w-full px-3 py-2 border border-pinch-warm rounded-lg bg-pinch-cream text-pinch-ink focus:outline-none focus:ring-2 focus:ring-pinch-terracotta/50"
            />
          </div>
          <div className="w-24">
            <label className="block text-sm font-medium text-pinch-ink-light mb-1">Unit</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as VolumeUnit | WeightUnit | TempUnit)}
              className="w-full px-3 py-2 border border-pinch-warm rounded-lg bg-pinch-cream text-pinch-ink focus:outline-none focus:ring-2 focus:ring-pinch-terracotta/50"
            >
              {fromOpts.map((u) => (
                <option key={u.value} value={u.value}>{u.label}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-pinch-ink-light text-sm mt-2 mb-1">equals</p>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[100px]">
            <div className="px-3 py-2 rounded-lg bg-pinch-warm/50 text-pinch-ink font-medium">
              {Number.isFinite(result) ? (mode === 'temp' ? result.toFixed(1) : result.toFixed(2)) : '—'}
            </div>
          </div>
          <div className="w-24">
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value as VolumeUnit | WeightUnit | TempUnit)}
              className="w-full px-3 py-2 border border-pinch-warm rounded-lg bg-pinch-cream text-pinch-ink focus:outline-none focus:ring-2 focus:ring-pinch-terracotta/50"
            >
              {toOpts.map((u) => (
                <option key={u.value} value={u.value}>{u.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}
