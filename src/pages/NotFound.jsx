import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/cn'

export default function NotFound() {
  const { cartCount } = useCart()
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-accent">404 // ARCHIVE GAP</p>
      <h1 className="mt-4 font-display uppercase text-6xl md:text-8xl leading-none">Page<br />not found</h1>
      <p className="mt-6 font-mono text-sm text-muted">Looks like you&apos;re lost in the archives. {cartCount > 0 ? 'Your cart is safe though.' : ''}</p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/" className="no-round min-h-[44px] px-8 py-4 inline-flex items-center justify-center gap-2 bg-textprimary text-primary font-mono text-sm font-bold uppercase tracking-widest snap-hover">
          Return home
        </Link>
        <Link to="/shop" className="no-round min-h-[44px] px-8 py-4 inline-flex items-center justify-center gap-2 border border-textprimary/40 font-mono text-sm font-bold uppercase tracking-widest snap-hover">
          <ShoppingBag size={16} /> Shop archives
        </Link>
      </div>
    </div>
  )
}
