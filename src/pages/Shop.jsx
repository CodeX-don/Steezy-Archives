import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import products, { CATEGORIES } from '../data/products'
import ProductCard from '../components/product/ProductCard'
import { cn } from '../utils/cn'

const SORTS = [
  { value: 'newest', label: 'Newest' },
  { value: 'low-high', label: 'Price: Low-High' },
  { value: 'high-low', label: 'Price: High-Low' },
]

export default function Shop() {
  const { category: routeCategory } = useParams()
  const [pill, setPill] = useState('all')
  const [sort, setSort] = useState('newest')

  const activeCategory = routeCategory || pill

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCategory === 'limited') {
      list = list.filter((p) => p.isLimited)
    } else if (activeCategory && activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory)
    }
    if (sort === 'low-high') list.sort((a, b) => a.price - b.price)
    if (sort === 'high-low') list.sort((a, b) => b.price - a.price)
    if (sort === 'newest') list.sort((a, b) => Number(b.isNew) - Number(a.isNew))
    return list
  }, [activeCategory, sort])

  const pick = (v) => setPill(v)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-4">
      <p className="font-mono text-[11px] tracking-[0.3em] text-muted">
        <Link to="/" className="hover:text-accent">HOME</Link> / SHOP
      </p>
      <h1 className="font-display uppercase text-4xl md:text-6xl mt-2">All products</h1>
      <p className="mt-2 font-mono text-sm text-muted">{filtered.length} ITEMS IN THE VAULT</p>

      {/* Filter pills — horizontal scroll on mobile */}
      <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar pb-1" role="tablist" aria-label="Filter by category">
        {CATEGORIES.map((c) => {
          const active = (routeCategory ? routeCategory === c.value : pill === c.value) || (c.value === 'all' && !routeCategory && pill === 'all')
          return (
            <Link
              key={c.value}
              to={c.value === 'all' ? '/shop' : c.value === 'limited' ? '/shop' : `/shop/${c.value}`}
              onClick={() => pick(c.value)}
              role="tab"
              aria-selected={active}
              className={cn(
                'no-round whitespace-nowrap min-h-[44px] inline-flex items-center px-5 font-mono text-xs font-bold uppercase tracking-widest border snap-hover',
                active
                  ? 'bg-textprimary text-primary border-textprimary'
                  : 'bg-transparent text-textprimary border-border hover:border-textprimary/60',
              )}
            >
              {c.label}
            </Link>
          )
        })}
      </div>

      {/* Sort */}
      <div className="mt-4 flex items-center gap-3">
        <label htmlFor="sort" className="font-mono text-xs text-muted uppercase tracking-widest">Sort by:</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="no-round min-h-[44px] bg-secondary border border-border font-mono text-xs uppercase tracking-widest px-3 outline-none focus:border-accent"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display uppercase text-3xl">No items found</p>
          <p className="mt-2 font-mono text-sm text-muted">Nothing in this category yet.</p>
          <Link to="/shop" onClick={() => setPill('all')} className="inline-block mt-6 font-mono text-xs font-bold tracking-widest underline hover:text-accent">
            VIEW ALL PRODUCTS
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
