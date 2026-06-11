import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PAYMENT_TYPE_FILTER_OPTIONS } from '../../constants/orderPayment';
import { useClickAwayListener } from '../../hooks/useClickAwayListener';

export type OrderFilterValues = {
  dateFrom: string;
  dateTo: string;
  paymentMode: string;
  paymentStatus: string;
};

type OrderFiltersProps = {
  onChange: (filters: OrderFilterValues) => void;
};

type FilterDraft = {
  dateRange: string;
  customDateFrom: string;
  customDateTo: string;
  paymentMode: string;
  paymentStatus: string;
};

const EMPTY_FILTERS: OrderFilterValues = {
  dateFrom: '',
  dateTo: '',
  paymentMode: '',
  paymentStatus: '',
};

const DEFAULT_DRAFT: FilterDraft = {
  dateRange: 'all',
  customDateFrom: '',
  customDateTo: '',
  paymentMode: '',
  paymentStatus: '',
};

const DATE_RANGE_OPTIONS = [
  { label: 'All Time', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: 'last_7_days' },
  { label: 'Last 30 Days', value: 'last_30_days' },
  { label: 'This Month', value: 'this_month' },
  { label: 'Custom Range', value: 'custom' },
];

const PAYMENT_STATUS_OPTIONS = [
  { label: 'All Payment Statuses', value: '' },
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
];

const toDateString = (date: Date) => date.toISOString().slice(0, 10);

const getDateRange = (
  range: string,
  customFrom = '',
  customTo = ''
): { dateFrom: string; dateTo: string } => {
  if (range === 'custom') {
    return { dateFrom: customFrom, dateTo: customTo };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (range) {
    case 'today':
      return { dateFrom: toDateString(today), dateTo: toDateString(today) };
    case 'last_7_days': {
      const from = new Date(today);
      from.setDate(from.getDate() - 6);
      return { dateFrom: toDateString(from), dateTo: toDateString(today) };
    }
    case 'last_30_days': {
      const from = new Date(today);
      from.setDate(from.getDate() - 29);
      return { dateFrom: toDateString(from), dateTo: toDateString(today) };
    }
    case 'this_month': {
      const from = new Date(today.getFullYear(), today.getMonth(), 1);
      return { dateFrom: toDateString(from), dateTo: toDateString(today) };
    }
    default:
      return { dateFrom: '', dateTo: '' };
  }
};

const buildFilterValues = (draft: FilterDraft): OrderFilterValues => {
  const { dateFrom, dateTo } = getDateRange(
    draft.dateRange,
    draft.customDateFrom,
    draft.customDateTo
  );

  return {
    dateFrom,
    dateTo,
    paymentMode: draft.paymentMode,
    paymentStatus: draft.paymentStatus,
  };
};

const hasActiveFilters = (filters: OrderFilterValues) =>
  Boolean(
    filters.dateFrom ||
      filters.dateTo ||
      filters.paymentMode ||
      filters.paymentStatus
  );

const OrderFilters = ({ onChange }: OrderFiltersProps) => {
  const { isNodeVisible, setIsNodeVisible, nodeRef } = useClickAwayListener();
  const [draft, setDraft] = useState<FilterDraft>(DEFAULT_DRAFT);
  const [appliedDraft, setAppliedDraft] = useState<FilterDraft>(DEFAULT_DRAFT);
  const [appliedFilters, setAppliedFilters] =
    useState<OrderFilterValues>(EMPTY_FILTERS);

  const openPanel = () => {
    setDraft(appliedDraft);
    setIsNodeVisible(true);
  };

  const handleApply = () => {
    const nextFilters = buildFilterValues(draft);
    setAppliedDraft(draft);
    setAppliedFilters(nextFilters);
    onChange(nextFilters);
    setIsNodeVisible(false);
  };

  const handleClear = () => {
    setDraft(DEFAULT_DRAFT);
    setAppliedDraft(DEFAULT_DRAFT);
    setAppliedFilters(EMPTY_FILTERS);
    onChange(EMPTY_FILTERS);
  };

  return (
    <div ref={nodeRef} className="relative">
      <button
        type="button"
        aria-label="More filters"
        onClick={() => (isNodeVisible ? setIsNodeVisible(false) : openPanel())}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
      >
        <BsThreeDotsVertical className="text-lg" />
      </button>

      {isNodeVisible ? (
        <div className="absolute right-0 top-full z-30 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <p className="mb-3 text-sm font-semibold text-black">More Filter</p>

          <label className="mb-1 block text-xs font-medium text-gray-700">
            Date Range
          </label>
          <select
            className="mb-3 w-full rounded-md border border-gray-400 px-2 py-2 text-sm outline-none"
            value={draft.dateRange}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, dateRange: e.target.value }))
            }
          >
            {DATE_RANGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {draft.dateRange === 'custom' ? (
            <div className="mb-3 grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  From
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-gray-400 px-2 py-2 text-sm outline-none"
                  value={draft.customDateFrom}
                  max={draft.customDateTo || undefined}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      customDateFrom: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  To
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-gray-400 px-2 py-2 text-sm outline-none"
                  value={draft.customDateTo}
                  min={draft.customDateFrom || undefined}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      customDateTo: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          ) : null}

          <label className="mb-1 block text-xs font-medium text-gray-700">
            Payment type
          </label>
          <select
            className="mb-3 w-full rounded-md border border-gray-400 px-2 py-2 text-sm outline-none"
            value={draft.paymentMode}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, paymentMode: e.target.value }))
            }
          >
            {PAYMENT_TYPE_FILTER_OPTIONS.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="mb-1 block text-xs font-medium text-gray-700">
            Payment status
          </label>
          <select
            className="w-full rounded-md border border-gray-400 px-2 py-2 text-sm outline-none"
            value={draft.paymentStatus}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, paymentStatus: e.target.value }))
            }
          >
            {PAYMENT_STATUS_OPTIONS.map((option) => (
              <option key={option.value || 'all-status'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="mt-4 flex items-center justify-between gap-2">
            {hasActiveFilters(appliedFilters) ? (
              <button
                type="button"
                className="text-xs font-medium text-accent-primary hover:underline"
                onClick={handleClear}
              >
                Clear filters
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrderFilters;
