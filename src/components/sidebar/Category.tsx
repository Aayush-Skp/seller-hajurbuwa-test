import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type CategoryProps = {
  id: string;
  title: string;
  isSelected: boolean;
  selectedSubCategory: string | undefined | string[];
  subCategories: { id: string; title: string }[];
};

export default function Category({
  id,
  title,
  isSelected,
  subCategories,
  selectedSubCategory,
}: CategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    isSelected && setIsExpanded(true);
  }, [isSelected]);

  return (
    <div className="flex flex-col justify-center py-1 cursor-pointer rounded text-gray-100 space-y-1">
      <div
        className={`flex items-center justify-between ${
          isSelected ? 'text-blue-700' : 'text-gray-400'
        }  px-2 py-1 rounded hover:text-blue-700`}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex space-x-2 items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </div>
          <p>{title}</p>
        </div>

        <div className="">
          {!isExpanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          )}
        </div>
      </div>
      <div className={`flex flex-col space-y-3 pl-8`}>
        {isExpanded
          ? subCategories.map((subCategory) => (
              <Link
                href={`/management/${id}/${subCategory.id}`}
                key={subCategory.title}
              >
                <a
                  className={`${
                    selectedSubCategory === subCategory.id
                      ? 'text-orange-400 font-semibold'
                      : 'text-gray-400'
                  } hover:text-blue-700`}
                >
                  {subCategory.title}
                </a>
              </Link>
            ))
          : ''}
      </div>
    </div>
  );
}
