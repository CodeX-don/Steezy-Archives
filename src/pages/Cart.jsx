import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/cn'
import WhatsAppCheckoutButton from '../components/cart/WhatsAppCheckoutButton.jsx'

export default function Cart() {
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const [confirmKey, setConfirmKey] = useState(null)

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <ShoppingBag size={56} strokeWidth={1} className="mx-auto text-muted" />
        <h1 className="mt-6 font-display uppercase text-4xl">Your cart is empty</h1>
        <p className="mt-3 font-mono text-sm text-muted">The vault is full though. Go fill your bag.</p>
        <Link to="/shop" className="no-round mt-8 inline-flex min-h-[44px] items-center px-8 py-4 bg-textprimary text-primary font-mono text-sm font-bold uppercase tracking-widest snap-hover">
          Start shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-8">
      <h1 className="font-display uppercase text-4xl md:text-6xl">Your cart</h1>
      <p className="mt-2 font-mono text-sm text-muted">{items.reduce((n, i) => n + i.quantity, 0)} ITEMS</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Item list */}
        <ul className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li key={item.key} className="py-4 flex gap-4">
              <Link to={`/product/${item.slug}`} className="shrink-0 no-round w-20 h-24 overflow-hidden bg-secondary border border-border">
                <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link to={`/product/${item.slug}`} className="font-mono text-sm font-bold hover:text-accent leading-tight block">
                      {item.name}
                    </Link>
                    <p className="mt-1 font-mono text-xs text-muted">
                      SIZE: {item.selectedSize} / {item.selectedColor?.toUpperCase()}
                    </p>
                  </div>
                  <button
                    onClick={() => (confirmKey === item.key ? (removeFromCart(item.key), setConfirmKey(null)) : setConfirmKey(item.key))}
                    aria-label={confirmKey === item.key ? 'Confirm remove' : `Remove ${item.name}`}
                    className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-muted hover:text-accent shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {confirmKey === item.key && (
                  <button onClick={() => { removeFromCart(item.key); setConfirmKey(null) }} className="mt-1 font-mono text-[11px] font-bold text-accent underline min-h-[32px]">
                    TAP TRASH AGAIN TO CONFIRM REMOVE
                  </button>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center border border-border no-round">
                    <button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease quantity" className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center hover:text-accent">
                      <Minus size={15} />
                    </button>
                    <span className="w-8 text-center font-mono text-sm font-bold" aria-live="polite">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity" className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center hover:text-accent">
                      <Plus size={15} />
                    </button>
                  </div>
                  <p className="font-mono text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 self-start no-round border border-border bg-secondary p-6">
          <h2 className="font-display uppercase text-2xl">Order summary</h2>
          <dl className="mt-5 space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-bold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="text-right text-xs">Calculated<br />via WhatsApp</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-4">
              <dt className="font-bold uppercase">Total</dt>
              <dd className="font-bold text-xl">{formatPrice(subtotal)}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <WhatsAppCheckoutButton items={items} subtotal={subtotal} />
            <p className="mt-3 text-center font-mono text-[11px] text-muted">Opens WhatsApp to finalize your order.</p>
          </div>
          <button onClick={clearCart} className="mt-4 w-full min-h-[44px] font-mono text-[11px] tracking-widest text-muted hover:text-accent uppercase">
            Clear cart
          </button>
          <Link to="/shop" className="mt-2 block text-center font-mono text-[11px] tracking-widest underline hover:text-accent min-h-[44px] py-3">
            CONTINUE SHOPPING
          </Link>
        </aside>
      </div>
    </div>
  )
}
