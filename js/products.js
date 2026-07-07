/*
 * products.js — SINGLE SOURCE OF TRUTH for all product data.
 * ---------------------------------------------------------------------------
 * These items MIRROR the real Meta catalog 1673433826846518 ("Products for
 * Abhinav personal catalog"). Each `id` is the catalog's actual `retailer_id`,
 * so the pixel's content_ids match catalog items 1:1 (match rate works, and
 * Advantage+ Catalog Ads / Catalog Product Video have matched events to use).
 *
 * Pixel 733939589457690 is already connected to this catalog as an external
 * event source, so no connection step is needed in Commerce Manager.
 *
 * If the catalog changes, re-export from Commerce Manager -> Catalog -> Items
 * and update the entries below. Nothing else in the codebase hardcodes product
 * data — change it here only.
 */
const PRODUCTS = [
  {
    id: "prod_001",
    name: "Classic White Sneakers",
    price: 79.99,
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
    description:
      "Comfortable everyday white sneakers with cushioned sole. Perfect for casual wear.",
  },
  {
    id: "prod_002",
    name: "Navy Blue Running Jacket",
    price: 129.99,
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop",
    description:
      "Lightweight windproof running jacket with reflective details. Ideal for morning jogs.",
  },
  {
    id: "prod_003",
    name: "Organic Cotton T-Shirt - Black",
    price: 34.99,
    category: "Apparel",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    description:
      "Soft organic cotton crew neck t-shirt. Sustainably sourced and ethically made.",
  },
  {
    id: "prod_004",
    name: "Leather Crossbody Bag",
    price: 149.99,
    category: "Bags",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop",
    description:
      "Genuine leather crossbody bag with adjustable strap and multiple compartments.",
  },
  {
    id: "prod_005",
    name: "Polarized Aviator Sunglasses",
    price: 59.99,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
    description:
      "UV400 polarized aviator sunglasses with metal frame. Classic style with modern protection.",
  },
  {
    id: "prod_006",
    name: "Slim Fit Chino Pants - Khaki",
    price: 69.99,
    category: "Apparel",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=600&fit=crop",
    description:
      "Stretch cotton slim fit chino pants. Versatile style for work or weekend.",
  },
  {
    id: "prod_007",
    name: "Wireless Bluetooth Earbuds",
    price: 89.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=600&fit=crop",
    description:
      "True wireless earbuds with active noise cancellation and 24hr battery life.",
  },
  {
    id: "prod_008",
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
    description:
      "Double-walled insulated water bottle. Keeps drinks cold 24hrs or hot 12hrs. 750ml capacity.",
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
