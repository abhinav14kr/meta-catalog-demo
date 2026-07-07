/*
 * pixel-events.js — every Meta Pixel standard event, in one place.
 * ---------------------------------------------------------------------------
 * Each function mirrors a Meta commerce standard event and always sends:
 *   - content_ids  : array of product id(s) (must match catalog retailer_id)
 *   - content_type : 'product'
 *   - value        : numeric (never a string) so Meta reports revenue correctly
 *   - currency     : 'USD'
 *
 * Every call is also mirrored into the on-page Debug overlay (see app.js) so you
 * can show events firing live during a demo without opening DevTools.
 */

/**
 * Internal helper: fire an event through fbq (if present) and log it to the
 * debug overlay + console. fbq can be missing if an ad blocker strips the
 * Meta script, so we guard rather than assume it exists.
 */
function firePixelEvent(eventName, params) {
  if (typeof window.fbq === "function") {
    window.fbq("track", eventName, params);
  } else {
    // fbq blocked/unavailable — still surface it so the demo makes sense.
    console.warn(
      `[pixel] fbq unavailable; "${eventName}" not sent to Meta (ad blocker?)`
    );
  }
  if (window.DebugConsole) {
    window.DebugConsole.log(eventName, params, typeof window.fbq === "function");
  }
}

/** ViewContent — fire on a product detail page load. */
function trackViewContent(product) {
  if (!product) return;
  firePixelEvent("ViewContent", {
    content_ids: [product.id],
    content_type: "product",
    content_name: product.name,
    value: Number(product.price),
    currency: "USD",
  });
}

/** AddToCart — fire when the Add to Cart button is clicked. */
function trackAddToCart(product) {
  if (!product) return;
  firePixelEvent("AddToCart", {
    content_ids: [product.id],
    content_type: "product",
    content_name: product.name,
    value: Number(product.price),
    currency: "USD",
  });
}

/**
 * Purchase — fire on checkout completion.
 * @param {Array<{product: object, qty: number}>} lines cart line items.
 */
function trackPurchase(lines) {
  if (!Array.isArray(lines) || lines.length === 0) return;

  const content_ids = lines.map((l) => l.product.id);
  const contents = lines.map((l) => ({
    id: l.product.id,
    quantity: l.qty,
    item_price: Number(l.product.price),
  }));
  const value = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const num_items = lines.reduce((sum, l) => sum + l.qty, 0);

  firePixelEvent("Purchase", {
    content_ids,
    content_type: "product",
    contents,
    value: Number(value.toFixed(2)),
    currency: "USD",
    num_items,
  });
}

window.trackViewContent = trackViewContent;
window.trackAddToCart = trackAddToCart;
window.trackPurchase = trackPurchase;
