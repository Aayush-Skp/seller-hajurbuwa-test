import React, { useCallback, useEffect, useState } from 'react';
import Header from './TabsHeader';
import ProductManagementTable from './ProductManagementTable';
import { getProductByStatus } from '../../services/productService';

export type Tab = {
  id: 'online' | 'pending' | 'outOfStock' | 'inActive' | 'suspended' | 'locked';
  label:
    | 'Online'
    | 'Pending QC'
    | 'Out of stock'
    | 'Inactive'
    | 'Suspended'
    | 'Locked';
};

const tabs: Tab[] = [
  {
    id: 'online',
    label: 'Online',
  },
  {
    id: 'pending',
    label: 'Pending QC',
  },
  {
    id: 'outOfStock',
    label: 'Out of stock',
  },
  {
    id: 'inActive',
    label: 'Inactive',
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

  const [productList, setProductList] = useState([]);

  const handleTabChange = useCallback((tab: Tab) => setCurrentTab(tab), []);

  function getAllProducts() {
    getProductByStatus(currentTab.id)
      .then((res) => {
        setProductList(res);
      })
      .catch((err) => {
        err?.response?.status === 404 && setProductList([]);
        console.log(err);
      });
  }

  useEffect(() => {
    getAllProducts();
  }, [currentTab]);

  return (
    <section className="flex flex-col justify-center items-center w-full">
      <div className="w-4/5">
        <Header
          tabs={tabs}
          currentTab={currentTab}
          onTabClick={handleTabChange}
        />
        <ProductManagementTable
          data={productList}
          productStatus={currentTab.id}
          getAllProducts={getAllProducts}
        />
      </div>
    </section>
  );
}
