type OrderPricingInput = {
  total_amount?: number | string | null;
  total_items?: number | string | null;
  product_price_per_unit?: number | string | null;
  is_bulk?: boolean | number | null;
  bulk_price?: number | string | null;
  product_unit?: string | null;
  bulk_unit?: string | number | null;
};

export const normalizeProductUnit = (unit?: string | null) =>
  (unit || 'unit').replace(/^per\s+/i, '').trim();

export const getOrderUnitPrice = (order: OrderPricingInput): number => {
  if (order.is_bulk && order.bulk_price != null) {
    return Math.round(Number(order.bulk_price));
  }

  const quantity = Number(order.total_items || 0);
  const lineTotal = Number(order.total_amount || 0);

  if (quantity > 0 && lineTotal > 0) {
    return Math.round(lineTotal / quantity);
  }

  return Math.round(
    Number(order.product_price_per_unit ?? order.total_amount ?? 0)
  );
};

export const getOrderLineTotal = (order: OrderPricingInput): number =>
  Math.round(Number(order.total_amount || 0));

export const getPricePerLabel = (order: OrderPricingInput): string => {
  const unit = normalizeProductUnit(order.product_unit);

  if (order.is_bulk && order.bulk_unit) {
    return `Price per ${order.bulk_unit} ${unit}`;
  }

  return `Price per ${unit}`;
};

export const getQuantityLabel = (order: OrderPricingInput): string => {
  const unit = normalizeProductUnit(order.product_unit);
  const quantity = Number(order.total_items || 0);
  return `${quantity} ${unit}`;
};
