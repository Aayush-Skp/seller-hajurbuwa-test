import { Product } from '../../types/productType';

export const productAction = {
  CHANGE_PRODUCT_NAME: 'CHANGE_PRODUCT_NAME',
  CHANGE_BRAND: 'CHANGE_BRAND',
};

export const product: Product & {
  isUpdate: boolean;
  isDuplicate: boolean;
  categoryList: any;
  categorySearchKeyword: string;
  categorySearchList: any;
} = {
  featured_highlights: [''],
  minimum_order: 1,
  included_items: '',
  price_per_unit: '',
  package_weight: '',
  category_id: null,
  unitName: '',
  is_bulk_price: false,
  bulk_pricing: [],
  product_name: '',
  description: '',
  cover_image: '',
  in_stock: true,
  brand: '',
  unit: '',
  category_tree: '',
  images: {
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
    sixth: '',
    seventh: '',
    eighth: '',
  },

  isUpdate: false,
  isDuplicate: false,
  categoryList: [],
  categorySearchList: [],
  categorySearchKeyword: '',
};

export function productReducer(state: Product, action: any) {
  return {
    ...product,
  };
}
