import { MessageCircle } from 'lucide-react'
import { generateWhatsAppLink } from '../../utils/whatsappGenerator'
import { cn } from '../../utils/cn'

/** Massive full-width WhatsApp checkout CTA. Disabled when cart empty. */
export default function WhatsAppCheckoutButton({ items, subtotal, disabled }) {
  if (disabled) {
    return (
      <button
        disabled
        title="Add items to cart first"
        className="no-round w-full min-h-[56px] px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest bg-border text-muted cursor-not-allowed inline-flex items-center justify-center gap-3"
      >
        <MessageCircle size={20} />
        Checkout via WhatsApp
      </button>
    )
  }
  const href = generateWhatsAppLink(items, subtotal)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'no-round w-full min-h-[56px] px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest',
        'bg-wa text-primary inline-flex items-center justify-center gap-3 snap-hover hover:brightness-110',
      )}
    >
      <MessageCircle size={20} strokeWidth={2.5} />
      Checkout via WhatsApp
    </a>
  )
}
