import { useCart } from '../../context/CartContext'
import { CheckCircle2 } from 'lucide-react'

/** Global toast fed by CartContext. Render once in Layout. */
export default function Toast() {
  const { toast } = useCart()
  if (!toast) return null
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] no-round">
      <div className="flex items-center gap-2 bg-textprimary text-primary font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 border-l-4 border-accent">
        <CheckCircle2 size={16} strokeWidth={2.5} />
        {toast}
      </div>
    </div>
  )
}
