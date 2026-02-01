import { useState, useMemo } from 'react'

interface Substitution {
  ingredient: string
  substitute: string
  ratio?: string
  notes?: string
}

const SUBSTITUTIONS: Substitution[] = [
  { ingredient: 'Buttermilk', substitute: '1 cup milk + 1 tbsp lemon juice or vinegar', ratio: 'Let stand 5 min', notes: 'Or use plain yogurt thinned with milk' },
  { ingredient: 'Egg (1)', substitute: '¼ cup mashed banana', ratio: '1:1', notes: 'Adds sweetness; good for baking' },
  { ingredient: 'Egg (1)', substitute: '1 tbsp ground flax + 3 tbsp water', ratio: '1:1', notes: 'Let sit 5 min before using' },
  { ingredient: 'Egg (1)', substitute: '3 tbsp aquafaba (chickpea liquid)', ratio: '1:1', notes: 'Whipped aquafaba works for meringues' },
  { ingredient: 'Egg (1)', substitute: '2 tbsp applesauce', ratio: '1:1', notes: 'Best in muffins, quick breads' },
  { ingredient: 'Baking powder (1 tsp)', substitute: '¼ tsp baking soda + ½ tsp cream of tartar', ratio: '1:1' },
  { ingredient: 'Baking powder (1 tsp)', substitute: '¼ tsp baking soda + ½ cup buttermilk', ratio: '1:1', notes: 'Reduce other liquid by ½ cup' },
  { ingredient: 'Butter (1 cup)', substitute: '1 cup margarine or vegetable shortening', ratio: '1:1' },
  { ingredient: 'Butter (1 cup)', substitute: '¾ cup olive or vegetable oil', ratio: '1 cup butter', notes: 'In many baked goods' },
  { ingredient: 'Heavy cream (1 cup)', substitute: '⅔ cup milk + ⅓ cup melted butter', ratio: '1:1' },
  { ingredient: 'Heavy cream (1 cup)', substitute: '1 cup coconut cream (chilled)', ratio: '1:1', notes: 'For whipped cream, use chilled can' },
  { ingredient: 'Sour cream (1 cup)', substitute: '1 cup plain yogurt', ratio: '1:1' },
  { ingredient: 'Sour cream (1 cup)', substitute: '1 cup buttermilk + 1 tbsp butter', ratio: '1:1', notes: 'In baking' },
  { ingredient: 'Lemon juice (1 tbsp)', substitute: '1 tbsp white vinegar or lime juice', ratio: '1:1' },
  { ingredient: 'Lemon zest (1 tsp)', substitute: '½ tsp lemon extract', ratio: 'Approx' },
  { ingredient: 'Vanilla extract (1 tsp)', substitute: '½ tsp vanilla paste or 1 inch vanilla bean', ratio: 'Approx' },
  { ingredient: 'Honey (1 cup)', substitute: '1 cup maple syrup or agave', ratio: '1:1', notes: 'Reduce oven temp ~25°F for maple' },
  { ingredient: 'Brown sugar (1 cup)', substitute: '1 cup white sugar + 1–2 tbsp molasses', ratio: '1:1' },
  { ingredient: 'Brown sugar (1 cup)', substitute: '1 cup coconut sugar', ratio: '1:1' },
  { ingredient: 'All-purpose flour (1 cup)', substitute: '1 cup + 2 tbsp cake flour', ratio: '1:1', notes: 'Lighter texture' },
  { ingredient: 'Bread flour (1 cup)', substitute: '1 cup all-purpose + 1 tsp vital wheat gluten', ratio: '1:1' },
  { ingredient: 'Self-rising flour (1 cup)', substitute: '1 cup all-purpose + 1½ tsp baking powder + ¼ tsp salt', ratio: '1:1' },
  { ingredient: 'Cornstarch (1 tbsp, thickener)', substitute: '2 tbsp all-purpose flour', ratio: '1 tbsp' },
  { ingredient: 'Cornstarch (1 tbsp)', substitute: '1 tbsp arrowroot or potato starch', ratio: '1:1' },
  { ingredient: 'Tomato paste (1 tbsp)', substitute: '1 tbsp ketchup', ratio: '1:1', notes: 'Adds sweetness' },
  { ingredient: 'Worcestershire sauce (1 tbsp)', substitute: '1 tbsp soy sauce + dash vinegar + pinch sugar', ratio: 'Approx' },
  { ingredient: 'Wine (in cooking)', substitute: 'Broth + 1 tsp vinegar', ratio: 'Same volume' },
  { ingredient: 'Fresh herbs (1 tbsp)', substitute: '1 tsp dried herbs', ratio: '1:3', notes: 'Dried is more concentrated' },
  { ingredient: 'Garlic (1 clove)', substitute: '⅛ tsp garlic powder', ratio: '1 clove' },
  { ingredient: 'Onion (1 cup chopped)', substitute: '1 tbsp onion powder', ratio: 'Approx' },
  { ingredient: 'Mayonnaise (1 cup)', substitute: '1 cup Greek yogurt', ratio: '1:1', notes: 'In dressings, dips' },
  { ingredient: 'Parmesan (1 cup grated)', substitute: '1 cup Pecorino Romano or Asiago', ratio: '1:1' },
  { ingredient: 'Ricotta (1 cup)', substitute: '1 cup cottage cheese blended smooth', ratio: '1:1' },
  { ingredient: 'Cream cheese (1 cup)', substitute: '1 cup mascarpone', ratio: '1:1' },
  { ingredient: 'Oil (for frying)', substitute: 'Butter', ratio: '1:1', notes: 'Lower smoke point; watch heat' },
]

export default function Substitutions() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return SUBSTITUTIONS
    return SUBSTITUTIONS.filter(
      (s) =>
        s.ingredient.toLowerCase().includes(q) ||
        s.substitute.toLowerCase().includes(q)
    )
  }, [search])

  return (
    <>
      <h1 className="font-display font-bold text-2xl text-pinch-ink mb-2">
        Common Substitutions
      </h1>
      <p className="text-pinch-ink-light mb-6">
        Out of something? Use one of these swaps. Search by ingredient or substitute.
      </p>

      <div className="mb-6">
        <label htmlFor="sub-search" className="sr-only">
          Search substitutions
        </label>
        <input
          id="sub-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="e.g. buttermilk, egg, butter…"
          className="w-full max-w-md px-4 py-2.5 border border-pinch-warm rounded-lg bg-white text-pinch-ink placeholder:text-pinch-ink-light/70 focus:outline-none focus:ring-2 focus:ring-pinch-terracotta/50"
        />
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-pinch-ink-light">No substitutions match your search.</p>
        )}
        {filtered.map((s, i) => (
          <article
            key={`${s.ingredient}-${s.substitute}-${i}`}
            className="p-4 rounded-xl bg-white border border-pinch-warm shadow-sm"
          >
            <p className="font-medium text-pinch-ink">
              <span className="text-pinch-terracotta">{s.ingredient}</span>
              {s.ratio && (
                <span className="text-pinch-ink-light font-normal text-sm ml-2">
                  ({s.ratio})
                </span>
              )}
            </p>
            <p className="text-pinch-ink-light mt-1">
              → {s.substitute}
            </p>
            {s.notes && (
              <p className="text-sm text-pinch-ink-light mt-1.5 italic">
                {s.notes}
              </p>
            )}
          </article>
        ))}
      </div>
    </>
  )
}
