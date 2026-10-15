import { Link } from 'react-router-dom'
import { Instagram, MessageCircle } from 'lucide-react'
import { generateGreetingLink } from '../../utils/whatsappGenerator'

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-border mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-4xl">STZY<span className="text-accent">.</span></p>
          <p className="mt-3 font-mono text-xs font-bold tracking-[0.3em] text-textprimary">THEY CANT BE US</p>
          <p className="mt-4 font-mono text-sm text-muted max-w-xs leading-relaxed">
            Raw underground streetwear from the archives. Heavy fabric, loud prints, no permission needed.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-xs font-bold tracking-[0.25em] text-muted uppercase mb-4">Shop</p>
          <ul className="space-y-3 font-mono text-sm">
            <li><Link to="/shop" className="hover:text-accent">All Products</Link></li>
            <li><Link to="/shop/t-shirts" className="hover:text-accent">T-Shirts</Link></li>
            <li><Link to="/shop/hoodies" className="hover:text-accent">Hoodies</Link></li>
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </nav>
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.25em] text-muted uppercase mb-4">Connect</p>
          <div className="flex gap-2">
            <a
              href={generateGreetingLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center border border-border hover:border-wa hover:text-wa snap-hover"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href="https://instagram.com/stzy.cl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @stzy.cl"
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center border border-border hover:border-accent hover:text-accent snap-hover"
            >
              <Instagram size={20} />
            </a>
          </div>
          <p className="mt-4 font-mono text-xs text-muted">wa.me/264858108556<br />@stzy.cl</p>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 sm:px-6 py-5 font-mono text-[11px] tracking-widest text-muted uppercase">
          &copy; 2026 Steezy Archives. All rights reserved. They cant be us.
        </p>
      </div>
    </footer>
  )
}
