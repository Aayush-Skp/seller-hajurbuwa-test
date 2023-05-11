import React, { useCallback, useEffect, useState } from 'react';
import Header from './TabsHeader';
import ProductManagementTable from './ProductManagementTable';
import Image from 'next/image';
import searchIcon from '../../../public/icons/searchIcon.svg';
import Pagination from '../Pagination';
import { ProductStatus, ProductStatusLabel } from '../../../types/productType';
import {
  getProductByStatus,
  searchProductsWithStatusAndKeyword,
} from '../../services/productService';

export type Tab = {
  id: ProductStatus;
  label: ProductStatusLabel;
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
  const [paginationData, setPaginationData] = useState<any>({
    links: [],
  });

  const [currentPageUrl, setCurrentPageUrl] = useState<string | null>(null);

  const handleTabChange = useCallback((tab: Tab) => {
    setCurrentTab(tab);
    setCurrentPageUrl(null);
  }, []);

  function getAllProducts() {
    setIsLoading(true);
    getProductByStatus(currentTab.id, currentPageUrl)
      .then((res) => {
        setIsLoading(false);
        setProductList(res?.data);
        setStatusArray(res?.statusCount);
        setPaginationData(res?.pagination);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setProductList([]);
          setStatusArray(err?.response?.data?.statusCount);
        }
        setIsLoading(false);
      });
  }

  function handleProductSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.value === ''
      ? getAllProducts()
      : searchProductsWithStatusAndKeyword(currentTab.id, e.target.value)
          .then((res) => {
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
  }, [currentTab, currentPageUrl]);

  return (
    <section className="">
      <Header
        tabs={tabs}
        currentTab={currentTab}
        onTabClick={handleTabChange}
        statusArray={statusArray}
      />

      <div className="absolute top-10 right-10">
        <div className="relative">
          <div className="absolute flex items-center h-full pl-2">
            <Image src={searchIcon} alt="search" />
          </div>
          <input
            onChange={handleProductSearch}
            className="pl-10 text-base font-normal w-[542px] h-[35px] bg-gray-100 rounded-md outline-none"
            placeholder="Search Product(s) by Product Id or product name"
          />
        </div>
      </div>

      <ProductManagementTable
        data={productList}
        isLoading={isLoading}
        productStatus={currentTab}
        getAllProducts={getAllProducts}
      />

      <div className="w-full flex justify-end">
        <Pagination
          paginationData={paginationData}
          setCurrentPageUrl={setCurrentPageUrl}
        />
      </div>
    </section>
  );
}
