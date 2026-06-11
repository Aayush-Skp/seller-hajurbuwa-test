import React, { useCallback, useEffect, useRef, useState } from 'react';
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

const getTabFromParam = (
  tabParam: string | string[] | undefined
): Tab => {
  const id = Array.isArray(tabParam) ? tabParam[0] : tabParam;
  return getTabById(id || '') ?? tabs[0];
};

const getInitialTab = (): Tab => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    return getTabFromParam(params.get('tab') ?? undefined);
  }
  return tabs[0];
};

const SEARCH_DEBOUNCE_MS = 400;
const isCanceledRequest = (err: unknown) =>
  typeof err === 'object' &&
  err !== null &&
  'code' in err &&
  (err as { code?: string }).code === 'ERR_CANCELED';

export default function Orders() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<Tab>(getInitialTab);

  useEffect(() => {
    if (!router.isReady) return;
    setCurrentTab(getTabFromParam(router.query.tab));
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
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const requestControllerRef = useRef<AbortController | null>(null);
  const [filters, setFilters] = useState<OrderFilterValues>({
    dateFrom: '',
    dateTo: '',
    paymentMode: '',
    paymentStatus: '',
  });

  const handleTabChange = useCallback(
    (tab: Tab) => {
      setCurrentTab(tab);
      if (debouncedKeyword === '') {
        setReqUrl('/seller/get-orders?page=1');
      }
    },
    [debouncedKeyword]
  );

  const getAllOrders = useCallback(() => {
    requestControllerRef.current?.abort();
    const controller = new AbortController();
    requestControllerRef.current = controller;

    setOrderList([]);
    setIsLoading(true);
    const url = `${reqUrl}&status=${currentTab.id}`;
    getOrdersByStatus(url, controller.signal)
      .then((res) => {
        const orders = res.data || [];
        setStatusArray(
          normalizeStatusCounts(res.status_array || res.statusCount || [])
        );
        setOrderList(orders);
        setPagination(res.pagination);
        setIsLoading(false);
        setNotFound(orders.length === 0);
      })
      .catch((err) => {
        if (isCanceledRequest(err)) return;
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
  }, [currentTab.id, reqUrl]);

  useEffect(() => {
    if (!router.isReady) return;
    getAllOrders();
    return () => {
      requestControllerRef.current?.abort();
    };
  }, [getAllOrders, router.isReady]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [keyword]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (filters.dateFrom) params.set('date_from', filters.dateFrom);
    if (filters.dateTo) params.set('date_to', filters.dateTo);
    if (filters.paymentMode) params.set('payment_mode', filters.paymentMode);
    if (filters.paymentStatus)
      params.set('payment_status', filters.paymentStatus);

    const query = params.toString();

    if (debouncedKeyword === '') {
      setReqUrl(`/seller/get-orders?${query}`);
    } else {
      setReqUrl(
        `/seller/orders/search?${query}&keyword=${encodeURIComponent(debouncedKeyword)}`
      );
    }
  }, [debouncedKeyword, filters]);

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
            keyword={debouncedKeyword}
          />
        )}
      </div>
    </section>
  );
}
