import { z } from 'zod';

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, { message: 'Please enter your phone number' })
    .max(10, { message: 'Phone number should be exactly 10 digits' }),
});

export type PhoneNumberType = z.infer<typeof phoneSchema>;

export const businessDetailsSchema = z.object({
  business_name: z
    .string()
    .min(1, { message: 'Please enter your business name' })
    .max(256),
  pan_number: z
    .string()
    .min(1, { message: 'Please enter your business PAN' })
    .max(15, { message: 'Please enter a valid PAN' }),
});

export type BusinessDetailsType = z.infer<typeof businessDetailsSchema>;

export const sellerDetailsSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }).max(256),
  last_name: z.string().min(1, { message: 'First name is required' }).max(256),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(256),
});

export type SellerDetailsType = z.infer<typeof sellerDetailsSchema>;
