import React, { useCallback, useState } from 'react';
import SellerShippings from './SellerShippings';
import SellerPayments from './SellerPayments';
import SectionTabsHeader from './SectionTabsHeader';

export type Tab = {
  id: string;
  label: string;
};

const tabs: Tab[] = [
  { id: 'shipping', label: 'Shipping Actions' },
  { id: 'payment', label: 'Payment Actions' },
];

const ShippingAndPayment = ({ order }: { order: any }) => {
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[0]);
  const handleTabChange = useCallback((tab: Tab) => setCurrentTab(tab), []);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
      <div className="border-b border-gray-300 bg-gray-150">
        <SectionTabsHeader
          tabs={tabs}
          currentTab={currentTab}
          onTabClick={handleTabChange}
        />
      </div>
      <div className="min-h-[18rem] p-4">
        {currentTab.id === 'shipping' ? (
          <SellerShippings order={order} />
        ) : (
          <SellerPayments order={order} />
        )}
      </div>
    </div>
  );
};

export default ShippingAndPayment;
