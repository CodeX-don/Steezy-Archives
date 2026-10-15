import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'stzy-cart-v1'

const initialState = { items: [] }

function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { items: Array.isArray(action.payload) ? action.payload : [] }
    case 'ADD_TO_CART': {
      const { product, size, color, quantity = 1 } = action.payload
      const key = `${product.id}__${size}__${color}`
      const existing = state.items.find((i) => i.key === key)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: Math.min(10, i.quantity + quantity) } : i,
          ),
        }
      }
      const entry = {
        key,
        productId: product.id,
        name: product.name,
        price: product.price,
        slug: product.slug,
        image: product.images?.[0],
        selectedSize: size,
        selectedColor: color,
        quantity: Math.min(10, Math.max(1, quantity)),
      }
      return { items: [...state.items, entry] }
    }
    case 'REMOVE_FROM_CART':
      return { items: state.items.filter((i) => i.key !== action.payload) }
    case 'UPDATE_QUANTITY': {
      const { key, quantity } = action.payload
      if (quantity <= 0) return { items: state.items.filter((i) => i.key !== key) }
      return {
        items: state.items.map((i) =>
          i.key === key ? { ...i, quantity: Math.min(10, Math.max(1, quantity)) } : i,
        ),
      }
    }
    case 'CLEAR_CART':
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [toast, setToast] = useState(null)

  // Hydrate from localStorage (persist choice)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) })
    } catch {
      /* ignore corrupt storage */
    }
  }, [])

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      /* storage unavailable */
    }
  }, [state.items])

  const showToast = (msg) => {
    setToast(msg)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(null), 2200)
  }

  const addToCart = (product, size, color, quantity = 1) => {
    if (!size) return false
    dispatch({ type: 'ADD_TO_CART', payload: { product, size, color: color || product.colors?.[0]?.name || 'Default', quantity } })
    showToast(`Added to cart — ${product.name} (${size})`)
    return true
  }
  const removeFromCart = (key) => dispatch({ type: 'REMOVE_FROM_CART', payload: key })
  const updateQuantity = (key, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { key, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const { cartCount, subtotal } = useMemo(() => {
    return {
      cartCount: state.items.reduce((n, i) => n + i.quantity, 0),
      subtotal: state.items.reduce((n, i) => n + i.price * i.quantity, 0),
    }
  }, [state.items])

  const value = useMemo(
    () => ({ items: state.items, cartCount, subtotal, addToCart, removeFromCart, updateQuantity, clearCart, toast }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.items, cartCount, subtotal, toast],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
