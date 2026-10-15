const SHOTS = [
  '/assets/banner5.jpg',
  '/assets/products/sets/set-02.jpg',
  '/assets/products/shorts/short-05.jpg',
  '/assets/banner2.jpg',
  '/assets/products/hoodies/hoodie-06.jpg',
  '/assets/products/sweat-pants/pant-04.jpg',
  '/assets/products/t-shirts/tee-06.jpg',
  '/assets/banner3.jpg',
  '/assets/products/sets/set-06.jpg',
]

export default function LookbookMasonry() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-16 md:mt-24">
      <p className="font-mono text-[11px] tracking-[0.3em] text-accent font-bold mb-2">NO PRICES. PURE AESTHETIC.</p>
      <h2 className="font-display uppercase text-3xl md:text-5xl mb-6">Lookbook</h2>
      <div className="columns-2 md:columns-3 gap-2 [&>img]:mb-2">
        {SHOTS.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`Steezy Archives lookbook ${i + 1}`}
            loading="lazy"
            className="w-full object-cover border border-border break-inside-avoid"
            style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '1/1' : '4/5' }}
          />
        ))}
      </div>
    </section>
  )
}
