import { z } from 'zod';

export const ProductGeneralInfoSchema = z.object({
  product_title: z.string(),
  product_type: z.array(z.string()),
  brand_specification: z.string(),
  unit: z.string(),
  min_order: z.number().positive(),
});

export const ProductDetailsSchema = z.object({
  featured_highlights: z.array(z.string()),
  description: z.string(),
  in_the_box: z.string(),
});

export const ProductPriceSchema = z.object({
  price: z.number().positive(),
  stock_availability: z.boolean(),
});

export const ProductImageSchema = z.object({
  cover_image: z.string(),
  photos: z.array(z.string()),
});
