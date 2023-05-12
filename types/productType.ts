export type ProductStatus =
  | 'online'
  | 'pending'
  | 'deactivated'
  | 'suspended'
  | 'locked';

export type ProductStatusLabel =
  | 'Online'
  | 'Pending QC'
  | 'Inactive'
  | 'Suspended'
  | 'Locked';

export type ProductImages = {
  first: string | File;
  second: string | File;
  third: string | File;
  fourth: string | File;
  fifth: string | File;
  sixth: string | File;
  seventh: string | File;
  eighth: string | File;
};

export type Product = {
  product_name: string;
  brand: number | string;
  category_id: number | string | null;
  category_tree: string;
  featured_highlights: string[];
  description: string;
  included_items: string;
  minimum_order: number;
  price_per_unit: number | string;
  unitName: string;
  is_bulk_price: boolean;
  bulk_pricing: [];
  in_stock: boolean;
  unit: number | string;
  cover_image: string | File;
  images: ProductImages;
  package_weight: number | string;
};
