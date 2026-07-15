/*
 * products.js — SINGLE SOURCE OF TRUTH for all product data.
 * ---------------------------------------------------------------------------
 * Each `id` must equal the matching `retailer_id` in your Meta catalog so the
 * pixel's content_ids attribute 1:1. Upload catalog-feed.csv (built from this
 * same data) to your catalog so all content_ids match.
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
      "images/prod_001.jpg",
    description:
      "Comfortable everyday white sneakers with cushioned sole. Perfect for casual wear.",
  },
  {
    id: "prod_002",
    name: "Navy Blue Running Jacket",
    price: 129.99,
    category: "Outerwear",
    image:
      "images/prod_002.jpg",
    description:
      "Lightweight windproof running jacket with reflective details. Ideal for morning jogs.",
  },
  {
    id: "prod_003",
    name: "Organic Cotton T-Shirt - Black",
    price: 34.99,
    category: "Apparel",
    image:
      "images/prod_003.jpg",
    description:
      "Soft organic cotton crew neck t-shirt. Sustainably sourced and ethically made.",
  },
  {
    id: "prod_004",
    name: "Leather Crossbody Bag",
    price: 149.99,
    category: "Bags",
    image:
      "images/prod_004.jpg",
    description:
      "Genuine leather crossbody bag with adjustable strap and multiple compartments.",
  },
  {
    id: "prod_005",
    name: "Polarized Aviator Sunglasses",
    price: 59.99,
    category: "Accessories",
    image:
      "images/prod_005.jpg",
    description:
      "UV400 polarized aviator sunglasses with metal frame. Classic style with modern protection.",
  },
  {
    id: "prod_006",
    name: "Slim Fit Chino Pants - Khaki",
    price: 69.99,
    category: "Apparel",
    image:
      "images/prod_006.jpg",
    description:
      "Stretch cotton slim fit chino pants. Versatile style for work or weekend.",
  },
  {
    id: "prod_007",
    name: "Wireless Bluetooth Earbuds",
    price: 89.99,
    category: "Electronics",
    image:
      "images/prod_007.jpg",
    description:
      "True wireless earbuds with active noise cancellation and 24hr battery life.",
  },
  {
    id: "prod_008",
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    category: "Accessories",
    image:
      "images/prod_008.jpg",
    description:
      "Double-walled insulated water bottle. Keeps drinks cold 24hrs or hot 12hrs. 750ml capacity.",
  },

  // --- New items (picsum seeded images; upload catalog-feed.csv to match) ---
  {
    id: "prod_009",
    name: "Suede Chelsea Boots",
    price: 139.99,
    category: "Shoes",
    image: "images/prod_009.jpg",
    description:
      "Premium suede Chelsea boots with elastic side panels and a stacked heel. Smart-casual staple.",
  },
  {
    id: "prod_010",
    name: "Canvas High-Top Sneakers",
    price: 64.99,
    category: "Shoes",
    image: "images/prod_010.jpg",
    description:
      "Retro canvas high-tops with vulcanized rubber sole and a padded ankle collar.",
  },
  {
    id: "prod_011",
    name: "Merino Wool Sweater",
    price: 99.99,
    category: "Apparel",
    image: "images/prod_011.jpg",
    description:
      "Fine-gauge merino wool crewneck sweater. Breathable, temperature-regulating, and itch-free.",
  },
  {
    id: "prod_012",
    name: "Linen Button-Down Shirt",
    price: 54.99,
    category: "Apparel",
    image: "images/prod_012.jpg",
    description:
      "Breathable European linen shirt with a relaxed fit. Perfect for warm-weather layering.",
  },
  {
    id: "prod_013",
    name: "Quilted Puffer Vest",
    price: 89.99,
    category: "Outerwear",
    image: "images/prod_013.jpg",
    description:
      "Lightweight quilted puffer vest with a water-repellent shell and zippered hand pockets.",
  },
  {
    id: "prod_014",
    name: "Waterproof Rain Parka",
    price: 159.99,
    category: "Outerwear",
    image: "images/prod_014.jpg",
    description:
      "Fully seam-sealed rain parka with an adjustable hood and ventilated back yoke.",
  },
  {
    id: "prod_015",
    name: "Canvas Tote Bag",
    price: 39.99,
    category: "Bags",
    image: "images/prod_015.jpg",
    description:
      "Heavyweight organic-cotton canvas tote with reinforced handles and an interior pocket.",
  },
  {
    id: "prod_016",
    name: "Rolling Weekender Duffel",
    price: 179.99,
    category: "Bags",
    image: "images/prod_016.jpg",
    description:
      "Spacious weekender duffel with smooth-glide wheels, a trolley sleeve, and a shoe compartment.",
  },
  {
    id: "prod_017",
    name: "Minimalist Analog Watch",
    price: 199.99,
    category: "Accessories",
    image: "images/prod_017.jpg",
    description:
      "Slim 38mm analog watch with sapphire crystal and a genuine leather strap.",
  },
  {
    id: "prod_018",
    name: "Woven Leather Belt",
    price: 44.99,
    category: "Accessories",
    image: "images/prod_018.jpg",
    description:
      "Full-grain woven leather belt with a brushed-nickel buckle. Adjusts to any notch.",
  },
  {
    id: "prod_019",
    name: "Smart Fitness Tracker",
    price: 129.99,
    category: "Electronics",
    image: "images/prod_019.jpg",
    description:
      "Water-resistant fitness tracker with heart-rate, sleep, and SpO2 monitoring. 7-day battery.",
  },
  {
    id: "prod_020",
    name: "Portable Bluetooth Speaker",
    price: 74.99,
    category: "Electronics",
    image: "images/prod_020.jpg",
    description:
      "Pocket-sized Bluetooth speaker with 360-degree sound, IPX7 waterproofing, and 20hr playback.",
  },
  {
    id: "prod_021",
    name: "4K Action Camera",
    price: 249.99,
    category: "Electronics",
    image: "images/prod_021.jpg",
    description:
      "Rugged 4K action camera with electronic image stabilization and a waterproof housing.",
  },
  {
    id: "prod_022",
    name: "Non-Slip Yoga Mat",
    price: 49.99,
    category: "Fitness",
    image: "images/prod_022.jpg",
    description:
      "Extra-thick 6mm non-slip yoga mat with alignment markers and a carry strap.",
  },
  {
    id: "prod_023",
    name: "Adjustable Dumbbell Set",
    price: 199.99,
    category: "Fitness",
    image: "images/prod_023.jpg",
    description:
      "Space-saving adjustable dumbbells that dial from 5 to 52.5 lbs per hand.",
  },
  {
    id: "prod_024",
    name: "High-Density Foam Roller",
    price: 24.99,
    category: "Fitness",
    image: "images/prod_024.jpg",
    description:
      "Textured high-density foam roller for deep-tissue muscle recovery and mobility work.",
  },
  {
    id: "prod_025",
    name: "Ceramic Pour-Over Coffee Set",
    price: 64.99,
    category: "Home",
    image: "images/prod_025.jpg",
    description:
      "Hand-glazed ceramic pour-over dripper with a matching 600ml carafe.",
  },
  {
    id: "prod_026",
    name: "Scented Soy Candle",
    price: 22.99,
    category: "Home",
    image: "images/prod_026.jpg",
    description:
      "Hand-poured soy candle with cedar and sandalwood notes. 50-hour burn time.",
  },
  {
    id: "prod_027",
    name: "Linen Throw Blanket",
    price: 79.99,
    category: "Home",
    image: "images/prod_027.jpg",
    description:
      "Stonewashed pure-linen throw that softens with every wash. Generously oversized.",
  },
  {
    id: "prod_028",
    name: "Bamboo Cutting Board",
    price: 34.99,
    category: "Home",
    image: "images/prod_028.jpg",
    description:
      "Sustainable bamboo cutting board with a juice groove and built-in handles.",
  },
  {
    id: "prod_029",
    name: "Lightweight Running Shorts",
    price: 39.99,
    category: "Apparel",
    image: "images/prod_029.jpg",
    description:
      "Featherweight running shorts with a built-in liner, zip pocket, and reflective trim.",
  },
  {
    id: "prod_030",
    name: "Trail Running Shoes",
    price: 119.99,
    category: "Shoes",
    image: "images/prod_030.jpg",
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
