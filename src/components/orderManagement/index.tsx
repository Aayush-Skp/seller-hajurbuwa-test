import React, { useCallback, useState } from 'react';
import { orders } from '../../constants/orders';
import TabsHeader from '../productManagement/TabsHeader';
import OrdersTable from './OrdersTable';

type Tab = {
  id: string;
  label: string;
};

const tabs: Tab[] = [
  {
    id: 'pending',
    label: 'Pending',
  },
  {
    id: 'unShipped',
    label: 'Unshipped',
  },
  {
    id: 'sent',
    label: 'Sent',
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

  const handleTabChange = useCallback((tab: Tab) => setCurrentTab(tab), []);

  return (
    <section className="flex flex-col justify-center items-center w-full">
      <div className="w-4/5">
        <TabsHeader
          tabs={tabs}
          currentTab={currentTab}
          onTabClick={handleTabChange}
        />
        <OrdersTable data={orders} productStatus={currentTab.id} />
      </div>
    </section>
  );
}
