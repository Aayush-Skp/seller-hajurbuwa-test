import Link from 'next/link';
import React from 'react';
import { MdContentCopy } from 'react-icons/md';
import useCopyToClipboard from '../../hooks/useCopyToClipBoard';

export const CopyableText = ({
  value,
  className = 'text-sm text-black',
  label,
}: {
  value?: string | number | null;
  className?: string;
  label?: string;
}) => {
  const [, copy] = useCopyToClipboard();

  if (!value) return <span className={className}>—</span>;

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span>{value}</span>
      <button
        type="button"
        className="text-accent-primary hover:opacity-80"
        onClick={() => copy(String(value))}
        aria-label={label ? `Copy ${label}` : 'Copy'}
      >
        <MdContentCopy className="text-sm" />
      </button>
    </span>
  );
};

export const DetailCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
    <div className="border-b border-gray-300 bg-gray-150 px-4 py-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
        {title}
      </h3>
    </div>
    <div className="flex flex-col gap-1 px-4 py-4">{children}</div>
  </div>
);

export const DetailRow = ({
  label,
  value,
  href,
}: {
  label: string;
  value?: React.ReactNode;
  href?: string;
}) => (
  <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-start gap-x-3 gap-y-0.5 py-1">
    <span className="text-xs leading-relaxed text-gray-600">{label}</span>
    {href ? (
      <Link
        href={href}
        target="_blank"
        className="text-sm text-black hover:text-accent-primary"
      >
        {value || '—'}
      </Link>
    ) : (
      <span className="break-words text-sm text-black">{value || '—'}</span>
    )}
  </div>
);

export const StatusBadge = ({
  label,
  tone = 'neutral',
}: {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'error' | 'info';
}) => {
  const tones: Record<string, string> = {
    neutral: 'bg-gray-200 text-black',
    success: 'bg-success-tertiary text-success-secondary',
    warning: 'bg-[#fef9c3] text-[#854d0e]',
    error: 'bg-error-tertiary text-error-primary',
    info: 'bg-accent-tertiary text-accent-primary',
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${tones[tone]}`}
    >
      {label}
    </span>
  );
};

export const formatStatusLabel = (status?: string) => {
  if (!status) return '—';
  if (status === 'waiting_for_pickup') return 'Waiting for Pickup';
  if (status === 'picked_up') return 'Picked Up';
  return status.replace(/_/g, ' ');
};

export const getOrderStatusTone = (
  status?: string
): 'neutral' | 'success' | 'warning' | 'error' | 'info' => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'delivered':
      return 'success';
    case 'cancelled':
    case 'failed':
      return 'error';
    case 'sent':
    case 'picked_up':
    case 'waiting_for_pickup':
    case 'unshipped':
      return 'info';
    default:
      return 'neutral';
  }
};

export const getPaymentStatusTone = (
  status?: string
): 'neutral' | 'success' | 'warning' | 'error' | 'info' => {
  if (status === 'paid') return 'success';
  if (status === 'unpaid') return 'warning';
  return 'neutral';
};
