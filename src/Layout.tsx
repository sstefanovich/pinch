import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur border-b border-pinch-warm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-pinch-terracotta hover:text-pinch-terracotta-dark transition-colors">
            <img src="/logo.svg" alt="" className="h-8 w-8" width="32" height="32" />
            Pinch
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-pinch-ink-light">
            <Link to="/convert" className="hover:text-pinch-terracotta transition-colors">Convert</Link>
            <Link to="/scale" className="hover:text-pinch-terracotta transition-colors">Scale</Link>
            <Link to="/timer" className="hover:text-pinch-terracotta transition-colors">Timer</Link>
            <Link to="/reference" className="hover:text-pinch-terracotta transition-colors">Reference</Link>
            <Link to="/substitutions" className="hover:text-pinch-terracotta transition-colors">Substitutions</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-pinch-warm bg-pinch-warm/30 py-4 text-center text-sm text-pinch-ink-light">
        Pinch — A pinch of help in the kitchen.
      </footer>
    </div>
  )
}
