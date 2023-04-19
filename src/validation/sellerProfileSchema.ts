import { z } from 'zod';

export function BankAccountSchema(
  bankList: { id: string | number; name: string }[]
) {
  return z.object({
    account_name: z
      .string()
      .min(1, { message: 'Please enter your account name' }),
    account_number: z
      .string()
      .min(1, { message: 'Please enter your account number' }),
    bank_id: z.string().refine(
      (value) => {
        let isValid = false;

        bankList.forEach((bank) => {
          if (`${bank.id}` === value) isValid = true;
        });

        return isValid;
      },
      { message: 'Please select a bank' }
    ),
  });
}
