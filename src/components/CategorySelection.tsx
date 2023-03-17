import React from 'react';

type CategorySelectionProps = Category;

type Category = { id: string; title: string; productType?: string };

export default function CategorySelection(props: CategorySelectionProps) {
  return (
    <div className="h-80 w-[38rem] border">
      <p className="p-3 border border-gray-400">Header</p>
    </div>
  );
}

function renderSubCategories({ subCategories }: { subCategories: Category[] }) {
  return <div className="border border-gray-400">{}</div>;
}
