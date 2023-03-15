import { useRouter } from 'next/router';
import React from 'react';
import { categories } from '../../constants/sidebarConstants';
import Category from './Category';

export default function Sidebar() {
  const router = useRouter();

  const { category: queryCategory, subCategory: querySubCategory } =
    router.query;

  return (
    <aside className="w-56 h-screen px-2 py-5 bg-gray-100 overflow-y-auto">
      <ul className="text-sm">
        {categories.map((category) => (
          <li key={category.id}>
            <Category
              id={category.id}
              title={category.title}
              subCategories={category.subCategories}
              selectedSubCategory={querySubCategory}
              isSelected={category.id === queryCategory}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}
