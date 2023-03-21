import React, { useCallback, useState } from 'react';
import { buyers } from '../../constants/buyerData';
import Header from './TabsHeader';
import ProductManagementTable from './ProductManagementTable';

type Tab = {
  id: string;
  label: string;
};

const tabs: Tab[] = [
  {
    id: 'online',
    label: 'Online',
  },
  {
    id: 'pendingQc',
    label: 'Pending QC',
  },
  {
    id: 'outOfStock',
    label: 'Out of stock',
  },
  {
    id: 'inActive',
    label: 'In Active',
  },
  {
    id: 'suspended',
    label: 'Suspended',
  },
  {
    id: 'locked',
    label: 'Locked',
  },
];

export default function ProductManagement() {
  const [currentTab, setCurrentTab] = useState<Tab>({
    id: 'online',
    label: 'Online',
  });

  const handleTabChange = useCallback((tab: Tab) => setCurrentTab(tab), []);

  return (
    <section className="flex flex-col justify-center items-center w-full">
      <div className="w-4/5">
        <Header
          tabs={tabs}
          currentTab={currentTab}
          onTabClick={handleTabChange}
        />
        <ProductManagementTable data={buyers} productStatus={currentTab.id} />
      </div>
    </section>
  );
}
