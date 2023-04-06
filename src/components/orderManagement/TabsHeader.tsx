import React from 'react';
import { Tab } from '.';

type NavigationHeaderProps = {
  currentTab: Tab;
  tabs: Tab[];
  onTabClick: (tab: Tab) => void;
  orderList: any;
};

export default function TabsHeader({
  currentTab,
  tabs,
  onTabClick,
  orderList,
}: NavigationHeaderProps) {
  const badge = orderList.filter(
    (order: any) => order.order_status === currentTab.id
  ).length;
  return (
    <div className="sticky top-28 z-10 bg-white w-full border border-gray-300 rounded">
      <ul className="flex justify-between space-x-4 px-4 pt-4">
        {tabs.map((header) => (
          <li
            key={header.id}
            onClick={() => onTabClick(header)}
            className={`${
              currentTab.id === header.id
                ? 'border-blue-700 border-b-[3px]'
                : 'text-gray-400'
            } tracking-wide cursor-pointer`}
          >
            <div className="relative">
              <span>{header.label}</span>
              <span className="absolute -top-1 -left-3 text-lg text-error-primary font-semibold">
                {header.id === currentTab.id && badge !== 0 ? badge : null}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
