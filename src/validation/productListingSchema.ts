import { z } from 'zod';

export const ProductGeneralInfoSchema = z.object({
  product_name: z.string().min(1, { message: 'Please enter product name' }),
});

export const ProductDetailsSchema = z.object({
  description: z.string().max(1000).optional().or(z.literal('')),
  included_items: z
    .string()
    .min(1, { message: "Please mention what's in the package" }),
});

export function ProductPriceSchema(isBulkPrice: boolean) {
  return z.object({
    price_per_unit: z.string().refine(
      (price) => {
        if (price === '' && !isBulkPrice) return false;
        if (isNaN(Number(price))) return false;

        return true;
      },
      { message: `Please enter valid price of the product` }
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

export const PriceSchema = z.object({
  price_per_unit: z
    .string()
    .min(1, { message: 'Please enter price' })
    .refine(
      (value: string | number) => {
        console.log(typeof value);
        if (isNaN(Number(value))) return false;
        return true;
      },
      { message: 'Entered Price is invalid' }
    ),
});

export const PackageWeightSchema = z.object({
  package_weight: z
    .string()
    .min(1, { message: 'Please enter package weight' })
    .refine(
      (value: string) => {
        if (value === '0' || isNaN(Number(value))) return false;

        return true;
      },
      { message: 'Entered package weight is invalid' }
    ),
});
