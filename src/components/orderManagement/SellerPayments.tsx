import React from 'react';
import { formatPaymentModeLabel } from '../../constants/orderPayment';

const SellerPayments = ({ order }: { order: any }) => {
  const refunds = order.refunded || [];

  return (
    <div className="h-full w-full">
      {order.payment_status === 'paid' ? (
        <div className="w-full">
          <PaymentDetails order={order} />
          {refunds.length > 0 ? (
            <div className="mt-4">
              <RefundDetails order={order} />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="text-md">
          Payment status: <span className="font-bold capitalize">{order.payment_status}</span>
          <p className="mt-2 text-sm text-gray-600">
            Payment will be updated by Hajurbuwa when received.
          </p>
        </div>
      )}
    </div>
  );
};

const PaymentDetails = ({ order }: { order: any }) => (
  <div className="grid grid-rows-2">
    <div className="grid grid-cols-3 bg-gray-300 p-2">
      <div className="uppercase">Transaction ID</div>
      <div className="uppercase">Payment Gateway</div>
      <div className="uppercase">Amount</div>
    </div>
    <div className="grid grid-cols-3 border-2 border-black bg-white p-2">
      <div className="text-base">{order.payment_transaction_no || '-'}</div>
      <div className="text-base">
        {formatPaymentModeLabel(order.payment_mode)}
      </div>
      <div className="text-base">NPR {order.amount_received}</div>
    </div>
  </div>
);

const RefundDetails = ({ order }: { order: any }) => (
  <>
    <span className="font-bold">Refund Details</span>
    <div className="mt-2 grid grid-rows-2">
      <div className="grid grid-cols-3 bg-gray-300 p-2">
        <div className="uppercase">Refund Amount</div>
        <div className="uppercase">Refund Date</div>
        <div className="uppercase">Status</div>
      </div>
      {order.refunded.map((refund: any, index: number) => (
        <div
          key={`${refund.refund_date}-${index}`}
          className="grid grid-cols-3 border-2 border-black bg-white p-2"
        >
          <div className="text-base">NPR {refund.refund_amount}</div>
          <div className="text-base">{refund.refund_date}</div>
          <div className="text-base">Recorded</div>
        </div>
      ))}
    </div>
  </>
);

export default SellerPayments;
