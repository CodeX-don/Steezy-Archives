# Design Brief
## Steezy Archives (stzy.cl) E-Commerce Platform

---

### 1. Project Overview
**Project Name:** Steezy Archives Web Store
**Objective:** Design a high-converting, mobile-first e-commerce website that perfectly encapsulates the raw, underground, and exclusive aesthetic of the Steezy Archives streetwear brand. 
**Primary Goal:** Guide users seamlessly from product discovery to a WhatsApp-based checkout, maintaining the "hype" and "archive" vibe throughout the entire journey.

---

### 2. Brand Identity & Core Philosophy
*   **Brand Name:** Steezy Archives (STZY)
*   **Tagline:** "THEY CANT BE US"
*   **Core Vibe:** Raw Urbanism, Lo-Fi Streetwear, Y2K nostalgia, Grunge, Underground, Candid.
*   **Personality:** Rebellious, exclusive, community-driven, unpolished but intentional.
*   **Design Metaphor:** The website should feel like flipping through a physical, grainy zine or a backstage pass at an underground rave. It is the anti-thesis of a clean, corporate, white-background e-commerce store.

---

### 3. Visual Direction & Aesthetic
*   **Style:** Dark Mode Brutalism / Lo-Fi Streetwear.
*   **Texture:** Incorporate subtle noise/grain overlays on backgrounds to mimic film photography. Avoid flat, sterile colors.
*   **Photography Treatment:** Images should be high-contrast. Lifestyle shots should look like they were taken with a direct flash at night. 
*   **Motion:** Micro-interactions should be snappy and raw (e.g., hard cuts instead of smooth fades, slight jitter on hover, fast transitions).

---

### 4. Design System & Guidelines

#### 4.1 Color Palette
The palette is strictly high-contrast to ensure readability and maintain the gritty aesthetic.

| Role | Color Name | Hex Code | Usage Guidelines |
| :--- | :--- | :--- | :--- |
| **Background** | Obsidian Black | `#0A0A0A` | Main page background, Navbar, Footer. |
| **Surface/Card** | Deep Charcoal | `#111111` | Product cards, cart summary box, modal backgrounds. |
| **Border/Divider** | Concrete Grey | `#1A1A1A` | Subtle dividers, inactive button borders. |
| **Primary Text** | Stark White | `#F4F4F4` | Headings, body text, primary icons. |
| **Secondary Text** | Muted Grey | `#8C8C8C` | Captions, meta info, inactive states. |
| **Brand Accent** | Archive Red | `#D32F2F` | **Use sparingly.** Sale tags, "NEW" badges, active states, error messages. |
| **Action/Success** | WhatsApp Green | `#25D366` | **Exclusively** for the WhatsApp Checkout button and WhatsApp icons. |

#### 4.2 Typography
The typography pairs a chaotic, aggressive display font with a highly structured, utilitarian monospace font.

| Role | Font Style / Recommendation | Weight | Usage |
| :--- | :--- | :--- | :--- |
| **Display / Logo** | Custom Distorted / Gothic (e.g., *Metal Mania*, *UnifrakturMaguntia*, or custom SVG) | Heavy (700+) | Main Logo, massive Hero headlines ("THEY CANT BE US"). |
| **Headings** | Extended Sans-Serif (e.g., *Druk Wide*, *Monument Extended*) | Bold (700) | Section titles ("NEW ARRIVALS", "SHOP BY CATEGORY"). |
| **Body & UI** | Monospace (e.g., *Space Mono*, *JetBrains Mono*, *Roboto Mono*) | Regular (400) | Product descriptions, prices, navigation links, buttons. Gives a "receipt/archive" feel. |

#### 4.3 Iconography
*   **Style:** Minimalist, sharp, outlined icons. 
*   **Library:** Lucide Icons (standardized, clean).
*   **Treatment:** Icons should be stark white. On hover, they can shift to Archive Red or invert colors.

---

### 5. UI/UX Principles
1.  **Mobile-First is Law:** 80% of the design effort must focus on the mobile experience. Touch targets must be minimum 44x44px.
2.  **Thumb-Zone Navigation:** Primary actions (Add to Cart, Checkout) must be easily reachable with a thumb on mobile screens.
3.  **Frictionless Hype:** Do not force users to create accounts. The path from "seeing" to "WhatsApp checkout" must be as short as possible.
4.  **Visual Hierarchy:** The product image is king. UI elements should frame the product, not compete with it.

---

### 6. Key Page Layout Directives

#### 6.1 Global Navigation (Navbar)
*   **Desktop:** Transparent background that turns solid `#0A0A0A` on scroll. Logo left, centered links, Cart/User right.
*   **Mobile:** Sticky top. Logo left, Cart right. Hamburger menu right (or left) that opens a full-screen, edge-to-edge black overlay with massive typography for links.

#### 6.2 Home Page
*   **Hero Section:** Full viewport height (`100vh`). Dark, grainy background image. Massive, slightly distorted "THEY CANT BE US" text. Two buttons: Primary (White bg, Black text) and Secondary (Transparent bg, White border).
*   **Category Grid:** Asymmetrical or standard 3-column grid. Images should have a slight dark overlay that lifts on hover. Text is overlaid at the bottom left of the image.
*   **Lookbook:** Masonry layout. No UI clutter. Just raw, high-quality lifestyle images.

#### 6.3 Shop / Collections Page
*   **Layout:** Clean grid. 2 columns on mobile, 3 on desktop.
*   **Filters:** On mobile, filters should be a horizontal scrolling pill bar at the top, or a "Filter" button that opens a bottom-sheet drawer.
*   **Product Card:** 
    *   Image aspect ratio 3:4.
    *   No rounded corners (sharp edges fit the brutalist vibe).
    *   Below image: Product name (left, monospace), Price (right, bold).
    *   Hover state: Image swaps to a detail shot or model shot.

#### 6.4 Product Detail Page (PDP)
*   **Layout:** 
    *   *Desktop:* 50/50 split. Left is a sticky image gallery. Right is scrollable product info.
    *   *Mobile:* Image gallery at top (swipeable). Product info below.
*   **Sticky CTA (Mobile):** When the user scrolls past the "Add to Cart" button on mobile, a sticky bar should appear at the bottom of the screen with the Price and an "Add to Cart" button, ensuring it's always accessible.
*   **Size Selector:** Square buttons. Unselected: transparent bg, grey border. Selected: White bg, black text. Out of stock: 20% opacity with a strikethrough.

#### 6.5 Cart & Checkout Page
*   **Layout:** 
    *   *Desktop:* 2-column. Left: Item list. Right: Sticky Order Summary box.
    *   *Mobile:* Single column. Item list on top, Order Summary below.
*   **Item Row:** Small thumbnail (square), Name, Size/Color, Quantity stepper (+/-), Price, Trash icon.
*   **The Checkout Button:** This is the most important element on the page.
    *   **Text:** "CHECKOUT VIA WHATSAPP"
    *   **Style:** Full width. Background: WhatsApp Green (`#25D366`) OR Stark White (`#F4F4F4`) with a WhatsApp icon. Text: Black. 
    *   **Subtext:** Small text below the button: *"Opens WhatsApp to finalize your order."*

---

### 7. Imagery & Asset Guidelines
*   **Product Photos:** Must be high-resolution. If the brand provides raw/flash photos, use them. Do not over-edit or brighten them artificially.
*   **Backgrounds:** Avoid pure solid black where possible; use a very subtle noise texture (SVG or CSS) over the `#0A0A0A` background to give it depth.
*   **Logos:** Provide SVG versions of the STZY logo for crisp rendering on all devices.

---

### 8. Deliverables Required from Design Phase
1.  **High-Fidelity Mockups:** Desktop (1440px) and Mobile (390px) views for Home, Shop, Product Detail, and Cart pages.
2.  **Interactive Prototype:** A clickable Figma/Adobe XD prototype demonstrating the mobile menu, product image gallery swipe, and cart quantity adjustments.
3.  **Design System / Style Guide:** A dedicated page in the design file outlining all colors, typography scales, button states (default, hover, active, disabled), and form elements.
4.  **Asset Export:** All icons, logos, and optimized web images (WebP) ready for development handoff.

---
*End of Design Brief*