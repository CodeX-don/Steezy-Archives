import { Link } from 'react-router-dom'
import HeroSection from '../components/sections/HeroSection.jsx'
import CategoryGrid from '../components/sections/CategoryGrid.jsx'
import NewArrivals from '../components/sections/NewArrivals.jsx'
import LookbookMasonry from '../components/sections/LookbookMasonry.jsx'
import Button from '../components/ui/Button.jsx'

export default function Home() {
  return (
    <div>
      <HeroSection />

      {/* Marquee strip */}
      <div className="border-y border-border bg-secondary overflow-hidden py-3" aria-hidden="true">
        <div className="animate-marquee whitespace-nowrap font-mono text-xs font-bold tracking-[0.3em] text-textprimary/80 w-max">
          {Array(2).fill('THEY CANT BE US /// NEW DROP /// 2047 ARCHIVE /// ORDER VIA WHATSAPP /// ').join('')}
        </div>
      </div>

      <CategoryGrid />
      <NewArrivals />
      <LookbookMasonry />

      {/* Newsletter strip */}
      <section className="mt-16 md:mt-24 bg-secondary border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <h2 className="font-display uppercase text-3xl md:text-4xl">Stay in the loop</h2>
            <p className="mt-2 font-mono text-sm text-muted">Drops sell out fast. Get the WhatsApp broadcast before the public.</p>
          </div>
          <form
            className="flex w-full md:w-auto gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              const input = e.currentTarget.querySelector('input')
              if (input) input.value = ''
              alert('Locked in. Watch your WhatsApp for the next drop.')
            }}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              aria-label="Email address"
              className="no-round flex-1 md:w-72 min-h-[44px] bg-transparent border-b border-textprimary/40 focus:border-accent px-2 py-3 font-mono text-sm placeholder:text-muted outline-none"
            />
            <Button type="submit" variant="red" className="px-6">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* WhatsApp CTA band */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-16 text-center">
        <p className="font-mono text-[11px] tracking-[0.3em] text-muted">NO ACCOUNTS. NO CHECKOUT QUEUES.</p>
        <p className="font-display uppercase text-2xl md:text-4xl mt-2">See something? Hit us direct.</p>
        <Link to="/contact" className="inline-block mt-6">
          <Button variant="outline">Order via WhatsApp</Button>
        </Link>
      </section>
    </div>
  )
}
