import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';
import BuyerDetails from './BuyerDetails';
import OrderDetails from './OrderDetails';
import OrderTimeline from './OrderTimeline';
import ShippingAndPayment from './ShippingAndPayment';
import ShippingDetails from './ShippingDetails';
import { formatPaymentModeLabel } from '../../constants/orderPayment';
import {
  CopyableText,
  DetailCard,
  DetailRow,
  StatusBadge,
  formatStatusLabel,
  getOrderStatusTone,
  getPaymentStatusTone,
} from './OrderDetailCard';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrderDetails } from '../../services/orderServices';
import Loader from '../common/Loader';
import { formatDate } from '../../utils/dateformat';

export default function OrderDescription() {
  const [order, setOrder] = useState<any>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const loadOrder = useCallback(() => {
    if (!router?.query?.orderId) return;
    setIsLoading(true);
    getSingleOrderDetails(router.query.orderId as string)
      .then((res) => {
        setOrder(res[0]);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [router.query.orderId]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  if (isLoading) return <Loader />;
  if (!order) {
    return (
      <div className="px-6 py-12 text-center text-gray-600">Order not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-300 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-6 py-6">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
              Order Management
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="flex flex-wrap items-center gap-2 text-2xl font-semibold leading-tight text-black">
                <span>Order</span>
                <CopyableText
                  value={order.order_id}
                  className="text-2xl font-semibold text-black"
                  label="order number"
                />
              </h1>
              <StatusBadge
                label={formatStatusLabel(order.order_status)}
                tone={getOrderStatusTone(order.order_status)}
              />
              <StatusBadge
                label={order.payment_status}
                tone={getPaymentStatusTone(order.payment_status)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <span>Placed {formatDate(order.order_date)}</span>
              {order.group_id ? (
                <span className="inline-flex items-center gap-1.5">
                  <span>Group</span>
                  <CopyableText
                    value={order.group_id}
                    className="text-sm font-medium text-black"
                    label="group ID"
                  />
                </span>
              ) : null}
              {order.estimated_delivery_time ? (
                <span>SLA {formatDate(order.estimated_delivery_time)}</span>
              ) : null}
              {order.shipping_plus_amount ? (
                <span>
                  Total Rs{' '}
                  {Number(order.shipping_plus_amount).toLocaleString('en-IN')}
                </span>
              ) : null}
            </div>
          </div>
          <Link
            href="/order-management"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary hover:underline"
          >
            <BsArrowLeft />
            Back to Order List
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
        <div className="flex flex-col gap-6">
          <OrderDetails order={order} />
          <ShippingAndPayment order={order} />
          <OrderTimeline order={order} />
        </div>

        <aside className="flex flex-col gap-4">
          <BuyerDetails order={order} />
          <ShippingDetails order={order} />

          <DetailCard title="Payment Summary">
            <DetailRow
              label="Mode"
              value={formatPaymentModeLabel(order.payment_mode)}
            />
            <DetailRow label="Status" value={order.payment_status} />
            <DetailRow
              label="Received"
              value={
                order.amount_received
                  ? `Rs ${Number(order.amount_received).toLocaleString('en-IN')}`
                  : '—'
              }
            />
            <DetailRow label="Txn ID" value={order.payment_transaction_no} />
            {order.payment_date ? (
              <DetailRow
                label="Paid On"
                value={formatDate(order.payment_date)}
              />
            ) : null}
            {order.total_refund_amount ? (
              <DetailRow
                label="Refunded"
                value={`Rs ${Number(order.total_refund_amount).toLocaleString('en-IN')}`}
              />
            ) : null}
          </DetailCard>
        </aside>
      </main>
    </div>
  );
}
