import React, { useCallback, useEffect, useState } from 'react';
import Header from './TabsHeader';
import ProductManagementTable from './ProductManagementTable';
import { getProductByStatus } from '../../services/productService';

export type Tab = {
  id:
    | 'online'
    | 'pending'
    | 'out_of_stock'
    | 'deactivated'
    | 'suspended'
    | 'locked';
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
    id: 'out_of_stock',
    label: 'Out of stock',
  },
  {
    id: 'deactivated',
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
  const [statusArray, setStatusArray] = useState([]);

  const handleTabChange = useCallback((tab: Tab) => setCurrentTab(tab), []);

  function getAllProducts() {
    getProductByStatus(currentTab.id)
      .then((res) => {
        console.log(res);
        setProductList(res.data);
        console.log(res.statusCount);
        setStatusArray(res.statusCount);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) setProductList([]);
      });
  }

  useEffect(() => {
    getAllProducts();
  }, [currentTab]);

  return (
    <section className="">
      <Header
        tabs={tabs}
        currentTab={currentTab}
        onTabClick={handleTabChange}
        statusArray={statusArray}
      />
      <ProductManagementTable
        data={productList}
        productStatus={currentTab}
        getAllProducts={getAllProducts}
      />
    </section>
  );
}
