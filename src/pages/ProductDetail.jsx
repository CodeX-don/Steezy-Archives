import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { getProductBySlug, getRelatedProducts } from '../data/products'
import { useCart } from '../context/CartContext'
import { cn, formatPrice } from '../utils/cn'
import ProductGallery from '../components/product/ProductGallery.jsx'
import ProductCard from '../components/product/ProductCard.jsx'
import SizeSelector from '../components/ui/SizeSelector.jsx'
import Badge from '../components/ui/Badge.jsx'

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = getProductBySlug(slug)

  const [size, setSize] = useState(null)
  const [color, setColor] = useState(product?.colors?.[0]?.name || 'Default')
  const [qty, setQty] = useState(1)
  const [shake, setShake] = useState(0)
  const [sizeError, setSizeError] = useState(false)

  const related = useMemo(() => (product ? getRelatedProducts(product, 4) : []), [product])

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="font-display uppercase text-5xl">Lost in the archives</p>
        <p className="mt-4 font-mono text-sm text-muted">This product does not exist (anymore).</p>
        <button onClick={() => navigate('/shop')} className="mt-8 font-mono text-xs font-bold tracking-widest underline hover:text-accent min-h-[44px]">
          BACK TO SHOP
        </button>
      </div>
    )
  }

  const handleAdd = () => {
    if (!size) {
      setSizeError(true)
      setShake((s) => s + 1)
      return
    }
    addToCart(product, size, color, qty)
  }

  const pickSize = (s) => {
    setSize(s)
    setSizeError(false)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-24 md:pb-8">
      <p className="font-mono text-[11px] tracking-[0.25em] text-muted">
        <Link to="/" className="hover:text-accent">HOME</Link> / <Link to="/shop" className="hover:text-accent">SHOP</Link> / <span className="text-textprimary">{product.name.toUpperCase()}</span>
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div className="lg:sticky lg:top-24 self-start">
          <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-accent">{product.collection}</p>
          <div className="mt-2 flex gap-2">
            {product.isNew && <Badge>New</Badge>}
            {product.isLimited && <Badge tone="white">Limited</Badge>}
          </div>
          <h1 className="mt-3 font-display uppercase text-3xl md:text-5xl leading-none">{product.name}</h1>
          <p className="mt-4 font-mono text-2xl font-bold">{formatPrice(product.price)}</p>

          {/* Color selector */}
          {product.colors?.length > 0 && (
            <div className="mt-6">
              <p className="font-mono text-xs tracking-widest text-muted mb-2">COLOR: <span className="text-textprimary">{color.toUpperCase()}</span></p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={`Color ${c.name}`}
                    title={c.name}
                    className={cn(
                      'no-round w-[44px] h-[44px] border-2 snap-hover',
                      color === c.name ? 'border-textprimary' : 'border-border',
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="font-mono text-xs tracking-widest text-muted">SELECT SIZE</p>
              {sizeError && <p className="font-mono text-xs font-bold text-accent">PLEASE SELECT A SIZE</p>}
            </div>
            <SizeSelector sizes={product.sizes} selected={size} onSelect={pickSize} shakeKey={shake} />
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-4">
            <p className="font-mono text-xs tracking-widest text-muted">QTY</p>
            <div className="inline-flex items-center border border-border no-round">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center hover:text-accent">
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-mono font-bold" aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase quantity" className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center hover:text-accent">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to cart — disabled until size selected (CRUCIAL) */}
          <button
            onClick={handleAdd}
            disabled={!size}
            title={!size ? 'Select a size first' : 'Add to cart'}
            className={cn(
              'no-round mt-6 w-full min-h-[56px] font-mono text-sm font-bold uppercase tracking-widest inline-flex items-center justify-center snap-hover',
              size ? 'bg-textprimary text-primary hover:bg-white' : 'bg-border text-muted cursor-not-allowed',
            )}
          >
            {size ? `Add to cart — ${formatPrice(product.price * qty)}` : 'Select a size'}
          </button>

          {/* Fit / material */}
          <div className="mt-6 border-t border-border pt-6 space-y-3 font-mono text-sm">
            <p><span className="text-muted">FIT:</span> {product.fit}</p>
            <p><span className="text-muted">MATERIAL:</span> {product.material}</p>
            <p className="text-muted leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display uppercase text-2xl md:text-4xl mb-6">You may also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile ATC bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur border-t border-border p-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="font-mono text-[10px] tracking-widest text-muted truncate">{product.name.toUpperCase()}</p>
          <p className="font-mono font-bold">{formatPrice(product.price * qty)}</p>
        </div>
        <button
          onClick={handleAdd}
          disabled={!size}
          className={cn(
            'no-round min-h-[48px] px-6 font-mono text-xs font-bold uppercase tracking-widest',
            size ? 'bg-textprimary text-primary' : 'bg-border text-muted',
          )}
        >
          {size ? 'Add to cart' : 'Pick size'}
        </button>
      </div>
    </div>
  )
}
