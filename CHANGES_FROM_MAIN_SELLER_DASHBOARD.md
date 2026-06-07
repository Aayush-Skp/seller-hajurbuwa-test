# Seller Dashboard Changes from `main`

Repository: `hajurbuwa-seller-dashboard`  
Base branch: `main` (`a09ec46`)

This document describes all seller-dashboard changes on feature branches compared to `main`.

---

## Branch overview

| Branch | Commit | Files | +Lines | −Lines |
|--------|--------|-------|--------|--------|
| `feat/product-management` | `dce22ea` | 26 | 1,699 | 1,006 |
| `feat/order-management` | `68a81c4` | 34 | 2,509 | 730 |

Both branches introduce shared utilities. The order branch is based on `main` and cherry-picks shared files from the product branch so it can run independently.

---

## 1. `feat/product-management`

### Summary

Revamps the seller product listing wizard, product management table, pricing/stock modals, and API service layer. Introduces reusable table UI components used by both product and order features.

---

### New files

| File | Description |
|------|-------------|
| `src/components/common/Loader.tsx` | Centered loading spinner |
| `src/components/common/ModalButtons.tsx` | `YesButton` / `NoButton` for confirmation modals |
| `src/components/common/Pagination.tsx` | Server-side pagination; syncs page with URL via `removeBaseUrl` |
| `src/components/common/Search.tsx` | Debounced keyword search input |
| `src/components/common/TabStatusBadge.tsx` | Count badge on status tabs |
| `src/utils/tabStatusCounts.ts` | Normalizes `status_array` / `statusCount` from API |
| `src/utils/removeBaseUrl.ts` | Strips API base URL from Laravel pagination links |

---

### Modified files

#### Product listing wizard — `src/components/productListing/`

| File | Changes |
|------|---------|
| `index.tsx` | Refactored add/edit/duplicate orchestration; mode-aware step flow |
| `GeneralInformation.tsx` | Form field layout, validation, category/brand/unit pickers |
| `PriceAndStock.tsx` | Bulk pricing tiers, minimum order, stock fields |
| `ProductDetails.tsx` | Description and highlight fields |
| `ServicesAndDelivery.tsx` | Delivery options, weight, service toggles |
| `ProductAddSuccessModal.tsx` | Post-add success state and navigation |

#### Product management — `src/components/productManagement/`

| File | Changes |
|------|---------|
| `index.tsx` | Tabbed listing with search, pagination, status badges |
| `ProductManagementTable.tsx` | Full table redesign: actions, stock/price display, status chips |
| `ActionButtons.tsx` | Activate, deactivate, delete, duplicate, edit actions |
| `PriceEditModal.tsx` | Inline price/stock/bulk-tier editing modal |
| `TabsHeader.tsx` | Status tabs with `TabStatusBadge` counts |

#### Pages

| File | Changes |
|------|---------|
| `src/pages/product-management.tsx` | Wires updated `productManagement/index` |
| `src/pages/product/add.tsx` | Passes `mode="add"` to listing wizard |
| `src/pages/product/update.tsx` | Passes `mode="edit"` |
| `src/pages/product/duplicate.tsx` | Passes `mode="duplicate"` |

#### Services — `src/services/productService.ts`

| Function | Change |
|----------|--------|
| `getProductsByStatus(url)` | **New** — generic paginated fetch by full URL |
| `getProductById()` | Normalizes `featured_highlights` array on response |
| `updateProductStock(id, in_stock)` | **New** — FormData update with `update_type=2` |
| `updateProductPricing(id, payload)` | **New** — bulk pricing, minimum order, price per unit |
| `activateProduct()` | Fixed path: `/seller/activate-product/{id}` |
| `normalizeFeaturedHighlights()` | **New private** — ensures highlights always an array |

New type: `ProductBulkTier { quantity, price }`

#### Config & constants

| File | Changes |
|------|---------|
| `src/config/httpClient.ts` | Local dev API: `http://127.0.0.1:8000/api` when `ENVIRONMENT_TYPE_TEST` |
| `src/constants/EnvironmentConstant.ts` | Default env switched to `ENVIRONMENT_TYPE_TEST` for local dev |
| `src/constants/serverConstants.ts` | Added `storefrontBaseUrl`, `getRetailerProductUrl()`, `resolveImageUrl()`; image base from `NEXT_PUBLIC_IMAGE_BASE_URL` |

---

### Key UX / behaviour changes

1. **Status tab counts** — Tabs read `status_array` from API (falls back to `statusCount`).
2. **Pagination** — Page changes update URL query string; works with backend Laravel pagination links.
3. **Search** — Debounced keyword search on product management table.
4. **Price edit modal** — Edit stock, unit price, bulk tiers, and minimum order without leaving the table.
5. **Image URLs** — `resolveImageUrl()` handles both full URLs and relative bucket paths.
6. **Storefront link** — `getRetailerProductUrl(productId)` for "view on storefront" actions.

---

### Routes affected

| Route | Component |
|-------|-----------|
| `/product-management` | `productManagement/index.tsx` |
| `/product/add` | `productListing/index.tsx` (add) |
| `/product/update?id=` | `productListing/index.tsx` (edit) |
| `/product/duplicate?id=` | `productListing/index.tsx` (duplicate) |

---

## 2. `feat/order-management`

### Summary

Revamps order listing with filters, pagination, and status tabs. Adds a dedicated order detail page with timeline, buyer info, shipping, and payment panels. Migrates routing from a flat page file to a directory-based route.

---

### New files

#### Order components — `src/components/orderManagement/`

| File | Description |
|------|-------------|
| `BuyerDetails.tsx` | Buyer name, PAN, phone, email card |
| `OrderDescription.tsx` | Full order detail page layout |
| `OrderDetailCard.tsx` | Reusable labelled detail card (`DetailCard`, `DetailRow`, `CopyableText`) |
| `OrderFilters.tsx` | Date range picker + payment type/status filters |
| `OrderTimeline.tsx` | Visual step-by-step order status timeline |
| `SectionTabsHeader.tsx` | Section navigation within order detail |
| `SellerPayments.tsx` | Payment mode, status, amount display |
| `SellerShippings.tsx` | Shipping address, carrier, delivery estimate |
| `ShippingAndPayment.tsx` | Combined shipping + payment section wrapper |
| `ShippingDetails.tsx` | Address line display |
| `buildOrderTimeline.ts` | Builds timeline steps from order status history |

#### Pages

| File | Description |
|------|-------------|
| `src/pages/order-management/index.tsx` | Order list page (new) |
| `src/pages/order-management/[orderId].tsx` | Order detail page (new) |

#### Utils & constants

| File | Description |
|------|-------------|
| `src/constants/orderPayment.ts` | `PAYMENT_MODE_OPTIONS`, `PAYMENT_TYPE_FILTER_OPTIONS`, `formatPaymentModeLabel()` |
| `src/utils/dateformat.ts` | `formatDate()` for display timestamps |
| `src/utils/orderPricing.ts` | `getOrderUnitPrice()`, `getOrderLineTotal()`, price label helpers |
| + shared `common/*`, `tabStatusCounts.ts`, `removeBaseUrl.ts` | Same as product branch |

---

### Deleted files

| File | Replaced by |
|------|-------------|
| `src/pages/order-management.tsx` | `src/pages/order-management/index.tsx` |

---

### Modified files

| File | Changes |
|------|---------|
| `OrdersTable.tsx` | Full redesign: filters, pagination, status actions, expandable rows, pricing display |
| `OrderDetails.tsx` | Richer detail drawer with shipping fields and `orderPricing` helpers |
| `TabsHeader.tsx` | Status tabs with badge counts |
| `index.tsx` | Orchestrates list, search, filters, pagination, tab state from URL `?tab=` |
| `src/pages/order/index.tsx` | Redirects `/order?order_id=X` → `/order-management/X` |
| `src/components/DashboardStats.tsx` | Unshipped orders link → `/order-management?tab=unshipped` |
| `src/services/orderServices.ts` | See service changes below |
| `src/config/httpClient.ts` | Same local dev URL change as product branch |
| `src/constants/EnvironmentConstant.ts` | Same test env default |
| `src/constants/serverConstants.ts` | Same `resolveImageUrl()` additions |

---

### Services — `src/services/orderServices.ts`

| Function | Before | After |
|----------|--------|-------|
| `getOrdersByStatus` | `(status, currentPageUrl)` — simple POST | `(url: string)` — parses URL params, sends filter body |
| `searchOrdersWithStatusAndKeyword` | Separate search function | Merged into `getOrdersByStatus` when URL contains `/orders/search` |
| `getSingleOrderDetails` | Returns `res.data.data` | Returns full `res.data` |
| `changeOrderStatus` | Path `seller/set-order-status/` | Path `/seller/set-order-status/` (leading slash) |

**New POST body fields sent with order list requests:**

```typescript
{
  date_from?: string;
  date_to?: string;
  payment_mode?: string;
  payment_status?: string;
}
```

---

### Key UX / behaviour changes

1. **URL-driven tabs** — `/order-management?tab=unshipped` opens the correct status tab on load.
2. **Order detail route** — `/order-management/[orderId]` is a dedicated page, not a modal-only flow.
3. **Order timeline** — `buildOrderTimeline()` renders status progression with timestamps.
4. **Filters** — Date range and payment filters passed to backend (pairs with `feat/seller-order-management` API).
5. **Legacy redirect** — Old `/order?order_id=` links still work via redirect page.
6. **Dashboard deep link** — "Unshipped Orders" card links directly to unshipped tab.

---

### Routes affected

| Route | Before | After |
|-------|--------|-------|
| `/order-management` | `pages/order-management.tsx` | `pages/order-management/index.tsx` |
| `/order-management?tab=` | — | Deep-link to status tab |
| `/order-management/[orderId]` | — | **New** order detail page |
| `/order?order_id=` | Order view | Redirect to `/order-management/[orderId]` |

---

## Shared between both branches

These files appear in both `feat/product-management` and `feat/order-management`:

| Category | Files |
|----------|-------|
| Common UI | `Loader`, `ModalButtons`, `Pagination`, `Search`, `TabStatusBadge` |
| Utils | `tabStatusCounts.ts`, `removeBaseUrl.ts` |
| Config | `httpClient.ts`, `EnvironmentConstant.ts`, `serverConstants.ts` |

---

## Backend API dependencies

| Seller dashboard branch | Required backend branch |
|------------------------|------------------------|
| `feat/product-management` | `feat/seller-product-management` |
| `feat/order-management` | `feat/seller-order-management` |

Key API contract changes the frontend expects:

| API field / param | Used by |
|-------------------|---------|
| `status_array` in list responses | Tab badge counts |
| `minimum_order` on product update | Price edit modal |
| `date_from`, `date_to`, `payment_mode`, `payment_status` on order list POST | Order filters |
| `shipping_state/city/area/address_*` on order rows | Orders table + detail pages |

---

## Not included in branches

| File | Status |
|------|--------|
| `SELLER_PAGES_REFERENCE.md` | Untracked locally — documentation only |
| `bun.lock` | Untracked — lockfile, not committed |

---

## Regenerate this document

```bash
cd hajurbuwa-seller-dashboard
git diff main...feat/product-management --stat
git diff main...feat/order-management --stat
```
