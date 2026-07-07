/*
 * app.js — page logic, cart state, and the debug overlay.
 * ---------------------------------------------------------------------------
 * Loaded last (after products.js and pixel-events.js). Each page's <body> has a
 * data-page attribute ("home" | "product" | "checkout" | "thankyou") that tells
 * this script what to render and which pixel events to fire.
 *
 * No backend: the cart lives in localStorage. Everything degrades gracefully if
 * localStorage is unavailable (private mode, etc.).
 */

/* ------------------------------------------------------------------ *
 * Storage helpers (safe against disabled/quota-limited localStorage)
 * ------------------------------------------------------------------ */
const CART_KEY = "demo_store_cart";
const ORDER_KEY = "demo_store_last_order";
const DEBUG_KEY = "demo_store_debug";

// In-memory mirror so the cart still works when localStorage is unavailable
// (Safari private mode, blocked storage, quota errors). localStorage stays the
// source of truth when it works; memory covers the failure cases.
const memoryStore = {};

function safeGet(key) {
  try {
    const v = window.localStorage.getItem(key);
    if (v !== null) return v;
  } catch (e) {
    /* fall through to memory */
  }
  return Object.prototype.hasOwnProperty.call(memoryStore, key)
    ? memoryStore[key]
    : null;
}
function safeSet(key, value) {
  memoryStore[key] = value;
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    /* memory mirror already holds it */
  }
}
function safeRemove(key) {
  delete memoryStore[key];
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ *
 * Cart model: array of { id, qty }
 * ------------------------------------------------------------------ */
function readCart() {
  const raw = safeGet(CART_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const cleaned = [];
    parsed.forEach((l) => {
      // Drop lines whose product no longer exists in products.js.
      if (!l || !l.id || !getProductById(l.id)) return;
      // Coerce qty to a finite positive integer (guards corrupt storage where
      // qty is a string, NaN, negative, or Infinity — which would poison the
      // cart total and Purchase params).
      const qty = Math.floor(Number(l.qty));
      if (!Number.isFinite(qty) || qty <= 0) return;
      cleaned.push({ id: l.id, qty: Math.min(qty, 999) });
    });
    return cleaned;
  } catch (e) {
    return [];
  }
}
function writeCart(cart) {
  safeSet(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(id, qty) {
  qty = qty || 1;
  const cart = readCart();
  const line = cart.find((l) => l.id === id);
  if (line) {
    line.qty += qty;
  } else {
    cart.push({ id: id, qty: qty });
  }
  writeCart(cart);
}
function setQty(id, qty) {
  let cart = readCart();
  if (qty <= 0) {
    cart = cart.filter((l) => l.id !== id);
  } else {
    const line = cart.find((l) => l.id === id);
    if (line) line.qty = qty;
  }
  writeCart(cart);
}
function removeFromCart(id) {
  writeCart(readCart().filter((l) => l.id !== id));
}
function cartCount() {
  return readCart().reduce((sum, l) => sum + l.qty, 0);
}
/** Expand the cart into line items with the full product object attached. */
function cartLines() {
  return readCart()
    .map((l) => ({ product: getProductById(l.id), qty: l.qty }))
    .filter((l) => l.product);
}
function cartTotal() {
  return cartLines().reduce((sum, l) => sum + l.product.price * l.qty, 0);
}

/* ------------------------------------------------------------------ *
 * Formatting
 * ------------------------------------------------------------------ */
function money(n) {
  return "$" + Number(n).toFixed(2);
}

/* ------------------------------------------------------------------ *
 * Debug overlay — a console-style panel that logs pixel events live.
 * Enable with ?debug=true, or the footer toggle. State persists in storage.
 * ------------------------------------------------------------------ */
const DebugConsole = {
  entries: [],
  enabled: false,
  panel: null,

  isEnabled() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "true") return true;
    if (params.get("debug") === "false") return false;
    return safeGet(DEBUG_KEY) === "true";
  },

  init() {
    // A ?debug=true/false param sets the persisted preference so it carries
    // across page navigations, not just the current URL.
    const params = new URLSearchParams(window.location.search);
    const p = params.get("debug");
    if (p === "true") safeSet(DEBUG_KEY, "true");
    else if (p === "false") safeSet(DEBUG_KEY, "false");

    this.enabled = this.isEnabled();
    if (this.enabled) this.render();
    this.wireToggle();
  },

  wireToggle() {
    const btn = document.getElementById("debug-toggle");
    if (!btn) return;
    const sync = () => {
      btn.textContent = "Debug: " + (this.enabled ? "On" : "Off");
      btn.setAttribute("aria-pressed", String(this.enabled));
    };
    sync();
    btn.addEventListener("click", () => {
      this.enabled = !this.enabled;
      safeSet(DEBUG_KEY, String(this.enabled));
      if (this.enabled) {
        this.render();
      } else if (this.panel) {
        this.panel.remove();
        this.panel = null;
      }
      sync();
    });
  },

  render() {
    if (this.panel) return;
    const panel = document.createElement("div");
    panel.className = "debug-panel";
    panel.innerHTML =
      '<div class="debug-head">' +
      "<span>Pixel Events</span>" +
      '<button type="button" class="debug-clear">clear</button>' +
      "</div>" +
      '<div class="debug-log"></div>';
    document.body.appendChild(panel);
    this.panel = panel;
    panel.querySelector(".debug-clear").addEventListener("click", () => {
      this.entries = [];
      this.paint();
    });
    this.paint();
  },

  log(eventName, params, sentToMeta) {
    const ts = new Date().toLocaleTimeString();
    this.entries.unshift({ ts, eventName, params, sentToMeta });
    // Always mirror to the real console too.
    console.log("[pixel] " + eventName, params);
    if (this.enabled) {
      if (!this.panel) this.render();
      this.paint();
    }
  },

  paint() {
    if (!this.panel) return;
    const log = this.panel.querySelector(".debug-log");
    if (this.entries.length === 0) {
      log.innerHTML = '<div class="debug-empty">No events yet…</div>';
      return;
    }
    log.innerHTML = this.entries
      .map((e) => {
        const flag = e.sentToMeta
          ? ""
          : ' <span class="debug-warn">(fbq blocked)</span>';
        return (
          '<div class="debug-entry">' +
          '<div class="debug-entry-head"><span class="debug-evt">' +
          e.eventName +
          "</span>" +
          flag +
          '<span class="debug-ts">' +
          e.ts +
          "</span></div>" +
          '<pre class="debug-params">' +
          escapeHtml(JSON.stringify(e.params, null, 2)) +
          "</pre>" +
          "</div>"
        );
      })
      .join("");
  },
};
window.DebugConsole = DebugConsole;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// For values placed inside quoted HTML attributes (src, alt, ...). Escapes
// quotes too, so swapping in real catalog data with apostrophes/quotes or an
// unexpected image URL can't break out of the attribute or inject markup.
function escapeAttr(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ------------------------------------------------------------------ *
 * Shared UI bits
 * ------------------------------------------------------------------ */
function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  const count = cartCount();
  badge.textContent = String(count);
  badge.style.display = count > 0 ? "flex" : "none";
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ------------------------------------------------------------------ *
 * Page renderers
 * ------------------------------------------------------------------ */
// Home page state for the filter/sort controls.
const homeState = { category: "All", sort: "featured" };

function cardHtml(p) {
  return (
    '<a class="card" href="product.html?id=' +
    encodeURIComponent(p.id) +
    '">' +
    '<div class="card-img"><img loading="lazy" src="' +
    escapeAttr(p.image) +
    '" alt="' +
    escapeAttr(p.name) +
    '"></div>' +
    '<div class="card-body">' +
    '<span class="card-cat">' +
    escapeHtml(p.category) +
    "</span>" +
    '<h3 class="card-name">' +
    escapeHtml(p.name) +
    "</h3>" +
    '<span class="card-price">' +
    money(p.price) +
    "</span>" +
    "</div>" +
    "</a>"
  );
}

function renderHome() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  renderFilterChips();
  wireSort();
  renderProductGrid();
}

function renderFilterChips() {
  const wrap = document.getElementById("filter-chips");
  if (!wrap) return;
  const cats = ["All"].concat(getCategories());
  wrap.innerHTML = cats
    .map(
      (c) =>
        '<button type="button" class="chip' +
        (c === homeState.category ? " chip-active" : "") +
        '" data-cat="' +
        escapeAttr(c) +
        '">' +
        escapeHtml(c) +
        "</button>"
    )
    .join("");
  wrap.querySelectorAll(".chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      homeState.category = btn.getAttribute("data-cat");
      renderFilterChips(); // repaint active state
      renderProductGrid();
    });
  });
}

function wireSort() {
  const sel = document.getElementById("sort-select");
  if (!sel || sel.dataset.wired) return;
  sel.dataset.wired = "1";
  sel.value = homeState.sort;
  sel.addEventListener("change", () => {
    homeState.sort = sel.value;
    renderProductGrid();
  });
}

function renderProductGrid() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  let list = PRODUCTS.slice();
  if (homeState.category !== "All") {
    list = list.filter((p) => p.category === homeState.category);
  }
  if (homeState.sort === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (homeState.sort === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (homeState.sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  const count = document.getElementById("result-count");
  if (count) {
    count.textContent =
      list.length + (list.length === 1 ? " product" : " products");
  }

  grid.innerHTML = list.length
    ? list.map(cardHtml).join("")
    : '<div class="empty-state"><p>No products in this category.</p></div>';
}

function renderProduct() {
  const wrap = document.getElementById("product-detail");
  if (!wrap) return;
  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get("id"));

  if (!product) {
    wrap.innerHTML =
      '<div class="empty-state">' +
      "<h2>Product not found</h2>" +
      "<p>That item doesn’t exist in this demo store.</p>" +
      '<a class="btn" href="index.html">Back to shop</a>' +
      "</div>";
    document.title = "Not found — Aurelia";
    return;
  }

  document.title = product.name + " — Aurelia";
  wrap.innerHTML =
    '<div class="pdp">' +
    '<div class="pdp-img"><img src="' +
    escapeAttr(product.image) +
    '" alt="' +
    escapeAttr(product.name) +
    '"></div>' +
    '<div class="pdp-info">' +
    '<span class="card-cat">' +
    escapeHtml(product.category) +
    "</span>" +
    "<h1>" +
    escapeHtml(product.name) +
    "</h1>" +
    '<div class="pdp-price">' +
    money(product.price) +
    "</div>" +
    '<p class="pdp-desc">' +
    escapeHtml(product.description) +
    "</p>" +
    '<button class="btn btn-lg" id="add-to-cart">Add to Cart</button>' +
    '<a class="link-muted" href="index.html">← Continue shopping</a>' +
    "</div>" +
    "</div>";

  // ViewContent fires on load.
  trackViewContent(product);

  document.getElementById("add-to-cart").addEventListener("click", () => {
    addToCart(product.id, 1);
    trackAddToCart(product);
    showToast(product.name + " added to cart");
  });
}

function renderCheckout() {
  const wrap = document.getElementById("checkout");
  if (!wrap) return;

  function paint() {
    const lines = cartLines();
    if (lines.length === 0) {
      wrap.innerHTML =
        '<div class="empty-state">' +
        "<h2>Your cart is empty</h2>" +
        "<p>Add a few items to see the checkout flow.</p>" +
        '<a class="btn" href="index.html">Browse products</a>' +
        "</div>";
      return;
    }

    const rows = lines
      .map(
        (l) =>
          '<div class="cart-row" data-id="' +
          encodeURIComponent(l.product.id) +
          '">' +
          '<img class="cart-thumb" src="' +
          escapeAttr(l.product.image) +
          '" alt="' +
          escapeAttr(l.product.name) +
          '">' +
          '<div class="cart-row-main">' +
          '<div class="cart-row-name">' +
          escapeHtml(l.product.name) +
          "</div>" +
          '<div class="cart-row-meta">' +
          money(l.product.price) +
          " · " +
          escapeHtml(l.product.id) +
          "</div>" +
          "</div>" +
          '<div class="qty">' +
          '<button type="button" class="qty-btn" data-act="dec" aria-label="Decrease quantity">−</button>' +
          '<span class="qty-val">' +
          l.qty +
          "</span>" +
          '<button type="button" class="qty-btn" data-act="inc" aria-label="Increase quantity">+</button>' +
          "</div>" +
          '<div class="cart-row-total">' +
          money(l.product.price * l.qty) +
          "</div>" +
          '<button type="button" class="cart-remove" data-act="rm" aria-label="Remove item">×</button>' +
          "</div>"
      )
      .join("");

    wrap.innerHTML =
      '<div class="cart-list">' +
      rows +
      "</div>" +
      '<div class="cart-summary">' +
      '<div class="cart-total-line"><span>Total</span><strong>' +
      money(cartTotal()) +
      "</strong></div>" +
      '<button class="btn btn-lg btn-block" id="complete-purchase">Complete Purchase</button>' +
      '<a class="link-muted" href="index.html">← Keep shopping</a>' +
      "</div>";

    // Quantity + remove controls.
    wrap.querySelectorAll(".cart-row").forEach((row) => {
      const id = decodeURIComponent(row.getAttribute("data-id"));
      row.querySelectorAll("[data-act]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const act = btn.getAttribute("data-act");
          const current = readCart().find((l) => l.id === id);
          const q = current ? current.qty : 0;
          if (act === "inc") setQty(id, q + 1);
          else if (act === "dec") setQty(id, q - 1);
          else if (act === "rm") removeFromCart(id);
          paint();
        });
      });
    });

    // Purchase.
    wrap
      .querySelector("#complete-purchase")
      .addEventListener("click", () => {
        const lines = cartLines();
        if (lines.length === 0) return;
        const order = {
          id: "AUR-" + Date.now().toString(36).toUpperCase(),
          value: Number(cartTotal().toFixed(2)),
          items: lines.map((l) => ({
            id: l.product.id,
            name: l.product.name,
            price: l.product.price,
            qty: l.qty,
          })),
        };
        trackPurchase(lines);
        safeSet(ORDER_KEY, JSON.stringify(order));
        safeRemove(CART_KEY);
        // In debug mode, pause briefly so the Purchase payload is visible in the
        // overlay before we navigate away (handy during a live demo).
        const go = () => {
          window.location.href = "thankyou.html";
        };
        if (DebugConsole.enabled) window.setTimeout(go, 700);
        else go();
      });
  }

  paint();
}

function renderThankYou() {
  const wrap = document.getElementById("order-confirmation");
  if (!wrap) return;
  updateCartBadge();

  let order = null;
  const raw = safeGet(ORDER_KEY);
  if (raw) {
    try {
      order = JSON.parse(raw);
    } catch (e) {
      order = null;
    }
  }

  if (!order) {
    wrap.innerHTML =
      "<h1>Thank you!</h1>" +
      "<p>Your order has been placed.</p>" +
      '<a class="btn" href="index.html">Back to shop</a>';
    return;
  }

  const items = (order.items || [])
    .map(
      (it) =>
        "<li>" +
        escapeHtml(it.name) +
        ' <span class="muted">× ' +
        it.qty +
        "</span>" +
        '<span class="order-item-price">' +
        money(it.price * it.qty) +
        "</span></li>"
    )
    .join("");

  wrap.innerHTML =
    '<div class="confirm-check">✓</div>' +
    "<h1>Thank you for your order!</h1>" +
    '<p class="muted">Order <strong>' +
    escapeHtml(order.id) +
    "</strong> is confirmed. A receipt is on its way to your inbox.</p>" +
    '<ul class="order-items">' +
    items +
    "</ul>" +
    '<div class="cart-total-line order-grand"><span>Total</span><strong>' +
    money(order.value) +
    "</strong></div>" +
    '<a class="btn" href="index.html">Continue shopping</a>';
}

/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  DebugConsole.init();
  // Persist a sanitized cart so stale/corrupt lines get cleaned out of storage,
  // not just filtered on read.
  if (safeGet(CART_KEY)) writeCart(readCart());
  updateCartBadge();

  const page = document.body.getAttribute("data-page");
  if (page === "home") renderHome();
  else if (page === "product") renderProduct();
  else if (page === "checkout") renderCheckout();
  else if (page === "thankyou") renderThankYou();
});
