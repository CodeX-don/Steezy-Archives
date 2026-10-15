export const WHATSAPP_NUMBER = '264858108556'
export const WHATSAPP_DISPLAY = '+264 85 810 8556'

/**
 * Build a pre-filled WhatsApp order message from cart state.
 * @param {Array} cartItems - items {name, price, quantity, selectedSize, selectedColor}
 * @param {number} subtotal - cart subtotal (NAD)
 * @returns {string} wa.me URL
 */
export function generateWhatsAppLink(cartItems, subtotal) {
  const items = Array.isArray(cartItems) ? cartItems : []
  const total = Number(subtotal) || 0

  let message = "Hi Steezy! I'd like to place an order:\n\n"
  message += 'ORDER DETAILS:\n'

  items.forEach((item) => {
    const qty = item.quantity ?? 1
    const lineTotal = (item.price ?? 0) * qty
    const variants = []
    if (item.selectedSize) variants.push(`Size: ${item.selectedSize}`)
    if (item.selectedColor) variants.push(`Color: ${item.selectedColor}`)
    const variantStr = variants.length ? ` (${variants.join(', ')})` : ''
    message += `\u2022 ${qty}x ${item.name}${variantStr} \u2014 N$${lineTotal}\n`
  })

  message += `\nSUBTOTAL: N$${total}\n`
  message += 'SHIPPING: To be confirmed\n'
  message += `\nTotal: N$${total}\n\n`
  message += 'Please confirm availability and payment details. Thank you!'

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/** Generic greeting link (navbar/footer/contact). */
export function generateGreetingLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Steezy! I have a question about the Archives.",
  )}`
}
