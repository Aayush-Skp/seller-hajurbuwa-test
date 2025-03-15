// components/groupOrderManagement.tsx

import React, { useState } from 'react';

type GroupOrderTab = 'PENDING' | 'NEAR_DEADLINE' | 'SUCCESSFUL' | 'FAILED';

export default function GroupOrders() {
  // Default active tab: "PENDING"
  const [activeTab, setActiveTab] = useState<GroupOrderTab>('PENDING');

  // Red-circle counts
  const pendingGroupOrderCount = 4;
  const pendingNearDeadlineCount = 2;
  const successfulCount = 11;
  const failedCount = 15;

  // Placeholder data for each tab
  const pendingOrders = [
    {
      id: '1x02516',
      productName: 'Red T-shirt double set XXL',
      groupId: '6526545',
      quantityCommitted: 55,
      leftToCommit: 40,
      orderStatus: 'Pending Group Order',
      timeLeft: '1 hour 35 mins',
    },
  ];
  const nearDeadlineOrders = [
    {
      id: '1x03517',
      productName: 'Blue T-shirt double set XXL',
      groupId: '6526577',
      quantityCommitted: 30,
      leftToCommit: 20,
      orderStatus: 'Pending G.O with Near Deadline',
      timeLeft: '45 mins left',
    },
  ];
  const successfulOrders = [
    {
      id: '1x04518',
      productName: 'Green T-shirt single set XL',
      groupId: '6526599',
      quantityCommitted: 50,
      leftToCommit: 0,
      orderStatus: 'Successful Group Order',
      timeLeft: 'Expired',
    },
  ];
  const failedOrders = [
    {
      id: '1x05519',
      productName: 'Yellow T-shirt triple set M',
      groupId: '6526600',
      quantityCommitted: 10,
      leftToCommit: 30,
      orderStatus: 'Failed Group Order',
      timeLeft: 'Time Over',
    },
  ];

  // Decide which data to show
  const dataMap = {
    PENDING: pendingOrders,
    NEAR_DEADLINE: nearDeadlineOrders,
    SUCCESSFUL: successfulOrders,
    FAILED: failedOrders,
  };
  const currentData = dataMap[activeTab];

  return (
    // "mx-8" for left/right margins
    <div className="mx-8">
      {/* Row of headings with a thick bottom border that turns green if active */}
      <div className="flex justify-around items-center mb-6">
        {/* PENDING */}
        <div
          onClick={() => setActiveTab('PENDING')}
          className={`flex items-center space-x-2 px-3 py-1 cursor-pointer border-b-4 ${
            activeTab === 'PENDING' ? 'border-green-600' : 'border-gray-300'
          }`}
        >
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
            {pendingGroupOrderCount}
          </div>
          <span className="font-semibold text-gray-700">Pending Group Order</span>
        </div>

        {/* Pending G.O with Near Deadline */}
        <div
          onClick={() => setActiveTab('NEAR_DEADLINE')}
          className={`flex items-center space-x-2 px-3 py-1 cursor-pointer border-b-4 ${
            activeTab === 'NEAR_DEADLINE' ? 'border-green-600' : 'border-gray-300'
          }`}
        >
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
            {pendingNearDeadlineCount}
          </div>
          <span className="font-semibold text-gray-700">
            Pending G.O with Near Deadline
          </span>
        </div>

        {/* SUCCESSFUL */}
        <div
          onClick={() => setActiveTab('SUCCESSFUL')}
          className={`flex items-center space-x-2 px-3 py-1 cursor-pointer border-b-4 ${
            activeTab === 'SUCCESSFUL' ? 'border-green-600' : 'border-gray-300'
          }`}
        >
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
            {successfulCount}
          </div>
          <span className="font-semibold text-gray-700">Successful Group Order</span>
        </div>

        {/* FAILED */}
        <div
          onClick={() => setActiveTab('FAILED')}
          className={`flex items-center space-x-2 px-3 py-1 cursor-pointer border-b-4 ${
            activeTab === 'FAILED' ? 'border-green-600' : 'border-gray-300'
          }`}
        >
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
            {failedCount}
          </div>
          <span className="font-semibold text-gray-700">Failed Group Order</span>
        </div>
      </div>

      {/* Table for whichever tab is active */}
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full border text-sm text-gray-700">
          <thead className="bg-gray-100 border-b text-xs uppercase">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold text-left">
                PRODUCT
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-left">
                GROUP ORDER DETAILS
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-left">
                ORDER STATUS
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-left">
                TIME LEFT
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-left">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, idx) => (
              <tr key={idx} className="border-b">
                {/* PRODUCT column */}
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    {/* placeholder image */}
                    <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded">
                      IMG
                    </div>
                    <div>
                      <div className="font-bold">{item.productName}</div>
                      <div>ID: {item.id}</div>
                    </div>
                  </div>
                </td>

                {/* GROUP ORDER DETAILS column */}
                <td className="px-4 py-3">
                  <div>Group ID: {item.groupId}</div>
                  <div>Quantity Committed: {item.quantityCommitted} pcs</div>
                  <div>Left to Commit: {item.leftToCommit} pcs</div>
                </td>

                {/* ORDER STATUS column */}
                <td className="px-4 py-3 text-red-600">{item.orderStatus}</td>

                {/* TIME LEFT column */}
                <td className="px-4 py-3 text-orange-600">{item.timeLeft}</td>

                {/* ACTION column */}
                <td className="px-4 py-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Confirm Order
                  </button>
                </td>
              </tr>
            ))}

            {currentData.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                  No orders found for this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
