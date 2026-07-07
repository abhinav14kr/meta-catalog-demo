# Aurelia — Meta Pixel + Catalog Demo Store

A tiny, dependency-free e-commerce site for demoing Meta's **Catalog Product
Video + Advantage+ Catalog Ads** workflow. It looks like a real (simple) store,
installs the Meta Pixel, and fires the standard commerce events (`PageView`,
`ViewContent`, `AddToCart`, `Purchase`) with the parameters Meta needs to match
events against a product catalog.

- **Pixel ID:** `733939589457690`
- **Catalog ID (connect separately):** `1673433826846518`
- **No backend, no build step, no npm.** Pure HTML/CSS/JS.

> This is a demo. It does not process real orders, payments, accounts, or
> inventory.

---

## File structure

```
demo-store/
├── index.html          Product listing (home)
├── product.html        Product detail (uses ?id= URL param)
├── checkout.html       Cart / checkout
├── thankyou.html       Order confirmation
├── css/
│   └── styles.css      All styles
├── js/
│   ├── products.js     Product data — SINGLE SOURCE OF TRUTH
│   ├── pixel-events.js All Meta Pixel event functions
│   └── app.js          Page logic, cart, filters/sort, debug overlay
├── catalog-feed.csv                  Catalog data feed — upload to Commerce Manager
├── catalog-video-feed.csv            Video supplementary feed (sample MP4s) — ready to upload
├── supplementary-feed-template.csv   Video feed template (swap in your own CDN URLs)
└── README.md
```

---

## Customizing product data

All product data lives in **`js/products.js`** and nowhere else. Each entry:

```js
{ id: "DEMO-001", name: "...", price: 89.99, category: "...",
  image: "https://picsum.photos/seed/.../600/600", description: "..." }
```

Change names, prices, images, or descriptions there and every page updates.

---

## 30 products, filters, and catalog sync

The store has **30 products** (`prod_001` … `prod_030`) across 8 categories
(Shoes, Outerwear, Apparel, Bags, Accessories, Electronics, Fitness, Home). The
homepage has **category filter chips + a sort control** (Featured / Price / Name),
all driven off `js/products.js`.

`prod_001`–`prod_008` already exist in catalog `1673433826846518`. The other 22
(`prod_009`–`prod_030`) must be added to the catalog so all 30 `content_ids`
match and attribute.

### Add the new items to the catalog (one-time)

Upload **`catalog-feed.csv`** (generated from the same product data, standard Meta
feed schema: id, title, description, availability, condition, price, link,
image_link, brand):

1. Commerce Manager → **Catalog `1673433826846518`** → **Data Sources**.
2. Open the **existing feed** and **replace / upload** `catalog-feed.csv`
   (recommended, so there is one source of truth keyed by `id`), OR **Add items →
   Data feed → Upload file**.
3. Items are upserted by `id`: the original 8 update in place, the 22 new ones are
   created. No duplicates.

### If the catalog changes later

1. Update `js/products.js` (single source of truth).
2. Regenerate the feeds:
   ```bash
   node -e '...'   # or just re-run the generator used to build catalog-feed.csv
   ```
3. Re-upload `catalog-feed.csv` and re-deploy the site.

---

## Verifying pixel events are firing

Two ways, use both for a confident demo:

1. **Meta Pixel Helper** (Chrome extension) —
   <https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc>.
   Browse the site; it shows each event and its parameters as they fire.
2. **Built-in debug overlay** — append `?debug=true` to any URL, or click the
   **Debug: Off/On** button in the footer. A console-style panel logs every
   pixel event (name, timestamp, full params) as it fires — great for showing on
   screen during a live demo without opening DevTools. The setting persists
   across pages; append `?debug=false` to force it off.

Expected events:

| Page / action                     | Event         | Key params |
| --------------------------------- | ------------- | ---------- |
| Any page load                     | `PageView`    | — |
| Product detail page load          | `ViewContent` | `content_ids`, `content_type: product`, `value`, `currency` |
| "Add to Cart" click               | `AddToCart`   | `content_ids`, `content_type`, `value`, `currency` |
| "Complete Purchase" click         | `Purchase`    | `content_ids` (all items), `contents`, `value` (total), `num_items`, `currency` |

You can also confirm server-side in **Events Manager → Data Sources → Pixel
`733939589457690` → Test Events / Overview**.

---

## Connect the pixel to the catalog (do this separately)

The site only fires events. To close the loop for Advantage+ Catalog Ads:

1. **Commerce Manager → Catalog `1673433826846518` → Settings / Data Sources →
   Connect a pixel** → select pixel `733939589457690`.
2. Give it **24–48 hours** after deploying + browsing so Commerce Manager shows
   event data and a content-ID match rate.
3. Then layer on the **supplementary video feed** (see the CSV template) to enable
   Catalog Product Video.

---

## Deploying

### Option A — GitHub Pages (recommended)

Free, stable URL, live in ~60 seconds.

```bash
cd demo-store
git init
git add .
git commit -m "Aurelia demo store"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then: repo **Settings → Pages → Build and deployment → Source: Deploy from a
branch → `main` / `/root` → Save**. Your site is at
`https://<you>.github.io/<repo>/`.

### Option B — Netlify (drag-and-drop)

1. Go to <https://app.netlify.com/drop>.
2. Drag the entire `demo-store` folder onto the page.
3. Netlify gives you a live URL instantly. (Optional: rename the site in
   Site settings.)

### Option C — Local testing

```bash
cd demo-store
python -m http.server 8000
# open http://localhost:8000
```

> Tip: open via `http://localhost:...`, not `file://`. The pixel and events work
> either way, but a real http origin is closer to production behavior.

---

## What to do before the actual demo

1. Deploy (GitHub Pages is fastest).
2. Connect pixel `733939589457690` to catalog `1673433826846518` in Commerce
   Manager.
3. Browse the live site yourself — view products, add to cart, complete a
   purchase — to seed matched events. Do this **24–48h ahead** so match-rate and
   event data populate.
4. Verify with Meta Pixel Helper + the `?debug=true` overlay.
5. (Optional) Swap `DEMO-###` IDs for real `retailer_id`s so events match your
   live catalog items exactly.
