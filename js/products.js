/*
 * products.js — SINGLE SOURCE OF TRUTH for all product data.
 * ---------------------------------------------------------------------------
 * To demo against your real Meta catalog (ID 1673433826846518):
 *   1. Commerce Manager -> Catalog -> Items -> Export.
 *   2. Replace each `id` below with the matching `retailer_id` from that export.
 *      The pixel fires `content_ids` using these `id` values, and they must
 *      match the catalog's retailer_id field for events to attribute.
 *   3. Optionally update name/price/image to match the real items.
 *
 * Nothing else in the codebase hardcodes product data — change it here only.
 */
const PRODUCTS = [
  {
    id: "DEMO-001",
    name: "Classic White Sneakers",
    price: 89.99,
    category: "Shoes",
    image: "https://picsum.photos/seed/sneakers/600/600",
    description:
      "Everyday low-top sneakers in premium white leather with a cushioned footbed and durable rubber outsole. Goes with everything.",
  },
  {
    id: "DEMO-002",
    name: "Leather Crossbody Bag",
    price: 129.99,
    category: "Bags",
    image: "https://picsum.photos/seed/bag/600/600",
    description:
      "Full-grain leather crossbody with an adjustable strap and magnetic flap. Compact enough for essentials, roomy enough for a day out.",
  },
  {
    id: "DEMO-003",
    name: "Oversized Sunglasses",
    price: 59.99,
    category: "Accessories",
    image: "https://picsum.photos/seed/sunglasses/600/600",
    description:
      "Bold oversized frames with UV400 polarized lenses and lightweight acetate construction. Includes a hard case and cleaning cloth.",
  },
  {
    id: "DEMO-004",
    name: "Minimalist Watch",
    price: 199.99,
    category: "Watches",
    image: "https://picsum.photos/seed/watch/600/600",
    description:
      "Slim 38mm case, sapphire crystal, and a genuine leather band. Understated design that reads clean on any wrist.",
  },
  {
    id: "DEMO-005",
    name: "Denim Jacket",
    price: 149.99,
    category: "Outerwear",
    image: "https://picsum.photos/seed/jacket/600/600",
    description:
      "A classic trucker jacket in mid-wash rigid denim that breaks in beautifully over time. Timeless layering piece for any season.",
  },
  {
    id: "DEMO-006",
    name: "Running Shoes Pro",
    price: 159.99,
    category: "Shoes",
    image: "https://picsum.photos/seed/running/600/600",
    description:
      "Performance running shoe with responsive foam midsole, breathable engineered mesh upper, and a grippy carbon-rubber outsole.",
  },
  {
    id: "DEMO-007",
    name: "Canvas Tote Bag",
    price: 39.99,
    category: "Bags",
    image: "https://picsum.photos/seed/tote/600/600",
    description:
      "Heavyweight organic-cotton canvas tote with reinforced handles and an interior pocket. Built to haul groceries or gear.",
  },
  {
    id: "DEMO-008",
    name: "Wireless Earbuds",
    price: 79.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/earbuds/600/600",
    description:
      "True-wireless earbuds with active noise cancellation, 30-hour total battery, and a pocketable charging case.",
  },
  {
    id: "DEMO-009",
    name: "Yoga Mat Premium",
    price: 49.99,
    category: "Fitness",
    image: "https://picsum.photos/seed/yoga/600/600",
    description:
      "Extra-thick 6mm non-slip yoga mat with alignment markers and a moisture-wicking top layer. Includes a carry strap.",
  },
  {
    id: "DEMO-010",
    name: "Stainless Water Bottle",
    price: 34.99,
    category: "Accessories",
    image: "https://picsum.photos/seed/bottle/600/600",
    description:
      "Double-walled insulated bottle that keeps drinks cold for 24 hours or hot for 12. Leakproof lid and powder-coated finish.",
  },
];

/** Look up a single product by its id. Returns null when not found. */
function getProductById(id) {
  if (!id) return null;
  return PRODUCTS.find((p) => p.id === id) || null;
}

// Expose on window so the plain <script> tags on each page can share them.
window.PRODUCTS = PRODUCTS;
window.getProductById = getProductById;
