import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getOrdersByStatus } from '../../services/orderServices';
import TabsHeader from './TabsHeader';
import OrdersTable from './OrdersTable';
import Pagination from '../common/Pagination';
import Search from '../common/Search';
import Loader from '../common/Loader';
import OrderFilters, { OrderFilterValues } from './OrderFilters';
import { normalizeStatusCounts, StatusCountItem } from '../../utils/tabStatusCounts';

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
  { id: 'pending', label: 'Pending' },
  { id: 'unshipped', label: 'Unshipped' },
  { id: 'waiting_for_pickup', label: 'Waiting For Pickup' },
  { id: 'picked_up', label: 'Picked up' },
  { id: 'sent', label: 'Sent For Delivery' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'cancelled', label: 'Cancelled' },
  { id: 'failed', label: 'Failed' },
];

const getTabById = (id: string): Tab | undefined =>
  tabs.find((tab) => tab.id === id);

export default function Orders() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[0]);

  useEffect(() => {
    if (!router.isReady) return;

    const tabParam = router.query.tab;
    if (typeof tabParam !== 'string') return;

    const tab = getTabById(tabParam);
    if (tab) {
      setCurrentTab(tab);
    }
  }, [router.isReady, router.query.tab]);

  const [orderList, setOrderList] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusArray, setStatusArray] = useState<StatusCountItem[]>([]);
  const [pagination, setPagination] = useState<{
    links?: unknown[];
    last_page?: number;
  }>({});
  const [notFound, setNotFound] = useState(true);
  const [reqUrl, setReqUrl] = useState('/seller/get-orders?page=1');
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState<OrderFilterValues>({
    dateFrom: '',
    dateTo: '',
    paymentMode: '',
    paymentStatus: '',
  });

  const handleTabChange = useCallback(
    (tab: Tab) => {
      setCurrentTab(tab);
      if (keyword === '') {
        setReqUrl('/seller/get-orders?page=1');
      }
    },
    [keyword]
  );

  function getAllOrders() {
    setOrderList([]);
    setIsLoading(true);
    const url = `${reqUrl}&status=${currentTab.id}`;
    getOrdersByStatus(url)
      .then((res) => {
        setStatusArray(
          normalizeStatusCounts(res.status_array || res.statusCount || [])
        );
        setOrderList(res.data);
        setPagination(res.pagination);
        setIsLoading(false);
        setNotFound(false);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setOrderList([]);
          setStatusArray(
            normalizeStatusCounts(
              err.response.data.status_array ||
                err.response.data.statusCount ||
                []
            )
          );
          setNotFound(true);
        }
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllOrders();
  }, [currentTab, reqUrl]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (filters.dateFrom) params.set('date_from', filters.dateFrom);
    if (filters.dateTo) params.set('date_to', filters.dateTo);
    if (filters.paymentMode) params.set('payment_mode', filters.paymentMode);
    if (filters.paymentStatus)
      params.set('payment_status', filters.paymentStatus);

    if (keyword === '') {
      setReqUrl(`/seller/get-orders?${params.toString()}`);
    } else {
      params.set('keyword', keyword);
      setReqUrl(`/seller/orders/search?${params.toString()}`);
    }
  }, [keyword, filters]);

  return (
    <section className="flex flex-col justify-center items-center w-full">
      <div className="flex items-end justify-between w-full bg-white h-[82px] px-4 pt-2 text-2xl border-b-[3px] border-gray-300">
        <span>Order Management</span>
        <div className="mb-2 flex items-end gap-2">
          <Search
            placeholder="Search by order ID, buyer, or ordered item"
            setKeyword={setKeyword}
            className="relative"
          />
          <OrderFilters onChange={setFilters} />
        </div>
      </div>
      <div className="w-4/5 min-h-[73vh] mb-4 flex flex-col justify-between">
        <div>
          <TabsHeader
            tabs={tabs}
            currentTab={currentTab}
            onTabClick={handleTabChange}
            statusArray={statusArray}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <OrdersTable
              data={orderList}
              currentTab={currentTab}
              onRefresh={getAllOrders}
            />
          )}
          {notFound ? (
            <div className="text-center text-xl mt-2">No Orders available</div>
          ) : null}
        </div>
        {notFound ? null : (
          <Pagination
            pagination={pagination}
            setReqUrl={setReqUrl}
            keyword={keyword}
          />
        )}
      </div>
    </section>
  );
}
