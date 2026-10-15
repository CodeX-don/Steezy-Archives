import { useState } from 'react'
import { cn } from '../../utils/cn'

export default function ProductGallery({ images = [], name = '' }) {
  const [active, setActive] = useState(0)
  const current = images[active] || images[0]

  return (
    <div>
      <div className="no-round aspect-[3/4] overflow-hidden bg-secondary border border-border">
        <img src={current} alt={name} className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-2 grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                'no-round aspect-square overflow-hidden border-2 min-h-[44px]',
                i === active ? 'border-textprimary' : 'border-border opacity-70 hover:opacity-100',
              )}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
