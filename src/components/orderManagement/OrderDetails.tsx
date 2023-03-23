import React from 'react';
import { MdContentCopy } from 'react-icons/md';
import { BsArrowLeft } from 'react-icons/bs';
import Link from 'next/link';

const orderAttributes = [
  { value: '0533658', label: 'Order ID' },
  { value: 'Pending', label: 'Order Status' },
  { value: '12 May 2023 5:00 PM    ', label: 'Order Date' },
  { value: 'T shirt Red colored double set XXL', label: 'Product Name' },
  { value: '1ad2516', label: 'Product ID' },
  { value: '5 Pcs', label: 'Ordered Quantity' },
  { value: '2500 NPR', label: 'Item Subtotal' },
];

export default function OrderDetails() {
  return (
    <section className="space-y-2 ">
      <div className="pt-5 border-b border-gray-300">
        <div className="flex justify-between px-16">
          <span className="text-2xl">
            Order Details of Order Number 0532565
          </span>
          <Link href="/">
            <div className="flex items-center space-x-1 text-blue-700">
              <BsArrowLeft className="font-bold" />
              <span>Back to Orders List</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="px-16">
        <ul className="w-2/4 space-y-4">
          {orderAttributes.map((attribute) => (
            <li className="border-b py-2 border-gray-300" key={attribute.label}>
              <div className="flex items-center">
                <span className="w-40 text-gray-400">{attribute.label}</span>
                <div className="flex items-center justify-center space-x-2">
                  <span>{attribute.value}</span>
                  {attribute.label === 'Order ID' ||
                  attribute.label === 'Product ID' ? (
                    <button className="group" onClick={() => {}}>
                      <MdContentCopy className="group-hover:w-5 group-hover:h-5 transition-transform duration-300" />
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
