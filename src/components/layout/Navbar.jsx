import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { cn } from '../../utils/cn'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { cartCount } = useCart()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open ])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-colors duration-150 border-b',
          solid ? 'bg-primary/95 backdrop-blur border-border' : 'bg-transparent border-transparent',
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between" aria-label="Main">
          <Link to="/" className="font-display text-2xl md:text-3xl tracking-wide text-textprimary leading-none" aria-label="Steezy Archives home">
            STZY<span className="text-accent">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    'font-mono text-xs font-bold uppercase tracking-[0.2em] hover:text-accent relative py-2',
                    isActive ? 'text-textprimary after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:bg-accent' : 'text-muted',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <Link
              to="/cart"
              className="relative min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-textprimary hover:text-accent"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white font-mono text-[11px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-textprimary"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen drawer */}
      {open && (
        <div className="fixed inset-0 z-[80] bg-primary flex flex-col" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="h-14 px-4 flex items-center justify-between border-b border-border">
            <span className="font-display text-2xl">STZY<span className="text-accent">.</span></span>
            <button
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-8 gap-2" aria-label="Mobile">
            {LINKS.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                className="font-display text-5xl uppercase py-2 text-textprimary hover:text-accent snap-hover"
              >
                <span className="font-mono text-xs text-accent align-super mr-3">0{i + 1}</span>
                {l.label}
              </NavLink>
            ))}
            <p className="mt-10 font-mono text-xs tracking-[0.3em] text-muted">THEY CANT BE US</p>
          </nav>
        </div>
      )}
    </>
  )
}
