import { cn } from '../../utils/cn'

export default function Badge({ children, tone = 'red', className }) {
  return (
    <span
      className={cn(
        'no-round inline-flex items-center font-mono text-[11px] font-bold tracking-[0.2em] uppercase px-2 py-1',
        tone === 'red' && 'bg-accent text-white',
        tone === 'white' && 'bg-textprimary text-primary',
        tone === 'outline' && 'border border-textprimary/40 text-textprimary',
        className,
      )}
    >
      {children}
    </span>
  )
}
