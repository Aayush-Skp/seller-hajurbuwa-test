// components/groupOrderManagement.tsx

import React, { useState, useEffect } from 'react';

type GroupOrderTab = 'PENDING' | 'NEAR_DEADLINE' | 'SUCCESSFUL' | 'FAILED';

// Match the shape of the data your API returns
type FetchedGroupOrder = {
  group_id: number;
  product_id: number;
  orders_count: number;
  total_required_orders: number;
  status: string;
  created_at: string;
  expires_at: string;     // <-- We'll use this for the countdown
  product_name: string;
  cover_image: string;
};

interface GroupOrdersProps {
  // If parent doesn't pass anything, default to empty array
  groupOrders?: FetchedGroupOrder[];
}

export default function GroupOrders({ groupOrders = [] }: GroupOrdersProps) {
  // Which tab is active
  const [activeTab, setActiveTab] = useState<GroupOrderTab>('PENDING');

  // We'll store a "transformed" version of groupOrders in state
  // so we can recalculate the countdown every second
  const [tableData, setTableData] = useState<FetchedGroupOrder[]>([]);

  // 1) On initial load, copy groupOrders into state
  useEffect(() => {
    setTableData(groupOrders);
  }, [groupOrders]);

  // 2) Recalculate countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTableData((prevData) => {
        return prevData.map((item) => ({
          ...item,
          // You can store "timeLeft" in a separate field if you want,
          // but we’ll calculate it on the fly in the render below.
        }));
      });
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  // Helper: Convert "expires_at" into a countdown string (e.g. "1h 35m 20s")
  function calculateTimeLeft(expiresAt: string) {
    const now = new Date().getTime();
    const expiry = new Date(expiresAt).getTime(); // parse from your API's format
    const diff = expiry - now;

    if (diff <= 0) {
      return 'Expired';
    }

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Build a friendly string
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return `${minutes}m ${seconds}s`;
    }
  }

  // 3) Convert each item into the structure needed by the table
  //    (and also handle status -> tab mapping)
  function convertToTableItem(order: FetchedGroupOrder) {
    // You can rename fields or keep them as is
    return {
      id: String(order.group_id),
      productName: order.product_name,
      groupId: String(order.group_id),
      quantityCommitted: order.orders_count,
      leftToCommit: order.total_required_orders - order.orders_count,
      orderStatus:
        order.status === 'group_pending'
          ? 'Pending Group Order'
          : order.status === 'group_completed'
          ? 'Successful Group Order'
          : order.status === 'group_failed'
          ? 'Failed Group Order'
          : 'Unknown Status',
      // We'll call our helper function to get the live countdown
      timeLeft: calculateTimeLeft(order.expires_at),
      originalStatus: order.status, // We'll use this to filter by tab
    };
  }

  // 4) Transform tableData for rendering
  const transformedData = tableData.map(convertToTableItem);

  // 5) Filter by tab
  const pendingOrders = transformedData.filter(
    (item) => item.originalStatus === 'group_pending'
  );

  // If you have a special logic for near-deadline (e.g., less than 2 hours left),
  // do something like:
  const nearDeadlineOrders = transformedData.filter((item) => {
    if (item.originalStatus !== 'group_pending') return false;
    // Check if < 2 hours left
    const now = new Date().getTime();
    const expiry = new Date(groupOrders.find((o) => o.group_id === +item.id)?.expires_at || '').getTime();
    const diff = expiry - now;
    return diff > 0 && diff < 2 * 60 * 60 * 1000; // < 2 hours
  });

  const successfulOrders = transformedData.filter(
    (item) => item.originalStatus === 'group_completed'
  );

  const failedOrders = transformedData.filter(
    (item) => item.originalStatus === 'group_failed'
  );

  // 6) For the "red circle" counts
  const pendingGroupOrderCount = pendingOrders.length;
  const pendingNearDeadlineCount = nearDeadlineOrders.length;
  const successfulCount = successfulOrders.length;
  const failedCount = failedOrders.length;

  // 7) Decide which data to show based on the active tab
  let currentData = [];
  switch (activeTab) {
    case 'PENDING':
      currentData = pendingOrders;
      break;
    case 'NEAR_DEADLINE':
      currentData = nearDeadlineOrders;
      break;
    case 'SUCCESSFUL':
      currentData = successfulOrders;
      break;
    case 'FAILED':
      currentData = failedOrders;
      break;
  }

  return (
    <div className="mx-8">
      {/* Row of tab headings */}
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

        {/* NEAR_DEADLINE */}
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

                {/* TIME LEFT column (the live countdown) */}
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