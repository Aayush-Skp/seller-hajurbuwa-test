import React from 'react';
import TabStatusBadge from '../common/TabStatusBadge';
import {
  getTabBadgeCount,
  normalizeStatusCounts,
  StatusCountItem,
} from '../../utils/tabStatusCounts';
import { Tab } from '.';

type NavigationHeaderProps = {
  currentTab: Tab;
  tabs: Tab[];
  onTabClick: (tab: Tab) => void;
  statusArray?: StatusCountItem[];
};

export default function TabsHeader({
  currentTab,
  tabs,
  onTabClick,
  statusArray,
}: NavigationHeaderProps) {
  const counts = normalizeStatusCounts(statusArray);

  return (
    <div className="sticky top-28 z-10 w-full rounded border border-gray-300 bg-white">
      <ul className="flex flex-wrap justify-between gap-x-2 gap-y-2 px-4 pt-4">
        {tabs.map((header) => {
          const badge = counts.length
            ? getTabBadgeCount(counts, header.id)
            : undefined;

          return (
            <li
              key={header.id}
              onClick={() => onTabClick(header)}
              className={`${
                currentTab.id === header.id
                  ? 'border-b-[3px] border-blue-700'
                  : 'text-gray-800'
              } cursor-pointer pb-2 tracking-wide`}
            >
              <div className="relative flex items-center justify-center gap-1">
                {badge !== undefined ? <TabStatusBadge count={badge} /> : null}
                <span className="whitespace-nowrap text-sm">{header.label}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
