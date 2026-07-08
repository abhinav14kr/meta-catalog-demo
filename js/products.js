/*
 * products.js — SINGLE SOURCE OF TRUTH for all product data.
 * ---------------------------------------------------------------------------
 * Each `id` is the catalog's `retailer_id`. prod_001..prod_008 mirror the items
 * that already exist in catalog 1018515947811073. prod_009..prod_030 are the new
 * items — upload `catalog-feed.csv` (generated from this same data) to the
 * catalog so all 30 content_ids match and attribute.
 *
 * Pixel 1006969672056740 is already connected to the catalog as an external
 * event source, so no connection step is needed in Commerce Manager.
 *
 * The `category` field powers the on-site filters. Change data here only —
 * nothing else in the codebase hardcodes products.
 */
const PRODUCTS = [
  // --- Existing catalog items (real Unsplash images from the catalog) ---
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

  // --- New items (picsum seeded images; upload catalog-feed.csv to match) ---
  {
    id: "prod_009",
    name: "Suede Chelsea Boots",
    price: 139.99,
    category: "Shoes",
    image: "https://picsum.photos/seed/chelseaboots/600/600",
    description:
      "Premium suede Chelsea boots with elastic side panels and a stacked heel. Smart-casual staple.",
  },
  {
    id: "prod_010",
    name: "Canvas High-Top Sneakers",
    price: 64.99,
    category: "Shoes",
    image: "https://picsum.photos/seed/hightops/600/600",
    description:
      "Retro canvas high-tops with vulcanized rubber sole and a padded ankle collar.",
  },
  {
    id: "prod_011",
    name: "Merino Wool Sweater",
    price: 99.99,
    category: "Apparel",
    image: "https://picsum.photos/seed/woolsweater/600/600",
    description:
      "Fine-gauge merino wool crewneck sweater. Breathable, temperature-regulating, and itch-free.",
  },
  {
    id: "prod_012",
    name: "Linen Button-Down Shirt",
    price: 54.99,
    category: "Apparel",
    image: "https://picsum.photos/seed/linenshirt/600/600",
    description:
      "Breathable European linen shirt with a relaxed fit. Perfect for warm-weather layering.",
  },
  {
    id: "prod_013",
    name: "Quilted Puffer Vest",
    price: 89.99,
    category: "Outerwear",
    image: "https://picsum.photos/seed/puffervest/600/600",
    description:
      "Lightweight quilted puffer vest with a water-repellent shell and zippered hand pockets.",
  },
  {
    id: "prod_014",
    name: "Waterproof Rain Parka",
    price: 159.99,
    category: "Outerwear",
    image: "https://picsum.photos/seed/rainparka/600/600",
    description:
      "Fully seam-sealed rain parka with an adjustable hood and ventilated back yoke.",
  },
  {
    id: "prod_015",
    name: "Canvas Tote Bag",
    price: 39.99,
    category: "Bags",
    image: "https://picsum.photos/seed/canvastote/600/600",
    description:
      "Heavyweight organic-cotton canvas tote with reinforced handles and an interior pocket.",
  },
  {
    id: "prod_016",
    name: "Rolling Weekender Duffel",
    price: 179.99,
    category: "Bags",
    image: "https://picsum.photos/seed/duffel/600/600",
    description:
      "Spacious weekender duffel with smooth-glide wheels, a trolley sleeve, and a shoe compartment.",
  },
  {
    id: "prod_017",
    name: "Minimalist Analog Watch",
    price: 199.99,
    category: "Accessories",
    image: "https://picsum.photos/seed/analogwatch/600/600",
    description:
      "Slim 38mm analog watch with sapphire crystal and a genuine leather strap.",
  },
  {
    id: "prod_018",
    name: "Woven Leather Belt",
    price: 44.99,
    category: "Accessories",
    image: "https://picsum.photos/seed/leatherbelt/600/600",
    description:
      "Full-grain woven leather belt with a brushed-nickel buckle. Adjusts to any notch.",
  },
  {
    id: "prod_019",
    name: "Smart Fitness Tracker",
    price: 129.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/fitnesstracker/600/600",
    description:
      "Water-resistant fitness tracker with heart-rate, sleep, and SpO2 monitoring. 7-day battery.",
  },
  {
    id: "prod_020",
    name: "Portable Bluetooth Speaker",
    price: 74.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/btspeaker/600/600",
    description:
      "Pocket-sized Bluetooth speaker with 360-degree sound, IPX7 waterproofing, and 20hr playback.",
  },
  {
    id: "prod_021",
    name: "4K Action Camera",
    price: 249.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/actioncam/600/600",
    description:
      "Rugged 4K action camera with electronic image stabilization and a waterproof housing.",
  },
  {
    id: "prod_022",
    name: "Non-Slip Yoga Mat",
    price: 49.99,
    category: "Fitness",
    image: "https://picsum.photos/seed/yogamat/600/600",
    description:
      "Extra-thick 6mm non-slip yoga mat with alignment markers and a carry strap.",
  },
  {
    id: "prod_023",
    name: "Adjustable Dumbbell Set",
    price: 199.99,
    category: "Fitness",
    image: "https://picsum.photos/seed/dumbbells/600/600",
    description:
      "Space-saving adjustable dumbbells that dial from 5 to 52.5 lbs per hand.",
  },
  {
    id: "prod_024",
    name: "High-Density Foam Roller",
    price: 24.99,
    category: "Fitness",
    image: "https://picsum.photos/seed/foamroller/600/600",
    description:
      "Textured high-density foam roller for deep-tissue muscle recovery and mobility work.",
  },
  {
    id: "prod_025",
    name: "Ceramic Pour-Over Coffee Set",
    price: 64.99,
    category: "Home",
    image: "https://picsum.photos/seed/pourover/600/600",
    description:
      "Hand-glazed ceramic pour-over dripper with a matching 600ml carafe.",
  },
  {
    id: "prod_026",
    name: "Scented Soy Candle",
    price: 22.99,
    category: "Home",
    image: "https://picsum.photos/seed/soycandle/600/600",
    description:
      "Hand-poured soy candle with cedar and sandalwood notes. 50-hour burn time.",
  },
  {
    id: "prod_027",
    name: "Linen Throw Blanket",
    price: 79.99,
    category: "Home",
    image: "https://picsum.photos/seed/throwblanket/600/600",
    description:
      "Stonewashed pure-linen throw that softens with every wash. Generously oversized.",
  },
  {
    id: "prod_028",
    name: "Bamboo Cutting Board",
    price: 34.99,
    category: "Home",
    image: "https://picsum.photos/seed/cuttingboard/600/600",
    description:
      "Sustainable bamboo cutting board with a juice groove and built-in handles.",
  },
  {
    id: "prod_029",
    name: "Lightweight Running Shorts",
    price: 39.99,
    category: "Apparel",
    image: "https://picsum.photos/seed/runningshorts/600/600",
    description:
      "Featherweight running shorts with a built-in liner, zip pocket, and reflective trim.",
  },
  {
    id: "prod_030",
    name: "Trail Running Shoes",
    price: 119.99,
    category: "Shoes",
    image: "https://picsum.photos/seed/trailrunners/600/600",
    description:
      "Aggressive-lug trail runners with a rock plate and a breathable, quick-drying upper.",
  },
];

/** Look up a single product by its id. Returns null when not found. */
function getProductById(id) {
  if (!id) return null;
  return PRODUCTS.find((p) => p.id === id) || null;
}

/** Unique category names in first-seen order (used to build the filter chips). */
function getCategories() {
  const seen = [];
  PRODUCTS.forEach((p) => {
    if (p.category && seen.indexOf(p.category) === -1) seen.push(p.category);
  });
  return seen;
}

// Expose on window so the plain <script> tags on each page can share them.
window.PRODUCTS = PRODUCTS;
window.getProductById = getProductById;
window.getCategories = getCategories;
