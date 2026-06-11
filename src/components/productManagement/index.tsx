import React, { useCallback, useEffect, useRef, useState } from 'react';
import TabsHeader from './TabsHeader';
import ProductManagementTable, { type ProductRow } from './ProductManagementTable';
import { getProductsByStatus } from '../../services/productService';
import Pagination from '../common/Pagination';
import Search from '../common/Search';
import Loader from '../common/Loader';
import { normalizeStatusCounts, StatusCountItem } from '../../utils/tabStatusCounts';

export type ProductState =
  | 'online'
  | 'pending'
  | 'deactivated'
  | 'suspended'
  | 'locked';

export type Tab = {
  id: ProductState;
  label: 'Online' | 'Pending QC' | 'Inactive' | 'Suspended' | 'Locked';
};

const tabs: Tab[] = [
  { id: 'online', label: 'Online' },
  { id: 'pending', label: 'Pending QC' },
  { id: 'deactivated', label: 'Inactive' },
  { id: 'suspended', label: 'Suspended' },
  { id: 'locked', label: 'Locked' },
];

const SEARCH_DEBOUNCE_MS = 400;
const isCanceledRequest = (err: unknown) =>
  typeof err === 'object' &&
  err !== null &&
  'code' in err &&
  (err as { code?: string }).code === 'ERR_CANCELED';

export default function ProductManagement() {
  const [currentTab, setCurrentTab] = useState<Tab>({
    id: 'online',
    label: 'Online',
  });

  const [productList, setProductList] = useState<ProductRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusArray, setStatusArray] = useState<StatusCountItem[]>([]);
  const [pagination, setPagination] = useState<{
    links?: unknown[];
    last_page?: number;
  }>({});
  const [reqUrl, setReqUrl] = useState('/seller/product?page=1');
  const [notFound, setNotFound] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const requestControllerRef = useRef<AbortController | null>(null);

  const handleTabChange = useCallback(
    (tab: Tab) => {
      setCurrentTab(tab);
      if (debouncedKeyword === '') {
        setReqUrl('/seller/product?page=1');
      } else {
        setReqUrl(
          `/seller/products/search?keyword=${encodeURIComponent(debouncedKeyword)}&page=1`
        );
      }
    },
    [debouncedKeyword]
  );

  const getAllProducts = useCallback(() => {
    requestControllerRef.current?.abort();
    const controller = new AbortController();
    requestControllerRef.current = controller;

    setProductList([]);
    setIsLoading(true);
    const url = `${reqUrl}&status=${currentTab.id}`;
    getProductsByStatus(url, controller.signal)
      .then((res) => {
        const products = res.data || [];
        setProductList(products);
        setStatusArray(
          normalizeStatusCounts(res.statusCount || res.status_array || [])
        );
        setPagination(res.pagination);
        setIsLoading(false);
        setNotFound(products.length === 0);
      })
      .catch((err) => {
        if (isCanceledRequest(err)) return;
        err?.response?.status === 404 && setProductList([]);
        err?.response?.status === 404 &&
          setStatusArray(
            normalizeStatusCounts(
              err.response.data.statusCount ||
                err.response.data.status_array ||
                []
            )
          );
        err?.response?.status === 404 && setNotFound(true);
        setIsLoading(false);
      });
  }, [currentTab.id, reqUrl]);

  useEffect(() => {
    getAllProducts();
    return () => {
      requestControllerRef.current?.abort();
    };
  }, [getAllProducts]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [keyword]);

  useEffect(() => {
    if (debouncedKeyword === '') {
      setReqUrl('/seller/product?page=1');
    } else {
      setReqUrl(
        `/seller/products/search?keyword=${encodeURIComponent(debouncedKeyword)}&page=1`
      );
    }
  }, [debouncedKeyword]);

  return (
    <section className="flex flex-col justify-center items-center w-full">
      <div className="flex items-end justify-between w-full bg-white h-[82px] px-4 pt-2 text-2xl border-b-[3px] border-gray-300">
        <span>Product Management</span>
        <Search
          placeholder="Search by product name or product ID"
          pageName="products"
          setUrl={() => {}}
          setKeyword={setKeyword}
        />
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
            <ProductManagementTable
              data={productList}
              currentTab={currentTab}
              onRefresh={getAllProducts}
            />
          )}
          {notFound ? (
            <div className="text-center text-xl mt-2">No products available</div>
          ) : null}
        </div>
        <Pagination
          pagination={pagination}
          setReqUrl={setReqUrl}
          keyword={debouncedKeyword}
        />
      </div>
    </section>
  );
}
