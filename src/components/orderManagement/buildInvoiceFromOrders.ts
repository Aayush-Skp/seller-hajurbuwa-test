import {
  getOrderUnitPrice,
  normalizeProductUnit,
} from '../../utils/orderPricing';
import type { Invoice, InvoiceItem } from './InvoicePDF';

type OrderRow = {
  id: string | number;
  order_id: string | number;
  order_status?: string;
  buyer_id?: string | number;
  buyer_name?: string;
  buyer_phone_number?: string;
  buyer_email?: string;
  shipping_address_1?: string;
  shipping_address_2?: string;
  shipping_area?: string;
  shipping_city?: string;
  shipping_state?: string;
  product_name?: string;
  total_items?: number | string;
  product_unit?: string;
  total_amount?: number | string;
  amount_received?: number | string;
  payment_status?: string;
  order_date?: string;
};

const PICKED_UP_OR_ABOVE = ['picked_up', 'sent', 'delivered'];

export function buildInvoiceFromOrders(
  rows: OrderRow[],
  deliveryCharge: number
): Invoice {
  const first = rows[0];
  const address = [
    first.shipping_address_1,
    first.shipping_address_2,
    first.shipping_area,
    first.shipping_city,
    first.shipping_state,
  ]
    .filter(Boolean)
    .join(', ');

  const items: InvoiceItem[] = rows.map((row) => ({
    id: row.id,
    order_id: row.order_id,
    order_status: row.order_status || '',
    is_pickedup_or_above: PICKED_UP_OR_ABOVE.includes(row.order_status || ''),
    product_name: row.product_name || '',
    quantity: Number(row.total_items || 0),
    unit: normalizeProductUnit(row.product_unit),
    rate: getOrderUnitPrice(row),
    amount: Number(row.total_amount || 0),
    amount_received: Number(row.amount_received || 0),
    payment_status: row.payment_status || '',
    order_date: row.order_date || '',
  }));

  return {
    invoiceNo: `INV-${first.order_id}`,
    orderDate: first.order_date || '',
    buyer: {
      name: first.buyer_name || '',
      phone: first.buyer_phone_number || '',
      email: first.buyer_email || '',
      address,
    },
    items,
    deliveryCharge,
  };
}
