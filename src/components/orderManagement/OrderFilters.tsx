import React, { useMemo, useState } from 'react';
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

const PAYMENT_STATUS_OPTIONS = [
  { label: 'All Payment Statuses', value: '' },
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
];

const OrderFilters = ({ onChange }: OrderFiltersProps) => {
  const { isNodeVisible, setIsNodeVisible, nodeRef } = useClickAwayListener();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const filterValues = useMemo(
    () => ({ dateFrom, dateTo, paymentMode, paymentStatus }),
    [dateFrom, dateTo, paymentMode, paymentStatus]
  );

  const applyFilters = (
    from: string,
    to: string,
    nextPaymentMode: string,
    nextPaymentStatus: string
  ) => {
    onChange({
      dateFrom: from,
      dateTo: to,
      paymentMode: nextPaymentMode,
      paymentStatus: nextPaymentStatus,
    });
  };

  const hasActiveFilter = Boolean(
    filterValues.dateFrom ||
      filterValues.dateTo ||
      filterValues.paymentMode ||
      filterValues.paymentStatus
  );

  return (
    <div ref={nodeRef} className="relative">
      <button
        type="button"
        aria-label="More filters"
        onClick={() => setIsNodeVisible((prev) => !prev)}
        className={`flex h-10 w-10 items-center justify-center rounded-md border bg-white text-gray-700 shadow-sm hover:bg-gray-50 ${
          hasActiveFilter ? 'border-accent-primary' : 'border-gray-300'
        }`}
      >
        <BsThreeDotsVertical className="text-lg" />
      </button>

      {isNodeVisible ? (
        <div className="absolute right-0 top-full z-30 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <p className="mb-3 text-sm font-semibold text-black">More Filter</p>

          <label className="mb-1 block text-xs font-medium text-gray-700">
            Date Range
          </label>
          <div className="mb-3 space-y-2">
            <input
              type="date"
              value={dateFrom}
              max={dateTo || undefined}
              onChange={(e) => {
                const value = e.target.value;
                setDateFrom(value);
                applyFilters(value, dateTo, paymentMode, paymentStatus);
              }}
              className="w-full rounded-md border border-gray-400 px-2 py-2 text-sm outline-none focus:border-accent-primary"
              placeholder="From"
            />
            <input
              type="date"
              value={dateTo}
              min={dateFrom || undefined}
              onChange={(e) => {
                const value = e.target.value;
                setDateTo(value);
                applyFilters(dateFrom, value, paymentMode, paymentStatus);
              }}
              className="w-full rounded-md border border-gray-400 px-2 py-2 text-sm outline-none focus:border-accent-primary"
              placeholder="To"
            />
          </div>

          <label className="mb-1 block text-xs font-medium text-gray-700">
            Payment type
          </label>
          <select
            className="mb-3 w-full rounded-md border border-gray-400 px-2 py-2 text-sm outline-none"
            value={paymentMode}
            onChange={(e) => {
              const value = e.target.value;
              setPaymentMode(value);
              applyFilters(dateFrom, dateTo, value, paymentStatus);
            }}
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
            value={paymentStatus}
            onChange={(e) => {
              const value = e.target.value;
              setPaymentStatus(value);
              applyFilters(dateFrom, dateTo, paymentMode, value);
            }}
          >
            {PAYMENT_STATUS_OPTIONS.map((option) => (
              <option key={option.value || 'all-status'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {hasActiveFilter ? (
            <button
              type="button"
              className="mt-3 text-xs font-medium text-accent-primary hover:underline"
              onClick={() => {
                setDateFrom('');
                setDateTo('');
                setPaymentMode('');
                setPaymentStatus('');
                onChange({
                  dateFrom: '',
                  dateTo: '',
                  paymentMode: '',
                  paymentStatus: '',
                });
              }}
            >
              Clear filters
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default OrderFilters;
