import React from 'react';
import type { Tab } from './ShippingAndPayment';

type NavigationHeaderProps = {
  currentTab: Tab;
  tabs: Tab[];
  onTabClick: (tab: Tab) => void;
};

export default function SectionTabsHeader({
  currentTab,
  tabs,
  onTabClick,
}: NavigationHeaderProps) {
  return (
    <div className="sticky top-28 bg-white w-full border border-gray-300 rounded">
      <ul className="flex justify-start space-x-4 px-4 pt-4">
        {tabs.map((header) => (
          <li
            key={header.id}
            onClick={() => onTabClick(header)}
            className={`${
              currentTab.id === header.id
                ? 'border-blue-700 border-b-[3px]'
                : 'text-gray-800'
            } tracking-wide cursor-pointer`}
          >
            <div className="relative">
              <span>{header.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
