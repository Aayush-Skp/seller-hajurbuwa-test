import { httpClient } from '../config/httpClient';
import { imageServerBaseUrl } from '../constants/serverConstants';

const productUrl = '/seller/product';

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
    .then((res) => res.data.data[0]);
}

export function getProductById(productId: string | number) {
  return httpClient.get(`${productUrl}/${productId}/edit`).then((res) => {
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

    for (let i = 0; i < res?.data?.data[0]?.sub_images?.length; i++) {
      if (i === 0)
        productDetails.images.first = res?.data?.data[0]?.sub_images[0]
          ? `${imageServerBaseUrl}${res.data.data[0].sub_images[0]}`
          : '';
      if (i === 1)
        productDetails.images.second = res?.data?.data[1]?.sub_images[1]
          ? `${imageServerBaseUrl}${res.data.data[1].sub_images[1]}`
          : '';
      if (i === 2)
        productDetails.images.third = res?.data?.data[2]?.sub_images[2]
          ? `${imageServerBaseUrl}${res.data.data[2].sub_images[2]}`
          : '';
      if (i === 3)
        productDetails.images.fourth = res?.data?.data[3]?.sub_images[3]
          ? `${imageServerBaseUrl}${res.data.data[3].sub_images[3]}`
          : '';
      if (i === 4)
        productDetails.images.fifth = res?.data?.data[4]?.sub_images[4]
          ? `${imageServerBaseUrl}${res.data.data[4].sub_images[4]}`
          : '';
      if (i === 5)
        productDetails.images.sixth = res?.data?.data[5]?.sub_images[5]
          ? `${imageServerBaseUrl}${res.data.data[5].sub_images[5]}`
          : '';
      if (i === 6)
        productDetails.images.seventh = res?.data?.data[6]?.sub_images[6]
          ? `${imageServerBaseUrl}${res.data.data[6].sub_images[6]}`
          : '';
      if (i === 7)
        productDetails.images.eighth = res?.data?.data[7]?.sub_images[7]
          ? `${imageServerBaseUrl}${res.data.data[6].sub_images[7]}`
          : '';
    }

    productDetails.product_name = res.data.data[0].product_name;
    productDetails.included_items = res.data.data[0].included_items;
    productDetails.minimum_order = res.data.data[0].minimum_order;
    productDetails.package_weight = res.data.data[0].package_weight;
    productDetails.price_per_unit = !res.data.data[0].price_per_unit
      ? ''
      : res.data.data[0].price_per_unit.toString();
    productDetails.category_id = res.data.data[0].product_type;
    productDetails.in_stock = res.data.data[0].stock_availability;
    productDetails.unit = res.data.data[0].unit_selection;
    productDetails.unitName = res.data.data[0].unit_name;
    productDetails.is_bulk_price = res.data.data[0].is_bulk_price;
    productDetails.bulk_pricing = res.data.data[0].is_bulk_price
      ? res.data.data[0].bulk_pricing
      : [{ quantity: res.data.data[0].minimum_order, price: 0 }];
    productDetails.brand = res.data.data[0].brand_specification.toString();
    productDetails.description = res.data.data[0].description ?? '';
    productDetails.featured_highlights = res.data.data[0].featured_highlights;
    productDetails.productId = res.data.data[0].id;
    productDetails.category_tree = res.data.data[0]?.category_tree;
    productDetails.cover_image = `${imageServerBaseUrl}${res.data.data[0].cover_image}`;

    return productDetails;
  });
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

export function deleteProduct(productId: string | number) {
  return httpClient.delete(`${productUrl}/${productId}`);
}

export function deactivateProduct(productId: string | number) {
  return httpClient.get(`/seller/deactivate-product/${productId}`);
}

export function activateProduct(productId: string | number) {
  return httpClient.get(`seller/activate-product/${productId}`);
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

  if (typeof productDetails.cover_image !== 'string') {
    formData.append('cover_image', productDetails.cover_image);
  }

  const filteredHighlights = productDetails.featured_highlights.filter(
    (item: string) => item !== ''
  );

  formData.append('featured_highlights', filteredHighlights.join(','));

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
