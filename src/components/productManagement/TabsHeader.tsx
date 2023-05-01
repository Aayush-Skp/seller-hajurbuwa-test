import React from 'react';
import { Tab } from '.';

type NavigationHeaderProps = {
  currentTab: Tab;
  tabs: Tab[];
  onTabClick: (tab: Tab) => void;
  statusArray?: any;
};

export default function TabsHeader({
  currentTab,
  tabs,
  onTabClick,
  statusArray,
}: NavigationHeaderProps) {
  return (
    <div className="sticky top-28 z-10 bg-white w-full border border-[#e6e6e6] rounded">
      <ul className="flex justify-between space-x-4 px-4 pt-4">
        {tabs.map((header) => {
          let badge;
          if (statusArray) {
            badge = statusArray.filter(
              (status: any) => status.status === header.id
            )[0]?.count;
          }
          return (
            <li
              key={header.id}
              onClick={() => onTabClick(header)}
              className={`${
                currentTab.id === header.id
                  ? 'border-blue-700 border-b-[3px]'
                  : 'text-gray-800'
              } tracking-wide cursor-pointer`}
            >
              <div className="relative flex justify-center items-center">
                <span className=" text-[20px] bg-[#e50131] w-5 mr-1 h-5 rounded-full text-white flex justify-center items-center font-semibold">
                  {statusArray && badge}
                </span>
                <span>{header.label}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
