import React, { useEffect, useState } from 'react';
import { MdContentCopy } from 'react-icons/md';
import { BsArrowLeft } from 'react-icons/bs';
import Link from 'next/link';
import { getSingleOrderDetails } from '../../services/orderServices';
import { useRouter } from 'next/router';
import useCopyToClipboard from '../../hooks/useCopyToClipBoard';

export default function OrderDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({
    order_id: '',
    order_status: '',
    order_date: '',
    product_name: '',
    product_id: '',
    quantity: '',
    total_amount: '',
    buyer_company_name: '',
    pan_number: '',
    amount: '',
    seller_name: '',
    seller_pan_no: '',
  });

  const [_, copyOrderId] = useCopyToClipboard();
  const [__, copyProductId] = useCopyToClipboard();

  const { query } = useRouter();

  useEffect(() => {
    getSingleOrderDetails(`${query.order_id}`)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setOrderDetails(res[0]);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [query]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="space-y-2 ">
      <div className="pt-5 border-b border-gray-300">
        <div className="flex justify-between px-16">
          <span className="text-2xl">
            Order Details of Order Number {orderDetails.order_id}
          </span>
          <Link href="/order-management">
            <a className="flex items-center space-x-1 text-blue-700">
              <BsArrowLeft className="font-bold" />
              <span>Back to orders List</span>
            </a>
          </Link>
        </div>
      </div>
      <div className="px-16">
        <ul className="w-2/4 space-y-4">
          <li className="border-b py-2 border-gray-300">
            <div className="flex items-center">
              <span className="w-40 text-gray-400">Order ID</span>
              <div className="flex items-center justify-center space-x-2">
                <span>{orderDetails?.order_id}</span>
                <button
                  className="group"
                  onClick={() => copyOrderId(orderDetails.order_id)}
                >
                  <MdContentCopy className="group-hover:w-5 group-hover:h-5 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </li>
          <li className="border-b py-2 border-gray-300">
            <div className="flex items-center">
              <span className="w-40 text-gray-400">Order Status</span>
              {orderDetails.order_status === 'pending' ? (
                <span>Pending</span>
              ) : orderDetails.order_status === 'unshipped' ? (
                <span>Unshipped</span>
              ) : orderDetails.order_status === 'picked_up' ? (
                <span>Picked up</span>
              ) : orderDetails.order_status === 'waiting_for_pickup' ? (
                <span>Waiting for pickup</span>
              ) : orderDetails.order_status === 'failed' ? (
                <span>Failed</span>
              ) : orderDetails.order_status === 'cancelled' ? (
                <span>Cancelled</span>
              ) : orderDetails.order_status === 'sent' ? (
                <span>Sent for delivery</span>
              ) : orderDetails.order_status === 'delivered' ? (
                <span>Delivered</span>
              ) : null}
            </div>
          </li>
          <li className="border-b py-2 border-gray-300">
            <div className="flex items-center">
              <span className="w-40 text-gray-400">Order Date</span>
              <span>{formatDate(orderDetails.order_date)}</span>
            </div>
          </li>
          <li className="border-b py-2 border-gray-300">
            <div className="flex items-center">
              <span className="w-40 text-gray-400">Product Name</span>
              <span>{orderDetails.product_name}</span>
            </div>
          </li>
          <li className="border-b py-2 border-gray-300">
            <div className="flex items-center">
              <span className="w-40 text-gray-400">Product Id</span>
              <div className="flex items-center justify-center space-x-2">
                <span>{orderDetails.product_id}</span>
                <button
                  className="group"
                  onClick={() => copyProductId(orderDetails.product_id)}
                >
                  <MdContentCopy className="group-hover:w-5 group-hover:h-5 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </li>
          <li className="border-b py-2 border-gray-300">
            <div className="flex items-center">
              <span className="w-40 text-gray-400">Ordered Quantity</span>
              <span>{orderDetails.quantity}</span>
            </div>
          </li>
          <li className="border-b py-2 border-gray-300">
            <div className="flex items-center">
              <span className="w-40 text-gray-400">Item Subtotal</span>
              <span>Rs. {orderDetails.total_amount}</span>
            </div>
          </li>
          <li className="border-b py-2 border-gray-300">
            <div className="flex items-center">
              <span className="w-40 text-gray-400">Customer Name</span>
              <span>{orderDetails.buyer_company_name}</span>
            </div>
          </li>
          <li className="border-b py-2 border-gray-300">
            <div className="flex items-center">
              <span className="w-40 text-gray-400">Pan Number</span>
              <span>{orderDetails.seller_pan_no}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
