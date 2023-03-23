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

export const sellerDetailsSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }).max(256),
  last_name: z.string().min(1, { message: 'First name is required' }).max(256),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(256),
});

export const termsAndConditionsSchema = z.object({
  confirm_business_name: z.boolean().default(true),
  receive_updates_on_whatsapp: z.boolean().default(false),
  agreed_terms_conditions: z.boolean().default(true),
});
