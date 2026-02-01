const MEASUREMENTS = [
  { name: 'Pinch', amount: '~1/16 tsp', notes: 'What you can hold between thumb and finger.' },
  { name: 'Dash', amount: '~1/8 tsp', notes: 'A quick shake; less than a pinch.' },
  { name: 'Smidgen', amount: '~1/32 tsp', notes: 'Half of a pinch.' },
  { name: 'Drop', amount: '~1/64 tsp', notes: 'One drop from a dropper.' },
  { name: 'Teaspoon (tsp)', amount: '5 ml', notes: 'Standard measuring spoon.' },
  { name: 'Tablespoon (tbsp)', amount: '15 ml / 3 tsp', notes: 'Standard measuring spoon.' },
  { name: 'Fluid ounce (fl oz)', amount: '~30 ml / 2 tbsp', notes: 'Volume, not weight.' },
  { name: 'Cup', amount: '240 ml / 16 tbsp', notes: 'US cup; metric cup is 250 ml.' },
  { name: 'Stick of butter (US)', amount: '1/2 cup / 113 g', notes: '8 tbsp.' },
  { name: 'Heaping spoon', amount: 'Spoon + mound on top', notes: 'Not leveled off.' },
  { name: 'Scant', amount: 'Just under the measure', notes: 'e.g. scant cup = slightly less than 1 cup.' },
  { name: 'To taste', amount: '—', notes: 'Add until it tastes right to you.' },
]

export default function Reference() {
  return (
    <>
      <h1 className="font-display font-bold text-2xl text-pinch-ink mb-2">Measurement Reference</h1>
      <p className="text-pinch-ink-light mb-6">
        Quick reference for pinch, dash, and other cooking measures.
      </p>

      <div className="bg-white border border-pinch-warm rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-pinch-warm/50 border-b border-pinch-warm">
              <th className="px-4 py-3 font-semibold text-pinch-ink">Measure</th>
              <th className="px-4 py-3 font-semibold text-pinch-ink">Amount</th>
              <th className="px-4 py-3 font-semibold text-pinch-ink hidden sm:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody>
            {MEASUREMENTS.map((row) => (
              <tr key={row.name} className="border-b border-pinch-warm last:border-0">
                <td className="px-4 py-3 font-medium text-pinch-ink">{row.name}</td>
                <td className="px-4 py-3 text-pinch-ink-light">{row.amount}</td>
                <td className="px-4 py-3 text-pinch-ink-light text-sm hidden sm:table-cell">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
