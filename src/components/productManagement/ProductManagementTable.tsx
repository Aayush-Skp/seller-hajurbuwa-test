import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactModal from 'react-modal';
import { MdContentCopy } from 'react-icons/md';
import { BsPencil } from 'react-icons/bs';
import {
  resolveImageUrl,
  storefrontBaseUrl,
} from '../../constants/serverConstants';
import useCopyToClipboard from '../../hooks/useCopyToClipBoard';
import {
  activateProduct,
  deactivateProduct,
  deleteProduct,
  updateProductStock,
} from '../../services/productService';
import { ProductState, Tab } from './index';
import Button from '../common/Button';
import { YesButton, NoButton } from '../common/ModalButtons';
import TextInput from '../common/TextInput';
import InputLabel from '../common/InputLabel';
import PriceEditModal from './PriceEditModal';
import ActionButtons from './ActionButtons';

type BulkPriceTier = {
  quantity: number;
  price: number;
};

type ProductRow = {
  id: number;
  product_id: string;
  product_name: string;
  cover_image?: string;
  status?: string;
  price_per_unit?: number | string;
  is_bulk_pricing?: number;
  bulk_pricing?: BulkPriceTier[] | null;
  unit?: string;
  minimum_order?: number;
  in_stock?: number;
  category_tree?: string;
};

type BulkActionKind = 'status' | 'stock' | 'delete';

type BulkActionConfig = {
  key: string;
  label: string;
  kind: BulkActionKind;
  status?: 'online' | 'deactivated';
  stock?: number;
};

const compactButtonClass =
  '!w-auto whitespace-nowrap !px-3 !py-1 !text-xs !font-medium';

const statusAction = (
  key: string,
  label: string,
  status: 'online' | 'deactivated'
): BulkActionConfig => ({
  key,
  label,
  kind: 'status',
  status,
});

const deleteAction = (): BulkActionConfig => ({
  key: 'delete',
  label: 'Delete',
  kind: 'delete',
});

const stockAction = (stock: number): BulkActionConfig => ({
  key: stock === 1 ? 'in_stock' : 'out_of_stock',
  label: stock === 1 ? 'On Stock' : 'Out of Stock',
  kind: 'stock',
  stock,
});

const getToggleActions = (
  rows: ProductRow[],
  getValue: (row: ProductRow) => number,
  makeAction: (value: number) => BulkActionConfig
): BulkActionConfig[] => {
  if (rows.length === 0) return [];
  const values = new Set(rows.map(getValue));
  if (values.size === 1) {
    const current = rows[0] ? getValue(rows[0]) : 0;
    return [makeAction(current === 1 ? 0 : 1)];
  }
  return [makeAction(0), makeAction(1)];
};

const getBulkActionsForTab = (
  tabId: ProductState,
  selectedRows: ProductRow[]
): BulkActionConfig[] => {
  switch (tabId) {
    case 'online':
      return [
        statusAction('inactive', 'Deactivate', 'deactivated'),
        ...getToggleActions(
          selectedRows,
          (row) => row.in_stock ?? 0,
          stockAction
        ),
      ];
    case 'pending':
      return [
        statusAction('inactive', 'Deactivate', 'deactivated'),
        deleteAction(),
      ];
    case 'deactivated':
      return [
        statusAction('active', 'Activate', 'online'),
        ...getToggleActions(
          selectedRows,
          (row) => row.in_stock ?? 0,
          stockAction
        ),
      ];
    case 'suspended':
    case 'locked':
      return [deleteAction()];
    default:
      return [];
  }
};

const formatRs = (amount: number | string) =>
  `Rs ${Math.round(Number(amount)).toLocaleString('en-IN')}`;

const DetailLabel = ({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) => (
  <span
    className={`shrink-0 text-xs leading-none ${
      accent ? 'text-accent-primary' : 'text-gray-500'
    }`}
  >
    {children}
  </span>
);

const MetaRow = ({
  label,
  value,
  accentLabel = false,
}: {
  label: string;
  value: React.ReactNode;
  accentLabel?: boolean;
}) => (
  <div className="grid grid-cols-[3.25rem_minmax(0,1fr)] items-baseline gap-x-2">
    <DetailLabel accent={accentLabel}>{label}</DetailLabel>
    <span className="text-xs tabular-nums text-black font-normal">{value}</span>
  </div>
);

const StockBadge = ({ inStock }: { inStock: boolean }) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
      inStock
        ? 'bg-success-tertiary text-success-primary'
        : 'bg-error-tertiary text-error-primary'
    }`}
  >
    {inStock ? 'In stock' : 'Out of stock'}
  </span>
);

const ProductThumbnail = ({
  coverImage,
  productName,
}: {
  coverImage?: string;
  productName: string;
}) => (
  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-50">
    {coverImage ? (
      <Image
        height={80}
        width={80}
        src={resolveImageUrl(coverImage)}
        alt={productName}
        className="h-full w-full object-cover"
      />
    ) : null}
  </div>
);

const getMoqLabel = (minimumOrder?: number) =>
  minimumOrder && minimumOrder > 0 ? minimumOrder : 1;

const pricingLineClass = 'text-sm tabular-nums text-black';

const ProductPricing = ({
  row,
  onEdit,
  isLocked,
}: {
  row: ProductRow;
  onEdit: () => void;
  isLocked: boolean;
}) => {
  const tiers = row.bulk_pricing ?? [];
  const isBulk =
    row.is_bulk_pricing === 1 || (!row.price_per_unit && tiers.length > 0);
  const hasUnitPrice =
    !isBulk && row.price_per_unit != null && row.price_per_unit !== '';
  const hasTiers = isBulk && tiers.length > 0;
  const moqLabel = getMoqLabel(row.minimum_order);

  if (!hasUnitPrice && !hasTiers) {
    return (
      <div className="flex items-start gap-2">
        <span className="text-xs text-gray-500">—</span>
        {!isLocked ? (
          <button
            type="button"
            onClick={onEdit}
            className="shrink-0 text-accent-primary hover:opacity-80"
            aria-label="Edit pricing"
          >
            <BsPencil className="text-sm" />
          </button>
        ) : null}
      </div>
    );
  }

  const visibleTierCount = hasUnitPrice ? 2 : 3;
  const visibleTiers = tiers.slice(0, visibleTierCount);
  const hiddenTierCount = tiers.length - visibleTierCount;

  return (
    <div className="flex items-start gap-2 text-left">
      <div className="flex min-w-0 flex-col gap-1">
        {hasUnitPrice ? (
          <span className={pricingLineClass}>
            <span className="font-medium">{formatRs(row.price_per_unit!)}</span>
            <span className="text-gray-500"> for {moqLabel}+</span>
          </span>
        ) : null}
        {visibleTiers.map((tier, i) => (
          <span key={i} className={pricingLineClass}>
            <span className="font-medium">{formatRs(tier.price)}</span>
            <span className="text-gray-500"> for {tier.quantity}+</span>
          </span>
        ))}
        {hiddenTierCount > 0 ? (
          <span className="text-sm text-gray-500">
            +{hiddenTierCount} more tier{hiddenTierCount > 1 ? 's' : ''}
          </span>
        ) : null}
      </div>
      {!isLocked ? (
        <button
          type="button"
          onClick={onEdit}
          className="mt-0.5 shrink-0 text-accent-primary hover:opacity-80"
          aria-label="Edit pricing"
        >
          <BsPencil className="text-sm" />
        </button>
      ) : null}
    </div>
  );
};

const modalStyle = {
  content: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ProductManagementTable = ({
  data,
  currentTab,
  onRefresh,
}: {
  data: ProductRow[];
  currentTab: Tab;
  onRefresh: () => void;
}) => {
  const [, copyProductId] = useCopyToClipboard();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    action: BulkActionConfig;
    ids: number[];
  } | null>(null);
  const [pricingEditRow, setPricingEditRow] = useState<ProductRow | null>(null);

  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const selectedRows = data.filter((row) => selectedIds.includes(row.id));
  const bulkActions = getBulkActionsForTab(currentTab.id, selectedRows);
  const isLocked = currentTab.id === 'locked';

  useEffect(() => {
    setSelectedIds([]);
    setActionError(null);
  }, [data, currentTab.id]);

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : data.map((row) => row.id));
  };

  const toggleRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const openBulkAction = (action: BulkActionConfig) => {
    if (selectedIds.length === 0) return;
    setConfirmModal({ action, ids: selectedIds });
  };

  const runBulkAction = async (ids: number[], action: BulkActionConfig) => {
    setIsBulkUpdating(true);
    setActionError(null);
    try {
      await Promise.all(
        ids.map((id) => {
          if (action.kind === 'status' && action.status === 'deactivated') {
            return deactivateProduct(id);
          }
          if (action.kind === 'status' && action.status === 'online') {
            return activateProduct(id);
          }
          if (action.kind === 'stock' && action.stock != null) {
            return updateProductStock(id, action.stock);
          }
          if (action.kind === 'delete') {
            return deleteProduct(id);
          }
          return Promise.resolve();
        })
      );
      setConfirmModal(null);
      setSelectedIds([]);
      onRefresh();
    } catch {
      setActionError('Some products could not be updated. Please try again.');
    } finally {
      setIsBulkUpdating(false);
    }
  };

  const handleConfirm = () => {
    if (!confirmModal) return;
    runBulkAction(confirmModal.ids, confirmModal.action);
  };

  const closeModal = () => {
    setConfirmModal(null);
  };

  if (!data?.length) return null;

  const getConfirmMessage = (action: BulkActionConfig, count: number) => {
    if (action.kind === 'stock') {
      return `Set ${count} product(s) to ${action.label}?`;
    }
    if (action.kind === 'delete') {
      return `Delete ${count} product(s)?`;
    }
    return `Apply "${action.label}" to ${count} product(s)?`;
  };

  return (
    <div className="w-full overflow-x-auto rounded-md border border-gray-200 bg-white shadow-sm">
      {selectedIds.length > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-4 py-2">
          <span className="text-xs text-gray-500">
            {selectedIds.length} selected
          </span>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {actionError ? (
              <span className="text-xs text-error-primary">{actionError}</span>
            ) : null}
            {bulkActions.map((action) => (
              <Button
                key={action.key}
                className={compactButtonClass}
                disabled={isBulkUpdating}
                onClick={() => openBulkAction(action)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      ) : actionError ? (
        <div className="border-b border-gray-200 px-4 py-2 text-right text-xs text-error-primary">
          {actionError}
        </div>
      ) : null}

      <table className="w-full min-w-[960px] border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-left">
            <th className="w-10 px-4 py-4">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-gray-300"
                checked={allSelected}
                onChange={toggleSelectAll}
                aria-label="Select all products"
              />
            </th>
            <th className="min-w-[18rem] px-4 py-4 text-xs font-normal uppercase tracking-wide text-gray-500">
              Product
            </th>
            <th className="w-36 px-4 py-4 text-xs font-normal uppercase tracking-wide text-gray-500">
              Pricing
            </th>
            <th className="w-36 px-4 py-4 text-xs font-normal uppercase tracking-wide text-gray-500">
              Inventory
            </th>
            <th className="w-36 px-4 py-4 text-center text-xs font-normal uppercase tracking-wide text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const inStock = row.in_stock === 1;
            const isSelected = selectedIds.includes(row.id);

            return (
              <tr
                key={row.id}
                className={`border-b border-gray-200 align-top transition-colors hover:bg-gray-50 ${
                  isSelected ? 'bg-blue-50/40' : ''
                }`}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer rounded border-gray-300"
                    checked={isSelected}
                    onChange={() => toggleRow(row.id)}
                    aria-label={`Select ${row.product_name}`}
                  />
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-start gap-4 text-left">
                    <ProductThumbnail
                      coverImage={row.cover_image}
                      productName={row.product_name}
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <a
                        href={`${storefrontBaseUrl}/product?productId=${row.product_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium leading-snug text-black hover:text-accent-primary"
                      >
                        {row.product_name}
                      </a>
                      <button
                        type="button"
                        className="flex w-fit items-center gap-1 text-left text-xs text-accent-primary hover:text-accent-primary"
                        onClick={() => copyProductId(row.product_id)}
                      >
                        {row.product_id}
                        <MdContentCopy className="text-sm" />
                      </button>
                      {row.category_tree ? (
                        <p className="text-xs leading-relaxed text-gray-500">
                          {row.category_tree}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 align-top">
                  <ProductPricing
                    row={row}
                    isLocked={isLocked}
                    onEdit={() => setPricingEditRow(row)}
                  />
                </td>

                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col items-start gap-2 text-left">
                    <StockBadge inStock={inStock} />
                    {row.unit || row.minimum_order ? (
                      <div className="flex flex-col gap-1 pt-1">
                        {row.unit ? (
                          <MetaRow label="Unit:" value={row.unit} accentLabel />
                        ) : null}
                        {row.minimum_order ? (
                          <MetaRow
                            label="MOQ:"
                            value={`${row.minimum_order}`}
                            accentLabel
                          />
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </td>

                <td className="relative overflow-visible px-4 py-4 align-middle">
                  <div className="flex min-w-[7rem] items-center justify-center overflow-visible">
                    <ActionButtons
                      productId={String(row.id)}
                      currentTab={currentTab}
                      getAllProducts={onRefresh}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {pricingEditRow ? (
        <PriceEditModal
          productId={pricingEditRow.id}
          pricePerUnit={pricingEditRow.price_per_unit}
          minimumOrder={pricingEditRow.minimum_order}
          isBulkPrice={pricingEditRow.is_bulk_pricing === 1}
          bulkPrice={pricingEditRow.bulk_pricing ?? undefined}
          isOpen
          onClose={() => setPricingEditRow(null)}
          onSaved={onRefresh}
        />
      ) : null}

      {confirmModal ? (
        <ReactModal
          isOpen
          onRequestClose={closeModal}
          ariaHideApp={false}
          className="flex h-auto w-1/3 flex-col items-center justify-center rounded-md bg-white p-6 shadow-lg"
          overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50"
          style={modalStyle}
        >
          <div className="mb-4 text-center text-lg text-black">
            {getConfirmMessage(confirmModal.action, confirmModal.ids.length)}
          </div>
          <div className="flex items-center justify-center gap-2">
            <NoButton onClick={closeModal}>No, Cancel</NoButton>
            <YesButton onClick={handleConfirm} disabled={isBulkUpdating}>
              {isBulkUpdating ? 'Updating...' : 'Yes, Confirm'}
            </YesButton>
          </div>
        </ReactModal>
      ) : null}
    </div>
  );
};

export default ProductManagementTable;
