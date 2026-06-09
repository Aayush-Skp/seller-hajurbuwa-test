import { ChangeEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Button from '../common/Button';
import { NoButton, YesButton } from '../common/ModalButtons';
import TextInput from '../common/TextInput';
import InputLabel from '../common/InputLabel';
import CheckboxInput from '../common/CheckboxInput';
import ErrorMessage from '../common/ErrorMessage';
import {
  ProductBulkTier,
  updateProductPricing,
} from '../../services/productService';

type PriceEditModalProps = {
  productId: number;
  pricePerUnit?: number | string;
  minimumOrder?: number;
  isBulkPrice?: boolean;
  bulkPrice?: ProductBulkTier[];
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
};

export default function PriceEditModal({
  productId,
  pricePerUnit,
  minimumOrder,
  isBulkPrice,
  bulkPrice,
  isOpen,
  onClose,
  onSaved,
}: PriceEditModalProps) {
  const [moq, setMoq] = useState(1);
  const [unitPrice, setUnitPrice] = useState('');
  const [bulkEnabled, setBulkEnabled] = useState(false);
  const [tiers, setTiers] = useState<ProductBulkTier[]>([
    { quantity: 1, price: 0 },
  ]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const resolvedMoq = minimumOrder && minimumOrder > 0 ? minimumOrder : 1;
    const resolvedBulk =
      isBulkPrice ?? (!pricePerUnit && (bulkPrice?.length ?? 0) > 0);
    setMoq(resolvedMoq);
    setUnitPrice(
      pricePerUnit != null && pricePerUnit !== '' ? String(pricePerUnit) : ''
    );
    setBulkEnabled(resolvedBulk);
    setTiers(
      bulkPrice?.length
        ? bulkPrice.map((tier, i) => ({
            quantity: i === 0 ? resolvedMoq : Number(tier.quantity),
            price: Number(tier.price),
          }))
        : [{ quantity: resolvedMoq, price: 0 }]
    );
    setError('');
  }, [isOpen, pricePerUnit, minimumOrder, isBulkPrice, bulkPrice]);

  function updateTier(
    index: number,
    field: 'quantity' | 'price',
    value: number
  ) {
    setTiers((prev) =>
      prev.map((tier, i) =>
        i === index ? { ...tier, [field]: value } : tier
      )
    );
    setError('');
  }

  function addTier() {
    if (tiers.length >= 4) return;
    const last = tiers[tiers.length - 1];
    setTiers([
      ...tiers,
      { quantity: last.quantity + 1, price: Math.max(last.price - 1, 1) },
    ]);
  }

  function removeTier(index: number) {
    if (index === 0 || tiers.length <= 1) return;
    setTiers(tiers.filter((_, i) => i !== index));
  }

  function handleMoqChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.valueAsNumber;
    setMoq(value);
    if (bulkEnabled) {
      setTiers((prev) =>
        prev.map((tier, i) => (i === 0 ? { ...tier, quantity: value } : tier))
      );
    }
  }

  async function handleSave() {
    if (!moq || moq < 1) {
      setError('Minimum order must be at least 1.');
      return;
    }

    if (bulkEnabled) {
      if (!tiers.length || !tiers[0].price) {
        setError('Enter a valid price for the first bulk tier.');
        return;
      }
      for (let i = 1; i < tiers.length; i++) {
        if (tiers[i].quantity <= tiers[i - 1].quantity) {
          setError(`Tier ${i + 1} quantity must exceed tier ${i}.`);
          return;
        }
        if (tiers[i].price >= tiers[i - 1].price) {
          setError(`Tier ${i + 1} price must be less than tier ${i}.`);
          return;
        }
      }
    } else if (!unitPrice || Number(unitPrice) <= 0) {
      setError('Enter a valid unit price.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await updateProductPricing(productId, {
        is_bulk_price: bulkEnabled ? 1 : 0,
        minimum_order: moq,
        ...(bulkEnabled
          ? {
              bulk_pricing: tiers.map((tier, i) =>
                i === 0 ? { ...tier, quantity: moq } : tier
              ),
            }
          : { price_per_unit: Number(unitPrice) }),
      });
      onSaved();
      onClose();
    } catch {
      setError('Could not save pricing. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-md bg-white p-6 shadow-lg"
      overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      style={{
        content: { position: 'relative', inset: 'auto', transform: 'none' },
      }}
    >
      <h2 className="mb-4 text-lg font-medium text-black">Edit pricing</h2>

      <div className="space-y-4">
        <div>
          <InputLabel label="Minimum order (MOQ)" htmlFor="pricing_moq" />
          <TextInput
            id="pricing_moq"
            type="number"
            min={1}
            value={moq}
            onChange={handleMoqChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <CheckboxInput
            id="pricing_bulk"
            checked={bulkEnabled}
            onChange={() => setBulkEnabled((prev) => !prev)}
          />
          <label htmlFor="pricing_bulk" className="text-sm text-black">
            Use bulk pricing tiers
          </label>
        </div>

        {bulkEnabled ? (
          <div className="space-y-2 rounded border border-gray-200 p-3">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-gray-500">
              <span>Quantity+</span>
              <span>Price (NPR)</span>
            </div>
            {tiers.map((tier, i) => (
              <div key={i} className="grid grid-cols-2 items-center gap-2">
                <TextInput
                  type="number"
                  min={1}
                  disabled={i === 0}
                  value={i === 0 ? moq : tier.quantity}
                  onChange={(e) =>
                    updateTier(i, 'quantity', e.target.valueAsNumber)
                  }
                />
                <div className="flex items-center gap-2">
                  <TextInput
                    type="number"
                    min={1}
                    value={tier.price || ''}
                    onChange={(e) =>
                      updateTier(i, 'price', e.target.valueAsNumber)
                    }
                  />
                  {i > 0 ? (
                    <button
                      type="button"
                      className="text-xs text-error-primary"
                      onClick={() => removeTier(i)}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            <Button
              className="!w-auto !px-3 !py-1 !text-xs"
              disabled={tiers.length >= 4}
              onClick={addTier}
            >
              Add tier
            </Button>
          </div>
        ) : (
          <div>
            <InputLabel label="Price per unit (NPR)" htmlFor="pricing_unit" />
            <TextInput
              id="pricing_unit"
              type="number"
              min={1}
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </div>
        )}

        {error ? <ErrorMessage message={error} /> : null}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <NoButton onClick={onClose}>Cancel</NoButton>
        <YesButton onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </YesButton>
      </div>
    </Modal>
  );
}
