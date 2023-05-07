import { z } from 'zod';

export const BankAccountSchema = z.object({
  account_name: z
    .string()
    .min(1, { message: 'Please enter your account name' }),
  account_number: z
    .string()
    .min(1, { message: 'Please enter your account number' }),
});
