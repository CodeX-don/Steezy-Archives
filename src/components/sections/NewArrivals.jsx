import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'
import { getNewArrivals } from '../../data/products'

export default function NewArrivals() {
  const items = getNewArrivals(8)
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-16 md:mt-24">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent font-bold mb-2">FRESH FROM THE VAULT</p>
          <h2 className="font-display uppercase text-3xl md:text-5xl">New arrivals</h2>
        </div>
        <Link to="/shop" className="font-mono text-xs font-bold tracking-widest hover:text-accent whitespace-nowrap ml-4">
          VIEW ALL →
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
