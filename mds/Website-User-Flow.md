# Website User Flow Document
## Steezy Archives E-Commerce Platform

---

### 1. Overview
This document maps the step-by-step journeys a user takes through the Steezy Archives website. Because the brand operates on a "hype/drop" model and uses a WhatsApp-based checkout, the flows are optimized for **speed, mobile usage, and direct communication**. 

There are no complex checkout forms or payment gateways; the ultimate goal of every flow is to **generate a pre-filled WhatsApp message**.

---

### 2. High-Level Sitemap
The structural hierarchy of the application.

```text
[Root /]
 ├── Home Page
 ├── Shop / Collections
 │    ├── All Products
 │    ├── Category: T-Shirts
 │    ├── Category: Hoodies
 │    └── Category: Accessories
 ├── Product Detail Page (:slug)
 ├── Shopping Cart
 ├── About Us
 └── Contact / FAQ
```

---

### 3. Core User Journeys

#### 3.1 Journey 1: The "Happy Path" (Browse to Order)
*The standard flow for a user discovering the brand and making a purchase.*

1. **Entry:** User lands on **Home Page** (via organic search, direct URL, or referral).
2. **Discovery:** User scrolls past Hero section and clicks "SHOP NOW" or browses the "New Arrivals" grid.
3. **Navigation:** User is routed to the **Shop Page**.
4. **Selection:** User clicks on a specific **Product Card** (e.g., "Steezy Archive Tee").
5. **Evaluation:** User lands on **Product Detail Page**.
   - *Action:* Views image gallery.
   - *Action:* Selects Size (e.g., "L") and Color (e.g., "White").
6. **Conversion Step 1:** User clicks **"ADD TO CART"**.
   - *System Feedback:* Toast notification appears ("Added to cart!"), Cart badge in Navbar increments to "1".
7. **Decision:** User clicks the **Cart Icon** in the Navbar.
8. **Review:** User lands on **Cart Page**.
   - *Action:* Reviews items, quantities, and subtotal.
9. **Conversion Step 2:** User clicks **"CHECKOUT VIA WHATSAPP"**.
10. **Handoff:** 
    - *System Action:* Generates WhatsApp URL with pre-filled order text.
    - *System Action:* Opens WhatsApp app (mobile) or web.whatsapp.com (desktop) in a new tab.
11. **Completion:** User hits "Send" in WhatsApp. Brand receives the order.

#### 3.2 Journey 2: The "Drop" Path (Social Media to Order)
*Optimized for Instagram/TikTok traffic where users want to buy a specific hyped item immediately.*

1. **Entry:** User clicks a link in an Instagram Story or Bio (e.g., `stzy.cl/product/steezy-2047-hoodie`).
2. **Direct Access:** User bypasses Home/Shop and lands directly on the **Product Detail Page**.
3. **Evaluation:** User views product, selects Size/Color.
4. **Action:** User clicks "ADD TO CART".
5. **Prompt:** A modal or toast appears: *"Item added! Go to cart to checkout via WhatsApp?"*
   - *Option A:* "Continue Shopping" (Closes modal).
   - *Option B:* "Go to Cart" (Routes to Cart Page).
6. **Checkout:** User clicks "CHECKOUT VIA WHATSAPP" and completes the handoff.

#### 3.3 Journey 3: Cart Management & Modification
*How a user interacts with their cart before checking out.*

1. **Entry:** User clicks Cart Icon from any page.
2. **View:** User sees **Cart Page** with list of items.
3. **Modification Actions:**
   - *Increase Quantity:* Clicks `+` button. Subtotal updates instantly.
   - *Decrease Quantity:* Clicks `-` button. If quantity reaches 0, item is removed.
   - *Remove Item:* Clicks Trash icon. Confirmation prompt: *"Remove this item?"* -> User clicks "Yes". Item disappears, subtotal recalculates.
4. **Outcome:** User proceeds to WhatsApp checkout with the updated cart.

---

### 4. State Transition Flow (Cart Logic)

This outlines how the global state (Cart Context) changes based on user actions.

| User Action | System Check | State Update | UI Feedback |
| :--- | :--- | :--- | :--- |
| **Click "Add to Cart" (No size selected)** | Is size selected? -> **NO** | State: Unchanged | Shake animation on Size Selector. Tooltip: "Please select a size." |
| **Click "Add to Cart" (Size selected)** | Is size selected? -> **YES** | State: `items.push(newItem)` OR `item.quantity++` | Toast: "Added to cart". Navbar badge increments. |
| **Click "+" in Cart** | Is quantity < 10? -> **YES** | State: `item.quantity++` | Subtotal recalculates. |
| **Click "-" in Cart** | Is quantity > 1? -> **YES** | State: `item.quantity--` | Subtotal recalculates. |
| **Click Trash Icon** | Confirm deletion? -> **YES** | State: `items.filter(item)` | Item removed. Subtotal recalculates. |
| **Click "Checkout via WhatsApp"** | Is cart empty? -> **NO** | State: Unchanged (Cart persists) | New tab opens WhatsApp. |

---

### 5. Edge Cases & Error Flows

#### 5.1 Empty Cart Flow
- **Trigger:** User navigates to `/cart` but the `cartItems` array is empty.
- **UI Display:** 
  - Large minimalist shopping bag icon.
  - Text: "Your cart is empty."
  - Button: "START SHOPPING" (Routes to `/shop`).
- **WhatsApp Button:** Disabled (grayed out) with tooltip: "Add items to checkout".

#### 5.2 Out of Stock / Sold Out Flow
- **Trigger:** User views a product where `inventory === 0` (if inventory tracking is added later) or a specific size is unavailable.
- **UI Display:** 
  - Size button is crossed out (strikethrough) and unclickable (opacity 30%).
  - "Add to Cart" button is replaced with "SOLD OUT" or "NOTIFY ME" (for v2).

#### 5.3 404 / Broken Link Flow
- **Trigger:** User types an invalid URL or clicks a broken link.
- **UI Display:** 
  - "404 - PAGE NOT FOUND" in large distorted font.
  - Subtext: "Looks like you're lost in the archives."
  - Button: "Return Home".

#### 5.4 WhatsApp Blocked / Not Installed
- **Trigger:** User clicks checkout, but device has no WhatsApp installed (rare on mobile, possible on desktop).
- **Fallback:** The link `wa.me` automatically routes to `web.whatsapp.com` on desktop browsers. No special handling required by the app, but a small text note under the button can say: *"Opens WhatsApp to complete your order."*

---

### 6. Mobile vs. Desktop Flow Nuances

Because 75%+ of traffic will be mobile, specific flow adjustments are required.

| Feature | Desktop Flow | Mobile Flow |
| :--- | :--- | :--- |
| **Navigation** | Hover over Navbar links for dropdowns. | Click "Hamburger" icon -> Full-screen slide-out drawer. |
| **Product Images** | Hover over thumbnails to change main image. | Swipe left/right on main image carousel. Tap thumbnails. |
| **Add to Cart** | Click button. | Click button. *Crucial:* Button must be sticky at the bottom of the screen so it's always reachable by the thumb. |
| **Cart Access** | Click Cart Icon in top right Navbar. | Click Cart Icon. Badge must be highly visible. |
| **Checkout** | Opens new browser tab for WhatsApp Web. | Opens WhatsApp native app directly via deep link. |
| **Filters (Shop)** | Sidebar on the left. | Bottom sheet or modal that slides up from the bottom. |

---

### 7. Post-Checkout Flow (Off-Platform)

Once the user leaves the website and enters WhatsApp, the flow is managed manually by the brand, but should follow a standardized script:

1. **User sends pre-filled message.**
2. **Brand Auto-Reply (Optional but recommended):** "Hey! Thanks for ordering from Steezy Archives. We received your request. Let us check stock and get back to you with payment details (EFT/WhatsApp Pay) and shipping costs."
3. **Brand confirms stock & calculates shipping.**
4. **User makes payment.**
5. **Brand ships item and sends tracking number.**

---

### 8. Flow Diagram Summary (Text-Based)

```text
[Entry Point]
      │
      ▼
[Home Page] ──(Link in Bio)──> [Product Page]
      │                             │
      ▼                             ▼
[Shop Page] ──(Filter/Search)──> [Product Page]
      │                             │
      │                             ▼
      │                      [Select Size/Color]
      │                             │
      │                             ▼
      │                      [Click ADD TO CART] <──(Error: Select Size)
      │                             │
      │                             ▼
      │                      [Cart State Updates]
      │                             │
      └─────────────────────────────┘
                    │
                    ▼
              [Cart Page]
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
   [Update/Remove]     [Empty Cart?] ──Yes──> [Show "Start Shopping"]
          │                   │
          │                   No
          │                   │
          ─────────┬─────────┘
                    ▼
        [Click CHECKOUT VIA WHATSAPP]
                    │
                    ▼
        [Generate URL & Open WhatsApp]
                    │
                    ▼
           [Order Complete on App]
```

---
*End of Website Flow Document*