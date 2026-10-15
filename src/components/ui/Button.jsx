import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-textprimary text-primary hover:bg-white',
  outline: 'bg-transparent text-textprimary border border-textprimary/40 hover:border-textprimary',
  red: 'bg-accent text-white hover:brightness-110',
  wa: 'bg-wa text-primary hover:brightness-110',
  ghost: 'bg-transparent text-muted hover:text-textprimary',
  disabled: 'bg-border text-muted cursor-not-allowed',
}

/** Sharp-corner brutalist button. */
export default function Button({ variant = 'primary', className, disabled, ...props }) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'no-round font-mono text-sm font-bold uppercase tracking-widest',
        'min-h-[44px] px-8 py-4 inline-flex items-center justify-center gap-2',
        'snap-hover active:translate-y-px',
        disabled ? variants.disabled : variants[variant],
        className,
      )}
      {...props}
    />
  )
}
