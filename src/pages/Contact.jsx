import { useState } from 'react'
import { Instagram, MessageCircle, ChevronDown } from 'lucide-react'
import { WHATSAPP_DISPLAY, generateGreetingLink } from '../utils/whatsappGenerator'
import { cn } from '../utils/cn'

const FAQS = [
  { q: 'How do I place an order?', a: 'Add items to your cart, hit CHECKOUT VIA WHATSAPP, and send the pre-filled message. We confirm stock + payment details (EFT) and shipping right in the chat.' },
  { q: 'How long does shipping take?', a: 'Windhoek: 1–2 days. Rest of Namibia: 2–5 working days via courier. We confirm exact cost on WhatsApp before you pay — shipping is calculated per order.' },
  { q: 'How do the fits run?', a: 'Most archive cuts are oversized — size down for a regular fit. Check the FIT line on each product page. Between sizes? Hit us on WhatsApp with your measurements.' },
  { q: 'What is your return policy?', a: 'Unworn items with tags can be exchanged within 7 days. Limited drops are final sale unless faulty. Always confirm sizing with us before paying.' },
  { q: 'How do I pay?', a: 'EFT / instant transfer after we confirm your order on WhatsApp. Your items are reserved once payment reflects.' },
]

export default function Contact() {
  const [open, setOpen] = useState(0)
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-8">
      <p className="font-mono text-[11px] tracking-[0.3em] text-muted">TALK TO A HUMAN</p>
      <h1 className="font-display uppercase text-4xl md:text-6xl mt-2">Contact</h1>

      <div className="mt-8 grid md:grid-cols-2 gap-3">
        <a
          href={generateGreetingLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="no-round bg-secondary border border-border p-8 hover:border-wa snap-hover group"
        >
          <MessageCircle size={32} className="text-wa" />
          <h2 className="mt-4 font-display uppercase text-2xl">Order via WhatsApp</h2>
          <p className="mt-2 font-mono text-sm text-muted">{WHATSAPP_DISPLAY}</p>
          <p className="mt-4 font-mono text-xs font-bold tracking-widest text-wa group-hover:underline">OPEN CHAT →</p>
        </a>
        <a
          href="https://instagram.com/stzy.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="no-round bg-secondary border border-border p-8 hover:border-accent snap-hover group"
        >
          <Instagram size={32} className="text-accent" />
          <h2 className="mt-4 font-display uppercase text-2xl">Follow the movement</h2>
          <p className="mt-2 font-mono text-sm text-muted">@stzy.cl — drops, lookbook, community</p>
          <p className="mt-4 font-mono text-xs font-bold tracking-widest text-accent group-hover:underline">OPEN INSTAGRAM →</p>
        </a>
      </div>

      <h2 className="mt-14 font-display uppercase text-2xl md:text-3xl">FAQ</h2>
      <div className="mt-4 border-t border-border">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} className="border-b border-border">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="w-full min-h-[56px] flex items-center justify-between gap-4 py-4 text-left font-mono text-sm font-bold"
              >
                {f.q}
                <ChevronDown size={18} className={cn('shrink-0 transition-transform', isOpen && 'rotate-180 text-accent')} />
              </button>
              {isOpen && <p className="pb-5 font-mono text-sm text-muted leading-relaxed">{f.a}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
