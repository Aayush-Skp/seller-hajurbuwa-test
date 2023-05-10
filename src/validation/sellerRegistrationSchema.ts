import { z } from 'zod';

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, { message: 'Please enter your phone number' })
    .startsWith('9', { message: 'Please enter a valid phone number' })
    .min(10, { message: 'Phone number should be of exactly 10 digits' })
    .max(10, { message: 'Phone number should be of exactly 10 digits' })
    .refine(
      (value) => {
        if (isNaN(Number(value))) return false;
        return true;
      },
      {
        message: 'Entered number is not a valid number',
      }
    ),
});

export type PhoneNumberType = z.infer<typeof phoneSchema>;

export const businessDetailsSchema = z.object({
  company_name: z
    .string()
    .min(1, { message: 'Please enter your business name' })
    .max(256),
  pan_number: z
    .string()
    .min(1, { message: 'Please enter your business PAN' })
    .min(9, { message: 'PAN number must be of 9 digits' })
    .max(9, { message: 'PAN number must be of 9 digits' }),
});

export type BusinessDetailsType = z.infer<typeof businessDetailsSchema>;

export const sellerDetailsSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }).max(256),
  last_name: z.string().min(1, { message: 'Last name is required' }).max(256),
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email('Please enter a valid email'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(256),
});

export type SellerDetailsType = z.infer<typeof sellerDetailsSchema>;
