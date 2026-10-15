import { useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import { formatPrice } from '../../utils/cn'

/** 3:4 sharp-corner card, image swap on hover, mono name/price. */
export default function ProductCard({ product }) {
  const [hover, setHover] = useState(false)
  const src = hover && product.images[1] ? product.images[1] : product.images[0]

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block no-round bg-secondary border border-border hover:border-textprimary/30 snap-hover"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`${product.name} — ${formatPrice(product.price)}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-primary">
        <img
          src={src}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-150 group-hover:scale-[1.04]"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          {product.isNew && <Badge>New</Badge>}
          {product.isLimited && <Badge tone="white">Limited</Badge>}
        </div>
      </div>
      <div className="flex items-start justify-between gap-2 px-3 py-3">
        <p className="font-mono text-[13px] leading-tight text-textprimary line-clamp-2">{product.name}</p>
        <p className="font-mono text-[13px] font-bold whitespace-nowrap">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
