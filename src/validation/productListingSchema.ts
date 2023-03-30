import { z } from 'zod';

export function ProductGeneralInfoSchema(brands: string[]) {
  return z.object({
    product_name: z.string().min(1, { message: 'Please enter product name' }),
    product_type: z
      .string()
      .min(1, { message: 'Please select a product type' }),
    brand: z.string().refine(
      (brand) => {
        let isBrand = false;
        brands?.forEach((val: any) => {
          if (brand === val?.name) isBrand = true;
        });
        return isBrand;
      },
      { message: 'please select a brand' }
    ),
  });
}

export const ProductDetailsSchema = z.object({
  description: z.string().max(1000).optional(),
  included_items: z
    .string()
    .min(1, { message: "Please mention what's in the package" }),
});

export function ProductPriceSchema(units: string[], isBulkPrice: boolean) {
  return z.object({
    price: z.string().refine(
      (price) => {
        if (price === '' && !isBulkPrice) return false;
        if (isNaN(Number(price))) return false;

        return true;
      },
      { message: `Please enter valid price of the product` }
    ),
    unit: z.string().refine(
      (unit) => {
        let isUnit = false;
        units?.forEach((val: any) => {
          if (unit === val?.name) isUnit = true;
        });
        return isUnit;
      },
      { message: 'please select a unit' }
    ),
  });
}

export const ProductImageSchema = z.object({
  cover_image: z.string(),
  photos: z.array(z.string()),
});

export const ProductPackageWeightSchema = z.object({
  package_weight: z
    .string()
    .min(1, { message: 'please enter weight of the package' })
    .refine(
      (weight) => {
        if (isNaN(Number(weight))) return false;

        return true;
      },
      { message: 'Please enter valid weight of the package' }
    ),
});
