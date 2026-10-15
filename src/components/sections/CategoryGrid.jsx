import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const CATS = [
  { label: 'Tees', to: '/shop/t-shirts', img: '/assets/banner2.jpg', tag: 'FROM N$349' },
  { label: 'Hoodies', to: '/shop/hoodies', img: '/assets/banner3.jpg', tag: 'FROM N$749' },
  { label: 'Pants', to: '/shop/sweat-pants', img: '/assets/banner4.jpg', tag: 'FROM N$629' },
]

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-16 md:mt-24">
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-display uppercase text-3xl md:text-5xl">Shop by category</h2>
        <Link to="/shop" className="hidden sm:inline-flex font-mono text-xs font-bold tracking-widest hover:text-accent">
          VIEW ALL →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CATS.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="group relative no-round aspect-[3/4] overflow-hidden bg-secondary border border-border"
          >
            <img
              src={c.img}
              alt={c.label}
              loading="lazy"
              className="h-full w-full object-cover brightness-[0.65] group-hover:brightness-90 group-hover:scale-[1.04] transition-all duration-150"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
              <div>
                <p className="font-mono text-[11px] tracking-[0.3em] text-accent font-bold">{c.tag}</p>
                <p className="font-display uppercase text-4xl mt-1">{c.label}</p>
              </div>
              <span className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center border border-textprimary/40 group-hover:bg-textprimary group-hover:text-primary">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
