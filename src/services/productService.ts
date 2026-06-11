import { httpClient } from '../config/httpClient';
import { imageServerBaseUrl } from '../constants/serverConstants';

const productUrl = '/seller/product';

export function getProductsByStatus(url: string, signal?: AbortSignal) {
  return httpClient.get(url, { signal }).then((res) => res.data);
}

type ProductStatus =
  | 'pending'
  | 'pending'
  | 'online'
  | 'deactivated'
  | 'locked'
  | 'suspended';

export function searchProductsWithStatusAndKeyword(
  status: ProductStatus,
  keyword: string
) {
  return httpClient
    .get(`/seller/products/search?status=${status}&keyword=${keyword}`)
    .then((res) => res.data);
}

export function getProductByStatus(
  productStatus: ProductStatus,
  currentPageUrl: string | null
) {
  return httpClient
    .get(`${currentPageUrl ?? `${productUrl}?page=1`}&status=${productStatus}`)
    .then((res) => {
      return res.data;
    });
}

export function getProductDescription(productId: string | number) {
  return httpClient
    .get(`${productUrl}/${productId}`)
    .then((res) => ({
      ...res.data.data[0],
      featured_highlights: normalizeFeaturedHighlights(
        res.data.data[0]?.featured_highlights,
        []
      ),
    }));
}

export function deleteProduct(productId: string | number) {
  return httpClient.delete(`${productUrl}/${productId}`);
}

export function deactivateProduct(productId: string | number) {
  return httpClient.get(`/seller/deactivate-product/${productId}`);
}

export function activateProduct(productId: string | number) {
  return httpClient.get(`/seller/activate-product/${productId}`);
}

export type ProductBulkTier = {
  quantity: number;
  price: number;
};

function normalizeFeaturedHighlights(
  value: unknown,
  fallback: string[] = ['']
): string[] {
  if (Array.isArray(value) && value.length > 0) {
    return value.map(String);
  }
  return fallback;
}

function toNumericString(...values: unknown[]): string {
  const value = values.find((item) => item !== null && item !== undefined && item !== '');
  return value === undefined ? '' : String(value);
}

function normalizeBulkPricing(
  value: unknown,
  minimumOrder: number,
  pricePerUnit: string
): ProductBulkTier[] {
  if (!Array.isArray(value) || value.length === 0) {
    return [{ quantity: minimumOrder, price: Number(pricePerUnit) || 0 }];
  }

  return value.map((tier: any, index) => ({
    quantity:
      index === 0
        ? minimumOrder
        : Number(tier.quantity ?? tier[0]) || minimumOrder + index,
    price: Number(tier.price ?? tier.price_per_piece ?? tier[1]) || 0,
  }));
}

export function updateProductStock(
  productId: string | number,
  in_stock: number
) {
  const formData = new FormData();
  formData.append('in_stock', String(in_stock));
  formData.append('update_type', '2');
  formData.append('_method', 'PUT');
  return updateProduct(productId, formData);
}

export function updateProductPricing(
  productId: string | number,
  payload: {
    is_bulk_price: number;
    minimum_order?: number;
    price_per_unit?: number;
    bulk_pricing?: ProductBulkTier[];
  }
) {
  const formData = new FormData();
  formData.append('update_type', '1');
  formData.append('_method', 'PUT');
  formData.append('is_bulk_price', String(payload.is_bulk_price));

  if (payload.minimum_order != null && payload.minimum_order > 0) {
    formData.append('minimum_order', String(payload.minimum_order));
  }

  if (payload.is_bulk_price === 0) {
    formData.append('bulk_price', '');
    if (payload.price_per_unit != null) {
      formData.append('price_per_unit', String(payload.price_per_unit));
    }
  }

  if (payload.is_bulk_price === 1 && payload.bulk_pricing) {
    payload.bulk_pricing.forEach((tier, index) => {
      formData.append(`bulk_pricing[${index}][0]`, String(tier.quantity));
      formData.append(`bulk_pricing[${index}][1]`, String(tier.price));
    });
  }

  return updateProduct(productId, formData);
}

export function updateProduct(
  productId: string | number,
  updatedField: FormData
) {
  return httpClient.post(`${productUrl}/${productId}`, updatedField, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function duplicateProduct(
  productId: string | number,
  duplicateField: FormData
) {
  return httpClient.post(`/seller/duplicate-product/${productId}`, duplicateField, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function getProductById(productId: string | number) {
  return httpClient.get(`${productUrl}/${productId}/edit`).then((res) => {
    console.log(res.data.data[0]);
    const productDetails = {
      productId: '',
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
      category_tree: '',
      cover_image: '',
      sub_images: [],
      in_stock: true,
      brand: '',
      unit: '',
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
    };

    if (res?.data?.data[0]?.sub_images) {
    productDetails.images.first = res?.data?.data[0]?.sub_images[0]
      ? `${imageServerBaseUrl}${res.data.data[0].sub_images[0]}`
      : '';

    productDetails.images.second = res?.data?.data[0]?.sub_images[1]
      ? `${imageServerBaseUrl}${res.data.data[0].sub_images[1]}`
      : '';

    productDetails.images.third = res?.data?.data[0]?.sub_images[2]
      ? `${imageServerBaseUrl}${res.data.data[0].sub_images[2]}`
      : '';

    productDetails.images.fourth = res?.data?.data[0]?.sub_images[3]
      ? `${imageServerBaseUrl}${res.data.data[0].sub_images[3]}`
      : '';

    productDetails.images.fifth = res?.data?.data[0]?.sub_images[4]
      ? `${imageServerBaseUrl}${res.data.data[0].sub_images[4]}`
      : '';

    productDetails.images.sixth = res?.data?.data[0]?.sub_images[5]
      ? `${imageServerBaseUrl}${res.data.data[0].sub_images[5]}`
      : '';

    productDetails.images.seventh = res?.data?.data[0]?.sub_images[6]
      ? `${imageServerBaseUrl}${res.data.data[0].sub_images[6]}`
      : '';

    productDetails.images.eighth = res?.data?.data[0]?.sub_images[7]
      ? `${imageServerBaseUrl}${res.data.data[0].sub_images[7]}`
      : '';
    }
    
    productDetails.product_name = res.data.data[0].product_name;
    productDetails.included_items = res.data.data[0].included_items;
    const minimumOrder = Number(res.data.data[0].minimum_order) || 1;
    const pricePerUnit = !res.data.data[0].price_per_unit
      ? ''
      : res.data.data[0].price_per_unit.toString();

    productDetails.minimum_order = minimumOrder;
    productDetails.package_weight = res.data.data[0].package_weight;
    productDetails.price_per_unit = pricePerUnit;
    productDetails.category_id =
      Number(res.data.data[0].category_id ?? res.data.data[0].product_type) ||
      null;
    productDetails.in_stock = res.data.data[0].stock_availability;
    productDetails.unit = toNumericString(
      res.data.data[0].unit_id,
      res.data.data[0].unit_selection
    );
    productDetails.unitName = res.data.data[0].unit_name ?? '';
    productDetails.is_bulk_price = Number(res.data.data[0].is_bulk_price) === 1;
    productDetails.bulk_pricing = normalizeBulkPricing(
      res.data.data[0].bulk_pricing,
      minimumOrder,
      pricePerUnit
    );
    productDetails.brand = toNumericString(
      res.data.data[0].brand_id,
      res.data.data[0].brand_specification
    );
    productDetails.description = res.data.data[0].description ?? '';
    productDetails.featured_highlights = normalizeFeaturedHighlights(
      res.data.data[0].featured_highlights
    );
    productDetails.productId = res.data.data[0].id;
    productDetails.category_tree = res.data.data[0]?.category_tree ?? '';
    productDetails.cover_image = `${imageServerBaseUrl}${res.data.data[0].cover_image}`;

    return productDetails;
  });
}

export function addProduct(productDetails: any) {
  const formData = new FormData();

  formData.append('product_name', productDetails.product_name);
  formData.append('category_id', String(productDetails.category_id));
  formData.append('category_tree', String(productDetails.category_tree));
  formData.append('brand', String(productDetails.brand));
  formData.append('minimum_order', String(productDetails.minimum_order));
  formData.append('description', productDetails.description);
  formData.append('unit', String(productDetails.unit));
  formData.append('included_items', productDetails.included_items);
  formData.append('price_per_unit', productDetails.price_per_unit);
  formData.append('in_stock', `${Number(productDetails.in_stock)}`);
  formData.append('package_weight', String(productDetails.package_weight));
  formData.append('is_bulk_price', `${Number(productDetails.is_bulk_price)}`);
  formData.append('featured_highlights', productDetails.featured_highlights);

  // if (typeof productDetails.cover_image !== 'string') {
    formData.append('cover_image', productDetails.cover_image);
  // }

  // const filteredHighlights = productDetails.featured_highlights.filter(
  //   (item: string) => item !== ''
  // );

  // formData.append('featured_highlights', filteredHighlights.join(','));

  let bulkPrices = productDetails.bulk_pricing.map((price: any) => {
    return [price.quantity, price.price];
  });

  for (let i = 0; i < bulkPrices.length; i++) {
    for (let j = 0; j < bulkPrices[i].length; j++) {
      formData.append(`bulk_pricing[${i}][${j}]`, bulkPrices[i][j]);
    }
  }

  for (const key in productDetails.images) {
    if (productDetails.images[key] !== '')
      formData.append('sub_images[]', productDetails.images[key]);
  }

  return httpClient.post(productUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
