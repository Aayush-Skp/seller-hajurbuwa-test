import React from 'react';
import { Tab } from '.';

type NavigationHeaderProps = {
  currentTab: Tab;
  tabs: Tab[];
  onTabClick: (tab: Tab) => void;
};

export default function TabsHeader({
  currentTab,
  tabs,
  onTabClick,
}: NavigationHeaderProps) {
  return (
    <div className="sticky top-28 z-10 h-[40px] bg-white w-full">
      <ul className="flex space-x-[109.38px] h-full pl-[26.44px] pt-[11.27px] pb-[7.85px] bg-gray-200">
        {tabs.map((header) => (
          <li
            key={header.id}
            onClick={() => onTabClick(header)}
            className="tracking-wide cursor-pointer"
          >
            <span>{header.label}</span>
            {currentTab.id === header.id ? (
              <div className="h-[5px] bg-blue-700" />
            ) : null}
          </li>
        ))}
      </ul>
      <div className="h-[5px]" />
    </div>
  );
}
