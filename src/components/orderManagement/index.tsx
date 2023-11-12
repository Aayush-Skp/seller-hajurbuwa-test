import React, { useCallback, useEffect, useState } from 'react';
import {
  getOrdersByStatus,
  searchOrdersWithStatusAndKeyword,
} from '../../services/orderServices';
import OrdersTable from './OrdersTable';
import TabsHeader from './TabsHeader';
import searchIcon from '../../../public/icons/searchIcon.svg';
import Image from 'next/image';
import Pagination from '../Pagination';

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

  const [currentPageUrl, setCurrentPageUrl] = useState<string | null>(null);
  const [paginationData, setPaginationData] = useState<any>({
    links: [],
  });

  const handleTabChange = useCallback((tab: Tab) => {
    setCurrentTab(tab);
    setCurrentPageUrl(null);
  }, []);

  function handleOrderSearch(e: React.ChangeEvent<HTMLInputElement>) {
    // setIsLoading(true);

    e.target.value === ''
      ? getAllOrders()
      : searchOrdersWithStatusAndKeyword(currentTab.id, e.target.value)
          .then((res) => {
            console.log(res);
            setOrderList(res.data);
            setOrderListWithCount(res.status_array);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            if (err?.response?.status === 404) {
              setOrderList([]);
              setOrderListWithCount(err?.response?.data?.status_array ?? []);
            }
            setIsLoading(false);
          });
  }

  function getAllOrders() {
    setIsLoading(true);

    getOrdersByStatus(currentTab.id, currentPageUrl)
      .then((res) => {
        setOrderList(res.data);
        setOrderListWithCount(res.status_array);
        setPaginationData(res?.pagination);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setOrderList([]);
          setOrderListWithCount(err?.response?.data?.status_array ?? []);
        }
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllOrders();
  }, [currentTab, currentPageUrl]);

  return (
    <section className="flex flex-col justify-center items-center w-full">
      <div className="w-4/5">
        <TabsHeader
          tabs={tabs}
          currentTab={currentTab}
          onTabClick={handleTabChange}
          orderListWithCount={orderListWithCount}
        />

        <div className="absolute top-10 right-10">
          <div className="relative">
            <div className="absolute flex items-center h-full pl-2">
              <Image src={searchIcon} alt="search" />
            </div>
            <input
              onChange={handleOrderSearch}
              className="pl-10 text-base font-normal w-[542px] h-[35px] bg-gray-100 rounded-md outline-none"
              placeholder="Search Orders(s) by Order Id"
            />
          </div>
        </div>

        <OrdersTable
          isLoading={isLoading}
          data={orderList}
          productStatus={currentTab}
          getAllOrders={getAllOrders}
        />

        <div className="w-full flex justify-end">
          <Pagination
            paginationData={paginationData}
            setCurrentPageUrl={setCurrentPageUrl}
          />
        </div>
      </div>
    </section>
  );
}
