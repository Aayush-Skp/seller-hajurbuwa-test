import React, { useCallback, useEffect, useState } from 'react';
import Header from './TabsHeader';
import ProductManagementTable from './ProductManagementTable';
import { getProductByStatus } from '../../services/productService';

export type Tab = {
  id: 'online' | 'pending' | 'deactivated' | 'suspended' | 'locked';
  label: 'Online' | 'Pending QC' | 'Inactive' | 'Suspended' | 'Locked';
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
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = useCallback((tab: Tab) => setCurrentTab(tab), []);

  function getAllProducts() {
    setProductList([]);
    setIsLoading(true);
    getProductByStatus(currentTab.id)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setProductList(res?.data);
        setStatusArray(res?.statusCount);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setProductList([]);
          setStatusArray(err?.response?.data?.statusCount);
        }
        setIsLoading(false);
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
