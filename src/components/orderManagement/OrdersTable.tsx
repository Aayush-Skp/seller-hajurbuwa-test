import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import { MdContentCopy } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import ReactModal from 'react-modal';
import { Tab } from '.';
import {
  getRetailerProductUrl,
  imageServerBaseUrl,
} from '../../constants/serverConstants';
import useCopyToClipboard from '../../hooks/useCopyToClipBoard';
import { useClickAwayListener } from '../../hooks/useClickAwayListener';
import { formatDate } from '../../utils/dateformat';
import { getOrderUnitPrice } from '../../utils/orderPricing';
import { changeOrderStatus } from '../../services/orderServices';
import { buildInvoiceFromOrders } from './buildInvoiceFromOrders';
import InvoicePDF, { Invoice } from './InvoicePDF';
import Button from '../common/Button';
import { YesButton, NoButton } from '../common/ModalButtons';
import TextInput from '../common/TextInput';
import InputLabel from '../common/InputLabel';

type StatusAction = {
  label: string;
  nextStatus: string;
};

const formatRs = (amount: number) =>
  `Rs ${Math.round(amount).toLocaleString('en-IN')}`;

const showTimeLeftTabs: Tab['id'][] = [
  'pending',
  'unshipped',
  'waiting_for_pickup',
];

const parseSlaDeadline = (value?: string | null): Date | null => {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw) return null;

  let parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) return parsed;

  const mysqlMatch = raw.match(/^(\d{4}-\d{2}-\d{2})[\sT](\d{2}:\d{2}:\d{2})/);
  if (mysqlMatch) {
    parsed = new Date(`${mysqlMatch[1]}T${mysqlMatch[2]}`);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

  return null;
};

const isSlaBreached = (deadline?: string, timeLeft?: string) => {
  const deadlineDate = parseSlaDeadline(deadline);
  if (deadlineDate && Date.now() >= deadlineDate.getTime()) {
    return true;
  }

  if (!timeLeft) return false;

  const normalized = timeLeft.trim().toLowerCase();
  if (normalized === 'time crossed') return true;

  return /^0\s+hours?\s+0\s+minutes?$/.test(normalized);
};

const getTimeLeftDisplay = (deadline: string | undefined, timeLeft: string) =>
  isSlaBreached(deadline, timeLeft) ? 'SLA Breached' : timeLeft;

const CANCEL_TABS: Tab['id'][] = [
  'pending',
  'unshipped',
  'waiting_for_pickup',
];

const compactButtonClass =
  '!w-auto whitespace-nowrap !px-3 !py-1 !text-xs !font-medium';

const MULTI_BUYER_INVOICE_ERROR =
  'Invoice cannot be generated because selected orders belong to more than one buyer. Print invoice can only be generated for one buyer at a time.';

const getUniqueBuyerIds = (
  rows: { id: string | number; buyer_id?: string | number }[],
  selectedIds: (string | number)[]
) => {
  const buyerIds = rows
    .filter((row) => selectedIds.includes(row.id))
    .map((row) => row.buyer_id)
    .filter((id) => id != null && id !== '');
  return Array.from(new Set(buyerIds));
};

const getStatusAction = (tabId: Tab['id']): StatusAction | null => {
  switch (tabId) {
    case 'pending':
      return { label: 'Confirm', nextStatus: 'unshipped' };
    case 'unshipped':
      return { label: 'Ready for Pickup', nextStatus: 'waiting_for_pickup' };
    default:
      return null;
  }
};

const ContactLine = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-1.5 text-xs text-gray-900">
    <span className="mt-0.5 shrink-0 text-accent-primary">{icon}</span>
    <span className="text-left leading-relaxed">{children}</span>
  </div>
);

const DetailLabel = ({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) => (
  <span
    className={`shrink-0 text-xs leading-none ${
      accent ? 'text-accent-primary' : 'text-gray-600'
    }`}
  >
    {children}
  </span>
);

const ProductMetaRow = ({
  label,
  value,
  accentLabel = false,
  isPrice = false,
}: {
  label: string;
  value: React.ReactNode;
  accentLabel?: boolean;
  isPrice?: boolean;
}) => (
  <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-x-2">
    <DetailLabel accent={accentLabel}>{label}</DetailLabel>
    <span
      className={`text-xs tabular-nums text-black ${
        isPrice ? 'font-medium' : 'font-normal'
      }`}
    >
      {value}
    </span>
  </div>
);

const AmountRow = ({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) => (
  <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-x-2">
    <DetailLabel>{label}</DetailLabel>
    <span
      className={`text-right text-xs tabular-nums text-black ${
        emphasized ? 'font-semibold' : 'font-medium'
      }`}
    >
      {value}
    </span>
  </div>
);

const MoreActionsMenu = ({
  orderId,
  canCancel,
  onCancel,
}: {
  orderId: string | number;
  canCancel: boolean;
  onCancel: () => void;
}) => {
  const { isNodeVisible, setIsNodeVisible, nodeRef } = useClickAwayListener();

  return (
    <div ref={nodeRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsNodeVisible((prev) => !prev)}
        className="flex w-full items-center justify-between rounded border border-gray-400 bg-white px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-150"
      >
        More Actions
        <BsThreeDotsVertical />
      </button>
      {isNodeVisible ? (
        <div className="absolute right-0 top-full z-20 mt-1 min-w-[10rem] rounded-md border border-gray-300 bg-white py-1 shadow-lg">
          <Link
            href={`/order-management/${orderId}`}
            target="_blank"
            className="block px-4 py-2 text-left text-sm text-black hover:bg-gray-150"
            onClick={() => setIsNodeVisible(false)}
          >
            View Detail
          </Link>
          {canCancel ? (
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-error-primary hover:bg-gray-150"
              onClick={() => {
                setIsNodeVisible(false);
                onCancel();
              }}
            >
              Cancel Order
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const OrdersTable = ({
  data,
  currentTab,
  onRefresh,
}: {
  data: any[];
  currentTab: Tab;
  onRefresh: () => void;
}) => {
  const [, copyProductId] = useCopyToClipboard();
  const [, copyOrderId] = useCopyToClipboard();
  const [, copyGroupId] = useCopyToClipboard();

  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [updatingIds, setUpdatingIds] = useState<(string | number)[]>([]);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const [cancelModal, setCancelModal] = useState<{
    ids: (string | number)[];
    isBulk: boolean;
  } | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [statusConfirmModal, setStatusConfirmModal] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [deliveryChargeModal, setDeliveryChargeModal] = useState(false);
  const [deliveryChargeInput, setDeliveryChargeInput] = useState('0');

  const statusAction = getStatusAction(currentTab.id);
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const showBulkCancel = CANCEL_TABS.includes(currentTab.id);

  const toggleSelect = (orderId: string | number) => {
    setSelectedIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : data.map((row) => row.id));
  };

  const handlePrintInvoices = () => {
    if (selectedIds.length === 0) return;
    setActionError(null);

    const buyerIds = getUniqueBuyerIds(data, selectedIds);
    if (buyerIds.length > 1) {
      setActionError(MULTI_BUYER_INVOICE_ERROR);
      return;
    }

    setDeliveryChargeInput('0');
    setDeliveryChargeModal(true);
  };

  const handleConfirmDeliveryCharge = () => {
    const deliveryCharge = Number(deliveryChargeInput);
    if (Number.isNaN(deliveryCharge) || deliveryCharge < 0) {
      setActionError('Please enter a valid delivery charge (0 or greater).');
      return;
    }

    const selectedRows = data.filter((row) => selectedIds.includes(row.id));
    if (selectedRows.length === 0) return;

    setDeliveryChargeModal(false);
    setActionError(null);
    setInvoices([buildInvoiceFromOrders(selectedRows, deliveryCharge)]);
    setShowInvoice(true);
  };

  const runStatusAction = async (
    orderId: string | number,
    action: StatusAction
  ) => {
    await changeOrderStatus({
      orderId,
      status: action.nextStatus,
    });
  };

  const handleRowStatusUpdate = async (orderId: string | number) => {
    if (!statusAction) return;

    setUpdatingIds((prev) => [...prev, orderId]);
    setActionError(null);
    try {
      await runStatusAction(orderId, statusAction);
      onRefresh();
    } catch {
      setActionError('Failed to update order status. Please try again.');
    } finally {
      setUpdatingIds((prev) => prev.filter((id) => id !== orderId));
    }
  };

  const handleBulkStatusUpdate = () => {
    if (!statusAction || selectedIds.length === 0) return;
    setStatusConfirmModal(true);
  };

  const handleConfirmBulkStatus = async () => {
    if (!statusAction) return;
    setStatusConfirmModal(false);
    setIsBulkUpdating(true);
    setActionError(null);
    try {
      await Promise.all(
        selectedIds.map((id) => runStatusAction(id, statusAction))
      );
      setSelectedIds([]);
      onRefresh();
    } catch {
      setActionError('Some orders could not be updated. Please try again.');
    } finally {
      setIsBulkUpdating(false);
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelModal || !cancelReason.trim()) return;
    setIsBulkUpdating(true);
    setActionError(null);
    try {
      await Promise.all(
        cancelModal.ids.map((id) =>
          changeOrderStatus({
            orderId: id,
            status: 'cancelled',
            reason: cancelReason,
          })
        )
      );
      setCancelModal(null);
      setCancelReason('');
      setSelectedIds([]);
      onRefresh();
    } catch {
      setActionError('Failed to cancel one or more orders.');
    } finally {
      setIsBulkUpdating(false);
    }
  };

  const getUnitPrice = (row: any) => getOrderUnitPrice(row);

  const getCustomerAddress = (row: any) => {
    const parts = [
      row.shipping_address_1,
      row.shipping_address_2,
      row.shipping_area,
      row.shipping_city,
      row.shipping_state,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : '—';
  };

  return (
    <div className="w-full bg-white">
      {selectedIds.length > 0 ? (
        <div className="flex flex-wrap items-center justify-end gap-2 px-2 py-2">
          {actionError ? (
            <span className="text-xs text-error-primary">{actionError}</span>
          ) : null}
          <Button className={compactButtonClass} onClick={handlePrintInvoices}>
            Print Invoice
          </Button>
          {statusAction ? (
            <Button
              className={compactButtonClass}
              disabled={isBulkUpdating}
              onClick={handleBulkStatusUpdate}
            >
              {isBulkUpdating ? 'Updating...' : 'Change status'}
            </Button>
          ) : null}
          {showBulkCancel ? (
            <Button
              className={compactButtonClass}
              disabled={isBulkUpdating}
              onClick={() =>
                setCancelModal({ ids: selectedIds, isBulk: true })
              }
            >
              Cancel Order
            </Button>
          ) : null}
        </div>
      ) : actionError ? (
        <div className="px-2 py-2 text-right text-xs text-error-primary">
          {actionError}
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-150 text-left">
              <th className="w-10 px-3 py-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-sm font-bold text-black">Customer</th>
              <th className="min-w-[17rem] px-4 py-3 text-sm font-bold text-black">
                Product Details
              </th>
              <th className="w-40 min-w-[9.5rem] px-4 py-3 text-sm font-bold text-black">
                Total Amount
              </th>
              <th className="px-4 py-3 text-sm font-bold text-black">Order</th>
              <th className="px-4 py-3 text-sm font-bold text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const orderTotal =
                Number(row.total_amount) + Number(row.shipping_charge || 0);
              const isUpdating = updatingIds.includes(row.id);
              const canCancel = CANCEL_TABS.includes(currentTab.id);

              return (
                <tr
                  key={row.id}
                  className="border-b border-gray-300 align-top"
                >
                  <td className="px-3 py-5">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => toggleSelect(row.id)}
                    />
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex flex-col gap-1.5 text-left">
                      <span className="text-sm font-bold text-black">
                        {row.buyer_name}
                      </span>
                      <ContactLine icon={<HiOutlineMail className="text-sm" />}>
                        {row.buyer_email || '—'}
                      </ContactLine>
                      <ContactLine icon={<IoCallOutline className="text-sm" />}>
                        {row.buyer_phone_number || '—'}
                      </ContactLine>
                      <ContactLine icon={<IoLocationOutline className="text-sm" />}>
                        {getCustomerAddress(row)}
                      </ContactLine>
                    </div>
                  </td>

                  <td className="px-4 py-5 align-top">
                    <div className="flex items-start gap-3 text-left">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded bg-gray-150">
                        {row.product_cover_image ? (
                          <Image
                            height={64}
                            width={64}
                            src={`${imageServerBaseUrl}${row.product_cover_image}`}
                            alt={row.product_name}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        {row.product_id ? (
                          <a
                            href={getRetailerProductUrl(row.product_id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold leading-snug text-accent-primary hover:underline"
                          >
                            {row.product_name}
                          </a>
                        ) : (
                          <p className="text-sm font-bold leading-snug text-black">
                            {row.product_name}
                          </p>
                        )}
                        <button
                          type="button"
                          className="flex w-fit items-center gap-1 text-left text-xs text-accent-primary hover:underline"
                          onClick={() => copyProductId(row.product_id)}
                        >
                          {row.product_id}
                          <MdContentCopy className="text-sm" />
                        </button>
                        {row.product_included_item ? (
                          <p className="text-xs leading-relaxed text-gray-600">
                            {row.product_included_item}
                          </p>
                        ) : null}
                        <div className="flex flex-col gap-1.5 pt-0.5">
                          <ProductMetaRow
                            label="Unit:"
                            value={formatRs(getUnitPrice(row))}
                            accentLabel
                            isPrice
                          />
                          <ProductMetaRow
                            label="Qty:"
                            value={`${row.total_items} ${
                              row.product_unit === 'per pc'
                                ? 'pcs'
                                : row.product_unit
                            }`}
                            accentLabel
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-5 align-top">
                    <div className="inline-flex min-w-[9rem] flex-col gap-1.5 text-left">
                      <AmountRow
                        label="Subtotal:"
                        value={formatRs(row.total_amount)}
                      />
                      <AmountRow
                        label="Delivery:"
                        value={formatRs(row.shipping_charge || 0)}
                      />
                      <div className="border-t border-gray-300 pt-1.5">
                        <AmountRow
                          label="Total:"
                          value={formatRs(orderTotal)}
                          emphasized
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex flex-col items-start gap-2 text-left">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/order-management/${row.id}`}
                          target="_blank"
                          className="text-sm font-bold text-accent-primary hover:underline"
                        >
                          {row.order_id}
                        </Link>
                        <button
                          type="button"
                          className="text-accent-primary hover:opacity-80"
                          onClick={() => copyOrderId(row.order_id)}
                          aria-label="Copy order ID"
                        >
                          <MdContentCopy className="text-sm" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-900">
                        {formatDate(row.order_date)}
                      </p>
                      {row.group_id ? (
                        <button
                          type="button"
                          className="flex items-center gap-1 text-xs text-black hover:text-accent-primary"
                          onClick={() => copyGroupId(row.group_id)}
                        >
                          Group: {row.group_id}
                          <MdContentCopy className="text-sm" />
                        </button>
                      ) : null}
                    </div>
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex min-w-[150px] flex-col gap-2">
                      {showTimeLeftTabs.includes(currentTab.id) &&
                      (row.time_left ||
                        row.sla_deadline_at ||
                        row.estimated_delivery_time) ? (
                        <p
                          className={`text-center text-xxs leading-snug ${
                            isSlaBreached(
                              row.sla_deadline_at ?? row.estimated_delivery_time,
                              row.time_left
                            )
                              ? 'font-normal text-error-primary'
                              : 'font-medium text-error-primary'
                          }`}
                        >
                          {getTimeLeftDisplay(
                            row.sla_deadline_at ?? row.estimated_delivery_time,
                            row.time_left
                          )}
                        </p>
                      ) : null}
                      {statusAction ? (
                        <Button
                          disabled={isUpdating || isBulkUpdating}
                          onClick={() => handleRowStatusUpdate(row.id)}
                        >
                          {isUpdating ? 'Updating...' : statusAction.label}
                        </Button>
                      ) : null}
                      <MoreActionsMenu
                        orderId={row.id}
                        canCancel={canCancel}
                        onCancel={() =>
                          setCancelModal({ ids: [row.id], isBulk: false })
                        }
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {cancelModal ? (
        <ReactModal
          isOpen
          onRequestClose={() => {
            setCancelModal(null);
            setCancelReason('');
          }}
          className="flex h-auto w-1/3 flex-col items-center justify-center rounded-md bg-white p-6"
          overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50"
          style={{
            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
          ariaHideApp={false}
        >
          <div className="mb-4 text-center text-xl">
            {cancelModal.isBulk
              ? `Cancel ${cancelModal.ids.length} selected order(s)?`
              : 'Are you sure you want to cancel this order?'}
          </div>
          <div className="mb-4 w-3/4">
            <InputLabel label="Cancellation Reason" />
            <TextInput
              placeholder="ex: Out of stock"
              onChange={(e) => setCancelReason(e.target.value)}
              value={cancelReason}
            />
          </div>
          <div className="flex items-center justify-center">
            <NoButton
              onClick={() => {
                setCancelModal(null);
                setCancelReason('');
              }}
            >
              No, Cancel
            </NoButton>
            <YesButton
              onClick={handleConfirmCancel}
              disabled={!cancelReason.trim() || isBulkUpdating}
            >
              Yes, Confirm
            </YesButton>
          </div>
        </ReactModal>
      ) : null}

      {statusConfirmModal && statusAction ? (
        <ReactModal
          isOpen
          onRequestClose={() => setStatusConfirmModal(false)}
          className="flex h-auto w-1/3 flex-col items-center justify-center rounded-md bg-white p-6"
          overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50"
          style={{
            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
          ariaHideApp={false}
        >
          <div className="mb-4 text-center text-xl">
            {`Apply "${statusAction.label}" to ${selectedIds.length} selected order(s)?`}
          </div>
          <div className="flex items-center justify-center">
            <NoButton onClick={() => setStatusConfirmModal(false)}>
              No, Cancel
            </NoButton>
            <YesButton
              onClick={handleConfirmBulkStatus}
              disabled={isBulkUpdating}
            >
              Yes, Confirm
            </YesButton>
          </div>
        </ReactModal>
      ) : null}

      {deliveryChargeModal ? (
        <ReactModal
          isOpen
          onRequestClose={() => setDeliveryChargeModal(false)}
          className="flex h-auto w-1/3 flex-col items-center justify-center rounded-md bg-white p-6"
          overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50"
          style={{
            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
          ariaHideApp={false}
        >
          <div className="mb-4 text-center text-xl">Enter Delivery Charge</div>
          <div className="mb-4 w-3/4">
            <InputLabel label="Delivery Charge (Rs)" />
            <TextInput
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              onChange={(e) => setDeliveryChargeInput(e.target.value)}
              value={deliveryChargeInput}
            />
          </div>
          <div className="flex items-center justify-center">
            <NoButton onClick={() => setDeliveryChargeModal(false)}>
              Cancel
            </NoButton>
            <YesButton onClick={handleConfirmDeliveryCharge}>
              Generate Invoice
            </YesButton>
          </div>
        </ReactModal>
      ) : null}

      {showInvoice && invoices.length > 0 ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-90 py-6">
          <div className="relative">
            <InvoicePDF invoices={invoices} />
            <div
              className="absolute -right-2 -top-2 flex cursor-pointer items-center justify-center rounded-full bg-white text-2xl"
              onClick={() => setShowInvoice(false)}
            >
              <AiFillCloseCircle />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrdersTable;
