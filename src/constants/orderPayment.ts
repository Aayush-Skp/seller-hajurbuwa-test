export const PAYMENT_MODE_OPTIONS = [
  { label: 'Cash on Delivery', value: 'cod' },
  { label: 'Online', value: 'online' },
  { label: 'Bank Transfer', value: 'bank_transfer' },
] as const;

export const PAYMENT_TYPE_FILTER_OPTIONS = [
  { label: 'All Payment Types', value: '' },
  ...PAYMENT_MODE_OPTIONS,
];

export const formatPaymentModeLabel = (value?: string | null) => {
  if (!value) return '—';
  const match = PAYMENT_MODE_OPTIONS.find((option) => option.value === value);
  return match?.label ?? value.replace(/_/g, ' ');
};
