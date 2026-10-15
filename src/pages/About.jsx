import { Link } from 'react-router-dom'
import { Flame, Users, Layers } from 'lucide-react'

const VALUES = [
  { icon: Flame, title: 'Authenticity', text: 'No cosplay. Heavy fabrics, real prints, shot on flash in the streets we actually move in.' },
  { icon: Users, title: 'Community', text: 'Drops decided with the mandem, not a boardroom. WhatsApp first — you talk to us, not a bot.' },
  { icon: Layers, title: 'Craft', text: '220–340 GSM fabrics, boxy archive cuts, prints built to crack beautifully. Made to outlive trends.' },
]

export default function About() {
  return (
    <div>
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img src="/assets/banner4.jpg" alt="Steezy Archives community" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <h1 className="relative font-display uppercase text-[14vw] md:text-8xl text-center leading-none drop-shadow-[4px_4px_0_#D32F2F]">
          They cant<br />be us
        </h1>
      </section>

      <section className="mx-auto max-w-2xl px-4 sm:px-6 py-14 font-mono text-[15px] leading-relaxed space-y-6">
        <p className="text-textprimary">
          <span className="text-accent font-bold">STEEZY ARCHIVES (STZY)</span> started like every real
          streetwear story — a small circle, a big attitude, and nowhere to buy what we actually wanted to wear.
        </p>
        <p className="text-muted">
          We dig through eras — Y2K, grunge, early-2000s sportswear — and rebuild them for right now:
          oversized cuts, heavyweight cotton, prints that look better the more you live in them.
        </p>
        <p className="text-muted">
          No accounts. No soulless checkout queues. You see heat, you hit us on WhatsApp, we confirm stock,
          you pay, we ship. Direct, human, fast — the way underground commerce always worked.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-4">
        <div className="grid md:grid-cols-3 gap-3">
          {VALUES.map((v) => (
            <div key={v.title} className="no-round bg-secondary border border-border p-8">
              <v.icon size={28} className="text-accent" />
              <h2 className="mt-4 font-display uppercase text-2xl">{v.title}</h2>
              <p className="mt-3 font-mono text-sm text-muted leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/shop" className="no-round inline-flex min-h-[44px] items-center px-8 py-4 bg-textprimary text-primary font-mono text-sm font-bold uppercase tracking-widest snap-hover">
            Shop the archives
          </Link>
        </div>
      </section>
    </div>
  )
}
