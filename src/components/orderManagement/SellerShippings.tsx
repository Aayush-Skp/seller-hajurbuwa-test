import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { formatDate } from '../../utils/dateformat';
import PackagingSlip from './PackagingSlip';
import Button from '../common/Button';

const SellerShippings = ({ order }: { order: any }) => {
  const [isPrintSlip, setIsPrintSlip] = useState(false);
  const showPrintSlip = ['unshipped', 'waiting_for_pickup', 'picked_up'].includes(
    order.order_status
  );

  return (
    <div className="flex h-full w-full flex-col justify-around">
      {isPrintSlip ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-90 py-6">
          <div className="relative">
            <PackagingSlip
              packing_slip_id={order.packing_slip_id}
              seller_pan_no={order.seller_pan_no}
              total_amount={order.total_amount}
              seller_company_name={order.seller_company_name}
              product_included_item={order.product_included_item}
              product_name={order.product_name}
              quantity={order.quantity || order.total_items}
              payment_status={order.payment_status}
            />
            <button
              type="button"
              className="absolute -right-2 -top-2 flex cursor-pointer items-center justify-center rounded-full bg-white text-2xl"
              onClick={() => setIsPrintSlip(false)}
            >
              <AiFillCloseCircle />
            </button>
          </div>
        </div>
      ) : null}

      {(order.order_status === 'cancelled' || order.order_status === 'failed') && (
        <div className="mb-4 flex flex-col">
          <div className="m-2 flex items-center justify-center bg-brand-600 px-10 py-4 font-bold capitalize text-white">
            {order.order_status === 'cancelled' ? (
              <>Cancelled By {order.cancelled_by}</>
            ) : (
              <>Failed</>
            )}
          </div>
          <div className="text-center text-base">
            {order.order_status === 'cancelled' ? (
              <>
                Cancellation Reason:
                <span className="font-bold"> {order.cancel_reason}</span>
              </>
            ) : (
              <>
                Failed Reason:
                <span className="font-bold"> {order.fail_reason}</span>
              </>
            )}
          </div>
        </div>
      )}

      {showPrintSlip ? (
        <div className="mb-4 w-full max-w-xs">
          <Button onClick={() => setIsPrintSlip(true)}>
            Print Packing Slip
          </Button>
        </div>
      ) : null}

      {order.shipping_name ? (
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-gray-600">Shipping: </span>
            <span className="font-medium">{order.shipping_name}</span>
          </p>
          <p>
            <span className="text-gray-600">Charge: </span>
            <span className="font-medium">Rs {order.shipping_charge}</span>
          </p>
          {order.estimated_delivery_time ? (
            <p>
              <span className="text-gray-600">SLA: </span>
              <span className="font-medium">
                {formatDate(order.estimated_delivery_time)}
              </span>
            </p>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No shipping details available yet.</p>
      )}

      {(order.order_status === 'sent' ||
        order.order_status === 'delivered' ||
        order.order_status === 'failed') &&
      (order.carrier || order.tracking_no) ? (
        <div className="mt-4 space-y-2 border-t border-gray-300 pt-4 text-sm">
          <p className="font-semibold">Carrier Details</p>
          {order.carrier ? <p>Carrier: {order.carrier}</p> : null}
          {order.tracking_no ? <p>Tracking: {order.tracking_no}</p> : null}
          {order.dispatched_date ? (
            <p>Dispatched: {formatDate(order.dispatched_date)}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SellerShippings;
