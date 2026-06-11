import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { httpClient } from '../config/httpClient';
import { FaCopy } from 'react-icons/fa';
import useCopyToClipBoard from '../hooks/useCopyToClipBoard';
import { getRetailerProductUrl } from '../constants/serverConstants';



type GroupOrderTab = 'PENDING' | 'NEAR_DEADLINE' | 'SUCCESSFUL' | 'FAILED';

export interface FetchedGroupOrder {
  group_id: number;
  product_id: number;
  orders_count: number;
  total_required_orders: number;
  status: string;
  created_at: string;
  expires_at: string;
  product_name: string;
  cover_image: string;
  unit_value: string;
  price_per_piece: string;
}

interface GroupOrdersProps {
  groupOrders?: FetchedGroupOrder[];
  fetchGroupOrders: () => void;
}

export default function GroupOrders({ groupOrders = [], fetchGroupOrders }: GroupOrdersProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<GroupOrderTab>('PENDING');
  const [tableData, setTableData] = useState<FetchedGroupOrder[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [copiedText, copy] = useCopyToClipBoard();


  useEffect(() => {
    setTableData(groupOrders);
  }, [groupOrders]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTableData((prev) => [...prev]);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function copyToClipboard(text: string) {
    copy(text);
  }



  function calculateTimeLeft(expiresAt: string): string {
    // Force expiresAt to be interpreted as UTC
    const utcExpiresAt = expiresAt.endsWith("Z") ? expiresAt : expiresAt + "Z";
    const expiry = new Date(utcExpiresAt).getTime();

    // Get the current UTC time
    const now = new Date(new Date().toISOString()).getTime();

    const diff = expiry - now;
    if (diff <= 0) {
      return 'Expired';
    }
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hours ${minutes} minutes`;
  }


  const pendingData = tableData.filter((o) => {
    if (o.status !== 'group_pending') return false;
    const now = Date.now();
    const expiry = new Date(o.expires_at).getTime();
    const diff = expiry - now;
    // Only include orders that are not expired and not near deadline (>=2 hours left)
    return diff > 2 * 60 * 60 * 1000;
  });

  const nearDeadlineData = tableData.filter((o) => {
    if (o.status !== 'group_pending') return false;
    const now = Date.now();
    const expiry = new Date(o.expires_at).getTime();
    const diff = expiry - now;
    return diff > 0 && diff < 2 * 60 * 60 * 1000;
  });
  const successfulData = tableData.filter((o) => o.status === 'group_completed');
  const failedData = tableData.filter((o) => {
    // Include orders already marked as failed/cancelled/expired
    if (
      o.status === 'group_failed' ||
      o.status === 'group_cancelled' ||
      o.status === 'group_expired'
    ) {
      return true;
    }
    // Also include group_pending orders that are expired
    if (o.status === 'group_pending') {
      const now = Date.now();
      const expiry = new Date(o.expires_at).getTime();
      return now >= expiry;
    }
    return false;
  });


  const pendingCount = pendingData.length;
  const nearDeadlineCount = nearDeadlineData.length;
  const successfulCount = successfulData.length;
  const failedCount = failedData.length;

  let currentData: FetchedGroupOrder[] = [];
  switch (activeTab) {
    case 'PENDING':
      currentData = pendingData;
      break;
    case 'NEAR_DEADLINE':
      currentData = nearDeadlineData;
      break;
    case 'SUCCESSFUL':
      currentData = successfulData;
      break;
    case 'FAILED':
      currentData = failedData;
      break;
  }

  function getStatusLabel(): string {
    if (activeTab === 'SUCCESSFUL') {
      return 'SUCCESSFUL';
    } else if (activeTab === 'FAILED') {
      return 'FAILED';
    } else if (activeTab === 'PENDING') {
      return `PENDING
GROUP
ORDER`;
    } else if (activeTab === 'NEAR_DEADLINE') {
      return `PENDING
GROUP ORDER
with Near Deadline`;
    }
    return '';
  }

  function getStatusStyle(): React.CSSProperties {
    if (activeTab === 'SUCCESSFUL') {
      return { color: '#10B981', fontStyle: 'italic' };
    } else if (activeTab === 'FAILED') {
      return { color: '#EF4444', fontStyle: 'italic' };
    } else if (activeTab === 'PENDING') {
      return { color: '#FACC15', fontStyle: 'italic', whiteSpace: 'pre-line' };
    } else if (activeTab === 'NEAR_DEADLINE') {
      return { color: '#EF4444', fontStyle: 'italic', whiteSpace: 'pre-line' };
    }
    return {};
  }

  function shouldHideTimeAndAction(): boolean {
    return activeTab === 'SUCCESSFUL' || activeTab === 'FAILED';
  }

  function confirmGroupOrder(groupId: number) {
    try {
      const storedUserDetails = localStorage.getItem('userDetails');
      const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
      const token = userDetails?.token || '';

      return httpClient
        .post(
          '/seller/confirm-group-order',
          { group_id: groupId },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const result = response.data;
          if (result.status === 'success') {
            alert(result.message);
          } else {
            alert('Failed to confirm group order.');
          }
        })
        .catch((error) => {
          console.error('Error confirming group order:', error);
          alert('Error confirming group order.');
        });
    } catch (error) {
      console.error('Error confirming group order:', error);
      alert('Error confirming group order.');
      return Promise.reject(error);
    }
  }

  function handleConfirmYes() {
    if (selectedGroupId !== null) {
      confirmGroupOrder(selectedGroupId).then(() => {
        window.location.reload();
      });
    }
    setModalVisible(false);
  }

  function openConfirmModal(groupId: number) {
    setSelectedGroupId(groupId);
    setModalVisible(true);
  }

  return (
    <div className="mx-8">
      <div className="flex justify-around items-center mb-6">
        <div
          onClick={() => setActiveTab('PENDING')}
          className={`flex items-center space-x-2 px-3 py-1 cursor-pointer border-b-4 ${activeTab === 'PENDING' ? 'border-[#1366A8]' : 'border-gray-300'
            }`}
        >
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
            {pendingCount}
          </div>
          <span className="font-semibold text-gray-700">Pending Group Order</span>
        </div>
        <div
          onClick={() => setActiveTab('NEAR_DEADLINE')}
          className={`flex items-center space-x-2 px-3 py-1 cursor-pointer border-b-4 ${activeTab === 'NEAR_DEADLINE' ? 'border-[#1366A8]' : 'border-gray-300'
            }`}
        >
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
            {nearDeadlineCount}
          </div>
          <span className="font-semibold text-gray-700">
            Pending G.O with Near Deadline
          </span>
        </div>
        <div
          onClick={() => setActiveTab('SUCCESSFUL')}
          className={`flex items-center space-x-2 px-3 py-1 cursor-pointer border-b-4 ${activeTab === 'SUCCESSFUL' ? 'border-[#1366A8]' : 'border-gray-300'
            }`}
        >
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
            {successfulCount}
          </div>
          <span className="font-semibold text-gray-700">Successful Group Order</span>
        </div>
        <div
          onClick={() => setActiveTab('FAILED')}
          className={`flex items-center space-x-2 px-3 py-1 cursor-pointer border-b-4 ${activeTab === 'FAILED' ? 'border-[#1366A8]' : 'border-gray-300'
            }`}
        >
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
            {failedCount}
          </div>
          <span className="font-semibold text-gray-700">Failed Group Order</span>
        </div>
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="min-w-full border text-sm text-gray-700">
          <thead className="bg-gray-100 border-b text-xs uppercase">
            <tr>
              <th className="px-4 py-3 font-semibold text-left">PRODUCT</th>
              <th className="px-4 py-3 font-semibold text-left">GROUP ORDER DETAILS</th>
              <th className="px-4 py-3 font-semibold text-left">ORDER STATUS</th>
              <th className="px-4 py-3 font-semibold text-left">TIME LEFT</th>
              <th className="px-4 py-3 font-semibold text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((order, idx) => {
              let statusLabel = '';
              let statusStyle: React.CSSProperties = {};

              if (activeTab === 'SUCCESSFUL') {
                statusLabel = 'SUCCESSFUL';
                statusStyle = { color: '#10B981', fontStyle: 'italic' };
              } else if (activeTab === 'FAILED') {
                statusLabel = 'FAILED';
                statusStyle = { color: '#EF4444', fontStyle: 'italic' };
              } else if (activeTab === 'PENDING') {
                statusLabel = `PENDING
GROUP
ORDER`;
                statusStyle = {
                  color: '#FACC15',
                  fontStyle: 'italic',
                  whiteSpace: 'pre-line',
                };
              } else if (activeTab === 'NEAR_DEADLINE') {
                statusLabel = `PENDING
GROUP ORDER
with Near Deadline`;
                statusStyle = {
                  color: '#EF4444',
                  fontStyle: 'italic',
                  whiteSpace: 'pre-line',
                };
              }

              const hideTimeAndAction = activeTab === 'SUCCESSFUL' || activeTab === 'FAILED';
              const totalLeft = order.total_required_orders - order.orders_count;
              const timeLeft = calculateTimeLeft(order.expires_at);

              return (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded overflow-hidden">
                        {order.cover_image ? (
                          <Image
                            src={`https://dashboard.hajurbuwa.com/hajurbuwa-bucket/${order.cover_image}`}
                            alt={order.product_name}
                            width={52}
                            height={52}
                            className="object-cover"
                          />
                        ) : (
                          'IMG'
                        )}
                      </div>
                      <div>
                        <a
                          href={getRetailerProductUrl(String(order.product_id))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-black hover:text-accent-primary hover:underline"
                        >
                          {order.product_name}
                        </a>
                        <div className="text-black">
                          ID: {order.product_id}
                          <FaCopy
                            className="inline ml-2 cursor-pointer text-gray-400 hover:text-gray-600"
                            onClick={() => copyToClipboard(order.group_id.toString())}
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-black">
                      Group ID: {order.group_id}
                      <FaCopy
                        className="inline ml-2 cursor-pointer text-gray-400 hover:text-gray-600"
                        onClick={() => copyToClipboard(order.group_id.toString())}
                      />
                    </div>
                    <div className="text-black">
                      Quantity Committed: {order.orders_count} pcs
                    </div>
                    <div className="text-black">
                      Price per {order.unit_value}: NPR {order.price_per_piece}
                    </div>
                    {activeTab !== 'SUCCESSFUL' && (
                      <div className="text-black">Left to Commit: {totalLeft} pcs</div>
                    )}
                  </td>

                  <td
                    className="px-4 py-3 whitespace-pre-line"
                    style={statusStyle}
                  >
                    {statusLabel}
                  </td>

                  <td className="px-4 py-3">
                    {hideTimeAndAction ? (
                      ''
                    ) : (
                      <div>
                        <div className="text-black">
                          For Completion of
                          <br />
                          Group Purchase Target
                        </div>
                        <div className="text-xs mt-1" style={{ color: '#EF4444' }}>
                          {timeLeft}
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {hideTimeAndAction ? (
                      ''
                    ) : (
                      <button
                        onClick={() => openConfirmModal(order.group_id)}
                        className="bg-[#0056b3] hover:bg-[#004a9c] text-white px-4 py-2 rounded text-sm font-semibold text-center leading-tight"
                      >
                        Confirm Order For
                        <br />
                        Committed Quantity
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
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

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded shadow-lg z-10 w-80">
            <p className="mb-4">Are you sure you want to confirm order?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleConfirmYes}
                style={{ backgroundColor: '#008000', color: '#fff' }}
                className="px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setModalVisible(false)}
                style={{ backgroundColor: '#C70101', color: '#fff' }}
                className="px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}