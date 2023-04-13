import React, { useCallback, useEffect, useState } from 'react';
import { getOrdersByStatus } from '../../services/orderServices';
import OrdersTable from './OrdersTable';
import TabsHeader from './TabsHeader';

export type OrderState =
  | 'pending'
  | 'unshipped'
  | 'sent'
  | 'delivered'
  | 'waiting_for_pickup'
  | 'picked_up'
  | 'cancelled'
  | 'failed';

export type Tab = {
  id: OrderState;
  label:
    | 'Pending'
    | 'Unshipped'
    | 'Sent For Delivery'
    | 'Waiting For Pickup'
    | 'Picked up'
    | 'Delivered'
    | 'Cancelled'
    | 'Failed';
};

const tabs: Tab[] = [
  {
    id: 'pending',
    label: 'Pending',
  },
  {
    id: 'unshipped',
    label: 'Unshipped',
  },
  {
    id: 'waiting_for_pickup',
    label: 'Waiting For Pickup',
  },
  {
    id: 'picked_up',
    label: 'Picked up',
  },
  {
    id: 'sent',
    label: 'Sent For Delivery',
  },
  {
    id: 'delivered',
    label: 'Delivered',
  },
  {
    id: 'cancelled',
    label: 'Cancelled',
  },
  {
    id: 'failed',
    label: 'Failed',
  },
];

export default function Orders() {
  const [currentTab, setCurrentTab] = useState<Tab>({
    id: 'pending',
    label: 'Pending',
  });

  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderListWithCount, setOrderListWithCount] = useState([]);

  const handleTabChange = useCallback((tab: Tab) => {
    setCurrentTab(tab);
  }, []);

  function getAllOrders() {
    setOrderList([]);
    setIsLoading(true);
    getOrdersByStatus(currentTab.id)
      .then((res) => {
        setOrderList(res.data);
        setOrderListWithCount(res.status_array);
        setIsLoading(false);
      })
      .catch((err) => {
        err.response.status === 404 && setOrderList([]);
        setIsLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    getAllOrders();
  }, [currentTab]);

  return (
    <section className="flex flex-col justify-center items-center w-full">
      <div className="w-4/5">
        <TabsHeader
          tabs={tabs}
          currentTab={currentTab}
          onTabClick={handleTabChange}
          orderList={orderList}
          orderListWithCount={orderListWithCount}
        />
        <OrdersTable
          data={orderList}
          productStatus={currentTab}
          getAllOrders={getAllOrders}
        />
      </div>
    </section>
  );
}
