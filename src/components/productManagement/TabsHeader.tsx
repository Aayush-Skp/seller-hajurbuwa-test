import React from 'react';

type Tab = {
  id: string;
  label: string;
};

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
    <div className="sticky bg-white w-full border border-gray-300 rounded">
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
            {header.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
