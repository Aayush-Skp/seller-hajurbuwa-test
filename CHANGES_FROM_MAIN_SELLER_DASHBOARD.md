# Seller Dashboard Changes from `main`

Repository: `hajurbuwa-seller-dashboard`  
Base branch: `main` (`a09ec46` — *added price per unit in group orders*)

This document lists **only** application changes on the two feature branches below compared to `main`. Nothing here is merged into `main` yet.

**Excluded from all branch diffs:** `bun.lock`, `SELLER_PAGES_REFERENCE.md`, and local `.env` changes. Do not commit secrets.

---

## Branch overview

| Branch | HEAD | Commits ahead of `main` | Files | +Lines / −Lines | Purpose |
|--------|------|-------------------------|-------|-----------------|---------|
| `feat/product-management` | `dce22ea` | 1 | 26 | +1,699 / −1,006 | Product wizard, table, pricing modals, shared table UI |
| `feat/order-management` | `d522161` | 2 | 35 | +2,787 / −730 | Order listing, filters, detail page, timeline |

### How the branches relate

```
main (a09ec46)
├── feat/product-management (dce22ea)
│     └── dce22ea  product wizard, table, pricing modals, shared components
└── feat/order-management (d522161)
      ├── 68a81c4  order listing, detail views, filters, routing
      └── d522161  this changelog
```

- `feat/order-management` is based on `main` and **re-introduces** shared utilities from the product branch (`Loader`, `Pagination`, `Search`, `TabStatusBadge`, `removeBaseUrl`, `tabStatusCounts`) so it can run without merging product-management first.
- Both branches can be merged independently, but **product + order together** requires merging both (shared files are identical in spirit).

---

## 1. `feat/product-management`

**Commit:** `dce22ea` — *Revamp seller product management UI and API integration.*

### Files changed (26)

| Status | File |
|--------|------|
| Added | `src/components/common/Loader.tsx` |
| Added | `src/components/common/ModalButtons.tsx` |
| Added | `src/components/common/Pagination.tsx` |
| Added | `src/components/common/Search.tsx` |
| Added | `src/components/common/TabStatusBadge.tsx` |
| Added | `src/utils/removeBaseUrl.ts` |
| Added | `src/utils/tabStatusCounts.ts` |
| Modified | `src/components/productListing/*` (6 files) |
| Modified | `src/components/productManagement/*` (5 files) |
| Modified | `src/pages/product-management.tsx`, `product/add.tsx`, `update.tsx`, `duplicate.tsx` |
| Modified | `src/services/productService.ts` |
| Modified | `src/config/httpClient.ts` |
| Modified | `src/constants/EnvironmentConstant.ts` |
| Modified | `src/constants/serverConstants.ts` |

### New shared components

| File | Description |
|------|-------------|
| `Loader.tsx` | Centered loading spinner |
| `ModalButtons.tsx` | `YesButton` / `NoButton` for confirmation modals |
| `Pagination.tsx` | Server-side pagination; syncs page with URL via `removeBaseUrl` |
| `Search.tsx` | Debounced keyword search input |
| `TabStatusBadge.tsx` | Count badge on status tabs |
| `tabStatusCounts.ts` | Normalizes `status_array` / `statusCount` from API |
| `removeBaseUrl.ts` | Strips API base URL from Laravel pagination links |

### Product listing wizard — `src/components/productListing/`

| File | Changes |
|------|---------|
| `index.tsx` | Refactored add/edit/duplicate orchestration; mode-aware step flow |
| `GeneralInformation.tsx` | Form layout, validation, category/brand/unit pickers |
| `PriceAndStock.tsx` | Bulk pricing tiers, minimum order, stock fields |
| `ProductDetails.tsx` | Description and highlight fields |
| `ServicesAndDelivery.tsx` | Delivery options, weight, service toggles |
| `ProductAddSuccessModal.tsx` | Post-add success state and navigation |

### Product management — `src/components/productManagement/`

| File | Changes |
|------|---------|
| `index.tsx` | Tabbed listing with search, pagination, status badges |
| `ProductManagementTable.tsx` | Full table redesign: actions, stock/price display, status chips |
| `ActionButtons.tsx` | Activate, deactivate, delete, duplicate, edit actions |
| `PriceEditModal.tsx` | Inline price/stock/bulk-tier editing modal |
| `TabsHeader.tsx` | Status tabs with `TabStatusBadge` counts |

### Services — `src/services/productService.ts`

| Function | Change |
|----------|--------|
| `getProductsByStatus(url)` | **New** — generic paginated fetch by full URL |
| `getProductById()` | Normalizes `featured_highlights` array on response |
| `updateProductStock(id, in_stock)` | **New** — FormData update with `update_type=2` |
| `updateProductPricing(id, payload)` | **New** — bulk pricing, minimum order, price per unit |
| `activateProduct()` | Fixed path: `/seller/activate-product/{id}` |
| `normalizeFeaturedHighlights()` | **New private** — ensures highlights always an array |

New type: `ProductBulkTier { quantity, price }`

### Config & constants

| File | Changes |
|------|---------|
| `httpClient.ts` | Local dev API: `http://127.0.0.1:8000/api` when `ENVIRONMENT_TYPE_TEST` |
| `EnvironmentConstant.ts` | Default env switched to `ENVIRONMENT_TYPE_TEST` for local dev |
| `serverConstants.ts` | Added `storefrontBaseUrl`, `getRetailerProductUrl()`, `resolveImageUrl()`; image base from `NEXT_PUBLIC_IMAGE_BASE_URL` |

### Key UX / behaviour

1. **Status tab counts** — Tabs read `status_array` from API (falls back to `statusCount`).
2. **Pagination** — Page changes update URL query string.
3. **Search** — Debounced keyword search on product management table.
4. **Price edit modal** — Edit stock, unit price, bulk tiers, minimum order in-table.
5. **Image URLs** — `resolveImageUrl()` handles full URLs and relative bucket paths.
6. **Storefront link** — `getRetailerProductUrl(productId)` for "view on storefront".

### Routes

| Route | Component |
|-------|-----------|
| `/product-management` | `productManagement/index.tsx` |
| `/product/add` | `productListing/index.tsx` (add) |
| `/product/update?id=` | `productListing/index.tsx` (edit) |
| `/product/duplicate?id=` | `productListing/index.tsx` (duplicate) |

### Backend pairing

Requires `feat/seller-product-management` on `hajurbuwa-backend` for `status_array`, local image paths, and pricing fields.

---

## 2. `feat/order-management`

**HEAD:** `d522161` — *Add seller dashboard changelog documenting changes from main.*

**Prior commit:** `68a81c4` — *Revamp seller order management UI with detail views and filters.*

### Files changed (35)

Includes everything in the shared-component table from Section 1 (re-added on this branch) plus:

| Status | File |
|--------|------|
| Added | `CHANGES_FROM_MAIN_SELLER_DASHBOARD.md` |
| Added | `src/components/orderManagement/BuyerDetails.tsx` |
| Added | `src/components/orderManagement/OrderDescription.tsx` |
| Added | `src/components/orderManagement/OrderDetailCard.tsx` |
| Added | `src/components/orderManagement/OrderFilters.tsx` |
| Added | `src/components/orderManagement/OrderTimeline.tsx` |
| Added | `src/components/orderManagement/SectionTabsHeader.tsx` |
| Added | `src/components/orderManagement/SellerPayments.tsx` |
| Added | `src/components/orderManagement/SellerShippings.tsx` |
| Added | `src/components/orderManagement/ShippingAndPayment.tsx` |
| Added | `src/components/orderManagement/ShippingDetails.tsx` |
| Added | `src/components/orderManagement/buildOrderTimeline.ts` |
| Added | `src/constants/orderPayment.ts` |
| Added | `src/pages/order-management/index.tsx` |
| Added | `src/pages/order-management/[orderId].tsx` |
| Added | `src/utils/dateformat.ts` |
| Added | `src/utils/orderPricing.ts` |
| Deleted | `src/pages/order-management.tsx` |
| Modified | `OrdersTable.tsx`, `OrderDetails.tsx`, `TabsHeader.tsx`, `index.tsx` |
| Modified | `src/pages/order/index.tsx` (legacy redirect) |
| Modified | `src/components/DashboardStats.tsx` |
| Modified | `src/services/orderServices.ts` |

### Order components — `src/components/orderManagement/`

| File | Description |
|------|-------------|
| `BuyerDetails.tsx` | Buyer name, PAN, phone, email card |
| `OrderDescription.tsx` | Full order detail page layout |
| `OrderDetailCard.tsx` | `DetailCard`, `DetailRow`, `CopyableText` |
| `OrderFilters.tsx` | Date range + payment type/status filters |
| `OrderTimeline.tsx` | Visual step-by-step status timeline |
| `SectionTabsHeader.tsx` | Section navigation within order detail |
| `SellerPayments.tsx` | Payment mode, status, amount display |
| `SellerShippings.tsx` | Shipping address, carrier, delivery estimate |
| `ShippingAndPayment.tsx` | Combined shipping + payment wrapper |
| `ShippingDetails.tsx` | Address line display |
| `buildOrderTimeline.ts` | Builds timeline steps from status history |

### Services — `src/services/orderServices.ts`

| Function | Before | After |
|----------|--------|-------|
| `getOrdersByStatus` | `(status, currentPageUrl)` — simple POST | `(url: string)` — parses URL params, sends filter body |
| `searchOrdersWithStatusAndKeyword` | Separate search function | Merged into `getOrdersByStatus` when URL contains `/orders/search` |
| `getSingleOrderDetails` | Returns `res.data.data` | Returns full `res.data` |
| `changeOrderStatus` | Path `seller/set-order-status/` | Path `/seller/set-order-status/` (leading slash) |

**New POST body fields on order list requests:**

```typescript
{
  date_from?: string;
  date_to?: string;
  payment_mode?: string;
  payment_status?: string;
}
```

### Key UX / behaviour

1. **URL-driven tabs** — `/order-management?tab=unshipped` opens the correct status tab.
2. **Order detail route** — `/order-management/[orderId]` is a dedicated page.
3. **Order timeline** — `buildOrderTimeline()` renders status progression with timestamps.
4. **Filters** — Date range and payment filters passed to backend.
5. **Legacy redirect** — `/order?order_id=` → `/order-management/[orderId]`.
6. **Dashboard deep link** — "Unshipped Orders" card → `/order-management?tab=unshipped`.

### Routes

| Route | Before | After |
|-------|--------|-------|
| `/order-management` | `pages/order-management.tsx` | `pages/order-management/index.tsx` |
| `/order-management?tab=` | — | Deep-link to status tab |
| `/order-management/[orderId]` | — | **New** order detail page |
| `/order?order_id=` | Order view | Redirect to `/order-management/[orderId]` |

### Backend pairing

Requires `feat/seller-order-management` on `hajurbuwa-backend` for filter params, shipping fields on list rows, and enriched order detail responses.

> **Note:** Backend `feat/order-management` also touches seller order APIs with a different approach. Align backend branch before merging both seller and admin order work.

---

## Shared between both branches

| Category | Files |
|----------|-------|
| Common UI | `Loader`, `ModalButtons`, `Pagination`, `Search`, `TabStatusBadge` |
| Utils | `tabStatusCounts.ts`, `removeBaseUrl.ts` |
| Config | `httpClient.ts`, `EnvironmentConstant.ts`, `serverConstants.ts` |

---

## Cross-repo feature map

| Seller dashboard | Backend branch | Key API contract |
|------------------|----------------|------------------|
| `feat/product-management` | `feat/seller-product-management` | `status_array`, `minimum_order`, image path normalization |
| `feat/order-management` | `feat/seller-order-management` | `date_from`, `date_to`, `payment_mode`, `payment_status`, shipping address fields on rows |

| API field / param | Used by |
|-------------------|---------|
| `status_array` in list responses | Tab badge counts (product + order) |
| `minimum_order` on product update | Price edit modal |
| `date_from`, `date_to`, `payment_mode`, `payment_status` | Order filters |
| `shipping_state/city/area/address_*` on order rows | Orders table + detail pages |

---

## Environment variables

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_IMAGE_BASE_URL=http://127.0.0.1:8000/hajurbuwa-bucket/
NEXT_PUBLIC_STOREFRONT_URL=https://www.hajurbuwa.com
```

Local dev uses `ENVIRONMENT_TYPE_TEST` in `EnvironmentConstant.ts` (both branches).

---

## Deployment checklist

1. Deploy matching backend branch first (see cross-repo map).
2. Merge `feat/product-management` and/or `feat/order-management` as needed.
3. Set env vars for API and image base URLs.
4. Do **not** commit `bun.lock` or local env overrides.

---

## Not included in branches

| Item | Status |
|------|--------|
| `SELLER_PAGES_REFERENCE.md` | Untracked — documentation only |
| `bun.lock` | Untracked lockfile |
| Uncommitted `reviews/index.tsx`, `EnvironmentConstant.ts` tweaks | Working tree — not on remote |

---

## Regenerate / verify diffs

```bash
cd hajurbuwa-seller-dashboard

git log main..feat/product-management --oneline
git log main..feat/order-management --oneline

git diff main...feat/product-management --stat
git diff main...feat/order-management --stat

git diff feat/product-management...feat/order-management --name-status
```

---

*Last updated from branch tips: `dce22ea`, `d522161`.*
