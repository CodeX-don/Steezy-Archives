import { cn } from '../../utils/cn'

/**
 * Square size selector buttons (min 44px touch targets).
 * Props: sizes[], selected, onSelect, disabledSizes[]
 */
export default function SizeSelector({ sizes = [], selected, onSelect, shakeKey = 0 }) {
  return (
    <div key={shakeKey} className={cn(shakeKey > 0 && 'animate-shake')}>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select size">
        {sizes.map((size) => {
          const active = selected === size
          return (
            <button
              key={size}
              role="radio"
              aria-checked={active}
              onClick={() => onSelect?.(size)}
              className={cn(
                'no-round min-w-[48px] min-h-[48px] px-3 font-mono text-sm font-bold',
                'border snap-hover',
                active
                  ? 'bg-textprimary text-primary border-textprimary'
                  : 'bg-transparent text-textprimary border-border hover:border-textprimary/60',
              )}
            >
              {size}
            </button>
          )
        })}
      </div>
    </div>
  )
}
