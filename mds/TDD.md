# Technical Design Document (TDD)
## Steezy Archives E-Commerce Platform

---

### 1. Document Overview
**Project Name:** Steezy Archives Web Store  
**Version:** 1.0  
**Status:** Approved for Development  
**Target Audience:** Development Team / AI Coding Agents  

This document outlines the technical architecture, component design, state management, and implementation strategies for the Steezy Archives single-page application (SPA). It serves as the primary blueprint for development.

---

### 2. System Architecture

#### 2.1 High-Level Architecture
The application is a **Client-Side Rendered (CSR) Single Page Application (SPA)**. There is no custom backend server for the MVP. All product data is statically bundled, and the checkout process is offloaded to an external communication channel (WhatsApp API).

```text
[User Browser] 
      │
      ▼
[Static Assets (HTML/CSS/JS)]  <-- Hosted on Vercel/Netlify CDN
      │
      ▼
[React Application]
      ├── React Router (Client-side routing)
      ├── Context API (Global Cart State)
      └── Local JSON Data (Product Catalog)
            │
            ▼
      [WhatsApp API (External)] <-- Checkout redirection
```

#### 2.2 Hosting & Deployment
*   **Provider:** Vercel or Netlify (Free tier).
*   **Build Process:** Vite build pipeline generating static assets.
*   **CDN:** Global edge network for fast asset delivery.

---

### 3. Technology Stack & Dependencies

| Category | Technology | Justification |
| :--- | :--- | :--- |
| **Core Framework** | React 18+ | Component model, hooks, concurrent features. |
| **Build Tool** | Vite | Lightning-fast HMR, optimized Rollup production builds. |
| **Styling** | Tailwind CSS | Utility-first, rapid UI development, highly compatible with AI generation. |
| **Routing** | React Router DOM v6 | Standard for React SPAs, supports nested routes and loaders. |
| **State Management** | React Context + `useReducer` | Native, lightweight, sufficient for cart state without external libs like Redux. |
| **Icons** | Lucide React | Lightweight, tree-shakable, consistent SVG icon set. |
| **SEO/Meta** | `react-helmet-async` | Manages document head (title, meta tags) dynamically per route. |
| **Utilities** | `clsx` & `tailwind-merge` | Safely merging Tailwind classes without conflicts. |

---

### 4. State Management Design (Cart Context)

The cart state is global. We will use React Context paired with `useReducer` to handle complex state transitions cleanly.

#### 4.1 Context Shape
```json
{
  "items": [
    {
      "productId": "stzy-001",
      "name": "Steezy Archive Tee",
      "price": 30,
      "size": "L",
      "color": "White",
      "quantity": 2,
      "image": "/assets/tee-white.jpg"
    }
  ],
  "cartCount": 2,
  "subtotal": 60
}
```

#### 4.2 Reducer Actions
The reducer will handle the following action types:
1.  `ADD_TO_CART`: Checks if item (same ID, size, color) exists. If yes, increments quantity. If no, pushes new item.
2.  `REMOVE_FROM_CART`: Filters out the item by a unique cart-item ID.
3.  `UPDATE_QUANTITY`: Updates the quantity of a specific cart item (min 1, max 10).
4.  `CLEAR_CART`: Resets items array to `[]`.

#### 4.3 Provider Implementation
The `CartProvider` will wrap the entire application in `main.jsx`. A custom hook `useCart()` will be exported to allow any component to consume the state and dispatch actions.

---

### 5. Data Architecture

#### 5.1 Product Data Source
Since there is no backend, product data will reside in a static JavaScript file: `src/data/products.js`.
*   **Format:** An exported array of product objects.
*   **Images:** Stored in `public/images/` or `src/assets/`. For Vite, importing images from `src/assets` is recommended to leverage Vite's automatic hashing and optimization.

#### 5.2 Data Fetching Strategy
*   **MVP:** Direct import of `products.js`.
*   **Future State:** Replace direct import with `fetch('/api/products')` or a headless CMS (Sanity/Strapi) without changing component logic, provided the data shape remains consistent.

---

### 6. Routing Strategy

React Router v6 will handle navigation. Scroll restoration must be implemented manually to ensure the user starts at the top of the page when navigating.

| Route Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `Home` | Landing page, hero, featured drops. |
| `/shop` | `Shop` | Grid view of all products with filters. |
| `/shop/:category` | `Shop` | Filtered grid view (reuses Shop component). |
| `/product/:slug` | `ProductDetail` | Single product view. Requires URL param parsing. |
| `/cart` | `Cart` | Cart review and WhatsApp checkout. |
| `/about` | `About` | Brand story and philosophy. |
| `/contact` | `Contact` | Contact info and FAQ. |
| `*` | `NotFound` | 404 fallback page. |

---

### 7. Component Architecture

The UI will follow an Atomic Design methodology to ensure reusability.

#### 7.1 Folder Structure
```text
src/
├── components/
│   ├── atoms/       # Buttons, Inputs, Badges, Icons
│   ├── molecules/   # ProductCard, CartItem, SizeSelector
│   ├── organisms/   # Navbar, Footer, ProductGallery, CartSummary
│   └── templates/   # PageLayout, ShopLayout
```

#### 7.2 Key Component Specifications

**A. `ProductCard` (Molecule)**
*   **Props:** `product` (object), `onQuickAdd` (function).
*   **State:** `isHovered` (boolean) for image swap effect.
*   **Logic:** Displays primary image. On hover (desktop), swaps to secondary image. Clicking the card navigates to `/product/:slug`.

**B. `ProductGallery` (Organism)**
*   **Props:** `images` (array of strings).
*   **State:** `activeImageIndex` (number, default 0).
*   **Logic:** Renders main image based on `activeImageIndex`. Renders thumbnail strip below. Clicking thumbnail updates `activeImageIndex`.

**C. `WhatsAppCheckoutButton` (Molecule)**
*   **Props:** `cartItems` (array), `subtotal` (number).
*   **Logic:** On click, triggers the WhatsApp URL generation utility and opens the link in a new tab.

---

### 8. Core Feature Technical Implementation

#### 8.1 WhatsApp Checkout Logic
This is the critical business logic. It will be encapsulated in a utility function: `src/utils/whatsappCheckout.js`.

**Algorithm:**
1.  Accept `cartItems` array and `subtotal` number.
2.  Initialize a string variable `message`.
3.  Iterate through `cartItems`:
    *   Format each line: `• {quantity}x {name} (Size: {size}, Color: {color}) — ${price * quantity}`
    *   Append to `message`.
4.  Append Subtotal, Shipping note, and Total to `message`.
5.  Use `encodeURIComponent(message)` to safely format the string for a URL.
6.  Construct final URL: `https://wa.me/264814274282?text={encodedMessage}`.
7.  Return the URL.

**UI Integration:**
The button in the Cart page will use an `<a>` tag with `href={generatedUrl}` and `target="_blank"`, `rel="noopener noreferrer"`.

#### 8.2 Product Filtering & Sorting
Implemented directly within the `Shop` page component.
*   **State:** `selectedCategory` (string), `sortBy` (string).
*   **Logic:** Use `useMemo` to filter and sort the imported `products` array based on state variables to prevent unnecessary re-renders.

---

### 9. Performance & Optimization Strategy

#### 9.1 Code Splitting
Use React.lazy and Suspense to split code at the route level. This ensures the user only downloads the JavaScript required for the page they are viewing.
*   *Example:* The `Cart` and `ProductDetail` components will only be loaded when the user navigates to those specific routes.

#### 9.2 Image Optimization
*   **Format:** Serve images in WebP format where possible.
*   **Loading:** Implement native lazy loading (`loading="lazy"`) on all images below the fold (Product Cards, Lookbook grid).
*   **Sizing:** Use `srcset` or Vite's image optimization plugins to serve appropriately sized images for mobile vs. desktop.

#### 9.3 Bundle Size
*   Keep dependencies minimal.
*   Use `lucide-react` specific imports (e.g., `import { ShoppingBag } from 'lucide-react'`) rather than importing the whole library to ensure tree-shaking works.

---

### 10. Accessibility (a11y) & SEO

#### 10.1 Accessibility
*   **Semantic HTML:** Use `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>` appropriately.
*   **Keyboard Navigation:** Ensure all interactive elements (buttons, links, size selectors) are focusable and have visible focus states (Tailwind `focus:ring`).
*   **ARIA:** Use `aria-label` for icon-only buttons (e.g., Cart icon, Trash icon). Use `aria-expanded` for mobile menu and accordions.
*   **Contrast:** Ensure text meets WCAG AA contrast ratios (White text on `#0A0A0A` background is excellent).

#### 10.2 SEO
*   **Dynamic Meta Tags:** Use `react-helmet-async` to update `<title>` and `<meta name="description">` on every route change.
*   **Open Graph:** Add OG tags for social sharing (crucial for Instagram traffic).
*   **Sitemap:** Generate a static `sitemap.xml` during the Vite build process.

---

### 11. Security & Privacy Considerations

*   **No Sensitive Data:** The client-side app does not handle credit card numbers or passwords.
*   **External Links:** All external links (WhatsApp, Instagram) must use `rel="noopener noreferrer"` to prevent tab-napping vulnerabilities.
*   **Input Sanitization:** While there are no user inputs submitted to a server, ensure any dynamic text rendered from the `products.js` file is treated as safe, trusted data.

---

### 12. Development Phases & Milestones

| Phase | Deliverable | Estimated Effort |
| :--- | :--- | :--- |
| **Phase 1: Setup** | Vite + React + Tailwind + Router setup. Folder structure creation. | 10% |
| **Phase 2: Data & State** | `products.js` creation. Cart Context and Reducer implementation. | 20% |
| **Phase 3: Core UI** | Navbar, Footer, Home Page, Shop Page, Product Card. | 30% |
| **Phase 4: Detail & Cart** | Product Detail Page, Cart Page, WhatsApp Checkout logic. | 25% |
| **Phase 5: Polish** | About/Contact pages, Responsive tweaks, Animations, SEO, Testing. | 15% |

---

### 13. Approval

| Role | Name | Signature | Date |
| :--- | :--- | :--- | :--- |
| **Technical Lead** | [Name] | | |
| **Product Owner** | [Name] | | |

*End of Technical Design Document*