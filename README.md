# Aurelia - Meta Pixel + Catalog Demo Store

A tiny, dependency-free e-commerce site for demoing Meta's **Catalog Product
Video + Advantage+ Catalog Ads** workflow. It installs the Meta Pixel and fires
the standard commerce events (`PageView`, `ViewContent`, `AddToCart`,
`Purchase`) with `content_ids` that match a product catalog.

Pure HTML/CSS/JS, no backend, build step, or dependencies. Demo only, it does
not process real orders or payments.

## Structure

```
index.html / product.html / checkout.html / thankyou.html   Pages
css/styles.css                                               Styles
js/products.js       Product data — single source of truth
js/pixel-events.js   Meta Pixel event functions
js/app.js            Cart, filters/sort, debug overlay
catalog-feed.csv     Primary catalog feed (products + video[0].url)
catalog-video-feed.csv / supplementary-feed-template.csv    Video feed variants
```

## Configure

- **Pixel:** replace the ID in the `fbq("init", ...)` line and the `<noscript>`
  image in the 4 HTML files with your own pixel ID.
- **Products:** live only in `js/products.js`. Each `id` must equal your
  catalog's `retailer_id` so events attribute 1:1. The `category` field powers
  the on-site filters.

## Deploy

- **GitHub Pages:** push, then Settings → Pages → deploy from `main` / root.
- **Netlify:** drag the folder onto <https://app.netlify.com/drop>.
- **Local:** `python -m http.server 8000`.

## Verify events

- Meta Pixel Helper (Chrome), or append `?debug=true` for the on-page overlay.
- Events Manager → your pixel → **Test Events** (real-time; Overview lags hours).

Expected: PageView (any page), ViewContent (product page), AddToCart (button),
Purchase (checkout). Commerce events carry `content_ids`, `value`, `currency`.

## Catalog + product video

1. Commerce Manager → your catalog → Data Sources → upload `catalog-feed.csv`
   (Replace). It includes a `video[0].url` column so product video applies from
   a single source.
2. Keep to **one** data source, multiple sources cause feed source-prioritization
   conflicts that block the video field.
3. Build an Advantage+ catalog ad on the catalog; the product video renders in
   the ad preview.

Docs: <https://developers.facebook.com/docs/commerce-platform/catalog/>
