import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <img
        src="/assets/banner1.jpg"
        alt="Steezy Archives streetwear"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/55 to-primary" />
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <p className="font-mono text-[11px] md:text-xs font-bold tracking-[0.4em] text-accent mb-4">
          2047 ARCHIVE // NEW DROP LIVE
        </p>
        <h1 className="font-display uppercase leading-[0.9] text-[17vw] md:text-[9rem] text-textprimary drop-shadow-[4px_4px_0_#D32F2F]">
          They cant<br />be us
        </h1>
        <p className="mt-6 font-mono text-sm md:text-base text-textprimary/80 max-w-xl mx-auto">
          Premium streetwear for those who set their own rules.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link to="/shop" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto sm:min-w-[180px]">Shop now</Button>
          </Link>
          <Link to="/shop/hoodies" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto sm:min-w-[180px]">Explore collection</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
