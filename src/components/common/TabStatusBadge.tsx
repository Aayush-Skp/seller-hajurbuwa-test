import React from 'react';
import { formatBadgeCount } from '../../utils/tabStatusCounts';

type TabStatusBadgeProps = {
  count: number;
};

const TabStatusBadge = ({ count }: TabStatusBadgeProps) => (
  <span
    className="inline-flex h-5 min-w-[1.25rem] shrink-0 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white tabular-nums"
    title={String(count)}
  >
    {formatBadgeCount(count)}
  </span>
);

export default TabStatusBadge;
