import React from 'react';
import Image from 'next/image';
import {
  getRetailerProductUrl,
  imageServerBaseUrl,
} from '../../constants/serverConstants';
import {
  getOrderLineTotal,
  getOrderUnitPrice,
  getPricePerLabel,
  getQuantityLabel,
} from '../../utils/orderPricing';
import { CopyableText } from './OrderDetailCard';

const formatRs = (amount: number) =>
  `Rs ${Math.round(Number(amount || 0)).toLocaleString('en-IN')}`;

const LineItem = ({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) => (
  <div className="flex items-center justify-between gap-4 py-2">
    <span className="text-sm text-gray-600">{label}</span>
    <span
      className={`tabular-nums ${emphasize ? 'text-base font-semibold text-black' : 'text-sm font-medium text-black'}`}
    >
      {value}
    </span>
  </div>
);

const OrderDetails = ({ order }: { order: any }) => {
  const pricingOrder = {
    ...order,
    total_items: order.total_items ?? order.quantity,
    total_amount: order.total_amount ?? order.amount,
  };
  const unitPrice = getOrderUnitPrice(pricingOrder);
  const lineTotal = getOrderLineTotal(pricingOrder);
  const pricePerLabel = getPricePerLabel(pricingOrder);
  const quantityLabel = getQuantityLabel(pricingOrder);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
      <div className="flex items-center justify-between border-b border-gray-300 bg-gray-150 px-4 py-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Order Item
        </h3>
      </div>

      <div className="p-4">
        <div className="flex gap-4 sm:gap-6">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-gray-300 bg-gray-150 sm:h-28 sm:w-28">
            {order?.product_cover_image ? (
              <Image
                height={112}
                width={112}
                src={`${imageServerBaseUrl}${order.product_cover_image}`}
                alt={order.product_name}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            {order.product_id ? (
              <a
                href={getRetailerProductUrl(order.product_id)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold leading-snug text-accent-primary hover:underline"
              >
                {order.product_name}
              </a>
            ) : (
              <p className="text-base font-semibold leading-snug text-black">
                {order.product_name}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-xs text-gray-600">Product ID</span>
              <CopyableText
                value={order.product_id}
                className="text-xs font-medium text-accent-primary"
                label="product ID"
              />
            </div>
            {order.product_included_item ? (
              <p className="text-xs leading-relaxed text-gray-600">
                {order.product_included_item}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-4 border-t border-gray-300 pt-2">
          <LineItem label={pricePerLabel} value={formatRs(unitPrice)} />
          <LineItem label="Quantity" value={quantityLabel} />
          <LineItem label="Subtotal" value={formatRs(lineTotal)} />
          {order?.shipping_name ? (
            <LineItem
              label={`Delivery (${order.shipping_name})`}
              value={formatRs(order.shipping_charge)}
            />
          ) : null}
          <div className="mt-1 border-t border-gray-300 pt-2">
            <LineItem
              label="Order Total"
              value={formatRs(order.shipping_plus_amount)}
              emphasize
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
