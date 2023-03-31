import { httpClient } from '../config/httpClient';

const productUrl = '/seller/product';

export function addProduct(productDetails: any) {
  const formData = new FormData();
  formData.append('product_name', productDetails.product_name);
  formData.append('category_id', String(productDetails.category_id));
  formData.append('brand', String(productDetails.brand));
  formData.append('minimum_order', String(productDetails.minimum_order));
  formData.append('description', productDetails.description);
  formData.append('unit', String(productDetails.unit));
  formData.append('included_items', productDetails.included_items);
  formData.append('price_per_unit', productDetails.price_per_unit);
  formData.append('in_stock', productDetails.in_stock);
  formData.append('package_weight', String(productDetails.package_weight));
  formData.append('cover_image', productDetails.cover_image);
  formData.append('is_bulk_price', String(productDetails.is_bulk_price));

  formData.append(
    'featured_highlights',
    productDetails.featured_highlights.join(',')
  );

  let bulkPrices = productDetails.bulk_pricing.map((price: any) => {
    return [price.quantity, price.pricePerPc];
  });

  for (let i = 0; i < bulkPrices.length; i++) {
    for (let j = 0; j < bulkPrices[i].length; j++) {
      formData.append(`bulk_pricing[${i}][${j}]:`, bulkPrices[i][j]);
    }
  }

  productDetails.sub_images.forEach((element: any) => {
    formData.append('sub_images[]', element);
  });

  return httpClient
    .post(productUrl, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data.data);
}
