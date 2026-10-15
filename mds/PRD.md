# Product Requirements Document (PRD)
## Steezy Archives E-Commerce Website

---

### 1. Project Overview

#### 1.1 Product Name
**Steezy Archives (stzy.cl)** — A streetwear brand e-commerce platform with WhatsApp-based checkout flow.

#### 1.2 Vision Statement
To create an immersive, mobile-first digital storefront that reflects the raw, underground aesthetic of Steezy Archives while providing a seamless shopping experience that converts through direct WhatsApp communication.

#### 1.3 Target Audience
- Streetwear enthusiasts aged 16–30
- Fans of Y2K, grunge, and archive fashion
- Mobile-native shoppers who prefer direct brand communication
- Customers in regions where WhatsApp is the primary commerce channel

#### 1.4 Brand Identity Summary
| Attribute | Description |
|-----------|-------------|
| **Aesthetic** | Raw Urbanism / Lo-Fi Streetwear |
| **Photography Style** | Direct flash, night shots, grainy, candid |
| **Tagline** | "THEY CANT BE US" |
| **Key Colors** | Obsidian Black `#0A0A0A`, Stark White `#F4F4F4`, Archive Red `#D32F2F` |
| **Typography** | Distorted/Gothic display font + Monospaced body text |
| **Vibe** | Underground, exclusive, community-driven |

---

### 2. Technical Stack & Architecture

#### 2.1 Technology Stack
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | React 18+ | Component-based architecture, large ecosystem |
| **Build Tool** | Vite | Fast HMR, optimized production builds |
| **Styling** | Tailwind CSS | Utility-first, rapid prototyping, AI-agent friendly |
| **Routing** | React Router v6 | Client-side routing, nested routes |
| **State Management** | React Context API | Lightweight cart state without external dependencies |
| **Data Source** | Local JSON (`products.js`) | No backend required for MVP |
| **Deployment** | Vercel / Netlify | Free tier, instant CI/CD, edge functions |
| **Icons** | Lucide React | Clean, consistent icon set |
| **Fonts** | Google Fonts (Custom upload) | Gothic display + Monospace pairing |

#### 2.2 Project File Structure
```
src/
├── assets/
│   ├── images/           # Hero banners, product photos, lifestyle shots
│   ├── logos/            # Brand logo variants
│   ── fonts/            # Custom font files (if self-hosted)
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Badge.jsx
│   │   └── SizeSelector.jsx
│   ├── product/
│   │   ├── ProductCard.jsx
│   │   ├── ProductGallery.jsx
│   │   └── ProductInfo.jsx
│   ├── cart/
│   │   ├── CartItem.jsx
│   │   ├── CartSummary.jsx
│   │   └── WhatsAppCheckoutButton.jsx
│   └── sections/
│       ├── HeroSection.jsx
│       ├── CategoryGrid.jsx
│       ├── NewArrivals.jsx
│       ── LookbookMasonry.jsx
── context/
│   └── CartContext.jsx
├── data/
│   └── products.js
├── pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── utils/
│   └── whatsappGenerator.js
├── App.jsx
└── main.jsx
```

---

### 3. Data Model

#### 3.1 Product Schema (`data/products.js`)
```javascript
const products = [
  {
    id: "stzy-001",
    name: "Steezy Archive Tee",
    price: 30,
    currency: "USD",
    category: "t-shirts",
    collection: "2047 Collection",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#F4F4F4", image: "/images/tee-white.jpg" },
      { name: "Black", hex: "#0A0A0A", image: "/images/tee-black.jpg" }
    ],
    images: [
      "/images/tee-lifestyle-1.jpg",
      "/images/tee-detail-1.jpg",
      "/images/tee-back.jpg",
      "/images/tee-flatlay.jpg"
    ],
    description: "Oversized heavyweight cotton tee with distorted logo print. Part of the 2047 Archive Collection.",
    fit: "Oversized — size down for regular fit",
    material: "100% Cotton, 220 GSM",
    isNew: true,
    isLimited: false,
    slug: "steezy-archive-tee"
  }
];
```

#### 3.2 Cart Item Schema (In-Memory State)
```javascript
{
  productId: "stzy-001",
  name: "Steezy Archive Tee",
  price: 30,
  selectedSize: "L",
  selectedColor: "White",
  quantity: 2,
  image: "/images/tee-white.jpg"
}
```

---

### 4. Page Specifications

#### 4.1 Global Components

##### 4.1.1 Navbar
| Element | Specification |
|---------|--------------|
| **Position** | Sticky top, z-index 50 |
| **Background** | `#0A0A0A` with 95% opacity backdrop blur |
| **Height** | 64px desktop, 56px mobile |
| **Left** | Logo "STZY" — distorted gothic font, white, clickable → Home |
| **Center** | Nav links: Home, Shop, Collections, About, Contact — monospace, uppercase, hover underline red |
| **Right** | Cart icon (Lucide `ShoppingBag`) with badge count; User icon (optional) |
| **Mobile** | Hamburger menu → slide-in drawer with same links |
| **Cart Badge** | Red circle `#D32F2F`, white number, positioned top-right of icon |

##### 4.1.2 Footer
| Section | Content |
|---------|---------|
| **Left Column** | "STZY" logo + tagline "THEY CANT BE US" + short brand statement |
| **Center Column** | Quick links: Shop, New Arrivals, About, Contact |
| **Right Column** | Social icons: Instagram, WhatsApp (linked to `wa.me/264814274282`) |
| **Bottom Bar** | Copyright © 2024 Steezy Archives. All rights reserved. |
| **Style** | Dark background `#0A0A0A`, border-top 1px solid `#1a1a1a`, padding 48px 24px |

---

#### 4.2 Home Page (`pages/Home.jsx`)

| Section | Layout & Content | Styling Notes |
|---------|-----------------|---------------|
| **Hero** | Full viewport height. Background: dark gritty street photo with overlay gradient. Centered text: "THEY CANT BE US" in large distorted font. Subtitle: "Premium streetwear for those who set their own rules." Two buttons: "SHOP NOW" (filled white) and "EXPLORE COLLECTION" (outlined). | Text color white. Buttons: min-width 160px, padding 16px 32px. Mobile: stack buttons vertically. |
| **Category Grid** | 3-column grid (desktop), 2-column (tablet), 1-column (mobile). Cards: Hoodies, T-Shirts, Pants, Jackets, Accessories. Each card has background image, overlay gradient, category label, "SHOP NOW" link. | Card aspect ratio 3:4. Hover: scale 1.05, brightness increase. |
| **New Arrivals** | Horizontal scroll container or 4-column grid. Displays latest 8 products using `ProductCard` component. "VIEW ALL →" link aligned right above grid. | Section title left-aligned, monospace uppercase. |
| **Lookbook** | Masonry grid (Pinterest-style) of 6–9 lifestyle photos from Instagram feed. No prices, no CTAs — pure aesthetic. | Images vary in height. Gap 8px. Click opens lightbox. |
| **Newsletter Strip** | Full-width bar. Text: "STAY IN THE LOOP". Email input + "SUBSCRIBE" button. | Background `#111`. Input: transparent bg, white border-bottom. Button: red accent. |

---

#### 4.3 Shop / Collections Page (`pages/Shop.jsx`)

| Element | Specification |
|---------|--------------|
| **Page Title** | "ALL PRODUCTS" — large, monospace, uppercase |
| **Filter Bar** | Horizontal pill buttons: All, T-Shirts, Hoodies, Pants, Accessories, Limited Drops. Active state: white bg, black text. Inactive: transparent bg, white text, white border. |
| **Sort Dropdown** | "Sort by: Newest / Price Low-High / Price High-Low" |
| **Product Grid** | 3 columns desktop, 2 tablet, 1 mobile. Uses `ProductCard` component. |
| **Empty State** | If filter returns 0 results: "No items found in this category." with "View All Products" link. |
| **Pagination / Load More** | "Load More" button at bottom (infinite scroll optional for v2). |

##### ProductCard Component Spec
| Property | Value |
|----------|-------|
| **Image** | Aspect ratio 3:4, object-cover, rounded-none |
| **Hover** | Image swaps to secondary angle OR zooms 1.1x |
| **Below Image** | Product name (left, monospace, 14px), Price (right, bold, 14px) |
| **Badge** | Optional "NEW" or "LIMITED" tag top-left corner, red bg |
| **Click** | Navigates to `/product/:slug` |
| **Quick Add** | On hover (desktop only): small "+" button appears bottom-right of image to add to cart directly |

---

#### 4.4 Product Detail Page (`pages/ProductDetail.jsx`)

| Zone | Content | Behavior |
|------|---------|----------|
| **Breadcrumbs** | Home > Shop > [Product Name] | Clickable links |
| **Left Column (50%)** | Main image (large). Below: thumbnail row (4–6 images). Click thumbnail → updates main image. | Thumbnails have active border (white 2px). Swipeable on mobile. |
| **Right Column (50%)** | Collection tag (small, red text). Product name (large, bold). Price (extra-large, monospace). Color selector (swatches). Size selector (button row). Quantity selector (+/-). "ADD TO CART" button (full width). Fit/Material info (accordion or text block). | Sticky on desktop scroll. Size buttons: square 48px, selected = white border + red fill. Disabled sizes = 30% opacity + strikethrough. |
| **Below Fold** | "You May Also Like" — 4 related products from same category. | Horizontal scroll on mobile. |

##### Size Selector Behavior
- Default state: no size selected → "Add to Cart" button disabled (grayed out)
- On size select: button becomes active (white bg, black text)
- On click: item added to cart context, toast notification appears ("Added to cart!"), cart badge increments

---

#### 4.5 Cart Page (`pages/Cart.jsx`)

| Zone | Content | Specification |
|------|---------|---------------|
| **Page Title** | "YOUR CART" | Monospace, uppercase |
| **Left Panel (65%)** | List of cart items. Each row: thumbnail (80x80), name + size + color, quantity stepper (- 1 +), line total, trash icon. | Rows separated by 1px border `#1a1a1a`. Quantity min 1, max 10. Trash icon confirms before removing. |
| **Right Panel (35%)** | Order Summary box. Subtotal, Shipping ("Calculated via WhatsApp"), Total (bold, large). Discount code input (optional, non-functional for MVP). | Box: border 1px solid `#1a1a1a`, padding 24px. Sticky on desktop. |
| **CTA Button** | "CHECKOUT VIA WHATSAPP" | Full width, white bg, black text, 16px padding. Icon: WhatsApp logo. Hover: slight scale up. |
| **Empty Cart State** | "Your cart is empty." + "Continue Shopping" button → navigates to /shop | Centered, minimal. |

##### Empty Cart Illustration
- Simple line-art shopping bag icon (gray)
- Message: "Your cart is empty"
- Button: "START SHOPPING" → `/shop`

---

#### 4.6 About Page (`pages/About.jsx`)

| Section | Content |
|---------|---------|
| **Hero** | Full-width dark image with overlay. Text: "THEY CANT BE US" centered. |
| **Brand Story** | 2–3 paragraphs explaining Steezy Archives origin, philosophy, and community. Typewriter/monospace font. Max-width 640px centered. |
| **Values Grid** | 3 columns: Authenticity, Community, Craft. Each with icon + short description. |
| **Team/Community Photos** | Grid of 4–6 candid photos from Instagram feed. |

---

#### 4.7 Contact Page (`pages/Contact.jsx`)

| Element | Specification |
|---------|--------------|
| **Primary CTA** | Large card: "Order via WhatsApp" with WhatsApp icon, phone number `+264 81 427 4282`, and direct link button. |
| **Secondary CTA** | "Follow Us on Instagram" card with @stzy.cl handle and embed/link. |
| **FAQ Accordion** | 4–5 common questions: Shipping times, sizing guide, return policy, payment methods. |
| **Style** | Minimal, lots of whitespace, dark background. |

---

### 5. Core Feature: WhatsApp Checkout Flow

#### 5.1 Functional Requirement
When the user clicks **"CHECKOUT VIA WHATSAPP"** on the Cart page, the system must:

1. Read all items from `CartContext`
2. Format a human-readable order message
3. URL-encode the message
4. Open WhatsApp with pre-filled message

#### 5.2 Message Format Template
```
Hi Steezy! 👋 I'd like to place an order:

 ORDER DETAILS:
• 1x Steezy Archive Tee (Size: L, Color: White) — $30
• 2x Cargo Pants (Size: M, Color: Black) — $100
• 1x Steezy Cap (Color: Black) — $25

💰 SUBTOTAL: $155
🚚 SHIPPING: To be confirmed

Total: $155 USD

Please confirm availability and payment details. Thank you! 🙏
```

#### 5.3 Implementation Logic (`utils/whatsappGenerator.js`)
```
FUNCTION generateWhatsAppLink(cartItems, subtotal):
  phoneNumber = "264814274282"
  
  message = "Hi Steezy! 👋 I'd like to place an order:\n\n"
  message += "📦 ORDER DETAILS:\n"
  
  FOR EACH item IN cartItems:
    message += "• " + item.quantity + "x " + item.name 
             + " (Size: " + item.selectedSize 
             + ", Color: " + item.selectedColor + ") — $" 
             + (item.price * item.quantity) + "\n"
  
  message += "\n💰 SUBTOTAL: $" + subtotal
  message += "\n🚚 SHIPPING: To be confirmed"
  message += "\n\nTotal: $" + subtotal + " USD"
  message += "\n\nPlease confirm availability and payment details. Thank you! 🙏"
  
  encodedMessage = URLEncode(message)
  url = "https://wa.me/" + phoneNumber + "?text=" + encodedMessage
  
  RETURN url
```

#### 5.4 Edge Cases
| Scenario | Handling |
|----------|----------|
| Cart is empty | Button disabled, tooltip: "Add items to cart first" |
| WhatsApp not installed (desktop) | Opens web.whatsapp.com fallback |
| User cancels WhatsApp open | Returns to cart page, cart preserved |
| Special characters in product name | Properly URL-encoded |

---

### 6. Design System & Tokens

#### 6.1 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-primary` | `#0A0A0A` | Page background, navbar, footer |
| `--color-bg-secondary` | `#111111` | Cards, sections |
| `--color-bg-tertiary` | `#1a1a1a` | Borders, dividers |
| `--color-text-primary` | `#F4F4F4` | Headings, body text |
| `--color-text-secondary` | `#8C8C8C` | Captions, meta text |
| `--color-accent-red` | `#D32F2F` | Badges, highlights, sale tags |
| `--color-accent-white` | `#FFFFFF` | Primary buttons, active states |
| `--color-success` | `#25D366` | WhatsApp button accent |

#### 6.2 Typography
| Role | Font | Weight | Size (Desktop) | Size (Mobile) |
|------|------|--------|----------------|---------------|
| Display / Logo | Custom Gothic/Distorted | 700 | 48–72px | 32–40px |
| Heading 1 | Monospace | 700 | 36px | 28px |
| Heading 2 | Monospace | 600 | 24px | 20px |
| Body | Monospace | 400 | 16px | 14px |
| Caption / Meta | Monospace | 400 | 12px | 11px |
| Button | Monospace | 600 | 14px | 14px |

#### 6.3 Spacing Scale
| Token | Value |
|-------|-------|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 32px |
| `2xl` | 48px |
| `3xl` | 64px |
| `4xl` | 96px |

#### 6.4 Breakpoints
| Name | Min Width |
|------|-----------|
| Mobile | 0px |
| Tablet | 768px |
| Desktop | 1024px |
| Wide | 1280px |

---

### 7. Responsive Behavior Matrix

| Component | Mobile (<768px) | Tablet (768–1023px) | Desktop (≥1024px) |
|-----------|-----------------|---------------------|-------------------|
| **Navbar** | Hamburger menu, full-screen drawer | Horizontal links, smaller spacing | Full horizontal nav |
| **Hero** | Stacked buttons, smaller text | Side-by-side buttons | Full layout |
| **Category Grid** | 1 column | 2 columns | 3 columns |
| **Product Grid** | 1–2 columns | 2–3 columns | 3–4 columns |
| **Product Detail** | Single column, stacked | Single column, stacked | Two-column split |
| **Cart** | Single column, summary below items | Single column | Two-column split |
| **Lookbook** | Single column masonry | 2-column masonry | 3-column masonry |
| **Footer** | Stacked columns | 2-column | 3-column |

---

### 8. User Flows

#### 8.1 Browse & Purchase Flow
```
Home Page
  → Click "SHOP NOW" or nav "Shop"
    → Shop Page (browse/filter)
      → Click Product Card
        → Product Detail Page
          → Select Size + Color
          → Click "ADD TO CART"
            → Toast: "Added!" + Badge updates
            → Option A: Continue Shopping → back to Shop
            → Option B: Click Cart Icon → Cart Page
              → Review items
              → Click "CHECKOUT VIA WHATSAPP"
                → WhatsApp opens with pre-filled order
                → User sends message
                → Brand responds with payment/shipping details
```

#### 8.2 Direct WhatsApp Entry Flow
```
Any Page
  → Click WhatsApp icon in Navbar/Footer
    → WhatsApp opens with generic greeting
    → User manually describes desired items
```

---

### 9. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| **Performance** | Lighthouse score ≥ 85 on mobile |
| **Load Time** | First Contentful Paint < 2s on 3G |
| **Accessibility** | WCAG 2.1 AA minimum (contrast ratios, alt text, keyboard nav) |
| **SEO** | Semantic HTML, meta tags per page, Open Graph for social sharing |
| **Mobile UX** | Touch targets ≥ 44px, no horizontal scroll, sticky CTA on product pages |
| **Browser Support** | Chrome, Safari, Firefox, Edge (last 2 versions) |
| **Image Optimization** | WebP format, lazy loading, srcset for responsive images |

---

### 10. Success Metrics (KPIs)

| Metric | Definition | Target (MVP) |
|--------|-----------|--------------|
| **Cart Conversion Rate** | % of sessions that reach WhatsApp checkout | ≥ 5% |
| **WhatsApp Message Sent Rate** | % of cart page visits that trigger WhatsApp open | ≥ 40% |
| **Bounce Rate (Home)** | % leaving home without interaction | < 60% |
| **Avg. Session Duration** | Time spent on site | > 90 seconds |
| **Mobile Traffic Share** | % of visitors on mobile devices | > 75% |

---

### 11. Out of Scope (MVP)
- Payment gateway integration (Stripe/PayPal)
- User accounts / login system
- Order tracking dashboard
- Inventory management backend
- Email notifications
- Reviews/ratings system
- Wishlist functionality
- Multi-currency support
- Admin CMS panel

---

### 12. Future Enhancements (Post-MVP)
1. **Backend Integration**: Connect to Shopify/WooCommerce or custom Node.js API for real inventory
2. **Payment Gateway**: Add Stripe for direct checkout alongside WhatsApp option
3. **User Accounts**: Save order history, addresses, preferences
4. **Email/SMS Notifications**: Order confirmation, shipping updates
5. **Analytics Dashboard**: Track which products generate most WhatsApp inquiries
6. **Instagram Feed Embed**: Live sync of @stzy.cl posts on Lookbook page
7. **Drop Countdown Timer**: For limited releases
8. **Size Guide Modal**: Interactive fit finder

---

### 13. Approval & Sign-Off

| Role | Name | Status | Date |
|------|------|--------|------|
| Product Owner | [Name] | ☐ Pending | |
| Lead Developer | [Name] | ☐ Pending | |
| Designer | [Name] | ☐ Pending | |
| Brand Stakeholder | [Name] | ☐ Pending | |

---

*Document Version: 1.0 | Last Updated: October 2024 | Confidential — Steezy Archives Internal Use Only*